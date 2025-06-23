import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl ${className}`}>
    {children}
  </div>
);

export default Card;
