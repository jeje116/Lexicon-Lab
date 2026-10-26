import { useState, useEffect, useMemo } from 'react';
import { HeaderHUD } from './components/HeaderHUD';
import { CommandSidebar } from './components/CommandSidebar';
import { BottomNav } from './components/BottomNav';
import { DailyLabView } from './components/DailyLabView';
import { NeuralVerbRetentionView } from './components/NeuralVerbRetentionView';
import { MemoryMatrixView } from './components/MemoryMatrixView';
import { HotkeyHelperModal } from './components/HotkeyHelperModal';

import { TerminalMode, StagePhase, QuizQuestion, WordItem } from './types/lexicon';
import { ALL_WORDS_POOL } from './data/mockLexicon';
import { fetchVocabularyData, VocabDataSource } from './services/vocabService';
import { loadUserData, saveUserData, recordWordAttempt, getDefaultUserData } from './utils/storage';
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

  const currentStageId = userData.currentStageId || 1;
  const clearedStages = userData.clearedStages || [];

  // Ingestion kosa kata dari Google Sheets Web App saat mount
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

    return () => {
      isMounted = false;
    };
  }, []);

  // 10 kata untuk stage yang sedang aktif dari pool dinamis
  const stageWords = useMemo(() => {
    const matched = wordsPool.filter(w => w.stageId === currentStageId);
    if (matched.length > 0) return matched;
    // Fallback jika stageId belum ada, tampilkan stage 1
    return wordsPool.filter(w => w.stageId === 1);
  }, [wordsPool, currentStageId]);

  // Soal Stage Quiz Acak 20 Soal Total (Zero-Tolerance)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    return generateStageQuizQuestions(stageWords, wordsPool);
  });

  // Re-generate soal saat stage berganti atau pool kosa kata diperbarui
  useEffect(() => {
    if (stageWords.length > 0) {
      setQuizQuestions(generateStageQuizQuestions(stageWords, wordsPool));
    }
  }, [stageWords, wordsPool]);

  // Sync state ke LocalStorage
  useEffect(() => {
    saveUserData(userData);
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
    setQuizQuestions(generateStageQuizQuestions(stageWords, wordsPool));
  };

  const handleSelectStage = (stageId: number) => {
    setUserData(prev => ({
      ...prev,
      currentStageId: stageId
    }));
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
    setCurrentMode('stage');
    setStagePhase('deck');
    const initialStageWords = wordsPool.filter(w => w.stageId === 1);
    setQuizQuestions(generateStageQuizQuestions(initialStageWords.length > 0 ? initialStageWords : wordsPool, wordsPool));
  };

  // Telemetry counts
  const inspectedCount = stageWords.filter(w => userData.wordStats[w.id]?.isInspected).length;
  const criticalDecayCount = wordsPool.filter(w => getMemoryTier(userData.wordStats[w.id]) === 'CRITICAL').length;
  const isStageCleared = clearedStages.includes(currentStageId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top HUD Telemetry Navigation Bar */}
      <HeaderHUD
        dailyStreak={userData.dailyStreak}
        clustersMasteredCount={clearedStages.length}
        totalLexemesLearned={wordsPool.length}
        soundEnabled={userData.soundEnabled}
        syncStatus={syncStatus}
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
        />

        {/* Dynamic Main Workspace Stage */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          
          {/* Tab 1: Stage Lab (Stage Deck + Floating Control Dock + Zero-Tolerance Stage Quiz) */}
          {currentMode === 'stage' && (
            <DailyLabView
              words={stageWords}
              allWords={wordsPool}
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

          {/* Tab 2: Retensi Kata Kerja (Neural Weighted Probability dari Stage Cleared) */}
          {currentMode === 'retention' && (
            <NeuralVerbRetentionView
              allWords={wordsPool}
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
              allWords={wordsPool}
              statsMap={userData.wordStats}
              onToggleBookmark={handleToggleBookmark}
              soundEnabled={userData.soundEnabled}
            />
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
        />
      )}

      {/* Hotkeys Modal */}
      {showHotkeysModal && (
        <HotkeyHelperModal onClose={() => setShowHotkeysModal(false)} />
      )}
    </div>
  );
}
