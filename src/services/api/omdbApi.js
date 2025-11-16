// API Configuration
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY ;
const API_BASE = 'https://www.omdbapi.com';

/**
 * Search for movies by title
 * @param {string} query - Search query
 * @returns {Promise} - API response with search results
 */
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE}?apikey=${OMDB_API_KEY}&s=${query}&type=movie`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get detailed information about a movie
 * @param {string} imdbID - IMDb ID of the movie
 * @returns {Promise} - API response with movie details
 */
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${API_BASE}?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};