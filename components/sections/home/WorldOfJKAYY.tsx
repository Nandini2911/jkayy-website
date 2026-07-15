"use client";

import Image from "next/image";
import { Music2 } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

const particles = [
  {
    symbol: "♪",
    left: "8%",
    top: "18%",
    delay: 0,
    duration: 8,
    size: "17px",
  },
  {
    symbol: "♫",
    left: "20%",
    top: "76%",
    delay: 1.4,
    duration: 10,
    size: "20px",
  },
  {
    symbol: "•",
    left: "73%",
    top: "16%",
    delay: 0.7,
    duration: 7,
    size: "21px",
  },
  {
    symbol: "♪",
    left: "88%",
    top: "68%",
    delay: 2,
    duration: 9,
    size: "16px",
  },
];

const content = {
  eyebrow: "Discover the artist",
  headingSmall: "Who is",
  headingMain: "JKAYY",
  lead:
    "More than a DJ, JKAYY creates immersive experiences where music, lights and energy become one.",
  descriptionOne:
    "With a distinctive sound and an instinctive connection with the crowd, JKAYY transforms every performance into a cinematic live experience. His sets combine powerful rhythms, seamless transitions and visually charged moments that remain with the audience long after the final track.",
  descriptionTwo:
    "As a producer and entrepreneur, his vision extends beyond the stage—building a world where creativity, technology and culture come together to create unforgettable nights.",
};

function useViewportWidth() {
  const [viewportWidth, setViewportWidth] =
    useState(1440);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();

    window.addEventListener(
      "resize",
      updateViewportWidth,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateViewportWidth,
      );
    };
  }, []);

  return viewportWidth;
}

type TypewriterTextProps = {
  text: string;
  start: boolean;
  delay?: number;
  speed?: number;
  instant?: boolean;
  showCursor?: boolean;
};

