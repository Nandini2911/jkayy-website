"use client";

import gsap from "gsap";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
const TOUR_ITEMS = [
  {
    text: "one8 Commune",
    background: "/images/one commune.webp",
  },
  {
    text: "Hy.Press",
    background: "/images/featured-reel-poster.JPG",
  },
  {
    text: "MADA Club",
    background: "/images/mada club.webp",
  },
 

  {
    text: "COVAH The Cavern",
    background: "/images/COVAH The Cavern.webp",
  },
  {
    text: "Navvos",
    background: "/images/navvos.webp",
  },
  {
    text: "Muzik Cartel",
    background: "/images/muzik cartel.webp",
  },
  {
    text: "Chica",
    background: "/images/chica.webp",
  },
] as const;
const MARQUEE_ROWS = [
  {
    direction: "left",
    pixelsPerSecond: 112,
    startProgress: 0.08,
  },
  {
    direction: "right",
    pixelsPerSecond: 96,
    startProgress: 0.42,
  },
  {
    direction: "left",
    pixelsPerSecond: 124,
    startProgress: 0.72,
  },
] as const;

function useResponsivePreferences() {
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updatePreferences = () => {
      setViewportWidth(window.innerWidth);
      setReduceMotion(motionQuery.matches);
    };

    updatePreferences();

    window.addEventListener("resize", updatePreferences);
    motionQuery.addEventListener("change", updatePreferences);

    return () => {
      window.removeEventListener("resize", updatePreferences);
      motionQuery.removeEventListener(
        "change",
        updatePreferences,
      );
    };
  }, []);

  return {
    viewportWidth,
    reduceMotion,
  };
}

