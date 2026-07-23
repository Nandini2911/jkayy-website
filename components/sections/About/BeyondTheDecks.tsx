"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";





type LifestyleItem = {

  title: string;
  subtitle: string;
  
  video: string;
  poster: string;
  aspectRatio: string;
  objectPosition?: string;
};

const lifestyleItems: LifestyleItem[] = [
  {

    title: "Inside The Studio",
    subtitle: "Where every sound begins.",
  
    video: "/",
    poster: "/images/chica.webp",
    aspectRatio: "0.72",
  },
  {
  
    title: "Built By Discipline",
    subtitle: "The work continues when nobody is watching.",
   
    video: "",
    poster: "/images/jkgym.webp",
    aspectRatio: "1",
  },
  {
  
    title: "Miles Away",
    subtitle: "New roads. New perspective.",
   
    video: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784724020/jkayyofficial_10_fp9fqy.mp4",
    poster: "",
    aspectRatio: "0.63",
  },
  {
  
    title: "Above The Noise",
    subtitle: "Finding silence at a higher altitude.",

    video: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784724369/jkayyofficial_11_yp2mmu.mp4",
    poster: "",
    aspectRatio: "0.82",
  },
  {
  
    title: "Beyond The Artist",
    subtitle: "The ideas and vision behind the name.",

    video: "",
    poster: "/images/beyond.webp",
    aspectRatio: "1.28",
  },
  {
   
    title: "Before The Lights",
    subtitle: "The moments the audience never sees.",
  
    video: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784724758/jkayyofficial_12_w4nzbe.mp4",
    poster: "",
    aspectRatio: "0.68",
  },
 
  {
  
    title: "The Long Way Up",
    subtitle: "Every climb changes something within.",

    video: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784724961/jkayyofficial_14_odimnt.mp4",
    poster: "",
    aspectRatio: "0.58",
    objectPosition: "center 35%",
  },
  {
   
    title: "On The Move",
    subtitle: "Collecting stories across unfamiliar places.",
    
    video: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784725273/jkayyofficial_15_ubh3vt.mp4",
    poster: "",
    aspectRatio: "1.14",
  },
  {
    
    title: "Another Rep",
    subtitle: "Consistency before motivation.",
  
    video: "",
    poster: "/images/jkgym2.webp",
    aspectRatio: "0.76",
  },
  {
   
    title: "Building More",
    subtitle: "Creating beyond music and performance.",
   
    video: "",
    poster: "/images/afterrmatch.png",
    aspectRatio: "0.66",
  },
  {
   
    title: "Seconds Before",
    subtitle: "A final pause before stepping on stage.",
    
    video: "",
    poster: "/images/featured-reel-poster.JPG",
    aspectRatio: "1.04",
  },
 {
  title: "Seconds Before",
    subtitle: "A final pause before stepping on stage.",
    
    video: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784537170/jkayyofficial_3_ggonwj.mp4",
    poster: "",
    aspectRatio: "1.04",
 }
];

type LifestyleCardProps = {
  item: LifestyleItem;
  index: number;
  isMobile: boolean;
  isSmallMobile: boolean;
  cardGap: number;
};

