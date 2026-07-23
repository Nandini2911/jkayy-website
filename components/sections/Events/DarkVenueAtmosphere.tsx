"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const premiumEase = [0.16, 1, 0.3, 1] as const;

const firstTitle = "FEEL THE";
const secondTitle = "ANTICIPATION";

const SECTION_AUDIO_SRC = "https://audio.com/embed/v2/audio/1871352278643625?theme=light&layout=fixed&cover=true&footer=true&author=true&watermark=true";
const SECTION_AUDIO_VOLUME = 0.32;

const changingLines = [
  "The room holds its breath",
  "Silence before the sound",
  "The night is about to begin",
  "Disturb the silence",
];

const lasers = [
  {
    top: "13%",
    left: "-42%",
    width: "158vw",
    start: -9,
    end: 21,
    duration: 7.2,
    delay: 0,
    className: "absolute block h-px origin-left",
  },
  {
    top: "28%",
    left: "5%",
    width: "148vw",
    start: 15,
    end: -18,
    duration: 8.8,
    delay: 0.7,
    className: "absolute block h-px origin-left",
  },
  {
    top: "49%",
    left: "-48%",
    width: "166vw",
    start: 1,
    end: 17,
    duration: 10.5,
    delay: 1.1,
    className: "absolute block h-px origin-left",
  },
  {
    top: "69%",
    left: "3%",
    width: "150vw",
    start: -21,
    end: -4,
    duration: 8.1,
    delay: 0.35,
    className: "absolute block h-px origin-left",
  },
  {
    top: "83%",
    left: "-32%",
    width: "148vw",
    start: 13,
    end: -10,
    duration: 11.4,
    delay: 1.5,
    className: "absolute hidden h-px origin-left sm:block",
  },
];

