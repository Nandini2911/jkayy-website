"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const premiumEase = [0.16, 1, 0.3, 1] as const;

const AUDIO_SRC = "/audio/echoes-of-night.mp3";
const ALBUM_ARTWORK = "/images/beyond.webp";



const particles = [
  { id: "p01", left: "6%", top: "17%", size: 1, delay: 0.2, duration: 9 },
  { id: "p02", left: "13%", top: "72%", size: 2, delay: 1.2, duration: 12 },
  { id: "p03", left: "24%", top: "29%", size: 1, delay: 0.6, duration: 10 },
  { id: "p04", left: "31%", top: "84%", size: 1, delay: 1.8, duration: 13 },
  { id: "p05", left: "44%", top: "10%", size: 2, delay: 0.9, duration: 11 },
  { id: "p06", left: "57%", top: "76%", size: 1, delay: 1.4, duration: 9 },
  { id: "p07", left: "70%", top: "18%", size: 2, delay: 0.4, duration: 13 },
  { id: "p08", left: "81%", top: "83%", size: 1, delay: 1.9, duration: 10 },
  { id: "p09", left: "92%", top: "38%", size: 1, delay: 0.7, duration: 11 },
  { id: "p10", left: "10%", top: "49%", size: 1, delay: 2.2, duration: 13 },
  { id: "p11", left: "67%", top: "48%", size: 1, delay: 1.3, duration: 9 },
  { id: "p12", left: "42%", top: "41%", size: 2, delay: 0.3, duration: 12 },
];

const equalizer = [8, 15, 10, 23, 13, 29, 17, 25, 12, 20, 9, 16];

function PlayMark({ playing }: { playing: boolean }) {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current/20 sm:h-9 sm:w-9">
      {playing ? (
        <span className="flex gap-[3px]">
          <span className="h-3 w-[2px] bg-current" />
          <span className="h-3 w-[2px] bg-current" />
        </span>
      ) : (
        <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
      )}
    </span>
  );
}

