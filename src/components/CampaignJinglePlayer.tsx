import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music2 } from 'lucide-react';
import { CAMPAIGN_SETTINGS } from '../data/campaignData';

/**
 * Campaign Jingle Player
 *
 * Fast Loading & Universal Playback:
 * - Preloaded audio with native browser buffering for instant start.
 * - Global event listeners ({ capture: true }) on document/window so ANY interaction
 *   (clicks, taps, navigation, scrolling) triggers playback immediately, not just candidate cards.
 * - Floating interactive controller so users can tap Play/Pause anytime right from the start.
 * - Custom event bus ('lead-jingle-toggle', 'lead-jingle-play', 'lead-jingle-pause', 'lead-jingle-state')
 *   so Header and Hero buttons can also control playback directly.
 * - Pauses automatically when tab is hidden, minimized, or user presses back/home.
 * - Resumes cleanly when foregrounded.
 */
export const CampaignJinglePlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldPlayRef = useRef<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    const TARGET_VOLUME = 0.35;

    // 1. Create and configure audio instance
    const audio = new Audio();
    audioRef.current = audio;
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audio.autoplay = false;
    audio.src = CAMPAIGN_SETTINGS.jingleAudioSrc;
    audio.load();

    const broadcastState = (playing: boolean) => {
      setIsPlaying(playing);
      window.dispatchEvent(
        new CustomEvent('lead-jingle-state', { detail: { isPlaying: playing } })
      );
    };

    // 2. Start audio playback
    const startAudio = async () => {
      if (!audioRef.current) return;
      if (document.hidden || document.visibilityState === 'hidden') return;

      shouldPlayRef.current = true;
      try {
        await audio.play();
        broadcastState(true);
      } catch {
        // Autoplay policy prevented playback until gesture
        broadcastState(false);
      }
    };

    // 3. Pause audio playback
    const pauseAudio = () => {
      if (!audio.paused) {
        audio.pause();
      }
      broadcastState(false);
    };

    // 4. Global capture trigger on ANY user interaction anywhere on page
    const handleGlobalUserGesture = () => {
      setHasInteracted(true);
      if (shouldPlayRef.current && audio.paused && !document.hidden) {
        void startAudio();
      }
    };

    // Use capture: true so child clicks/taps anywhere on the page don't get swallowed
    const gestureEvents = ['click', 'pointerdown', 'touchstart', 'touchend', 'keydown'];
    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, handleGlobalUserGesture, { capture: true, passive: true });
    });

    // 5. Audio event listeners
    const handlePlaying = () => broadcastState(true);
    const handlePause = () => broadcastState(false);
    const handleCanPlay = () => {
      if (shouldPlayRef.current && audio.paused && !document.hidden) {
        void startAudio();
      }
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('canplay', handleCanPlay);

    // 6. External control bus (from Header, Hero buttons)
    const handleCustomToggle = () => {
      if (audio.paused) {
        shouldPlayRef.current = true;
        void startAudio();
      } else {
        shouldPlayRef.current = false;
        pauseAudio();
      }
    };

    const handleCustomPlay = () => {
      shouldPlayRef.current = true;
      void startAudio();
    };

    const handleCustomPause = () => {
      shouldPlayRef.current = false;
      pauseAudio();
    };

    window.addEventListener('lead-jingle-toggle', handleCustomToggle);
    window.addEventListener('lead-jingle-play', handleCustomPlay);
    window.addEventListener('lead-jingle-pause', handleCustomPause);

    // 7. Backgrounding, tab switch, and back navigation handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAudio();
      } else if (shouldPlayRef.current && audio.paused) {
        void startAudio();
      }
    };

    const handlePageHide = () => {
      shouldPlayRef.current = false;
      pauseAudio();
    };

    const handleWindowBlur = () => {
      pauseAudio();
    };

    const handleWindowFocus = () => {
      if (shouldPlayRef.current && audio.paused && !document.hidden) {
        void startAudio();
      }
    };

    const handlePopState = () => {
      shouldPlayRef.current = false;
      pauseAudio();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('popstate', handlePopState);

    // 8. Try starting immediately on load
    void startAudio();

    // 9. Cleanup
    return () => {
      shouldPlayRef.current = false;
      gestureEvents.forEach((ev) => {
        window.removeEventListener(ev, handleGlobalUserGesture, { capture: true });
      });

      window.removeEventListener('lead-jingle-toggle', handleCustomToggle);
      window.removeEventListener('lead-jingle-play', handleCustomPlay);
      window.removeEventListener('lead-jingle-pause', handleCustomPause);

      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('popstate', handlePopState);

      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('canplay', handleCanPlay);

      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      shouldPlayRef.current = false;
      audioRef.current.pause();
      setIsPlaying(false);
      window.dispatchEvent(
        new CustomEvent('lead-jingle-state', { detail: { isPlaying: false } })
      );
    } else {
      shouldPlayRef.current = true;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        window.dispatchEvent(
          new CustomEvent('lead-jingle-state', { detail: { isPlaying: true } })
        );
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <aside
      aria-label="Campaign Jingle Player"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-300"
    >
      <button
        onClick={togglePlayback}
        type="button"
        className={`group flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer active:scale-95 border ${
          isPlaying
            ? 'bg-gradient-to-r from-[#2c0e04]/95 to-[#1a0802]/95 border-orange-500/60 shadow-orange-950/60 text-white'
            : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 border-amber-300/80 text-white shadow-orange-900/80 animate-pulse'
        }`}
        title={isPlaying ? 'Pause Campaign Jingle' : 'Play LEAD Campaign Jingle'}
        aria-label={isPlaying ? 'Pause LEAD Campaign Jingle' : 'Play LEAD Campaign Jingle'}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Waves */}
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true">
              <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-2.5" />
              <span className="w-0.5 bg-orange-400 rounded-full animate-pulse h-3.5 delay-75" />
              <span className="w-0.5 bg-amber-300 rounded-full animate-pulse h-2 delay-150" />
            </div>

            <span className="text-xs font-bold font-display uppercase tracking-wide hidden xs:inline">
              LEAD Jingle
            </span>

            <div className="w-5 h-5 rounded-full bg-orange-500/30 flex items-center justify-center shrink-0">
              <Pause className="w-3 h-3 text-amber-200 fill-amber-200" />
            </div>
          </>
        ) : (
          <>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Play className="w-3.5 h-3.5 text-white fill-white translate-x-0.5" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-black font-display uppercase tracking-wider leading-none">
                Play Jingle 🎵
              </span>
              <span className="text-[9px] text-amber-100 font-medium mt-0.5 leading-none">
                Official Campaign Song
              </span>
            </div>
          </>
        )}
      </button>
    </aside>
  );
};
