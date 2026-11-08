import { useState, useEffect, useMemo } from 'react';
import { HeaderHUD, LearningBranch } from './components/HeaderHUD';
import { CommandSidebar, BranchTopicSummary } from './components/CommandSidebar';
import { BottomNav } from './components/BottomNav';
import { DailyLabView } from './components/DailyLabView';
import { NeuralVerbRetentionView } from './components/NeuralVerbRetentionView';
import { MemoryMatrixView } from './components/MemoryMatrixView';
import { KnowledgeTopicReaderView } from './components/KnowledgeTopicReaderView';
import { HotkeyHelperModal } from './components/HotkeyHelperModal';

import { TerminalMode, StagePhase, QuizQuestion, WordItem, KnowledgeStageItem } from './types/lexicon';
import { ALL_WORDS_POOL } from './data/mockLexicon';
import { MOCK_KNOWLEDGE_TOPICS } from './data/mockKnowledgeTopics';
import { 
  convertIndonesianStagesToWordItems, 
  generateIndonesianStageQuizQuestions 
} from './utils/indonesianLexiconAdapter';
import { 
  fetchVocabularyData, 
  fetchCloudUserProgress, 
  pushCloudUserProgress, 
  fetchKnowledgeTopicsData,
  VocabDataSource 
} from './services/vocabService';
import { loadUserData, saveUserData, recordWordAttempt, getDefaultUserData, mergeUserProgress } from './utils/storage';
import { generateStageQuizQuestions, getMemoryTier } from './utils/retentionAlgorithm';
import { playTactileClick } from './utils/audio';

export default function App() {
  const [userData, setUserData] = useState(() => loadUserData());
  const [currentMode, setCurrentMode] = useState<TerminalMode>('stage');
  const [stagePhase, setStagePhase] = useState<StagePhase>('deck');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showHotkeysModal, setShowHotkeysModal] = useState(false);

  // Dynamic Vocabulary Pool & Google Sheets Sync State
  const [wordsPool, setWordsPool] = useState<WordItem[]>(() => ALL_WORDS_POOL);
  const [syncStatus, setSyncStatus] = useState<VocabDataSource | 'syncing'>('mock');

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

  // Ingestion kosa kata, progres cloud, dan topik materi saat mount
  useEffect(() => {
    let isMounted = true;
    setSyncStatus('syncing');

    // 1. Fetch bank kosa kata dinamis
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

    // 2. Fetch progres belajar cloud dan lakukan smart-merge dengan localStorage
    fetchCloudUserProgress()
      .then((cloudProgress) => {
        if (!isMounted || !cloudProgress) return;
        setUserData((prev) => {
          const merged = mergeUserProgress(prev, cloudProgress);
          saveUserData(merged);
          return merged;
        });
      })
      .catch((err) => {
        console.warn('[App] Gagal sinkronisasi progres cloud saat mount:', err);
      });

    // 3. Fetch materi topik pengetahuan (KnowledgeTopics)
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

    return () => {
      isMounted = false;
    };
  }, []);

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

  // Sync state ke LocalStorage dan debounced background sync ke Google Sheets
  useEffect(() => {
    saveUserData(userData);

    const timeoutId = setTimeout(() => {
      pushCloudUserProgress(userData);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [userData]);

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
    setUserData(prev => {
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

      return {
        ...prev,
        wordStats: {
          ...prev.wordStats,
          [wordId]: {
            ...current,
            isBookmarked: !current.isBookmarked
          }
        }
      };
    });
  };

  const handleMarkInspected = (wordId: string) => {
    setUserData(prev => {
      const current = prev.wordStats[wordId];
      if (current?.isInspected) return prev;

      return {
        ...prev,
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
  };

  const handleQuizCorrectAnswer = (q: QuizQuestion) => {
    setUserData(prev => ({
      ...prev,
      wordStats: recordWordAttempt(prev.wordStats, q.wordId, true)
    }));
  };

  const handleQuizEliminationFail = (failedQuestion: QuizQuestion) => {
    setUserData(prev => ({
      ...prev,
      totalRunsAttempted: prev.totalRunsAttempted + 1,
      wordStats: recordWordAttempt(prev.wordStats, failedQuestion.wordId, false)
    }));
  };

  const handleQuizFlawlessVictory = () => {
    setUserData(prev => {
      if (isIndoBranch) {
        const alreadyCleared = (prev.clearedIndonesianStages || []).includes(currentStageId);
        const nextIndoStages = alreadyCleared
          ? (prev.clearedIndonesianStages || [])
          : [...(prev.clearedIndonesianStages || []), currentStageId].sort((a, b) => a - b);

        return {
          ...prev,
          dailyStreak: prev.dailyStreak + 1,
          clearedIndonesianStages: nextIndoStages,
          totalFlawlessRuns: prev.totalFlawlessRuns + 1,
          totalRunsAttempted: prev.totalRunsAttempted + 1
        };
      }

      const alreadyCleared = prev.clearedStages.includes(currentStageId);
      const nextClearedStages = alreadyCleared 
        ? prev.clearedStages 
        : [...prev.clearedStages, currentStageId];

      return {
        ...prev,
        dailyStreak: prev.dailyStreak + 1,
        clustersMasteredCount: nextClearedStages.length,
        clearedStages: nextClearedStages,
        totalFlawlessRuns: prev.totalFlawlessRuns + 1,
        totalRunsAttempted: prev.totalRunsAttempted + 1
      };
    });
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
      setUserData(prev => ({
        ...prev,
        currentStageId: stageId
      }));
    }
  };

  const handleRetentionResult = (wordId: string, isCorrect: boolean) => {
    setUserData(prev => ({
      ...prev,
      wordStats: recordWordAttempt(prev.wordStats, wordId, isCorrect)
    }));
  };

  const handleResetDemoData = () => {
    const fresh = getDefaultUserData();
    setUserData(fresh);
    saveUserData(fresh);
    pushCloudUserProgress(fresh).catch(err => console.warn('[App] Push reset progress failed:', err));
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
    setUserData((prev) => {
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
    });
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
        branches={branches}
        activeBranchId={activeBranchId}
        onSelectBranch={handleSelectBranch}
        onToggleSound={() => {
          setUserData(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
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
