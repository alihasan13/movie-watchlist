import React from 'react';

const NavButton = ({ icon: Icon, label, active, onClick, badge }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
        active 
          ? 'bg-white/20 text-white shadow-lg' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
          {badge}
        </span>
      )}
    </button>
  );
};

export default NavButton;