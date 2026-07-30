"use client";

import { Volume2, VolumeX } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const HERO_VIDEO_URL =
  "https://cdn.shopify.com/videos/c/o/v/18e7631a877343db9e558534585a1b5e.mp4";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroVisibleRef = useRef(true);
  const audioEnabledRef = useRef(false);
  const initialSoundAttemptedRef = useRef(false);

  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.45,
    restDelta: 0.001,
  });

  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "14%"]);

  const contentOpacity = useTransform(smoothProgress, [0, 0.72, 1], [1, 1, 0]);

  const titleScale = useTransform(
    smoothProgress,
    [0, 0.2, 0.55, 1],
    [1, 1.1, 1.58, 2.25],
  );

  const updateAudioState = useCallback((enabled: boolean) => {
    audioEnabledRef.current = enabled;
    setAudioEnabled(enabled);
  }, []);

  const playMuted = useCallback(async () => {
    const video = heroVideoRef.current;

    if (!video || document.hidden || !heroVisibleRef.current) {
      return false;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 1;

    try {
      await video.play();
      updateAudioState(false);
      setVideoError(false);
      return true;
    } catch {
      setVideoError(true);
      return false;
    }
  }, [updateAudioState]);

  const tryPlayWithSound = useCallback(async () => {
    const video = heroVideoRef.current;

    if (!video || document.hidden || !heroVisibleRef.current) {
      return false;
    }

    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;

    try {
      await video.play();
      updateAudioState(true);
      setVideoError(false);
      return true;
    } catch {
      video.muted = true;
      video.defaultMuted = true;
      updateAudioState(false);
      return false;
    }
  }, [updateAudioState]);

  const startHeroVideo = useCallback(async () => {
    if (!initialSoundAttemptedRef.current) {
      initialSoundAttemptedRef.current = true;

      const soundStarted = await tryPlayWithSound();

      if (soundStarted) return;
    }

    await playMuted();
  }, [playMuted, tryPlayWithSound]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = heroVideoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible =
          entry.isIntersecting && entry.intersectionRatio > 0.01;

        heroVisibleRef.current = isVisible;

        if (isVisible) {
          void startHeroVideo();
          return;
        }

        video.pause();
        video.muted = true;
        video.defaultMuted = true;
        updateAudioState(false);
      },
      {
        threshold: [0, 0.01],
        rootMargin: "100px 0px",
      },
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        return;
      }

      if (heroVisibleRef.current) {
        void startHeroVideo();
      }
    };

    observer.observe(section);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    void startHeroVideo();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startHeroVideo, updateAudioState]);

  /*
   * Browsers usually block sound on a completely fresh page load.
   * This lightweight listener enables sound immediately after the
   * first real click, tap or keyboard interaction while Hero is visible.
   */
  useEffect(() => {
    if (audioEnabled) return;

    const unlockSound = () => {
      if (
        document.hidden ||
        !heroVisibleRef.current ||
        audioEnabledRef.current
      ) {
        return;
      }

      void tryPlayWithSound().then((started) => {
        if (!started) {
          void playMuted();
        }
      });
    };

    window.addEventListener("pointerdown", unlockSound, true);
    window.addEventListener("keydown", unlockSound, true);

    return () => {
      window.removeEventListener("pointerdown", unlockSound, true);
      window.removeEventListener("keydown", unlockSound, true);
    };
  }, [audioEnabled, playMuted, tryPlayWithSound]);

  const toggleHeroAudio = useCallback(async () => {
    const video = heroVideoRef.current;

    if (!video) return;

    if (audioEnabledRef.current) {
      video.muted = true;
      video.defaultMuted = true;
      updateAudioState(false);
      return;
    }

    const started = await tryPlayWithSound();

    if (!started) {
      await playMuted();
    }
  }, [playMuted, tryPlayWithSound, updateAudioState]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100dvh] overflow-hidden text-white"
    >
      {/* Background video */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black">
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          poster="/images/about2.webp"
          className="h-full w-full object-cover object-center"
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => {
            void startHeroVideo();
          }}
          onLoadedData={() => {
            void startHeroVideo();
          }}
          onError={() => {
            setVideoError(true);
          }}
          onPlaying={() => {
            setVideoError(false);
          }}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Image fallback only when video fails */}
      {videoError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-[url('/images/about2.webp')] bg-cover bg-center"
        />
      )}

      {/* Main content */}
      <motion.div
        style={{
          y: reduceMotion ? 0 : contentY,
          opacity: reduceMotion ? 1 : contentOpacity,
        }}
        className="relative z-30 mx-auto flex min-h-[100dvh] w-full max-w-[1600px] items-center px-4 pb-24 pt-28 sm:px-6 sm:pt-32 md:px-10 lg:px-12"
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
                  scale: 0.985,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.03,
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto w-full text-center lg:max-w-[1000px]"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-gradient-to-r from-transparent to-cyan-300/80" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.38em] text-cyan-100/80 sm:text-[10px] sm:tracking-[0.46em]">
              Live Beyond Sound
            </span>

            <span className="h-px w-7 bg-gradient-to-l from-transparent to-purple-300/80" />
          </div>

          <motion.div
            style={{
              scale: reduceMotion ? 1 : titleScale,
              transformOrigin: "center center",
            }}
          >
            <h1 className="font-logo inline-block overflow-visible bg-gradient-to-b from-white via-[#eef4ff] to-[#7c8796] bg-clip-text pb-[0.14em] text-[clamp(4.7rem,15vw,11rem)] font-bold leading-[0.96] tracking-[-0.075em] text-transparent">
              JKAYY
            </h1>
          </motion.div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.27em] text-white/75 sm:text-xs sm:tracking-[0.4em] md:text-sm">
            DJ
            <span className="mx-2 text-cyan-300">•</span>
            Producer
            <span className="mx-2 text-purple-300">•</span>
            Entrepreneur
          </p>
        </motion.div>
      </motion.div>

      {/* Audio control */}
      <button
        type="button"
        onClick={() => {
          void toggleHeroAudio();
        }}
        className="absolute bottom-4 left-4 z-[90] flex h-11 touch-manipulation items-center gap-2 rounded-full border border-white/15 bg-black/80 px-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-colors duration-300 hover:border-white/40 hover:bg-black sm:bottom-6 sm:left-6"
        aria-label={
          audioEnabled ? "Mute hero video" : "Enable hero video sound"
        }
        aria-pressed={audioEnabled}
      >
        {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}

      </button>
    </section>
  );
}