function LifestyleCard({
  item,
  index,
  isMobile,
  isSmallMobile,
  cardGap,
}: LifestyleCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reduceMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    index % 2 === 0 ? [28, 0, -28] : [18, 0, -18],
  );

  const smoothY = useSpring(rawY, {
    stiffness: 82,
    damping: 28,
    mass: 0.55,
    restDelta: 0.001,
  });

  const rawRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    index % 3 === 0 ? [-0.55, 0, 0.55] : [0.35, 0, -0.35],
  );

  const smoothRotate = useSpring(rawRotate, {
    stiffness: 90,
    damping: 30,
    mass: 0.5,
  });

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;

    if (!card || !video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "auto";

    const safelyPlay = () => {
      video.muted = true;
      video.defaultMuted = true;

      video.play().catch(() => {
        // The poster remains visible if autoplay is delayed.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.12 &&
          !document.hidden
        ) {
          safelyPlay();
        } else {
          video.pause();
        }
      },
      {
        threshold: [0, 0.12, 0.35, 0.7],
        rootMargin: "140px 0px 140px 0px",
      },
    );

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        const rect = card.getBoundingClientRect();

        if (
          rect.bottom > -140 &&
          rect.top < window.innerHeight + 140
        ) {
          safelyPlay();
        }
      }
    };

    observer.observe(card);
    document.addEventListener(
      "visibilitychange",
      handleVisibility,
    );

    return () => {
      observer.disconnect();
      document.removeEventListener(
        "visibilitychange",
        handleVisibility,
      );
      video.pause();
    };
  }, []);

  const desktopRatios = [
    "4 / 5",
    "1 / 1",
    "3 / 4",
    "5 / 6",
    "1 / 1",
    "4 / 5",
  ];

  const displayRatio = isMobile
    ? item.aspectRatio
    : desktopRatios[index % desktopRatios.length];

  const showDetails = isMobile || isHovered;

  return (
    <motion.article
      ref={cardRef}
      layout="position"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 62,
              x: index % 2 === 0 ? -16 : 16,
              scale: 0.975,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: isMobile ? 0.08 : 0.12,
        margin: "0px 0px -4% 0px",
      }}
      exit={{
        opacity: 0,
        y: 20,
        scale: 0.985,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.9,
        delay: reduceMotion ? 0 : (index % 4) * 0.055,
        ease: [0.16, 1, 0.3, 1],
        layout: {
          type: "spring",
          stiffness: 120,
          damping: 24,
          mass: 0.7,
        },
      }}
      style={{
        display: "inline-block",
        width: "100%",
        margin: `0 0 ${cardGap}px`,
        breakInside: "avoid",
        verticalAlign: "top",
      }}
    >
      <motion.div
        style={
          reduceMotion
            ? {
                width: "100%",
              }
            : {
                width: "100%",
                y: smoothY,
                rotate: smoothRotate,
              }
        }
      >
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={
            reduceMotion || isMobile
              ? undefined
              : {
                  y: -8,
                  scale: 1.012,
                }
          }
          whileTap={
            reduceMotion
              ? undefined
              : {
                  scale: 0.992,
                }
          }
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: displayRatio,
            minHeight: isSmallMobile
              ? "420px"
              : isMobile
                ? "470px"
                : "340px",
            maxHeight: isMobile ? "none" : "820px",
            overflow: "hidden",
            isolation: "isolate",
            cursor: "pointer",
            backgroundColor: "#111111",
            backgroundImage: `url("${item.poster}")`,
            backgroundSize: "cover",
            backgroundPosition:
              item.objectPosition || "center center",
            border: "1px solid rgba(17,17,17,0.12)",
            borderRadius: isSmallMobile
              ? "14px"
              : isMobile
                ? "16px"
                : "clamp(16px, 1.3vw, 23px)",
            boxShadow: isHovered
              ? "0 34px 85px rgba(0,0,0,0.17), 0 4px 14px rgba(0,0,0,0.08)"
              : "0 22px 58px rgba(0,0,0,0.105), 0 2px 8px rgba(0,0,0,0.045)",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <motion.video
            ref={videoRef}
            src={item.video}
            poster={item.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noremoteplayback"
            aria-label={item.title}
            onLoadedMetadata={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => {
              setVideoReady(true);

              const video = videoRef.current;
              const card = cardRef.current;

              if (!video || !card || document.hidden) {
                return;
              }

              const rect = card.getBoundingClientRect();

              if (
                rect.bottom > -140 &&
                rect.top < window.innerHeight + 140
              ) {
                video.play().catch(() => undefined);
              }
            }}
            onError={() => {
              /*
               * Never hide the card when a video URL fails.
               * Its poster/background remains visible.
               */
              setVideoReady(true);
            }}
            initial={false}
            animate={{
              opacity: 1,
              scale: isHovered && !isMobile ? 1.075 : 1.015,
              filter:
                isHovered && !isMobile
                  ? "saturate(1) contrast(1.02) brightness(0.94)"
                  : "saturate(0.84) contrast(1.04) brightness(0.88)",
            }}
            transition={{
              scale: {
                duration: 1.15,
                ease: [0.16, 1, 0.3, 1],
              },
              filter: {
                duration: 0.7,
                ease: "easeOut",
              },
            }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition:
                item.objectPosition || "center center",
              backgroundColor: "#111111",
            }}
          />

          <AnimatePresence>
            {!videoReady && (
              <motion.div
                initial={{
                  opacity: 0.55,
                }}
                animate={{
                  opacity: [0.35, 0.7, 0.35],
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 1.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.015), rgba(255,255,255,0.08), rgba(255,255,255,0.015))",
                }}
              />
            )}
          </AnimatePresence>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              pointerEvents: "none",
              background: `
                linear-gradient(
                  180deg,
                  rgba(0,0,0,0.08) 0%,
                  rgba(0,0,0,0.01) 37%,
                  rgba(0,0,0,0.12) 58%,
                  rgba(0,0,0,0.88) 100%
                )
              `,
            }}
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity:
                isHovered && !isMobile ? 1 : 0,
              backgroundPosition:
                isHovered && !isMobile
                  ? "-45% center"
                  : "130% center",
            }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              pointerEvents: "none",
              background: `
                radial-gradient(
                  circle at 50% 50%,
                  transparent 18%,
                  rgba(0,0,0,0.2) 100%
                ),
                linear-gradient(
                  120deg,
                  transparent 35%,
                  rgba(255,255,255,0.14) 50%,
                  transparent 65%
                )
              `,
              backgroundSize: "100% 100%, 250% 100%",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: isSmallMobile
                ? "15px"
                : isMobile
                  ? "18px"
                  : "clamp(19px, 1.6vw, 29px)",
            }}
          >
            

            <motion.div
              animate={{
                opacity: showDetails ? 1 : 0,
                x: showDetails ? 0 : -10,
                y: showDetails ? 0 : 10,
                rotate: showDetails ? 0 : -16,
                scale: showDetails ? 1 : 0.9,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 22,
              }}
              style={{
                display: "grid",
                width: isMobile ? "38px" : "46px",
                height: isMobile ? "38px" : "46px",
                color: "#111111",
                placeItems: "center",
                background: "rgba(255,255,255,0.95)",
                borderRadius: "50%",
                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.2)",
              }}
            >
              <ArrowUpRight
                size={isMobile ? 16 : 19}
                strokeWidth={1.5}
              />
            </motion.div>
          </div>

          <motion.div
            animate={{
              y: showDetails ? 0 : 8,
            }}
            transition={{
              type: "spring",
              stiffness: 210,
              damping: 25,
            }}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 5,
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "auto minmax(0,1fr)",
              gap: isMobile ? "7px" : "15px",
              alignItems: "end",
              padding: isSmallMobile
                ? "20px 17px"
                : isMobile
                  ? "24px 20px"
                  : "clamp(24px, 2.2vw, 38px)",
              color: "#ffffff",
              textShadow:
                "0 3px 18px rgba(0,0,0,0.48)",
            }}
          >
            {!isMobile && (
              <span
                style={{
                  marginBottom: "7px",
                  fontSize: "7px",
                  fontWeight: 600,
                  letterSpacing: "0.17em",
                  opacity: 0.58,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            )}

            <div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontFamily:
                    '"Bodoni Moda", "Times New Roman", serif',
                  fontSize: isSmallMobile
                    ? "clamp(2rem, 9vw, 3rem)"
                    : isMobile
                      ? "clamp(2.25rem, 8vw, 3.6rem)"
                      : "clamp(2.15rem, 2.7vw, 3.5rem)",
                  fontWeight: 400,
                  lineHeight: 0.92,
                  letterSpacing: "-0.052em",
                }}
              >
                {item.title}
              </h3>

              <motion.p
                animate={{
                  opacity: showDetails ? 0.74 : 0,
                  y: showDetails ? 0 : 10,
                }}
                transition={{
                  duration: 0.46,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  maxWidth: "340px",
                  margin: 0,
                  fontSize: isMobile
                    ? "11px"
                    : "clamp(10px, 0.78vw, 13px)",
                  lineHeight: 1.55,
                }}
              >
                {item.subtitle}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function BeyondTheDecks() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealStageRef = useRef<HTMLDivElement>(null);
  const resizeFrame = useRef<number | null>(null);

  const generatedId = useId();
  const reduceMotion = useReducedMotion();

  const maskId = `jk-reveal-${generatedId.replace(/:/g, "")}`;

  const [screenSize, setScreenSize] = useState({
    width: 1440,
    height: 900,
  });



  useEffect(() => {
    const updateScreenSize = () => {
      if (resizeFrame.current) {
        cancelAnimationFrame(resizeFrame.current);
      }

      resizeFrame.current = requestAnimationFrame(() => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize, {
      passive: true,
    });

    window.addEventListener(
      "orientationchange",
      updateScreenSize,
    );

    return () => {
      if (resizeFrame.current) {
        cancelAnimationFrame(resizeFrame.current);
      }

      window.removeEventListener(
        "resize",
        updateScreenSize,
      );

      window.removeEventListener(
        "orientationchange",
        updateScreenSize,
      );
    };
  }, []);

  const screenWidth = screenSize.width;
  const screenHeight = screenSize.height;

  const isSmallMobile = screenWidth <= 480;
  const isMobile = screenWidth <= 767;
  const isTablet =
    screenWidth > 767 && screenWidth <= 1100;
  const isCompactDesktop =
    screenWidth > 1100 && screenWidth <= 1380;
  const isLargeDesktop = screenWidth >= 1760;
  const isShortViewport =
    screenWidth > 767 && screenHeight <= 740;

  const columnCount = isMobile
    ? 1
    : isTablet
      ? 2
      : isLargeDesktop
        ? 4
        : 3;

  const cardGap = isSmallMobile
    ? 13
    : isMobile
      ? 16
      : isTablet
        ? 18
        : isCompactDesktop
          ? 20
          : 26;

  const horizontalPadding = isSmallMobile
    ? 12
    : isMobile
      ? 18
      : isTablet
        ? 30
        : isCompactDesktop
          ? 38
          : 52;

  const { scrollYProgress: revealProgress } = useScroll({
    target: revealStageRef,
    offset: ["start start", "end end"],
  });

  const smoothRevealProgress = useSpring(revealProgress, {
    stiffness: 72,
    damping: 29,
    mass: 0.34,
    restDelta: 0.0008,
  });

  const revealMotionProgress = reduceMotion
    ? revealProgress
    : smoothRevealProgress;

  const jkScale = useTransform(
    revealMotionProgress,
    [0, 0.06, 0.27, 0.49, 0.7, 0.88, 1],
    [
      isMobile ? 0.34 : 0.29,
      isMobile ? 0.34 : 0.29,
      isMobile ? 3.6 : 3.1,
      isMobile ? 10.5 : 9,
      isMobile ? 25 : 21,
      isMobile ? 52 : 46,
      isMobile ? 58 : 52,
    ],
  );

  const whiteJKOpacity = useTransform(
    revealMotionProgress,
    [0, 0.055, 0.145, 0.23],
    [1, 1, 0.24, 0],
  );

  const coverOpacity = useTransform(
    revealMotionProgress,
    [0, 0.72, 0.92, 1],
    [1, 1, 0, 0],
  );

  const scrollHintOpacity = useTransform(
    revealMotionProgress,
    [0, 0.06, 0.18],
    [1, 1, 0],
  );

  const introScale = useTransform(
    revealMotionProgress,
    [0, 0.5, 1],
    [1.055, 1.018, 1],
  );

  const introOpacity = useTransform(
    revealMotionProgress,
    [0, 0.14, 0.52, 1],
    [0.58, 0.72, 0.94, 1],
  );

  const backgroundTextOpacity = useTransform(
    revealMotionProgress,
    [0, 0.5, 1],
    [0.02, 0.045, 0.06],
  );

  

  

  const revealStageHeight = reduceMotion
    ? "100svh"
    : isSmallMobile
      ? "176svh"
      : isMobile
        ? "172svh"
        : isTablet
          ? "165vh"
          : isShortViewport
            ? "168vh"
            : "160vh";

  const introHeadingSize = isSmallMobile
    ? "clamp(4.25rem, 21vw, 6.4rem)"
    : isMobile
      ? "clamp(5.2rem, 18vw, 8rem)"
      : isTablet
        ? "clamp(6.8rem, 12vw, 10rem)"
        : "clamp(7.3rem, 10.6vw, 11.5rem)";

  return (
    <motion.section
      ref={sectionRef}
      id="beyond-the-decks"
      style={{
        position: "relative",
        width: "100%",
        overflow: "clip",
        isolation: "isolate",
        color: "#111111",
        background: "#ffffff",
      }}
    >
      <div
        ref={revealStageRef}
        style={{
          position: "relative",
          zIndex: 6,
          width: "100%",
          height: revealStageHeight,
          background: "#ffffff",
        }}
      >
        <div
          style={{
            position: reduceMotion ? "relative" : "sticky",
            top: 0,
            width: "100%",
            height: "100svh",
            minHeight: isSmallMobile ? "560px" : "100svh",
            overflow: "hidden",
            isolation: "isolate",
            background: "#ffffff",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              overflow: "hidden",
              color: "#111111",
              background: `
                radial-gradient(
                  circle at 82% 10%,
                  rgba(0,0,0,0.045),
                  transparent 27%
                ),
                radial-gradient(
                  circle at 16% 90%,
                  rgba(0,0,0,0.028),
                  transparent 31%
                ),
                #ffffff
              `,
              scale: reduceMotion ? 1 : introScale,
              opacity: reduceMotion ? 1 : introOpacity,
              willChange: "transform, opacity",
            }}
          >
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: isMobile ? "20%" : "13%",
                left: "50%",
                zIndex: 0,
                width: "max-content",
                color: "#111111",
                fontSize: isMobile
                  ? "41vw"
                  : "clamp(150px, 23vw, 420px)",
                fontWeight: 900,
                lineHeight: 0.75,
                letterSpacing: "-0.095em",
                pointerEvents: "none",
                translateX: "-50%",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "1px currentColor",
                userSelect: "none",
                opacity: backgroundTextOpacity,
              }}
            >
              BEYOND
            </motion.div>

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                width: "100%",
                height: "100%",
                minHeight: "100svh",
                alignItems: "center",
                boxSizing: "border-box",
                padding: isSmallMobile
                  ? "86px 18px 66px"
                  : isMobile
                    ? "96px 24px 72px"
                    : isTablet
                      ? "100px 38px 86px"
                      : "110px 4vw 96px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: "100%",
                  maxWidth: "1540px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "11px" : "18px",
                    marginBottom: isSmallMobile
                      ? "48px"
                      : isMobile
                        ? "58px"
                        : "clamp(52px, 6vw, 92px)",
                    fontSize: isMobile ? "8px" : "10px",
                    lineHeight: 1,
                    letterSpacing: "0.21em",
                    textTransform: "uppercase",
                    opacity: 0.58,
                  }}
                >
                 

                 

                  
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      isTablet || isMobile
                        ? "1fr"
                        : "minmax(0,1.55fr) minmax(280px,0.52fr)",
                    gap: isMobile
                      ? "38px"
                      : isTablet
                        ? "46px"
                        : "clamp(64px, 9vw, 160px)",
                    alignItems: "end",
                  }}
                >
                  <h2
                    style={{
                      maxWidth: "1080px",
                      margin: 0,
                      fontFamily:
                        '"Bodoni Moda", "Times New Roman", serif',
                      fontSize: introHeadingSize,
                      fontWeight: 400,
                      lineHeight: isMobile ? 0.82 : 0.76,
                      letterSpacing: "-0.078em",
                    }}
                  >
                    Beyond
                    <br />
                    <em
                      style={{
                        fontWeight: 400,
                        opacity: 0.42,
                      }}
                    >
                      the decks.
                    </em>
                  </h2>

                  <div
                    style={{
                      maxWidth: isTablet
                        ? "560px"
                        : "440px",
                      paddingBottom: isMobile ? 0 : "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: isMobile
                          ? "0 0 30px"
                          : "0 0 42px",
                        fontSize: isMobile
                          ? "12px"
                          : "clamp(14px, 1.1vw, 17px)",
                        lineHeight: 1.82,
                        opacity: 0.58,
                      }}
                    >
                      Music is only one part of the story.
                      Explore the discipline, movement,
                      places, ideas and moments that continue
                      shaping JKAYY.
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "13px",
                        fontSize: isMobile ? "8px" : "9px",
                        letterSpacing: "0.21em",
                        textTransform: "uppercase",
                      }}
                    >
                      <span>Scroll to explore</span>

                      <motion.span
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                y: [0, 7, 0],
                              }
                        }
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          display: "inline-flex",
                        }}
                      >
                        <ArrowDown
                          size={isMobile ? 15 : 17}
                          strokeWidth={1.4}
                        />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 20,
                overflow: "hidden",
                opacity: coverOpacity,
                pointerEvents: "none",
                willChange: "opacity",
              }}
            >
              <svg
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
              >
                <defs>
                  <mask
                    id={maskId}
                    maskUnits="userSpaceOnUse"
                    maskContentUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="1000"
                    height="1000"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="1000"
                      height="1000"
                      fill="#ffffff"
                    />

                    <motion.g
                      style={{
                        scale: jkScale,
                        transformOrigin: "500px 500px",
                        willChange: "transform",
                      }}
                    >
                      <text
                        x="500"
                        y="500"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#000000"
                        fontFamily="Arial Black, Arial, Helvetica, sans-serif"
                        fontSize={isMobile ? "108" : "112"}
                        fontWeight="900"
                        letterSpacing="-7"
                      >
                        JK
                      </text>
                    </motion.g>
                  </mask>
                </defs>

                <rect
                  x="0"
                  y="0"
                  width="1000"
                  height="1000"
                  fill="#000000"
                  mask={`url(#${maskId})`}
                />
              </svg>

              <svg
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <motion.g
                  style={{
                    scale: jkScale,
                    opacity: whiteJKOpacity,
                    transformOrigin: "500px 500px",
                    willChange: "transform, opacity",
                  }}
                >
                  <text
                    x="500"
                    y="500"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontFamily="Arial Black, Arial, Helvetica, sans-serif"
                    fontSize={isMobile ? "108" : "112"}
                    fontWeight="900"
                    letterSpacing="-7"
                  >
                    JK
                  </text>
                </motion.g>
              </svg>

              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: isMobile ? "24px" : "36px",
                  zIndex: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "9px",
                  opacity: scrollHintOpacity,
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                  transform: "translateX(-50%)",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? "6px" : "8px",
                    fontWeight: 500,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  Scroll to enter
                </span>

                <motion.i
                  animate={{
                    y: [0, 7, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: "block",
                    width: "1px",
                    height: isMobile ? "26px" : "36px",
                    background:
                      "linear-gradient(180deg,#ffffff,transparent)",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 3,
          boxSizing: "border-box",
          padding: isSmallMobile
            ? "62px 0 90px"
            : isMobile
              ? "76px 0 104px"
              : isTablet
                ? "92px 0 120px"
                : "clamp(100px,8vw,138px) 0 145px",
          color: "#111111",
          background: `
            radial-gradient(
              circle at 86% 4%,
              rgba(0,0,0,0.035),
              transparent 24%
            ),
            #ffffff
          `,
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: `calc(100% - ${horizontalPadding * 2}px)`,
            maxWidth: "1540px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 34,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.82,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: "flex",
              flexDirection: isSmallMobile
                ? "column"
                : "row",
              alignItems: isSmallMobile
                ? "flex-start"
                : "flex-end",
              justifyContent: "space-between",
              gap: isMobile ? "18px" : "32px",
              marginBottom: isMobile ? "26px" : "34px",
              paddingBottom: isMobile ? "20px" : "25px",
              borderBottom:
                "1px solid rgba(17,17,17,0.14)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection:
                  isTablet || isMobile ? "column" : "row",
                alignItems:
                  isTablet || isMobile
                    ? "flex-start"
                    : "baseline",
                gap: isMobile
                  ? "9px"
                  : isTablet
                    ? "12px"
                    : "clamp(18px,3vw,46px)",
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? "8px" : "9px",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                Selected moments
              </span>

              <p
                style={{
                  margin: 0,
                  color: "rgba(17,17,17,0.48)",
                  fontFamily:
                    '"Bodoni Moda", "Times New Roman", serif',
                  fontSize: isMobile
                    ? "clamp(1.55rem,7vw,2.2rem)"
                    : "clamp(1.6rem,2.4vw,2.6rem)",
                  fontStyle: "italic",
                  lineHeight: 1,
                  letterSpacing: "-0.035em",
                }}
              >
                A visual archive of life beyond music.
              </p>
            </div>

            <strong
              style={{
                color: "rgba(17,17,17,0.24)",
                fontFamily:
                  '"Bodoni Moda", "Times New Roman", serif',
                fontSize: isMobile
                  ? "48px"
                  : "clamp(44px,5vw,78px)",
                fontWeight: 400,
                lineHeight: 0.75,
                letterSpacing: "-0.06em",
              }}
            >
             
            </strong>
          </motion.div>

         

          <motion.div
            layout
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.04,
            }}
            transition={{
              duration: 0.72,
              ease: [0.16, 1, 0.3, 1],
              layout: {
                type: "spring",
                stiffness: 110,
                damping: 24,
                mass: 0.72,
              },
            }}
            style={{
              width: "100%",
              columnCount,
              columnGap: `${cardGap}px`,
            }}
          >
            <AnimatePresence mode="popLayout">
              {lifestyleItems.map((item, index) => (
                <LifestyleCard
          
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  isMobile={isMobile}
                  isSmallMobile={isSmallMobile}
                  cardGap={cardGap}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.footer
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.82,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile
                ? "flex-start"
                : "flex-end",
              justifyContent: "space-between",
              gap: isMobile ? "34px" : "50px",
              marginTop: isSmallMobile
                ? "18px"
                : isMobile
                  ? "24px"
                  : isTablet
                    ? "30px"
                    : "36px",
              padding: isMobile
                ? "26px 0 15px"
                : "32px 0 15px",
              color: "#111111",
              borderTop:
                "1px solid rgba(17,17,17,0.14)",
            }}
          >
            <p
              style={{
                maxWidth: "740px",
                margin: 0,
                color: "#111111",
                fontFamily:
                  '"Bodoni Moda", "Times New Roman", serif',
                fontSize: isSmallMobile
                  ? "clamp(2.25rem,11vw,3.5rem)"
                  : isMobile
                    ? "clamp(2.6rem,10vw,4.4rem)"
                    : "clamp(2.6rem,4.6vw,5rem)",
                lineHeight: 0.94,
                letterSpacing: "-0.06em",
              }}
            >
              The artist you see on stage is shaped by
              everything that happens away from it.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: isMobile
                  ? "flex-start"
                  : "flex-end",
                color: "rgba(17,17,17,0.48)",
                fontSize: "8px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <span>JKAYY</span>
              <span>BEYOND THE DECKS</span>
              <span>2026</span>
            </div>
          </motion.footer>
        </div>
      </div>
    </motion.section>
  );
}