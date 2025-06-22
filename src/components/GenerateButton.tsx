import React from 'react';
import { Wand2, Loader2, Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  disabled,
  isGenerating
}) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled || isGenerating}
        className={`
          relative group px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold text-white text-sm sm:text-base md:text-lg overflow-hidden
          transition-all duration-300 transform hover:scale-105 active:scale-95
          ${disabled && !isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700'
          }
          ${isGenerating ? 'animate-pulse' : ''}
          shadow-2xl hover:shadow-purple-500/25
          disabled:transform-none disabled:hover:scale-100
          border border-white/20
        `}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-gradient-x"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
        
        <div className="relative z-10 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-spin" />
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-pulse" />
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 group-hover:rotate-12 transition-transform duration-200" />
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:animate-bounce" />
            </>
          )}
          <span className="text-sm sm:text-base md:text-xl">
            {isGenerating ? 'Crafting Magic...' : 'Generate Track'}
          </span>
        </div>
        
        {/* Loading progress indicator */}
        {isGenerating && (
          <div className="absolute bottom-0 left-0 h-1 bg-white/40 rounded-full overflow-hidden w-full">
            <div className="h-full bg-white rounded-full animate-progress-bar"></div>
          </div>
        )}
      </button>
    </div>
  );
};