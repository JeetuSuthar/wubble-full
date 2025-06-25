import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


const mockTracks = {
  'happy-pop': [
    {
      id: 1,
      title: 'Sunny Day Vibes',
      mood: 'Happy',
      genre: 'Pop',
      duration: 180,
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      preview: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
    },
    {
      id: 2,
      title: 'Upbeat Energy',
      mood: 'Happy',
      genre: 'Pop',
      duration: 165,
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      preview: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
    }
  ],
  'sad-lofi': [
    {
      id: 3,
      title: 'Melancholy Nights',
      mood: 'Sad',
      genre: 'Lo-fi',
      duration: 210,
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      preview: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
    }
  ],
  'energetic-edm': [
    {
      id: 4,
      title: 'Electric Rush',
      mood: 'Energetic',
      genre: 'EDM',
      duration: 195,
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      preview: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
    }
  ],
  'chill-cinematic': [
    {
      id: 5,
      title: 'Peaceful Horizon',
      mood: 'Chill',
      genre: 'Cinematic',
      duration: 240,
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      preview: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
    }
  ]
};

// API Routes
app.get('/api/moods', (req, res) => {
  res.json(['Happy', 'Sad', 'Energetic', 'Chill']);
});

app.get('/api/genres', (req, res) => {
  res.json(['Pop', 'Lo-fi', 'Cinematic', 'EDM']);
});

app.post('/api/generate', (req, res) => {
  const { mood, genre } = req.body;
  
  // Simulate AI processing delay
  setTimeout(() => {
    const key = `${mood.toLowerCase()}-${genre.toLowerCase()}`;
    const tracks = mockTracks[key] || mockTracks['happy-pop'];
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    
    // Add some randomness to the track
    const generatedTrack = {
      ...randomTrack,
      id: Date.now(),
      title: `${randomTrack.title} (${Math.floor(Math.random() * 100)})`,
      generatedAt: new Date().toISOString()
    };
    
    res.json(generatedTrack);
  }, 2000);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});