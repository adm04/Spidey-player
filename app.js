/**
 * SPIDEY ♪ TRACKER — YOUTUBE PLAYLIST & CHIPTUNE AUDIO CONTROLLER
 * Full 36-Track "Spider-Man: Brand New Day" Soundtrack Integration
 */

// Full 36-Track Playlist from https://youtube.com/playlist?list=PLPf88LA2uYTs
const BRAND_NEW_DAY_TRACKS = [
  { id: 1, title: "oh yeah", artist: "Steve Lacy", videoId: "MhzGSgicAoc", duration: 195, x: 22, y: 36, locked: false },
  { id: 2, title: "Theme from Spider-Man", artist: "Official Soundtrack", videoId: "6xRCMAjRJNs", duration: 168, x: 32, y: 55, locked: false },
  { id: 3, title: "01. Web Letter Days", artist: "Michael Giacchino", videoId: "uM_qAUKhMaU", duration: 195, x: 42, y: 30, locked: false },
  { id: 4, title: "02. A Good Day to Dive", artist: "Michael Giacchino", videoId: "OnwH0SllW4Y", duration: 182, x: 52, y: 68, locked: false },
  { id: 5, title: "03. Possession is Nine Tenths", artist: "Official Soundtrack", videoId: "m4PKAHtn81g", duration: 210, x: 62, y: 35, locked: false },
  { id: 6, title: "04. What's Your Damage Control", artist: "Official Soundtrack", videoId: "BAn6uC2lYSw", duration: 174, x: 72, y: 62, locked: false },
  { id: 7, title: "05. The Metzger Set", artist: "Official Soundtrack", videoId: "h2VKua3YxOQ", duration: 160, x: 82, y: 32, locked: false },
  { id: 8, title: "06. Ned Man Walking", artist: "Official Soundtrack", videoId: "yFaUQtR2kpw", duration: 190, x: 90, y: 58, locked: false },
  { id: 9, title: "07. Quick as a Flashback", artist: "Official Soundtrack", videoId: "SfkAB5vMdy4", duration: 175, x: 18, y: 58, locked: false },
  { id: 10, title: "08. Peter's Walk of Shame", artist: "Official Soundtrack", videoId: "9fDOAmdQT1s", duration: 154, x: 26, y: 72, locked: false },
  { id: 11, title: "09. Settling Old Scorpions", artist: "Official Soundtrack", videoId: "d_PKzo6Lca0", duration: 205, x: 38, y: 28, locked: false },
  { id: 12, title: "10. Strong First Impressions", artist: "Official Soundtrack", videoId: "XIOUeAzn764", duration: 188, x: 46, y: 52, locked: false },
  { id: 13, title: "11. The Speed of Thought", artist: "Official Soundtrack", videoId: "mxu6-AcNczs", duration: 162, x: 55, y: 25, locked: false },
  { id: 14, title: "12. Come Fly With Me", artist: "Official Soundtrack", videoId: "6vakzMwHwg8", duration: 198, x: 65, y: 70, locked: false },
  { id: 15, title: "13. Kiss of the Spider-Man", artist: "Official Soundtrack", videoId: "BsG83Mu8SFM", duration: 178, x: 74, y: 40, locked: false },
  { id: 16, title: "14. Always Hulking About", artist: "Official Soundtrack", videoId: "uOkDVsvdnh0", duration: 165, x: 84, y: 65, locked: false },
  { id: 17, title: "15. Damage Control to Major Bomb", artist: "Official Soundtrack", videoId: "9ULBWxv_8vk", duration: 220, x: 92, y: 38, locked: false },
  { id: 18, title: "16. The Morning Aftermath", artist: "Official Soundtrack", videoId: "VQcmthRhTSw", duration: 170, x: 15, y: 42, locked: false },
  { id: 19, title: "17. Mask Me No More Questions", artist: "Official Soundtrack", videoId: "1jGaVMCMouo", duration: 185, x: 28, y: 58, locked: false },
  { id: 20, title: "18. Big Sister Energy", artist: "Official Soundtrack", videoId: "Ar4JnVeo-1Y", duration: 148, x: 45, y: 38, locked: false },
  { id: 21, title: "19. A Brave Neural World", artist: "Official Soundtrack", videoId: "qyn_Wnl_1Jk", duration: 192, x: 58, y: 72, locked: false },
  { id: 22, title: "20. To the V-Max", artist: "Official Soundtrack", videoId: "T23s3PLCHyk", duration: 164, x: 68, y: 48, locked: false },
  { id: 23, title: "21. Fight Hand That Bleeds", artist: "Official Soundtrack", videoId: "-jo3Rd0FL4U", duration: 215, x: 76, y: 32, locked: false },
  { id: 24, title: "22. I Spider With My Little Eye", artist: "Official Soundtrack", videoId: "XzFFsOk2Alw", duration: 176, x: 85, y: 60, locked: false },
  { id: 25, title: "23. Mi Cabeza, Su Cabeza", artist: "Official Soundtrack", videoId: "UfSXeb8sdT0", duration: 182, x: 18, y: 30, locked: false },
  { id: 26, title: "24. Say Hero to Little Friend", artist: "Official Soundtrack", videoId: "ACgp0drGDs4", duration: 190, x: 35, y: 65, locked: false },
  { id: 27, title: "25. Better Off Ned", artist: "Official Soundtrack", videoId: "wzkvI-JqgaY", duration: 168, x: 50, y: 35, locked: false },
  { id: 28, title: "26. Suite New Day", artist: "Official Soundtrack", videoId: "DQ7C_nlKrIc", duration: 320, x: 68, y: 32, locked: false },
  { id: 29, title: "Dame Tu Amistad", artist: "Dominique Patrick Noel", videoId: "9u07Hhnp3d0", duration: 212, x: 86, y: 34, locked: false },
  { id: 30, title: "Wolf Like Me", artist: "TV On the Radio", videoId: "DcchzvMhGt4", duration: 279, x: 92, y: 60, locked: false },
  { id: 31, title: "Loser", artist: "Tame Impala", videoId: "J1OumHmvtwY", duration: 210, x: 20, y: 62, locked: false },
  { id: 32, title: "EoO", artist: "Bad Bunny", videoId: "MFh158ftw0I", duration: 180, x: 30, y: 45, locked: false },
  { id: 33, title: "Monopoly", artist: "Monetochka", videoId: "SWgP7nuPgJ8", duration: 188, x: 40, y: 75, locked: false },
  { id: 34, title: "Fire for You", artist: "Cannons", videoId: "cep56Vcxo5s", duration: 232, x: 52, y: 48, locked: false },
  { id: 35, title: "I'm Every Woman", artist: "Chaka Khan", videoId: "iKOupH3xhh0", duration: 245, x: 60, y: 35, locked: false },
  { id: 36, title: "BONUS: St. Elmo's Fire", artist: "Brian Eno", videoId: "kcNkuMg52Zg", duration: 350, x: 92, y: 70, locked: true }
];

