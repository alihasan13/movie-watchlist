import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create Context
const WatchlistContext = createContext();

// Custom Hook to use Watchlist Context
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
};

// Watchlist Provider Component
export const WatchlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage when user changes
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`watchlist_${user.id}`);
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } else {
      setWatchlist([]);
    }
  }, [user]);

  // Save watchlist to localStorage
  const saveWatchlist = (newWatchlist) => {
    if (user) {
      localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(newWatchlist));
      setWatchlist(newWatchlist);
    }
  };

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    const exists = watchlist.find(m => m.imdbID === movie.imdbID);
    if (!exists) {
      saveWatchlist([...watchlist, movie]);
    }
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (imdbID) => {
    saveWatchlist(watchlist.filter(m => m.imdbID !== imdbID));
  };

  // Check if movie is in watchlist
  const isInWatchlist = (imdbID) => {
    return watchlist.some(m => m.imdbID === imdbID);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};