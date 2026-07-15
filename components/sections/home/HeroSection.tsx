"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const showreelOpenRef = useRef(false);
  const audioEnabledRef = useRef(false);
  const heroVisibleRef = useRef(true);

  const [showreelOpen, setShowreelOpen] =
    useState(false);

  const [videoError, setVideoError] =
    useState(false);

  const [audioEnabled, setAudioEnabled] =
    useState(false);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "16%"],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.68, 1],
    [1, 1, 0],
  );

  // Scroll down = title zoom in
  // Scroll up = title zoom out
  const rawTitleScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 1],
    [1, 1.12, 1.65, 2.35],
  );

  const titleScale = useSpring(rawTitleScale, {
    stiffness: 105,
    damping: 25,
    mass: 0.5,
  });

  useEffect(() => {
    showreelOpenRef.current = showreelOpen;
  }, [showreelOpen]);

  useEffect(() => {
    audioEnabledRef.current = audioEnabled;
  }, [audioEnabled]);

  /*
   * Automatically mute the hero video when the Hero section
   * is no longer sufficiently visible in the viewport.
   */
  useEffect(() => {
    const section = sectionRef.current;
    const video = heroVideoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroIsVisible =
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.15;

        heroVisibleRef.current = heroIsVisible;

        if (!heroIsVisible) {
          video.muted = true;
          video.defaultMuted = true;

          audioEnabledRef.current = false;
          setAudioEnabled(false);
        }
      },
      {
        threshold: [0, 0.15, 0.5, 1],
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Desktop browsers may allow autoplay with sound.
   * Mobile browsers normally block sound until user interaction.
   * Sound is attempted first, then muted autoplay is used.
   */
  const startHeroVideo = useCallback(async () => {
    const video = heroVideoRef.current;

    if (
      !video ||
      showreelOpenRef.current ||
      !heroVisibleRef.current
    ) {
      return;
    }

    video.volume = 1;

    try {
      video.muted = false;
      video.defaultMuted = false;

      await video.play();

      audioEnabledRef.current = true;
      setAudioEnabled(true);
      setVideoError(false);
    } catch {
      video.muted = true;
      video.defaultMuted = true;

      try {
        await video.play();

        audioEnabledRef.current = false;
        setAudioEnabled(false);
        setVideoError(false);
      } catch (error) {
        setVideoError(true);

        console.error(
          "Hero video could not autoplay:",
          error,
        );
      }
    }
  }, []);

  /*
   * This runs from a user click, tap, or key press.
   * It unlocks audio on mobile devices.
   */
  const enableHeroAudio =
    useCallback(async () => {
      const video = heroVideoRef.current;

      if (
        !video ||
        showreelOpenRef.current ||
        !heroVisibleRef.current
      ) {
        return false;
      }

      video.muted = false;
      video.defaultMuted = false;
      video.volume = 1;

      try {
        await video.play();

        audioEnabledRef.current = true;
        setAudioEnabled(true);
        setVideoError(false);

        return true;
      } catch (error) {
        video.muted = true;
        video.defaultMuted = true;

        try {
          await video.play();
        } catch {
          setVideoError(true);
        }

        audioEnabledRef.current = false;
        setAudioEnabled(false);

        console.error(
          "Audio needs a direct user tap to start:",
          error,
        );

        return false;
      }
    }, []);

  const disableHeroAudio = useCallback(() => {
    const video = heroVideoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    audioEnabledRef.current = false;
    setAudioEnabled(false);
  }, []);

  /*
   * Attempts to unlock audio from the first user interaction.
   * This will only work while the Hero section is visible.
   */
  useEffect(() => {
    if (audioEnabled) return;

    let destroyed = false;

    const unlockFromInteraction = () => {
      if (
        destroyed ||
        showreelOpenRef.current ||
        !heroVisibleRef.current
      ) {
        return;
      }

      void enableHeroAudio();
    };

    window.addEventListener(
      "pointerup",
      unlockFromInteraction,
      true,
    );

    window.addEventListener(
      "touchend",
      unlockFromInteraction,
      {
        capture: true,
        passive: true,
      },
    );

    window.addEventListener(
      "keydown",
      unlockFromInteraction,
      true,
    );

    return () => {
      destroyed = true;

      window.removeEventListener(
        "pointerup",
        unlockFromInteraction,
        true,
      );

      window.removeEventListener(
        "touchend",
        unlockFromInteraction,
        true,
      );

      window.removeEventListener(
        "keydown",
        unlockFromInteraction,
        true,
      );
    };
  }, [audioEnabled, enableHeroAudio]);

  /*
   * Start the Hero video when video data is ready.
   */
  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) return;

    let destroyed = false;

    const beginPlayback = () => {
      if (!destroyed && heroVisibleRef.current) {
        void startHeroVideo();
      }
    };

    const handleVisibilityChange = () => {
      if (
        document.hidden ||
        showreelOpenRef.current ||
        !heroVisibleRef.current ||
        !video.paused
      ) {
        return;
      }

      video.muted = !audioEnabledRef.current;
      video.defaultMuted =
        !audioEnabledRef.current;

      void video.play().catch(() => {
        video.muted = true;
        video.defaultMuted = true;

        audioEnabledRef.current = false;
        setAudioEnabled(false);

        void video.play().catch(() => undefined);
      });
    };

    video.addEventListener(
      "canplay",
      beginPlayback,
      {
        once: true,
      },
    );

    video.addEventListener(
      "loadeddata",
      beginPlayback,
      {
        once: true,
      },
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    if (
      video.readyState >=
        HTMLMediaElement.HAVE_CURRENT_DATA &&
      heroVisibleRef.current
    ) {
      void startHeroVideo();
    }

    return () => {
      destroyed = true;

      video.removeEventListener(
        "canplay",
        beginPlayback,
      );

      video.removeEventListener(
        "loadeddata",
        beginPlayback,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [startHeroVideo]);

  // Lock page scrolling while showreel modal is open.
  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    if (showreelOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [showreelOpen]);

  const closeShowreel = useCallback(() => {
    setShowreelOpen(false);

    requestAnimationFrame(() => {
      const heroVideo = heroVideoRef.current;

      if (!heroVideo) return;

      /*
       * If the Hero section is not visible,
       * resume the background video only in muted mode.
       */
      if (!heroVisibleRef.current) {
        heroVideo.muted = true;
        heroVideo.defaultMuted = true;

        audioEnabledRef.current = false;
        setAudioEnabled(false);

        void heroVideo
          .play()
          .catch(() => undefined);

        return;
      }

      heroVideo.muted =
        !audioEnabledRef.current;

      heroVideo.defaultMuted =
        !audioEnabledRef.current;

      void heroVideo.play().catch(() => {
        heroVideo.muted = true;
        heroVideo.defaultMuted = true;

        audioEnabledRef.current = false;
        setAudioEnabled(false);

        void heroVideo.play().catch((error) => {
          console.error(
            "Hero video could not resume:",
            error,
          );
        });
      });
    });
  }, []);

  // Close showreel with Escape.
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        closeShowreel();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [closeShowreel]);

  const openShowreel = () => {
    const heroVideo = heroVideoRef.current;

    if (heroVideo) {
      heroVideo.pause();
    }

    setShowreelOpen(true);
  };

  const toggleHeroAudio = () => {
    if (audioEnabled) {
      disableHeroAudio();
      return;
    }

    void enableHeroAudio();
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="
          relative
          isolate
          flex
          min-h-screen
          min-h-[100dvh]
          overflow-hidden
          text-white
        "
      >
        {/* Background video */}

        <div className="pointer-events-none absolute inset-0 z-0">
          <video
            ref={heroVideoRef}
            autoPlay
            muted={!audioEnabled}
            loop
            playsInline
            preload="auto"
            poster="/images/jkayy-hero-poster.webp"
            className="h-full w-full object-cover object-center"
            aria-label="JKAYY live performance background video"
            onLoadedMetadata={(event) => {
              event.currentTarget.volume = 1;
            }}
            onError={() => {
              setVideoError(true);
            }}
            onPlaying={() => {
              setVideoError(false);
            }}
          >
            <source
              src="/videos/jkayy-hero.mp4"
              type="video/mp4"
            />

            Your browser does not support video
            playback.
          </video>
        </div>

        {/* Optional fallback when video fails */}

        {videoError && (
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              z-[1]
              bg-[url('/images/jkayy-hero-poster.webp')]
              bg-cover
              bg-center
            "
          />
        )}

        {/* Main content */}

        <motion.div
          style={{
            y: reduceMotion ? 0 : contentY,
            opacity: reduceMotion
              ? 1
              : contentOpacity,
          }}
          className="
            relative
            z-30
            mx-auto
            flex
            min-h-[100dvh]
            w-full
            max-w-[1600px]
            items-center
            px-4
            pb-24
            pt-28
            sm:px-6
            sm:pt-32
            md:px-10
            lg:px-12
          "
        >
          <div className="mx-auto w-full text-center lg:max-w-[1000px]">
            {/* Eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 flex items-center justify-center gap-3"
            >
              <span className="h-px w-7 bg-gradient-to-r from-transparent to-cyan-300/80" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.38em]
                  text-cyan-100/80
                  sm:text-[10px]
                  sm:tracking-[0.46em]
                "
              >
                Live Beyond Sound
              </span>

              <span className="h-px w-7 bg-gradient-to-l from-transparent to-purple-300/80" />
            </motion.div>

            {/* JKAYY title */}

            <motion.div
              style={{
                scale: reduceMotion
                  ? 1
                  : titleScale,
              }}
              className="jkayy-hero-title-shell"
            >
              <h1
                className="
                  jkayy-hero-title
                  font-logo
                  bg-gradient-to-b
                  from-white
                  via-[#eef4ff]
                  to-[#7c8796]
                  bg-clip-text
                  text-[clamp(4.7rem,15vw,11rem)]
                  font-bold
                  leading-[0.82]
                  tracking-[-0.075em]
                  text-transparent
                  drop-shadow-[0_0_45px_rgba(59,130,246,0.22)]
                "
                aria-label="JKAYY"
              >
                JKAYY
              </h1>
            </motion.div>

            {/* Roles */}

            <motion.p
              initial={{
                opacity: 0,
                y: 22,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.92,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.27em]
                text-white/75
                sm:text-xs
                sm:tracking-[0.4em]
                md:text-sm
              "
            >
              DJ

              <span className="mx-2 text-cyan-300">
                •
              </span>

              Producer

              <span className="mx-2 text-purple-300">
                •
              </span>

              Entrepreneur
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.05,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-9
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
                sm:gap-4
              "
            >
              <button
                type="button"
                onClick={openShowreel}
                className="
                  group
                  relative
                  flex
                  h-[52px]
                  min-w-[210px]
                  touch-manipulation
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-full
                  border
                  border-white/20
                  bg-white
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-black
                  transition-all
                  duration-500
                  hover:scale-[1.03]
                  hover:shadow-[0_0_45px_rgba(255,255,255,0.25)]
                  sm:h-14
                "
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 transition-transform duration-500 group-hover:translate-y-0" />

                <Play
                  size={15}
                  fill="currentColor"
                  className="relative z-10"
                />

                <span className="relative z-10">
                  Watch Showreel
                </span>
              </button>

              <Link
                href="#contact"
                className="
                  group
                  relative
                  flex
                  h-[52px]
                  min-w-[180px]
                  touch-manipulation
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-full
                  border
                  border-white/20
                  bg-black/20
                  px-7
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-cyan-300/60
                  hover:shadow-[0_0_40px_rgba(34,211,238,0.16)]
                  sm:h-14
                "
              >
                <span className="absolute inset-0 translate-y-full bg-white/[0.08] transition-transform duration-500 group-hover:translate-y-0" />

                <span className="relative z-10">
                  Book Event
                </span>

                <ArrowUpRight
                  size={16}
                  className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Audio control */}

        <motion.button
          type="button"
          onClick={toggleHeroAudio}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.1,
            duration: 0.45,
          }}
          className="
            absolute
            bottom-4
            left-4
            z-[90]
            flex
            h-11
            touch-manipulation
            items-center
            gap-2
            rounded-full
            border
            border-white/15
            bg-black/70
            px-4
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white
            shadow-[0_10px_35px_rgba(0,0,0,0.35)]
            backdrop-blur-md
            transition
            hover:border-white/40
            hover:bg-black/85
            sm:bottom-6
            sm:left-6
          "
          aria-label={
            audioEnabled
              ? "Mute hero video"
              : "Enable hero video sound"
          }
          aria-pressed={audioEnabled}
        >
          {audioEnabled ? (
            <Volume2 size={15} />
          ) : (
            <VolumeX size={15} />
          )}

          <span>
            {audioEnabled
              ? "Sound on"
              : "Tap for sound"}
          </span>
        </motion.button>

        {/* Scroll indicator */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.35,
            duration: 0.7,
          }}
          className="
            pointer-events-none
            absolute
            bottom-6
            left-1/2
            z-40
            hidden
            -translate-x-1/2
            flex-col
            items-center
            gap-2
            md:flex
          "
        >
          <span className="text-[8px] uppercase tracking-[0.35em] text-white/35">
            Scroll
          </span>

          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown
              size={14}
              className="text-white/50"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Showreel modal */}

      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeShowreel}
            className="
              fixed
              inset-0
              z-[500]
              flex
              items-center
              justify-center
              bg-black/90
              p-4
              backdrop-blur-2xl
              sm:p-8
            "
            role="dialog"
            aria-modal="true"
            aria-label="JKAYY showreel"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                w-full
                max-w-6xl
                overflow-hidden
                rounded-2xl
                border
                border-white/15
                bg-[#050505]
                shadow-[0_30px_120px_rgba(0,0,0,0.8)]
              "
            >
              <button
                type="button"
                onClick={closeShowreel}
                className="
                  absolute
                  right-3
                  top-3
                  z-20
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-black/60
                  text-white
                  backdrop-blur-xl
                  transition
                  hover:bg-white
                  hover:text-black
                  sm:right-5
                  sm:top-5
                "
                aria-label="Close showreel"
              >
                <X size={21} />
              </button>

              <div className="aspect-video w-full bg-black">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dl9zkv77&public_id=jkayyofficial_whwfpy"
                  title="JKAYY official showreel"
                  className="h-full w-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}