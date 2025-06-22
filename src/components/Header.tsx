import React from 'react';
import { Moon, Sun, Music } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <header className="relative z-10 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <Music className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Wubble QuickTune
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              AI Music Preview Generator
            </p>
          </div>
        </div>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 sm:p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 group"
        >
          {darkMode ? (
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 group-hover:rotate-12 transition-transform duration-200" />
          ) : (
            <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:rotate-12 transition-transform duration-200" />
          )}
        </button>
      </div>
    </header>
  );
};