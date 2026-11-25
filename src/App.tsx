import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { HeaderHUD, LearningBranch } from './components/HeaderHUD';
import { CommandSidebar, BranchTopicSummary } from './components/CommandSidebar';
import { BottomNav } from './components/BottomNav';
import { DailyLabView } from './components/DailyLabView';
import { NeuralVerbRetentionView } from './components/NeuralVerbRetentionView';
import { MemoryMatrixView } from './components/MemoryMatrixView';
import { KnowledgeTopicReaderView } from './components/KnowledgeTopicReaderView';
import { HotkeyHelperModal } from './components/HotkeyHelperModal';

import { TerminalMode, StagePhase, QuizQuestion, WordItem, KnowledgeStageItem, UserProgressData } from './types/lexicon';
import { ALL_WORDS_POOL } from './data/mockLexicon';
import { MOCK_KNOWLEDGE_TOPICS } from './data/mockKnowledgeTopics';
import { 
  convertIndonesianStagesToWordItems, 
  generateIndonesianStageQuizQuestions 
} from './utils/indonesianLexiconAdapter';
import { 
  fetchVocabularyData, 
  fetchKnowledgeTopicsData,
  VocabDataSource 
} from './services/vocabService';
import { 
  loadUserData, 
  saveUserData, 
  recordWordAttempt, 
  getDefaultUserData,
  syncDerivedProgressFields
} from './utils/storage';
import {
  syncProgressBidirectional,
  pushProgressToSheets,
  hasPendingSync,
  setPendingSync,
  getLastSyncedAt,
  isSheetsConfigured,
  ProgressSyncState
} from './utils/sheetsSync';
import { generateStageQuizQuestions, getMemoryTier } from './utils/retentionAlgorithm';
import { playTactileClick } from './utils/audio';

