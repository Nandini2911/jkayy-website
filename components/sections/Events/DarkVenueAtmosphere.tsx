"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const premiumEase = [0.16, 1, 0.3, 1] as const;

const AUDIO_SOURCE = "/audio/events1.mp3";
const AUDIO_VOLUME = 0.32;

const changingLines = [
  "The room holds its breath",
  "Silence before the sound",
  "The night is about to begin",
  "Disturb the silence",
];

const particles = Array.from({ length: 16 }, (_, index) => ({
  left: `${(index * 41 + 9) % 96}%`,
  top: `${(index * 57 + 13) % 92}%`,
  size: index % 4 === 0 ? 2 : 1,
  duration: 7 + (index % 5) * 1.25,
  delay: (index % 8) * 0.28,
  x: 7 + (index % 4) * 4,
  y: 15 + (index % 5) * 5,
  desktopOnly: index > 9,
}));

const lasers = [
  {
    top: "20%",
    left: "-42%",
    width: "160vw",
    start: -10,
    end: 15,
    duration: 9,
  },
  {
    top: "48%",
    left: "-38%",
    width: "155vw",
    start: 13,
    end: -14,
    duration: 11,
  },
  {
    top: "76%",
    left: "-48%",
    width: "165vw",
    start: -17,
    end: 8,
    duration: 12.5,
  },
];

const pulseBars = Array.from({ length: 15 }, (_, index) => ({
  delay: Math.abs(7 - index) * 0.05,
  idleHeight: 4 + ((index * 5) % 8),
  activeHeight: 12 + ((index * 9) % 21),
}));

