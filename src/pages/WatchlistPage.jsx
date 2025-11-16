import React from 'react';
import { Heart, Film, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import WatchlistCard from '../components/movie/WatchlistCard';

const WatchlistPage = ({ onNavigate }) => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const { user } = useAuth();

  // If user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center p-4">
        <div className="text-center animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/20">
            <Heart className="w-10 h-10 text-pink-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Sign in Required</h2>
          <p className="text-white/70 mb-6 max-w-md">
            Please sign in to access your personal watchlist and save your favorite movies.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fadeIn">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-10 h-10 text-pink-400 fill-current" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">My Watchlist</h1>
          </div>
          <p className="text-white/70 text-lg">
            You have {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
          </p>
        </div>

        {/* Empty State */}
        {watchlist.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 backdrop-blur-xl rounded-full mb-6 border border-white/10">
              <Film className="w-12 h-12 text-white/30" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your watchlist is empty</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Start exploring and add movies to your watchlist to keep track of what you want to watch.
            </p>
            <button
              onClick={() => onNavigate('search')}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/50 inline-flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Discover Movies</span>
            </button>
          </div>
        ) : (
          // Watchlist Grid
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchlist.map((movie, index) => (
              <WatchlistCard
                key={movie.imdbID}
                movie={movie}
                onNavigate={onNavigate}
                onRemove={() => removeFromWatchlist(movie.imdbID)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;