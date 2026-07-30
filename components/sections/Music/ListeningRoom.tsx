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
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const premiumEase = [0.16, 1, 0.3, 1] as const;

const AUDIO_SRC = "/audio/keep-them-close.mp3";
const AUDIO_VOLUME = 0.34;



const dust = [
  { id: "d-01", left: "8%", top: "18%", size: 1, duration: 8, delay: 0.2 },
  { id: "d-02", left: "17%", top: "73%", size: 2, duration: 10, delay: 1.1 },
  { id: "d-03", left: "28%", top: "26%", size: 1, duration: 9, delay: 0.6 },
  { id: "d-04", left: "38%", top: "84%", size: 1, duration: 11, delay: 1.8 },
  { id: "d-05", left: "51%", top: "12%", size: 2, duration: 10, delay: 0.9 },
  { id: "d-06", left: "62%", top: "72%", size: 1, duration: 8, delay: 1.5 },
  { id: "d-07", left: "74%", top: "20%", size: 2, duration: 12, delay: 0.4 },
  { id: "d-08", left: "86%", top: "80%", size: 1, duration: 9, delay: 1.9 },
  { id: "d-09", left: "93%", top: "39%", size: 1, duration: 10, delay: 0.7 },
  { id: "d-10", left: "12%", top: "48%", size: 1, duration: 12, delay: 2.2 },
  { id: "d-11", left: "68%", top: "48%", size: 1, duration: 8, delay: 1.3 },
  { id: "d-12", left: "43%", top: "42%", size: 2, duration: 11, delay: 0.3 },
];

const miniBars = [8, 15, 11, 22, 13, 27, 17, 31, 20, 25, 12, 18, 9];

