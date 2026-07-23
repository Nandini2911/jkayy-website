"use client";

import {
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
  useRef,
  useState,
} from "react";

const visionFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const visionWords = [
  "Music.",
  "Fitness.",
  "Adventure.",
  "Entrepreneurship.",
  "One Vision.",
];

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const resizeFrame = useRef<number | null>(null);

  const reduceMotion = useReducedMotion();

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
  const isShortViewport =
    screenWidth > 767 && screenHeight <= 740;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 78,
    damping: 30,
    mass: 0.38,
    restDelta: 0.001,
  });

  const progress = reduceMotion
    ? scrollYProgress
    : smoothProgress;

  const headingScale = useTransform(
    progress,
    [0, 0.55, 1],
    [0.93, 1, 1.035],
  );

  const firstLineOpacity = useTransform(
    progress,
    [0, 0.08, 0.25],
    [0.12, 1, 1],
  );

  const firstLineY = useTransform(
    progress,
    [0, 0.23],
    [isMobile ? 44 : 76, 0],
  );

  const secondLineOpacity = useTransform(
    progress,
    [0.08, 0.24, 0.42],
    [0.08, 1, 1],
  );

  const secondLineY = useTransform(
    progress,
    [0.08, 0.36],
    [isMobile ? 52 : 86, 0],
  );

  const thirdLineOpacity = useTransform(
    progress,
    [0.18, 0.38, 0.58],
    [0.05, 1, 1],
  );

  const thirdLineY = useTransform(
    progress,
    [0.18, 0.5],
    [isMobile ? 58 : 96, 0],
  );

  const detailsOpacity = useTransform(
    progress,
    [0.42, 0.66, 0.88],
    [0, 1, 1],
  );

  const detailsY = useTransform(
    progress,
    [0.42, 0.74],
    [isMobile ? 38 : 58, 0],
  );

  const splitLineScale = useTransform(
    progress,
    [0, 0.7],
    [0, 1],
  );

  const backgroundWordOpacity = useTransform(
    progress,
    [0, 0.55, 1],
    [0.015, 0.038, 0.018],
  );

  const backgroundWordScale = useTransform(
    progress,
    [0, 1],
    [0.9, 1.1],
  );

  const sectionHeight = reduceMotion
    ? "auto"
    : isSmallMobile
      ? "155svh"
      : isMobile
        ? "162svh"
        : isTablet
          ? "172vh"
          : isShortViewport
            ? "176vh"
            : "182vh";

  const headingSize = isSmallMobile
    ? "clamp(3.55rem, 18vw, 5.4rem)"
    : isMobile
      ? "clamp(4.4rem, 16vw, 7.1rem)"
      : isTablet
        ? "clamp(6.2rem, 11.2vw, 9.5rem)"
        : isShortViewport
          ? "clamp(6.6rem, 9.6vw, 9.2rem)"
          : "clamp(7.5rem, 10.5vw, 11.8rem)";

  const pagePadding = isSmallMobile
    ? "28px 16px 34px"
    : isMobile
      ? "32px 22px 40px"
      : isTablet
        ? "38px 36px 48px"
        : "46px 4.5vw 54px";

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        position: "relative",
        width: "100%",
        height: sectionHeight,
        overflow: "clip",
        isolation: "isolate",
        background: "#050505",
      }}
    >
      <div
        style={{
          position: reduceMotion ? "relative" : "sticky",
          top: 0,
          width: "100%",
          height: reduceMotion ? "auto" : "100svh",
          minHeight: isSmallMobile ? "640px" : "100svh",
          overflow: "hidden",
          isolation: "isolate",
          background: "#050505",
        }}
      >
        {/* LEFT WHITE SIDE */}

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0 50% 0 0",
            zIndex: 0,
            background: `
              radial-gradient(
                circle at 78% 18%,
                rgba(255,255,255,0.98),
                transparent 36%
              ),
              linear-gradient(
                145deg,
                #ffffff 0%,
                #f3f3ef 55%,
                #deded8 100%
              )
            `,
          }}
        />

        {/* RIGHT BLACK / GREY SIDE */}

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0 0 0 50%",
            zIndex: 0,
            background: `
              radial-gradient(
                circle at 18% 20%,
                rgba(255,255,255,0.09),
                transparent 34%
              ),
              linear-gradient(
                145deg,
                #090909 0%,
                #191919 54%,
                #343434 100%
              )
            `,
          }}
        />

        {/* CENTER DIVIDER */}

        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            zIndex: 2,
            width: "1px",
            background:
              "linear-gradient(180deg, transparent, rgba(255,255,255,0.28) 18%, rgba(255,255,255,0.28) 82%, transparent)",
            scaleY: reduceMotion ? 1 : splitLineScale,
            transformOrigin: "center center",
            pointerEvents: "none",
          }}
        />

        {/* SUBTLE BACKGROUND WORD */}

        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 1,
            color: "#ffffff",
            fontFamily: visionFont.style.fontFamily,
            fontSize: isMobile ? "48vw" : "24vw",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 0.7,
            letterSpacing: "-0.08em",
            whiteSpace: "nowrap",
            opacity: backgroundWordOpacity,
            scale: backgroundWordScale,
            translateX: "-50%",
            translateY: "-50%",
            
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Vision
        </motion.div>

        {/* GRAIN */}

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            opacity: 0.055,
            mixBlendMode: "soft-light",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.95'/%3E%3C/svg%3E\")",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            minHeight: isSmallMobile ? "640px" : "100svh",
            boxSizing: "border-box",
            padding: pagePadding,
          }}
        >
          {/* TOP META */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              width: "100%",
              maxWidth: "1600px",
              margin: "0 auto",
              color: "#ffffff",
              fontFamily: cleanFont.style.fontFamily,
              fontSize: isMobile ? "7px" : "9px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              
            }}
          >
           

            <span
              style={{
                display: isSmallMobile ? "none" : "block",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              The next chapter
            </span>
          </div>

          {/* PERFECT CENTER CONTENT */}

          <motion.div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1700px",
              margin: "0 auto",
              padding: isMobile
                ? "44px 0 34px"
                : "48px 0 38px",
              scale: reduceMotion ? 1 : headingScale,
              transformOrigin: "center center",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                color: "#ffffff",
                mixBlendMode: "difference",
              }}
            >
              <motion.div
                style={{
                  opacity: reduceMotion
                    ? 1
                    : firstLineOpacity,
                  y: reduceMotion ? 0 : firstLineY,
                  willChange: "transform, opacity",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "transparent",
                    background:
                      "linear-gradient(90deg, #111111 0%, #111111 49.9%, #ffffff 50.1%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    fontFamily: visionFont.style.fontFamily,
                    fontSize: headingSize,
                    fontWeight: 500,
                    lineHeight: isMobile ? 0.9 : 0.86,
                    paddingBottom: "0.1em",
                    letterSpacing: "-0.075em",
                    textAlign: "center",
                  }}
                >
                  The Journey
                </h2>
              </motion.div>

              <motion.div
                style={{
                  opacity: reduceMotion
                    ? 1
                    : secondLineOpacity,
                  y: reduceMotion ? 0 : secondLineY,
                  willChange: "transform, opacity",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "transparent",
                    background:
                      "linear-gradient(90deg, rgba(17,17,17,0.58) 0%, rgba(17,17,17,0.58) 49.9%, rgba(255,255,255,0.62) 50.1%, rgba(255,255,255,0.62) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    fontFamily: visionFont.style.fontFamily,
                    fontSize: headingSize,
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: isMobile ? 0.9 : 0.86,
                    paddingBottom: "0.1em",
                    letterSpacing: "-0.075em",
                    textAlign: "center",
                    opacity: 0.62,
                  }}
                >
                  Has Only
                </h2>
              </motion.div>

              <motion.div
                style={{
                  opacity: reduceMotion
                    ? 1
                    : thirdLineOpacity,
                  y: reduceMotion ? 0 : thirdLineY,
                  willChange: "transform, opacity",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "transparent",
                    background:
                      "linear-gradient(90deg, #111111 0%, #111111 49.9%, #ffffff 50.1%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    fontFamily: visionFont.style.fontFamily,
                    fontSize: headingSize,
                    fontWeight: 500,
                    lineHeight: isMobile ? 0.9 : 0.86,
                    paddingBottom: "0.1em",
                    letterSpacing: "-0.075em",
                    textAlign: "center",
                  }}
                >
                  Just Begun.
                </h2>
              </motion.div>
            </div>
          </motion.div>

          {/* BOTTOM DETAILS — CENTERED */}

          <motion.div
            style={{
              width: "100%",
              maxWidth: "1600px",
              margin: "0 auto",
              paddingTop: isMobile ? "24px" : "30px",
              paddingBottom: isMobile ? "4px" : "8px",
              color: "#ffffff",
              borderTop: "1px solid rgba(255,255,255,0.34)",
              opacity: reduceMotion ? 1 : detailsOpacity,
              y: reduceMotion ? 0 : detailsY,
              mixBlendMode: "difference",
              willChange: "transform, opacity",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: isMobile
                  ? "11px 16px"
                  : "14px 28px",
                textAlign: "center",
              }}
            >
              {visionWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 14,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.65,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion
                      ? 0
                      : index * 0.065,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    color: "inherit",
                    fontFamily: cleanFont.style.fontFamily,
                    fontSize: isSmallMobile
                      ? "9px"
                      : isMobile
                        ? "10px"
                        : "clamp(10px,0.85vw,13px)",
                    fontWeight:
                      index === visionWords.length - 1
                        ? 600
                        : 400,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    opacity:
                      index === visionWords.length - 1
                        ? 1
                        : 0.66,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <p
              style={{
                maxWidth: isMobile ? "460px" : "640px",
                margin: isMobile
                  ? "24px auto 0"
                  : "30px auto 0",
                color: "transparent",
                    background:
                      "linear-gradient(90deg, #111111 0%, #111111 49.9%, #ffffff 50.1%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                fontFamily: visionFont.style.fontFamily,
                fontSize: isSmallMobile
                  ? "clamp(1.75rem,8.5vw,2.6rem)"
                  : isMobile
                    ? "clamp(2rem,7.5vw,3.2rem)"
                    : "clamp(2.2rem,3vw,3.8rem)",
                fontWeight: 400,
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                textAlign: "center",
              }}
            >
              Creating experiences
              <br />
              that people remember.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