export default function App() {
  const [userData, setUserData] = useState<UserProgressData>(() => loadUserData());
  const [currentMode, setCurrentMode] = useState<TerminalMode>('stage');
  const [stagePhase, setStagePhase] = useState<StagePhase>('deck');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showHotkeysModal, setShowHotkeysModal] = useState(false);

  // Dynamic Vocabulary Pool & Google Sheets Sync State
  const [wordsPool, setWordsPool] = useState<WordItem[]>(() => ALL_WORDS_POOL);
  const [syncStatus, setSyncStatus] = useState<VocabDataSource | 'syncing'>('mock');
  const [progressSyncState, setProgressSyncState] = useState<ProgressSyncState>(() =>
    isSheetsConfigured() ? 'syncing' : 'unconfigured'
  );
  const [pendingSyncFlag, setPendingSyncFlag] = useState<boolean>(() => hasPendingSync());
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(() => getLastSyncedAt());

  // Refs untuk mencegah stale closure & race condition saat sinkronisasi 2-arah
  const userDataRef = useRef<UserProgressData>(userData);
  userDataRef.current = userData;
  const isSyncInFlightRef = useRef<boolean>(false);
  const lastAutoPullMsRef = useRef<number>(0);
  const pushDebounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Multi-Branch Knowledge Topics State
  const [knowledgeTopics, setKnowledgeTopics] = useState<KnowledgeStageItem[]>(() => MOCK_KNOWLEDGE_TOPICS);
  const [activeBranchId, setActiveBranchId] = useState<string>('english');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('psy-read-people');
  const [indoActiveStageNum, setIndoActiveStageNum] = useState<number>(1);

  const isIndoBranch = activeBranchId === 'kosa-kata-indonesia';

  // Konversi 500 materi Kosa Kata Indonesia menjadi WordItem[]
  const indonesianWordsPool = useMemo<WordItem[]>(() => {
    const rawIndo = knowledgeTopics.filter((t) => t.branchId === 'kosa-kata-indonesia');
    return convertIndonesianStagesToWordItems(rawIndo);
  }, [knowledgeTopics]);

  // Pool kata aktif tergantung cabang: English Lexicon vs Kosa Kata Indonesia
  const activeWordsPool = useMemo<WordItem[]>(() => {
    return isIndoBranch ? indonesianWordsPool : wordsPool;
  }, [isIndoBranch, indonesianWordsPool, wordsPool]);

  const currentStageId = isIndoBranch ? indoActiveStageNum : (userData.currentStageId || 1);
  const clearedStages = isIndoBranch 
    ? (userData.clearedIndonesianStages || []) 
    : (userData.clearedStages || []);

  // Push langsung ke Google Sheets dengan offline retry queue
  const flushPushToSheets = useCallback(async (snapshot: UserProgressData) => {
    if (!isSheetsConfigured()) return;

    setProgressSyncState('syncing');
    const result = await pushProgressToSheets(snapshot);
    setPendingSyncFlag(hasPendingSync());
    setLastSyncedAt(getLastSyncedAt());
    setProgressSyncState(result.status);
  }, []);

  // Helper mutasi progres terpusat: stamp lastUpdated, simpan ke localStorage, dan kirim ke Google Sheets
  const updateUserProgress = useCallback(
    (
      updater: (prev: UserProgressData) => UserProgressData,
      options?: { immediateSync?: boolean }
    ) => {
      setUserData((prev) => {
        const nextRaw = updater(prev);
        if (nextRaw === prev) return prev;

        const normalized = syncDerivedProgressFields({
          ...nextRaw,
          lastUpdated: new Date().toISOString()
        });

        saveUserData(normalized);
        userDataRef.current = normalized;

        if (isSheetsConfigured()) {
          // Tandai tertunda sampai push benar-benar sukses
          setPendingSync(true);
          setPendingSyncFlag(true);

          if (pushDebounceTimerRef.current) {
            clearTimeout(pushDebounceTimerRef.current);
            pushDebounceTimerRef.current = null;
          }

          if (options?.immediateSync) {
            void flushPushToSheets(normalized);
          } else {
            pushDebounceTimerRef.current = setTimeout(() => {
              pushDebounceTimerRef.current = null;
              void flushPushToSheets(userDataRef.current);
            }, 800);
          }
        }

        return normalized;
      });
    },
    [flushPushToSheets]
  );

  // Sinkronisasi 2-arah penuh (Auto-Pull dari Google Sheets -> Smart Merge -> Push jika perlu)
  const runBidirectionalSync = useCallback(async (options?: { forcePush?: boolean }) => {
    if (!isSheetsConfigured()) {
      setProgressSyncState('unconfigured');
      return;
    }
    if (isSyncInFlightRef.current) return;

    isSyncInFlightRef.current = true;
    setProgressSyncState('syncing');

    try {
      const result = await syncProgressBidirectional(userDataRef.current, {
        forcePush: options?.forcePush
      });

      if (result.didChangeLocal) {
        saveUserData(result.merged);
        userDataRef.current = result.merged;
        setUserData(result.merged);
      }

      setProgressSyncState(result.status);
      setPendingSyncFlag(hasPendingSync());
      setLastSyncedAt(getLastSyncedAt());
    } catch (err) {
      console.warn('[App] Gagal sinkronisasi progres 2-arah:', err);
      setProgressSyncState('offline');
      setPendingSyncFlag(hasPendingSync());
    } finally {
      isSyncInFlightRef.current = false;
    }
  }, []);

  // Sinkronisasi Manual (dipicu klik pil Sheets: Live / menu mobile di HeaderHUD)
  const handleManualSync = useCallback(async () => {
    setSyncStatus('syncing');
    await Promise.all([
      fetchVocabularyData()
        .then(({ words, source }) => {
          if (words && words.length > 0) setWordsPool(words);
          setSyncStatus(source);
        })
        .catch(() => setSyncStatus('cache')),
      fetchKnowledgeTopicsData()
        .then(({ topics }) => {
          if (topics && topics.length > 0) setKnowledgeTopics(topics);
        })
        .catch(() => {}),
      runBidirectionalSync({ forcePush: true })
    ]);
  }, [runBidirectionalSync]);

  // 1. Ingestion kosa kata, auto-pull progres cloud, dan topik materi saat mount
  useEffect(() => {
    let isMounted = true;
    setSyncStatus('syncing');

    fetchVocabularyData()
      .then(({ words, source }) => {
        if (!isMounted) return;
        if (words && words.length > 0) {
          setWordsPool(words);
        }
        setSyncStatus(source);
      })
      .catch((err) => {
        console.warn('[App] Gagal inisialisasi kosa kata dinamis:', err);
        if (isMounted) setSyncStatus('mock');
      });

    fetchKnowledgeTopicsData()
      .then(({ topics }) => {
        if (!isMounted) return;
        if (topics && topics.length > 0) {
          setKnowledgeTopics(topics);
        }
      })
      .catch((err) => {
        console.warn('[App] Gagal fetch knowledge topics:', err);
      });

    // Auto-pull progres terbaru dari Google Sheets saat aplikasi dibuka
    lastAutoPullMsRef.current = Date.now();
    void runBidirectionalSync({ forcePush: hasPendingSync() });

    return () => {
      isMounted = false;
      if (pushDebounceTimerRef.current) {
        clearTimeout(pushDebounceTimerRef.current);
      }
    };
  }, [runBidirectionalSync]);

  // 2. Auto-Pull saat tab/PWA kembali fokus (focus / visibilitychange) & Retry saat koneksi online
  useEffect(() => {
    const triggerResumeSync = () => {
      if (document.visibilityState === 'hidden') return;
      const now = Date.now();
      const pending = hasPendingSync();
      // Hindari double-fetch ketika focus + visibilitychange terpanggil bersamaan (< 2.5 detik)
      if (!pending && now - lastAutoPullMsRef.current < 2500) return;

      lastAutoPullMsRef.current = now;
      void runBidirectionalSync({ forcePush: pending });
    };

    const handleOnline = () => {
      lastAutoPullMsRef.current = Date.now();
      void runBidirectionalSync({ forcePush: hasPendingSync() });
    };

    const handleOffline = () => {
      if (isSheetsConfigured()) {
        setProgressSyncState('offline');
      }
    };

    window.addEventListener('focus', triggerResumeSync);
    document.addEventListener('visibilitychange', triggerResumeSync);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('focus', triggerResumeSync);
      document.removeEventListener('visibilitychange', triggerResumeSync);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [runBidirectionalSync]);

  // 10 kata untuk stage yang sedang aktif dari pool dinamis
  const stageWords = useMemo(() => {
    const matched = activeWordsPool.filter(w => w.stageId === currentStageId);
    if (matched.length > 0) return matched;
    // Fallback jika stageId belum ada, tampilkan stage 1
    return activeWordsPool.filter(w => w.stageId === 1);
  }, [activeWordsPool, currentStageId]);

  // Soal Stage Quiz Acak 20 Soal Total (Zero-Tolerance)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    return isIndoBranch
      ? generateIndonesianStageQuizQuestions(stageWords, activeWordsPool)
      : generateStageQuizQuestions(stageWords, activeWordsPool);
  });

  // Re-generate soal saat stage berganti, pool kosa kata diperbarui, atau cabang beralih
  useEffect(() => {
    if (stageWords.length > 0) {
      setQuizQuestions(
        isIndoBranch
          ? generateIndonesianStageQuizQuestions(stageWords, activeWordsPool)
          : generateStageQuizQuestions(stageWords, activeWordsPool)
      );
    }
  }, [stageWords, activeWordsPool, isIndoBranch]);

  // Global keyboard shortcuts (Alt+1..3, Escape)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showHotkeysModal) setShowHotkeysModal(false);
        return;
      }

      // Mode switching Alt + 1, 2, 3
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.key === '1') {
          e.preventDefault();
          setCurrentMode('stage');
        } else if (e.key === '2') {
          e.preventDefault();
          setCurrentMode('retention');
        } else if (e.key === '3') {
          e.preventDefault();
          setCurrentMode('matrix');
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [showHotkeysModal]);

  // Handlers
  const handleToggleBookmark = (wordId: string) => {
    playTactileClick(userData.soundEnabled);
    updateUserProgress((prev) => {
      const current = prev.wordStats[wordId] || {
        wordId,
        totalAttempts: 0,
        correctAttempts: 0,
        consecutiveStreak: 0,
        lastReviewedAt: 0,
        isMastered: false,
        isBookmarked: false,
        isInspected: true
      };

      const nextBookmarked = !current.isBookmarked;
      const nextBookmarkedIds = nextBookmarked
        ? Array.from(new Set([...(prev.bookmarkedIds || []), wordId])).sort()
        : (prev.bookmarkedIds || []).filter((id) => id !== wordId);

      return {
        ...prev,
        bookmarkedIds: nextBookmarkedIds,
        wordStats: {
          ...prev.wordStats,
          [wordId]: {
            ...current,
            isBookmarked: nextBookmarked
          }
        }
      };
    });
  };

  const handleMarkInspected = useCallback(
    (wordId: string) => {
      updateUserProgress((prev) => {
        const current = prev.wordStats[wordId];
        if (current?.isInspected && (prev.inspectedWords || []).includes(wordId)) {
          return prev;
        }

        return {
          ...prev,
          inspectedWords: Array.from(new Set([...(prev.inspectedWords || []), wordId])).sort(),
          wordStats: {
            ...prev.wordStats,
            [wordId]: {
              ...(current || {
                wordId,
                totalAttempts: 0,
                correctAttempts: 0,
                consecutiveStreak: 0,
                lastReviewedAt: 0,
                isMastered: false,
                isBookmarked: false
              }),
              isInspected: true
            }
          }
        };
      });
    },
    [updateUserProgress]
  );

  const handleQuizCorrectAnswer = (q: QuizQuestion) => {
    updateUserProgress(
      (prev) => ({
        ...prev,
        wordStats: recordWordAttempt(prev.wordStats, q.wordId, true)
      }),
      { immediateSync: false }
    );
  };

  const handleQuizEliminationFail = (failedQuestion: QuizQuestion) => {
    updateUserProgress(
      (prev) => ({
        ...prev,
        totalRunsAttempted: prev.totalRunsAttempted + 1,
        wordStats: recordWordAttempt(prev.wordStats, failedQuestion.wordId, false)
      }),
      { immediateSync: true }
    );
  };

  const handleQuizFlawlessVictory = () => {
    updateUserProgress(
      (prev) => {
        const nextStreak = prev.dailyStreak + 1;
        const todayIso = new Date().toISOString().split('T')[0];

        if (isIndoBranch) {
          const alreadyCleared = (prev.clearedIndonesianStages || []).includes(currentStageId);
          const nextIndoStages = alreadyCleared
            ? (prev.clearedIndonesianStages || [])
            : [...(prev.clearedIndonesianStages || []), currentStageId].sort((a, b) => a - b);

          return {
            ...prev,
            dailyStreak: nextStreak,
            streak: nextStreak,
            lastStreakDate: todayIso,
            clearedIndonesianStages: nextIndoStages,
            totalFlawlessRuns: prev.totalFlawlessRuns + 1,
            totalRunsAttempted: prev.totalRunsAttempted + 1
          };
        }

        const alreadyCleared = prev.clearedStages.includes(currentStageId);
        const nextClearedStages = alreadyCleared 
          ? prev.clearedStages 
          : [...prev.clearedStages, currentStageId].sort((a, b) => a - b);

        return {
          ...prev,
          dailyStreak: nextStreak,
          streak: nextStreak,
          lastStreakDate: todayIso,
          clustersMasteredCount: nextClearedStages.length,
          clearedStages: nextClearedStages,
          totalFlawlessRuns: prev.totalFlawlessRuns + 1,
          totalRunsAttempted: prev.totalRunsAttempted + 1
        };
      },
      { immediateSync: true }
    );
  };

  const handleRebootQuiz = () => {
    setQuizQuestions(
      isIndoBranch
        ? generateIndonesianStageQuizQuestions(stageWords, activeWordsPool)
        : generateStageQuizQuestions(stageWords, activeWordsPool)
    );
  };

  const handleSelectStage = (stageId: number) => {
    if (isIndoBranch) {
      setIndoActiveStageNum(stageId);
    } else {
      updateUserProgress((prev) => {
        if (prev.currentStageId === stageId) return prev;
        return {
          ...prev,
          currentStageId: stageId
        };
      });
    }
  };

  const handleRetentionResult = (wordId: string, isCorrect: boolean) => {
    updateUserProgress(
      (prev) => ({
        ...prev,
        wordStats: recordWordAttempt(prev.wordStats, wordId, isCorrect)
      }),
      { immediateSync: true }
    );
  };

  const handleResetDemoData = () => {
    const fresh: UserProgressData = {
      ...getDefaultUserData(),
      lastUpdated: new Date().toISOString()
    };
    setUserData(fresh);
    saveUserData(fresh);
    userDataRef.current = fresh;
    void flushPushToSheets(fresh);
    setCurrentMode('stage');
    setStagePhase('deck');
    const initialStageWords = wordsPool.filter(w => w.stageId === 1);
    setQuizQuestions(generateStageQuizQuestions(initialStageWords.length > 0 ? initialStageWords : wordsPool, wordsPool));
  };

  // Dynamic Branches list (English Lexicon + auto-grouped dari KnowledgeTopics)
  const branches = useMemo<LearningBranch[]>(() => {
    const list: LearningBranch[] = [
      { id: 'english', title: 'English Lexicon', badge: '3 Modul' }
    ];

    const branchMap = new Map<string, { title: string; count: number }>();
    knowledgeTopics.forEach((item) => {
      const cur = branchMap.get(item.branchId) || { title: item.branchTitle, count: 0 };
      cur.count += 1;
      branchMap.set(item.branchId, cur);
    });

    branchMap.forEach((val, id) => {
      list.push({
        id,
        title: val.title,
        badge: id === 'kosa-kata-indonesia' ? '3 Modul' : `${val.count} Bagian`
      });
    });

    return list;
  }, [knowledgeTopics]);

  // Daftar topik di cabang aktif
  const currentBranchTopics = useMemo<BranchTopicSummary[]>(() => {
    if (activeBranchId === 'english') return [];
    const topicMap = new Map<string, { topicId: string; topicTitle: string; totalStages: number }>();
    knowledgeTopics
      .filter((t) => t.branchId === activeBranchId)
      .forEach((t) => {
        const cur = topicMap.get(t.topicId) || { topicId: t.topicId, topicTitle: t.topicTitle, totalStages: 0 };
        cur.totalStages += 1;
        topicMap.set(t.topicId, cur);
      });

    return Array.from(topicMap.values()).map((t) => {
      const readList = userData.readTopicStages?.[t.topicId] || [];
      return {
        topicId: t.topicId,
        topicTitle: t.topicTitle,
        totalStages: t.totalStages,
        readStagesCount: readList.length
      };
    });
  }, [knowledgeTopics, activeBranchId, userData.readTopicStages]);

  // Tahapan / bagian untuk topik yang sedang aktif dibaca
  const activeTopicStages = useMemo(() => {
    return knowledgeTopics
      .filter((t) => t.topicId === selectedTopicId)
      .sort((a, b) => a.stageId - b.stageId);
  }, [knowledgeTopics, selectedTopicId]);

  const activeTopicInfo = useMemo(() => {
    const stg = activeTopicStages[0];
    return {
      title: stg ? stg.topicTitle : 'Topic Reader',
      branchTitle: stg ? stg.branchTitle : ''
    };
  }, [activeTopicStages]);

  const handleSelectBranch = (branchId: string) => {
    playTactileClick(userData.soundEnabled);
    setActiveBranchId(branchId);
    if (branchId !== 'english') {
      const firstTopic = knowledgeTopics.find((t) => t.branchId === branchId);
      if (firstTopic) {
        setSelectedTopicId(firstTopic.topicId);
      }
    }
  };

  const handleSelectTopic = (topicId: string) => {
    playTactileClick(userData.soundEnabled);
    setSelectedTopicId(topicId);
  };

  const handleToggleReadStage = (stageId: number) => {
    updateUserProgress(
      (prev) => {
        const currentRead = prev.readTopicStages?.[selectedTopicId] || [];
        const isRead = currentRead.includes(stageId);
        const nextRead = isRead
          ? currentRead.filter((id) => id !== stageId)
          : [...currentRead, stageId].sort((a, b) => a - b);

        return {
          ...prev,
          readTopicStages: {
            ...(prev.readTopicStages || {}),
            [selectedTopicId]: nextRead
          }
        };
      },
      { immediateSync: true }
    );
  };

  // Telemetry counts
  const inspectedCount = stageWords.filter(w => userData.wordStats[w.id]?.isInspected).length;
  const criticalDecayCount = activeWordsPool.filter(w => getMemoryTier(userData.wordStats[w.id]) === 'CRITICAL').length;
  const isStageCleared = clearedStages.includes(currentStageId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top HUD Telemetry Navigation Bar */}
      <HeaderHUD
        dailyStreak={userData.dailyStreak}
        clustersMasteredCount={clearedStages.length}
        totalLexemesLearned={activeWordsPool.length}
        soundEnabled={userData.soundEnabled}
        syncStatus={syncStatus}
        progressSyncState={progressSyncState}
        hasPendingSync={pendingSyncFlag}
        lastSyncedAt={lastSyncedAt}
        onManualSync={handleManualSync}
        branches={branches}
        activeBranchId={activeBranchId}
        onSelectBranch={handleSelectBranch}
        onToggleSound={() => {
          updateUserProgress(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
        }}
        onOpenHotkeys={() => setShowHotkeysModal(true)}
        onResetData={handleResetDemoData}
      />

      {/* Main Split-Command Center Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Command Strip: DESKTOP ONLY (md:flex) */}
        <CommandSidebar
          currentMode={currentMode}
          onSelectMode={(mode) => {
            playTactileClick(userData.soundEnabled);
            setCurrentMode(mode);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          inspectedCount={inspectedCount}
          totalWordsInStage={stageWords.length}
          criticalDecayCount={criticalDecayCount}
          stagePhase={stagePhase}
          isStageCleared={isStageCleared}
          currentStageId={currentStageId}
          activeBranchId={activeBranchId}
          activeBranchTitle={branches.find((b) => b.id === activeBranchId)?.title || 'English Lexicon'}
          branchTopics={currentBranchTopics}
          selectedTopicId={selectedTopicId}
          onSelectTopic={handleSelectTopic}
        />

        {/* Dynamic Main Workspace Stage */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Cabang Non-Inggris & Non-Indo (seperti Psychology / Statistics): Tampilkan Pembaca Topik / Audiobook */}
            {activeBranchId !== 'english' && activeBranchId !== 'kosa-kata-indonesia' ? (
              <KnowledgeTopicReaderView
                stages={activeTopicStages}
                topicTitle={activeTopicInfo.title}
                topicId={selectedTopicId}
                readStageIds={userData.readTopicStages?.[selectedTopicId] || []}
                onToggleReadStage={handleToggleReadStage}
                soundEnabled={userData.soundEnabled}
                activeBranchId={activeBranchId}
              />
            ) : (
              <>
                {/* Tab 1: Stage Lab (Stage Deck + Floating Control Dock + Zero-Tolerance Stage Quiz) */}
                {currentMode === 'stage' && (
                  <DailyLabView
                    words={stageWords}
                    allWords={activeWordsPool}
                    statsMap={userData.wordStats}
                    quizQuestions={quizQuestions}
                    phase={stagePhase}
                    onSetPhase={setStagePhase}
                    onToggleBookmark={handleToggleBookmark}
                    onMarkInspected={handleMarkInspected}
                    onQuizCorrectAnswer={handleQuizCorrectAnswer}
                    onQuizEliminationFail={handleQuizEliminationFail}
                    onQuizFlawlessVictory={handleQuizFlawlessVictory}
                    onRebootQuiz={handleRebootQuiz}
                    onNavigateTab={(tab) => {
                      playTactileClick(userData.soundEnabled);
                      setCurrentMode(tab);
                    }}
                    currentStageId={currentStageId}
                    clearedStages={clearedStages}
                    onSelectStage={handleSelectStage}
                    dailyStreak={userData.dailyStreak}
                    clustersMasteredCount={clearedStages.length}
                    soundEnabled={userData.soundEnabled}
                  />
                )}

                {/* Tab 2: Retensi Memori 2-Arah (Neural Weighted Probability dari Stage Cleared) */}
                {currentMode === 'retention' && (
                  <NeuralVerbRetentionView
                    allWords={activeWordsPool}
                    clearedStages={clearedStages}
                    statsMap={userData.wordStats}
                    onRecordResult={handleRetentionResult}
                    onNavigateToStage={(stgId) => {
                      handleSelectStage(stgId);
                      setCurrentMode('stage');
                      setStagePhase('deck');
                    }}
                    onBackToStage={() => {
                      setCurrentMode('stage');
                    }}
                    soundEnabled={userData.soundEnabled}
                  />
                )}

                {/* Tab 3: Matriks Memori (Memory Matrix & Crystallization) */}
                {currentMode === 'matrix' && (
                  <MemoryMatrixView
                    allWords={activeWordsPool}
                    statsMap={userData.wordStats}
                    onToggleBookmark={handleToggleBookmark}
                    soundEnabled={userData.soundEnabled}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Mobile-Only Bottom Navigation Bar: Otomatis Sembunyi Saat Kuis Aktif */}
      {!(currentMode === 'stage' && stagePhase === 'quiz') && (
        <BottomNav
          currentMode={currentMode}
          onSelectMode={(mode) => {
            playTactileClick(userData.soundEnabled);
            setCurrentMode(mode);
          }}
          stagePhase={stagePhase}
          criticalDecayCount={criticalDecayCount}
          isStageCleared={isStageCleared}
          activeBranchId={activeBranchId}
          branchTopics={currentBranchTopics}
          selectedTopicId={selectedTopicId}
          onSelectTopic={handleSelectTopic}
          onSelectBranch={handleSelectBranch}
        />
      )}

      {/* Hotkeys Modal */}
      {showHotkeysModal && (
        <HotkeyHelperModal onClose={() => setShowHotkeysModal(false)} />
      )}
    </div>
  );
}
