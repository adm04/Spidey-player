/**
 * WEB ♪ TRACKER — MAIN CONTROLLER & APPLICATION LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // Track Data Model
  const TRACKS = [
    {
      id: 1,
      name: "ARACHNID ALLEY",
      meta: "CHIPTUNE SECTOR // 128 BPM",
      duration: 105,
      src: "tracks/track1.mp3",
      x: 18,
      y: 34,
      locked: false
    },
    {
      id: 2,
      name: "NEON ROOFTOPS",
      meta: "CYBERPUNK SKYLINE // 136 BPM",
      duration: 98,
      src: "tracks/track2.mp3",
      x: 32,
      y: 68,
      locked: false
    },
    {
      id: 3,
      name: "WEB-SLINGER GROOVE",
      meta: "FUNKY 8-BIT GROOVE // 118 BPM",
      duration: 114,
      src: "tracks/track3.mp3",
      x: 48,
      y: 38,
      locked: false
    },
    {
      id: 4,
      name: "MIDNIGHT PATROL",
      meta: "STEALTH ARPEGGIO // 110 BPM",
      duration: 120,
      src: "tracks/track4.mp3",
      x: 64,
      y: 62,
      locked: false
    },
    {
      id: 5,
      name: "CYBER MANHATTAN",
      meta: "ARCADE SPEEDWAY // 140 BPM",
      duration: 90,
      src: "tracks/track5.mp3",
      x: 78,
      y: 32,
      locked: false
    },
    {
      id: 6,
      name: "BONUS: BOSS ARENA",
      meta: "CLIMAX BATTLE // 150 BPM",
      duration: 110,
      src: "tracks/track6.mp3",
      x: 90,
      y: 56,
      locked: true
    }
  ];

  let currentIndex = 0;
  let isPlaying = false;
  let isMuted = false;
  let audioEngine = 'synth'; // 'synth' or 'html5'
  let isDraggingSeek = false;

  // DOM Elements
  const realAudio = document.getElementById('realAudio');
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  const tabPlayer = document.getElementById('tabPlayer');
  const tabMap = document.getElementById('tabMap');
  const screen = document.getElementById('screen');
  const mapscreen = document.getElementById('mapscreen');
  
  const trackTitleDisplay = document.getElementById('trackTitleDisplay');
  const trackNumberBadge = document.getElementById('trackNumberBadge');
  const tName1 = document.getElementById('tName1');
  const trackArtist = document.getElementById('trackArtist');
  const equalizer = document.getElementById('equalizer');
  const eqBars = document.querySelectorAll('.eq-bar');
  
  const pinsContainer = document.getElementById('pinsContainer');
  const mapWebSvg = document.getElementById('mapWebSvg');
  const mapUnexploredCount = document.getElementById('mapUnexploredCount');
  
  const seekContainer = document.getElementById('seekContainer');
  const seekFill = document.getElementById('seekFill');
  const seekThumb = document.getElementById('seekThumb');
  const timeElapsed = document.getElementById('timeElapsed');
  const timeTotal = document.getElementById('timeTotal');
  
  const volBtn = document.getElementById('volBtn');
  const volIcon = document.getElementById('volIcon');
  const volSlider = document.getElementById('volSlider');
  
  const mascotBadge = document.getElementById('mascotBadge');
  const spiderMascot = document.getElementById('spiderMascot');
  const spiderContainer = document.getElementById('spiderContainer');
  const crtToggleBtn = document.getElementById('crtToggleBtn');
  const crtOverlay = document.getElementById('crtOverlay');
  const menuBtn = document.getElementById('menuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const menuDrawer = document.getElementById('menuDrawer');
  const drawerTracklist = document.getElementById('drawerTracklist');
  const audioFileInput = document.getElementById('audioFileInput');
  const fxToggleBtn = document.getElementById('fxToggleBtn');
  const synthStatus = document.getElementById('synthStatus');
  const statusText = document.getElementById('statusText');

  // Format seconds to mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Render Track Map Pins & Connecting SVG Web Lines
  function renderMap() {
    pinsContainer.innerHTML = '';
    let svgLines = '';

    TRACKS.forEach((track, i) => {
      // Connect to next track with SVG line
      if (i < TRACKS.length - 1) {
        const next = TRACKS[i + 1];
        svgLines += `<line x1="${track.x}%" y1="${track.y}%" x2="${next.x}%" y2="${next.y}%" class="web-path" />`;
      }

      const pin = document.createElement('button');
      pin.className = 'pin';
      pin.style.left = `${track.x}%`;
      pin.style.top = `${track.y}%`;
      pin.dataset.index = i;
      pin.setAttribute('aria-label', `Track ${track.id}: ${track.name}`);

      let stateClass = 'unplayed';
      let icon = '♪';
      if (i === currentIndex) {
        stateClass = 'playing';
        icon = '★';
      } else if (track.locked) {
        stateClass = 'locked';
        icon = '🔒';
      }

      pin.classList.add(stateClass);
      pin.innerHTML = `${icon}<span class="pin-label">${track.name}${track.locked ? ' (LOCKED)' : ''}</span>`;

      pin.addEventListener('click', () => {
        if (track.locked) {
          // Unlock bonus track with a fun retro sound
          track.locked = false;
          window.chiptuneSynth.playBeep(880, 0.15, 'triangle');
          statusText.textContent = "BONUS UNLOCKED";
          setTimeout(() => statusText.textContent = "ONLINE", 2000);
        }
        selectTrack(i, true);
      });

      pinsContainer.appendChild(pin);
    });

    mapWebSvg.innerHTML = svgLines;
    updateUnexploredCount();
  }

  function updateUnexploredCount() {
    const unplayedCount = TRACKS.filter((t, idx) => idx !== currentIndex && !t.locked).length;
    mapUnexploredCount.textContent = `${unplayedCount} UNPLAYED NODES`;
  }

  // Populate Drawer Tracklist
  function renderDrawerList() {
    drawerTracklist.innerHTML = '';
    TRACKS.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = `tracklist-item ${i === currentIndex ? 'active' : ''}`;
      item.innerHTML = `
        <span>${i + 1 < 10 ? '0' : ''}${i + 1}. ${t.name}</span>
        <span>${formatTime(t.duration)}</span>
      `;
      item.addEventListener('click', () => {
        selectTrack(i, true);
        menuDrawer.classList.remove('open');
        menuDrawer.setAttribute('aria-hidden', 'true');
      });
      drawerTracklist.appendChild(item);
    });
  }

  // Update UI Elements for Selected Track
  function updateUI() {
    const track = TRACKS[currentIndex];
    trackNumberBadge.textContent = track.id < 10 ? `0${track.id}` : track.id;
    tName1.textContent = track.name;
    trackArtist.textContent = track.meta;
    timeTotal.textContent = formatTime(track.duration);

    // Update map pin states
    document.querySelectorAll('.pin').forEach(pin => {
      const idx = parseInt(pin.dataset.index);
      pin.classList.remove('playing', 'unplayed', 'locked');
      const t = TRACKS[idx];
      if (idx === currentIndex) {
        pin.classList.add('playing');
        pin.innerHTML = `★<span class="pin-label">${t.name}</span>`;
      } else if (t.locked) {
        pin.classList.add('locked');
        pin.innerHTML = `🔒<span class="pin-label">${t.name} (LOCKED)</span>`;
      } else {
        pin.classList.add('unplayed');
        pin.innerHTML = `♪<span class="pin-label">${t.name}</span>`;
      }
    });

    // Update drawer active highlight
    document.querySelectorAll('.tracklist-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === currentIndex);
    });

    updateUnexploredCount();
  }

  // Switch Track
  function selectTrack(index, autoPlay = true) {
    currentIndex = (index + TRACKS.length) % TRACKS.length;
    const track = TRACKS[currentIndex];

    window.chiptuneSynth.setTrack(currentIndex);
    
    // Check if real audio source is usable
    realAudio.src = track.src;

    updateUI();
    updateProgress(0, track.duration);

    if (autoPlay) {
      startPlayback();
    } else {
      pausePlayback();
    }
  }

  // Playback Control
  function startPlayback() {
    isPlaying = true;
    playBtn.classList.add('active');
    playIcon.textContent = '❚❚';
    playText.textContent = 'PAUSE';
    equalizer.classList.remove('paused');
    statusText.textContent = "PLAYING";

    if (audioEngine === 'synth') {
      window.chiptuneSynth.play();
    } else {
      realAudio.play().catch(() => {
        // Fallback to synth if external file is missing
        audioEngine = 'synth';
        synthStatus.textContent = '8-BIT';
        window.chiptuneSynth.play();
      });
    }

    startEqualizerAnim();
  }

  function pausePlayback() {
    isPlaying = false;
    playBtn.classList.remove('active');
    playIcon.textContent = '▶';
    playText.textContent = 'PLAY';
    equalizer.classList.add('paused');
    statusText.textContent = "PAUSED";

    if (audioEngine === 'synth') {
      window.chiptuneSynth.pause();
    } else {
      realAudio.pause();
    }
  }

  function togglePlay() {
    window.chiptuneSynth.playBeep(440, 0.05, 'square');
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  // Progress & Time Updates
  function updateProgress(curr, dur) {
    if (isDraggingSeek) return;
    const pct = dur > 0 ? (curr / dur) * 100 : 0;
    seekFill.style.width = `${pct}%`;
    seekThumb.style.left = `${pct}%`;
    timeElapsed.textContent = formatTime(curr);
    timeTotal.textContent = formatTime(dur);
    seekContainer.setAttribute('aria-valuenow', Math.round(pct));
  }

  // Chiptune Synth Time Callback
  window.chiptuneSynth.onTimeUpdate = (curr, dur) => {
    if (audioEngine === 'synth') {
      updateProgress(curr, dur);
    }
  };

  // Real Audio Time Updates
  realAudio.addEventListener('timeupdate', () => {
    if (audioEngine === 'html5') {
      updateProgress(realAudio.currentTime, realAudio.duration || TRACKS[currentIndex].duration);
    }
  });

  realAudio.addEventListener('ended', () => {
    selectTrack(currentIndex + 1, true);
  });

  // Seeking Interactions (Click & Drag)
  function seekTo(e) {
    const rect = seekContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));

    seekFill.style.width = `${pct}%`;
    seekThumb.style.left = `${pct}%`;

    const dur = TRACKS[currentIndex].duration;
    const newTime = (pct / 100) * dur;
    timeElapsed.textContent = formatTime(newTime);

    if (audioEngine === 'synth') {
      window.chiptuneSynth.seek(pct);
    } else if (realAudio.duration) {
      realAudio.currentTime = (pct / 100) * realAudio.duration;
    }
  }

  seekContainer.addEventListener('mousedown', (e) => {
    isDraggingSeek = true;
    seekTo(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDraggingSeek) seekTo(e);
  });

  window.addEventListener('mouseup', () => {
    if (isDraggingSeek) {
      isDraggingSeek = false;
      if (!isPlaying) startPlayback();
    }
  });

  // Equalizer Spectrum Visualizer
  function startEqualizerAnim() {
    if (!isPlaying) return;
    if (window.chiptuneSynth && window.chiptuneSynth.analyser) {
      const dataArray = new Uint8Array(window.chiptuneSynth.analyser.frequencyBinCount);
      window.chiptuneSynth.analyser.getByteFrequencyData(dataArray);

      eqBars.forEach((bar, i) => {
        const val = dataArray[i * 2] || (Math.sin(Date.now() / 200 + i) * 10 + 15);
        const height = Math.max(4, Math.min(30, (val / 255) * 32));
        bar.style.height = `${height}px`;
      });
    }
    if (isPlaying) {
      requestAnimationFrame(startEqualizerAnim);
    }
  }

  // Volume & Mute Controls
  volSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value) / 100;
    window.chiptuneSynth.setVolume(val);
    realAudio.volume = val;
    isMuted = val === 0;
    volIcon.textContent = isMuted ? '🔇' : val < 0.5 ? '🔉' : '🔊';
  });

  volBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(600, 0.04);
    if (isMuted) {
      volSlider.value = 80;
      window.chiptuneSynth.setVolume(0.8);
      realAudio.volume = 0.8;
      volIcon.textContent = '🔊';
      isMuted = false;
    } else {
      volSlider.value = 0;
      window.chiptuneSynth.setVolume(0);
      realAudio.volume = 0;
      volIcon.textContent = '🔇';
      isMuted = true;
    }
  });

  // Tab View Switching
  tabPlayer.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(520, 0.04);
    tabPlayer.classList.add('active');
    tabPlayer.setAttribute('aria-selected', 'true');
    tabMap.classList.remove('active');
    tabMap.setAttribute('aria-selected', 'false');
    screen.classList.add('active');
    mapscreen.classList.remove('active');
    mapscreen.setAttribute('aria-hidden', 'true');
    screen.setAttribute('aria-hidden', 'false');
  });

  tabMap.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(650, 0.04);
    tabMap.classList.add('active');
    tabMap.setAttribute('aria-selected', 'true');
    tabPlayer.classList.remove('active');
    tabPlayer.setAttribute('aria-selected', 'false');
    mapscreen.classList.add('active');
    screen.classList.remove('active');
    screen.setAttribute('aria-hidden', 'true');
    mapscreen.setAttribute('aria-hidden', 'false');
  });

  // Prev / Next Navigation
  prevBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(392, 0.05);
    selectTrack(currentIndex - 1, isPlaying);
  });

  nextBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(587, 0.05);
    selectTrack(currentIndex + 1, isPlaying);
  });

  playBtn.addEventListener('click', togglePlay);

  // Mascot & Spider Interactions
  spiderMascot.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(784, 0.1, 'triangle');
    spiderContainer.style.animation = 'none';
    spiderMascot.style.transform = 'scale(1.35) rotate(-20deg)';
    setTimeout(() => {
      spiderMascot.style.transform = '';
      spiderContainer.style.animation = '';
    }, 400);
  });

  mascotBadge.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(987, 0.08, 'square');
    mascotBadge.style.transform = 'scale(1.25) rotate(360deg)';
    setTimeout(() => mascotBadge.style.transform = '', 350);
  });

  // CRT Scanline Filter Toggle
  crtToggleBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(700, 0.04);
    crtOverlay.classList.toggle('disabled');
  });

  // Audio Engine Toggle (Synth / Custom File)
  fxToggleBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(523, 0.06);
    if (audioEngine === 'synth') {
      audioEngine = 'html5';
      synthStatus.textContent = 'MP3/FILE';
    } else {
      audioEngine = 'synth';
      synthStatus.textContent = '8-BIT';
    }
    if (isPlaying) {
      pausePlayback();
      startPlayback();
    }
  });

  // Custom Audio File Upload
  audioFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      TRACKS.push({
        id: TRACKS.length + 1,
        name: file.name.replace(/\.[^/.]+$/, "").toUpperCase().substring(0, 16),
        meta: "CUSTOM USER AUDIO",
        duration: 180,
        src: url,
        x: Math.floor(Math.random() * 70) + 15,
        y: Math.floor(Math.random() * 50) + 25,
        locked: false
      });
      audioEngine = 'html5';
      synthStatus.textContent = 'CUSTOM';
      renderMap();
      renderDrawerList();
      selectTrack(TRACKS.length - 1, true);
    }
  });

  // Menu Drawer Modal
  menuBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(440, 0.04);
    menuDrawer.classList.add('open');
    menuDrawer.setAttribute('aria-hidden', 'false');
  });

  closeDrawerBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(330, 0.04);
    menuDrawer.classList.remove('open');
    menuDrawer.setAttribute('aria-hidden', 'true');
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      selectTrack(currentIndex - 1, isPlaying);
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      selectTrack(currentIndex + 1, isPlaying);
    } else if (e.key === 'm' || e.key === 'M') {
      volBtn.click();
    } else if (e.key === 't' || e.key === 'T') {
      if (tabPlayer.classList.contains('active')) {
        tabMap.click();
      } else {
        tabPlayer.click();
      }
    }
  });

  // Initialize
  renderMap();
  renderDrawerList();
  selectTrack(0, false);
});
