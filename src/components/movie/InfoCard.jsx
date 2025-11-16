import React from 'react';

const InfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <Icon className="w-5 h-5 text-pink-400 mb-2" />
      <p className="text-white/50 text-xs mb-1">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
};

export default InfoCard;