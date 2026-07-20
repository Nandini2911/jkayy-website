"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SCENE_DURATION = 5400;
const CROSSFADE_DURATION = 1400;

type VideoLayer = "a" | "b";

type Scene = {
  name: string;
  number: string;
  src: string;
  poster: string;
  position: string;
};

const scenes: Scene[] = [
  {
    name: "The Artist",
    number: "01",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/Untitled_design_awrbkq.mp4",
    poster: "/images/jitesh-dj-cover.webp",
    position: "center center",
  },
  {
    name: "The Discipline",
    number: "02",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784203712/k1_1_oegxxn.mp4",
    poster: "/images/jitesh-gym-cover.webp",
    position: "center center",
  },
  {
    name: "The Explorer",
    number: "03",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784116924/Untitled_design_2_ftmu1d.mp4",
    poster: "/images/jitesh-mountains-cover.webp",
    position: "center center",
  },
  {
    name: "The Journey",
    number: "04",

    // Replace this with your actual travel video URL.
    // Right now it is the same video as Scene 01.
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/Untitled_design_awrbkq.mp4",

    poster: "/images/jitesh-travel-cover.webp",
    position: "center center",
  },
  {
    name: "The Entrepreneur",
    number: "05",
    src: "/videos/jitesh-aftermatch.mp4",
    poster: "/images/jitesh-aftermatch-cover.webp",
    position: "center center",
  },
];

const roles = [
  "DJ",
  "Entrepreneur",
  "Fitness Enthusiast",
  "Explorer",
];

type MaskRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

