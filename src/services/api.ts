import axios from 'axios';

const API_BASE_URL = 'https://wubble-full-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface Track {
  id: number;
  title: string;
  mood: string;
  genre: string;
  duration: number;
  url: string;
  preview: string;
  generatedAt: string;
}

export const apiService = {
  async getMoods(): Promise<string[]> {
    const response = await api.get('/moods');
    return response.data;
  },

  async getGenres(): Promise<string[]> {
    const response = await api.get('/genres');
    return response.data;
  },

  async generateTrack(mood: string, genre: string): Promise<Track> {
    const response = await api.post('/generate', { mood, genre });
    return response.data;
  },

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await api.get('/health');
    return response.data;
  }
};