function TypewriterText({
  text,
  start,
  delay = 0,
  speed = 10,
  instant = false,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] =
    useState(instant ? text : "");

  const [completed, setCompleted] =
    useState(instant);

  useEffect(() => {
    if (!start) return;

    if (instant) {
      setDisplayedText(text);
      setCompleted(true);
      return;
    }

    setDisplayedText("");
    setCompleted(false);

    let animationFrameId = 0;
    let startTime: number | null = null;

    const animateText = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      if (elapsed < delay) {
        animationFrameId =
          window.requestAnimationFrame(animateText);

        return;
      }

      const characterCount = Math.min(
        text.length,
        Math.floor((elapsed - delay) / speed) + 1,
      );

      setDisplayedText(
        text.slice(0, characterCount),
      );

      if (characterCount < text.length) {
        animationFrameId =
          window.requestAnimationFrame(animateText);
      } else {
        setCompleted(true);
      }
    };

    animationFrameId =
      window.requestAnimationFrame(animateText);

    return () => {
      window.cancelAnimationFrame(
        animationFrameId,
      );
    };
  }, [
    delay,
    instant,
    speed,
    start,
    text,
  ]);

  return (
    <span
      style={{
        display: "inline-grid",
        maxWidth: "100%",
        minWidth: 0,
        verticalAlign: "top",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          gridArea: "1 / 1",
          minWidth: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {text}
      </span>

      <span
        aria-label={text}
        style={{
          position: "relative",
          gridArea: "1 / 1",
          minWidth: 0,
        }}
      >
        <span aria-hidden="true">
          {displayedText}
        </span>

        {showCursor &&
          start &&
          !completed && (
            <motion.span
              aria-hidden="true"
              animate={{
                opacity: [1, 1, 0, 0],
              }}
              transition={{
                duration: 0.72,
                repeat: Infinity,
                times: [0, 0.48, 0.49, 1],
                ease: "linear",
              }}
              style={{
                display: "inline-block",
                width: "1px",
                height: "1em",
                marginLeft: "5px",
                verticalAlign: "-0.08em",
                background: "#ffffff",
              }}
            />
          )}
      </span>
    </span>
  );
}

export default function AboutSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();
  const viewportWidth = useViewportWidth();

  const isTablet = viewportWidth <= 1024;
  const isStacked = viewportWidth <= 900;
  const isMobile = viewportWidth <= 768;
  const isSmallMobile = viewportWidth <= 390;

  const minimalMotion = Boolean(reduceMotion);

  const sectionInView = useInView(
    sectionRef,
    {
      once: true,
      amount: isMobile ? 0.22 : 0.18,
      margin: isMobile
        ? "0px 0px -12% 0px"
        : "0px 0px -6% 0px",
    },
  );

  const [
    showSecondaryImage,
    setShowSecondaryImage,
  ] = useState(false);

  const [
    imageFocused,
    setImageFocused,
  ] = useState(false);

  const showDesktopHoverImage = !isMobile;

  const imageIsActive =
    showDesktopHoverImage &&
    (showSecondaryImage || imageFocused);

  const handleImagePointerEnter = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      showDesktopHoverImage &&
      event.pointerType === "mouse"
    ) {
      setShowSecondaryImage(true);
    }
  };

  const handleImagePointerLeave = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse") {
      setShowSecondaryImage(false);
    }
  };

  const handleImageKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!showDesktopHoverImage) return;

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      setShowSecondaryImage(
        (currentValue) => !currentValue,
      );
    }
  };

  const sectionStyle: CSSProperties = {
    position: "relative",
    isolation: "isolate",

    minHeight: isMobile ? "auto" : "100vh",

    overflow: "hidden",

    padding: isSmallMobile
      ? "78px 14px"
      : isMobile
        ? "78px 16px"
        : isStacked
          ? "94px 22px"
          : isTablet
            ? "104px 28px"
            : "118px 24px",

    color: "#ffffff",
    background: "#000000",

    contain: isMobile
      ? "layout paint"
      : undefined,
  };

  const containerStyle: CSSProperties = {
    position: "relative",
    zIndex: 3,

    display: "grid",

    gridTemplateColumns: isStacked
      ? "1fr"
      : "minmax(0, 0.95fr) minmax(0, 1.05fr)",

    alignItems: "center",

    gap: isMobile
      ? "32px"
      : isStacked
        ? "42px"
        : isTablet
          ? "48px"
          : "clamp(52px, 7vw, 112px)",

    width: "min(100%, 1440px)",
    margin: "0 auto",
  };

  const imageHeight = isSmallMobile
    ? "min(128vw, 525px)"
    : isMobile
      ? "min(570px, 122vw)"
      : isStacked
        ? "min(700px, 116vw)"
        : "clamp(580px, 66vw, 720px)";

  const imageFrameStyle: CSSProperties = {
    position: "relative",

    width: "100%",
    height: imageHeight,

    overflow: "hidden",

    cursor: showDesktopHoverImage
      ? "pointer"
      : "default",

    touchAction: "manipulation",

    outline:
      imageFocused && showDesktopHoverImage
        ? "1px solid rgba(255,255,255,0.78)"
        : "none",

    outlineOffset:
      imageFocused && showDesktopHoverImage
        ? "5px"
        : undefined,

    border: isMobile
      ? "1px solid rgba(255,255,255,0.15)"
      : imageIsActive
        ? "1px solid rgba(255,255,255,0.52)"
        : "1px solid rgba(255,255,255,0.18)",

    borderRadius: isMobile ? "20px" : "30px",

    background: "#080808",

    boxShadow: isMobile
      ? "0 18px 46px rgba(0,0,0,0.58)"
      : imageIsActive
        ? "0 34px 90px rgba(0,0,0,0.74), inset 0 1px 0 rgba(255,255,255,0.16)"
        : "0 28px 80px rgba(0,0,0,0.68), inset 0 1px 0 rgba(255,255,255,0.1)",

    transform:
      !isMobile && imageIsActive
        ? "translateY(-3px)"
        : "none",

    transition: isMobile
      ? "none"
      : "border-color 180ms ease, transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease",
  };

  const headingChromeFontSize =
    isSmallMobile
      ? "clamp(3.25rem, 18vw, 4.5rem)"
      : isMobile
        ? "clamp(3.55rem, 19vw, 5rem)"
        : isStacked
          ? "clamp(4rem, 15vw, 7rem)"
          : "clamp(4rem, 8vw, 7rem)";

  return (
    <section
      ref={sectionRef}
      id="about"
      style={sectionStyle}
    >
      {!isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,

            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {particles.map(
            (particle, index) => (
              <motion.span
                key={`${particle.symbol}-${index}`}
                animate={
                  minimalMotion
                    ? undefined
                    : {
                        x: [0, 6, 0],
                        y: [0, -20, 0],
                        opacity: [
                          0.1,
                          0.42,
                          0.1,
                        ],
                      }
                }
                transition={{
                  duration:
                    particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: particle.top,
                  left: particle.left,

                  color:
                    "rgba(255,255,255,0.16)",

                  fontSize: particle.size,

                  transform:
                    "translate3d(0,0,0)",
                }}
              >
                {particle.symbol}
              </motion.span>
            ),
          )}
        </div>
      )}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,

          display: "grid",
          placeItems: "center",

          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={
            sectionInView
              ? {
                  opacity: 1,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  scale: 0.98,
                }
          }
          transition={{
            duration: minimalMotion
              ? 0
              : isMobile
                ? 0.7
                : 0.8,

            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            width: "max-content",

            fontFamily:
              "var(--font-michroma), sans-serif",

            fontSize: isMobile
              ? "clamp(5.5rem, 30vw, 9rem)"
              : isStacked
                ? "clamp(7rem, 25vw, 15rem)"
                : "clamp(8rem, 23vw, 26rem)",

            fontWeight: 700,
            lineHeight: 0.8,
            letterSpacing: "-0.09em",

            whiteSpace: "nowrap",

            color: isMobile
              ? "rgba(255,255,255,0.065)"
              : "rgba(255,255,255,0.085)",

            WebkitTextStroke: isMobile
              ? "1px rgba(255,255,255,0.04)"
              : "1px rgba(255,255,255,0.055)",

            transformOrigin: "center",
          }}
        >
          JKAYY
        </motion.div>
      </div>

      <div style={containerStyle}>
        {/* IMAGE COMES FROM LEFT */}

        <motion.div
          initial={{
            opacity: minimalMotion ? 1 : 0,

            x: minimalMotion
              ? 0
              : isMobile
                ? -45
                : -110,

            scale: minimalMotion ? 1 : 0.975,
          }}
          animate={
            sectionInView
              ? {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }
              : {
                  opacity: minimalMotion ? 1 : 0,

                  x: minimalMotion
                    ? 0
                    : isMobile
                      ? -45
                      : -110,

                  scale:
                    minimalMotion ? 1 : 0.975,
                }
          }
          transition={{
            duration: minimalMotion
              ? 0
              : isMobile
                ? 0.85
                : 1.05,

            delay: minimalMotion ? 0 : 0.08,

            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "relative",
            minWidth: 0,

            width: isStacked
              ? "100%"
              : undefined,

            willChange: minimalMotion
              ? undefined
              : "transform, opacity",
          }}
        >
          <div
            style={{
              width: isStacked
                ? isMobile
                  ? "100%"
                  : "min(100%,570px)"
                : "min(100%,570px)",

              margin: "0 auto",
            }}
          >
            <div
              role={
                showDesktopHoverImage
                  ? "button"
                  : undefined
              }
              tabIndex={
                showDesktopHoverImage ? 0 : -1
              }
              aria-label={
                showDesktopHoverImage
                  ? "Show alternate JKAYY portrait"
                  : undefined
              }
              aria-pressed={
                showDesktopHoverImage
                  ? showSecondaryImage
                  : undefined
              }
              onPointerEnter={
                handleImagePointerEnter
              }
              onPointerLeave={
                handleImagePointerLeave
              }
              onKeyDown={handleImageKeyDown}
              onFocus={() => {
                if (showDesktopHoverImage) {
                  setImageFocused(true);
                  setShowSecondaryImage(true);
                }
              }}
              onBlur={() => {
                setImageFocused(false);
                setShowSecondaryImage(false);
              }}
              style={imageFrameStyle}
            >
              {!isMobile && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 2,

                      pointerEvents: "none",

                      borderRadius: "inherit",

                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.08), transparent 28%, transparent 72%, rgba(255,255,255,0.035))",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "14%",
                      zIndex: 5,

                      width: "52%",
                      height: "1px",

                      pointerEvents: "none",

                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
                    }}
                  />
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,

                  overflow: "hidden",

                  background: "#050505",
                }}
              >
                <Image
                  src="/images/jkayy-about.webp"
                  alt="JKAYY professional artist portrait"
                  fill
                  priority
                  quality={76}
                  draggable={false}
                  sizes="(max-width: 640px) 92vw, (max-width: 900px) 86vw, 46vw"
                  style={{
                    zIndex: 1,

                    objectFit: "cover",
                    objectPosition: "center top",

                    userSelect: "none",
                    backfaceVisibility:
                      "hidden",

                    filter:
                      "grayscale(100%) contrast(1.05)",

                    opacity:
                      showSecondaryImage &&
                      showDesktopHoverImage
                        ? 0
                        : 1,

                    transform:
                      showSecondaryImage &&
                      showDesktopHoverImage
                        ? "scale(0.998)"
                        : isMobile
                          ? "none"
                          : "scale(1.01)",

                    transition: isMobile
                      ? "none"
                      : "opacity 130ms linear, transform 220ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                />

                {showDesktopHoverImage && (
                  <Image
                    src="/images/jkayy-about-hover.webp"
                    alt="JKAYY performing live"
                    fill
                    loading="eager"
                    quality={76}
                    draggable={false}
                    sizes="46vw"
                    style={{
                      zIndex: 2,

                      objectFit: "cover",
                      objectPosition:
                        "center top",

                      userSelect: "none",
                      backfaceVisibility:
                        "hidden",

                      filter:
                        "grayscale(100%) contrast(1.05)",

                      opacity:
                        showSecondaryImage
                          ? 1
                          : 0,

                      transform:
                        showSecondaryImage
                          ? "scale(1.01)"
                          : "scale(1.025)",

                      transition:
                        "opacity 130ms linear, transform 220ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,

                  pointerEvents: "none",

                  background: isMobile
                    ? "linear-gradient(180deg, transparent 0%, transparent 72%, rgba(0,0,0,0.42) 100%)"
                    : "linear-gradient(180deg, transparent 0%, transparent 62%, rgba(0,0,0,0.16) 78%, rgba(0,0,0,0.62) 100%)",
                }}
              />

              {!isMobile && (
                <>
                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      zIndex: 6,

                      width: "26px",
                      height: "26px",

                      pointerEvents: "none",

                      opacity: imageIsActive
                        ? 1
                        : 0.72,

                      borderTop:
                        "1px solid #ffffff",

                      borderLeft:
                        "1px solid #ffffff",

                      transition:
                        "opacity 160ms ease",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      zIndex: 6,

                      width: "26px",
                      height: "26px",

                      pointerEvents: "none",

                      opacity: imageIsActive
                        ? 1
                        : 0.72,

                      borderTop:
                        "1px solid #ffffff",

                      borderRight:
                        "1px solid #ffffff",

                      transition:
                        "opacity 160ms ease",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      left: "14px",
                      zIndex: 6,

                      width: "26px",
                      height: "26px",

                      pointerEvents: "none",

                      opacity: imageIsActive
                        ? 1
                        : 0.72,

                      borderBottom:
                        "1px solid rgba(255,255,255,0.78)",

                      borderLeft:
                        "1px solid rgba(255,255,255,0.78)",

                      transition:
                        "opacity 160ms ease",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      right: "14px",
                      bottom: "14px",
                      zIndex: 6,

                      width: "26px",
                      height: "26px",

                      pointerEvents: "none",

                      opacity: imageIsActive
                        ? 1
                        : 0.72,

                      borderRight:
                        "1px solid rgba(255,255,255,0.78)",

                      borderBottom:
                        "1px solid rgba(255,255,255,0.78)",

                      transition:
                        "opacity 160ms ease",
                    }}
                  />
                </>
              )}
            </div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={
              sectionInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            transition={{
              duration: minimalMotion
                ? 0
                : 0.46,

              delay: minimalMotion
                ? 0
                : isMobile
                  ? 0.58
                  : 0.68,

              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: "flex",

              flexWrap: isSmallMobile
                ? "wrap"
                : "nowrap",

              alignItems: "center",
              justifyContent: "center",

              gap: isMobile ? "9px" : "13px",

              marginTop: isMobile
                ? "15px"
                : "20px",

              color:
                "rgba(255,255,255,0.38)",

              fontSize: isMobile
                ? "7px"
                : "9px",

              fontWeight: 600,

              letterSpacing: isMobile
                ? "0.21em"
                : "0.3em",

              textTransform: "uppercase",
            }}
          >
            <span>Artist</span>

            <span
              style={{
                width: "3px",
                height: "3px",
                flex: "0 0 auto",

                borderRadius: "50%",

                background:
                  "rgba(255,255,255,0.82)",
              }}
            />

            <span>Producer</span>

            <span
              style={{
                width: "3px",
                height: "3px",
                flex: "0 0 auto",

                borderRadius: "50%",

                background:
                  "rgba(255,255,255,0.82)",
              }}
            />

            <span>Visionary</span>
          </motion.div>
        </motion.div>

        {/* TEXT COMES FROM RIGHT */}

        <motion.div
          initial={{
            opacity: minimalMotion ? 1 : 0,

            x: minimalMotion
              ? 0
              : isMobile
                ? 45
                : 110,
          }}
          animate={
            sectionInView
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: minimalMotion ? 1 : 0,

                  x: minimalMotion
                    ? 0
                    : isMobile
                      ? 45
                      : 110,
                }
          }
          transition={{
            duration: minimalMotion
              ? 0
              : isMobile
                ? 0.85
                : 1.05,

            delay: minimalMotion
              ? 0
              : isMobile
                ? 0.14
                : 0.18,

            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "relative",
            minWidth: 0,

            width: isStacked
              ? "min(100%,680px)"
              : undefined,

            maxWidth: isStacked
              ? "none"
              : "680px",

            margin: isStacked
              ? "0 auto"
              : undefined,

            willChange: minimalMotion
              ? undefined
              : "transform, opacity",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",

              gap: "12px",

              marginBottom: isMobile
                ? "18px"
                : "24px",

              color:
                "rgba(255,255,255,0.7)",

              fontSize: isMobile
                ? "8px"
                : "10px",

              fontWeight: 700,

              letterSpacing: isMobile
                ? "0.24em"
                : "0.34em",

              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "flex",
                flex: "0 0 auto",

                alignItems: "center",
                justifyContent: "center",

                width: isMobile
                  ? "31px"
                  : "34px",

                height: isMobile
                  ? "31px"
                  : "34px",

                border:
                  "1px solid rgba(255,255,255,0.2)",

                borderRadius: "50%",

                color: "#ffffff",

                background:
                  "rgba(255,255,255,0.035)",
              }}
            >
              <Music2 size={14} />
            </span>

            <TypewriterText
              text={content.eyebrow}
              start={sectionInView}
              delay={120}
              speed={32}
              instant={minimalMotion}
              showCursor={!isMobile}
            />
          </div>

          <h2
            style={{
              margin: 0,
              lineHeight: 0.92,
            }}
          >
            <span
              style={{
                display: "block",

                marginBottom: isMobile
                  ? "10px"
                  : "12px",

                color:
                  "rgba(255,255,255,0.42)",

                fontSize: isMobile
                  ? "1.08rem"
                  : "clamp(1.4rem,2.4vw,2.2rem)",

                fontWeight: 400,
                letterSpacing: "0.08em",

                textTransform: "uppercase",
              }}
            >
              <TypewriterText
                text={content.headingSmall}
                start={sectionInView}
                delay={300}
                speed={42}
                instant={minimalMotion}
                showCursor={!isMobile}
              />
            </span>

            <span
              style={{
                display: "block",
                width: "fit-content",

                color: "transparent",

                background:
                  "linear-gradient(180deg, #ffffff 0%, #f0f0f0 34%, #808080 72%, #f4f4f4 100%)",

                backgroundClip: "text",
                WebkitBackgroundClip: "text",

                fontFamily:
                  "var(--font-michroma), sans-serif",

                fontSize:
                  headingChromeFontSize,

                fontWeight: 700,
                letterSpacing: "-0.06em",
              }}
            >
              <TypewriterText
                text={content.headingMain}
                start={sectionInView}
                delay={520}
                speed={82}
                instant={minimalMotion}
                showCursor={!isMobile}
              />
            </span>
          </h2>

          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: sectionInView ? 1 : 0,
            }}
            transition={{
              duration: minimalMotion
                ? 0
                : 0.62,

              delay: minimalMotion
                ? 0
                : 0.72,

              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              width: "min(100%,480px)",
              height: "1px",

              margin: isMobile
                ? "22px 0 24px"
                : "28px 0 30px",

              overflow: "hidden",

              background:
                "rgba(255,255,255,0.1)",

              transformOrigin: "left",
            }}
          >
            <span
              style={{
                display: "block",

                width: "62%",
                height: "100%",

                background:
                  "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.38), transparent)",
              }}
            />
          </motion.div>

          <p
            style={{
              maxWidth: "620px",

              margin: isMobile
                ? "0 0 19px"
                : "0 0 22px",

              color:
                "rgba(255,255,255,0.92)",

              fontSize: isMobile
                ? "1.14rem"
                : "clamp(1.25rem,2.2vw,1.75rem)",

              fontWeight: 500,

              lineHeight: isMobile
                ? 1.48
                : 1.45,

              letterSpacing: "-0.025em",
            }}
          >
            <TypewriterText
              text={content.lead}
              start={sectionInView}
              delay={850}
              speed={22}
              instant={minimalMotion}
              showCursor={!isMobile}
            />
          </p>

          <div
            style={{
              maxWidth: "630px",
            }}
          >
            <p
              style={{
                margin: 0,

                color:
                  "rgba(255,255,255,0.54)",

                fontSize: isMobile
                  ? "14px"
                  : "15px",

                lineHeight: isMobile
                  ? 1.68
                  : 1.78,
              }}
            >
              <TypewriterText
                text={content.descriptionOne}
                start={sectionInView}
                delay={1450}
                speed={11}
                instant={minimalMotion}
                showCursor={!isMobile}
              />
            </p>

            <p
              style={{
                margin: isMobile
                  ? "14px 0 0"
                  : "16px 0 0",

                color:
                  "rgba(255,255,255,0.54)",

                fontSize: isMobile
                  ? "14px"
                  : "15px",

                lineHeight: isMobile
                  ? 1.68
                  : 1.78,
              }}
            >
              <TypewriterText
                text={content.descriptionTwo}
                start={sectionInView}
                delay={2350}
                speed={11}
                instant={minimalMotion}
                showCursor={false}
              />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}