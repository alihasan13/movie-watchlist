import React from 'react';

const DetailItem = ({ label, value }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
      <p className="text-white/50 text-sm mb-1">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
};

export default DetailItem;