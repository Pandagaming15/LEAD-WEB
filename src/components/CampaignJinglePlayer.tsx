import React, { useEffect, useRef } from 'react';
import { CAMPAIGN_SETTINGS } from '../data/campaignData';

/**
 * Invisible Background Campaign Music Engine
 * - Plays automatically once the web is open at "just right volume" (30-32%).
 * - No buttons or widgets shown on screen.
 * - STRICT MOBILE LIFECYCLE: Automatically stops/pauses audio when:
 *   - The user goes to home screen (device at home)
 *   - The user presses Back in Chrome (previous activity)
 *   - The user switches tabs or minimizes Chrome (visibilitychange, pagehide, blur)
 *   - The website or tab is closed (beforeunload)
 */
export const CampaignJinglePlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isUserPlayingRef = useRef<boolean>(false);

  useEffect(() => {
    const TARGET_VOLUME = 0.32;

    const audio = new Audio();
    audio.src = CAMPAIGN_SETTINGS.jingleAudioSrc;
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audioRef.current = audio;

    const startAudio = async () => {
      // Do not start if page is currently hidden or in background
      if (document.hidden || document.visibilityState === 'hidden') return;

      try {
        await audio.play();
        isUserPlayingRef.current = true;
      } catch {
        // Fallback to Web Audio fanfare if mp3 is not loaded or autoplay requires gesture
        playSynthesizedFallback(TARGET_VOLUME);
      }
    };

    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        try {
          audioContextRef.current.suspend();
        } catch {
          // Ignored
        }
      }
    };

    const resumeAudioIfVisible = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        stopAudio();
        return;
      }

      if (isUserPlayingRef.current) {
        if (audioRef.current && audioRef.current.src) {
          audioRef.current.play().catch(() => {});
        }
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume().catch(() => {});
        }
      }
    };

    // Synthesized campaign chords (C major inspiring cadence: C - G - Am - F)
    const playSynthesizedFallback = (vol: number) => {
      if (document.hidden || document.visibilityState === 'hidden') return;

      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }

        const chords = [
          [261.63, 329.63, 392.00, 523.25], // C
          [196.00, 246.94, 293.66, 392.00], // G
          [220.00, 261.63, 329.63, 440.00], // Am
          [174.61, 218.26, 261.63, 349.23], // F
        ];

        let step = 0;
        const bpm = 120;
        const beatMs = (60 / bpm) * 1000;

        const playBeat = () => {
          if (document.hidden || !audioContextRef.current || audioContextRef.current.state !== 'running') return;
          const currentChord = chords[step % chords.length];

          currentChord.forEach((freq, idx) => {
            if (!audioContextRef.current || audioContextRef.current.state !== 'running') return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = idx === 0 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            const now = ctx.currentTime;
            const noteGain = vol * 0.07;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(noteGain, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.00001, now + (beatMs / 1000) * 1.8);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 1.2);
          });

          step++;
        };

        playBeat();
        synthIntervalRef.current = window.setInterval(playBeat, beatMs * 2);
        isUserPlayingRef.current = true;
      } catch {
        // AudioContext disabled or unsupported
      }
    };

    // 1. Attempt autoplay immediately on mount if active
    if (!document.hidden) {
      startAudio();
    }

    // 2. Gesture listener for initial autoplay unblock
    const handleFirstUserGesture = () => {
      if (!isUserPlayingRef.current && !document.hidden) {
        startAudio();
      }
      removeGestureListeners();
    };

    const removeGestureListeners = () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('scroll', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };

    window.addEventListener('click', handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstUserGesture, { once: true, passive: true });

    // =========================================================================
    // STRICT LIFECYCLE HANDLERS FOR CHROME, BACK BUTTON & HOME SCREEN
    // =========================================================================

    // A. Page Visibility Change (user switches tab, minimizes Chrome, presses Home)
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        stopAudio();
      } else {
        resumeAudioIfVisible();
      }
    };

    // B. Pagehide / Beforeunload (user navigates back, closes tab, or leaves)
    const handlePageHide = () => {
      stopAudio();
      isUserPlayingRef.current = false;
    };

    // C. Window Blur (user swipes to app switcher, notifications, or presses Home)
    const handleWindowBlur = () => {
      stopAudio();
    };

    // D. Window Focus (user returns to the Chrome window)
    const handleWindowFocus = () => {
      if (!document.hidden) {
        resumeAudioIfVisible();
      }
    };

    // E. Popstate / Hashchange (user hits Android/Chrome Back button)
    const handleBackNav = () => {
      stopAudio();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('popstate', handleBackNav);

    return () => {
      removeGestureListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('popstate', handleBackNav);

      stopAudio();
      isUserPlayingRef.current = false;

      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch {
          // Ignored
        }
      }
    };
  }, []);

  return null;
};
