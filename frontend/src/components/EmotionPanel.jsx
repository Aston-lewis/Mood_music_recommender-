import React from 'react';
import { motion } from 'framer-motion';

// Pixel Art SVGs for each emotion mascot
const MoodBotMascot = ({ emotion }) => {
  // Determine color and face pixels based on emotion
  let screenColor = '#39ff14'; // default green
  let borderGlow = 'rgba(57, 255, 20, 0.4)';
  let eyeColor = '#000000';
  let facePath = null;
  let animVariants = {};

  const cleanEmotion = emotion ? emotion.toLowerCase().trim() : 'neutral';

  switch (cleanEmotion) {
    case 'happy':
      screenColor = '#39ff14'; // Pixel green
      borderGlow = 'rgba(57, 255, 20, 0.5)';
      animVariants = {
        animate: {
          y: [0, -10, 0],
          scaleY: [1, 0.9, 1.1, 1],
          transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
        }
      };
      // Happy eyes ^ ^ and happy mouth \_/
      facePath = (
        <>
          {/* Left Eye ^ */}
          <rect x="10" y="11" width="2" height="2" fill={eyeColor} />
          <rect x="8" y="12" width="2" height="2" fill={eyeColor} />
          <rect x="12" y="12" width="2" height="2" fill={eyeColor} />
          {/* Right Eye ^ */}
          <rect x="22" y="11" width="2" height="2" fill={eyeColor} />
          <rect x="20" y="12" width="2" height="2" fill={eyeColor} />
          <rect x="24" y="12" width="2" height="2" fill={eyeColor} />
          {/* Mouth \_/ */}
          <rect x="14" y="19" width="6" height="2" fill={eyeColor} />
          <rect x="12" y="17" width="2" height="2" fill={eyeColor} />
          <rect x="20" y="17" width="2" height="2" fill={eyeColor} />
        </>
      );
      break;

    case 'sad':
      screenColor = '#00f0ff'; // Cyan
      borderGlow = 'rgba(0, 240, 255, 0.5)';
      animVariants = {
        animate: {
          y: [0, 4, 0],
          scaleY: [1, 0.95, 1],
          transition: { repeat: Infinity, duration: 2.0, ease: "easeInOut" }
        }
      };
      // Sad eyes T T and sad mouth n
      facePath = (
        <>
          {/* Left Eye T */}
          <rect x="8" y="11" width="6" height="2" fill={eyeColor} />
          <rect x="10" y="13" width="2" height="3" fill={eyeColor} />
          {/* Right Eye T */}
          <rect x="20" y="11" width="6" height="2" fill={eyeColor} />
          <rect x="22" y="13" width="2" height="3" fill={eyeColor} />
          {/* Tears */}
          <rect x="10" y="16" width="2" height="2" fill="#0000ff" className="animate-pulse" />
          <rect x="22" y="16" width="2" height="2" fill="#0000ff" className="animate-pulse" />
          {/* Mouth n */}
          <rect x="14" y="18" width="6" height="2" fill={eyeColor} />
          <rect x="12" y="20" width="2" height="2" fill={eyeColor} />
          <rect x="20" y="20" width="2" height="2" fill={eyeColor} />
        </>
      );
      break;

    case 'angry':
      screenColor = '#ff3333'; // Red
      borderGlow = 'rgba(255, 51, 51, 0.6)';
      animVariants = {
        animate: {
          x: [-2, 2, -2, 2, 0],
          y: [-1, 1, -1, 1, 0],
          transition: { repeat: Infinity, duration: 0.15 }
        }
      };
      // Angry eyes > < and frown
      facePath = (
        <>
          {/* Left Eye > */}
          <rect x="8" y="11" width="2" height="2" fill={eyeColor} />
          <rect x="10" y="12" width="2" height="2" fill={eyeColor} />
          <rect x="8" y="13" width="2" height="2" fill={eyeColor} />
          {/* Right Eye < */}
          <rect x="24" y="11" width="2" height="2" fill={eyeColor} />
          <rect x="22" y="12" width="2" height="2" fill={eyeColor} />
          <rect x="24" y="13" width="2" height="2" fill={eyeColor} />
          {/* Eyebrows */}
          <rect x="8" y="9" width="6" height="2" fill={eyeColor} transform="rotate(15 11 10)" />
          <rect x="20" y="9" width="6" height="2" fill={eyeColor} transform="rotate(-15 23 10)" />
          {/* Angry mouth */}
          <rect x="13" y="18" width="8" height="2" fill={eyeColor} />
        </>
      );
      break;

    case 'surprise':
      screenColor = '#ff007f'; // Neon pink
      borderGlow = 'rgba(255, 0, 127, 0.5)';
      animVariants = {
        animate: {
          scale: [1, 1.05, 0.98, 1.05, 1],
          y: [0, -6, 0],
          transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
        }
      };
      // Surprise eyes O O and mouth o
      facePath = (
        <>
          {/* Left Eye */}
          <rect x="8" y="11" width="4" height="4" fill={eyeColor} />
          <rect x="9" y="12" width="2" height="2" fill="#fff" />
          {/* Right Eye */}
          <rect x="22" y="11" width="4" height="4" fill={eyeColor} />
          <rect x="23" y="12" width="2" height="2" fill="#fff" />
          {/* Mouth o */}
          <rect x="15" y="17" width="4" height="4" fill={eyeColor} />
        </>
      );
      break;

    case 'fear':
      screenColor = '#9d4edd'; // Purple
      borderGlow = 'rgba(157, 78, 221, 0.5)';
      animVariants = {
        animate: {
          x: [-1.5, 1.5, -1.5, 1.5, 0],
          transition: { repeat: Infinity, duration: 0.1, ease: "linear" }
        }
      };
      // Fear eyes . . and wavy mouth
      facePath = (
        <>
          {/* Left Eye */}
          <rect x="10" y="12" width="2" height="2" fill={eyeColor} />
          {/* Right Eye */}
          <rect x="22" y="12" width="2" height="2" fill={eyeColor} />
          {/* Sweat droplet */}
          <rect x="26" y="8" width="2" height="4" fill="#00f0ff" className="animate-bounce" />
          {/* Wavy mouth */}
          <rect x="12" y="18" width="2" height="2" fill={eyeColor} />
          <rect x="14" y="17" width="2" height="2" fill={eyeColor} />
          <rect x="16" y="18" width="2" height="2" fill={eyeColor} />
          <rect x="18" y="17" width="2" height="2" fill={eyeColor} />
          <rect x="20" y="18" width="2" height="2" fill={eyeColor} />
        </>
      );
      break;

    case 'disgust':
      screenColor = '#aacc00'; // Lime/dirty yellow
      borderGlow = 'rgba(170, 204, 0, 0.5)';
      animVariants = {
        animate: {
          skewX: [-4, 4, -4],
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }
      };
      // Squinting eyes / \ and squiggly mouth
      facePath = (
        <>
          {/* Left squint */}
          <rect x="9" y="12" width="4" height="2" fill={eyeColor} transform="rotate(25 11 13)" />
          {/* Right squint */}
          <rect x="21" y="12" width="4" height="2" fill={eyeColor} transform="rotate(-25 23 13)" />
          {/* Mouth squiggly */}
          <rect x="12" y="19" width="3" height="2" fill={eyeColor} />
          <rect x="15" y="17" width="3" height="2" fill={eyeColor} />
          <rect x="18" y="18" width="3" height="2" fill={eyeColor} />
        </>
      );
      break;

    case 'neutral':
    default:
      screenColor = '#ffcc00'; // Retro Yellow
      borderGlow = 'rgba(255, 204, 0, 0.4)';
      animVariants = {
        animate: {
          y: [0, -2, 0],
          transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }
      };
      // Neutral eyes - - and flat mouth
      facePath = (
        <>
          {/* Left Eye */}
          <rect x="8" y="12" width="4" height="2" fill={eyeColor} />
          {/* Right Eye */}
          <rect x="22" y="12" width="4" height="2" fill={eyeColor} />
          {/* Mouth - */}
          <rect x="12" y="18" width="10" height="2" fill={eyeColor} />
        </>
      );
      break;
  }

  return (
    <motion.div
      variants={animVariants}
      animate="animate"
      className="w-32 h-32 mx-auto filter drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
      style={{
        filter: `drop-shadow(0 0 8px ${borderGlow})`
      }}
    >
      <svg
        viewBox="0 0 34 34"
        width="100%"
        height="100%"
        className="image-rendering-pixelated"
      >
        {/* Antennas */}
        <rect x="16" y="0" width="2" height="4" fill="#6b7280" />
        <rect x="15" y="0" width="4" height="1" fill="#ff007f" />

        {/* Outer CRT Case */}
        <rect x="2" y="4" width="30" height="26" fill="#1f2937" rx="2" />
        <rect x="4" y="6" width="26" height="22" fill="#111827" />

        {/* Screen Bezel shadow */}
        <rect x="5" y="7" width="24" height="20" fill="#374151" />

        {/* CRT Screen Glow */}
        <rect x="6" y="8" width="22" height="18" fill={screenColor} />

        {/* Screen highlight (glass shimmer) */}
        <rect x="7" y="9" width="3" height="3" fill="#ffffff" opacity="0.3" />
        <rect x="10" y="9" width="6" height="1" fill="#ffffff" opacity="0.15" />

        {/* Mood Face Rendering */}
        {facePath}

        {/* Base / Neck */}
        <rect x="12" y="30" width="10" height="2" fill="#4b5563" />
        <rect x="9" y="32" width="16" height="2" fill="#1f2937" />
      </svg>
    </motion.div>
  );
};

