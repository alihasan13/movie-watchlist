import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import Navigation from './components/layout/Navigation';
import AuthPage from './pages/AuthPage';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import WatchlistPage from './pages/WatchlistPage';

// Main App Logic Component
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('search');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const handleNavigate = (page, movieId = null) => {
    setCurrentPage(page);
    setSelectedMovieId(movieId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading CineVault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Page Routing */}
      {currentPage === 'login' && <AuthPage onNavigate={handleNavigate} />}
      {currentPage === 'search' && <SearchPage onNavigate={handleNavigate} />}
      {currentPage === 'details' && selectedMovieId && (
        <DetailsPage movieId={selectedMovieId} onNavigate={handleNavigate} />
      )}
      {currentPage === 'watchlist' && <WatchlistPage onNavigate={handleNavigate} />}
    </div>
  );
};

// Root App Component with Providers
function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <AppContent />
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;