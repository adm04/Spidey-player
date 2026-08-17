# SPIDEY ♪ PLAYER — Pixel-Art Music Player

A single-page retro pixel-art comic inspired music tracker and audio player with chiptune synthesis and interactive track map.

## 🕹 Features
- **Visual Aesthetic**: Pure retro pixel-art aesthetic powered by `'Press Start 2P'`, custom palette, CRT scanline overlay, and chunky pixel bevels.
- **Dual View Modes**:
  - **Now Playing**: Animated swaying spider mascot, reactive equalizer spectrum, and mission audio info.
  - **Track Map**: Dotted radar grid, interactive track nodes (Active, Unplayed, Locked Bonus), cyber radar widget, and connecting web paths.
- **Audio Engine**: Real-time Web Audio 8-bit chiptune synthesizer generating 6 distinct tracks, plus support for real `<audio>` playback and custom audio uploads.
- **Controls**: Scrubbable seek bar with precise `mm:ss` timestamp display, volume slider, mute toggle, and track cycling.
- **Accessibility**: Keyboard shortcuts (`[Space]`, `[←/→]`, `[M]`, `[T]`), high-contrast focus rings, and `prefers-reduced-motion` support.

## 🚀 Getting Started
Simply open `index.html` in any modern web browser or serve with:
```bash
python -m http.server 8080
```