const dustParticles = Array.from({ length: 32 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 53 + 11) % 100}%`,
  size: 1 + (index % 3),
  duration: 7 + (index % 7),
  delay: (index % 10) * 0.32,
  x: 8 + (index % 5) * 5,
  y: 18 + (index % 7) * 5,
  desktopOnly: index > 19,
}));

const glowingParticles = Array.from({ length: 10 }, (_, index) => ({
  left: `${(index * 43 + 9) % 96}%`,
  top: `${(index * 29 + 7) % 88}%`,
  size: 2 + (index % 2),
  duration: 6 + (index % 4),
  delay: (index % 6) * 0.48,
  desktopOnly: index > 6,
}));

const pulseBars = Array.from({ length: 19 }, (_, index) => ({
  delay: Math.abs(9 - index) * 0.045,
  idleHeight: 4 + ((index * 7) % 12),
  activeHeight: 12 + ((index * 11) % 25),
}));

export default function DarkVenueAtmosphere() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const burstTimeoutRef = useRef<number | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFadeFrameRef = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [burstActive, setBurstActive] = useState(false);
  const [burstPoint, setBurstPoint] = useState({ x: 50, y: 44 });
  const [lineIndex, setLineIndex] = useState(0);

  const isInView = useInView(sectionRef, {
    margin: "240px 0px 240px 0px",
  });

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(45);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 82,
    damping: 24,
    mass: 0.38,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 82,
    damping: 24,
    mass: 0.38,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 28,
    mass: 0.18,
    restDelta: 0.0005,
  });

  const cancelAudioFade = () => {
    if (audioFadeFrameRef.current !== null) {
      window.cancelAnimationFrame(audioFadeFrameRef.current);
      audioFadeFrameRef.current = null;
    }
  };

  const fadeAudio = (
    targetVolume: number,
    duration = 500,
    pauseAfterFade = false,
  ) => {
    const audio = audioRef.current;

    if (!audio) return;

    cancelAudioFade();

    const startVolume = audio.volume;
    const volumeDifference = targetVolume - startVolume;
    const startTime = performance.now();

    const updateVolume = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1,
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      audio.volume = Math.min(
        1,
        Math.max(
          0,
          startVolume +
            volumeDifference * easedProgress,
        ),
      );

      if (progress < 1) {
        audioFadeFrameRef.current =
          window.requestAnimationFrame(updateVolume);
        return;
      }

      audioFadeFrameRef.current = null;

      if (pauseAfterFade) {
        audio.pause();
      }
    };

    audioFadeFrameRef.current =
      window.requestAnimationFrame(updateVolume);
  };

  const startAudio = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0;

    try {
      await audio.play();
      setSoundEnabled(true);
      fadeAudio(SECTION_AUDIO_VOLUME, 650);
    } catch (error) {
      console.error(
        "The section audio could not start. Check the audio file path and interact with the page first.",
        error,
      );
    }
  };

  const stopAudio = () => {
    setSoundEnabled(false);
    fadeAudio(0, 420, true);
  };

  const toggleSound = () => {
    if (soundEnabled) {
      stopAudio();
      return;
    }

    void startAudio();
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLineIndex(
        (current) =>
          (current + 1) % changingLines.length,
      );
    }, 2700);

    return () => {
      window.clearInterval(interval);

      if (burstTimeoutRef.current !== null) {
        window.clearTimeout(burstTimeoutRef.current);
      }

      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(
          pointerFrameRef.current,
        );
      }

      cancelAudioFade();

      const audio = audioRef.current;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !soundEnabled) return;

    if (isInView) {
      audio.volume = 0;

      void audio
        .play()
        .then(() => {
          fadeAudio(SECTION_AUDIO_VOLUME, 600);
        })
        .catch((error) => {
          console.error(
            "The section audio could not resume.",
            error,
          );
        });

      return;
    }

    fadeAudio(0, 450, true);
  }, [isInView, soundEnabled]);

  const triggerBurst = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    setBurstPoint({
      x: (event.clientX / window.innerWidth) * 100,
      y: (event.clientY / window.innerHeight) * 100,
    });

    setBurstActive(true);

    if (burstTimeoutRef.current !== null) {
      window.clearTimeout(burstTimeoutRef.current);
    }

    burstTimeoutRef.current = window.setTimeout(() => {
      setBurstActive(false);
    }, 900);
  };

  const contentOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.7, 0.84, 1],
    [1, 1, 0.88, 0],
  );

  const contentY = useTransform(
    smoothScrollProgress,
    [0, 0.7, 1],
    ["0vh", "0vh", "-16vh"],
  );

  const contentScale = useTransform(
    smoothScrollProgress,
    [0, 0.72, 1],
    [1, 1, 0.78],
  );

  const firstLineX = useTransform(
    smoothScrollProgress,
    [0, 0.72, 1],
    ["0vw", "0vw", "-22vw"],
  );

  const secondLineX = useTransform(
    smoothScrollProgress,
    [0, 0.72, 1],
    ["0vw", "0vw", "22vw"],
  );

  const firstLineRotate = useTransform(
    smoothScrollProgress,
    [0.72, 1],
    [0, -6],
  );

  const secondLineRotate = useTransform(
    smoothScrollProgress,
    [0.72, 1],
    [0, 7],
  );

  const ghostX = useTransform(
    smoothScrollProgress,
    [0, 1],
    ["-18vw", "18vw"],
  );

  const ghostOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.72, 1],
    [0.055, 0.04, 0],
  );

  const backgroundScale = useTransform(
    smoothScrollProgress,
    [0, 1],
    [1, 1.14],
  );

  const titleRotateX = useTransform(smoothPointerY, [0, 100], [4, -4]);
  const titleRotateY = useTransform(smoothPointerX, [0, 100], [-5, 5]);

  const cursorGlow = useMotionTemplate`
    radial-gradient(
      min(580px, 68vw) circle at ${smoothPointerX}% ${smoothPointerY}%,
      rgba(255,255,255,0.22) 0%,
      rgba(191,211,255,0.10) 18%,
      rgba(120,159,255,0.03) 38%,
      transparent 68%
    )
  `;

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "touch") return;

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

  const enhancedMode = isHovered || burstActive;

  return (
    <section
      ref={sectionRef}
      id="dark-venue"
      className="relative h-[165svh] w-full overflow-x-clip bg-black sm:h-[180svh] lg:h-[195svh]"
    >
      <audio
        ref={audioRef}
        preload="auto"
        loop
        playsInline
        className="hidden"
      >
        <source
          src={SECTION_AUDIO_SRC}
          type="audio/mpeg"
        />
      </audio>
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          pointerX.set(50);
          pointerY.set(45);
          setIsHovered(false);
        }}
        className="sticky top-0 isolate h-[100svh] w-full touch-pan-y overflow-hidden bg-[#010101] text-white"
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#010101]" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transform-gpu"
          style={{
            scale: backgroundScale,
            background:
              "radial-gradient(circle at 50% 44%, rgba(38,42,57,0.72) 0%, rgba(13,15,22,0.55) 31%, rgba(1,1,1,1) 79%)",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background: cursorGlow,
          }}
        />

        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.52, ease: premiumEase }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-[90] h-px w-[92vw] origin-center bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]"
          style={{
            x: "-50%",
            willChange: "transform, opacity",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? { x: ["-145vw", "145vw"], opacity: [0, 0.72, 0] }
              : { x: "-145vw", opacity: 0 }
          }
          transition={{ duration: 6.4, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute left-0 top-[-20%] z-[3] h-[140vh] w-[13vw] -skew-x-[22deg] transform-gpu blur-[30px] sm:blur-[42px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(211,225,255,0.26), transparent)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? { x: ["145vw", "-145vw"], opacity: [0, 0.44, 0] }
              : { x: "145vw", opacity: 0 }
          }
          transition={{
            duration: 9.2,
            delay: 1.1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute left-0 top-[-8%] z-[3] hidden h-[125vh] w-[9vw] skew-x-[18deg] transform-gpu blur-[46px] sm:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(166,195,255,0.2), transparent)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  x: "-50%",
                  y: "-50%",
                  rotate: 360,
                  scale: enhancedMode ? [1, 1.12, 1] : [0.98, 1.04, 0.98],
                  opacity: enhancedMode ? [0.22, 0.58, 0.22] : [0.1, 0.3, 0.1],
                }
              : { x: "-50%", y: "-50%", opacity: 0.12 }
          }
          transition={{
            rotate: { duration: 24, repeat: Infinity, ease: "linear" },
            scale: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute left-1/2 top-[44%] z-[3] h-[32vw] min-h-[230px] max-h-[560px] w-[86vw] min-w-[430px] max-w-[1120px] rounded-[50%] border border-white/15 transform-gpu sm:h-[38vw] sm:w-[74vw]"
          style={{
            boxShadow:
              "0 0 34px rgba(193,214,255,0.09), inset 0 0 34px rgba(193,214,255,0.06)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  x: "-50%",
                  y: "-50%",
                  rotate: -360,
                  scale: enhancedMode ? [0.94, 1.08, 0.94] : [0.97, 1.02, 0.97],
                  opacity: enhancedMode ? [0.16, 0.46, 0.16] : [0.07, 0.22, 0.07],
                }
              : { x: "-50%", y: "-50%", opacity: 0.08 }
          }
          transition={{
            rotate: { duration: 18, repeat: Infinity, ease: "linear" },
            scale: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute left-1/2 top-[44%] z-[3] h-[22vw] min-h-[170px] max-h-[370px] w-[65vw] min-w-[330px] max-w-[820px] rounded-[50%] border border-[#dce7ff]/20 transform-gpu"
          style={{
            boxShadow:
              "0 0 28px rgba(177,203,255,0.1), inset 0 0 24px rgba(177,203,255,0.06)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  x: "-50%",
                  y: "-50%",
                  scale: enhancedMode ? [1, 1.38, 1] : [0.9, 1.12, 0.9],
                  opacity: enhancedMode ? [0.36, 0.82, 0.36] : [0.18, 0.52, 0.18],
                }
              : { x: "-50%", y: "-50%", opacity: 0.2 }
          }
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-[44%] z-[2] h-[88vw] max-h-[760px] w-[88vw] max-w-[760px] rounded-full transform-gpu blur-[65px] sm:blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(221,231,255,0.31), rgba(255,255,255,0.075) 35%, transparent 72%)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <AnimatePresence>
          {burstActive && (
            <div className="pointer-events-none absolute inset-0 z-[19]">
              {[0, 1, 2].map((ripple) => (
                <motion.div
                  key={`ripple-${ripple}`}
                  aria-hidden="true"
                  initial={{ x: "-50%", y: "-50%", scale: 0.08, opacity: 0.9 }}
                  animate={{ scale: 1.9 + ripple * 0.42, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.72 + ripple * 0.13,
                    delay: ripple * 0.07,
                    ease: "easeOut",
                  }}
                  className="absolute h-[34vw] min-h-[170px] max-h-[430px] w-[34vw] min-w-[170px] max-w-[430px] rounded-full border border-white/70 bg-white/[0.04] transform-gpu"
                  style={{
                    left: `${burstPoint.x}%`,
                    top: `${burstPoint.y}%`,
                    boxShadow:
                      ripple === 0
                        ? "0 0 60px rgba(255,255,255,0.68), inset 0 0 45px rgba(255,255,255,0.28)"
                        : "0 0 30px rgba(171,204,255,0.35)",
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* SIGNATURE ENERGY PORTAL */}

        <motion.div
          aria-hidden="true"
          animate={
            enhancedMode
              ? {
                  x: "-50%",
                  y: "-50%",
                  scaleX: [0.08, 1, 0.88, 1],
                  scaleY: [0.82, 1.04, 0.96, 1],
                  opacity: [0.08, 0.58, 0.34, 0.46],
                  rotate: [0, 2, -1, 0],
                }
              : {
                  x: "-50%",
                  y: "-50%",
                  scaleX: 0.035,
                  scaleY: 0.88,
                  opacity: 0.12,
                  rotate: 0,
                }
          }
          transition={{
            duration: enhancedMode ? 1.05 : 0.7,
            ease: premiumEase,
          }}
          className="pointer-events-none absolute left-1/2 top-[44%] z-[5] h-[62vh] min-h-[360px] max-h-[760px] w-[52vw] min-w-[260px] max-w-[620px] rounded-[50%] border border-white/35 transform-gpu"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(237,244,255,0.22) 0%, rgba(153,188,255,0.1) 32%, rgba(255,255,255,0.02) 58%, transparent 74%)",
            boxShadow:
              "0 0 40px rgba(203,221,255,0.2), inset 0 0 70px rgba(216,231,255,0.16)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            enhancedMode
              ? { x: "-50%", scaleY: [0.2, 1, 0.82, 1], opacity: [0, 1, 0.45, 0.86] }
              : { x: "-50%", scaleY: 0.16, opacity: 0.18 }
          }
          transition={{ duration: 0.82, ease: premiumEase }}
          className="pointer-events-none absolute bottom-[13%] left-1/2 z-[6] h-[63vh] w-px origin-bottom bg-gradient-to-t from-transparent via-white to-transparent transform-gpu"
          style={{
            boxShadow:
              "0 0 14px rgba(255,255,255,0.95), 0 0 48px rgba(141,181,255,0.55)",
            willChange: "transform, opacity",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  x: ["-56%", "-44%", "-51%", "-56%"],
                  rotate: [-11, 9, -3, -11],
                  scaleX: [0.8, 1.14, 0.94, 0.8],
                  opacity: enhancedMode
                    ? [0.3, 0.72, 0.4, 0.3]
                    : [0.17, 0.55, 0.28, 0.17],
                }
              : { x: "-50%", opacity: 0.18 }
          }
          transition={{ duration: 10.8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-[-34%] z-[4] h-[140vh] w-[128vw] origin-top transform-gpu blur-[8px] sm:w-[82vw] sm:blur-[10px]"
          style={{
            clipPath: "polygon(41% 0%, 59% 0%, 84% 100%, 16% 100%)",
            background:
              "linear-gradient(to bottom, rgba(233,239,255,0.3), rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.02) 72%, transparent 100%)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  rotate: [4, 27, 4],
                  x: ["-13%", "14%", "-13%"],
                  opacity: [0.08, 0.4, 0.08],
                }
              : { opacity: 0.08 }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-[-58%] top-[-28%] z-[4] h-[138vh] w-[130vw] origin-top transform-gpu blur-[12px] sm:left-[-32%] sm:w-[79vw] sm:blur-[15px]"
          style={{
            clipPath: "polygon(32% 0%, 50% 0%, 93% 100%, 7% 100%)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.19), rgba(174,200,255,0.065) 47%, transparent 88%)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  rotate: [-4, -28, -4],
                  x: ["13%", "-14%", "13%"],
                  opacity: [0.07, 0.36, 0.07],
                }
              : { opacity: 0.07 }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-[-60%] top-[-27%] z-[4] h-[138vh] w-[130vw] origin-top transform-gpu blur-[12px] sm:right-[-33%] sm:w-[79vw] sm:blur-[15px]"
          style={{
            clipPath: "polygon(50% 0%, 68% 0%, 94% 100%, 8% 100%)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(174,200,255,0.06) 47%, transparent 88%)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[7]">
          {lasers.map((laser, index) => (
            <motion.div
              key={`${laser.top}-${index}`}
              animate={
                isInView
                  ? {
                      rotate: [laser.start, laser.end, laser.start],
                      x: ["-10%", "14%", "-10%"],
                      opacity: enhancedMode ? [0.12, 0.9, 0.12] : [0.05, 0.68, 0.05],
                    }
                  : { opacity: 0.05 }
              }
              transition={{
                duration: laser.duration,
                delay: laser.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`${laser.className} transform-gpu`}
              style={{
                top: laser.top,
                left: laser.left,
                width: laser.width,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(165,195,255,0.12) 16%, rgba(251,253,255,0.95) 50%, rgba(165,195,255,0.13) 84%, transparent 100%)",
                boxShadow:
                  "0 0 7px rgba(242,247,255,0.8), 0 0 26px rgba(135,177,255,0.34)",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            />
          ))}
        </div>

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? { opacity: [0.15, 0.9, 0.22, 0.15], scale: [0.7, 1.5, 0.8, 0.7] }
              : { opacity: 0.15 }
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-[5%] top-[18%] z-[8] h-1.5 w-1.5 rounded-full bg-white transform-gpu shadow-[0_0_14px_5px_rgba(221,232,255,0.9),0_0_52px_18px_rgba(125,170,255,0.3)] sm:h-[7px] sm:w-[7px]"
          style={{ willChange: "transform, opacity" }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? { opacity: [0.1, 0.8, 0.18, 0.1], scale: [0.7, 1.45, 0.8, 0.7] }
              : { opacity: 0.1 }
          }
          transition={{
            duration: 4.2,
            delay: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute right-[6%] top-[27%] z-[8] h-1.5 w-1.5 rounded-full bg-white transform-gpu shadow-[0_0_14px_5px_rgba(221,232,255,0.86),0_0_52px_18px_rgba(125,170,255,0.28)] sm:h-[7px] sm:w-[7px]"
          style={{ willChange: "transform, opacity" }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  x: ["-18%", "20%", "-18%"],
                  y: ["8%", "-8%", "8%"],
                  scale: [0.86, 1.16, 0.86],
                  opacity: [0.08, 0.38, 0.08],
                }
              : { opacity: 0.08 }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-[-24%] left-[-62%] z-[9] h-[65vh] w-[180vw] rounded-full bg-white/[0.09] transform-gpu blur-[70px] sm:left-[-32%] sm:w-[104vw] sm:blur-[105px]"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  x: ["18%", "-21%", "18%"],
                  y: ["7%", "-10%", "7%"],
                  scale: [0.88, 1.18, 0.88],
                  opacity: [0.07, 0.34, 0.07],
                }
              : { opacity: 0.07 }
          }
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-[-26%] right-[-65%] z-[9] h-[66vh] w-[185vw] rounded-full bg-[#dce7ff]/[0.075] transform-gpu blur-[75px] sm:right-[-35%] sm:w-[108vw] sm:blur-[110px]"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? {
                  x: "-50%",
                  y: ["13%", "-16%", "13%"],
                  scaleX: [0.82, 1.2, 0.82],
                  opacity: [0.06, 0.3, 0.06],
                }
              : { x: "-50%", opacity: 0.06 }
          }
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-[-4%] left-1/2 z-[9] h-[30vh] w-[145vw] rounded-full bg-white/[0.08] transform-gpu blur-[65px] sm:w-[94vw] sm:blur-[90px]"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[10]">
          {dustParticles.map((particle, index) => (
            <motion.span
              key={`dust-${index}`}
              animate={
                isInView
                  ? {
                      x: [0, particle.x, -particle.x / 2, 0],
                      y: [10, -particle.y, -particle.y / 2, 10],
                      opacity: [0.02, 0.5, 0.1, 0.02],
                      scale: [0.55, 1.25, 0.75, 0.55],
                    }
                  : { opacity: 0.04 }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={
                particle.desktopOnly
                  ? "absolute hidden rounded-full bg-white transform-gpu md:block"
                  : "absolute rounded-full bg-white transform-gpu"
              }
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                boxShadow:
                  particle.size > 1
                    ? "0 0 6px rgba(237,243,255,0.7)"
                    : "none",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-[11]">
          {glowingParticles.map((particle, index) => (
            <motion.span
              key={`glow-${index}`}
              animate={
                isInView
                  ? {
                      x: [0, 10, -7, 0],
                      y: [10, -24, -9, 10],
                      opacity: [0.02, 0.82, 0.16, 0.02],
                      scale: [0.5, 1.45, 0.7, 0.5],
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
                  ? "absolute hidden rounded-full bg-[#f4f7ff] transform-gpu sm:block"
                  : "absolute rounded-full bg-[#f4f7ff] transform-gpu"
              }
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                boxShadow:
                  "0 0 9px rgba(243,247,255,0.9), 0 0 22px rgba(143,181,255,0.42)",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            />
          ))}
        </div>

        <motion.div
          aria-hidden="true"
          animate={
            isInView
              ? { x: "-50%", scaleX: [0.78, 1.15, 0.78], opacity: [0.13, 0.52, 0.13] }
              : { x: "-50%", opacity: 0.15 }
          }
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-[-18%] left-1/2 z-[12] h-[40vh] w-[150vw] rounded-[50%] border border-white/[0.1] transform-gpu sm:w-[88vw]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(216,227,255,0.21), rgba(255,255,255,0.05) 40%, transparent 73%)",
            boxShadow: "0 -24px 90px rgba(166,197,255,0.14)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[13]"
          style={{
            background:
              "radial-gradient(circle at center, transparent 29%, rgba(0,0,0,0.05) 58%, rgba(0,0,0,0.58) 92%, rgba(0,0,0,0.94) 100%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[44%] z-[14] whitespace-nowrap text-[clamp(9rem,38vw,39rem)] font-medium italic leading-none tracking-[-0.1em] text-white transform-gpu"
          style={{
            x: ghostX,
            y: "-50%",
            opacity: ghostOpacity,
            fontFamily: luxuryFont.style.fontFamily,
            textShadow: "0 0 80px rgba(255,255,255,0.14)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          JKAYY
        </motion.div>

        <motion.div
          className="relative z-20 flex h-[100svh] w-full items-center justify-center px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))] text-center sm:px-7 sm:pb-24 sm:pt-24 lg:px-12"
          style={{
            y: contentY,
            scale: contentScale,
            opacity: contentOpacity,
            willChange: "transform, opacity",
          }}
        >
          <motion.div
            className="mx-auto w-full max-w-[1600px] transform-gpu"
            style={{
              rotateX: titleRotateX,
              rotateY: titleRotateY,
              transformPerspective: 1400,
              transformStyle: "preserve-3d",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="relative mx-auto mb-4 h-5 max-w-[92vw] overflow-hidden sm:mb-7 sm:h-6">
              <AnimatePresence initial={false} mode="sync">
                <motion.p
                  key={lineIndex}
                  initial={{ opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -9 }}
                  transition={{ duration: 0.38, ease: premiumEase }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[7px] font-medium uppercase tracking-[0.26em] text-white/56 sm:text-[9px] sm:tracking-[0.46em] lg:text-[10px]"
                  style={{
                    fontFamily: cleanFont.style.fontFamily,
                    willChange: "transform, opacity",
                  }}
                >
                  {changingLines[lineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") {
                  setIsHovered(true);
                }
              }}
              onPointerLeave={() => setIsHovered(false)}
              onPointerDown={(event) => {
                if (!soundEnabled) {
                  void startAudio();
                }

                triggerBurst(event);
              }}
              animate={isInView ? { y: [0, -6, 0] } : { y: 0 }}
              transition={{
                duration: enhancedMode ? 2.8 : 5.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="cursor-crosshair select-none transform-gpu"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 34, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.48, ease: premiumEase }}
                className="flex justify-center whitespace-nowrap text-[clamp(3.2rem,14vw,14rem)] font-medium uppercase leading-[0.7] tracking-[-0.065em] text-white landscape:text-[clamp(2.8rem,10vw,8rem)]"
                style={{
                  x: firstLineX,
                  rotate: firstLineRotate,
                  fontFamily: luxuryFont.style.fontFamily,
                  textShadow: enhancedMode
                    ? "0 0 38px rgba(220,233,255,0.42), 0 18px 82px rgba(255,255,255,0.19)"
                    : "0 16px 62px rgba(255,255,255,0.12)",
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              >
                {firstTitle.split("").map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={{ opacity: 0, y: 25, rotate: 3 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.34,
                      delay: index * 0.012,
                      ease: premiumEase,
                    }}
                    className="inline-block transform-gpu"
                    style={{
                      willChange: "transform, opacity",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <motion.span
                      animate={
                        enhancedMode
                          ? {
                              y: index % 2 === 0 ? -13 : 10,
                              x: index < firstTitle.length / 2 ? -5 : 5,
                              rotate: index % 2 === 0 ? -3 : 3,
                              scale: index % 3 === 0 ? 1.08 : 1.02,
                            }
                          : { y: 0, x: 0, rotate: 0, scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 220, damping: 17 }}
                      className="inline-block transform-gpu"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 42, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.52, delay: 0.04, ease: premiumEase }}
                className="mt-[0.08em] flex justify-center whitespace-nowrap pb-[0.14em] text-[clamp(2.65rem,11.8vw,14.8rem)] font-medium italic leading-[0.67] tracking-[-0.07em] landscape:text-[clamp(2.35rem,8vw,7rem)]"
                style={{
                  x: secondLineX,
                  rotate: secondLineRotate,
                  fontFamily: luxuryFont.style.fontFamily,
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              >
                {secondTitle.split("").map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={{ opacity: 0, y: 28, rotate: -3 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.36,
                      delay: 0.04 + index * 0.01,
                      ease: premiumEase,
                    }}
                    className="inline-block transform-gpu"
                    style={{
                      willChange: "transform, opacity",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <motion.span
                      animate={
                        enhancedMode
                          ? {
                              y: index % 2 === 0 ? 12 : -15,
                              x: index < secondTitle.length / 2 ? -5 : 5,
                              rotate: index % 2 === 0 ? 3 : -3,
                              scale: index % 3 === 0 ? 1.08 : 1.02,
                            }
                          : { y: 0, x: 0, rotate: 0, scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 215, damping: 17 }}
                      className="inline-block bg-gradient-to-b from-white via-[#e1eaff] to-white/30 bg-clip-text text-transparent transform-gpu"
                      style={{
                        filter: enhancedMode
                          ? "drop-shadow(0 0 20px rgba(195,218,255,0.42))"
                          : "drop-shadow(0 10px 28px rgba(179,204,255,0.13))",
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.44, delay: 0.16, ease: premiumEase }}
              className="mx-auto mt-5 flex max-w-xl flex-col items-center sm:mt-9 [@media(max-height:650px)]:mt-4"
            >
              <p
                className="max-w-[min(88vw,31rem)] text-[11px] font-normal leading-5 tracking-[0.015em] text-white/48 sm:text-[13px] sm:leading-6 lg:text-[14px] lg:leading-7 [@media(max-height:620px)]:hidden"
                style={{ fontFamily: cleanFont.style.fontFamily }}
              >
                Darkness, movement and light building the atmosphere before the
                first sound takes over.
              </p>

              <div className="mt-5 flex flex-col items-center gap-2 sm:mt-7 sm:gap-3 [@media(max-height:620px)]:mt-3">
                <div className="flex h-8 items-center justify-center gap-[3px] sm:h-10 sm:gap-1">
                  {pulseBars.map((bar, index) => (
                    <motion.span
                      key={`pulse-${index}`}
                      animate={
                        isInView
                          ? {
                              height: enhancedMode
                                ? [bar.idleHeight, bar.activeHeight, bar.idleHeight]
                                : [bar.idleHeight, Math.max(8, bar.activeHeight * 0.55), bar.idleHeight],
                              opacity: enhancedMode ? [0.28, 1, 0.28] : [0.16, 0.56, 0.16],
                              scaleY: enhancedMode ? [0.72, 1.14, 0.72] : [0.8, 1, 0.8],
                            }
                          : {
                              height: bar.idleHeight,
                              opacity: 0.18,
                              scaleY: 0.85,
                            }
                      }
                      transition={{
                        duration: enhancedMode ? 0.82 : 1.55,
                        delay: bar.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-px rounded-full bg-white/80 transform-gpu sm:w-[2px]"
                      style={{
                        boxShadow: enhancedMode
                          ? "0 0 9px rgba(221,233,255,0.72)"
                          : "0 0 5px rgba(221,233,255,0.32)",
                        willChange: "height, transform, opacity",
                      }}
                    />
                  ))}
                </div>

                <motion.span
                  animate={{ opacity: enhancedMode ? 0.72 : 0.38 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-nowrap text-[6px] font-medium uppercase tracking-[0.28em] text-white sm:text-[7px] sm:tracking-[0.4em] lg:text-[8px]"
                  style={{ fontFamily: cleanFont.style.fontFamily }}
                >
                  {enhancedMode ? "The first beat is close" : "Hover · Move · Tap"}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          aria-label={soundEnabled ? "Mute section sound" : "Enable section sound"}
          aria-pressed={soundEnabled}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onClick={toggleSound}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.35, delay: 0.18, ease: premiumEase }}
          className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 text-white/70 shadow-[0_0_25px_rgba(176,203,255,0.08)] backdrop-blur-md sm:bottom-7 sm:right-7 sm:h-11 sm:px-4"
          style={{
            fontFamily: cleanFont.style.fontFamily,
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span className="relative flex h-4 w-5 items-center justify-center gap-[2px]">
            {[0, 1, 2, 3].map((bar) => (
              <motion.span
                key={`sound-button-${bar}`}
                animate={
                  soundEnabled && isInView
                    ? {
                        height: [4, 13 - Math.abs(1.5 - bar) * 3, 5, 10, 4],
                        opacity: [0.45, 1, 0.6, 0.9, 0.45],
                      }
                    : { height: 3, opacity: 0.4 }
                }
                transition={{
                  duration: 0.85,
                  delay: bar * 0.07,
                  repeat: soundEnabled && isInView ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="w-px rounded-full bg-white"
              />
            ))}
          </span>

          <span className="text-[7px] font-medium uppercase tracking-[0.24em] sm:text-[8px]">
            {soundEnabled ? "Sound on" : "Sound off"}
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-7 sm:gap-3"
        >
          <p
            className="text-[6px] font-medium uppercase tracking-[0.32em] text-white/34 sm:text-[7px] sm:tracking-[0.38em]"
            style={{ fontFamily: cleanFont.style.fontFamily }}
          >
            Enter
          </p>

          <div className="relative h-8 w-px overflow-hidden bg-white/16 sm:h-11">
            <motion.span
              animate={
                isInView
                  ? { y: ["-150%", "250%"], opacity: [0, 0.9, 0] }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.65, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-white to-transparent transform-gpu shadow-[0_0_9px_rgba(255,255,255,0.8)]"
              style={{ willChange: "transform, opacity" }}
            />
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 z-40 h-px w-full bg-white/[0.06]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-white/10 via-white/90 to-white/10 transform-gpu shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            style={{
              scaleX: smoothScrollProgress,
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </section>
  );
}