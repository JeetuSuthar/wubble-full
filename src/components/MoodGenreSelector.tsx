import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Smile, Frown, Zap, Waves, Music2, Headphones, Film, Radio } from 'lucide-react';

interface MoodGenreSelectorProps {
  onSelectionChange: (mood: string, genre: string) => void;
  disabled?: boolean;
}

const moodIcons = {
  Happy: Smile,
  Sad: Frown,
  Energetic: Zap,
  Chill: Waves
};

const genreIcons = {
  Pop: Music2,
  'Lo-fi': Headphones,
  Cinematic: Film,
  EDM: Radio
};

const moodGradients = {
  Happy: 'from-yellow-400 via-orange-400 to-red-400',
  Sad: 'from-blue-400 via-indigo-400 to-purple-400',
  Energetic: 'from-red-400 via-pink-400 to-purple-400',
  Chill: 'from-green-400 via-teal-400 to-blue-400'
};

const genreGradients = {
  Pop: 'from-pink-400 via-purple-400 to-indigo-400',
  'Lo-fi': 'from-indigo-400 via-blue-400 to-cyan-400',
  Cinematic: 'from-gray-400 via-slate-400 to-zinc-400',
  EDM: 'from-purple-400 via-pink-400 to-red-400'
};

export const MoodGenreSelector: React.FC<MoodGenreSelectorProps> = ({
  onSelectionChange,
  disabled = false
}) => {
  const [moods, setMoods] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moodsData, genresData] = await Promise.all([
          apiService.getMoods(),
          apiService.getGenres()
        ]);
        setMoods(moodsData);
        setGenres(genresData);
      } catch (error) {
        console.error('Failed to fetch moods and genres:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMood && selectedGenre) {
      onSelectionChange(selectedMood, selectedGenre);
    }
  }, [selectedMood, selectedGenre, onSelectionChange]);

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Mood Selection */}
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            What's Your Vibe?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Choose the mood that matches your energy</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {moods.map((mood) => {
            const IconComponent = moodIcons[mood as keyof typeof moodIcons];
            const isSelected = selectedMood === mood;
            const gradient = moodGradients[mood as keyof typeof moodGradients];
            
            return (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                disabled={disabled}
                className={`relative group p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? 'border-white/50 shadow-2xl scale-105 text-white'
                    : 'border-white/20 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 hover:border-white/40 hover:scale-102 backdrop-blur-sm'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* Background gradient for selected state */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
                )}
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 flex flex-col items-center space-y-2 sm:space-y-3">
                  {IconComponent && (
                    <div className={`p-2 sm:p-3 rounded-full ${isSelected ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'} group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${
                        isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                  )}
                  <span className={`text-xs sm:text-sm font-semibold ${
                    isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-200'
                  }`}>
                    {mood}
                  </span>
                </div>
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Genre Selection */}
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pick Your Sound
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Select the genre that speaks to you</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {genres.map((genre) => {
            const IconComponent = genreIcons[genre as keyof typeof genreIcons];
            const isSelected = selectedGenre === genre;
            const gradient = genreGradients[genre as keyof typeof genreGradients];
            
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                disabled={disabled}
                className={`relative group p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? 'border-white/50 shadow-2xl scale-105 text-white'
                    : 'border-white/20 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 hover:border-white/40 hover:scale-102 backdrop-blur-sm'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* Background gradient for selected state */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
                )}
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 flex flex-col items-center space-y-2 sm:space-y-3">
                  {IconComponent && (
                    <div className={`p-2 sm:p-3 rounded-full ${isSelected ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'} group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${
                        isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                  )}
                  <span className={`text-xs sm:text-sm font-semibold ${
                    isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-200'
                  }`}>
                    {genre}
                  </span>
                </div>
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};