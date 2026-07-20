"use client";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

import {
  useEffect,
  useId,
  useRef,
  useState,
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

type MediaType = "image" | "video";

type BehindDeckItem = {
  number: string;
  label: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: MediaType;
  position?: string;
};

type MediaCardProps = {
  item: BehindDeckItem;
  feature?: boolean;
  compact?: boolean;
  priority?: boolean;
  isMobile: boolean;
  isSmallMobile: boolean;
  pausePreview: boolean;
  onOpen: (item: BehindDeckItem) => void;
};

const behindDeckItems: BehindDeckItem[] = [
  {
    number: "01",
    label: "Producing Music",
    title: "Layer by layer.",
    description:
      "Every beat, texture and transition is shaped with purpose.",
    mediaUrl:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784274215/behind_video_foxfh3.mp4",
    mediaType: "video",
    position: "center",
  },
  {
    number: "02",
    label: "Studio Setup",
    title: "Where every sound begins.",
    description:
      "Inside the room where ideas, instruments and late-night sessions slowly become music.",
    mediaUrl: "/images/chica.webp",
    mediaType: "image",
    position: "center",
  },
  {
    number: "03",
    label: "Travel",
    title: "Between cities.",
    description:
      "The journey between one performance and the next becomes part of the story.",
    mediaUrl: "/images/behind.webp",
    mediaType: "image",
    position: "center",
  },
];

function MediaCard({
  item,
  feature = false,
  compact = false,
  priority = false,
  isMobile,
  isSmallMobile,
  pausePreview,
  onOpen,
}: MediaCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isPlayable = item.mediaType === "video";

  /*
   * Preview video:
   * - Plays only while card is visible
   * - Pauses after section/card leaves viewport
   * - Pauses while popup video is open
   */
  useEffect(() => {
    if (
      item.mediaType !== "video" ||
      !cardRef.current ||
      !videoRef.current
    ) {
      return;
    }

    const card = cardRef.current;
    const video = videoRef.current;

    if (pausePreview) {
      video.pause();
      return;
    }

    const playVideo = () => {
      if (document.hidden) {
        video.pause();
        return;
      }

      video.play().catch(() => {
        // Browser can temporarily block autoplay.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const cardIsVisible =
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.28;

        if (cardIsVisible && !document.hidden) {
          playVideo();
        } else {
          video.pause();
        }
      },
      {
        threshold: [0, 0.1, 0.28, 0.5, 0.75, 1],
        rootMargin: "80px 0px -10% 0px",
      },
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        return;
      }

      const rect = card.getBoundingClientRect();

      const currentlyVisible =
        rect.bottom > 0 &&
        rect.top < window.innerHeight;

      if (currentlyVisible) {
        playVideo();
      }
    };

    observer.observe(card);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      observer.disconnect();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      video.pause();
    };
  }, [item.mediaType, pausePreview]);

  return (
    <motion.article
      ref={cardRef}
      whileHover={
        isMobile
          ? undefined
          : {
              y: -4,
            }
      }
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: "relative",

        width: "100%",
        height: "100%",

        minWidth: 0,
        minHeight: 0,

        overflow: "hidden",
        isolation: "isolate",

        border: "1px solid rgba(10,10,10,0.17)",

        borderRadius: isSmallMobile
          ? "8px"
          : isMobile
            ? "10px"
            : "14px",

        background: "#090909",

        boxShadow: feature
          ? "0 32px 90px rgba(0,0,0,0.19)"
          : "0 20px 55px rgba(0,0,0,0.14)",

        cursor: isPlayable ? "pointer" : "default",

        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      {/* ACTUAL VIDEO — NO POSTER OR COVER PHOTO */}

      {item.mediaType === "video" ? (
        <video
          ref={videoRef}
          src={item.mediaUrl}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label={`${item.label} video preview`}
          style={{
            position: "absolute",
            inset: 0,

            display: "block",

            width: "100%",
            height: "100%",

            border: 0,

            objectFit: "cover",
            objectPosition: item.position ?? "center",

            background: "#090909",

            transform: "scale(1.003)",
          }}
        />
      ) : (
        <Image
          src={item.mediaUrl}
          alt={item.label}
          fill
          priority={priority}
          quality={90}
          draggable={false}
          sizes={
            feature
              ? "(max-width: 767px) calc(100vw - 28px), 94vw"
              : "(max-width: 680px) calc(100vw - 28px), 47vw"
          }
          style={{
            position: "absolute",
            inset: 0,

            display: "block",

            width: "100%",
            height: "100%",

            objectFit: "cover",
            objectPosition: item.position ?? "center",

            filter: "none",

            transform: "scale(1.003)",
          }}
        />
      )}

      {/* CINEMATIC OVERLAY */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,

          pointerEvents: "none",

          background: feature
            ? `
              linear-gradient(
                180deg,
                rgba(0,0,0,0.03) 0%,
                rgba(0,0,0,0.02) 42%,
                rgba(0,0,0,0.74) 100%
              )
            `
            : `
              linear-gradient(
                180deg,
                rgba(0,0,0,0.03) 0%,
                rgba(0,0,0,0.04) 48%,
                rgba(0,0,0,0.7) 100%
              )
            `,
        }}
      />

      {/* INNER BORDER */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",

          inset: isMobile ? "8px" : "13px",

          zIndex: 2,

          border: "1px solid rgba(255,255,255,0.28)",

          borderRadius: isMobile ? "6px" : "10px",

          pointerEvents: "none",
        }}
      />

      {/* TOP NUMBER AND ARROW */}

      <div
        style={{
          position: "absolute",

          top: isMobile ? "17px" : "26px",
          right: isMobile ? "18px" : "30px",
          left: isMobile ? "18px" : "30px",

          zIndex: 3,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          color: "#ffffff",

          pointerEvents: "none",

          textShadow: "0 2px 14px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",

            gap: isMobile ? "9px" : "14px",

            fontFamily: cleanFont.style.fontFamily,

            fontSize: isMobile ? "7px" : "10px",
            fontWeight: 600,

            letterSpacing: "0.26em",
          }}
        >
          <span>{item.number}</span>

          <span
            style={{
              display: "block",

              width: isMobile ? "25px" : "46px",
              height: "1px",

              background: "rgba(255,255,255,0.72)",
            }}
          />
        </div>

        <span
          aria-hidden="true"
          style={{
            fontFamily: cleanFont.style.fontFamily,

            fontSize: isMobile ? "15px" : "19px",
            fontWeight: 300,
          }}
        >
          ↗
        </span>
      </div>

      {/* PLAY BUTTON */}

      {isPlayable && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",

            top: "50%",
            left: "50%",

            zIndex: 4,

            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            gap: isMobile ? "8px" : "12px",

            color: "#ffffff",

            pointerEvents: "none",

            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            style={{
              display: "grid",
              placeItems: "center",

              width: isSmallMobile
                ? "50px"
                : isMobile
                  ? "58px"
                  : feature
                    ? "78px"
                    : "68px",

              height: isSmallMobile
                ? "50px"
                : isMobile
                  ? "58px"
                  : feature
                    ? "78px"
                    : "68px",

              paddingLeft: "4px",

              border: "1px solid rgba(255,255,255,0.66)",
              borderRadius: "50%",

              color: "#111111",

              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: isMobile ? "14px" : "18px",

              background: "rgba(255,255,255,0.92)",

              boxShadow: "0 18px 50px rgba(0,0,0,0.26)",

              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            ▶
          </span>

          <span
            style={{
              fontFamily: cleanFont.style.fontFamily,

              fontSize: isMobile ? "6px" : "8px",
              fontWeight: 600,

              letterSpacing: "0.24em",
              textTransform: "uppercase",

              textShadow: "0 2px 14px rgba(0,0,0,0.8)",
            }}
          >
            Play with sound
          </span>
        </div>
      )}

      {/* CARD CONTENT */}

      <div
        style={{
          position: "absolute",

          right: isMobile ? "20px" : "34px",
          bottom: isMobile ? "22px" : "34px",
          left: isMobile ? "20px" : "34px",

          zIndex: 3,

          color: "#ffffff",

          pointerEvents: "none",

          textShadow: "0 3px 20px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            marginBottom: isMobile ? "7px" : "10px",

            color: "rgba(255,255,255,0.82)",

            fontFamily: cleanFont.style.fontFamily,

            fontSize: isMobile ? "7px" : "9px",
            fontWeight: 600,

            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {item.label}
        </div>

        <h3
          style={{
            maxWidth: feature ? "760px" : "540px",

            margin: 0,

            color: "#ffffff",

            fontFamily: luxuryFont.style.fontFamily,

            fontSize: feature
              ? isSmallMobile
                ? "clamp(2rem, 10vw, 3.3rem)"
                : isMobile
                  ? "clamp(2.5rem, 9vw, 4.2rem)"
                  : "clamp(3.5rem, 5vw, 6.4rem)"
              : isSmallMobile
                ? "clamp(1.8rem, 8vw, 2.7rem)"
                : isMobile
                  ? "clamp(2rem, 7vw, 3.2rem)"
                  : "clamp(2rem, 3vw, 4rem)",

            fontWeight: 500,

            lineHeight: 0.92,
            letterSpacing: "-0.045em",
          }}
        >
          {item.title}
        </h3>

        {!compact && (
          <p
            style={{
              maxWidth: "650px",

              margin: isMobile
                ? "9px 0 0"
                : "13px 0 0",

              color: "rgba(255,255,255,0.8)",

              fontFamily: cleanFont.style.fontFamily,

              fontSize: isMobile ? "9px" : "12px",
              fontWeight: 300,

              lineHeight: 1.6,
            }}
          >
            {item.description}
          </p>
        )}
      </div>

      {/* OPEN VIDEO WITH AUDIO */}

      {isPlayable && (
        <button
          type="button"
          onClick={() => onOpen(item)}
          aria-label={`Play ${item.label} with audio`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,

            display: "block",

            width: "100%",
            height: "100%",

            padding: 0,

            border: 0,
            outline: 0,

            cursor: "pointer",

            background: "transparent",
          }}
        />
      )}
    </motion.article>
  );
}

