import React from 'react';

const Button = ({ variant = 'primary', size = 'md', children, onClick, disabled, className = '' }) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center';

  const variants = {
    primary: 'bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white/15 hover:bg-white/25 text-slate-800 border border-white/30 backdrop-blur-sm font-semibold',
    danger: 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg',
    ghost: 'hover:bg-white/15 text-slate-700 hover:text-slate-800 font-medium'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
