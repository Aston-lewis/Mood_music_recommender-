import React from 'react';
import { Volume2, VolumeX, Monitor, MonitorOff } from 'lucide-react';
import { playClick } from '../utils/audio';

const PixelNavbar = ({ isMuted, toggleMute, isCrtOn, toggleCrt }) => {
  const handleMuteClick = () => {
    playClick();
    toggleMute();
  };

  const handleCrtClick = () => {
    playClick();
    toggleCrt();
  };

  return (
    <nav className="w-full bg-retro-dark border-b-4 border-black p-4 flex flex-col md:flex-row justify-between items-center gap-4 z-50 pixel-border glow-pink">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <span className="text-retro-pink text-2xl animate-pulse font-pixel font-bold tracking-wider select-none text-glow-pink">
          👾 AI MOOD RECS
        </span>
      </div>

      {/* Game HUD Status Info */}
      <div className="flex items-center gap-6 text-sm font-pixel text-white">
        <div className="flex flex-col items-center">
          <span className="text-retro-cyan text-glow-cyan text-xs">PLAYER 1</span>
          <span className="text-retro-green animate-pulse">ACTIVE</span>
        </div>
        <div className="hidden sm:flex flex-col items-center">
          <span className="text-retro-yellow text-xs">STAGE</span>
          <span>1-1</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-retro-pink text-glow-pink text-xs">HI-SCORE</span>
          <span>99999</span>
        </div>
      </div>

      {/* Settings / Controls */}
      <div className="flex items-center gap-3">
        {/* CRT Toggle Button */}
        <button
          onClick={handleCrtClick}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-pixel text-white border-2 border-black pixel-border retro-btn ${
            isCrtOn ? 'bg-retro-purple shadow-pixel-solid-cyan' : 'bg-gray-700 shadow-pixel-solid'
          }`}
          title="Toggle CRT Scanline Effect"
        >
          {isCrtOn ? <Monitor className="w-4 h-4" /> : <MonitorOff className="w-4 h-4" />}
          <span className="hidden md:inline">CRT: {isCrtOn ? 'ON' : 'OFF'}</span>
        </button>

        {/* Audio Mute Button */}
        <button
          onClick={handleMuteClick}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-pixel text-white border-2 border-black pixel-border retro-btn ${
            !isMuted ? 'bg-retro-pink shadow-pixel-solid-cyan' : 'bg-gray-700 shadow-pixel-solid'
          }`}
          title="Toggle Arcade Sounds"
        >
          {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          <span className="hidden md:inline">SOUND: {!isMuted ? 'ON' : 'MUTED'}</span>
        </button>
      </div>
    </nav>
  );
};

export default PixelNavbar;
