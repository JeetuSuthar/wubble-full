# Wubble QuickTune Mini AI Music Preview Generator

A beautiful, production-ready full-stack web application that simulates AI-powered music generation with mood and genre selection, audio playback, and user preferences management.

## 🎵 Features

### Core Features
- **Mood & Genre Selection**: Choose from 4 moods (Happy, Sad, Energetic, Chill) and 4 genres (Pop, Lo-fi, Cinematic, EDM)
- **AI Music Generation**: Simulated track generation with realistic 2-second loading animation
- **Audio Player**: Custom-built player with play/pause, progress control, volume adjustment
- **Download Functionality**: Download generated tracks
- **Like/Favorite System**: Save favorite tracks with localStorage persistence
- **Recent Tracks**: View and replay recently generated tracks

### Bonus Features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Micro-interactions and loading states
- **localStorage Persistence**: Saves user preferences and data
- **Professional UI**: Glass-morphism effects and gradient backgrounds

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Node.js** with Express
- **CORS** enabled
- **RESTful API** endpoints
- **Mock data** for track generation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wubble-quicktune
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

This will start both the frontend (Vite) and backend (Express) servers concurrently.

### URLs
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx              # App header with logo and dark mode toggle
│   ├── MoodGenreSelector.tsx   # Mood and genre selection interface
│   ├── GenerateButton.tsx     # Track generation button with loading state
│   ├── AudioPlayer.tsx        # Custom audio player component
│   ├── RecentTracks.tsx       # Recent tracks display
│   └── LoadingAnimation.tsx   # Loading animation during generation
├── services/
│   └── api.ts                 # API service layer
├── store/
│   └── useStore.ts            # Zustand store for state management
├── App.tsx                    # Main application component
├── main.tsx                   # React entry point
└── index.css                  # Global styles and animations

server/
└── index.js                   # Express server with API endpoints
```

## 🎨 Design Philosophy

The application follows modern web design principles:

- **Glass-morphism Effects**: Translucent backgrounds with backdrop blur
- **Gradient Backgrounds**: Dynamic color schemes that adapt to dark/light mode
- **Micro-interactions**: Hover states, button animations, and smooth transitions
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🔧 API Endpoints

- `GET /api/moods` - Get available moods
- `GET /api/genres` - Get available genres
- `POST /api/generate` - Generate a new track
- `GET /api/health` - Health check endpoint

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Implementation Choices

### State Management
- **Zustand** chosen for its simplicity and TypeScript support
- **Persistent store** for user preferences (dark mode, favorites, recent tracks)
- **Modular state** with clear separation of concerns

### Audio Handling
- **HTML5 Audio API** for reliable cross-browser playback
- **Custom controls** for better user experience
- **Progress tracking** with visual feedback

### Performance Optimizations
- **Lazy loading** of audio files
- **Efficient re-renders** using React best practices
- **Optimized bundle size** with tree-shaking

## 🚀 Future Improvements

See [FUTURE.md](./FUTURE.md) for detailed plans on scaling and enhancing the application.

## 🧪 Testing

The application includes comprehensive error handling and graceful fallbacks for network issues and API failures.

## 📄 License

This project is part of a coding challenge for Wubble's Full Stack Developer Internship.

## 🤝 Contributing

This is a coding challenge submission. For feedback or questions, please contact through the provided channels.

---

Built with ❤️ for Wubble's coding challenge