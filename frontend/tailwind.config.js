/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        vt: ['"VT323"', 'monospace'],
      },
      colors: {
        retro: {
          pink: '#ff007f',
          cyan: '#00f0ff',
          purple: '#bd00ff',
          dark: '#05050f',
          navy: '#0c0b1e',
          green: '#39ff14',
          yellow: '#ffcc00',
          red: '#ff3333',
        }
      },
      boxShadow: {
        'retro-pink': '0 0 10px #ff007f, 0 0 20px #ff007f',
        'retro-cyan': '0 0 10px #00f0ff, 0 0 20px #00f0ff',
        'retro-green': '0 0 10px #39ff14, 0 0 20px #39ff14',
        'retro-purple': '0 0 10px #bd00ff, 0 0 20px #bd00ff',
        'pixel-solid': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'pixel-solid-pink': '4px 4px 0px 0px #ff007f',
        'pixel-solid-cyan': '4px 4px 0px 0px #00f0ff',
      },
      animation: {
        'crt-flicker': 'flicker 0.15s infinite',
        'scroll-bg': 'scrollGrid 20s linear infinite',
        'blink-slow': 'blink 1.2s infinite',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1.0' },
          '100%': { opacity: '0.98' },
        },
        scrollGrid: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}
