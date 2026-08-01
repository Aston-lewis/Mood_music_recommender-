import React, { useEffect, useState } from 'react';

const RetroLoader = ({ message = "SCANNING PLAYER EMOTION..." }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar filling up
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Loop or hold
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Compute how many blocks to draw for the progress bar (e.g. 10 blocks max)
  const totalBlocks = 10;
  const activeBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-retro-dark border-4 border-black pixel-border border-retro-yellow rounded-md glow-yellow max-w-md mx-auto text-center gap-4">
      {/* Blinking Loading Text */}
      <h3 className="font-pixel text-sm text-retro-yellow text-glow-yellow animate-[blink_1s_infinite]">
        {message}
      </h3>

      {/* Cyberpunk matrix status codes */}
      <div className="font-vt text-xs text-gray-500 text-left bg-black/50 p-2 w-full border border-black pixel-border">
        <div>&gt; CONNECTING SECURE GATEWAY... OK</div>
        <div>&gt; INJECTING PHOTO SENSOR ARRAY... OK</div>
        <div>&gt; ANALYZING NEURAL MAPS: {progress}%</div>
      </div>

      {/* Custom Retro Pixelated Progress Bar */}
      <div className="flex items-center gap-1 border-4 border-black pixel-border p-1 bg-black w-full max-w-[280px]">
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <div
            key={i}
            className={`h-5 flex-1 transition-colors duration-100 ${
              i < activeBlocks ? 'bg-retro-yellow' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      <div className="font-pixel text-[10px] text-gray-400 select-none">
        DO NOT SHIELD FACE FROM DETECTOR
      </div>
    </div>
  );
};

export default RetroLoader;
