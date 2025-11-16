import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Calendar, Clock, TrendingUp, Sparkles, Heart, Film } from 'lucide-react';
import { getMovieDetails } from '../services/api/omdbApi';
import { useWatchlist } from '../context/WatchlistContext';
import InfoCard from '../components/movie/InfoCard';
import DetailItem from '../components/movie/DetailItem';

const DetailsPage = ({ movieId, onNavigate }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!movie || movie.Response === 'False') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-white text-xl">Movie not found</p>
          <button
            onClick={() => onNavigate('search')}
            className="mt-4 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-all"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(movie.imdbID);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <button
          onClick={() => onNavigate('search')}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl text-white transition-all duration-300 border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 animate-fadeIn">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-fadeInLeft">
              {movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                  <Film className="w-24 h-24 text-white/30" />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 animate-fadeInRight">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              {movie.Title}
            </h1>

            {/* Genres */}
            <div className="flex flex-wrap gap-3 mb-6">
              {movie.Genre && movie.Genre.split(', ').map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-white text-sm font-medium border border-white/20"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <InfoCard icon={Calendar} label="Released" value={movie.Released} />
              <InfoCard icon={Clock} label="Runtime" value={movie.Runtime} />
              <InfoCard icon={Star} label="IMDb Rating" value={movie.imdbRating} />
              <InfoCard icon={TrendingUp} label="Votes" value={movie.imdbVotes} />
            </div>

            {/* Plot */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
              <h2 className="text-white text-xl font-semibold mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-pink-400" />
                Plot
              </h2>
              <p className="text-white/80 leading-relaxed">{movie.Plot}</p>
            </div>

            {/* Additional Details */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <DetailItem label="Director" value={movie.Director} />
              <DetailItem label="Writer" value={movie.Writer} />
              <DetailItem label="Actors" value={movie.Actors} />
              <DetailItem label="Language" value={movie.Language} />
            </div>

            {/* Watchlist Button */}
            <button
              onClick={() => {
                if (inWatchlist) {
                  removeFromWatchlist(movie.imdbID);
                } else {
                  addToWatchlist(movie);
                }
              }}
              className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 ${
                inWatchlist
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:shadow-red-500/50'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/50'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWatchlist ? 'fill-current' : ''}`} />
              <span>{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;