function MaskReveal({
  children,
  delay = 0,
  className = "",
}: MaskRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                y: "112%",
                opacity: 0,
              }
        }
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: reduceMotion ? 0 : 1.05,
          delay: reduceMotion ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function BehindTheNameHero() {
  const reduceMotion = useReducedMotion();

  const videoARef = useRef<HTMLVideoElement | null>(
    null,
  );

  const videoBRef = useRef<HTMLVideoElement | null>(
    null,
  );

  const transitionLocked = useRef(false);

  const failedScenesRef = useRef<Set<number>>(
    new Set(),
  );

  const skipTimeoutRef = useRef<number | null>(
    null,
  );

  const [activeLayer, setActiveLayer] =
    useState<VideoLayer>("a");

  const [activeScene, setActiveScene] = useState(0);

  const [layerAIndex, setLayerAIndex] = useState(0);

  /*
    Keep both layers at Scene 0 initially.

    During the first transition, layer B changes
    from 0 to 1. This forces React to reload the
    second video and triggers onLoadedData.
  */
  const [layerBIndex, setLayerBIndex] = useState(0);

  const [pendingLayer, setPendingLayer] =
    useState<VideoLayer | null>(null);

  const getNextScene = useCallback(
    (currentScene: number) => {
      for (
        let offset = 1;
        offset <= scenes.length;
        offset += 1
      ) {
        const candidate =
          (currentScene + offset) % scenes.length;

        if (
          !failedScenesRef.current.has(candidate)
        ) {
          return candidate;
        }
      }

      return currentScene;
    },
    [],
  );

  const queueNextScene = useCallback(() => {
    if (transitionLocked.current) return;

    const nextScene = getNextScene(activeScene);

    if (nextScene === activeScene) return;

    transitionLocked.current = true;

    const inactiveLayer: VideoLayer =
      activeLayer === "a" ? "b" : "a";

    setPendingLayer(inactiveLayer);

    if (inactiveLayer === "a") {
      setLayerAIndex(nextScene);
    } else {
      setLayerBIndex(nextScene);
    }
  }, [
    activeLayer,
    activeScene,
    getNextScene,
  ]);

  const handleLayerReady = useCallback(
    async (layer: VideoLayer) => {
      if (pendingLayer !== layer) return;

      const incomingVideo =
        layer === "a"
          ? videoARef.current
          : videoBRef.current;

      const outgoingVideo =
        activeLayer === "a"
          ? videoARef.current
          : videoBRef.current;

      if (!incomingVideo) {
        transitionLocked.current = false;
        setPendingLayer(null);
        return;
      }

      const incomingScene =
        layer === "a"
          ? layerAIndex
          : layerBIndex;

      try {
        incomingVideo.currentTime = 0;
        await incomingVideo.play();
      } catch {
        // The poster remains visible when autoplay
        // is blocked by the browser.
      }

      requestAnimationFrame(() => {
        setActiveLayer(layer);
        setActiveScene(incomingScene);
        setPendingLayer(null);

        transitionLocked.current = false;
      });

      window.setTimeout(() => {
        if (
          outgoingVideo &&
          outgoingVideo !== incomingVideo
        ) {
          outgoingVideo.pause();
        }
      }, reduceMotion ? 100 : CROSSFADE_DURATION);
    },
    [
      activeLayer,
      layerAIndex,
      layerBIndex,
      pendingLayer,
      reduceMotion,
    ],
  );

  const handleLayerError = useCallback(
    (layer: VideoLayer) => {
      const failedScene =
        layer === "a"
          ? layerAIndex
          : layerBIndex;

      failedScenesRef.current.add(failedScene);

      if (
        pendingLayer === layer ||
        activeLayer === layer
      ) {
        transitionLocked.current = false;
        setPendingLayer(null);

        if (skipTimeoutRef.current) {
          window.clearTimeout(
            skipTimeoutRef.current,
          );
        }

        skipTimeoutRef.current =
          window.setTimeout(() => {
            queueNextScene();
          }, 250);
      }
    },
    [
      activeLayer,
      layerAIndex,
      layerBIndex,
      pendingLayer,
      queueNextScene,
    ],
  );

  useEffect(() => {
    const firstVideo = videoARef.current;

    if (!firstVideo) return;

    firstVideo.play().catch(() => {
      // Poster remains visible when autoplay
      // is blocked.
    });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(
      queueNextScene,
      reduceMotion
        ? SCENE_DURATION + 2500
        : SCENE_DURATION,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [queueNextScene, reduceMotion]);

  useEffect(() => {
    return () => {
      if (skipTimeoutRef.current) {
        window.clearTimeout(
          skipTimeoutRef.current,
        );
      }
    };
  }, []);

  const crossfadeClass = reduceMotion
    ? "duration-300"
    : "duration-[1400ms]";

  return (
    <section
      id="behind-the-name"
      className="
        relative
        isolate
        min-h-[100svh]
        w-full
        overflow-hidden
        bg-[#efefeb]
        text-[#111111]
      "
    >
      {/* VIDEO LAYER A */}

      <video
        ref={videoARef}
        key={`video-a-${layerAIndex}`}
        src={scenes[layerAIndex].src}
        muted
        playsInline
        loop
        autoPlay
        preload={
          activeLayer === "a" ||
          pendingLayer === "a"
            ? "auto"
            : "metadata"
        }
        poster={scenes[layerAIndex].poster}
        disablePictureInPicture
        controlsList="nodownload noremoteplayback"
        onLoadedData={() =>
          handleLayerReady("a")
        }
        onError={() => handleLayerError("a")}
        className={`
          absolute
          inset-0
          z-0
          h-full
          w-full
          object-cover
          transition-opacity
          ease-in-out
          ${crossfadeClass}
          ${
            activeLayer === "a"
              ? "opacity-100"
              : "opacity-0"
          }
        `}
        style={{
          objectPosition:
            scenes[layerAIndex].position,
          filter:
            "grayscale(100%) contrast(1.12) brightness(0.82)",
        }}
        aria-hidden="true"
      />

      {/* VIDEO LAYER B */}

      <video
        ref={videoBRef}
        key={`video-b-${layerBIndex}`}
        src={scenes[layerBIndex].src}
        muted
        playsInline
        loop
        preload={
          activeLayer === "b" ||
          pendingLayer === "b"
            ? "auto"
            : "metadata"
        }
        poster={scenes[layerBIndex].poster}
        disablePictureInPicture
        controlsList="nodownload noremoteplayback"
        onLoadedData={() =>
          handleLayerReady("b")
        }
        onError={() => handleLayerError("b")}
        className={`
          absolute
          inset-0
          z-0
          h-full
          w-full
          object-cover
          transition-opacity
          ease-in-out
          ${crossfadeClass}
          ${
            activeLayer === "b"
              ? "opacity-100"
              : "opacity-0"
          }
        `}
        style={{
          objectPosition:
            scenes[layerBIndex].position,
          filter:
            "grayscale(100%) contrast(1.12) brightness(0.82)",
        }}
        aria-hidden="true"
      />

      {/* VERY LIGHT VIDEO WASH */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
        "
        style={{
          background: "rgba(245,245,241,0.08)",
        }}
      />

      {/* LEFT TEXT READABILITY GRADIENT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
        "
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(246,246,242,0.96) 0%,
              rgba(246,246,242,0.91) 18%,
              rgba(246,246,242,0.77) 34%,
              rgba(246,246,242,0.38) 51%,
              rgba(246,246,242,0.08) 69%,
              transparent 84%
            )
          `,
        }}
      />

      {/* RIGHT SHADOW — REDUCED */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
        "
        style={{
          background: `
            radial-gradient(
              circle at 80% 42%,
              transparent 0%,
              transparent 55%,
              rgba(0,0,0,0.012) 78%,
              rgba(0,0,0,0.055) 100%
            )
          `,
        }}
      />

      {/* TOP FADE — REDUCED */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[3]
          h-[11%]
        "
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(246,246,242,0.32) 0%,
              rgba(246,246,242,0.10) 55%,
              transparent 100%
            )
          `,
        }}
      />

      {/* BOTTOM FADE — REDUCED */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[3]
          h-[21%]
        "
        style={{
          background: `
            linear-gradient(
              0deg,
              rgba(244,244,240,0.58) 0%,
              rgba(244,244,240,0.27) 38%,
              rgba(244,244,240,0.07) 72%,
              transparent 100%
            )
          `,
        }}
      />

      {/* SUBTLE GRID */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[4]
          opacity-[0.04]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.45) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,0,0,0.45) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 16%, black 86%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 16%, black 86%, transparent)",
        }}
      />

      {/* SUBTLE GRAIN */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[7]
          opacity-[0.025]
          mix-blend-multiply
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.7'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ACTIVE SCENE LABEL */}

      <div
        className="
          absolute
          right-5
          top-[27%]
          z-30
          hidden
          items-center
          gap-4
          lg:flex
          lg:right-12
        "
      >
        <span
          className="
            h-px
            w-12
            bg-black/35
          "
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{
              opacity: 0,
              y: 12,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -12,
              filter: "blur(5px)",
            }}
            transition={{
              duration: reduceMotion
                ? 0
                : 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="min-w-44"
          >
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-black/40
              "
              style={{
                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              Scene {scenes[activeScene].number}
            </p>

            <p
              className="
                mt-2
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-black/75
              "
              style={{
                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              {scenes[activeScene].name}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MAIN CONTENT */}

      <div
        className="
          relative
          z-20
          flex
          min-h-[100svh]
          w-full
          items-end
          px-5
          pb-24
          pt-32
          sm:px-8
          sm:pb-28
          lg:px-12
          lg:pb-16
        "
      >
        <div className="w-full">
          {/* SMALL LABEL */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-3
              sm:mb-7
            "
          >
            <motion.span
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 1,
                delay: reduceMotion
                  ? 0
                  : 0.48,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                h-px
                w-10
                origin-left
                bg-black/60
                sm:w-14
              "
            />

            <MaskReveal delay={0.42}>
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.34em]
                  text-black/55
                  sm:text-[9px]
                "
                style={{
                  fontFamily:
                    cleanFont.style.fontFamily,
                }}
              >
                The man behind the sound
              </p>
            </MaskReveal>
          </div>

          {/* MAIN TITLE */}

          <h1
            className="
              max-w-[1420px]
              select-none
              pb-[0.08em]
              text-[clamp(4rem,11.2vw,11.6rem)]
              font-medium
              uppercase
              leading-[0.72]
              tracking-[-0.065em]
              text-[#101010]
            "
            style={{
              fontFamily:
                luxuryFont.style.fontFamily,
              textShadow:
                "0 18px 55px rgba(255,255,255,0.3)",
            }}
          >
            <MaskReveal delay={0.52}>
              <span className="block">
                Behind
              </span>
            </MaskReveal>

            <MaskReveal delay={0.65}>
              <span
                className="
                  block
                  font-normal
                  italic
                  text-black/55
                "
                style={{
                  textTransform: "none",
                }}
              >
                The Name
              </span>
            </MaskReveal>
          </h1>

          {/* BOTTOM INFORMATION */}

          <div
            className="
              mt-7
              grid
              gap-7
              border-t
              border-black/20
              pt-6
              sm:mt-9
              sm:grid-cols-[minmax(0,1fr)_auto]
              sm:items-end
              sm:gap-12
              sm:pt-7
              lg:mt-10
            "
          >
            <div>
              <MaskReveal delay={0.86}>
                <h2
                  className="
                    text-[clamp(1.65rem,3vw,2.85rem)]
                    font-medium
                    uppercase
                    leading-none
                    tracking-[-0.025em]
                    text-[#111111]
                  "
                  style={{
                    fontFamily:
                      luxuryFont.style.fontFamily,
                  }}
                >
                  JKAYY
                </h2>
              </MaskReveal>

              <MaskReveal delay={0.96}>
                <p
                  className="
                    mt-3
                    max-w-xl
                    text-[13px]
                    font-light
                    leading-7
                    text-black/60
                    sm:text-[14px]
                  "
                  style={{
                    fontFamily:
                      cleanFont.style.fontFamily,
                  }}
                >
                  The story behind the performances.
                  A life shaped by music, discipline,
                  ambition and movement.
                </p>
              </MaskReveal>
            </div>

            <MaskReveal delay={1.06}>
              <div
                className="
                  flex
                  max-w-2xl
                  flex-wrap
                  gap-x-5
                  gap-y-3
                  sm:justify-end
                  lg:gap-x-7
                "
              >
                {roles.map((role, index) => (
                  <div
                    key={role}
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    {index !== 0 && (
                      <span
                        className="
                          hidden
                          h-1
                          w-1
                          rounded-full
                          bg-black/35
                          sm:block
                        "
                      />
                    )}

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-black/65
                        sm:text-[9px]
                      "
                      style={{
                        fontFamily:
                          cleanFont.style.fontFamily,
                      }}
                    >
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </MaskReveal>
          </div>
        </div>
      </div>

      {/* MOBILE SCENE LABEL */}

      <div
        className="
          absolute
          right-5
          top-24
          z-30
          lg:hidden
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
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
              y: -8,
            }}
            transition={{
              duration: reduceMotion
                ? 0
                : 0.55,
            }}
            className="text-right"
          >
            <p
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-black/40
              "
              style={{
                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              Scene {scenes[activeScene].number}
            </p>

            <p
              className="
                mt-1
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-black/65
              "
              style={{
                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              {scenes[activeScene].name}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SCROLL INDICATOR */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: reduceMotion ? 0 : 1,
          delay: reduceMotion ? 0 : 1.45,
        }}
        className="
          absolute
          bottom-5
          left-1/2
          z-30
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
          sm:bottom-7
        "
      >
        <span
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.34em]
            text-black/45
          "
          style={{
            fontFamily: cleanFont.style.fontFamily,
          }}
        >
          Scroll
        </span>

        <div
          className="
            relative
            h-10
            w-px
            overflow-hidden
            bg-black/20
            sm:h-12
          "
        >
          <motion.span
            animate={
              reduceMotion
                ? {
                    opacity: 0.75,
                  }
                : {
                    y: ["-100%", "130%"],
                    opacity: [0, 1, 0],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-x-0
              top-0
              h-1/2
              bg-gradient-to-b
              from-transparent
              via-black
              to-transparent
              shadow-[0_0_10px_rgba(0,0,0,0.5)]
            "
          />
        </div>
      </motion.div>

      {/* SCENE PROGRESS */}

      <div
        className="
          absolute
          bottom-7
          right-5
          z-30
          hidden
          items-center
          gap-2
          sm:flex
          sm:right-8
          lg:right-12
        "
      >
        {scenes.map((scene, index) => (
          <div
            key={`${scene.name}-${index}`}
            className="
              relative
              h-px
              w-5
              overflow-hidden
              bg-black/20
              lg:w-7
            "
          >
            {index === activeScene && (
              <motion.span
                key={`progress-${activeScene}`}
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0.2
                    : SCENE_DURATION / 1000,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-0
                  origin-left
                  bg-black/85
                  shadow-[0_0_8px_rgba(0,0,0,0.4)]
                "
              />
            )}
          </div>
        ))}
      </div>

      {/* TOP BORDER */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-30
          h-px
          w-[84%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-black/20
          to-transparent
        "
      />

      {/* BOTTOM BORDER */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-30
          h-px
          w-[84%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-black/20
          to-transparent
        "
      />
    </section>
  );
}