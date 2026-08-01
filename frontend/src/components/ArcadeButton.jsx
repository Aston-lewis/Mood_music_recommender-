import React from 'react';
import { playClick } from '../utils/audio';

const ArcadeButton = ({ 
  onClick, 
  children, 
  disabled = false, 
  color = 'pink', // pink, cyan, green, yellow
  className = '' 
}) => {
  const handlePress = (e) => {
    if (disabled) return;
    playClick();
    if (onClick) {
      onClick(e);
    }
  };

  // Color schemes for arcade-style button colors
  const colorSchemes = {
    pink: {
      bg: 'bg-retro-pink',
      border: 'border-pink-900',
      text: 'text-white',
      shadow: 'shadow-pixel-solid-cyan hover:shadow-[0_0_15px_#ff007f]',
    },
    cyan: {
      bg: 'bg-retro-cyan',
      border: 'border-cyan-900',
      text: 'text-black',
      shadow: 'shadow-pixel-solid-pink hover:shadow-[0_0_15px_#00f0ff]',
    },
    green: {
      bg: 'bg-retro-green',
      border: 'border-emerald-950',
      text: 'text-black',
      shadow: 'shadow-pixel-solid hover:shadow-[0_0_15px_#39ff14]',
    },
    yellow: {
      bg: 'bg-retro-yellow',
      border: 'border-yellow-900',
      text: 'text-black',
      shadow: 'shadow-pixel-solid hover:shadow-[0_0_15px_#ffcc00]',
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.pink;

  return (
    <button
      onClick={handlePress}
      disabled={disabled}
      className={`
        relative 
        px-6 py-4 
        font-pixel 
        text-sm 
        tracking-wider 
        uppercase 
        border-4 
        border-black 
        pixel-border 
        rounded-none
        transition-all 
        duration-75
        active:translate-y-1 
        active:shadow-none
        disabled:opacity-50 
        disabled:pointer-events-none 
        disabled:translate-y-0
        cursor-pointer
        select-none
        ${scheme.bg} 
        ${scheme.text}
        ${scheme.shadow}
        ${className}
      `}
    >
      {/* 3D Inner Bezel Glow */}
      <span className="absolute inset-x-0 top-0 h-1 bg-white/20 pointer-events-none" />
      <span className="absolute inset-y-0 left-0 w-1 bg-white/20 pointer-events-none" />
      
      {/* Label Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default ArcadeButton;
