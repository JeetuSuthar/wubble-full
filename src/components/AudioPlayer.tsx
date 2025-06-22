import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Heart, Volume2, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Track {
  id: number;
  title: string;
  mood: string;
  genre: string;
  duration: number;
  url: string;
  preview: string;
  generatedAt: string;
}

interface AudioPlayerProps {
  track: Track;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const { isPlaying, setPlaying, toggleLike, likedTracks, addToRecent } = useStore();
  const isLiked = likedTracks.some(t => t.id === track.id);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const duration = audio.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
        setCurrentTime(current);
      }
    };

    const handleEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    const handleLoadedData = () => {
      audio.volume = volume;
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [setPlaying, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing audio:', error);
          setPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, setPlaying]);

  const togglePlayPause = () => {
    setPlaying(!isPlaying);
    if (!isPlaying) {
      addToRecent(track);
    }
  };

  const handleLike = () => {
    toggleLike(track);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(track.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${track.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link
      const link = document.createElement('a');
      link.href = track.url;
      link.download = `${track.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp3`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: track.title,
          text: `Check out this ${track.mood} ${track.genre} track I generated!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${track.title} - ${window.location.href}`);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration;
    
    audio.currentTime = newTime;
    setProgress((newTime / audio.duration) * 100);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-900/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse"></div>
      </div>
      
      <audio ref={audioRef} src={track.preview} preload="metadata" />
      
      {/* Track Info Header */}
      <div className="relative z-10 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight">
              {track.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold rounded-full backdrop-blur-sm">
                {track.mood}
              </span>
              <span className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold rounded-full backdrop-blur-sm">
                {track.genre}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 justify-end">
            <button
              onClick={handleShare}
              className="p-2 sm:p-3 bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            >
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <button
              onClick={handleLike}
              className={`p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm ${
                isLiked
                  ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/25'
                  : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-red-100/80 dark:hover:bg-red-900/20'
              }`}
            >
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="relative z-10 mb-6 sm:mb-8">
        <div 
          className="w-full h-2 sm:h-3 bg-gray-200/60 dark:bg-gray-700/60 rounded-full cursor-pointer group backdrop-blur-sm border border-white/20"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-150 group-hover:from-purple-600 group-hover:to-pink-600 shadow-lg shadow-purple-500/25"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-white/30 rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 font-medium">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Main Play Button */}
          <button
            onClick={togglePlayPause}
            className="relative p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl shadow-purple-500/25 group"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            {isPlaying ? (
              <Pause className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 relative z-10" />
            ) : (
              <Play className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ml-1 relative z-10" />
            )}
          </button>
          
          {/* Volume Control */}
          <div className="flex items-center space-x-2 sm:space-x-3 bg-white/50 dark:bg-gray-800/50 rounded-full px-3 py-2 sm:px-4 backdrop-blur-sm border border-white/20">
            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 sm:w-20 md:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="relative p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25 group"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <Download className={`h-4 w-4 sm:h-5 sm:w-5 relative z-10 ${isDownloading ? 'animate-bounce' : ''}`} />
          </button>
        </div>
      </div>

      {/* Subtle animation overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
    </div>
  );
};