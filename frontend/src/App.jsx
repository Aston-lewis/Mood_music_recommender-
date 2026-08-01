import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Scan, RotateCcw, AlertTriangle, HelpCircle } from 'lucide-react';

import PixelNavbar from './components/PixelNavbar';
import WebcamFrame from './components/WebcamFrame';
import EmotionPanel from './components/EmotionPanel';
import SongPlayer from './components/SongPlayer';
import RetroLoader from './components/RetroLoader';
import ArcadeButton from './components/ArcadeButton';

import { 
  playClick, 
  playScan, 
  playSuccess, 
  playError, 
  setMuted, 
  getMuted 
} from './utils/audio';

function App() {
  const webcamRef = useRef(null);
  
  // App States
  const [emotion, setEmotion] = useState(null);
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null);
  const [trackId, setTrackId] = useState(null);
  
  const [isScanning, setIsScanning] = useState(false);
  const [isMuted, setIsMutedState] = useState(false);
  const [isCrtOn, setIsCrtOn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [history, setHistory] = useState([]);

  // Sync mute state on mount
  useEffect(() => {
    setMuted(isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMutedState(!isMuted);
  };

  const toggleCrt = () => {
    setIsCrtOn(!isCrtOn);
  };

  // Perform face screenshot & call backend
  const handleStartScan = async () => {
    if (isScanning) return;
    
    setErrorMsg(null);
    setIsScanning(true);
    playScan();

    // Give a 1.5s delay to show scanning loading screen and feel retro!
    setTimeout(async () => {
      try {
        if (!webcamRef.current) {
          throw new Error("Webcam interface is not loaded.");
        }

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          throw new Error("Could not capture frame. Allow camera access!");
        }

        // Post base64 screenshot to Flask backend
        const response = await axios.post('http://127.0.0.1:5000/detect-emotion', {
          image: imageSrc
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        const data = response.data;
        
        if (data.error) {
          throw new Error(data.error);
        }

        // Update states on success
        setEmotion(data.emotion);
        setSong(data.song);
        setArtist(data.artist);
        setTrackId(data.spotify_track_id);
        
        // Add to scan history
        const newRecord = {
          emotion: data.emotion,
          song: data.song,
          artist: data.artist,
          timestamp: new Date().toLocaleTimeString()
        };
        setHistory(prev => [newRecord, ...prev.slice(0, 4)]);

        playSuccess();
      } catch (err) {
        console.error("Scanning failed:", err);
        playError();
        
        // Handle common errors nicely
        if (err.response?.data?.error) {
          setErrorMsg(err.response.data.error);
        } else if (err.message) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("Flask API offline. Make sure port 5000 is active.");
        }
        
        // Reset states on error
        setEmotion(null);
        setSong(null);
        setArtist(null);
        setTrackId(null);
      } finally {
        setIsScanning(false);
      }
    }, 1800); // 1.8 seconds transition
  };

  const handleReset = () => {
    playClick();
    setEmotion(null);
    setSong(null);
    setArtist(null);
    setTrackId(null);
    setErrorMsg(null);
  };

  return (
    <div className={`min-h-screen bg-retro-dark relative overflow-hidden flex flex-col ${isCrtOn ? 'crt-screen' : ''}`}>
      {/* CRT Scanline Overlay */}
      {isCrtOn && <div className="crt-overlay" />}

      {/* Cyberpunk Grid Background */}
      <div className="retro-grid" />
      <div className="pixel-stars" />

      {/* Pixelated clouds moving slowly in background */}
      <div className="pixel-cloud w-24 h-8 top-16 left-[-100px] opacity-10" style={{ animationDelay: '0s' }} />
      <div className="pixel-cloud w-36 h-12 top-40 left-[-200px] opacity-10" style={{ animationDelay: '10s', animationDuration: '35s' }} />
      <div className="pixel-cloud w-16 h-6 top-72 left-[-150px] opacity-5" style={{ animationDelay: '5s', animationDuration: '45s' }} />

      {/* Retro HUD Navbar */}
      <PixelNavbar 
        isMuted={isMuted} 
        toggleMute={toggleMute} 
        isCrtOn={isCrtOn} 
        toggleCrt={toggleCrt} 
      />

      {/* Main Playable Terminal */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 relative z-20 flex flex-col items-center justify-center gap-6">
        
        {/* Game Title Logo Area */}
        <div className="text-center flex flex-col items-center gap-2 select-none">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-retro-pink text-glow-pink animate-bounce" />
            <h1 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-white tracking-widest text-glow-pink uppercase font-extrabold">
              AI MOOD MUSIC RECOMMENDER
            </h1>
            <Sparkles className="w-6 h-6 text-retro-cyan text-glow-cyan animate-bounce" />
          </div>
          <p className="font-vt text-lg md:text-xl text-retro-cyan tracking-wide max-w-xl">
            SCAN YOUR EMOTIONS IN REAL TIME. MATCH WITH ARCADE CHIPTUNES & MODERN RETRO SONGS.
          </p>
        </div>

        {/* Dashboard Panels Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          
          {/* Left Column: Camera Viewport (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-black/40 border-4 border-black p-2 pixel-border rounded">
              <div className="text-xs font-pixel text-gray-500 mb-2 px-1 flex justify-between">
                <span>[ SCREEN UNIT_01 ]</span>
                <span className="animate-pulse text-retro-green">CALIBRATED</span>
              </div>
              
              <WebcamFrame 
                webcamRef={webcamRef} 
                isScanning={isScanning} 
              />
            </div>

            {/* Arcade Console Control Pad */}
            <div className="bg-retro-navy border-4 border-black p-6 pixel-border rounded-md glow-cyan flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col gap-1 text-center md:text-left">
                <span className="font-pixel text-xs text-retro-yellow">PLAYER_INPUT:</span>
                <span className="font-vt text-sm text-gray-400">PRESS BUTTON TO CALIBRATE FACIAL SCAN</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {/* Reset button */}
                {(emotion || errorMsg) && (
                  <ArcadeButton 
                    onClick={handleReset} 
                    color="cyan"
                    disabled={isScanning}
                  >
                    <RotateCcw className="w-4 h-4" />
                    RESET
                  </ArcadeButton>
                )}

                {/* Primary Arcade Scan Button */}
                <ArcadeButton 
                  onClick={handleStartScan} 
                  color="pink" 
                  disabled={isScanning}
                  className="px-8 py-4 text-base font-bold animate-[pulse_2s_infinite]"
                >
                  <Scan className="w-5 h-5 animate-pulse" />
                  START EMOTION SCAN
                </ArcadeButton>
              </div>
            </div>
          </div>

          {/* Right Column: AI Output & Media (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between">
            
            {/* Loading sequence overlay */}
            {isScanning && (
              <div className="flex-1 flex items-center justify-center min-h-[300px]">
                <RetroLoader message="SCANNING PLAYER EMOTION..." />
              </div>
            )}

            {/* Error alerts */}
            {!isScanning && errorMsg && (
              <div className="bg-retro-dark border-4 border-black p-6 pixel-border border-retro-red rounded-md glow-red text-center flex flex-col items-center gap-4">
                <AlertTriangle className="w-12 h-12 text-retro-red animate-bounce" />
                <h3 className="font-pixel text-sm text-retro-red font-bold">SCAN CORRUPTED</h3>
                <p className="font-vt text-base text-gray-300 max-w-[280px]">
                  {errorMsg}
                </p>
                <ArcadeButton onClick={handleReset} color="yellow">
                  TRY AGAIN
                </ArcadeButton>
              </div>
            )}

            {/* Normal Display State */}
            {!isScanning && !errorMsg && (
              <div className="flex flex-col gap-6">
                
                {/* Emotion mascot display */}
                <EmotionPanel emotion={emotion} />

                {/* Spotify audio player dashboard */}
                <SongPlayer 
                  song={song} 
                  artist={artist} 
                  trackId={trackId} 
                />

              </div>
            )}

            {/* Game History log overlay at bottom */}
            <div className="bg-black/50 border-4 border-black p-4 pixel-border border-gray-800 text-xs font-vt text-gray-500 rounded">
              <span className="font-pixel text-[10px] text-gray-400 block mb-2">[ LAST SCANS ]</span>
              {history.length === 0 ? (
                <span>&gt; NO LOGS PRESENT. TERMINAL IDLE.</span>
              ) : (
                <ul className="flex flex-col gap-1">
                  {history.map((h, i) => (
                    <li key={i} className="flex justify-between items-center text-gray-400">
                      <span>&gt; {h.timestamp} - EMOTION: {h.emotion}</span>
                      <span className="text-retro-cyan truncate max-w-[150px]">{h.song}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* CRT Footer Game HUD */}
      <footer className="w-full bg-retro-dark border-t-4 border-black py-4 px-6 text-center font-vt text-sm text-gray-600 relative z-30">
        <p className="tracking-widest">
          © 2026 MOOD MUSIC TERMINAL V1.0.0 — PRESENTED FOR ADP MINI PROJECT
        </p>
      </footer>
    </div>
  );
}

export default App;
