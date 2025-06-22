import React from 'react';
import { Music, Sparkles, Wand2 } from 'lucide-react';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-8">
      <div className="relative mb-6 sm:mb-8">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-4 border-purple-200/30 dark:border-purple-800/30 rounded-full animate-spin-slow">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-600 border-r-pink-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Middle ring */}
        <div className="absolute inset-3 sm:inset-4 w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 border-3 border-pink-200/30 dark:border-pink-800/30 rounded-full animate-spin-reverse">
          <div className="absolute top-0 left-0 w-full h-full border-3 border-transparent border-b-pink-500 border-l-purple-500 rounded-full animate-spin-slow"></div>
        </div>
        
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Music className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-purple-600 dark:text-purple-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 animate-float">
          <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-pink-500" />
        </div>
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 animate-float-delayed">
          <Wand2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
        </div>
        <div className="absolute top-1/2 -left-4 sm:-left-6 animate-bounce">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/4 -right-4 sm:-right-6 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
        </div>
      </div>
      
      <div className="text-center max-w-md">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Crafting Your Masterpiece
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed px-2">
          Our AI is weaving together the perfect harmony of emotions and rhythms just for you...
        </p>
        
        {/* Enhanced progress steps */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Analyzing mood patterns</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-pink-600 dark:text-pink-400">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="font-medium">Selecting perfect instruments</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="font-medium">Generating audio magic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};