export default function TourMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const trackRefs = useRef<
    Array<HTMLDivElement | null>
  >([]);

  const animationsRef = useRef<
    Array<gsap.core.Tween | null>
  >([]);

  const speedTweensRef = useRef<
    Array<gsap.core.Tween | null>
  >([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  const [hoveredRow, setHoveredRow] =
    useState<number | null>(null);

  const [sectionVisible, setSectionVisible] =
    useState(true);

  const [pageVisible, setPageVisible] =
    useState(true);

  const { viewportWidth, reduceMotion } =
    useResponsivePreferences();

  const isTablet = viewportWidth <= 991;
  const isMobile = viewportWidth <= 767;
  const isSmallMobile = viewportWidth <= 480;

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let resizeFrame = 0;
    let destroyed = false;

    gsap.ticker.lagSmoothing(1000, 16);

    const buildAnimations = () => {
      if (destroyed) return;

      const previousProgress =
        animationsRef.current.map(
          (animation, rowIndex) =>
            animation?.progress() ??
            MARQUEE_ROWS[rowIndex].startProgress,
        );

      speedTweensRef.current.forEach((tween) => {
        tween?.kill();
      });

      animationsRef.current.forEach((animation) => {
        animation?.kill();
      });

      speedTweensRef.current = [];
      animationsRef.current = [];

      trackRefs.current.forEach(
        (track, rowIndex) => {
          if (!track) return;

          const firstSet =
            track.querySelector<HTMLElement>(
              "[data-marquee-set='first']",
            );

          if (!firstSet) return;

          const distance =
            firstSet.getBoundingClientRect().width;

          if (distance <= 0) return;

          const row = MARQUEE_ROWS[rowIndex];

          const movingRight =
            row.direction === "right";

          const duration = Math.max(
            8,
            distance / row.pixelsPerSecond,
          );

          gsap.set(track, {
            x: movingRight ? -distance : 0,
            force3D: true,
          });

          if (reduceMotion) return;

          const animation = gsap.to(track, {
            x: movingRight ? 0 : -distance,
            duration,
            repeat: -1,
            ease: "none",
            force3D: true,
            paused: false,
          });

          animation.progress(
            previousProgress[rowIndex] ??
              row.startProgress,
          );

          animationsRef.current[rowIndex] =
            animation;
        },
      );
    };

    const scheduleBuild = () => {
      window.cancelAnimationFrame(resizeFrame);

      resizeFrame =
        window.requestAnimationFrame(buildAnimations);
    };

    scheduleBuild();

    const resizeObserver =
      new ResizeObserver(scheduleBuild);

    resizeObserver.observe(section);

    window.addEventListener(
      "load",
      scheduleBuild,
    );

    void document.fonts?.ready.then(scheduleBuild);

    return () => {
      destroyed = true;

      window.cancelAnimationFrame(resizeFrame);

      resizeObserver.disconnect();

      window.removeEventListener(
        "load",
        scheduleBuild,
      );

      speedTweensRef.current.forEach((tween) => {
        tween?.kill();
      });

      animationsRef.current.forEach(
        (animation) => {
          animation?.kill();
        },
      );
    };
  }, [reduceMotion]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);
      },
      {
        rootMargin: "120px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPageVisible(!document.hidden);
    };

    handleVisibilityChange();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  useEffect(() => {
    const shouldPlay =
      sectionVisible && pageVisible;

    animationsRef.current.forEach(
      (animation) => {
        if (!animation) return;

        if (shouldPlay) {
          animation.resume();
        } else {
          animation.pause();
        }
      },
    );
  }, [pageVisible, sectionVisible]);

  const changeRowSpeed = (
    rowIndex: number,
    targetSpeed: number,
  ) => {
    const animation =
      animationsRef.current[rowIndex];

    if (!animation) return;

    speedTweensRef.current[rowIndex]?.kill();

    speedTweensRef.current[rowIndex] =
      gsap.to(animation, {
        timeScale: targetSpeed,
        duration:
          targetSpeed < 1 ? 0.55 : 0.75,
        ease: "power2.out",
        overwrite: true,
      });
  };

  const activateItem = (
    itemIndex: number,
    rowIndex: number,
  ) => {
    setActiveIndex(itemIndex);
    setHoveredIndex(itemIndex);
    setHoveredRow(rowIndex);

    changeRowSpeed(rowIndex, 0.38);
  };

  const deactivateItem = (
    rowIndex: number,
  ) => {
    setHoveredIndex(null);
    setHoveredRow(null);

    changeRowSpeed(rowIndex, 1);
  };

  const handleKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    itemIndex: number,
    rowIndex: number,
  ) => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.preventDefault();

    activateItem(itemIndex, rowIndex);
  };

  const resetAllRows = () => {
    setHoveredIndex(null);
    setHoveredRow(null);

    MARQUEE_ROWS.forEach((_, rowIndex) => {
      changeRowSpeed(rowIndex, 1);
    });
  };

  const sectionHeight = isSmallMobile
    ? "max(580px, 100svh)"
    : isMobile
      ? "max(640px, 100svh)"
      : "100svh";

  const sectionStyle: CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    isolation: "isolate",

    width: "100%",
    minHeight: sectionHeight,

    overflow: "hidden",

    color: "#f7f7f5",
    background: "#050505",
  };

  const backgroundContainerStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 0,

    width: "100%",
    height: "100%",

    overflow: "hidden",
    pointerEvents: "none",

    background: "#050505",

    transform: "translateZ(0)",
  };

  const marqueeContainerStyle: CSSProperties = {
    position: "relative",
    zIndex: 2,

    display: "flex",

    minHeight: sectionHeight,

    flexDirection: "column",
    justifyContent: "center",

    gap: isSmallMobile
      ? "10px"
      : isMobile
        ? "12px"
        : "clamp(8px, 1.5vh, 20px)",

    padding: isSmallMobile
      ? "68px 0 62px"
      : isMobile
        ? "78px 0 72px"
        : isTablet
          ? "90px 0 82px"
          : "105px 0 95px",
  };

  const marqueeTextFontSize = isSmallMobile
    ? "clamp(2.45rem, 12.8vw, 4rem)"
    : isMobile
      ? "clamp(2.8rem, 12.5vw, 4.8rem)"
      : isTablet
        ? "clamp(3.2rem, 9vw, 6.5rem)"
        : "clamp(3.5rem, 6.6vw, 7.5rem)";

  const textStrokeWidth = isMobile
    ? "1.25px"
    : "2px";

  return (
    <section
      ref={sectionRef}
      id="tour"
      style={sectionStyle}
      onMouseLeave={resetAllRows}
    >
      <div
        aria-hidden="true"
        style={backgroundContainerStyle}
      >
        {TOUR_ITEMS.map((item, index) => {
          const isActive =
            activeIndex === index;

          return (
            <div
              key={`${item.text}-${index}`}
              style={{
                position: "absolute",
                inset: 0,

                width: "100%",
                height: "100%",

                opacity: isActive ? 1 : 0,

                backgroundImage: `url("${item.background}")`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",

                filter: "none",

                transform: isActive
                  ? "scale(1) translateZ(0)"
                  : "scale(1.02) translateZ(0)",

                backfaceVisibility: "hidden",

                transition: reduceMotion
                  ? "none"
                  : isMobile
                    ? "opacity 420ms ease"
                    : "opacity 520ms ease, transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",

                willChange:
                  "opacity, transform",
              }}
            />
          );
        })}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,

          pointerEvents: "none",

          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.3))",
        }}
      />

      <div style={marqueeContainerStyle}>
        {MARQUEE_ROWS.map(
          (row, rowIndex) => (
            <div
              key={`${row.direction}-${rowIndex}`}
              style={{
                position: "relative",

                width: "100%",

                overflow: "hidden",

                paddingBlock: isMobile
                  ? "5px"
                  : "clamp(5px, 0.55vw, 10px)",

                userSelect: "none",
                touchAction: "pan-y",

                contain: "paint",
              }}
            >
              <div
                ref={(element) => {
                  trackRefs.current[rowIndex] =
                    element;
                }}
                style={{
                  display: "flex",

                  width: "max-content",
                  minWidth: "max-content",

                  alignItems: "center",

                  transform: reduceMotion
                    ? "none"
                    : "translate3d(0,0,0)",

                  backfaceVisibility: "hidden",

                  willChange: reduceMotion
                    ? "auto"
                    : "transform",
                }}
              >
                {[0, 1].map((setIndex) => (
                  <div
                    key={setIndex}
                    data-marquee-set={
                      setIndex === 0
                        ? "first"
                        : "copy"
                    }
                    aria-hidden={
                      setIndex === 1
                        ? "true"
                        : undefined
                    }
                    style={{
                      display: "flex",
                      flexShrink: 0,

                      alignItems: "center",

                      whiteSpace: "nowrap",
                    }}
                  >
                    {TOUR_ITEMS.map(
                      (item, itemIndex) => {
                        const isHovered =
                          hoveredIndex ===
                            itemIndex &&
                          hoveredRow === rowIndex;

                        return (
                          <div
                            key={`${setIndex}-${item.text}`}
                            style={{
                              display: "flex",
                              flexShrink: 0,

                              alignItems: "center",

                              paddingRight:
                                isMobile
                                  ? "30px"
                                  : "48px",
                            }}
                          >
                            <button
                              type="button"
                              onMouseEnter={() =>
                                activateItem(
                                  itemIndex,
                                  rowIndex,
                                )
                              }
                              onMouseLeave={() =>
                                deactivateItem(
                                  rowIndex,
                                )
                              }
                              onFocus={() =>
                                activateItem(
                                  itemIndex,
                                  rowIndex,
                                )
                              }
                              onBlur={() =>
                                deactivateItem(
                                  rowIndex,
                                )
                              }
                              onTouchStart={() =>
                                activateItem(
                                  itemIndex,
                                  rowIndex,
                                )
                              }
                              onTouchEnd={() =>
                                deactivateItem(
                                  rowIndex,
                                )
                              }
                              onClick={() =>
                                setActiveIndex(
                                  itemIndex,
                                )
                              }
                              onKeyDown={(event) =>
                                handleKeyboard(
                                  event,
                                  itemIndex,
                                  rowIndex,
                                )
                              }
                              aria-label={`Show ${item.text} background`}
                              tabIndex={
                                setIndex === 0
                                  ? 0
                                  : -1
                              }
                              style={{
                                display: "block",
                                flexShrink: 0,

                                padding: 0,

                                border: 0,
                                borderRadius:
                                  "4px",

                                color: "inherit",
                                background:
                                  "transparent",

                                cursor: "pointer",
                                font: "inherit",

                                outline: "none",
                                boxShadow: "none",
                              }}
                            >
                              <span
                                style={{
                                  display:
                                    "block",

                                  color: isHovered
                                    ? "#ffffff"
                                    : "transparent",

                                  fontFamily:
                                    "Arial Black, Helvetica Neue, Helvetica, Arial, sans-serif",

                                  fontSize:
                                    marqueeTextFontSize,

                                  fontWeight: 900,

                                  lineHeight:
                                    isMobile
                                      ? 0.9
                                      : 0.88,

                                  letterSpacing:
                                    isMobile
                                      ? "-0.05em"
                                      : "-0.055em",

                                  textTransform:
                                    "uppercase",

                                  WebkitFontSmoothing:
                                    "antialiased",

                                  WebkitTextStroke: `${textStrokeWidth} ${
                                    isHovered
                                      ? "#ffffff"
                                      : "rgba(255,255,255,0.94)"
                                  }`,

                                  backfaceVisibility:
                                    "hidden",

                                  textShadow:
                                    isHovered
                                      ? "0 4px 25px rgba(0,0,0,0.22)"
                                      : "none",

                                  transition:
                                    reduceMotion
                                      ? "none"
                                      : "color 300ms ease, -webkit-text-stroke 300ms ease, text-shadow 300ms ease",
                                }}
                              >
                                {item.text}
                              </span>
                            </button>
                          </div>
                        );
                      },
                    )}
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}