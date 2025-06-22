import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MoodGenreSelector } from './components/MoodGenreSelector';
import { GenerateButton } from './components/GenerateButton';
import { AudioPlayer } from './components/AudioPlayer';
import { RecentTracks } from './components/RecentTracks';
import { LoadingAnimation } from './components/LoadingAnimation';
import { ConfettiEffect } from './components/ConfettiEffect';
import { useStore } from './store/useStore';
import { apiService } from './services/api';

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  
  const { 
    darkMode, 
    isGenerating, 
    setGenerating, 
    currentTrack, 
    setCurrentTrack,
    addToRecent 
  } = useStore();

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectionChange = (mood: string, genre: string) => {
    setSelectedMood(mood);
    setSelectedGenre(genre);
  };

  const handleGenerate = async () => {
    if (!selectedMood || !selectedGenre) return;

    setGenerating(true);
    try {
      const track = await apiService.generateTrack(selectedMood, selectedGenre);
      setCurrentTrack(track);
      addToRecent(track);
      // Trigger confetti after track is generated
      setShowConfetti(true);
    } catch (error) {
      console.error('Failed to generate track:', error);
      // You could add a toast notification here
    } finally {
      setGenerating(false);
    }
  };

  const canGenerate = selectedMood && selectedGenre && !isGenerating;

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
    }`}>
      {/* Enhanced animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 md:w-96 md:h-96 bg-purple-300/30 dark:bg-purple-700/20 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 md:w-96 md:h-96 bg-pink-300/30 dark:bg-pink-700/20 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-blue-300/30 dark:bg-blue-700/20 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Confetti Effect - Highest z-index */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <ConfettiEffect 
          trigger={showConfetti} 
          onComplete={() => setShowConfetti(false)} 
        />
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-16">
          <div className="space-y-6 sm:space-y-10">
            {/* Hero Section */}
            <div className="text-center py-4 sm:py-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 dark:from-purple-300 dark:via-pink-300 dark:to-blue-300 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
                Create Music Magic
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed px-4">
                Transform your emotions into beautiful melodies with our AI-powered music generator
              </p>
            </div>

            {/* Main Generator Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-900/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/30 dark:border-gray-700/30 shadow-2xl">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
              </div>
              
              <div className="relative z-10">
                <MoodGenreSelector
                  onSelectionChange={handleSelectionChange}
                  disabled={isGenerating}
                />

                <div className="mt-8 sm:mt-12">
                  <GenerateButton
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    isGenerating={isGenerating}
                  />
                </div>
              </div>
            </div>

            {/* Loading Animation */}
            {isGenerating && (
              <div className="bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-900/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
                <LoadingAnimation />
              </div>
            )}

            {/* Audio Player */}
            {currentTrack && !isGenerating && (
              <AudioPlayer track={currentTrack} />
            )}

            {/* Recent Tracks */}
            <RecentTracks />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;