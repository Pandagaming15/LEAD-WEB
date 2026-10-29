
import React, { useEffect, useRef } from 'react';
import { CAMPAIGN_SETTINGS } from '../data/campaignData';

/**
 * Campaign Jingle Player
 *
 * Performance improvements:
 * - Starts preloading the real campaign audio immediately.
 * - Does not wait for images, animations, or other page assets.
 * - Uses the browser's native audio buffering.
 * - Retries playback after user interaction if autoplay is blocked.
 * - Does not play synthesized music as a replacement for the real jingle.
 * - Pauses when the page is hidden or the browser loses focus.
 * - Resumes when the page becomes visible again.
 * - Cleans up audio and event listeners when unmounted.
 */
export const CampaignJinglePlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldPlayRef = useRef<boolean>(true);
  const isPlayingRef = useRef<boolean>(false);
  const isStartingRef = useRef<boolean>(false);

  useEffect(() => {
    const TARGET_VOLUME = 0.32;

    // ---------------------------------------------------------
    // 1. CREATE AND PRELOAD THE CAMPAIGN JINGLE
    // ---------------------------------------------------------

    const audio = new Audio();

    audioRef.current = audio;

    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audio.autoplay = false;

    // Use the existing audio path from campaignData.ts.
    // Prefer a local file in public/assets/ for best reliability.
    audio.src = CAMPAIGN_SETTINGS.jingleAudioSrc;

    // Ask the browser to start downloading the audio immediately.
    // This does not block rendering of the campaign page.
    audio.load();

    // ---------------------------------------------------------
    // 2. REMOVE GESTURE LISTENERS AFTER SUCCESSFUL PLAYBACK
    // ---------------------------------------------------------

    const removeGestureListeners = () => {
      window.removeEventListener('pointerdown', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };

    // ---------------------------------------------------------
    // 3. START THE REAL CAMPAIGN JINGLE
    // ---------------------------------------------------------

    const startAudio = async () => {
      if (!audioRef.current) return;

      if (
        document.hidden ||
        document.visibilityState === 'hidden'
      ) {
        return;
      }

      if (isStartingRef.current || !audio.paused) {
        return;
      }

      shouldPlayRef.current = true;
      isStartingRef.current = true;

      try {
        // Playback uses the actual MP3, never the synthesized fallback.
        await audio.play();

        isPlayingRef.current = true;
        removeGestureListeners();
      } catch {
        // Autoplay may be blocked by the browser.
        // Keep the gesture listeners so playback can be retried.
        isPlayingRef.current = false;
      } finally {
        isStartingRef.current = false;
      }
    };

    // ---------------------------------------------------------
    // 4. PAUSE AUDIO WHEN THE PAGE IS NOT ACTIVE
    // ---------------------------------------------------------

    const stopAudio = () => {
      if (!audio.paused) {
        audio.pause();
      }

      isPlayingRef.current = false;
    };

    // ---------------------------------------------------------
    // 5. RESUME AUDIO WHEN THE PAGE BECOMES ACTIVE
    // ---------------------------------------------------------

    const resumeAudioIfVisible = () => {
      if (
        document.hidden ||
        document.visibilityState === 'hidden'
      ) {
        stopAudio();
        return;
      }

      if (shouldPlayRef.current && audio.paused) {
        void startAudio();
      }
    };

    // ---------------------------------------------------------
    // 6. RETRY WHEN THE AUDIO BECOMES READY
    // ---------------------------------------------------------

    const handleCanPlay = () => {
      if (
        shouldPlayRef.current &&
        !document.hidden &&
        audio.paused
      ) {
        void startAudio();
      }
    };

    const handleAudioPlaying = () => {
      isPlayingRef.current = true;
      isStartingRef.current = false;
      removeGestureListeners();
    };

    const handleAudioPause = () => {
      isPlayingRef.current = false;
    };

    const handleAudioError = () => {
      isPlayingRef.current = false;

      // Do not generate replacement music.
      // Keep the user-gesture retry available if the file fails.
      // Verify the source URL if the audio cannot be loaded.
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('playing', handleAudioPlaying);
    audio.addEventListener('pause', handleAudioPause);
    audio.addEventListener('error', handleAudioError);

    // ---------------------------------------------------------
    // 7. HANDLE AUTOPLAY RESTRICTIONS ON MOBILE BROWSERS
    // ---------------------------------------------------------

    const handleFirstUserGesture = () => {
      if (
        !document.hidden &&
        shouldPlayRef.current
      ) {
        void startAudio();
      }
    };

    window.addEventListener(
      'pointerdown',
      handleFirstUserGesture,
      { passive: true }
    );

    window.addEventListener(
      'touchstart',
      handleFirstUserGesture,
      { passive: true }
    );

    window.addEventListener(
      'click',
      handleFirstUserGesture,
      { passive: true }
    );

    window.addEventListener(
      'keydown',
      handleFirstUserGesture
    );

    // ---------------------------------------------------------
    // 8. PAGE VISIBILITY AND MOBILE LIFECYCLE
    // ---------------------------------------------------------

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAudio();
      } else {
        resumeAudioIfVisible();
      }
    };

    const handlePageHide = () => {
      shouldPlayRef.current = false;
      stopAudio();
    };

    const handlePageShow = () => {
      shouldPlayRef.current = true;
      resumeAudioIfVisible();
    };

    const handleWindowBlur = () => {
      stopAudio();
    };

    const handleWindowFocus = () => {
      resumeAudioIfVisible();
    };

    const handleBackNavigation = () => {
      stopAudio();
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    window.addEventListener(
      'pagehide',
      handlePageHide
    );

    window.addEventListener(
      'pageshow',
      handlePageShow
    );

    window.addEventListener(
      'blur',
      handleWindowBlur
    );

    window.addEventListener(
      'focus',
      handleWindowFocus
    );

    window.addEventListener(
      'popstate',
      handleBackNavigation
    );

    // ---------------------------------------------------------
    // 9. ATTEMPT AUTOPLAY IMMEDIATELY
    // ---------------------------------------------------------

    if (!document.hidden) {
      void startAudio();
    }

    // ---------------------------------------------------------
    // 10. CLEANUP
    // ---------------------------------------------------------

    return () => {
      shouldPlayRef.current = false;

      removeGestureListeners();

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );

      window.removeEventListener(
        'pagehide',
        handlePageHide
      );

      window.removeEventListener(
        'pageshow',
        handlePageShow
      );

      window.removeEventListener(
        'blur',
        handleWindowBlur
      );

      window.removeEventListener(
        'focus',
        handleWindowFocus
      );

      window.removeEventListener(
        'popstate',
        handleBackNavigation
      );

      audio.removeEventListener(
        'canplay',
        handleCanPlay
      );

      audio.removeEventListener(
        'playing',
        handleAudioPlaying
      );

      audio.removeEventListener(
        'pause',
        handleAudioPause
      );

      audio.removeEventListener(
        'error',
        handleAudioError
      );

      audio.pause();
      audio.removeAttribute('src');
      audio.load();

      audioRef.current = null;
      isPlayingRef.current = false;
      isStartingRef.current = false;
    };
  }, []);

  // Invisible background player; no UI is rendered.
  return null;
};
