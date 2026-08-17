/**
 * 8-BIT CHIPTUNE PROCEDURAL SYNTHESIZER
 * Produces real retro music in-browser using Web Audio API
 */

class ChiptuneSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 105; // 1:45 standard loop
    this.volume = 0.8;
    this.activeTrackIndex = 0;
    this.timerId = null;
    this.stepIndex = 0;
    this.bpm = 128;
    this.activeOscillators = [];
    
    // Scale frequencies (C4 to C6)
    this.notes = {
      'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'C6': 1046.50, 'REST': 0
    };

    // Define 6 distinct 8-bit musical compositions
    this.songs = [
      {
        name: "ARACHNID ALLEY",
        bpm: 128,
        duration: 105,
        leadType: "square",
        bassType: "triangle",
        lead: ["E4","G4","A4","B4","C5","B4","A4","G4","E4","G4","A4","REST","E5","D5","B4","G4",
               "A4","C5","D5","E5","G5","E5","D5","C5","A4","B4","C5","D5","B4","G4","E4","REST"],
        bass: ["E3","E3","E3","E3","A3","A3","A3","A3","C4","C4","C4","C4","B3","B3","G3","G3",
               "E3","E3","E3","E3","A3","A3","A3","A3","D3","D3","D3","D3","B3","B3","E3","E3"],
        arp:  ["E4","B4","E5","B4","G4","D5","G5","D5","A4","E5","A5","E5","B4","F#5","B5","F#5"]
      },
      {
        name: "NEON ROOFTOPS",
        bpm: 136,
        duration: 98,
        leadType: "sawtooth",
        bassType: "square",
        lead: ["A4","C5","E5","A5","G5","E5","D5","C5","D5","E5","G5","E5","D5","C5","A4","REST",
               "F5","E5","D5","C5","D5","F5","E5","D5","E5","G5","A5","B5","C6","B5","A5","G5"],
        bass: ["A3","A3","C3","C3","G3","G3","E3","E3","F3","F3","D3","D3","E3","E3","G3","G3",
               "A3","A3","F3","F3","D3","D3","E3","E3","A3","A3","G3","G3","F3","F3","E3","E3"],
        arp:  ["A4","E5","A5","C5","G4","D5","G5","B4","F4","C5","F5","A4","E4","B4","E5","G4"]
      },
      {
        name: "WEB-SLINGER GROOVE",
        bpm: 118,
        duration: 114,
        leadType: "square",
        bassType: "triangle",
        lead: ["D4","F4","G4","G#4","A4","C5","D5","REST","C5","A4","G4","F4","D4","F4","D4","REST",
               "F4","G4","A4","C5","D5","F5","D5","C5","A4","C5","A4","G4","F4","D4","REST","REST"],
        bass: ["D3","D3","REST","D3","F3","F3","G3","G3","D3","D3","REST","D3","C3","C3","A3","A3",
               "D3","D3","REST","D3","G3","G3","F3","F3","D3","D3","REST","D3","A3","C4","D4","REST"],
        arp:  ["D4","A4","D5","F4","C4","G4","C5","E4","G3","D4","G4","B3","A3","E4","A4","C4"]
      },
      {
        name: "MIDNIGHT PATROL",
        bpm: 110,
        duration: 120,
        leadType: "square",
        bassType: "square",
        lead: ["B4","D5","F#5","B5","A5","F#5","E5","D5","C#5","E5","A5","G5","F#5","D5","B4","REST",
               "G5","F#5","E5","D5","E5","G5","F#5","E5","F#5","A5","B5","C#6","D6","C#6","B5","A5"],
        bass: ["B3","B3","B3","B3","G3","G3","G3","G3","A3","A3","A3","A3","F#3","F#3","F#3","F#3",
               "G3","G3","G3","G3","E3","E3","E3","E3","F#3","F#3","F#3","F#3","B3","B3","B3","B3"],
        arp:  ["B4","F#5","B5","D5","G4","D5","G5","B4","A4","E5","A5","C#5","F#4","C#5","F#5","A4"]
      },
      {
        name: "CYBER MANHATTAN",
        bpm: 140,
        duration: 90,
        leadType: "sawtooth",
        bassType: "triangle",
        lead: ["C5","E5","G5","C6","B5","G5","E5","D5","C5","E5","G5","A5","G5","E5","D5","REST",
               "F5","A5","C6","D6","C6","A5","F5","E5","D5","F5","A5","B5","C6","G5","E5","C5"],
        bass: ["C3","C3","G3","G3","A3","A3","E3","E3","F3","F3","C3","C3","G3","G3","B3","B3",
               "F3","F3","A3","A3","D3","D3","F3","F3","G3","G3","B3","B3","C3","C3","G3","G3"],
        arp:  ["C4","G4","C5","E5","A3","E4","A4","C5","F3","C4","F4","A4","G3","D4","G4","B4"]
      },
      {
        name: "BONUS: BOSS ARENA",
        bpm: 150,
        duration: 110,
        leadType: "square",
        bassType: "sawtooth",
        lead: ["E5","E5","REST","E5","G5","E5","D5","C5","B4","D5","E5","REST","G5","A5","B5","REST",
               "C6","B5","A5","G5","A5","C6","B5","A5","B5","G5","E5","D5","E5","REST","REST","REST"],
        bass: ["E3","E3","E3","E3","C3","C3","C3","C3","D3","D3","D3","D3","B3","B3","B3","B3",
               "C3","C3","C3","C3","A3","A3","A3","A3","B3","B3","B3","B3","E3","E3","E3","E3"],
        arp:  ["E4","B4","E5","G4","C4","G4","C5","E4","D4","A4","D5","F#4","B3","F#4","B4","D#4"]
      }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setTrack(index) {
    this.activeTrackIndex = index % this.songs.length;
    const song = this.songs[this.activeTrackIndex];
    this.bpm = song.bpm;
    this.duration = song.duration;
    this.currentTime = 0;
    this.stepIndex = 0;
  }

  play() {
    this.init();
    this.isPlaying = true;
    
    const stepDurationMs = (60 / this.bpm / 4) * 1000; // 16th note step
    
    if (this.timerId) clearInterval(this.timerId);
    
    this.timerId = setInterval(() => {
      if (!this.isPlaying) return;
      this.step();
      this.currentTime += (stepDurationMs / 1000);
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
        this.stepIndex = 0;
      }
      if (this.onTimeUpdate) {
        this.onTimeUpdate(this.currentTime, this.duration);
      }
    }, stepDurationMs);
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  seek(percent) {
    this.currentTime = (percent / 100) * this.duration;
    const song = this.songs[this.activeTrackIndex];
    const totalSteps = song.lead.length;
    this.stepIndex = Math.floor((this.currentTime / this.duration) * totalSteps * 4) % totalSteps;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  step() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const song = this.songs[this.activeTrackIndex];
    const t = this.ctx.currentTime;
    const stepDur = 60 / this.bpm / 4;

    const leadNote = song.lead[this.stepIndex % song.lead.length];
    const bassNote = song.bass[this.stepIndex % song.bass.length];
    const arpNote = song.arp[this.stepIndex % song.arp.length];

    // Play Lead Melody
    if (leadNote && leadNote !== 'REST') {
      this.playTone(this.notes[leadNote] || 440, song.leadType, stepDur * 0.9, 0.18, t);
    }

    // Play Bassline
    if (bassNote && bassNote !== 'REST' && this.stepIndex % 2 === 0) {
      this.playTone(this.notes[bassNote] || 110, song.bassType, stepDur * 1.8, 0.22, t);
    }

    // Play Arpeggio / Harmony
    if (arpNote && arpNote !== 'REST' && this.stepIndex % 2 === 1) {
      this.playTone(this.notes[arpNote] || 330, 'square', stepDur * 0.6, 0.08, t);
    }

    // 8-bit Noise Drum (Hi-hat on each 16th, Snare on beats 2 & 4)
    if (this.stepIndex % 4 === 2) {
      this.playNoise(stepDur * 0.8, 0.12, t, 'snare');
    } else if (this.stepIndex % 2 === 0) {
      this.playNoise(stepDur * 0.3, 0.04, t, 'hihat');
    }

    this.stepIndex++;
  }

  playTone(freq, type, duration, vol, startTime) {
    if (!freq) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type || 'square';
      osc.frequency.setValueAtTime(freq, startTime);

      // 8-bit ADSR envelope
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch(e) {}
  }

  playNoise(duration, vol, startTime, type) {
    try {
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = type === 'snare' ? 'lowpass' : 'highpass';
      filter.frequency.setValueAtTime(type === 'snare' ? 1200 : 5000, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(vol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start(startTime);
      whiteNoise.stop(startTime + duration);
    } catch(e) {}
  }

  // 8-Bit Retro Sound FX for UI Interactions
  playBeep(freq = 587.33, duration = 0.08, type = 'square') {
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + duration);
      gain.gain.setValueAtTime(0.12 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + duration);
    } catch(e) {}
  }
}

window.chiptuneSynth = new ChiptuneSynth();
