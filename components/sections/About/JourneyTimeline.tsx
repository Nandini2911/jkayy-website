"use client";

import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type JourneyMilestone = {
  navigationTitle: string;
  title: string[];
  category: string;
  description: string;
  image: string;
  imagePosition?: string;
  accent: string;
};

const milestones: JourneyMilestone[] = [
  {
    navigationTitle: "Started DJing",
    title: ["Started", "DJing"],
    category: "The Beginning",
    description:
      "What started as curiosity slowly became an identity shaped by sound, rhythm and energy.",
    image: "/images/chica.webp",
    imagePosition: "center",
    accent: "186, 135, 255",
  },
  {
    navigationTitle: "Club Performances",
    title: ["Club", "Performances"],
    category: "Live Energy",
    description:
      "Late nights, powerful rooms and unforgettable crowds turned every performance into a new chapter.",
    image: "/images/featured-reel-poster.JPG",
    imagePosition: "center",
    accent: "236, 72, 153",
  },
  {
    navigationTitle: "Music Production",
    title: ["Music", "Production"],
    category: "Creating Sound",
    description:
      "The journey moved beyond playing music into building original sound, emotion and atmosphere.",
    image: "",
    imagePosition: "center",
    accent: "98, 210, 255",
  },
  {
    navigationTitle: "Fitness Lifestyle",
    title: ["Fitness", "Lifestyle"],
    category: "Discipline",
    description:
      "Fitness became more than a routine. It became the discipline behind the energy, focus and consistency.",
    image: "/images/jkgym2.webp",
    imagePosition: "center",
    accent: "255, 116, 76",
  },
  {
    navigationTitle: "Mountain Adventures",
    title: ["Mountain", "Adventures"],
    category: "Beyond Limits",
    description:
      "From city lights to silent peaks, every climb created a deeper connection with strength and freedom.",
    image: "/images/ad7.jpg",
    imagePosition: "center",
    accent: "130, 190, 168",
  },
  {
    navigationTitle: "AfterrMatch",
    title: ["Building", "AfterrMatch"],
    category: "Entrepreneurship",
    description:
      "A new chapter combining sport, community, hospitality and lifestyle under one premium experience.",
    image: "/images/pickle.webp",
    imagePosition: "center",
    accent: "55, 132, 255",
  },
  {
    navigationTitle: "Future Vision",
    title: ["Future", "Vision"],
    category: "What Comes Next",
    description:
      "The journey continues through bigger stages, stronger ideas and experiences that have not been created yet.",
    image: "/images/vision.webp",
    imagePosition: "center",
    accent: "255, 211, 135",
  },
];

type ViewportState = {
  width: number;
  height: number;
  isTinyPhone: boolean;
  isPhone: boolean;
  isNarrow: boolean;
  isTablet: boolean;
  isCompactDesktop: boolean;
  isShortScreen: boolean;
  isLandscapeNarrow: boolean;
};

type LayerProps = {
  milestone: JourneyMilestone;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  viewport: ViewportState;
};

function BackgroundLayer({
  milestone,
  index,
  total,
  progress,
  reduceMotion,
  viewport,
}: LayerProps) {
  const step = 1 / (total - 1);
  const center = index * step;

  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(value - center);
    const fadeDistance = step * (viewport.isNarrow ? 0.9 : 0.8);

    return Math.max(0, 1 - distance / fadeDistance);
  });

  const scale = useTransform(progress, (value) => {
    if (reduceMotion) {
      return 1;
    }

    const distance = Math.min(Math.abs(value - center) / step, 1);

    return 1 + distance * (viewport.isNarrow ? 0.035 : 0.08);
  });

  const y = useTransform(progress, (value) => {
    if (reduceMotion) {
      return "0%";
    }

    const difference = value - center;
    const movement = Math.max(-1, Math.min(1, difference / step));

    return `${movement * (viewport.isNarrow ? -1.25 : -2.5)}%`;
  });

  const filter = useTransform(progress, (value) => {
    if (reduceMotion || viewport.isNarrow) {
      return "blur(0px)";
    }

    const distance = Math.min(Math.abs(value - center) / step, 1);

    return `blur(${distance * 3}px)`;
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: viewport.isNarrow ? "-2.5%" : "-5%",
        zIndex: 0,
        opacity,
        scale,
        y,
        filter,
        backgroundImage: `url("${milestone.image}")`,
        backgroundPosition: milestone.imagePosition || "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        willChange: "opacity, transform, filter",
      }}
    />
  );
}