let ytPlayer = null;
let ytReady = false;
let currentTrackIndex = 0;
let isPlaying = false;
let isMuted = false;
let currentMode = 'youtube'; // 'youtube' or 'synth'
let progressInterval = null;
let visualizerRaf = null;

// Load YouTube IFrame API
function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    onYouTubeIframeAPIReady();
    return;
  }
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

window.onYouTubeIframeAPIReady = function() {
  try {
    ytPlayer = new YT.Player('ytPlayerContainer', {
      height: '155',
      width: '280',
      videoId: BRAND_NEW_DAY_TRACKS[0].videoId,
      playerVars: {
        'autoplay': 0,
        'controls': 1,
        'disablekb': 0,
        'fs': 0,
        'playsinline': 1,
        'rel': 0,
        'enablejsapi': 1,
        'origin': window.location.origin
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    });
  } catch(e) {
    console.warn("YouTube Player Init fallback:", e);
  }
};

function onPlayerReady(event) {
  ytReady = true;
  console.log("YouTube Player API Ready");
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    setPlayingState(true);
  } else if (event.data === YT.PlayerState.PAUSED) {
    setPlayingState(false);
  } else if (event.data === YT.PlayerState.ENDED) {
    selectTrack(currentTrackIndex + 1, true);
  }
}

