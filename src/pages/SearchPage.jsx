import React, { useState } from 'react';
import { Search, Film } from 'lucide-react';
import { searchMovies } from '../services/api/omdbApi';
import MovieCard from '../components/movie/MovieCard';

const SearchPage = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const data = await searchMovies(query);
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Discover Your Next
            <br />
            Favorite Movie
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Search millions of movies, build your watchlist, never miss a classic
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-pink-400 transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies... (e.g., Inception, Batman, Titanic)"
                className="w-full pl-12 pr-32 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all text-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/50 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto p-6 bg-red-500/20 backdrop-blur-xl border border-red-500/50 rounded-2xl text-red-200 text-center animate-fadeIn">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && searched && movies.length === 0 && !error && (
          <div className="text-center py-20 animate-fadeIn">
            <Film className="w-20 h-20 text-white/30 mx-auto mb-4" />
            <p className="text-xl text-white/70">No movies found. Try another search.</p>
          </div>
        )}

        {/* Results Grid */}
        {movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fadeIn">
            {movies.map((movie, index) => (
              <MovieCard key={movie.imdbID} movie={movie} onNavigate={onNavigate} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;