export default function DarkVenueAtmosphere() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const burstTimerRef = useRef<number | null>(null);
  const userMutedRef = useRef(false);
  const resumeAfterVisibilityRef = useRef(false);

  const shouldReduceMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  const [burstActive, setBurstActive] = useState(false);
  const [burstPoint, setBurstPoint] = useState({ x: 50, y: 44 });
  const [lineIndex, setLineIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [pageVisible, setPageVisible] = useState(true);

  const isInView = useInView(sectionRef, {
    amount: 0.08,
    margin: "100px 0px 100px 0px",
  });

  const animationsActive =
    isInView && pageVisible && !shouldReduceMotion;

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(44);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 95,
    damping: 26,
    mass: 0.35,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 95,
    damping: 26,
    mass: 0.35,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 30,
    mass: 0.24,
    restDelta: 0.001,
  });

  const contentOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.72, 0.9, 1],
    [1, 1, 0.76, 0],
  );

  const contentY = useTransform(
    smoothScrollProgress,
    [0, 0.74, 1],
    ["0vh", "0vh", "-12vh"],
  );

  const contentScale = useTransform(
    smoothScrollProgress,
    [0, 0.74, 1],
    [1, 1, 0.86],
  );

  const firstLineX = useTransform(
    smoothScrollProgress,
    [0, 0.74, 1],
    ["0vw", "0vw", "-18vw"],
  );

  const secondLineX = useTransform(
    smoothScrollProgress,
    [0, 0.74, 1],
    ["0vw", "0vw", "18vw"],
  );

  const ghostX = useTransform(
    smoothScrollProgress,
    [0, 1],
    ["-15vw", "15vw"],
  );

  const ghostOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.76, 1],
    [0.045, 0.032, 0],
  );

  const backgroundScale = useTransform(
    smoothScrollProgress,
    [0, 1],
    [1, 1.08],
  );

  const cursorGlow = useMotionTemplate`
    radial-gradient(
      min(520px, 64vw) circle at ${smoothPointerX}% ${smoothPointerY}%,
      rgba(255,255,255,0.17) 0%,
      rgba(190,210,255,0.07) 22%,
      transparent 68%
    )
  `;

  const enhancedMode = isHovered || burstActive;

  const startAudio = useCallback(
    async (showBlockedMessage = true) => {
      const audio = audioRef.current;

      if (!audio) return false;

      try {
        audio.loop = true;
        audio.muted = false;
        audio.volume = AUDIO_VOLUME;

        setAudioError("");

        await audio.play();

        userMutedRef.current = false;
        setSoundEnabled(true);
        setAutoplayBlocked(false);

        return true;
      } catch (error) {
        console.warn("Audible autoplay was blocked by the browser:", error);
        setSoundEnabled(false);
        setAutoplayBlocked(true);

        if (showBlockedMessage) {
          setAudioError("Tap once to enable sound.");
        }

        return false;
      }
    },
    [],
  );

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    userMutedRef.current = true;
    resumeAfterVisibilityRef.current = false;
    audio.pause();
    setSoundEnabled(false);
    setAutoplayBlocked(false);
    setAudioError("");
  }, []);

  const toggleSound = useCallback(() => {
    if (soundEnabled) {
      stopAudio();
      return;
    }

    userMutedRef.current = false;
    void startAudio(true);
  }, [soundEnabled, startAudio, stopAudio]);

  useEffect(() => {
    if (!animationsActive) return;

    const interval = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % changingLines.length);
    }, 2900);

    return () => window.clearInterval(interval);
  }, [animationsActive]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    let disposed = false;

    audio.loop = true;
    audio.muted = false;
    audio.volume = AUDIO_VOLUME;

    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", unlockAudio, true);
      window.removeEventListener("keydown", unlockAudio, true);
      window.removeEventListener("touchstart", unlockAudio, true);
    };

    const unlockAudio = () => {
      if (
        disposed ||
        userMutedRef.current ||
        !audio.paused
      ) {
        if (!audio.paused) removeUnlockListeners();
        return;
      }

      void startAudio(false).then((didStart) => {
        if (didStart && !disposed) removeUnlockListeners();
      });
    };

    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setPageVisible(visible);

      if (!visible) {
        resumeAfterVisibilityRef.current =
          !audio.paused && !userMutedRef.current;

        if (!audio.paused) audio.pause();
        return;
      }

      if (
        resumeAfterVisibilityRef.current &&
        !userMutedRef.current
      ) {
        resumeAfterVisibilityRef.current = false;
        void startAudio(false);
      }
    };

    const attemptImmediateAutoplay = async () => {
      if (disposed || userMutedRef.current) return;
      await startAudio(false);
    };

    // Attempt audible autoplay immediately when this Event page opens.
    // Browsers that allow it will start at once. Others use the first gesture fallback.
    void attemptImmediateAutoplay();

    audio.addEventListener("canplay", attemptImmediateAutoplay, {
      once: true,
    });

    window.addEventListener("pointerdown", unlockAudio, true);
    window.addEventListener("keydown", unlockAudio, true);
    window.addEventListener("touchstart", unlockAudio, {
      capture: true,
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      disposed = true;
      removeUnlockListeners();
      audio.removeEventListener("canplay", attemptImmediateAutoplay);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      audio.pause();
      audio.currentTime = 0;
    };
  }, [startAudio]);

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }

      if (burstTimerRef.current !== null) {
        window.clearTimeout(burstTimerRef.current);
      }
    };
  }, []);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const nextY = ((event.clientY - bounds.top) / bounds.height) * 100;

    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
    }

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      pointerX.set(nextX);
      pointerY.set(nextY);
    });
  };

  const triggerBurst = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    setBurstPoint({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });

    setBurstActive(true);

    if (burstTimerRef.current !== null) {
      window.clearTimeout(burstTimerRef.current);
    }

    burstTimerRef.current = window.setTimeout(() => {
      setBurstActive(false);
    }, 700);
  };

  return (
    <section
      ref={sectionRef}
      id="dark-venue"
      className="relative h-[155svh] w-full overflow-x-clip bg-black sm:h-[170svh] lg:h-[185svh] xl:h-[190svh]"
    >
      <audio
        ref={audioRef}
        src={AUDIO_SOURCE}
        autoPlay
        loop
        playsInline
        preload="metadata"
        onPlaying={() => {
          setSoundEnabled(true);
          setAutoplayBlocked(false);
          setAudioError("");
        }}
        onPause={() => setSoundEnabled(false)}
        onError={() => {
          setSoundEnabled(false);
          setAutoplayBlocked(false);
          setAudioError("Unable to load /audio/events1.mp3");
        }}
        className="hidden"
      />

      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          pointerX.set(50);
          pointerY.set(44);
          setIsHovered(false);
        }}
        className="sticky top-0 isolate h-[100svh] min-h-[520px] w-full touch-pan-y overflow-hidden bg-[#010101] text-white [transform:translateZ(0)]"
        style={{
          WebkitTapHighlightColor: "transparent",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#010101]" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transform-gpu"
          style={{
            scale: backgroundScale,
            background:
              "radial-gradient(circle at 50% 44%, rgba(42,46,60,0.7) 0%, rgba(15,17,24,0.52) 34%, #010101 80%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
          style={{ background: cursorGlow }}
        />

        {/* Lightweight moving spotlights */}
        <motion.div
          aria-hidden="true"
          animate={
            animationsActive
              ? { x: ["-125vw", "125vw"], opacity: [0, 0.42, 0] }
              : { x: "-125vw", opacity: 0 }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute left-0 top-[-16%] z-[3] h-[132vh] w-[15vw] -skew-x-[20deg] transform-gpu bg-gradient-to-r from-transparent via-white/15 to-transparent blur-[28px] sm:w-[10vw] sm:blur-[34px]"
        />

        <motion.div
          aria-hidden="true"
          animate={
            animationsActive
              ? { x: ["115vw", "-115vw"], opacity: [0, 0.24, 0] }
              : { x: "115vw", opacity: 0 }
          }
          transition={{
            duration: 13,
            delay: 1.4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute left-0 top-[-5%] z-[3] hidden h-[120vh] w-[8vw] skew-x-[17deg] transform-gpu bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[36px] sm:block"
        />

        {/* Central atmospheric glow */}
        <motion.div
          aria-hidden="true"
          animate={
            animationsActive
              ? {
                  x: "-50%",
                  y: "-50%",
                  scale: enhancedMode ? [1, 1.12, 1] : [0.98, 1.04, 0.98],
                  opacity: enhancedMode ? [0.3, 0.55, 0.3] : [0.18, 0.36, 0.18],
                }
              : { x: "-50%", y: "-50%", scale: 1, opacity: 0.2 }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-[44%] z-[3] h-[72vw] max-h-[680px] w-[72vw] max-w-[680px] rounded-full transform-gpu bg-[radial-gradient(circle,rgba(230,236,255,0.24),rgba(255,255,255,0.055)_38%,transparent_72%)] blur-[50px] sm:blur-[68px]"
        />

        <motion.div
          aria-hidden="true"
          animate={
            animationsActive
              ? {
                  x: "-50%",
                  y: "-50%",
                  rotate: 360,
                  scale: enhancedMode ? [1, 1.08, 1] : [0.98, 1.03, 0.98],
                  opacity: enhancedMode ? [0.25, 0.5, 0.25] : [0.12, 0.28, 0.12],
                }
              : { x: "-50%", y: "-50%", opacity: 0.14 }
          }
          transition={{
            rotate: { duration: 28, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute left-1/2 top-[44%] z-[4] h-[30vw] min-h-[210px] max-h-[500px] w-[82vw] min-w-[390px] max-w-[1040px] rounded-[50%] border border-white/15 transform-gpu sm:w-[72vw]"
          style={{
            boxShadow:
              "0 0 30px rgba(195,214,255,0.08), inset 0 0 30px rgba(195,214,255,0.05)",
          }}
        />

        {/* Soft smoke — only two layers */}
        <motion.div
          aria-hidden="true"
          animate={
            animationsActive
              ? {
                  x: ["-8%", "8%", "-8%"],
                  y: ["5%", "-5%", "5%"],
                  scale: [0.96, 1.08, 0.96],
                  opacity: [0.08, 0.2, 0.08],
                }
              : { opacity: 0.09 }
          }
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-[-24%] left-[-35%] z-[5] h-[62vh] w-[120vw] rounded-[50%] bg-white/[0.075] transform-gpu blur-[58px] sm:left-[-18%] sm:w-[82vw] sm:blur-[74px]"
        />

        <motion.div
          aria-hidden="true"
          animate={
            animationsActive
              ? {
                  x: ["9%", "-8%", "9%"],
                  y: ["3%", "-7%", "3%"],
                  scale: [1.04, 0.96, 1.04],
                  opacity: [0.07, 0.18, 0.07],
                }
              : { opacity: 0.08 }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-[-26%] right-[-38%] z-[5] h-[66vh] w-[125vw] rounded-[50%] bg-[#dce7ff]/[0.06] transform-gpu blur-[62px] sm:right-[-20%] sm:w-[86vw] sm:blur-[78px]"
        />

        {/* Three lightweight lasers */}
        <div className="pointer-events-none absolute inset-0 z-[6]">
          {lasers.map((laser, index) => (
            <motion.span
              key={laser.top}
              animate={
                animationsActive
                  ? {
                      rotate: [laser.start, laser.end, laser.start],
                      x: ["-7%", "9%", "-7%"],
                      opacity: enhancedMode
                        ? [0.06, 0.68, 0.06]
                        : [0.03, 0.38, 0.03],
                    }
                  : { opacity: 0.03 }
              }
              transition={{
                duration: laser.duration,
                delay: index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute block h-px origin-left transform-gpu"
              style={{
                top: laser.top,
                left: laser.left,
                width: laser.width,
                background:
                  "linear-gradient(90deg,transparent,rgba(205,220,255,0.12),rgba(255,255,255,0.75),rgba(205,220,255,0.12),transparent)",
                boxShadow: "0 0 10px rgba(210,225,255,0.35)",
              }}
            />
          ))}
        </div>

        {/* Limited particles to prevent mobile frame drops */}
        <div className="pointer-events-none absolute inset-0 z-[7]">
          {particles.map((particle, index) => (
            <motion.span
              key={index}
              animate={
                animationsActive
                  ? {
                      x: [0, particle.x, -particle.x / 2, 0],
                      y: [8, -particle.y, -particle.y / 2, 8],
                      opacity: [0.03, 0.48, 0.08, 0.03],
                    }
                  : { opacity: 0.05 }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={
                particle.desktopOnly
                  ? "absolute hidden rounded-full bg-white md:block"
                  : "absolute rounded-full bg-white"
              }
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                boxShadow:
                  particle.size === 2
                    ? "0 0 8px rgba(240,245,255,0.7)"
                    : "none",
              }}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[8] bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.7)_100%)]"
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[44%] z-[9] whitespace-nowrap text-[clamp(8rem,36vw,34rem)] font-medium italic leading-none tracking-[-0.1em] text-white transform-gpu"
          style={{
            x: ghostX,
            y: "-50%",
            opacity: ghostOpacity,
            fontFamily: luxuryFont.style.fontFamily,
            textShadow: "0 0 70px rgba(255,255,255,0.12)",
          }}
        >
          JKAYY
        </motion.div>

        <AnimatePresence>
          {burstActive && !shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0.1, opacity: 0.7, x: "-50%", y: "-50%" }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pointer-events-none absolute z-[19] h-[28vw] min-h-[150px] max-h-[360px] w-[28vw] min-w-[150px] max-w-[360px] rounded-full border border-white/55 bg-white/[0.025] transform-gpu"
              style={{
                left: `${burstPoint.x}%`,
                top: `${burstPoint.y}%`,
                boxShadow: "0 0 45px rgba(255,255,255,0.38)",
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="relative z-20 flex h-[100svh] min-h-[520px] w-full items-center justify-center px-4 pb-[calc(5.25rem+env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))] text-center sm:px-7 sm:pb-24 sm:pt-24 lg:px-12"
          style={{
            y: contentY,
            scale: contentScale,
            opacity: contentOpacity,
          }}
        >
          <div className="mx-auto w-full max-w-[1500px]">
            <div className="relative mx-auto mb-4 h-5 max-w-[94vw] overflow-hidden sm:mb-7 sm:h-6">
              <AnimatePresence initial={false} mode="wait">
                <motion.p
                  key={lineIndex}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.34, ease: premiumEase }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[7px] font-medium uppercase tracking-[0.25em] text-white/55 sm:text-[9px] sm:tracking-[0.42em] lg:text-[10px]"
                  style={{ fontFamily: cleanFont.style.fontFamily }}
                >
                  {changingLines[lineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setIsHovered(true);
              }}
              onPointerLeave={() => setIsHovered(false)}
              onPointerDown={(event) => {
                if (!soundEnabled && !userMutedRef.current) {
                  void startAudio(false);
                }
                triggerBurst(event);
              }}
              animate={
                animationsActive
                  ? { y: enhancedMode ? [0, -5, 0] : [0, -3, 0] }
                  : { y: 0 }
              }
              transition={{
                duration: enhancedMode ? 3 : 5.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="cursor-crosshair select-none transform-gpu"
            >
              <motion.h2
                style={{
                  x: firstLineX,
                  fontFamily: luxuryFont.style.fontFamily,
                  textShadow: enhancedMode
                    ? "0 0 34px rgba(220,233,255,0.34), 0 18px 70px rgba(255,255,255,0.15)"
                    : "0 14px 52px rgba(255,255,255,0.1)",
                }}
                className="whitespace-nowrap text-[clamp(3rem,13.5vw,13rem)] font-medium uppercase leading-[0.72] tracking-[-0.062em] text-white landscape:text-[clamp(2.7rem,9vw,7.5rem)]"
              >
                Feel The
              </motion.h2>

              <motion.h3
                style={{
                  x: secondLineX,
                  fontFamily: luxuryFont.style.fontFamily,
                }}
                className="mt-[0.08em] whitespace-nowrap bg-gradient-to-b from-white via-[#e8edfa] to-white/35 bg-clip-text pb-[0.14em] text-[clamp(2.35rem,10.7vw,13.2rem)] font-medium italic leading-[0.7] tracking-[-0.068em] text-transparent landscape:text-[clamp(2.15rem,7.2vw,6.6rem)]"
              >
                Anticipation
              </motion.h3>
            </motion.div>

            <div className="mx-auto mt-5 flex max-w-xl flex-col items-center sm:mt-8 [@media(max-height:650px)]:mt-4">
              <p
                className="max-w-[min(88vw,31rem)] text-[11px] font-normal leading-5 tracking-[0.015em] text-white/46 sm:text-[13px] sm:leading-6 lg:text-[14px] lg:leading-7 [@media(max-height:610px)]:hidden"
                style={{ fontFamily: cleanFont.style.fontFamily }}
              >
                Darkness, movement and light building the atmosphere before the
                first sound takes over.
              </p>

              <div className="mt-5 flex flex-col items-center gap-2 sm:mt-7 sm:gap-3 [@media(max-height:610px)]:mt-3">
                <div className="flex h-8 items-center justify-center gap-[3px] sm:h-10 sm:gap-1">
                  {pulseBars.map((bar, index) => (
                    <motion.span
                      key={index}
                      animate={
                        animationsActive
                          ? {
                              height: enhancedMode
                                ? [bar.idleHeight, bar.activeHeight, bar.idleHeight]
                                : [
                                    bar.idleHeight,
                                    Math.max(8, bar.activeHeight * 0.55),
                                    bar.idleHeight,
                                  ],
                              opacity: enhancedMode
                                ? [0.28, 0.9, 0.28]
                                : [0.16, 0.5, 0.16],
                            }
                          : { height: bar.idleHeight, opacity: 0.2 }
                      }
                      transition={{
                        duration: enhancedMode ? 0.9 : 1.6,
                        delay: bar.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-px rounded-full bg-white/80 sm:w-[2px]"
                    />
                  ))}
                </div>

                <span
                  className="whitespace-nowrap text-[6px] font-medium uppercase tracking-[0.28em] text-white/40 sm:text-[7px] sm:tracking-[0.4em] lg:text-[8px]"
                  style={{ fontFamily: cleanFont.style.fontFamily }}
                >
                  {enhancedMode ? "The first beat is close" : "Hover · Move · Tap"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Autoplay fallback shown only when the browser blocks audible autoplay */}
        <AnimatePresence>
          {autoplayBlocked && !userMutedRef.current && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              onClick={() => void startAudio(true)}
              className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-1/2 z-[9998] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-black/75 px-4 py-2.5 text-[8px] font-medium uppercase tracking-[0.24em] text-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.48)] backdrop-blur-md sm:bottom-24 sm:text-[9px]"
              style={{ fontFamily: cleanFont.style.fontFamily }}
            >
              Tap to enable sound
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {audioError && !autoplayBlocked && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-[9998] max-w-[240px] rounded-lg border border-white/15 bg-black/75 px-3 py-2 text-right text-[9px] leading-4 text-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:bottom-24 sm:right-7"
              style={{ fontFamily: cleanFont.style.fontFamily }}
            >
              {audioError}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-label={soundEnabled ? "Mute event page sound" : "Enable event page sound"}
          aria-pressed={soundEnabled}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={toggleSound}
          initial={false}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[9999] flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 text-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-black/80 sm:bottom-7 sm:right-7 sm:h-11 sm:px-4"
          style={{
            fontFamily: cleanFont.style.fontFamily,
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span className="flex h-4 w-5 items-center justify-center gap-[2px]">
            {[0, 1, 2, 3].map((bar) => (
              <motion.span
                key={bar}
                animate={
                  soundEnabled && pageVisible && !shouldReduceMotion
                    ? {
                        height: [4, 13 - Math.abs(1.5 - bar) * 3, 5, 10, 4],
                        opacity: [0.45, 1, 0.6, 0.9, 0.45],
                      }
                    : { height: 3, opacity: 0.4 }
                }
                transition={{
                  duration: 0.85,
                  delay: bar * 0.07,
                  repeat:
                    soundEnabled && pageVisible && !shouldReduceMotion
                      ? Infinity
                      : 0,
                  ease: "easeInOut",
                }}
                className="w-px rounded-full bg-white"
              />
            ))}
          </span>

          <span className="text-[7px] font-medium uppercase tracking-[0.22em] sm:text-[8px]">
            {soundEnabled ? "Sound on" : "Sound off"}
          </span>
        </motion.button>

        <div className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-7 sm:gap-3">
          <p
            className="text-[6px] font-medium uppercase tracking-[0.32em] text-white/34 sm:text-[7px]"
            style={{ fontFamily: cleanFont.style.fontFamily }}
          >
            Enter
          </p>

          <div className="relative h-8 w-px overflow-hidden bg-white/15 sm:h-11">
            <motion.span
              animate={
                animationsActive
                  ? { y: ["-150%", "250%"], opacity: [0, 0.85, 0] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-40 h-px w-full bg-white/[0.06]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-white/10 via-white/90 to-white/10 shadow-[0_0_10px_rgba(255,255,255,0.55)]"
            style={{ scaleX: smoothScrollProgress }}
          />
        </div>
      </div>
    </section>
  );
}