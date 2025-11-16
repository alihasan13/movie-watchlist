# 🎬 CineVault - Movie Watchlist App

A beautiful, responsive movie watchlist application built with React, featuring a modern glassmorphic design, smooth animations, and seamless user experience.


## ✨ Features

### 🔐 User Authentication
- Sign up and login functionality
- Mock authentication with localStorage persistence
- Session management across page reloads
- Protected routes for watchlist access

### 🔍 Movie Search
- Real-time movie search powered by OMDb API
- Beautiful grid layout with movie posters
- Loading states and error handling
- Responsive design for all devices

### 📽️ Movie Details
- Comprehensive movie information (plot, cast, ratings, runtime)
- IMDb ratings and vote counts
- Genre tags and release dates
- Add/Remove from watchlist functionality

### ❤️ Personal Watchlist
- Save favorite movies to your personal collection
- Per-user watchlist storage
- Quick access to saved movies
- Easy removal from watchlist

### 🎨 Design Highlights
- **Glassmorphism UI** - Modern frosted glass effects
- **Smooth Animations** - Fade-in, scale, and hover effects
- **Gradient Backgrounds** - Beautiful purple-pink-red gradients
- **Micro-interactions** - Button hovers, card animations
- **Mobile-First** - Fully responsive across all devices
- **Dark Theme** - Eye-friendly dark interface

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OMDb API Key (free)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/alihasan13/movie-watchlist.git
cd movie-watchlist
```

2. **Install dependencies**
```bash
npm install
```

3. **Get your OMDb API Key**
   - Visit: [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
   - Select "FREE" plan (1,000 daily requests)
   - Enter your email and activate via the link sent to you
   - Copy your API key

4. **Create environment file**
```bash
# Create .env file in root directory
touch .env
```

Add your API key to `.env`:
```env
REACT_APP_OMDB_API_KEY=your_api_key_here
```

5. **Start the development server**
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

### 1. Searching Movies

1. Navigate to the Search page (default landing)
2. Enter a movie title in the search bar
3. Click "Search" or press Enter
4. Browse results in the grid layout
5. Click on any movie card to view details

**Example Searches:**
- "Inception"
- "The Matrix"
- "Avengers"
- "Titanic"

### 2. Managing Watchlist

#### Adding Movies
1. Search for a movie
2. Hover over the movie card
3. Click "+ Add" button
   - OR -
1. Open movie details
2. Click "Add to Watchlist" button

#### Viewing Watchlist
1. Click "Watchlist" in navigation
2. View all saved movies
3. Click any movie to see details

#### Removing Movies
1. Go to Watchlist page
2. Hover over a movie card
3. Click "Remove" button
   - OR -
1. Open movie details
2. Click "Remove from Watchlist"

---
**Version:** 1.0.0  
**Last Updated:** November 2024