function ContentLayer({
  milestone,
  index,
  total,
  progress,
  reduceMotion,
  viewport,
}: LayerProps) {
  const step = 1 / (total - 1);
  const center = index * step;
  const longestLineLength = Math.max(
    ...milestone.title.map((line) => line.length)
  );
  const hasLongTitle = longestLineLength >= 10;

  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(value - center);
    const visibleDistance = step * (viewport.isNarrow ? 0.58 : 0.52);

    return Math.max(0, 1 - distance / visibleDistance);
  });

  const titleY = useTransform(progress, (value) => {
    if (reduceMotion) {
      return 0;
    }

    const difference = value - center;
    const movement = Math.max(-1, Math.min(1, difference / step));

    if (viewport.isLandscapeNarrow) {
      return movement * -34;
    }

    return movement * (viewport.isNarrow ? -62 : -120);
  });

  const titleScale = useTransform(progress, (value) => {
    if (reduceMotion) {
      return 1;
    }

    const distance = Math.min(Math.abs(value - center) / step, 1);

    return 1 - distance * (viewport.isNarrow ? 0.045 : 0.08);
  });

  const descriptionY = useTransform(progress, (value) => {
    if (reduceMotion) {
      return 0;
    }

    const difference = value - center;
    const movement = Math.max(-1, Math.min(1, difference / step));

    if (viewport.isLandscapeNarrow) {
      return movement * -20;
    }

    return movement * (viewport.isNarrow ? -34 : -65);
  });

  const horizontalPadding = viewport.isTinyPhone
    ? "16px"
    : viewport.isPhone
      ? "clamp(18px, 5.5vw, 28px)"
      : viewport.isTablet
        ? "clamp(34px, 6vw, 72px)"
        : undefined;

  const titleFontSize = viewport.isLandscapeNarrow
    ? hasLongTitle
      ? "clamp(31px, 7vw, 52px)"
      : "clamp(38px, 8vw, 62px)"
    : viewport.isTinyPhone
      ? hasLongTitle
        ? "clamp(34px, 11.2vw, 46px)"
        : "clamp(43px, 14.5vw, 58px)"
      : viewport.isPhone
        ? hasLongTitle
          ? "clamp(38px, 11.6vw, 56px)"
          : "clamp(48px, 15vw, 76px)"
        : viewport.isTablet
          ? hasLongTitle
            ? "clamp(52px, 7.8vw, 82px)"
            : "clamp(62px, 9.8vw, 108px)"
          : hasLongTitle
            ? "clamp(54px, min(6.3vw, 12vh), 116px)"
            : "clamp(68px, min(8.2vw, 14vh), 152px)";

  const secondLinePadding = hasLongTitle
    ? viewport.isNarrow
      ? "clamp(8px, 3vw, 20px)"
      : "clamp(18px, 3vw, 54px)"
    : viewport.isLandscapeNarrow
      ? "clamp(18px, 5vw, 36px)"
      : viewport.isTinyPhone
        ? "14px"
        : viewport.isPhone
          ? "clamp(18px, 8vw, 48px)"
          : viewport.isTablet
            ? "clamp(28px, 6vw, 72px)"
            : "clamp(32px, 6vw, 110px)";

  const paragraphClamp = viewport.isLandscapeNarrow
    ? 2
    : viewport.isTinyPhone
      ? 3
      : viewport.isPhone
        ? 4
        : undefined;

  return (
    <motion.article
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        display: "flex",
        alignItems: viewport.isLandscapeNarrow ? "center" : "flex-end",
        paddingTop: viewport.isLandscapeNarrow ? "72px" : 0,
        paddingRight: viewport.isNarrow
          ? horizontalPadding
          : "clamp(50px, 7vw, 128px)",
        paddingBottom: viewport.isLandscapeNarrow
          ? "24px"
          : viewport.isPhone
            ? "max(48px, calc(7dvh + env(safe-area-inset-bottom, 0px)))"
            : viewport.isTablet
              ? "clamp(58px, 8vh, 92px)"
              : viewport.isShortScreen
                ? "clamp(38px, 6vh, 68px)"
                : "clamp(70px, 10vh, 120px)",
        paddingLeft: viewport.isNarrow
          ? horizontalPadding
          : viewport.isCompactDesktop
            ? "clamp(275px, 25vw, 350px)"
            : "clamp(330px, 31vw, 520px)",
        opacity,
        pointerEvents: "none",
        willChange: "opacity",
      }}
    >
      <div
        style={{
          position: "relative",
          width: viewport.isNarrow ? "100%" : "min(830px, 59vw)",
          maxWidth: "100%",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: viewport.isNarrow ? "10px" : "15px",
            marginBottom: viewport.isLandscapeNarrow
              ? "10px"
              : viewport.isPhone
                ? "15px"
                : "clamp(16px, 2.3vh, 26px)",
            color: "rgba(255,255,255,0.68)",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: viewport.isNarrow
              ? "clamp(7px, 2.1vw, 9px)"
              : "clamp(9px, 0.65vw, 11px)",
            fontWeight: 600,
            letterSpacing: viewport.isTinyPhone ? "0.18em" : "0.24em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            willChange: "transform",
            y: descriptionY,
          }}
        >
          <span
            style={{
              display: "block",
              flex: "0 0 auto",
              width: viewport.isNarrow ? "clamp(28px, 9vw, 42px)" : "54px",
              height: "1px",
              background: `rgb(${milestone.accent})`,
              boxShadow: `0 0 14px rgba(${milestone.accent}, 0.65)`,
            }}
          />

          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {milestone.category}
          </span>
        </motion.div>

        <motion.h2
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: 0,
            color: "#ffffff",
            fontFamily: '"Times New Roman", "Bodoni 72", Didot, serif',
            fontSize: titleFontSize,
            fontWeight: 400,
            lineHeight: viewport.isLandscapeNarrow
              ? 0.86
              : viewport.isNarrow
                ? 0.82
                : 0.76,
            letterSpacing: viewport.isNarrow ? "-0.052em" : "-0.065em",
            textShadow: "0 12px 50px rgba(0,0,0,0.45)",
            transformOrigin: "left bottom",
            willChange: "transform",
            y: titleY,
            scale: titleScale,
          }}
        >
          {milestone.title.map((line, lineIndex) => (
            <span
              key={`${line}-${lineIndex}`}
              style={
                lineIndex === 1
                  ? {
                      maxWidth: "100%",
                      paddingLeft: secondLinePadding,
                      color: "transparent",
                      fontStyle: "italic",
                      whiteSpace: "nowrap",
                      WebkitTextStroke:
                        viewport.isTinyPhone || viewport.isLandscapeNarrow
                          ? "0.8px rgba(255,255,255,0.8)"
                          : "1px rgba(255,255,255,0.78)",
                    }
                  : {
                      maxWidth: "100%",
                      whiteSpace: "nowrap",
                    }
              }
            >
              {line}
            </span>
          ))}
        </motion.h2>

        <motion.div
          style={{
            width: "100%",
            maxWidth: viewport.isNarrow ? "560px" : "600px",
            marginTop: viewport.isLandscapeNarrow
              ? "16px"
              : viewport.isPhone
                ? "23px"
                : viewport.isTablet
                  ? "30px"
                  : "clamp(28px, 4.8vh, 58px)",
            marginLeft: viewport.isNarrow ? 0 : "clamp(54px, 5vw, 90px)",
            willChange: "transform",
            y: descriptionY,
          }}
        >
          <p
            style={{
              display: paragraphClamp ? "-webkit-box" : "block",
              width: "100%",
              maxWidth: viewport.isNarrow ? "560px" : "510px",
              margin: 0,
              overflow: paragraphClamp ? "hidden" : "visible",
              color: "rgba(255,255,255,0.72)",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: viewport.isLandscapeNarrow
                ? "11px"
                : viewport.isTinyPhone
                  ? "11px"
                  : viewport.isPhone
                    ? "12px"
                    : viewport.isTablet
                      ? "14px"
                      : "clamp(13px, 1vw, 17px)",
              fontWeight: 400,
              lineHeight: viewport.isLandscapeNarrow
                ? 1.5
                : viewport.isNarrow
                  ? 1.62
                  : 1.75,
              letterSpacing: "0.01em",
              WebkitBoxOrient: paragraphClamp ? "vertical" : undefined,
              WebkitLineClamp: paragraphClamp,
            }}
          >
            {milestone.description}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const [activeIndex, setActiveIndex] = useState(0);
  const [screenSize, setScreenSize] = useState({
    width: 1440,
    height: 900,
  });

  useEffect(() => {
    let animationFrame = 0;

    const updateScreenSize = () => {
      window.cancelAnimationFrame(animationFrame);

      animationFrame = window.requestAnimationFrame(() => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize, { passive: true });
    window.addEventListener("orientationchange", updateScreenSize, {
      passive: true,
    });
    window.visualViewport?.addEventListener("resize", updateScreenSize, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", updateScreenSize);
      window.removeEventListener("orientationchange", updateScreenSize);
      window.visualViewport?.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const viewport: ViewportState = {
    width: screenSize.width,
    height: screenSize.height,
    isTinyPhone: screenSize.width <= 390,
    isPhone: screenSize.width <= 767,
    isNarrow: screenSize.width <= 1100,
    isTablet: screenSize.width > 767 && screenSize.width <= 1100,
    isCompactDesktop: screenSize.width > 1100 && screenSize.width <= 1366,
    isShortScreen: screenSize.height <= 760,
    isLandscapeNarrow:
      screenSize.width <= 1100 &&
      screenSize.width > screenSize.height &&
      screenSize.height <= 620,
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: viewport.isNarrow ? 78 : 90,
    damping: viewport.isNarrow ? 30 : 28,
    mass: viewport.isNarrow ? 0.45 : 0.35,
  });

  useMotionValueEvent(smoothProgress, "change", (latestProgress) => {
    const nextIndex = Math.min(
      milestones.length - 1,
      Math.max(
        0,
        Math.round(latestProgress * (milestones.length - 1))
      )
    );

    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex
    );
  });

  const activeMilestone = milestones[activeIndex];

  const handleMilestoneClick = (index: number) => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const sectionTop =
      window.scrollY + section.getBoundingClientRect().top;
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    const targetProgress = index / (milestones.length - 1);

    window.scrollTo({
      top: sectionTop + scrollableDistance * targetProgress,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const narrowShade = viewport.isLandscapeNarrow
    ? `linear-gradient(
        90deg,
        rgba(0,0,0,0.78) 0%,
        rgba(0,0,0,0.34) 48%,
        rgba(0,0,0,0.54) 100%
      ),
      linear-gradient(
        180deg,
        rgba(0,0,0,0.4) 0%,
        rgba(0,0,0,0.14) 44%,
        rgba(0,0,0,0.88) 100%
      )`
    : viewport.isTinyPhone
      ? `linear-gradient(
          180deg,
          rgba(0,0,0,0.47) 0%,
          rgba(0,0,0,0.04) 27%,
          rgba(0,0,0,0.72) 60%,
          rgba(4,4,5,0.98) 88%,
          #050505 100%
        )`
      : `linear-gradient(
          180deg,
          rgba(0,0,0,0.58) 0%,
          rgba(0,0,0,0.13) 31%,
          rgba(0,0,0,0.9) 78%,
          #050505 100%
        ),
        linear-gradient(
          90deg,
          rgba(0,0,0,0.25),
          rgba(0,0,0,0.08)
        )`;

  const desktopShade = `linear-gradient(
      90deg,
      rgba(3,3,4,0.97) 0%,
      rgba(3,3,4,0.78) 30%,
      rgba(3,3,4,0.30) 62%,
      rgba(3,3,4,0.58) 100%
    ),
    linear-gradient(
      180deg,
      rgba(0,0,0,0.58) 0%,
      transparent 37%,
      rgba(0,0,0,0.8) 100%
    )`;

  const sectionHeight = viewport.isLandscapeNarrow
    ? milestones.length * 125
    : viewport.isNarrow
      ? milestones.length * 108
      : milestones.length * 115;

  return (
    <section
      ref={sectionRef}
      id="journey"
      style={{
        position: "relative",
        width: "100%",
        height: `${sectionHeight}vh`,
        background: "#050505",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100dvh",
          minHeight: "100svh",
          overflow: "hidden",
          isolation: "isolate",
          color: "#ffffff",
          background: "#050505",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
            background: "#050505",
          }}
        >
          {milestones.map((milestone, index) => (
            <BackgroundLayer
              key={`${milestone.navigationTitle}-background`}
              milestone={milestone}
              index={index}
              total={milestones.length}
              progress={smoothProgress}
              reduceMotion={reduceMotion}
              viewport={viewport}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: viewport.isNarrow ? narrowShade : desktopShade,
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={{
            background: viewport.isTinyPhone
              ? `radial-gradient(
                  circle at 70% 40%,
                  rgba(${activeMilestone.accent}, 0.19),
                  transparent 40%
                ),
                radial-gradient(
                  circle at 50% 90%,
                  rgba(${activeMilestone.accent}, 0.11),
                  transparent 42%
                )`
              : `radial-gradient(
                  circle at 74% 42%,
                  rgba(${activeMilestone.accent}, 0.25),
                  transparent 35%
                ),
                radial-gradient(
                  circle at 40% 100%,
                  rgba(${activeMilestone.accent}, 0.12),
                  transparent 43%
                )`,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion || viewport.isNarrow
              ? undefined
              : {
                  x: ["0%", "1.5%", "-1%", "1%", "0%"],
                  y: ["0%", "-1%", "1.5%", "1%", "0%"],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            inset: "-50%",
            zIndex: 8,
            pointerEvents: "none",
            opacity: viewport.isNarrow ? 0.035 : 0.055,
            backgroundImage:
              "repeating-radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 0.45px, transparent 0.7px, transparent 4px)",
            backgroundSize: "7px 7px",
            mixBlendMode: "soft-light",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: viewport.isNarrow
              ? viewport.isLandscapeNarrow
                ? "52px"
                : "calc(62px + env(safe-area-inset-top, 0px))"
              : "clamp(28px, 4vw, 60px)",
            left: viewport.isNarrow
              ? viewport.isTinyPhone
                ? "16px"
                : "clamp(18px, 5.5vw, 28px)"
              : "clamp(24px, 4.5vw, 76px)",
            zIndex: 12,
            display: "flex",
            alignItems: "center",
            gap: viewport.isNarrow ? "10px" : "13px",
            color: "rgba(255,255,255,0.62)",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: viewport.isNarrow ? "8px" : "10px",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: viewport.isTinyPhone ? "0.17em" : "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "block",
              width: viewport.isNarrow ? "28px" : "42px",
              height: "1px",
              background: "rgba(255,255,255,0.28)",
            }}
          />

          <span>Journey Timeline</span>
        </div>

        {!viewport.isNarrow && (
          <aside
            aria-label="Journey milestones"
            style={{
              position: "absolute",
              top: "50%",
              left: viewport.isCompactDesktop
                ? "26px"
                : "clamp(28px, 4.5vw, 76px)",
              zIndex: 15,
              display: "flex",
              height: viewport.isShortScreen
                ? "min(470px, 64vh)"
                : "min(570px, 66vh)",
              transform: "translateY(-44%)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "1px",
                height: "100%",
                marginTop: "2px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.16)",
              }}
            >
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  background: `rgb(${activeMilestone.accent})`,
                  boxShadow: `0 0 12px rgba(${activeMilestone.accent},0.8), 0 0 28px rgba(${activeMilestone.accent},0.4)`,
                  transformOrigin: "top",
                  scaleY: smoothProgress,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginLeft: "-5px",
              }}
            >
              {milestones.map((milestone, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={`${milestone.navigationTitle}-navigation`}
                    type="button"
                    onClick={() => handleMilestoneClick(index)}
                    aria-label={`Go to ${milestone.navigationTitle}`}
                    aria-current={isActive ? "step" : undefined}
                    animate={{
                      x: isActive ? 9 : 0,
                    }}
                    whileHover={{
                      x: isActive ? 12 : 5,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      position: "relative",
                      display: "grid",
                      gridTemplateColumns: "29px 10px minmax(0, 1fr)",
                      alignItems: "center",
                      gap: viewport.isCompactDesktop ? "11px" : "14px",
                      width: viewport.isCompactDesktop ? "205px" : "230px",
                      padding: 0,
                      border: 0,
                      outline: "none",
                      color: isActive
                        ? "#ffffff"
                        : "rgba(255,255,255,0.32)",
                      background: "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span aria-hidden="true" />

                    <motion.span
                      animate={{
                        scale: isActive ? 1.3 : 1,
                        backgroundColor: isActive
                          ? `rgb(${milestone.accent})`
                          : "#090909",
                        borderColor: isActive
                          ? `rgb(${milestone.accent})`
                          : "rgba(255,255,255,0.3)",
                        boxShadow: isActive
                          ? `0 0 12px rgba(${milestone.accent},0.9), 0 0 28px rgba(${milestone.accent},0.48)`
                          : "0 0 0 rgba(0,0,0,0)",
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      style={{
                        display: "block",
                        width: "9px",
                        height: "9px",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: "50%",
                      }}
                    />

                    <span
                      style={{
                        overflow: "hidden",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontSize: viewport.isCompactDesktop
                          ? "10px"
                          : "clamp(10px, 0.78vw, 13px)",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {milestone.navigationTitle}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </aside>
        )}

        {viewport.isNarrow && (
          <div
            style={{
              position: "absolute",
              top: viewport.isLandscapeNarrow
                ? "18px"
                : "calc(20px + env(safe-area-inset-top, 0px))",
              left: viewport.isTinyPhone ? "16px" : "clamp(18px, 5.5vw, 28px)",
              right: viewport.isTinyPhone ? "16px" : "clamp(18px, 5.5vw, 28px)",
              zIndex: 20,
              display: "grid",
              gridTemplateColumns: "auto minmax(0, 1fr) auto",
              alignItems: "center",
              gap: viewport.isTinyPhone ? "9px" : "13px",
              color: "rgba(255,255,255,0.76)",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>

            <div
              style={{
                position: "relative",
                height: "1px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.21)",
              }}
            >
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  background: `rgb(${activeMilestone.accent})`,
                  boxShadow: `0 0 12px rgba(${activeMilestone.accent},0.8)`,
                  transformOrigin: "left",
                  scaleX: smoothProgress,
                }}
              />
            </div>

            <span>{String(milestones.length).padStart(2, "0")}</span>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
          }}
        >
          {milestones.map((milestone, index) => (
            <ContentLayer
              key={`${milestone.navigationTitle}-content`}
              milestone={milestone}
              index={index}
              total={milestones.length}
              progress={smoothProgress}
              reduceMotion={reduceMotion}
              viewport={viewport}
            />
          ))}
        </div>

        {!viewport.isNarrow && (
          <div
            style={{
              position: "absolute",
              right: "clamp(26px, 4vw, 70px)",
              bottom: viewport.isShortScreen
                ? "24px"
                : "clamp(28px, 4vw, 58px)",
              zIndex: 15,
              display: "flex",
              alignItems: "flex-end",
              gap: "15px",
              color: "rgba(255,255,255,0.44)",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "8px",
              fontWeight: 600,
              letterSpacing: "0.21em",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
            }}
          >
            <span>Scroll to explore</span>

            <div
              style={{
                position: "relative",
                width: "1px",
                height: viewport.isShortScreen ? "42px" : "58px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.17)",
              }}
            >
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: viewport.isShortScreen ? [0, 20, 0] : [0, 34, 0],
                        opacity: [0.2, 1, 0.2],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "block",
                  width: "1px",
                  height: "20px",
                  background: "#ffffff",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}