export default function BehindTheDecksSection() {
  const revealStageRef = useRef<HTMLDivElement>(null);
  const resizeFrame = useRef<number | null>(null);

  const generatedId = useId();
  const reduceMotion = useReducedMotion();

  const maskId = `jk-reveal-${generatedId.replace(
    /:/g,
    "",
  )}`;

  const [screenSize, setScreenSize] = useState({
    width: 1440,
    height: 900,
  });

  const [selectedMedia, setSelectedMedia] =
    useState<BehindDeckItem | null>(null);

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

  useEffect(() => {
    if (!selectedMedia) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMedia(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener(
        "keydown",
        closeOnEscape,
      );
    };
  }, [selectedMedia]);

  const screenWidth = screenSize.width;
  const screenHeight = screenSize.height;

  const isSmallMobile = screenWidth <= 480;
  const isMobile = screenWidth <= 767;

  const isTablet =
    screenWidth > 767 && screenWidth <= 1100;

  const stackSmallCards = screenWidth <= 680;

  const isShortViewport =
    screenWidth > 767 && screenHeight <= 760;

  const { scrollYProgress } = useScroll({
    target: revealStageRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 82,
    damping: 30,
    mass: 0.28,
    restDelta: 0.001,
  });

  const progress = reduceMotion
    ? scrollYProgress
    : smoothProgress;

  const jkScale = useTransform(
    progress,
    [0, 0.05, 0.38, 0.62, 0.78, 1],
    [
      isMobile ? 0.34 : 0.29,
      isMobile ? 0.34 : 0.29,
      isMobile ? 7.5 : 6.5,
      isMobile ? 22 : 19,
      isMobile ? 49 : 45,
      isMobile ? 49 : 45,
    ],
  );

  const whiteJKOpacity = useTransform(
    progress,
    [0, 0.04, 0.13, 0.2],
    [1, 1, 0.15, 0],
  );

  const coverOpacity = useTransform(
    progress,
    [0, 0.67, 0.84, 1],
    [1, 1, 0, 0],
  );

  const scrollHintOpacity = useTransform(
    progress,
    [0, 0.05, 0.16],
    [1, 1, 0],
  );

  const openMedia = (item: BehindDeckItem) => {
    if (item.mediaType === "video") {
      setSelectedMedia(item);
    }
  };

  const headingSize = isSmallMobile
    ? "clamp(3.2rem, 15vw, 4.7rem)"
    : isMobile
      ? "clamp(4rem, 14vw, 6.2rem)"
      : isTablet
        ? "clamp(5.8rem, 9vw, 9rem)"
        : isShortViewport
          ? "clamp(5rem, 7vw, 7.8rem)"
          : "clamp(6.5rem, 8vw, 10rem)";

  const featureCardHeight = isSmallMobile
    ? "380px"
    : isMobile
      ? "460px"
      : isTablet
        ? "590px"
        : isShortViewport
          ? "590px"
          : "clamp(650px, 44vw, 820px)";

  const smallCardHeight = isSmallMobile
    ? "330px"
    : isMobile
      ? "390px"
      : isTablet
        ? "410px"
        : isShortViewport
          ? "390px"
          : "clamp(420px, 29vw, 520px)";

  return (
    <>
      <section
        id="behind-the-decks"
        style={{
          position: "relative",

          width: "100%",

          overflow: "visible",

          color: "#111111",
          background: "#f2f2ef",
        }}
      >
        {/* JK REVEAL */}

        <div
          ref={revealStageRef}
          style={{
            position: "relative",

            width: "100%",

            height: isSmallMobile
              ? "148svh"
              : isMobile
                ? "146svh"
                : isTablet
                  ? "144vh"
                  : "142vh",

            background: "#f2f2ef",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,

              width: "100%",

              height: "100svh",
              minHeight: "100svh",

              overflow: "hidden",
              isolation: "isolate",

              background: "#f2f2ef",
            }}
          >
            {/* CENTER HEADING */}

            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,

                display: "grid",
                placeItems: "center",

                width: "100%",
                height: "100%",

                boxSizing: "border-box",

                padding: isSmallMobile
                  ? "30px 16px"
                  : isMobile
                    ? "38px 20px"
                    : "50px 4vw",

                overflow: "hidden",

                textAlign: "center",

                background: `
                  radial-gradient(
                    circle at 50% 44%,
                    rgba(255,255,255,0.9),
                    transparent 44%
                  ),
                  linear-gradient(
                    145deg,
                    #fafaf8 0%,
                    #e9e9e5 56%,
                    #f7f7f4 100%
                  )
                `,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",

                  top: "50%",
                  left: "50%",

                  color: "rgba(0,0,0,0.024)",

                  fontFamily: luxuryFont.style.fontFamily,

                  fontSize: isMobile ? "36vw" : "20vw",

                  fontWeight: 500,
                  fontStyle: "italic",

                  lineHeight: 0.75,
                  letterSpacing: "-0.075em",

                  whiteSpace: "nowrap",

                  pointerEvents: "none",
                  userSelect: "none",

                  transform: "translate(-50%, -50%)",
                }}
              >
                Backstage
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 3,

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",

                  width: "100%",
                  maxWidth: "1450px",

                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",

                    gap: isMobile ? "10px" : "15px",

                    marginBottom: isMobile
                      ? "16px"
                      : "24px",

                    color: "rgba(0,0,0,0.52)",

                    fontFamily: cleanFont.style.fontFamily,

                    fontSize: isMobile ? "7px" : "10px",
                    fontWeight: 600,

                    letterSpacing: "0.31em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      display: "block",

                      width: isMobile ? "28px" : "56px",
                      height: "1px",

                      background: "rgba(0,0,0,0.34)",
                    }}
                  />

                  <p style={{ margin: 0 }}>
                    12 — Behind The Decks
                  </p>

                  <span
                    style={{
                      display: "block",

                      width: isMobile ? "28px" : "56px",
                      height: "1px",

                      background: "rgba(0,0,0,0.34)",
                    }}
                  />
                </div>

                <h2
                  style={{
                    margin: 0,

                    color: "#090909",

                    fontFamily: luxuryFont.style.fontFamily,
                    fontSize: headingSize,

                    fontWeight: 500,

                    lineHeight: 0.84,
                    letterSpacing: "-0.065em",

                    textAlign: "center",
                  }}
                >
                  Behind{" "}

                  <em
                    style={{
                      color: "rgba(0,0,0,0.43)",

                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    the Decks
                  </em>
                </h2>

                <p
                  style={{
                    width: "100%",
                    maxWidth: isMobile ? "470px" : "780px",

                    margin: isMobile
                      ? "22px auto 0"
                      : "34px auto 0",

                    color: "rgba(0,0,0,0.6)",

                    fontFamily: cleanFont.style.fontFamily,

                    fontSize: isMobile
                      ? "clamp(0.85rem, 3.3vw, 1rem)"
                      : "clamp(1rem, 1.25vw, 1.3rem)",

                    fontWeight: 300,
                    lineHeight: 1.75,

                    textAlign: "center",
                  }}
                >
                  Studio sessions, producing and travel—the
                  private moments that shape every
                  performance.
                </p>

                <div
                  style={{
                    marginTop: isMobile ? "17px" : "25px",

                    color: "rgba(0,0,0,0.43)",

                    fontFamily: cleanFont.style.fontFamily,

                    fontSize: isMobile ? "6px" : "9px",
                    fontWeight: 600,

                    letterSpacing: "0.3em",
                    textTransform: "uppercase",

                    textAlign: "center",
                  }}
                >
                  Private process · Unfiltered moments
                </div>
              </div>
            </div>

            {/* BLACK JK COVER */}

            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 20,

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
                    fontFamily: cleanFont.style.fontFamily,

                    fontSize: isMobile ? "6px" : "8px",
                    fontWeight: 500,

                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  Scroll to enter
                </span>

                <motion.i
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, 7, 0],
                        }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: "block",

                    width: "1px",
                    height: isMobile ? "25px" : "36px",

                    background:
                      "linear-gradient(180deg, #ffffff, transparent)",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CARDS — NORMAL PAGE SCROLL */}

        <div
          style={{
            position: "relative",

            width: "100%",

            boxSizing: "border-box",

            padding: isSmallMobile
              ? "34px 10px 65px"
              : isMobile
                ? "42px 14px 75px"
                : isTablet
                  ? "58px 30px 90px"
                  : "72px 3.4vw 105px",

            overflow: "hidden",

            background: `
              radial-gradient(
                circle at 82% 5%,
                rgba(0,0,0,0.04),
                transparent 30%
              ),
              linear-gradient(
                180deg,
                #f2f2ef 0%,
                #fafaf8 45%,
                #ececea 100%
              )
            `,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",

              top: isMobile ? "1%" : "-5%",
              left: isMobile ? "-10%" : "-3%",

              color: "rgba(0,0,0,0.023)",

              fontFamily: luxuryFont.style.fontFamily,

              fontSize: isMobile ? "39vw" : "19vw",

              fontWeight: 500,
              fontStyle: "italic",

              lineHeight: 0.8,
              letterSpacing: "-0.07em",

              whiteSpace: "nowrap",

              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            Process
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,

              width: "100%",
              maxWidth: "1580px",

              margin: "0 auto",
            }}
          >
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
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
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "flex",
                alignItems: "center",

                gap: isMobile ? "10px" : "15px",

                marginBottom: isMobile ? "24px" : "36px",

                color: "rgba(0,0,0,0.46)",

                fontFamily: cleanFont.style.fontFamily,

                fontSize: isMobile ? "6px" : "8px",
                fontWeight: 600,

                letterSpacing: "0.29em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "block",

                  width: isMobile ? "28px" : "52px",
                  height: "1px",

                  background: "rgba(0,0,0,0.28)",
                }}
              />

              <p
                style={{
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                Selected moments
              </p>

              <span
                style={{
                  flex: 1,
                  height: "1px",

                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.16), transparent)",
                }}
              />
            </motion.div>

            {/* THREE CARDS */}

            <div
              style={{
                display: stackSmallCards ? "flex" : "grid",

                flexDirection: stackSmallCards
                  ? "column"
                  : undefined,

                gridTemplateColumns: stackSmallCards
                  ? undefined
                  : "repeat(2, minmax(0, 1fr))",

                gridTemplateRows: stackSmallCards
                  ? undefined
                  : `${featureCardHeight} ${smallCardHeight}`,

                gap: isSmallMobile
                  ? "12px"
                  : isMobile
                    ? "14px"
                    : isTablet
                      ? "18px"
                      : "24px",

                width: "100%",
              }}
            >
              {/* LARGE VIDEO CARD */}

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 40,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                transition={{
                  duration: 0.78,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  gridColumn: stackSmallCards
                    ? undefined
                    : "1 / -1",

                  gridRow: stackSmallCards
                    ? undefined
                    : "1",

                  width: "100%",
                  height: featureCardHeight,

                  minWidth: 0,
                  minHeight: 0,
                }}
              >
                <MediaCard
                  item={behindDeckItems[0]}
                  feature
                  priority
                  isMobile={isMobile}
                  isSmallMobile={isSmallMobile}
                  pausePreview={Boolean(selectedMedia)}
                  onOpen={openMedia}
                />
              </motion.div>

              {/* CARD 02 */}

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                transition={{
                  duration: 0.72,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  gridColumn: stackSmallCards
                    ? undefined
                    : "1",

                  gridRow: stackSmallCards
                    ? undefined
                    : "2",

                  width: "100%",
                  height: smallCardHeight,

                  minWidth: 0,
                  minHeight: 0,
                }}
              >
                <MediaCard
                  item={behindDeckItems[1]}
                  compact
                  isMobile={isMobile}
                  isSmallMobile={isSmallMobile}
                  pausePreview={Boolean(selectedMedia)}
                  onOpen={openMedia}
                />
              </motion.div>

              {/* CARD 03 */}

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                transition={{
                  duration: 0.72,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  gridColumn: stackSmallCards
                    ? undefined
                    : "2",

                  gridRow: stackSmallCards
                    ? undefined
                    : "2",

                  width: "100%",
                  height: smallCardHeight,

                  minWidth: 0,
                  minHeight: 0,
                }}
              >
                <MediaCard
                  item={behindDeckItems[2]}
                  compact
                  isMobile={isMobile}
                  isSmallMobile={isSmallMobile}
                  pausePreview={Boolean(selectedMedia)}
                  onOpen={openMedia}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO POPUP WITH AUDIO */}

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedMedia.label}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.22,
            }}
            onClick={() => setSelectedMedia(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              boxSizing: "border-box",

              padding: isMobile ? "15px" : "48px",

              background: "rgba(0,0,0,0.94)",

              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
                y: 16,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
                y: 8,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
              style={{
                position: "relative",

                width: "100%",
                maxWidth: "1200px",

                aspectRatio: "16 / 9",

                overflow: "hidden",

                border: "1px solid rgba(255,255,255,0.22)",

                borderRadius: isMobile ? "8px" : "14px",

                background: "#000000",

                boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
              }}
            >
              {/* NO POSTER IN POPUP */}

              <video
                key={selectedMedia.mediaUrl}
                src={selectedMedia.mediaUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                style={{
                  position: "absolute",
                  inset: 0,

                  display: "block",

                  width: "100%",
                  height: "100%",

                  border: 0,

                  objectFit: "contain",

                  background: "#000000",
                }}
              >
                Your browser does not support the video
                element.
              </video>

              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                aria-label="Close video"
                style={{
                  position: "absolute",

                  top: isMobile ? "10px" : "16px",
                  right: isMobile ? "10px" : "16px",

                  zIndex: 5,

                  display: "grid",
                  placeItems: "center",

                  width: isMobile ? "38px" : "44px",
                  height: isMobile ? "38px" : "44px",

                  padding: 0,

                  border:
                    "1px solid rgba(255,255,255,0.42)",

                  borderRadius: "50%",

                  color: "#ffffff",

                  fontFamily: "Arial, Helvetica, sans-serif",

                  fontSize: "22px",
                  fontWeight: 300,

                  cursor: "pointer",

                  background: "rgba(0,0,0,0.76)",

                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}