import React from 'react';
import { Play, SkipForward, Disc, ExternalLink } from 'lucide-react';

// Animated SVG Cassette Tape
const PixelCassette = ({ isPlaying }) => {
  return (
    <div className="w-40 h-24 mx-auto relative border-4 border-black bg-retro-purple pixel-border flex flex-col justify-between p-2 glow-purple select-none">
      {/* Tape label details */}
      <div className="bg-white border-2 border-black pixel-border text-[9px] font-pixel text-black px-1 py-0.5 flex justify-between items-center h-8">
        <span className="truncate max-w-[80px]">RETRO_REC</span>
        <span className="text-retro-pink">SIDE A</span>
      </div>

      {/* Cassette spindles */}
      <div className="flex justify-center gap-6 my-1">
        {/* Left Spindle */}
        <div className="w-8 h-8 rounded-full border-2 border-black bg-[#111] flex items-center justify-center relative">
          <Disc 
            className={`w-6 h-6 text-gray-500 ${isPlaying ? 'animate-spin' : ''}`} 
            style={{ animationDuration: isPlaying ? '2.5s' : '0s' }}
          />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-white border border-black" />
        </div>
        {/* Right Spindle */}
        <div className="w-8 h-8 rounded-full border-2 border-black bg-[#111] flex items-center justify-center relative">
          <Disc 
            className={`w-6 h-6 text-gray-500 ${isPlaying ? 'animate-spin' : ''}`}
            style={{ animationDuration: isPlaying ? '2.5s' : '0s' }}
          />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-white border border-black" />
        </div>
      </div>

      {/* Cassette bottom details */}
      <div className="flex justify-between items-center text-[8px] font-pixel text-gray-400 px-1">
        <span>NR [x]</span>
        <span>CrO2</span>
      </div>
    </div>
  );
};

const SongPlayer = ({ song, artist, trackId }) => {
  if (!trackId) {
    return (
      <div className="w-full bg-retro-dark border-4 border-black p-6 pixel-border border-gray-700 flex flex-col items-center justify-center h-full min-h-[300px] text-center rounded-md">
        <Disc className="w-16 h-16 text-gray-600 mb-3 animate-pulse" />
        <span className="font-pixel text-sm uppercase text-gray-500">NO MEDIA DETECTED</span>
        <span className="font-vt text-xs text-gray-400 mt-2 max-w-[250px]">
          MOOD SCAN MUST FINISH TO PLAY SOUNDTRACK
        </span>
      </div>
    );
  }

  // Sanitize / build the Spotify Embed URL
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

  return (
    <div className="w-full bg-retro-dark border-4 border-black p-6 pixel-border border-retro-pink flex flex-col gap-5 rounded-md glow-pink">
      {/* HUD Header */}
      <div className="flex justify-between items-center border-b-2 border-black pb-2">
        <span className="font-pixel text-xs text-retro-pink text-glow-pink flex items-center gap-1.5 animate-pulse">
          ⚡ NOW PLAYING
        </span>
        <span className="font-pixel text-[10px] text-gray-400">128 KBPS</span>
      </div>

      {/* Cassette tape section */}
      <div className="my-2">
        <PixelCassette isPlaying={!!trackId} />
      </div>

      {/* Track Details & Marquee */}
      <div className="bg-black/60 border-2 border-black pixel-border p-3 text-center flex flex-col gap-1 overflow-hidden relative">
        {/* Mock wave graph lines */}
        <div className="flex justify-center items-end gap-0.5 h-6 mb-1 opacity-60">
          <div className="w-1 bg-retro-cyan h-3 animate-[pulse_0.4s_infinite_alternate]" />
          <div className="w-1 bg-retro-pink h-5 animate-[pulse_0.6s_infinite_alternate]" />
          <div className="w-1 bg-retro-green h-2 animate-[pulse_0.5s_infinite_alternate]" />
          <div className="w-1 bg-retro-purple h-4 animate-[pulse_0.3s_infinite_alternate]" />
          <div className="w-1 bg-retro-yellow h-5 animate-[pulse_0.7s_infinite_alternate]" />
          <div className="w-1 bg-retro-pink h-1 animate-[pulse_0.2s_infinite_alternate]" />
          <div className="w-1 bg-retro-cyan h-3 animate-[pulse_0.5s_infinite_alternate]" />
        </div>

        {/* Marquee Song Title */}
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="inline-block font-pixel text-sm text-retro-cyan text-glow-cyan uppercase animate-marquee">
            {song}
          </div>
        </div>

        {/* Artist Name */}
        <div className="font-vt text-lg text-retro-yellow">
          BY {artist}
        </div>
      </div>

      {/* Spotify Embed Player Wrapper (padding prevents clipping) */}
      <div className="w-full border-4 border-black pixel-border bg-black rounded p-0.5 glow-pink">
        <iframe
          src={embedUrl}
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Recommender Playback"
          className="rounded border-0 block"
        />
      </div>

      {/* Direct Play Action Buttons */}
      <div className="flex flex-col gap-2">
        <a 
          href={`https://open.spotify.com/track/${trackId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full text-center py-3 bg-retro-green hover:bg-retro-green/80 text-black font-pixel text-xs border-4 border-black pixel-border flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:translate-y-1 select-none font-bold"
        >
          <ExternalLink className="w-4 h-4" />
          OPEN IN SPOTIFY
        </a>
        
        <p className="font-vt text-xs text-gray-500 text-center leading-normal">
          * Browser security blocks automatic audio playback. Click the play button above or "Open in Spotify" to play the track.
        </p>
      </div>

      {/* Stylized Marquee Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}} />
    </div>
  );
};

export default SongPlayer;
