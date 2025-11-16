import React from 'react';
import { Film, Heart, X, Play } from 'lucide-react';

const WatchlistCard = ({ movie, onNavigate, onRemove, index }) => {
  return (
    <div
      className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50 cursor-pointer"
        onClick={() => onNavigate('details', movie.imdbID)}
      >
        {movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film className="w-16 h-16 text-white/30" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="w-full py-2 bg-red-500/90 hover:bg-red-600 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center space-x-2 mb-2"
          >
            <X className="w-4 h-4" />
            <span className="text-sm">Remove</span>
          </button>
          <button className="w-full py-2 bg-white/90 hover:bg-white rounded-lg font-medium text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2">
            <Play className="w-4 h-4" />
            <span className="text-sm">Details</span>
          </button>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1 group-hover:text-pink-300 transition-colors">
          {movie.Title}
        </h3>
        <p className="text-white/50 text-xs">{movie.Year}</p>
      </div>

      <div className="absolute top-2 right-2 bg-pink-500 rounded-full p-2 shadow-lg">
        <Heart className="w-4 h-4 text-white fill-current" />
      </div>
    </div>
  );
};

export default WatchlistCard;