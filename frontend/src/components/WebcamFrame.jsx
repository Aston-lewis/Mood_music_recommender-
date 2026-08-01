import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, AlertCircle } from 'lucide-react';

const WebcamFrame = ({ webcamRef, isScanning }) => {
  const [hasError, setHasError] = useState(false);
  const [isCamReady, setIsCamReady] = useState(false);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  const handleUserMediaError = (err) => {
    console.error("Webcam media error:", err);
    setHasError(true);
  };

  const handleUserMedia = () => {
    setIsCamReady(true);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-retro-dark border-4 border-black p-4 pixel-border glow-cyan rounded-md">
      {/* CRT Bezel / Frame Screen */}
      <div className="relative aspect-[4/3] bg-black border-4 border-gray-800 overflow-hidden flex items-center justify-center">
        {/* Scanning Scanline Effect (Only visible during scan or permanently subtle) */}
        <div className={`absolute inset-0 pointer-events-none z-10 ${
          isScanning 
            ? 'bg-gradient-to-b from-transparent via-retro-cyan/40 to-transparent animate-[pulse_0.5s_infinite]' 
            : 'bg-gradient-to-b from-transparent via-retro-pink/10 to-transparent'
        }`}>
          {/* Laser scan line sweep */}
          <div className={`w-full h-1.5 bg-retro-cyan opacity-80 shadow-retro-cyan ${
            isScanning ? 'absolute top-0 animate-[moveSweep_1.5s_linear_infinite]' : 'hidden'
          }`} />
        </div>

        {/* Scan line sweep animation styling */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes moveSweep {
            0% { top: 0%; }
            100% { top: 100%; }
          }
        `}} />

        {/* Overlay HUD text */}
        <div className="absolute top-2 left-2 text-retro-cyan font-pixel text-xs z-10 select-none animate-pulse">
          🔴 LIVE FEED
        </div>
        <div className="absolute top-2 right-2 text-gray-500 font-pixel text-xs z-10 select-none">
          CAM_01
        </div>

        {hasError ? (
          <div className="flex flex-col items-center justify-center text-center p-6 text-retro-red">
            <AlertCircle className="w-12 h-12 mb-3 animate-bounce" />
            <p className="font-pixel text-sm uppercase mb-2">ERROR: NO CAMERA DETECTED</p>
            <p className="text-xs text-gray-400 font-vt max-w-[280px]">
              PLEASE ALLOW WEBCAM ACCESS OR CHECK CONNECTIONS TO PLAY
            </p>
          </div>
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMediaError={handleUserMediaError}
              onUserMedia={handleUserMedia}
              className="w-full h-full object-cover filter brightness-110 contrast-125 grayscale-[20%]"
            />
            
            {!isCamReady && (
              <div className="absolute inset-0 bg-retro-dark flex flex-col items-center justify-center text-retro-cyan">
                <Camera className="w-12 h-12 mb-2 animate-spin text-retro-cyan" />
                <span className="font-pixel text-xs uppercase animate-pulse">INITIALIZING FEED...</span>
              </div>
            )}
          </>
        )}

        {/* Overlay scanning grids or visual elements */}
        <div className="absolute bottom-2 left-2 text-retro-pink font-pixel text-[10px] z-10 select-none">
          RESOLUTION: 640x480
        </div>
        <div className="absolute bottom-2 right-2 text-retro-green font-pixel text-[10px] z-10 select-none">
          CORS_OK
        </div>
      </div>

      {/* Frame Details (Chunky design) */}
      <div className="mt-3 flex justify-between items-center px-1">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-retro-red animate-ping" />
          <span className="w-3 h-3 rounded-full bg-retro-green" />
          <span className="w-3 h-3 rounded-full bg-retro-yellow" />
        </div>
        <div className="text-retro-cyan font-pixel text-[10px] tracking-wide select-none">
          SECURE PORT ENCRYPTED
        </div>
      </div>
    </div>
  );
};

export default WebcamFrame;