const EmotionPanel = ({ emotion }) => {
  // Map emotion to pixel emojis and colors
  const emotionConfig = {
    happy: { emoji: '😊', label: 'HAPPY', color: 'text-retro-green text-glow-green', border: 'border-retro-green bg-retro-green/10' },
    sad: { emoji: '😢', label: 'SAD', color: 'text-retro-cyan text-glow-cyan', border: 'border-retro-cyan bg-retro-cyan/10' },
    angry: { emoji: '😡', label: 'ANGRY', color: 'text-retro-red text-glow-red', border: 'border-retro-red bg-retro-red/10' },
    neutral: { emoji: '😐', label: 'NEUTRAL', color: 'text-retro-yellow text-glow-yellow', border: 'border-retro-yellow bg-retro-yellow/10' },
    surprise: { emoji: '😲', label: 'SURPRISE', color: 'text-retro-pink text-glow-pink', border: 'border-retro-pink bg-retro-pink/10' },
    fear: { emoji: '😨', label: 'FEAR', color: 'text-retro-purple text-glow-purple', border: 'border-retro-purple bg-retro-purple/10' },
    disgust: { emoji: '🤢', label: 'DISGUST', color: 'text-green-500', border: 'border-green-500 bg-green-500/10' },
    default: { emoji: '👾', label: 'AWAITING PLAYER...', color: 'text-white', border: 'border-white bg-white/5' }
  };

  const config = emotionConfig[emotion?.toLowerCase()] || emotionConfig.default;

  return (
    <div className={`w-full bg-retro-dark border-4 border-black p-6 pixel-border ${config.border} flex flex-col items-center justify-center gap-4 text-center rounded-md`}>
      <span className="font-pixel text-xs text-gray-500 uppercase tracking-widest">
        Detected Mood
      </span>

      {/* Mascot character */}
      <div className="my-2">
        <MoodBotMascot emotion={emotion} />
      </div>

      {/* Emotion display card */}
      <div className="flex flex-col gap-1 items-center">
        <span className="text-4xl select-none animate-bounce">{config.emoji}</span>
        <h2 className={`font-pixel text-2xl tracking-widest ${config.color}`}>
          {config.label}
        </h2>
      </div>

      <div className="w-full bg-black/40 border-2 border-black pixel-border p-2 mt-2 text-xs font-vt text-gray-400">
        {emotion ? (
          <span className="text-retro-green uppercase">
            &gt; MOOD MATCHED SUCCESSFULLY. SCAN STABLE.
          </span>
        ) : (
          <span className="animate-pulse">
            &gt; STAND BY. POSITION FACE IN CAMERA FRAME AND CLICK EMOTION SCAN...
          </span>
        )}
      </div>
    </div>
  );
};

export default EmotionPanel;