function ReactiveWave({
  active,
  pointerX,
  pointerY,
  reducedMotion,
}: {
  active: boolean;
  pointerX: React.MutableRefObject<number>;
  pointerY: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();

      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const px = pointerX.current;
      const py = pointerY.current;
      const pointerInfluence = (px - 0.5) * 0.9;
      const verticalInfluence = (py - 0.5) * 0.55;

      const centerY = height * (0.5 + verticalInfluence * 0.08);
      const baseAmplitude = Math.min(height * 0.14, 74);
      const lineCount = width < 700 ? 2 : 3;

      for (let line = 0; line < lineCount; line += 1) {
        context.beginPath();

        const alpha = line === 0 ? 0.72 : line === 1 ? 0.24 : 0.11;
        const amplitude = baseAmplitude * (1 - line * 0.2);
        const frequency = 0.012 + line * 0.003;
        const speed = reducedMotion ? 0 : frame * (0.018 + line * 0.004);

        for (let x = 0; x <= width; x += 4) {
          const normalized = x / Math.max(1, width);
          const envelope = Math.sin(normalized * Math.PI);
          const pointerWave =
            Math.sin(
              x * frequency +
                speed +
                pointerInfluence * Math.PI * 2 +
                line * 1.4,
            ) *
            amplitude *
            envelope;

          const secondaryWave =
            Math.sin(x * 0.026 - speed * 0.72 + line) *
            amplitude *
            0.22 *
            envelope;

          const y = centerY + pointerWave + secondaryWave;

          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        const gradient = context.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "rgba(15, 15, 15, 0)");
        gradient.addColorStop(
          0.28,
          `rgba(95, 95, 95, ${alpha * 0.58})`,
        );
        gradient.addColorStop(0.5, `rgba(15, 15, 15, ${alpha})`);
        gradient.addColorStop(
          0.72,
          `rgba(95, 95, 95, ${alpha * 0.58})`,
        );
        gradient.addColorStop(1, "rgba(15, 15, 15, 0)");

        context.strokeStyle = gradient;
        context.lineWidth = line === 0 ? 1.25 : 0.75;
        context.shadowBlur = line === 0 ? 18 : 8;
        context.shadowColor = "rgba(0, 0, 0, 0.16)";
        context.stroke();
      }

      context.shadowBlur = 0;

      if (active && !reducedMotion) {
        frame += 1;
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });

    observer.observe(canvas);

    if (active && !reducedMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [active, pointerX, pointerY, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[-12%] top-1/2 h-[32vh] min-h-[180px] w-[124%] -translate-y-1/2 opacity-70 sm:h-[36vh] sm:min-h-[230px] sm:opacity-75 lg:h-[38vh] lg:min-h-[250px] lg:opacity-80"
    />
  );
}

function VinylRecord({
  playing,
  reducedMotion,
}: {
  playing: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      animate={
        reducedMotion
          ? undefined
          : {
              rotate: playing ? 360 : 26,
            }
      }
      transition={
        reducedMotion
          ? undefined
          : {
              duration: playing ? 8 : 36,
              repeat: Infinity,
              ease: "linear",
            }
      }
      className="relative aspect-square w-full rounded-full border border-white/[0.14] bg-[#050505] shadow-[0_45px_120px_rgba(0,0,0,0.86),0_0_90px_rgba(255,255,255,0.07)] sm:shadow-[0_55px_150px_rgba(0,0,0,0.86),0_0_110px_rgba(255,255,255,0.08)]"
      style={{
        backgroundImage:
          "repeating-radial-gradient(circle at center,rgba(255,255,255,0.10) 0px,rgba(255,255,255,0.10) 1px,transparent 1px,transparent 7px),radial-gradient(circle at 36% 28%,rgba(255,255,255,0.12),transparent 17%),radial-gradient(circle at center,#101010 0%,#050505 66%,#020202 100%)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="absolute inset-[8%] rounded-full border border-white/[0.05]" />
      <div className="absolute inset-[19%] rounded-full border border-white/[0.055]" />
      <div className="absolute inset-[30%] rounded-full border border-white/[0.06]" />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[radial-gradient(circle_at_34%_28%,#ffffff_0%,#d6d6d6_18%,#737373_43%,#202020_72%,#070707_100%)] shadow-[0_0_44px_rgba(255,255,255,0.13)]">
        <div className="absolute left-1/2 top-1/2 aspect-square w-[11%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-1 ring-white/25" />
        <p
          className="absolute left-1/2 top-[27%] -translate-x-1/2 whitespace-nowrap text-[clamp(6px,0.58vw,9px)] font-semibold uppercase tracking-[0.32em] text-white/75"
          style={{
            fontFamily: cleanFont.style.fontFamily,
          }}
        >
          JKAYY
        </p>
       
      </div>

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: [0, 360],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[2%] rounded-full"
        style={{
          background:
            "conic-gradient(from 25deg,transparent 0deg,transparent 24deg,rgba(255,255,255,0.15) 33deg,transparent 43deg,transparent 192deg,rgba(255,255,255,0.08) 206deg,transparent 222deg)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}

export default function ListeningRoomSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const burstTimeoutRef = useRef<number | null>(null);

  const pointerRatioX = useRef(0.5);
  const pointerRatioY = useRef(0.5);

  const shouldReduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, {
    margin: "180px 0px 180px 0px",
    amount: 0.05,
  });

  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [burst, setBurst] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 92,
    damping: 26,
    mass: 0.35,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 92,
    damping: 26,
    mass: 0.35,
  });

  const vinylTiltX = useTransform(smoothPointerY, [0, 100], [7, -7]);
  const vinylTiltY = useTransform(smoothPointerX, [0, 100], [-8, 8]);
  const contentShiftX = useTransform(smoothPointerX, [0, 100], [-9, 9]);
  const contentShiftY = useTransform(smoothPointerY, [0, 100], [-6, 6]);

  const cursorGlow = useMotionTemplate`
    radial-gradient(
      min(560px, 70vw) circle at ${smoothPointerX}% ${smoothPointerY}%,
      rgba(0, 0, 0, 0.085) 0%,
      rgba(70, 70, 70, 0.035) 27%,
      transparent 66%
    )
  `;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 78,
    damping: 27,
    mass: 0.25,
    restDelta: 0.0008,
  });

  const stageScale = useTransform(
    smoothScroll,
    [0, 0.12, 0.74, 1],
    [0.94, 1, 1, 0.82],
  );

  const stageOpacity = useTransform(
    smoothScroll,
    [0, 0.08, 0.76, 0.96, 1],
    [0.3, 1, 1, 0.45, 0],
  );

  const stageY = useTransform(
    smoothScroll,
    [0, 0.7, 1],
    ["0vh", "0vh", "-14vh"],
  );

  const vinylX = useTransform(
    smoothScroll,
    [0, 0.16, 0.72, 1],
    ["-17vw", "0vw", "0vw", "-31vw"],
  );

  const vinylScale = useTransform(
    smoothScroll,
    [0, 0.16, 0.74, 1],
    [0.74, 0.93, 0.95, 1.16],
  );

  const vinylOpacity = useTransform(
    smoothScroll,
    [0, 0.08, 0.82, 1],
    [0.2, 1, 0.9, 0],
  );

  const contentX = useTransform(
    smoothScroll,
    [0, 0.14, 0.74, 1],
    ["14vw", "0vw", "0vw", "30vw"],
  );

  const contentOpacity = useTransform(
    smoothScroll,
    [0, 0.08, 0.76, 0.95],
    [0, 1, 1, 0],
  );

  const orbitScale = useTransform(
    smoothScroll,
    [0, 0.18, 0.78, 1],
    [0.68, 1, 1.05, 1.6],
  );

  const orbitOpacity = useTransform(
    smoothScroll,
    [0, 0.1, 0.75, 1],
    [0, 0.7, 0.4, 0],
  );

  const waveformScaleX = useTransform(
    smoothScroll,
    [0, 0.15, 0.78, 1],
    [0.4, 1, 1.08, 1.35],
  );

  const waveformOpacity = useTransform(
    smoothScroll,
    [0, 0.12, 0.78, 1],
    [0, 0.82, 0.5, 0],
  );

  const topCurtainY = useTransform(
    smoothScroll,
    [0.8, 1],
    ["-100%", "0%"],
  );

  const bottomCurtainY = useTransform(
    smoothScroll,
    [0.8, 1],
    ["100%", "0%"],
  );

  const nextLabelOpacity = useTransform(
    smoothScroll,
    [0.88, 0.96, 1],
    [0, 1, 0],
  );

  const nextLabelY = useTransform(
    smoothScroll,
    [0.88, 0.96, 1],
    [28, 0, -16],
  );

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setAudioError("");
      audio.loop = true;
      audio.volume = AUDIO_VOLUME;
      audio.muted = false;
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.error("Listening room audio could not play:", error);
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

    const handleEnded = () => setPlaying(false);
    const handlePause = () => setPlaying(false);
    const handlePlay = () => setPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVisibility = () => {
      if (document.hidden && !audio.paused) {
        audio.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }

      if (burstTimeoutRef.current !== null) {
        window.clearTimeout(burstTimeoutRef.current);
      }

      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
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
      pointerRatioX.current = nextX / 100;
      pointerRatioY.current = nextY / 100;
      pointerX.set(nextX);
      pointerY.set(nextY);
    });
  };

  const handlePointerLeave = () => {
    pointerRatioX.current = 0.5;
    pointerRatioY.current = 0.5;
    pointerX.set(50);
    pointerY.set(50);
  };

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    setBurst({
      id: Date.now(),
      x,
      y,
    });

    if (burstTimeoutRef.current !== null) {
      window.clearTimeout(burstTimeoutRef.current);
    }

    burstTimeoutRef.current = window.setTimeout(() => {
      setBurst(null);
    }, 850);
  };

  return (
    <section
      ref={sectionRef}
      id="listening-room"
      className="relative h-[175svh] min-h-[1050px] w-full overflow-x-clip bg-white sm:h-[190svh] sm:min-h-[1200px] lg:h-[210svh] lg:min-h-[1400px] xl:h-[220svh]"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1000px 1800px",
      }}
    >
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        playsInline
        loop
        className="hidden"
        onError={() => {
          setAudioError(`Unable to load ${AUDIO_SRC}`);
          setPlaying(false);
        }}
      />

      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        className="sticky top-0 isolate h-[100svh] min-h-[520px] w-full touch-pan-y overflow-hidden bg-white text-[#0a0a0a] sm:min-h-[600px] lg:min-h-[640px]"
        style={{
          WebkitTapHighlightColor: "transparent",
          contain: "paint",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,#ffffff_0%,#f1f1ef_46%,#ffffff_100%)]" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: cursorGlow,
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025] sm:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.22) 1px,transparent 1px)",
            backgroundSize: "clamp(44px, 6vw, 72px) clamp(44px, 6vw, 72px)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%,rgba(255,255,255,0) 14%,rgba(255,255,255,0.18) 58%,rgba(255,255,255,0.92) 100%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[40%] z-[4] h-[34vh] min-h-[190px] -translate-y-1/2 sm:top-[44%] sm:h-[40vh] sm:min-h-[240px] lg:top-1/2 lg:h-[46vh] lg:min-h-[280px]"
          style={{
            scaleX: waveformScaleX,
            opacity: waveformOpacity,
          }}
        >
          <ReactiveWave
            active={isInView}
            pointerX={pointerRatioX}
            pointerY={pointerRatioY}
            reducedMotion={shouldReduceMotion}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[5]">
          {dust.map((particle) => (
            <motion.span
              key={particle.id}
              animate={
                isInView && !shouldReduceMotion
                  ? {
                      y: [12, -22, 12],
                      x: [0, 8, -4, 0],
                      opacity: [0.04, 0.5, 0.04],
                      scale: [0.7, 1.3, 0.7],
                    }
                  : {
                      opacity: 0.18,
                    }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-black"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                boxShadow:
                  particle.size > 1
                    ? "0 0 10px rgba(0,0,0,0.28)"
                    : "none",
              }}
            />
          ))}
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[37%] z-[6] aspect-square w-[min(94vw,850px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.08] sm:top-[42%] sm:w-[min(90vw,850px)] lg:left-[34%] lg:top-1/2 lg:w-[min(88vw,850px)]"
          style={{
            scale: orbitScale,
            opacity: orbitOpacity,
            boxShadow:
              "0 0 90px rgba(0,0,0,0.055),inset 0 0 90px rgba(0,0,0,0.025)",
          }}
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[8%] rounded-full border border-dashed border-black/[0.12]"
          />

         
        </motion.div>

        <motion.div
          className="relative z-20 h-full w-full"
          style={{
            scale: stageScale,
            opacity: stageOpacity,
            y: stageY,
          }}
        >
          <div className="relative mx-auto grid h-full w-full max-w-[1800px] grid-cols-1 grid-rows-[1fr_auto] items-end px-4 pb-[calc(4.25rem+env(safe-area-inset-bottom))] pt-[calc(3.5rem+env(safe-area-inset-top))] sm:px-7 sm:pb-[calc(5rem+env(safe-area-inset-bottom))] sm:pt-[calc(4rem+env(safe-area-inset-top))] lg:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.96fr)] lg:grid-rows-1 lg:items-center lg:px-12 lg:pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pt-[calc(4.5rem+env(safe-area-inset-top))] xl:px-16">
            <motion.div
              className="pointer-events-none absolute left-1/2 top-[28%] z-[2] w-[min(68vw,345px)] -translate-x-1/2 -translate-y-1/2 sm:top-[31%] sm:w-[min(61vw,455px)] md:w-[min(54vw,525px)] lg:relative lg:left-auto lg:top-auto lg:w-[min(44vw,660px)] lg:justify-self-center lg:translate-x-0 lg:translate-y-0"
              style={{
                x: vinylX,
                scale: vinylScale,
                opacity: vinylOpacity,
                rotateX: vinylTiltX,
                rotateY: vinylTiltY,
                transformPerspective: 1400,
                transformStyle: "preserve-3d",
              }}
            >
              <VinylRecord
                playing={playing}
                reducedMotion={shouldReduceMotion}
              />

              <motion.div
                aria-hidden="true"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: [12, 7, 12],
                      }
                }
                transition={{
                  duration: playing ? 2.4 : 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-[-6%] top-[5%] hidden h-[62%] w-[16%] origin-top rounded-full border-r-2 border-black/25 lg:block"
                style={{
                  transformOrigin: "50% 4%",
                }}
              >
                <div className="absolute -right-1 bottom-[-1%] h-5 w-10 rotate-[18deg] rounded-sm border border-black/20 bg-[#111] shadow-[0_0_20px_rgba(0,0,0,0.12)]" />
              </motion.div>
            </motion.div>

            <motion.div
              className="relative z-20 mx-auto flex w-full max-w-[660px] self-end flex-col items-center pb-8 text-center sm:pb-10 md:max-w-[720px] lg:self-auto lg:items-start lg:pb-0 lg:text-left"
              style={{
                x: contentX,
                opacity: contentOpacity,
              }}
            >
              <motion.div
                style={{
                  x: contentShiftX,
                  y: contentShiftY,
                }}
                className="w-full px-1 sm:px-0"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    duration: 0.85,
                    ease: premiumEase,
                  }}
                  className="mb-4 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4 lg:mb-7 lg:justify-start"
                >
                  <span className="h-px w-8 bg-black/25 sm:w-12" />
                 
                </motion.div>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 24,
                    filter: "blur(8px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.08,
                    ease: premiumEase,
                  }}
                  className="mb-2 text-[9px] font-medium uppercase tracking-[0.48em] text-black/45 sm:text-[11px] sm:tracking-[0.64em]"
                  style={{
                    fontFamily: cleanFont.style.fontFamily,
                  }}
                >
                  Music
                </motion.p>

                <motion.h2
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.94,
                    filter: "blur(12px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 1.05,
                    delay: 0.12,
                    ease: premiumEase,
                  }}
                  className="text-[clamp(3.25rem,16vw,5.75rem)] font-medium leading-[0.76] tracking-[-0.065em] text-black sm:text-[clamp(4.5rem,12vw,8rem)] sm:leading-[0.72] md:text-[clamp(5rem,10vw,9rem)] lg:text-[clamp(5.3rem,7.8vw,10.5rem)] lg:leading-[0.68] lg:tracking-[-0.075em]"
                  style={{
                    fontFamily: luxuryFont.style.fontFamily,
                  }}
                >
                  Enter
                  <span className="block font-normal italic text-black/55">
                    The Sound
                  </span>
                </motion.h2>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 26,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.85,
                    delay: 0.26,
                    ease: premiumEase,
                  }}
                  className="mx-auto mt-5 max-w-[360px] sm:mt-7 sm:max-w-[440px] lg:mx-0 lg:mt-10"
                >
                  <p
                    className="text-[11px] leading-5 text-black/55 sm:text-[13px] sm:leading-6 md:text-[14px] md:leading-7"
                    style={{
                      fontFamily: cleanFont.style.fontFamily,
                    }}
                  >
                    Experience the music behind every performance — stripped
                    back, close enough to feel, and built for the room before
                    the room exists.
                  </p>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.36,
                    ease: premiumEase,
                  }}
                  className="mt-6 flex flex-col items-center gap-4 sm:mt-8 sm:flex-row sm:gap-5 lg:mt-10 lg:justify-start"
                >
                  <motion.button
                    type="button"
                    onClick={toggleAudio}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.035,
                          }
                    }
                    whileTap={{
                      scale: 0.96,
                    }}
