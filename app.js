/**
 * SPIDEY ♪ TRACKER — MAIN CONTROLLER & APPLICATION LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // Track Data Model
  const TRACKS = [
    {
      id: 1,
      name: "ARACHNID ALLEY",
      meta: "SECTOR 01 // 128 BPM CHIPTUNE",
      duration: 105,
      src: "tracks/track1.mp3",
      x: 20,
      y: 35,
      locked: false
    },
    {
      id: 2,
      name: "NEON ROOFTOPS",
      meta: "SECTOR 02 // 136 BPM CYBERPUNK",
      duration: 98,
      src: "tracks/track2.mp3",
      x: 34,
      y: 65,
      locked: false
    },
    {
      id: 3,
      name: "WEB-SLINGER GROOVE",
      meta: "SECTOR 03 // 118 BPM FUNK",
      duration: 114,
      src: "tracks/track3.mp3",
      x: 48,
      y: 32,
      locked: false
    },
    {
      id: 4,
      name: "MIDNIGHT PATROL",
      meta: "SECTOR 04 // 110 BPM STEALTH",
      duration: 120,
      src: "tracks/track4.mp3",
      x: 62,
      y: 60,
      locked: false
    },
    {
      id: 5,
      name: "CYBER MANHATTAN",
      meta: "SECTOR 05 // 140 BPM ARCADE",
      duration: 90,
      src: "tracks/track5.mp3",
      x: 76,
      y: 30,
      locked: false
    },
    {
      id: 6,
      name: "BONUS: BOSS ARENA",
      meta: "SECTOR 06 // 150 BPM CLIMAX",
      duration: 110,
      src: "tracks/track6.mp3",
      x: 88,
      y: 55,
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
  const viewPlayer = document.getElementById('viewPlayer');
  const viewMap = document.getElementById('viewMap');
  
  const sideTabPlayer = document.getElementById('sideTabPlayer');
  const sideTabMap = document.getElementById('sideTabMap');
  const sideTabMenu = document.getElementById('sideTabMenu');
  
  const screenPlayBtn = document.getElementById('screenPlayBtn');
  const screenPlayIcon = document.getElementById('screenPlayIcon');
  const screenPlayText = document.getElementById('screenPlayText');
  const screenMapBtn = document.getElementById('screenMapBtn');
  
  const trackNumPrefix = document.getElementById('trackNumPrefix');
  const tName1 = document.getElementById('tName1');
  const trackSecTag = document.getElementById('trackSecTag');
  const spectrumViz = document.getElementById('spectrumViz');
  const specBars = document.querySelectorAll('.spec-bar');
  
  const mapPinsLayer = document.getElementById('mapPinsLayer');
  const mapSvg = document.getElementById('mapSvg');
  const unexploredCounter = document.getElementById('unexploredCounter');
  
  const marqueePill = document.getElementById('marqueePill');
  const marqueeTicker = document.getElementById('marqueeTicker');
  const seekLayer = document.getElementById('seekLayer');
  const seekFill = document.getElementById('seekFill');
  const seekThumb = document.getElementById('seekThumb');
  const timeDisplay = document.getElementById('timeDisplay');
  
  const volBtn = document.getElementById('volBtn');
  const volIcon = document.getElementById('volIcon');
  
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  const eyeBadgeBtn = document.getElementById('eyeBadgeBtn');
  const crtToggleBtn = document.getElementById('crtToggleBtn');
  const crtOverlay = document.getElementById('crtOverlay');
  const hangingSpidey = document.getElementById('hangingSpidey');
  const hangingSpideyAnchor = document.getElementById('hangingSpideyAnchor');
  const crouchingSpidey = document.getElementById('crouchingSpidey');
  
  const menuDrawer = document.getElementById('menuDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerTracklist = document.getElementById('drawerTracklist');
  const audioFileInput = document.getElementById('audioFileInput');

  // Format seconds to mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Render Track Map Pins & Connecting SVG Lines
  function renderMap() {
    mapPinsLayer.innerHTML = '';
    let svgLines = '';

    TRACKS.forEach((track, i) => {
      if (i < TRACKS.length - 1) {
        const next = TRACKS[i + 1];
        svgLines += `<line x1="${track.x}%" y1="${track.y}%" x2="${next.x}%" y2="${next.y}%" />`;
      }

      const pin = document.createElement('button');
      pin.className = 'map-pin';
      pin.style.left = `${track.x}%`;
      pin.style.top = `${track.y}%`;
      pin.dataset.index = i;
      pin.setAttribute('aria-label', `Track ${track.id}: ${track.name}`);

      let stateClass = 'unplayed';
      let icon = '♪';
      if (i === currentIndex) {
        stateClass = 'active-sighting';
        icon = '★';
      } else if (track.locked) {
        stateClass = 'locked-node';
        icon = '🔒';
      }

      pin.classList.add(stateClass);
      pin.innerHTML = `${icon}<span class="pin-tooltip">${track.name}${track.locked ? ' (LOCKED)' : ''}</span>`;

      pin.addEventListener('click', () => {
        if (track.locked) {
          track.locked = false;
          window.chiptuneSynth.playBeep(880, 0.15, 'triangle');
        }
        selectTrack(i, true);
      });

      mapPinsLayer.appendChild(pin);
    });

    mapSvg.innerHTML = svgLines;
    updateCounter();
  }

  function updateCounter() {
    const unplayed = TRACKS.filter((t, idx) => idx !== currentIndex && !t.locked).length;
    unexploredCounter.textContent = `${unplayed} UNEXPLORED SIGHTINGS`;
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
      });
      drawerTracklist.appendChild(item);
    });
  }

  // Update UI Elements for Selected Track
  function updateUI() {
    const track = TRACKS[currentIndex];
    trackNumPrefix.textContent = `[${track.id < 10 ? '0' : ''}${track.id}]`;
    tName1.textContent = track.name;
    trackSecTag.textContent = track.meta;
    timeDisplay.textContent = `00:00 / ${formatTime(track.duration)}`;
    marqueeTicker.textContent = `NOW PLAYING: ${track.name} // ${track.meta} • CLICK SCREEN BUTTON TO TOGGLE AUDIO`;

    document.querySelectorAll('.map-pin').forEach(pin => {
      const idx = parseInt(pin.dataset.index);
      pin.classList.remove('active-sighting', 'unplayed', 'locked-node');
      const t = TRACKS[idx];
      if (idx === currentIndex) {
        pin.classList.add('active-sighting');
        pin.innerHTML = `★<span class="pin-tooltip">${t.name}</span>`;
      } else if (t.locked) {
        pin.classList.add('locked-node');
        pin.innerHTML = `🔒<span class="pin-tooltip">${t.name} (LOCKED)</span>`;
      } else {
        pin.classList.add('unplayed');
        pin.innerHTML = `♪<span class="pin-tooltip">${t.name}</span>`;
      }
    });

    document.querySelectorAll('.tracklist-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === currentIndex);
    });

    updateCounter();
  }

  // Select Track
  function selectTrack(index, autoPlay = true) {
    currentIndex = (index + TRACKS.length) % TRACKS.length;
    const track = TRACKS[currentIndex];

    window.chiptuneSynth.setTrack(currentIndex);
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
    screenPlayBtn.classList.add('active');
    screenPlayIcon.textContent = '❚❚';
    screenPlayText.textContent = 'SOUND OFF';
    spectrumViz.classList.remove('paused');

    if (audioEngine === 'synth') {
      window.chiptuneSynth.play();
    } else {
      realAudio.play().catch(() => {
        audioEngine = 'synth';
        window.chiptuneSynth.play();
      });
    }

    startEqualizerAnim();
  }

  function pausePlayback() {
    isPlaying = false;
    screenPlayBtn.classList.remove('active');
    screenPlayIcon.textContent = '▶';
    screenPlayText.textContent = 'SOUND ON';
    spectrumViz.classList.add('paused');

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

  // Progress Update
  function updateProgress(curr, dur) {
    if (isDraggingSeek) return;
    const pct = dur > 0 ? (curr / dur) * 100 : 0;
    seekFill.style.width = `${pct}%`;
    seekThumb.style.left = `${pct}%`;
    timeDisplay.textContent = `${formatTime(curr)} / ${formatTime(dur)}`;
    seekLayer.setAttribute('aria-valuenow', Math.round(pct));
  }

  window.chiptuneSynth.onTimeUpdate = (curr, dur) => {
    if (audioEngine === 'synth') {
      updateProgress(curr, dur);
    }
  };

  realAudio.addEventListener('timeupdate', () => {
    if (audioEngine === 'html5') {
      updateProgress(realAudio.currentTime, realAudio.duration || TRACKS[currentIndex].duration);
    }
  });

  realAudio.addEventListener('ended', () => {
    selectTrack(currentIndex + 1, true);
  });

  // Seek Bar Interaction
  function seekTo(e) {
    const rect = marqueePill.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));

    seekFill.style.width = `${pct}%`;
    seekThumb.style.left = `${pct}%`;

    const dur = TRACKS[currentIndex].duration;
    const newTime = (pct / 100) * dur;
    timeDisplay.textContent = `${formatTime(newTime)} / ${formatTime(dur)}`;

    if (audioEngine === 'synth') {
      window.chiptuneSynth.seek(pct);
    } else if (realAudio.duration) {
      realAudio.currentTime = (pct / 100) * realAudio.duration;
    }
  }

  marqueePill.addEventListener('mousedown', (e) => {
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

  // Spectrum Visualizer
  function startEqualizerAnim() {
    if (!isPlaying) return;
    if (window.chiptuneSynth && window.chiptuneSynth.analyser) {
      const dataArray = new Uint8Array(window.chiptuneSynth.analyser.frequencyBinCount);
      window.chiptuneSynth.analyser.getByteFrequencyData(dataArray);

      specBars.forEach((bar, i) => {
        const val = dataArray[i * 2] || (Math.sin(Date.now() / 180 + i) * 8 + 12);
        const height = Math.max(4, Math.min(18, (val / 255) * 20));
        bar.style.height = `${height}px`;
      });
    }
    if (isPlaying) {
      requestAnimationFrame(startEqualizerAnim);
    }
  }

  // Volume & Mute
  volBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(600, 0.04);
    if (isMuted) {
      window.chiptuneSynth.setVolume(0.8);
      realAudio.volume = 0.8;
      volIcon.textContent = '🔊';
      isMuted = false;
    } else {
      window.chiptuneSynth.setVolume(0);
      realAudio.volume = 0;
      volIcon.textContent = '🔇';
      isMuted = true;
    }
  });

  // View Switching (Player / Map)
  function showPlayerView() {
    window.chiptuneSynth.playBeep(520, 0.04);
    sideTabPlayer.classList.add('active');
    sideTabMap.classList.remove('active');
    viewPlayer.classList.add('active');
    viewMap.classList.remove('active');
  }

  function showMapView() {
    window.chiptuneSynth.playBeep(650, 0.04);
    sideTabMap.classList.add('active');
    sideTabPlayer.classList.remove('active');
    viewMap.classList.add('active');
    viewPlayer.classList.remove('active');
  }

  sideTabPlayer.addEventListener('click', showPlayerView);
  sideTabMap.addEventListener('click', showMapView);
  screenMapBtn.addEventListener('click', showMapView);

  // Prev / Next Navigation
  prevBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(392, 0.05);
    selectTrack(currentIndex - 1, isPlaying);
  });

  nextBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(587, 0.05);
    selectTrack(currentIndex + 1, isPlaying);
  });

  screenPlayBtn.addEventListener('click', togglePlay);

  // Character Click Animations
  hangingSpidey.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(784, 0.1, 'triangle');
    hangingSpideyAnchor.style.animation = 'none';
    hangingSpidey.style.transform = 'scale(1.4) rotate(-25deg)';
    setTimeout(() => {
      hangingSpidey.style.transform = '';
      hangingSpideyAnchor.style.animation = '';
    }, 450);
  });

  crouchingSpidey.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(880, 0.08, 'square');
    crouchingSpidey.style.transform = 'scale(1.3) translateY(-6px)';
    setTimeout(() => crouchingSpidey.style.transform = '', 300);
  });

  eyeBadgeBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(987, 0.06);
    eyeBadgeBtn.style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => eyeBadgeBtn.style.transform = '', 300);
  });

  // CRT Scanlines Toggle
  crtToggleBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(700, 0.04);
    crtOverlay.classList.toggle('disabled');
  });

  // Menu Drawer Modal
  sideTabMenu.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(440, 0.04);
    menuDrawer.classList.add('open');
  });

  closeDrawerBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(330, 0.04);
    menuDrawer.classList.remove('open');
  });

  // Custom Audio Upload
  audioFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      TRACKS.push({
        id: TRACKS.length + 1,
        name: file.name.replace(/\.[^/.]+$/, "").toUpperCase().substring(0, 16),
        meta: "CUSTOM USER MISSION AUDIO",
        duration: 180,
        src: url,
        x: Math.floor(Math.random() * 60) + 20,
        y: Math.floor(Math.random() * 40) + 30,
        locked: false
      });
      audioEngine = 'html5';
      renderMap();
      renderDrawerList();
      selectTrack(TRACKS.length - 1, true);
    }
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
      if (viewPlayer.classList.contains('active')) {
        showMapView();
      } else {
        showPlayerView();
      }
    }
  });

  // Init
  renderMap();
  renderDrawerList();
  selectTrack(0, false);
});
