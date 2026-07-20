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
  useEffect,
  useRef,
  useState,
  type CSSProperties,
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

type ShowcaseItem = {
  number: string;
  label: string;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
};

type PreviewVideoProps = {
  item: ShowcaseItem;
  isMobile: boolean;
  modalOpen: boolean;
};

const showcaseItems: ShowcaseItem[] = [
  {
    number: "01",
    label: "Live Performance",
    title: "Where sound becomes an experience.",
    description:
      "An atmosphere built through music, movement and an unforgettable connection with the audience.",
    videoUrl:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784203712/k1_1_oegxxn.mp4",
    imageUrl: "/images/k1.webp",
  },
  {
    number: "02",
    label: "The Energy",
    title: "Every stage carries a different emotion.",
    description:
      "From intimate moments to powerful live energy, every performance is created to be felt.",
    videoUrl:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784116924/Untitled_design_2_ftmu1d.mp4",
    imageUrl: "/images/k2.webp",
  },
  {
    number: "03",
    label: "Behind The Music",
    title: "Created with intention. Performed with feeling.",
    description:
      "A closer look at the moments, preparation and emotion behind every JKAYY performance.",
    videoUrl:
      "https://res.cloudinary.com/dl9zkv77/video/upload/Untitled_design_awrbkq.mp4",
    imageUrl: "/images/k3.webp",
  },
  {
    number: "04",
    label: "Unforgettable Nights",
    title: "The music ends. The feeling remains.",
    description:
      "Cinematic performances designed to stay with the audience long after the final note.",
    videoUrl:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784203971/k2_1_rntepf.mp4",
    imageUrl: "/images/k4.webp",
  },
];

function getOptimizedVideoUrl(
  videoUrl: string,
  width: number,
  quality: "eco" | "good" = "eco",
) {
  if (!videoUrl.includes("/video/upload/")) {
    return videoUrl;
  }

  const transformations = [
    "f_mp4",
    "c_limit",
    `w_${width}`,
    `q_auto:${quality}`,
  ].join(",");

  return videoUrl.replace(
    "/video/upload/",
    `/video/upload/${transformations}/`,
  );
}

