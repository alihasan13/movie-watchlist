import React from 'react';
import { Film, Search, Heart, LogIn, LogOut, User, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWatchlist } from '../../context/WatchlistContext';
import NavButton from './NavButton';
import MobileNavButton from './MobileNavButton';

const Navigation = ({ currentPage, onNavigate, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const { watchlist } = useWatchlist();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-pink-900/95 to-red-900/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('search')}>
            <div className="relative">
              <Film className="w-8 h-8 text-pink-400 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              CineVault
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavButton 
              icon={Search} 
              label="Search" 
              active={currentPage === 'search'} 
              onClick={() => onNavigate('search')} 
            />
            {user && (
              <NavButton 
                icon={Heart} 
                label="Watchlist" 
                active={currentPage === 'watchlist'} 
                onClick={() => onNavigate('watchlist')}
                badge={watchlist.length}
              />
            )}
            {user ? (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
                <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-full">
                  <User className="w-4 h-4 text-pink-300" />
                  <span className="text-sm text-white font-medium">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-all duration-300 text-white border border-red-400/30 hover:border-red-400/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full transition-all duration-300 text-white shadow-lg hover:shadow-pink-500/50 ml-4"
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-purple-900/98 backdrop-blur-xl border-t border-white/10 animate-slideDown">
          <div className="px-4 py-3 space-y-2">
            <MobileNavButton 
              icon={Search} 
              label="Search" 
              onClick={() => { onNavigate('search'); setIsMobileMenuOpen(false); }} 
            />
            {user && (
              <MobileNavButton 
                icon={Heart} 
                label={`Watchlist (${watchlist.length})`} 
                onClick={() => { onNavigate('watchlist'); setIsMobileMenuOpen(false); }} 
              />
            )}
            {user ? (
              <>
                <div className="px-4 py-3 bg-white/5 rounded-lg text-white text-sm">
                  <User className="w-4 h-4 inline mr-2 text-pink-300" />
                  {user.name}
                </div>
                <MobileNavButton 
                  icon={LogOut} 
                  label="Logout" 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                />
              </>
            ) : (
              <MobileNavButton 
                icon={LogIn} 
                label="Sign In" 
                onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }} 
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;