export default function FeaturedReleaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const rippleTimeoutRef = useRef<number | null>(null);

  const reducedMotion = useReducedMotion() ?? false;

  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [artworkHovered, setArtworkHovered] = useState(false);
  const [ripple, setRipple] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 88,
    damping: 25,
    mass: 0.35,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 88,
    damping: 25,
    mass: 0.35,
  });

  const smoothMagneticX = useSpring(magneticX, {
    stiffness: 220,
    damping: 18,
    mass: 0.22,
  });

  const smoothMagneticY = useSpring(magneticY, {
    stiffness: 220,
    damping: 18,
    mass: 0.22,
  });

  const artTiltX = useTransform(smoothPointerY, [0, 100], [4.5, -4.5]);
  const artTiltY = useTransform(smoothPointerX, [0, 100], [-5.5, 5.5]);
  const artShiftX = useTransform(smoothPointerX, [0, 100], [-7, 7]);
  const artShiftY = useTransform(smoothPointerY, [0, 100], [-5, 5]);
  const foregroundShiftX = useTransform(smoothPointerX, [0, 100], [-10, 10]);
  const foregroundShiftY = useTransform(smoothPointerY, [0, 100], [-6, 6]);

  const pointerSpotlight = useMotionTemplate`
    radial-gradient(
      min(680px, 78vw) circle at ${smoothPointerX}% ${smoothPointerY}%,
      rgba(255,255,255,0.12) 0%,
      rgba(255,255,255,0.04) 28%,
      transparent 68%
    )
  `;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 76,
    damping: 27,
    mass: 0.28,
    restDelta: 0.0008,
  });

  const stageScale = useTransform(
    smoothScroll,
    [0, 0.12, 0.76, 1],
    [0.93, 1, 1, 0.82],
  );
  const stageOpacity = useTransform(
    smoothScroll,
    [0, 0.08, 0.78, 0.96, 1],
    [0.25, 1, 1, 0.48, 0],
  );

  const monolithY = useTransform(
    smoothScroll,
    [0, 0.17, 0.74, 1],
    ["10vh", "0vh", "0vh", "-16vh"],
  );
  const monolithScale = useTransform(
    smoothScroll,
    [0, 0.16, 0.74, 1],
    [0.72, 1, 1, 1.24],
  );
  const monolithRotate = useTransform(
    smoothScroll,
    [0, 0.18, 0.72, 1],
    [-7, 0, 0, 5],
  );

  const leftShutterX = useTransform(
    smoothScroll,
    [0, 0.16, 0.3, 1],
    ["0%", "0%", "-104%", "-104%"],
  );
  const rightShutterX = useTransform(
    smoothScroll,
    [0, 0.16, 0.3, 1],
    ["0%", "0%", "104%", "104%"],
  );

  const topTitleX = useTransform(
    smoothScroll,
    [0, 0.2, 0.76, 1],
    ["-18vw", "0vw", "0vw", "13vw"],
  );
  const bottomTitleX = useTransform(
    smoothScroll,
    [0, 0.2, 0.76, 1],
    ["18vw", "0vw", "0vw", "-15vw"],
  );
  const titleOpacity = useTransform(
    smoothScroll,
    [0, 0.09, 0.82, 0.98],
    [0, 1, 1, 0],
  );

  const detailsX = useTransform(
    smoothScroll,
    [0, 0.18, 0.78, 1],
    ["11vw", "0vw", "0vw", "14vw"],
  );
  const detailsOpacity = useTransform(
    smoothScroll,
    [0, 0.12, 0.8, 0.97],
    [0, 1, 1, 0],
  );

  const statementX = useTransform(
    smoothScroll,
    [0, 0.18, 0.78, 1],
    ["-12vw", "0vw", "0vw", "-14vw"],
  );
  const statementOpacity = useTransform(
    smoothScroll,
    [0, 0.12, 0.8, 0.97],
    [0, 1, 1, 0],
  );

  const giantNumberY = useTransform(smoothScroll, [0, 1], ["8vh", "-12vh"]);
  const giantNumberOpacity = useTransform(
    smoothScroll,
    [0, 0.14, 0.76, 1],
    [0, 0.045, 0.025, 0],
  );

  const frameRotate = useTransform(smoothScroll, [0, 1], [-7, 14]);
  const frameScale = useTransform(
    smoothScroll,
    [0, 0.7, 1],
    [0.84, 1.08, 1.45],
  );
  const frameOpacity = useTransform(
    smoothScroll,
    [0, 0.12, 0.78, 1],
    [0, 0.5, 0.22, 0],
  );

  const scanY = useTransform(smoothScroll, [0, 1], ["-20vh", "120vh"]);

  const exitTopY = useTransform(smoothScroll, [0.86, 1], ["-100%", "0%"]);
  const exitBottomY = useTransform(smoothScroll, [0.86, 1], ["100%", "0%"]);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setAudioError("");
      audio.volume = 0.36;
      audio.loop = true;
      audio.muted = false;
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.error("Featured release audio could not play:", error);
      setAudioError("Tap once more to enable sound.");
      setPlaying(false);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  }, []);

  const toggleAudio = useCallback(() => {
    if (playing) {
      pauseAudio();
      return;
    }

    void playAudio();
  }, [pauseAudio, playAudio, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }

      if (rippleTimeoutRef.current !== null) {
        window.clearTimeout(rippleTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = Math.min(
      100,
      Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100),
    );
    const nextY = Math.min(
      100,
      Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100),
    );

    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
    }

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      pointerX.set(nextX);
      pointerY.set(nextY);
    });
  };

  const handlePointerLeave = () => {
    pointerX.set(50);
    pointerY.set(50);
  };

  const handleStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    setRipple({
      id: Date.now(),
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    if (rippleTimeoutRef.current !== null) {
      window.clearTimeout(rippleTimeoutRef.current);
    }

    rippleTimeoutRef.current = window.setTimeout(() => {
      setRipple(null);
    }, 850);
  };

  const handleButtonPointerMove = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (event.pointerType === "touch" || reducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    magneticX.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    magneticY.set((event.clientY - bounds.top - bounds.height / 2) * 0.16);
  };

  const resetMagneticButton = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="featured-release"
      className="relative h-[225svh] w-full overflow-x-clip bg-[#050505] sm:h-[240svh] lg:h-[265svh]"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1000px 2200px",
      }}
    >
      

      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handleStagePointerDown}
        className="sticky top-0 isolate h-[100svh] min-h-[620px] w-full touch-pan-y overflow-hidden bg-[#050505] text-white"
        style={{
          WebkitTapHighlightColor: "transparent",
          contain: "paint",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#050505]" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: pointerSpotlight }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "clamp(44px,5vw,78px) clamp(44px,5vw,78px)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              "radial-gradient(circle at 50% 43%,transparent 10%,rgba(0,0,0,0.2) 52%,rgba(0,0,0,0.88) 100%),linear-gradient(180deg,rgba(255,255,255,0.055),transparent 22%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-[4] h-px bg-gradient-to-r from-transparent via-white/28 to-transparent shadow-[0_0_30px_rgba(255,255,255,0.24)]"
          style={{ y: scanY }}
        />

        <div className="pointer-events-none absolute inset-0 z-[5]">
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              animate={
                reducedMotion
                  ? { opacity: 0.18 }
                  : {
                      y: [12, -24, 12],
                      x: [0, 8, -5, 0],
                      opacity: [0.03, playing ? 0.72 : 0.42, 0.03],
                      scale: [0.65, playing ? 1.6 : 1.2, 0.65],
                    }
              }
              transition={{
                duration: playing
                  ? particle.duration * 0.62
                  : particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-white"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                boxShadow:
                  particle.size > 1
                    ? "0 0 12px rgba(255,255,255,0.7)"
                    : "none",
              }}
            />
          ))}
        </div>

       

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[7] aspect-square w-[min(88vw,780px)] -translate-x-1/2 -translate-y-1/2 border border-white/[0.08] lg:w-[min(58vw,820px)]"
          style={{
            rotate: frameRotate,
            scale: frameScale,
            opacity: frameOpacity,
          }}
        >
          <div className="absolute left-[-1px] top-[-1px] h-8 w-8 border-l border-t border-white/30" />
          <div className="absolute right-[-1px] top-[-1px] h-8 w-8 border-r border-t border-white/30" />
          <div className="absolute bottom-[-1px] left-[-1px] h-8 w-8 border-b border-l border-white/30" />
          <div className="absolute bottom-[-1px] right-[-1px] h-8 w-8 border-b border-r border-white/30" />
        </motion.div>

        <motion.div
          className="relative z-20 h-full w-full"
          style={{ scale: stageScale, opacity: stageOpacity }}
        >
          <div className="relative mx-auto h-full w-full max-w-[1920px] px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-7 sm:pb-7 sm:pt-7 lg:px-10 xl:px-14">
            <div className="absolute inset-x-4 top-[calc(1.1rem+env(safe-area-inset-top))] z-40 flex items-center justify-between sm:inset-x-7 sm:top-[calc(1.5rem+env(safe-area-inset-top))] lg:inset-x-10 xl:inset-x-14">
              <div className="flex items-center gap-3 sm:gap-5">
                
              
                
              </div>

              <div className="hidden items-center gap-3 sm:flex">
              
                <span className="h-1.5 w-1.5 rounded-full bg-white/75 shadow-[0_0_14px_rgba(255,255,255,0.55)]" />
              </div>
            </div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[12%] z-[35] -translate-x-1/2 whitespace-nowrap text-center text-[clamp(3.8rem,12vw,11rem)] font-medium uppercase leading-[0.68] tracking-[-0.07em] text-white mix-blend-difference drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:top-[11%] lg:top-[7%]"
              style={{
                x: topTitleX,
                opacity: titleOpacity,
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Echoes
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-[42%] z-20 aspect-square w-[min(72vw,520px)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(64vw,590px)] lg:left-[48%] lg:top-1/2 lg:w-[min(42vw,650px)]"
              style={{
                y: monolithY,
                scale: monolithScale,
                rotate: monolithRotate,
                rotateX: artTiltX,
                rotateY: artTiltY,
                x: artShiftX,
                transformPerspective: 1500,
                transformStyle: "preserve-3d",
              }}
              onHoverStart={() => setArtworkHovered(true)}
              onHoverEnd={() => setArtworkHovered(false)}
            >
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: artworkHovered ? -8 : [0, -7, 0],
                        rotateZ: artworkHovered ? 3 : [0, 0.7, 0],
                      }
                }
                transition={
                  artworkHovered
                    ? { duration: 0.75, ease: premiumEase }
                    : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative h-full w-full"
              >
                <motion.div
                  aria-hidden="true"
                  animate={{
                    opacity: artworkHovered || playing ? 0.48 : 0.18,
                    scale: artworkHovered || playing ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.75, ease: premiumEase }}
                  className="absolute inset-[5%] -z-10 bg-white blur-[50px] sm:blur-[70px]"
                />

                <div className="relative h-full w-full overflow-hidden border border-white/16 bg-[#0b0b0b] shadow-[0_44px_130px_rgba(0,0,0,0.84)]">
                  <motion.img
                    src={ALBUM_ARTWORK}
                    alt="Echoes Of Night album artwork"
                    draggable={false}
                    animate={{
                      scale: artworkHovered ? 1.075 : playing ? 1.045 : 1.015,
                      filter:
                        artworkHovered || playing
                          ? "grayscale(1) contrast(1.14) brightness(0.88)"
                          : "grayscale(1) contrast(1.05) brightness(0.74)",
                    }}
                    transition={{ duration: 1, ease: premiumEase }}
                    className="h-full w-full select-none object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/[0.035]" />
                  <div className="pointer-events-none absolute inset-[4%] border border-white/[0.09]" />

                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 z-30 w-1/2 border-r border-white/[0.08] bg-[#080808]"
                    style={{ x: leftShutterX }}
                  >
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[6px] uppercase tracking-[0.6em] text-white/22 sm:text-[7px]">
                      Private Frequency
                    </div>
                  </motion.div>

                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-y-0 right-0 z-30 w-1/2 bg-[#080808]"
                    style={{ x: rightShutterX }}
                  >
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-[6px] uppercase tracking-[0.6em] text-white/22 sm:text-[7px]">
                      May Twenty Twenty Six
                    </div>
                  </motion.div>

                  <div className="absolute bottom-4 left-4 z-20 sm:bottom-6 sm:left-6">
                    <p
                      className="text-[6px] uppercase tracking-[0.42em] text-white/45 sm:text-[7px]"
                      style={{ fontFamily: bodyFont.style.fontFamily }}
                    >
                      JKAYY / 002
                    </p>
                  </div>

                  <div className="absolute bottom-4 right-4 z-20 sm:bottom-6 sm:right-6">
                    <p
                      className="text-[6px] uppercase tracking-[0.42em] text-white/45 sm:text-[7px]"
                      style={{ fontFamily: bodyFont.style.fontFamily }}
                    >
                      06:42
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[31%] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-center text-[clamp(3.3rem,11vw,10rem)] font-normal italic leading-[0.7] tracking-[-0.065em] text-white sm:bottom-[27%] lg:bottom-[9%]"
              style={{
                x: bottomTitleX,
                y: foregroundShiftY,
                opacity: titleOpacity,
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Of Night
            </motion.div>

            <motion.div
              className="absolute bottom-[6.5rem] left-4 z-40 max-w-[260px] sm:bottom-8 sm:left-7 sm:max-w-[310px] lg:bottom-12 lg:left-10 xl:left-14"
              style={{
                x: statementX,
                opacity: statementOpacity,
              }}
            >
              <motion.div
                style={{
                  x: foregroundShiftX,
                  y: foregroundShiftY,
                }}
              >
                <p
                  className="mb-3 text-[7px] font-medium uppercase tracking-[0.4em] text-white/34 sm:text-[8px]"
                  style={{ fontFamily: bodyFont.style.fontFamily }}
                >
                  Techno · Trance
                </p>

                <p
                  className="text-[clamp(1.7rem,5.7vw,3.8rem)] font-medium leading-[0.86] tracking-[-0.045em] text-white"
                  style={{ fontFamily: displayFont.style.fontFamily }}
                >
                  One release.
                  <span className="block font-normal italic text-white/52">
                    Countless moments.
                  </span>
                </p>

                <div className="mt-5 flex items-center gap-4 sm:mt-6">
                  <motion.button
                    type="button"
                    onClick={toggleAudio}
                    onPointerMove={handleButtonPointerMove}
                    onPointerLeave={resetMagneticButton}
                    whileTap={{ scale: 0.96 }}
                    style={{ x: smoothMagneticX, y: smoothMagneticY }}
                    className="group relative inline-flex min-w-[145px] items-center justify-center gap-2.5 overflow-hidden rounded-full border border-white/18 bg-white px-4 py-2.5 text-black shadow-[0_16px_55px_rgba(255,255,255,0.08)] sm:min-w-[168px] sm:gap-3 sm:px-5 sm:py-3"
                  >
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 origin-left bg-[#242424]"
                      initial={false}
                      animate={{ scaleX: playing ? 1 : 0 }}
                      transition={{ duration: 0.55, ease: premiumEase }}
                      style={{ transformOrigin: "left" }}
                    />

                    <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-500 group-hover:text-white">
                      <PlayMark playing={playing} />
                      <span
                        className="text-[7px] font-semibold uppercase tracking-[0.24em] sm:text-[8px]"
                        style={{ fontFamily: bodyFont.style.fontFamily }}
                      >
                        {playing ? "Pause Track" : "Listen Now"}
                      </span>
                    </span>
                  </motion.button>

                  <div className="hidden h-8 items-center gap-[3px] sm:flex">
                    {equalizer.map((height, index) => (
                      <motion.span
                        key={`${height}-${index}`}
                        animate={
                          playing && !reducedMotion
                            ? {
                                height: [
                                  Math.max(4, height * 0.28),
                                  height,
                                  Math.max(5, height * 0.42),
                                ],
                                opacity: [0.24, 0.82, 0.35],
                              }
                            : {
                                height: Math.max(4, height * 0.28),
                                opacity: 0.24,
                              }
                        }
                        transition={{
                          duration: 0.78 + (index % 4) * 0.14,
                          delay: index * 0.035,
                          repeat: playing ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                        className="w-px rounded-full bg-white"
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {audioError && (
                    <motion.p
                      initial={{ opacity: 0, y: 7 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 7 }}
                      className="mt-3 text-[8px] tracking-[0.04em] text-white/38"
                      style={{ fontFamily: bodyFont.style.fontFamily }}
                    >
                      {audioError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-[1.15rem] right-4 z-40 grid w-[calc(100%-2rem)] grid-cols-2 border-t border-white/[0.1] sm:bottom-7 sm:right-7 sm:w-[52%] lg:bottom-12 lg:right-10 lg:w-[310px] lg:grid-cols-1 lg:border-l lg:border-t-0 xl:right-14 xl:w-[340px]"
              style={{
                x: detailsX,
                opacity: detailsOpacity,
              }}
            >
              
            </motion.div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 z-40 hidden -translate-y-1/2 -rotate-90 items-center gap-4 lg:flex xl:left-7"
            >
            
             
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {ripple && (
            <div className="pointer-events-none absolute inset-0 z-[80]">
              {[0, 1, 2].map((ring) => (
                <motion.span
                  key={`${ripple.id}-${ring}`}
                  initial={{
                    x: "-50%",
                    y: "-50%",
                    scale: 0.06,
                    opacity: 0.55,
                  }}
                  animate={{
                    scale: 1.3 + ring * 0.5,
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.62 + ring * 0.14,
                    delay: ring * 0.05,
                    ease: "easeOut",
                  }}
                  className="absolute aspect-square w-[130px] rounded-full border border-white/35 bg-white/[0.018] sm:w-[180px]"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    boxShadow:
                      ring === 0
                        ? "0 0 42px rgba(255,255,255,0.16)"
                        : "none",
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[90] h-1/2 bg-[#050505]"
          style={{ y: exitTopY }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[90] h-1/2 bg-[#050505]"
          style={{ y: exitBottomY }}
        />

        <div className="absolute bottom-0 left-0 z-[95] h-px w-full bg-white/[0.06]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-white/10 via-white/90 to-white/10 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
            style={{ scaleX: smoothScroll }}
          />
        </div>
      </div>
    </section>
  );
}