function onPlayerError(e) {
  console.warn("YouTube video restricted/error, playing chiptune fallback:", e);
  currentMode = 'synth';
  const synthStatus = document.getElementById('synthStatus');
  const streamModeText = document.getElementById('streamModeText');
  if (synthStatus) synthStatus.textContent = '8-BIT';
  if (streamModeText) streamModeText.textContent = '8-BIT SYNTH';
  window.chiptuneSynth.setTrack(currentTrackIndex % 6);
  if (isPlaying) window.chiptuneSynth.play();
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  loadYouTubeAPI();

  const viewPlayer = document.getElementById('viewPlayer');
  const viewMap = document.getElementById('viewMap');
  const sideTabPlayer = document.getElementById('sideTabPlayer');
  const sideTabMap = document.getElementById('sideTabMap');
  const sideTabMenu = document.getElementById('sideTabMenu');
  
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  const trackNumPrefix = document.getElementById('trackNumPrefix');
  const tName1 = document.getElementById('tName1');
  const trackSecTag = document.getElementById('trackSecTag');
  const spectrumViz = document.getElementById('spectrumViz');
  const specBars = document.querySelectorAll('.spec-bar');
  
  const seekContainer = document.getElementById('seekContainer');
  const seekFill = document.getElementById('seekFill');
  const seekThumb = document.getElementById('seekThumb');
  const timeElapsed = document.getElementById('timeElapsed');
  const timeTotal = document.getElementById('timeTotal');
  
  const volBtn = document.getElementById('volBtn');
  const volIcon = document.getElementById('volIcon');
  const synthBadge = document.getElementById('synthBadge');
  const synthStatus = document.getElementById('synthStatus');
  
  const mapPinsLayer = document.getElementById('mapPinsLayer');
  const mapSvg = document.getElementById('mapSvg');
  const unexploredCounter = document.getElementById('unexploredCounter');
  
  const menuDrawer = document.getElementById('menuDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerTracklist = document.getElementById('drawerTracklist');
  const audioFileInput = document.getElementById('audioFileInput');
  
  const hangingSpidey = document.getElementById('hangingSpidey');
  const hangingSpideyAnchor = document.getElementById('hangingSpideyAnchor');
  const eyeBadgeBtn = document.getElementById('eyeBadgeBtn');
  const mascotBadge = document.getElementById('mascotBadge');
  const crtToggleBtn = document.getElementById('crtToggleBtn');
  const crtOverlay = document.getElementById('crtOverlay');

  function formatTime(sec) {
    if (isNaN(sec) || sec < 0) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Render Map with 36 Track Nodes
  function renderMap() {
    mapPinsLayer.innerHTML = '';
    let svgLines = '';

    // Show top 12 sighting nodes on map grid
    const displayTracks = BRAND_NEW_DAY_TRACKS.slice(0, 12);

    displayTracks.forEach((t, i) => {
      if (i < displayTracks.length - 1) {
        const next = displayTracks[i + 1];
        svgLines += `<line x1="${t.x}%" y1="${t.y}%" x2="${next.x}%" y2="${next.y}%" />`;
      }

      const pin = document.createElement('button');
      pin.className = 'map-pin';
      pin.style.left = `${t.x}%`;
      pin.style.top = `${t.y}%`;
      pin.dataset.index = i;
      pin.setAttribute('aria-label', `Track ${t.id}: ${t.title}`);

      let stateClass = 'unplayed';
      let icon = '♪';
      if (i === currentTrackIndex) {
        stateClass = 'active-sighting';
        icon = '★';
      } else if (t.locked) {
        stateClass = 'locked-node';
        icon = '🔒';
      }

      pin.classList.add(stateClass);
      pin.innerHTML = `${icon}<span class="pin-tooltip">${t.title}</span>`;

      pin.addEventListener('click', () => {
        if (t.locked) t.locked = false;
        selectTrack(i, true);
      });

      mapPinsLayer.appendChild(pin);
    });

    mapSvg.innerHTML = svgLines;
    unexploredCounter.textContent = `${BRAND_NEW_DAY_TRACKS.length} SIGHTINGS DETECTED`;
  }

  // Populate Drawer Tracklist (All 36 Tracks)
  function renderDrawerList() {
    drawerTracklist.innerHTML = '';
    BRAND_NEW_DAY_TRACKS.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = `tracklist-item ${i === currentTrackIndex ? 'active' : ''}`;
      item.innerHTML = `
        <span>${t.id < 10 ? '0' : ''}${t.id}. ${t.title}</span>
        <span>${formatTime(t.duration)}</span>
      `;
      item.addEventListener('click', () => {
        selectTrack(i, true);
        menuDrawer.classList.remove('open');
      });
      drawerTracklist.appendChild(item);
    });
  }

  // Update UI Metadata
  function updateUI() {
    const track = BRAND_NEW_DAY_TRACKS[currentTrackIndex];
    trackNumPrefix.textContent = `[${track.id < 10 ? '0' : ''}${track.id}]`;
    tName1.textContent = track.title;
    trackSecTag.textContent = `SPIDER-MAN: BRAND NEW DAY // ${track.artist.toUpperCase()}`;
    timeElapsed.textContent = "00:00";
    timeTotal.textContent = formatTime(track.duration);

    document.querySelectorAll('.map-pin').forEach(pin => {
      const idx = parseInt(pin.dataset.index);
      pin.classList.remove('active-sighting', 'unplayed', 'locked-node');
      const t = BRAND_NEW_DAY_TRACKS[idx];
      if (idx === currentTrackIndex) {
        pin.classList.add('active-sighting');
        pin.innerHTML = `★<span class="pin-tooltip">${t.title}</span>`;
      } else if (t && t.locked) {
        pin.classList.add('locked-node');
        pin.innerHTML = `🔒<span class="pin-tooltip">${t.title} (LOCKED)</span>`;
      } else if (t) {
        pin.classList.add('unplayed');
        pin.innerHTML = `♪<span class="pin-tooltip">${t.title}</span>`;
      }
    });

    document.querySelectorAll('.tracklist-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === currentTrackIndex);
    });
  }

  // Select Track
  function selectTrack(index, autoPlay = true) {
    currentTrackIndex = (index + BRAND_NEW_DAY_TRACKS.length) % BRAND_NEW_DAY_TRACKS.length;
    const track = BRAND_NEW_DAY_TRACKS[currentTrackIndex];

    updateUI();

    if (currentMode === 'youtube' && ytReady && ytPlayer) {
      try {
        if (autoPlay) {
          if (ytPlayer.loadVideoById) {
            ytPlayer.loadVideoById(track.videoId);
          }
        } else {
          if (ytPlayer.cueVideoById) {
            ytPlayer.cueVideoById(track.videoId);
          }
        }
      } catch(e) {
        console.warn("YouTube cue error, using synth:", e);
        window.chiptuneSynth.setTrack(currentTrackIndex % 6);
      }
    } else {
      window.chiptuneSynth.setTrack(currentTrackIndex % 6);
      if (autoPlay) window.chiptuneSynth.play();
    }

    if (autoPlay) {
      setPlayingState(true);
    } else {
      setPlayingState(false);
    }
  }

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      playBtn.classList.add('active');
      playIcon.textContent = '❚❚';
      playText.textContent = 'PAUSE';
      spectrumViz.classList.remove('paused');
      startVisualizerLoop();
      startProgressPolling();
    } else {
      playBtn.classList.remove('active');
      playIcon.textContent = '▶';
      playText.textContent = 'PLAY';
      spectrumViz.classList.add('paused');
      stopProgressPolling();
    }
  }

  function togglePlay() {
    // Unlock Web Audio Context on user gesture
    if (window.chiptuneSynth) {
      window.chiptuneSynth.init();
      window.chiptuneSynth.playBeep(440, 0.04);
    }

    if (isPlaying) {
      if (currentMode === 'youtube' && ytReady && ytPlayer && ytPlayer.pauseVideo) {
        try { ytPlayer.pauseVideo(); } catch(e) {}
      }
      if (window.chiptuneSynth) window.chiptuneSynth.pause();
      setPlayingState(false);
    } else {
      let ytSuccess = false;
      if (currentMode === 'youtube' && ytReady && ytPlayer && ytPlayer.playVideo) {
        try {
          ytPlayer.playVideo();
          ytSuccess = true;
        } catch(e) {
          console.warn("YouTube play error, falling back to synth:", e);
        }
      }
      
      if (!ytSuccess || currentMode === 'synth') {
        if (window.chiptuneSynth) {
          window.chiptuneSynth.setTrack(currentTrackIndex % 6);
          window.chiptuneSynth.play();
        }
      }
      setPlayingState(true);
    }
  }

  // Progress Polling
  function startProgressPolling() {
    stopProgressPolling();
    progressInterval = setInterval(() => {
      if (!isPlaying) return;
      let curr = 0;
      let dur = BRAND_NEW_DAY_TRACKS[currentTrackIndex].duration;

      if (currentMode === 'youtube' && ytReady && ytPlayer && ytPlayer.getCurrentTime) {
        curr = ytPlayer.getCurrentTime() || 0;
        const ytDur = ytPlayer.getDuration();
        if (ytDur > 0) dur = ytDur;
      } else if (window.chiptuneSynth) {
        curr = window.chiptuneSynth.currentTime;
        dur = window.chiptuneSynth.duration;
      }

      const pct = dur > 0 ? (curr / dur) * 100 : 0;
      seekFill.style.width = `${pct}%`;
      seekThumb.style.left = `${pct}%`;
      timeElapsed.textContent = formatTime(curr);
      timeTotal.textContent = formatTime(dur);
      seekContainer.setAttribute('aria-valuenow', Math.round(pct));
    }, 250);
  }

  function stopProgressPolling() {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }

  // Seek Scrubber
  seekContainer.addEventListener('click', (e) => {
    const rect = seekContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));

    let dur = BRAND_NEW_DAY_TRACKS[currentTrackIndex].duration;
    if (currentMode === 'youtube' && ytReady && ytPlayer && ytPlayer.getDuration) {
      dur = ytPlayer.getDuration() || dur;
      const targetSec = (pct / 100) * dur;
      ytPlayer.seekTo(targetSec, true);
    } else {
      window.chiptuneSynth.seek(pct);
    }

    seekFill.style.width = `${pct}%`;
    seekThumb.style.left = `${pct}%`;
  });

  // Dynamic Spectrum Visualizer Matching Audio Rhythm
  function startVisualizerLoop() {
    if (!isPlaying) return;

    let time = Date.now() / 150;
    specBars.forEach((bar, i) => {
      // Dynamic frequency rhythm simulation + Web Audio analyser synthesis
      let val;
      if (window.chiptuneSynth && window.chiptuneSynth.analyser && currentMode === 'synth') {
        const arr = new Uint8Array(window.chiptuneSynth.analyser.frequencyBinCount);
        window.chiptuneSynth.analyser.getByteFrequencyData(arr);
        val = (arr[i * 2] / 255) * 18;
      } else {
        // Dynamic rhythmic pulse for YouTube stream
        const base = Math.sin(time + i * 0.6) * 6 + Math.cos(time * 1.5 + i * 0.3) * 4 + 8;
        val = Math.max(3, Math.min(18, base));
      }
      bar.style.height = `${val}px`;
    });

    visualizerRaf = requestAnimationFrame(startVisualizerLoop);
  }

  // Volume / Mute
  volBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(600, 0.04);
    if (isMuted) {
      if (ytPlayer && ytPlayer.unMute) ytPlayer.unMute();
      window.chiptuneSynth.setVolume(0.8);
      volIcon.textContent = '🔊';
      isMuted = false;
    } else {
      if (ytPlayer && ytPlayer.mute) ytPlayer.mute();
      window.chiptuneSynth.setVolume(0);
      volIcon.textContent = '🔇';
      isMuted = true;
    }
  });

  // Switch Sound Engine (YouTube Live Audio vs 8-Bit Chiptune)
  const streamModeBtn = document.getElementById('streamModeBtn');
  const streamModeText = document.getElementById('streamModeText');
  const ytVideoWrapper = document.getElementById('ytVideoWrapper');
  const hangingWebRig = document.getElementById('hangingWebRig');

  function toggleAudioEngineMode() {
    window.chiptuneSynth.playBeep(523, 0.06);
    if (currentMode === 'youtube') {
      currentMode = 'synth';
      synthStatus.textContent = '8-BIT';
      if (streamModeText) streamModeText.textContent = '8-BIT SYNTH';
      if (ytVideoWrapper) ytVideoWrapper.classList.remove('active');
      if (hangingWebRig) hangingWebRig.style.display = 'flex';
      if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
      window.chiptuneSynth.setTrack(currentTrackIndex % 6);
      if (isPlaying) window.chiptuneSynth.play();
    } else {
      currentMode = 'youtube';
      synthStatus.textContent = 'STREAM';
      if (streamModeText) streamModeText.textContent = 'YOUTUBE STREAM';
      window.chiptuneSynth.pause();
      if (ytPlayer && ytPlayer.playVideo && isPlaying) ytPlayer.playVideo();
    }
  }

  synthBadge.addEventListener('click', toggleAudioEngineMode);
  if (streamModeBtn) streamModeBtn.addEventListener('click', toggleAudioEngineMode);

  // Prev / Next
  prevBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(392, 0.05);
    selectTrack(currentTrackIndex - 1, isPlaying);
  });

  nextBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(587, 0.05);
    selectTrack(currentTrackIndex + 1, isPlaying);
  });

  playBtn.addEventListener('click', togglePlay);

  // View Navigation
  sideTabPlayer.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(520, 0.04);
    sideTabPlayer.classList.add('active');
    sideTabMap.classList.remove('active');
    viewPlayer.classList.add('active');
    viewMap.classList.remove('active');
  });

  sideTabMap.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(650, 0.04);
    sideTabMap.classList.add('active');
    sideTabPlayer.classList.remove('active');
    viewMap.classList.add('active');
    viewPlayer.classList.remove('active');
  });

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

  mascotBadge.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(880, 0.08, 'square');
    mascotBadge.style.transform = 'scale(1.25) rotate(360deg)';
    setTimeout(() => mascotBadge.style.transform = '', 350);
  });

  eyeBadgeBtn.addEventListener('click', () => {
    window.chiptuneSynth.playBeep(987, 0.06);
    eyeBadgeBtn.style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => eyeBadgeBtn.style.transform = '', 300);
  });

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

  // Custom Audio File
  audioFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      BRAND_NEW_DAY_TRACKS.unshift({
        id: 0,
        title: file.name.replace(/\.[^/.]+$/, "").toUpperCase().substring(0, 18),
        artist: "Custom User Upload",
        videoId: "",
        duration: 180,
        src: url,
        x: 50,
        y: 50,
        locked: false
      });
      renderMap();
      renderDrawerList();
      selectTrack(0, true);
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
      selectTrack(currentTrackIndex - 1, isPlaying);
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      selectTrack(currentTrackIndex + 1, isPlaying);
    } else if (e.key === 'm' || e.key === 'M') {
      volBtn.click();
    } else if (e.key === 't' || e.key === 'T') {
      if (viewPlayer.classList.contains('active')) {
        sideTabMap.click();
      } else {
        sideTabPlayer.click();
      }
    }
  });

  // Init
  renderMap();
  renderDrawerList();
  selectTrack(0, false);
});
