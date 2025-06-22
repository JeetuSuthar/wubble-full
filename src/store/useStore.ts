import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface AppState {
  // UI State
  darkMode: boolean;
  isGenerating: boolean;
  currentTrack: Track | null;
  isPlaying: boolean;
  
  // User Data
  likedTracks: Track[];
  recentTracks: Track[];
  
  // Actions
  toggleDarkMode: () => void;
  setGenerating: (generating: boolean) => void;
  setCurrentTrack: (track: Track | null) => void;
  setPlaying: (playing: boolean) => void;
  toggleLike: (track: Track) => void;
  addToRecent: (track: Track) => void;
  clearRecent: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State - Dark mode as default
      darkMode: true,
      isGenerating: false,
      currentTrack: null,
      isPlaying: false,
      likedTracks: [],
      recentTracks: [],
      
      // Actions
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      setGenerating: (generating) => set({ isGenerating: generating }),
      
      setCurrentTrack: (track) => set({ currentTrack: track }),
      
      setPlaying: (playing) => set({ isPlaying: playing }),
      
      toggleLike: (track) => set((state) => {
        const isLiked = state.likedTracks.some(t => t.id === track.id);
        return {
          likedTracks: isLiked
            ? state.likedTracks.filter(t => t.id !== track.id)
            : [...state.likedTracks, track]
        };
      }),
      
      addToRecent: (track) => set((state) => ({
        recentTracks: [
          track,
          ...state.recentTracks.filter(t => t.id !== track.id)
        ].slice(0, 10) // Keep only last 10 tracks
      })),
      
      clearRecent: () => set({ recentTracks: [] })
    }),
    {
      name: 'wubble-quicktune-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        likedTracks: state.likedTracks,
        recentTracks: state.recentTracks
      })
    }
  )
);