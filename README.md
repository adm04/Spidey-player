# 🕷️ SPIDEY ♪ PLAYER

> **A Retro Pixel-Art Music Player & World Sighting Tracker**  
> *Inspired by vintage arcade monitor casing, comic microsites, and classic chiptune soundtrack aesthetics.*

---

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-3aa8cf?style=for-the-badge&logo=github)](https://adm04.github.io/Spidey-player/)
[![Author](https://img.shields.io/badge/Author-ADM-f2c14e?style=for-the-badge&logo=github)](https://github.com/adm04)
[![License: MIT](https://img.shields.io/badge/License-MIT-e13a3a?style=for-the-badge)](LICENSE)

---

## 🎮 Live Application

🌐 **Play it Live on GitHub Pages**:  
👉 **[https://adm04.github.io/Spidey-player/](https://adm04.github.io/Spidey-player/)**

---

## 📸 Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/adm04/Spidey-player/main/screenshot.png" alt="Spidey Player Screenshot" width="100%">
</p>

---

## ✨ Features

- 🕸️ **Dual Audio Engines**:
  - **YouTube Stream Engine**: Direct audio playback for all 36 tracks from the official *Spider-Man: Brand New Day* soundtrack.
  - **8-Bit Chiptune Synthesizer**: Custom procedural multi-voice synthesizer built with the **Web Audio API** (Square lead, Triangle bass, Noise drums) for authentic retro arcade vibes.
- 🕷️ **Interactive Pixel-Art Spidey Mascot**:
  - Swaying upside-down Spider-Man hanging from a continuous web line with realistic pendulum physics.
  - Clickable interactions with retro audio sound effect chirps.
- 🗺️ **World Sighting Radar Map**:
  - Interactive grid map displaying mission sighting nodes connected by dynamic web vector lines.
  - Real-time rotating geo-scan radar widget and secret bonus classified tracks.
- 🎛️ **Authentic Arcade Monitor Interface**:
  - Beveled casing (`#3aa8cf` / `#1b6d8f`) with chunky pixel borders, scanner eye badge, and hardware speaker grilles.
  - Reactive 12-bar equalizer audio spectrum visualizer.
  - Scrubbable seek bar with golden thumb indicator.
  - Vertical volume popup stepper with pixel slider (`-`, `+`, mute toggle).
  - Toggleable phosphor CRT scanline overlay filter.
- 📱 **Ultra-Responsive**:
  - Pixel-perfect layout adaptation down to **360px** mobile viewports with compact single-screen fit.
- 📂 **Custom Track Loader**:
  - Slide-out drawer menu (`☰`) to browse the 36-track mission log or upload local audio files (`.mp3`, `.wav`, `.ogg`).

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `[SPACE]` | Play / Pause |
| `[←]` | Previous Track |
| `[→]` | Next Track |
| `[M]` | Mute / Unmute Volume |
| `[T]` | Switch Screen View (Now Playing ↔ Track Map) |

---

## 🛠️ Built With

- **HTML5 & Vanilla CSS3**: Pixel-art design system, custom keyframe animations, 3D perspective cyber-grid.
- **JavaScript (ES6+)**: Custom application controller and state management.
- **Web Audio API**: Real-time 8-bit procedural sound synthesizer and audio frequency analyzer.
- **YouTube IFrame API**: Background streaming playback.
- **Google Fonts**: `'Press Start 2P'` retro gaming typography.

---

## 🚀 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adm04/Spidey-player.git
   cd Spidey-player
   ```

2. **Run a local static server**:
   ```bash
   # Using Python 3
   python -m http.server 8080

   # Or using Node.js / npx
   npx serve .
   ```

3. **Open in your browser**:
   ```
   http://localhost:8080
   ```

---

## 👨‍💻 Author

**Designed & Developed by [ADM](https://github.com/adm04)**

- GitHub: [@adm04](https://github.com/adm04)
- Repository: [https://github.com/adm04/Spidey-player](https://github.com/adm04/Spidey-player)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
