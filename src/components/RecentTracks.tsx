import React from 'react';
import { Clock, Heart, Play, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const RecentTracks: React.FC = () => {
  const { recentTracks, likedTracks, clearRecent, toggleLike, setCurrentTrack } = useStore();

  if (recentTracks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            Recent Tracks
          </h3>
        </div>
        <button
          onClick={clearRecent}
          className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {recentTracks.slice(0, 5).map((track) => {
          const isLiked = likedTracks.some(t => t.id === track.id);
          
          return (
            <div
              key={track.id}
              className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <button
                  onClick={() => setCurrentTrack(track)}
                  className="p-1.5 sm:p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200 flex-shrink-0"
                >
                  <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white truncate">
                    {track.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {track.mood} • {track.genre}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => toggleLike(track)}
                className={`p-1 rounded-full transition-colors duration-200 flex-shrink-0 ${
                  isLiked
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 dark:text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};