function PreviewVideo({
  item,
  isMobile,
  modalOpen,
}: PreviewVideoProps) {
  const wrapperRef =
    useRef<HTMLDivElement | null>(null);

  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const [shouldLoad, setShouldLoad] =
    useState(false);

  const [isVisible, setIsVisible] =
    useState(false);

  const optimizedVideoUrl =
    getOptimizedVideoUrl(
      item.videoUrl,
      isMobile ? 720 : 1440,
      isMobile ? "eco" : "good",
    );

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const loadObserver =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            loadObserver.disconnect();
          }
        },
        {
          rootMargin: isMobile
            ? "450px 0px"
            : "650px 0px",

          threshold: 0.01,
        },
      );

    loadObserver.observe(element);

    return () => {
      loadObserver.disconnect();
    };
  }, [isMobile]);

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const visibilityObserver =
      new IntersectionObserver(
        ([entry]) => {
          const requiredRatio = isMobile
            ? 0.42
            : 0.28;

          setIsVisible(
            entry.isIntersecting &&
              entry.intersectionRatio >=
                requiredRatio,
          );
        },
        {
          threshold: isMobile
            ? [0, 0.2, 0.42, 0.65]
            : [0, 0.15, 0.28, 0.5],

          rootMargin: isMobile
            ? "0px 0px -8% 0px"
            : "0px 0px -5% 0px",
        },
      );

    visibilityObserver.observe(element);

    return () => {
      visibilityObserver.disconnect();
    };
  }, [isMobile]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const shouldPlay =
      shouldLoad &&
      isVisible &&
      !modalOpen;

    if (!shouldPlay) {
      video.pause();
      return;
    }

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser may delay autoplay.
      });
    }
  }, [
    shouldLoad,
    isVisible,
    modalOpen,
    optimizedVideoUrl,
  ]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#e9e9e7",
      }}
    >
      <video
        ref={videoRef}
        src={
          shouldLoad
            ? optimizedVideoUrl
            : undefined
        }
        poster={item.imageUrl}
        muted
        loop
        playsInline
        preload={
          isMobile ? "none" : "metadata"
        }
        controls={false}
        disablePictureInPicture
        onCanPlay={() => {
          const video = videoRef.current;

          if (
            video &&
            isVisible &&
            !modalOpen
          ) {
            video.play().catch(() => {
              // Autoplay can be delayed.
            });
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          background: "#e9e9e7",
          pointerEvents: "none",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}

export default function PerformanceShowcaseSection() {
  const reduceMotion = useReducedMotion();

  const [isMobile, setIsMobile] =
    useState(false);

  const [isTablet, setIsTablet] =
    useState(false);

  const [selectedVideo, setSelectedVideo] =
    useState<ShowcaseItem | null>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateScreenSize = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame =
        requestAnimationFrame(() => {
          const width = window.innerWidth;

          setIsMobile(width <= 767);

          setIsTablet(
            width > 767 && width <= 1100,
          );
        });
    };

    updateScreenSize();

    window.addEventListener(
      "resize",
      updateScreenSize,
      {
        passive: true,
      },
    );

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        updateScreenSize,
      );
    };
  }, []);

  useEffect(() => {
    if (!selectedVideo) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const previousTouchAction =
      document.body.style.touchAction;

    document.body.style.overflow =
      "hidden";

    document.body.style.touchAction =
      "none";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.body.style.touchAction =
        previousTouchAction;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [selectedVideo]);

  const sectionStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    overflow: "hidden",

    background:
      "linear-gradient(180deg, #ffffff 0%, #f7f7f5 48%, #ffffff 100%)",

    color: "#111111",

    fontFamily:
      cleanFont.style.fontFamily,

    padding: isMobile
      ? "100px 18px 120px"
      : isTablet
        ? "130px 36px 160px"
        : "170px 5vw 200px",
  };

  const containerStyle: CSSProperties = {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
  };

  const modalVideoUrl = selectedVideo
    ? getOptimizedVideoUrl(
        selectedVideo.videoUrl,
        isMobile ? 1080 : 1920,
        "good",
      )
    : "";

  return (
    <>
      <section
        id="performance-showcase"
        style={sectionStyle}
      >
        {/* SOFT BACKGROUND GLOW */}

        <div
          aria-hidden="true"
          style={{
            position: "absolute",

            top: isMobile
              ? "20px"
              : "-80px",

            left: "50%",

            width: isMobile
              ? "480px"
              : "1100px",

            height: isMobile
              ? "480px"
              : "1100px",

            transform:
              "translateX(-50%)",

            borderRadius: "50%",

            background:
              "radial-gradient(circle, rgba(220,220,215,0.52) 0%, rgba(255,255,255,0) 68%)",

            filter: isMobile
              ? "blur(24px)"
              : "blur(45px)",

            pointerEvents: "none",
          }}
        />

        {/* LARGE BACKGROUND TEXT */}

        <div
          aria-hidden="true"
          style={{
            position: "absolute",

            top: isMobile
              ? "82px"
              : "115px",

            left: "50%",

            width: "100%",

            transform:
              "translateX(-50%)",

            textAlign: "center",

            fontFamily:
              luxuryFont.style.fontFamily,

            fontSize: isMobile
              ? "22vw"
              : "17vw",

            lineHeight: 0.8,
            fontWeight: 500,
            fontStyle: "italic",

            letterSpacing: "-0.075em",

            color:
              "rgba(0,0,0,0.025)",

            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          JKAYY
        </div>

        <div style={containerStyle}>
          {/* HEADING AND SUBHEADING */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 70,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: reduceMotion
                ? 0
                : 1.15,

              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "relative",

              width: "100%",
              maxWidth: "1150px",

              margin: isMobile
                ? "0 auto 100px"
                : "0 auto 165px",

              textAlign: "center",

              willChange: reduceMotion
                ? "auto"
                : "transform, opacity",
            }}
          >
            {/* SECTION LABEL */}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                gap: "14px",

                marginBottom: isMobile
                  ? "22px"
                  : "30px",

                color:
                  "rgba(15,15,15,0.5)",

                fontFamily:
                  cleanFont.style
                    .fontFamily,

                fontSize: isMobile
                  ? "9px"
                  : "10px",

                fontWeight: 600,

                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "block",

                  width: isMobile
                    ? "35px"
                    : "55px",

                  height: "1px",

                  background:
                    "rgba(15,15,15,0.25)",
                }}
              />

              Selected Performances

              <span
                style={{
                  display: "block",

                  width: isMobile
                    ? "35px"
                    : "55px",

                  height: "1px",

                  background:
                    "rgba(15,15,15,0.25)",
                }}
              />
            </div>

            {/* MAIN HEADING */}

            <h2
              style={{
                maxWidth: "1150px",
                margin: 0,

                fontFamily:
                  luxuryFont.style
                    .fontFamily,

                fontSize: isMobile
                  ? "clamp(48px, 14vw, 72px)"
                  : isTablet
                    ? "clamp(72px, 9vw, 100px)"
                    : "clamp(88px, 8vw, 142px)",

                lineHeight: isMobile
                  ? 0.92
                  : 0.84,

                fontWeight: 500,

                letterSpacing: "-0.065em",

                color: "#101010",

                textTransform: "uppercase",
              }}
            >
              Every Performance
              <br />

              <span
                style={{
                  display: "inline-block",

                  color:
                    "rgba(15,15,15,0.42)",

                  fontWeight: 400,
                  fontStyle: "italic",

                  textTransform: "none",
                }}
              >
                tells a story.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              style={{
                maxWidth: "680px",

                margin: isMobile
                  ? "28px auto 0"
                  : "42px auto 0",

                fontFamily:
                  cleanFont.style
                    .fontFamily,

                fontSize: isMobile
                  ? "14px"
                  : "17px",

                lineHeight: 1.8,
                fontWeight: 300,

                letterSpacing: "0.01em",

                color:
                  "rgba(15,15,15,0.56)",
              }}
            >
              More than music. Every stage,
              every movement and every moment
              becomes part of an experience
              created to be remembered.
            </p>
          </motion.div>

          {/* ZIG-ZAG ROWS */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",

              gap: isMobile
                ? "145px"
                : isTablet
                  ? "185px"
                  : "240px",
            }}
          >
            {showcaseItems.map(
              (item, index) => {
                const reverse =
                  index % 2 !== 0;

                return (
                  <motion.article
                    key={item.number}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,

                            x: reverse
                              ? 80
                              : -80,

                            y: 35,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    viewport={{
                      once: true,

                      amount: isMobile
                        ? 0.1
                        : 0.22,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : isMobile
                          ? 0.85
                          : 1.15,

                      ease: [
                        0.16, 1, 0.3, 1,
                      ],
                    }}
                    style={{
                      position: "relative",

                      display: "flex",

                      flexDirection: isMobile
                        ? "column"
                        : reverse
                          ? "row-reverse"
                          : "row",

                      alignItems: "center",

                      justifyContent:
                        "space-between",

                      width: "100%",

                      gap: isMobile
                        ? "68px"
                        : isTablet
                          ? "60px"
                          : "95px",

                      willChange: reduceMotion
                        ? "auto"
                        : "transform, opacity",
                    }}
                  >
                    {/* VIDEO AND IMAGE */}

                    <div
                      style={{
                        position: "relative",

                        width: isMobile
                          ? "100%"
                          : isTablet
                            ? "59%"
                            : "62%",

                        flexShrink: 0,

                        paddingBottom:
                          isMobile
                            ? "42px"
                            : "50px",
                      }}
                    >
                      <motion.div
                        whileHover={
                          isMobile ||
                          reduceMotion
                            ? undefined
                            : {
                                scale: 1.012,
                              }
                        }
                        transition={{
                          duration: 0.55,

                          ease: [
                            0.16, 1, 0.3, 1,
                          ],
                        }}
                        style={{
                          position: "relative",

                          width: "100%",

                          aspectRatio: "16 / 10",

                          overflow: "hidden",
                          isolation: "isolate",

                          background: "#e9e9e7",

                          border:
                            "1px solid rgba(15,15,15,0.12)",

                          borderRadius:
                            isMobile
                              ? "4px"
                              : "6px",

                          boxShadow: isMobile
                            ? "0 20px 50px rgba(25,25,25,0.12)"
                            : "0 35px 90px rgba(25,25,25,0.14)",

                          transform:
                            "translateZ(0)",

                          backfaceVisibility:
                            "hidden",
                        }}
                      >
                        <PreviewVideo
                          item={item}
                          isMobile={isMobile}
                          modalOpen={
                            selectedVideo !==
                            null
                          }
                        />

                        {/* DARK VIDEO OVERLAY */}

                        <div
                          style={{
                            position:
                              "absolute",

                            inset: 0,
                            zIndex: 1,

                            pointerEvents:
                              "none",

                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.01) 35%, rgba(0,0,0,0.55) 100%)",
                          }}
                        />

                        {/* NOW PLAYING */}

                        <div
                          style={{
                            position:
                              "absolute",

                            zIndex: 3,

                            left: isMobile
                              ? "16px"
                              : "24px",

                            bottom: isMobile
                              ? "16px"
                              : "22px",

                            display: "flex",

                            alignItems:
                              "center",

                            gap: "11px",

                            color:
                              "rgba(255,255,255,0.88)",

                            fontFamily:
                              cleanFont.style
                                .fontFamily,

                            fontSize:
                              isMobile
                                ? "8px"
                                : "9px",

                            fontWeight: 600,

                            letterSpacing:
                              "0.22em",

                            textTransform:
                              "uppercase",

                            pointerEvents:
                              "none",
                          }}
                        >
                          <span
                            style={{
                              width: "7px",
                              height: "7px",

                              borderRadius:
                                "50%",

                              background:
                                "#ffffff",

                              boxShadow:
                                "0 0 15px rgba(255,255,255,0.85)",
                            }}
                          />

                          Click to watch
                        </div>

                        {/* PLAY BUTTON */}

                        <motion.div
                          aria-hidden="true"
                          whileHover={
                            isMobile
                              ? undefined
                              : {
                                  scale: 1.08,
                                }
                          }
                          style={{
                            position:
                              "absolute",

                            zIndex: 3,

                            top: "50%",
                            left: "50%",

                            display: "flex",

                            alignItems:
                              "center",

                            justifyContent:
                              "center",

                            width: isMobile
                              ? "58px"
                              : "76px",

                            height: isMobile
                              ? "58px"
                              : "76px",

                            transform:
                              "translate(-50%, -50%)",

                            borderRadius:
                              "50%",

                            border:
                              "1px solid rgba(255,255,255,0.65)",

                            background:
                              "rgba(0,0,0,0.3)",

                            backdropFilter:
                              isMobile
                                ? "none"
                                : "blur(12px)",

                            WebkitBackdropFilter:
                              isMobile
                                ? "none"
                                : "blur(12px)",

                            boxShadow:
                              isMobile
                                ? "0 10px 25px rgba(0,0,0,0.22)"
                                : "0 15px 40px rgba(0,0,0,0.22)",

                            pointerEvents:
                              "none",
                          }}
                        >
                          <span
                            style={{
                              width: 0,
                              height: 0,

                              marginLeft:
                                "5px",

                              borderTop:
                                isMobile
                                  ? "8px solid transparent"
                                  : "10px solid transparent",

                              borderBottom:
                                isMobile
                                  ? "8px solid transparent"
                                  : "10px solid transparent",

                              borderLeft:
                                isMobile
                                  ? "13px solid #ffffff"
                                  : "17px solid #ffffff",
                            }}
                          />
                        </motion.div>

                        {/* VIDEO CLICK BUTTON */}

                        <button
                          type="button"
                          aria-label={`Play ${item.title} with audio`}
                          onClick={() => {
                            setSelectedVideo(
                              item,
                            );
                          }}
                          style={{
                            position:
                              "absolute",

                            inset: 0,
                            zIndex: 5,

                            width: "100%",
                            height: "100%",

                            padding: 0,
                            border: 0,
                            outline: 0,

                            background:
                              "transparent",

                            cursor: "pointer",

                            touchAction:
                              "manipulation",

                            WebkitTapHighlightColor:
                              "transparent",
                          }}
                        />
                      </motion.div>

                      {/* OVERLAPPING IMAGE */}

                      <motion.div
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,

                                scale: 0.9,

                                x: reverse
                                  ? -35
                                  : 35,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.25,
                        }}
                        transition={{
                          duration: reduceMotion
                            ? 0
                            : isMobile
                              ? 0.75
                              : 1.05,

                          delay: reduceMotion
                            ? 0
                            : 0.12,

                          ease: [
                            0.16, 1, 0.3, 1,
                          ],
                        }}
                        style={{
                          position:
                            "absolute",

                          zIndex: 4,

                          width: isMobile
                            ? "42%"
                            : isTablet
                              ? "34%"
                              : "31%",

                          aspectRatio: "4 / 5",

                          right: isMobile
                            ? "6%"
                            : reverse
                              ? "auto"
                              : "-9%",

                          left: isMobile
                            ? "auto"
                            : reverse
                              ? "-9%"
                              : "auto",

                          bottom: isMobile
                            ? "-14%"
                            : "-12%",

                          overflow: "hidden",

                          background:
                            "#eeeeec",

                          border: isMobile
                            ? "4px solid #ffffff"
                            : "6px solid #ffffff",

                          borderRadius:
                            "3px",

                          boxShadow:
                            isMobile
                              ? "0 18px 42px rgba(25,25,25,0.17)"
                              : "0 30px 70px rgba(25,25,25,0.2)",

                          transform:
                            "translateZ(0)",

                          backfaceVisibility:
                            "hidden",
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={`${item.label} visual`}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "100%",

                            display: "block",

                            objectFit:
                              "cover",
                          }}
                        />

                        <div
                          style={{
                            position:
                              "absolute",

                            inset: 0,

                            pointerEvents:
                              "none",

                            background:
                              "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.22) 100%)",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* TEXT CONTENT */}

                    <motion.div
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 50,
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
                        duration: reduceMotion
                          ? 0
                          : 0.9,

                        delay: reduceMotion
                          ? 0
                          : 0.1,

                        ease: [
                          0.16, 1, 0.3, 1,
                        ],
                      }}
                      style={{
                        position: "relative",

                        width: isMobile
                          ? "100%"
                          : isTablet
                            ? "34%"
                            : "31%",

                        paddingLeft:
                          !isMobile &&
                          !reverse
                            ? "20px"
                            : 0,

                        paddingRight:
                          !isMobile &&
                          reverse
                            ? "20px"
                            : 0,

                        textAlign: isMobile
                          ? "left"
                          : reverse
                            ? "right"
                            : "left",

                        willChange:
                          reduceMotion
                            ? "auto"
                            : "transform, opacity",
                      }}
                    >
                      {/* NUMBER AND LABEL */}

                      <div
                        style={{
                          display: "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            isMobile
                              ? "flex-start"
                              : reverse
                                ? "flex-end"
                                : "flex-start",

                          gap: "13px",

                          marginBottom:
                            "25px",

                          fontFamily:
                            cleanFont.style
                              .fontFamily,
                        }}
                      >
                        {!reverse ||
                        isMobile ? (
                          <>
                            <span
                              style={{
                                fontSize:
                                  "10px",

                                fontWeight:
                                  500,

                                color:
                                  "rgba(15,15,15,0.4)",

                                letterSpacing:
                                  "0.18em",
                              }}
                            >
                              {item.number}
                            </span>

                            <span
                              style={{
                                width:
                                  "45px",

                                height:
                                  "1px",

                                background:
                                  "rgba(15,15,15,0.22)",
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <span
                              style={{
                                width:
                                  "45px",

                                height:
                                  "1px",

                                background:
                                  "rgba(15,15,15,0.22)",
                              }}
                            />

                            <span
                              style={{
                                fontSize:
                                  "10px",

                                fontWeight:
                                  500,

                                color:
                                  "rgba(15,15,15,0.4)",

                                letterSpacing:
                                  "0.18em",
                              }}
                            >
                              {item.number}
                            </span>
                          </>
                        )}

                        <span
                          style={{
                            fontSize:
                              "9px",

                            fontWeight: 600,

                            letterSpacing:
                              "0.22em",

                            textTransform:
                              "uppercase",

                            color:
                              "rgba(15,15,15,0.56)",
                          }}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* CARD TITLE */}

                      <h3
                        style={{
                          margin: 0,

                          fontFamily:
                            luxuryFont.style
                              .fontFamily,

                          fontSize: isMobile
                            ? "clamp(38px, 11vw, 54px)"
                            : isTablet
                              ? "46px"
                              : "clamp(50px, 4.6vw, 72px)",

                          lineHeight: 0.98,

                          fontWeight: 500,

                          letterSpacing:
                            "-0.045em",

                          color: "#111111",
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* CARD DESCRIPTION */}

                      <p
                        style={{
                          maxWidth: "480px",

                          margin:
                            isMobile ||
                            !reverse
                              ? "25px 0 0"
                              : "25px 0 0 auto",

                          fontFamily:
                            cleanFont.style
                              .fontFamily,

                          fontSize:
                            isMobile
                              ? "14px"
                              : "16px",

                          lineHeight: 1.75,

                          fontWeight: 300,

                          color:
                            "rgba(15,15,15,0.55)",
                        }}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.article>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={
              selectedVideo.title
            }
            onClick={() => {
              setSelectedVideo(null);
            }}
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
              duration: 0.25,
            }}
            style={{
              position: "fixed",

              inset: 0,
              zIndex: 99999,

              display: "flex",

              alignItems: "center",
              justifyContent: "center",

              padding: isMobile
                ? "18px"
                : "40px",

              background: isMobile
                ? "rgba(0,0,0,0.96)"
                : "rgba(0,0,0,0.9)",

              backdropFilter: isMobile
                ? "none"
                : "blur(12px)",

              WebkitBackdropFilter:
                isMobile
                  ? "none"
                  : "blur(12px)",

              touchAction: "none",

              fontFamily:
                cleanFont.style.fontFamily,
            }}
          >
            {/* MODAL INFORMATION */}

            <motion.div
              initial={{
                opacity: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.3,
                delay: 0.05,
              }}
              style={{
                position: "absolute",

                top: isMobile
                  ? "20px"
                  : "30px",

                left: isMobile
                  ? "20px"
                  : "40px",

                zIndex: 3,

                maxWidth: isMobile
                  ? "70%"
                  : "600px",

                color: "#ffffff",
              }}
            >
              <div
                style={{
                  marginBottom: "8px",

                  fontFamily:
                    cleanFont.style
                      .fontFamily,

                  fontSize: isMobile
                    ? "8px"
                    : "9px",

                  fontWeight: 600,

                  letterSpacing:
                    "0.24em",

                  textTransform:
                    "uppercase",

                  color:
                    "rgba(255,255,255,0.55)",
                }}
              >
                {selectedVideo.number} ·{" "}
                {selectedVideo.label}
              </div>

              <div
                style={{
                  fontFamily:
                    luxuryFont.style
                      .fontFamily,

                  fontSize: isMobile
                    ? "21px"
                    : "30px",

                  lineHeight: 1.05,

                  fontWeight: 500,

                  letterSpacing:
                    "-0.025em",
                }}
              >
                {selectedVideo.title}
              </div>
            </motion.div>

            {/* CLOSE BUTTON */}

            <motion.button
              type="button"
              aria-label="Close video"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedVideo(null);
              }}
              whileHover={
                isMobile
                  ? undefined
                  : {
                      scale: 1.08,
                    }
              }
              whileTap={{
                scale: 0.94,
              }}
              style={{
                position: "absolute",

                top: isMobile
                  ? "18px"
                  : "28px",

                right: isMobile
                  ? "18px"
                  : "38px",

                zIndex: 5,

                display: "flex",

                alignItems: "center",

                justifyContent:
                  "center",

                width: isMobile
                  ? "44px"
                  : "50px",

                height: isMobile
                  ? "44px"
                  : "50px",

                padding: 0,

                borderRadius: "50%",

                border:
                  "1px solid rgba(255,255,255,0.28)",

                background:
                  "rgba(255,255,255,0.1)",

                backdropFilter: isMobile
                  ? "none"
                  : "blur(10px)",

                WebkitBackdropFilter:
                  isMobile
                    ? "none"
                    : "blur(10px)",

                color: "#ffffff",

                fontFamily:
                  luxuryFont.style
                    .fontFamily,

                fontSize: isMobile
                  ? "28px"
                  : "32px",

                fontWeight: 300,
                lineHeight: 1,

                cursor: "pointer",

                touchAction:
                  "manipulation",

                WebkitTapHighlightColor:
                  "transparent",
              }}
            >
              ×
            </motion.button>

            {/* VIDEO BOX */}

            <motion.div
              onClick={(event) => {
                event.stopPropagation();
              }}
              initial={{
                opacity: 0,

                scale: isMobile
                  ? 0.96
                  : 0.9,

                y: isMobile
                  ? 15
                  : 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              transition={{
                duration: isMobile
                  ? 0.3
                  : 0.42,

                ease: [
                  0.16, 1, 0.3, 1,
                ],
              }}
              style={{
                position: "relative",

                width: isMobile
                  ? "100%"
                  : "min(88vw, 1400px)",

                maxHeight: isMobile
                  ? "74svh"
                  : "82vh",

                aspectRatio: "16 / 9",

                overflow: "hidden",

                borderRadius: isMobile
                  ? "6px"
                  : "10px",

                border:
                  "1px solid rgba(255,255,255,0.17)",

                background: "#000000",

                boxShadow: isMobile
                  ? "0 25px 65px rgba(0,0,0,0.55)"
                  : "0 40px 120px rgba(0,0,0,0.65)",

                transform:
                  "translateZ(0)",

                backfaceVisibility:
                  "hidden",
              }}
            >
              <video
                key={
                  selectedVideo.videoUrl
                }
                src={modalVideoUrl}
                poster={
                  selectedVideo.imageUrl
                }
                controls
                autoPlay
                playsInline
                preload="metadata"
                controlsList="nodownload"
                style={{
                  width: "100%",
                  height: "100%",

                  display: "block",

                  objectFit: "contain",

                  background:
                    "#000000",
                }}
              >
                Your browser does not
                support the video tag.
              </video>
            </motion.div>

            {/* BOTTOM NOTE */}

            <div
              style={{
                position: "absolute",

                left: "50%",

                bottom: isMobile
                  ? "18px"
                  : "25px",

                transform:
                  "translateX(-50%)",

                color:
                  "rgba(255,255,255,0.45)",

                fontFamily:
                  cleanFont.style
                    .fontFamily,

                fontSize: isMobile
                  ? "7px"
                  : "8px",

                fontWeight: 500,

                letterSpacing:
                  "0.18em",

                textTransform:
                  "uppercase",

                whiteSpace: "nowrap",
              }}
            >
              Press ESC or click outside to
              close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}