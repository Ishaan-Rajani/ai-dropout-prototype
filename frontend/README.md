# MindGuard AI Frontend

A modern React-based frontend dashboard for the AI Dropout & Mental Health Detection System.

## Features
- **Modern Dashboard UI**: Dark mode with glassmorphism effects.
- **Real-time Analysis**: Connects to the backend API to predict student risk levels.
- **Visual Feedback**: smooth animations, color-coded risk indicators, and intervention suggestions.
- **Responsive Design**: Works on desktop and mobile devices.

## Tech Stack
- **React 19** (via Vite)
- **Tailwind CSS v4** (Styling)
- **Framer Motion** (Animations)
- **Axios** (API Integration)
- **Lucide React** (Icons)

## Setup & Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## API Configuration
The frontend expects the backend API to be running at `http://127.0.0.1:8000`. You can modify the API endpoint in `src/App.jsx` if needed.