className="group relative inline-flex min-w-[138px] items-center justify-center overflow-hidden rounded-full border border-black/20 bg-black px-4 py-2.5 text-white shadow-[0_14px_42px_rgba(0,0,0,0.12)] sm:min-w-[154px] sm:px-5 sm:py-3"                    style={{
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 origin-left bg-[#444444]"
                      initial={false}
                      animate={{
                        scaleX: playing ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: premiumEase,
                      }}
                      style={{
                        transformOrigin: "left",
                      }}
                    />

                    <motion.span
                      animate={{
                        color: "#ffffff",
                      }}
                      transition={{
                        duration: 0.4,
                        ease: premiumEase,
                      }}
                      className="relative z-10 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-500 sm:text-[10px] sm:tracking-[0.28em]"
                      style={{
                        fontFamily: cleanFont.style.fontFamily,
                      }}
                    >
                      <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-current/25">
                        {playing ? (
                          <span className="flex gap-[3px]">
                            <span className="h-2.5 w-[2px] bg-current" />
                            <span className="h-2.5 w-[2px] bg-current" />
                          </span>
                        ) : (
                          <span className="ml-0.5 block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
                        )}
                      </span>

                      {playing ? "Pause Sound" : "Listen Now"}
                    </motion.span>
                  </motion.button>

                  <div className="flex h-8 items-center gap-[3px]">
                    {miniBars.map((height, index) => (
                      <motion.span
                        key={`mini-bar-${height}-${index}`}
                        animate={
                          playing && isInView && !shouldReduceMotion
                            ? {
                                height: [
                                  Math.max(4, height * 0.28),
                                  height,
                                  Math.max(5, height * 0.42),
                                ],
                                opacity: [0.28, 0.9, 0.4],
                              }
                            : {
                                height: Math.max(4, height * 0.28),
                                opacity: 0.28,
                              }
                        }
                        transition={{
                          duration: 0.8 + (index % 4) * 0.13,
                          delay: index * 0.035,
                          repeat: playing ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                        className="w-px rounded-full bg-black/70 sm:w-[2px]"
                      />
                    ))}
                  </div>
                </motion.div>

                <AnimatePresence>
                  {audioError && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                      }}
                      className="mt-4 text-[9px] tracking-[0.04em] text-black/45"
                      style={{
                        fontFamily: cleanFont.style.fontFamily,
                      }}
                    >
                      {audioError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 -rotate-90 items-center gap-4 lg:flex"
        >
          <span className="h-px w-14 bg-black/16" />
         
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[calc(0.6rem+env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-6 sm:gap-2 lg:bottom-7"
          animate={
            isInView && !shouldReduceMotion
              ? {
                  y: [0, 5, 0],
                }
              : undefined
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span
            className="text-[6px] font-medium uppercase tracking-[0.42em] text-black/35 sm:text-[7px]"
            style={{
              fontFamily: cleanFont.style.fontFamily,
            }}
          >
            Scroll to enter
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-black/35 to-transparent sm:h-12" />
        </motion.div>

        <AnimatePresence>
          {burst && (
            <div className="pointer-events-none absolute inset-0 z-[80]">
              {[0, 1, 2].map((ring) => (
                <motion.span
                  key={`${burst.id}-${ring}`}
                  initial={{
                    x: "-50%",
                    y: "-50%",
                    scale: 0.08,
                    opacity: 0.68,
                  }}
                  animate={{
                    scale: 1.3 + ring * 0.52,
                    opacity: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.62 + ring * 0.14,
                    delay: ring * 0.05,
                    ease: "easeOut",
                  }}
                  className="absolute aspect-square w-[120px] rounded-full border border-black/30 bg-black/[0.018] sm:w-[190px]"
                  style={{
                    left: burst.x,
                    top: burst.y,
                    boxShadow:
                      ring === 0
                        ? "0 0 45px rgba(0,0,0,0.13)"
                        : "none",
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[90] h-1/2 bg-white"
          style={{
            y: topCurtainY,
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[90] h-1/2 bg-white"
          style={{
            y: bottomCurtainY,
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[91] w-full max-w-[92vw] -translate-x-1/2 -translate-y-1/2 px-4 text-center"
          style={{
            opacity: nextLabelOpacity,
            y: nextLabelY,
          }}
        >
          <p
            className="text-[7px] uppercase tracking-[0.62em] text-black/38 sm:text-[8px]"
            style={{
              fontFamily: cleanFont.style.fontFamily,
            }}
          >
            The room opens
          </p>
          <p
            className="mt-3 text-[clamp(2.4rem,8vw,6rem)] font-medium italic leading-none tracking-[-0.045em] text-black"
            style={{
              fontFamily: luxuryFont.style.fontFamily,
            }}
          >
            Next Experience
          </p>
        </motion.div>

        <div className="absolute bottom-0 left-0 z-[95] h-px w-full bg-black/[0.08]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-black/10 via-black/90 to-black/10 shadow-[0_0_12px_rgba(0,0,0,0.22)]"
            style={{
              scaleX: smoothScroll,
            }}
          />
        </div>
      </div>
    </section>
  );
}