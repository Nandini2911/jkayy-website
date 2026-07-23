"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

// Desktop and tablet video
const DESKTOP_CLOUDINARY_VIDEO_URL =
  "https://player.cloudinary.com/embed/?cloud_name=dl9zkv77&public_id=Untitled_design_2_ftmu1d";

// Mobile video
const MOBILE_CLOUDINARY_VIDEO_URL =
  "https://player.cloudinary.com/embed/?cloud_name=dl9zkv77&public_id=2e39652c-6c4f-4c82-94a4-8b982d3ce785_m2vatb";

const SECTION_BACKGROUND_IMAGE =
  "/images/COVAH The Cavern.webp";

const VIDEO_COVER_IMAGE =
  "/images/COVAH The Cavern.webp";

function getAutoplayVideoUrl(url: string) {
  const separator = url.includes("?") ? "&" : "?";

  return `${url}${separator}autoplay=true&controls=true&playsinline=true`;
}

export default function FeaturedPerformanceReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const resizeFrameRef = useRef<number | null>(null);

  const [screenWidth, setScreenWidth] =
    useState(1440);

  const [videoStarted, setVideoStarted] =
    useState(false);

  /*
   * Responsive screen size.
   */
  useEffect(() => {
    const updateScreenWidth = () => {
      if (resizeFrameRef.current !== null) {
        cancelAnimationFrame(
          resizeFrameRef.current,
        );
      }

      resizeFrameRef.current =
        requestAnimationFrame(() => {
          setScreenWidth(window.innerWidth);
          resizeFrameRef.current = null;
        });
    };

    updateScreenWidth();

    window.addEventListener(
      "resize",
      updateScreenWidth,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateScreenWidth,
      );

      if (resizeFrameRef.current !== null) {
        cancelAnimationFrame(
          resizeFrameRef.current,
        );
      }
    };
  }, []);

  /*
   * Stop video when the complete section
   * leaves the viewport.
   *
   * Setting videoStarted to false unmounts
   * the iframe, which completely stops audio
   * and video playback.
   */
  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVideoStarted(false);
        }
      },
      {
        threshold: 0.02,
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Stop video when browser tab becomes hidden.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVideoStarted(false);
      }
    };

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

  const isMobile = screenWidth <= 767;
  const isTablet = screenWidth <= 991;

  const selectedVideoUrl = isMobile
    ? MOBILE_CLOUDINARY_VIDEO_URL
    : DESKTOP_CLOUDINARY_VIDEO_URL;

  const autoplayVideoUrl =
    getAutoplayVideoUrl(selectedVideoUrl);

  const sectionStyle: CSSProperties = {
    position: "relative",
    zIndex: 10,
    isolation: "isolate",

    display: "flex",
    alignItems: "center",

    width: "100%",
    minHeight: "100svh",

    margin: 0,
    padding: isMobile
      ? "60px 16px"
      : isTablet
        ? "70px 28px"
        : "80px 48px",

    boxSizing: "border-box",
    overflow: "hidden",

    color: "#ffffff",
    background: "rgba(5, 5, 5, 0.82)",

    backdropFilter: isMobile
      ? "blur(8px)"
      : "blur(12px)",

    WebkitBackdropFilter: isMobile
      ? "blur(8px)"
      : "blur(12px)",

    borderTop:
      "1px solid rgba(255,255,255,0.14)",

    borderTopLeftRadius: isMobile
      ? "24px"
      : "42px",

    borderTopRightRadius: isMobile
      ? "24px"
      : "42px",

    boxShadow:
      "0 -34px 100px rgba(0,0,0,0.78), 0 -1px 0 rgba(255,255,255,0.04)",

    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
  };

  return (
    <section
      ref={sectionRef}
      id="featured-performance"
      style={sectionStyle}
    >
      {/* Section Background Image */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -3,

          backgroundImage: `url("${SECTION_BACKGROUND_IMAGE}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          opacity: isMobile ? 0.7 : 0.82,

          transform: "scale(1.03)",
          pointerEvents: "none",
        }}
      />

      {/* Dark Overlay */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,

          pointerEvents: "none",

          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.16), rgba(0,0,0,0.46)), linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0.04), rgba(0,0,0,0.28))",
        }}
      />

      {/* Background Glow */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: -1,

          width: isMobile ? "100%" : "78%",
          height: isMobile ? "55%" : "74%",

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(96,165,250,0.06), transparent 70%)",

          filter: isMobile
            ? "blur(22px)"
            : "blur(32px)",

          transform: "translate(-50%, -50%)",

          pointerEvents: "none",
        }}
      />

      {/* Main Content */}

      <div
        style={{
          position: "relative",
          zIndex: 2,

          width: "100%",
          maxWidth: "1400px",

          margin: "0 auto",
        }}
      >
        {/* Video Frame */}

        <div
          style={{
            position: "relative",

            width: "100%",

            height: isMobile
              ? "min(75svh, 500px)"
              : isTablet
                ? "min(82svh, 620px)"
                : "min(86svh, 720px)",

            overflow: "hidden",

            border:
              "1px solid rgba(255,255,255,0.24)",

            borderRadius: isMobile
              ? "18px"
              : isTablet
                ? "22px"
                : "26px",

            background: "#000000",

            boxShadow:
              "0 28px 90px rgba(0,0,0,0.5)",

            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* 
            The iframe is only rendered after
            clicking the play button.

            When videoStarted becomes false,
            iframe is removed and video stops.
          */}

          {videoStarted && (
            <iframe
              key={
                isMobile
                  ? "mobile-playing-video"
                  : "desktop-playing-video"
              }
              src={autoplayVideoUrl}
              title="JKAYY featured performance reel"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{
                position: "absolute",
                inset: 0,

                display: "block",

                width: "100%",
                height: "100%",

                border: 0,
                background: "#000000",
              }}
            />
          )}

          {/* Video Cover */}

          {!videoStarted && (
            <button
              type="button"
              onClick={() =>
                setVideoStarted(true)
              }
              aria-label="Play JKAYY featured performance reel"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 4,

                display: "block",

                width: "100%",
                height: "100%",

                padding: 0,
                border: 0,

                overflow: "hidden",
                cursor: "pointer",

                backgroundColor: "#000000",
                backgroundImage: `url("${VIDEO_COVER_IMAGE}")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              {/* Cover Dark Overlay */}

              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,

                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.52), rgba(0,0,0,0.05) 60%)",

                  pointerEvents: "none",
                }}
              />

              {/* Play Button */}

              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  width: isMobile
                    ? "62px"
                    : "78px",

                  height: isMobile
                    ? "62px"
                    : "78px",

                  border:
                    "1px solid rgba(255,255,255,0.48)",

                  borderRadius: "50%",

                  color: "#000000",
                  background:
                    "rgba(255,255,255,0.92)",

                  boxShadow:
                    "0 15px 45px rgba(0,0,0,0.45)",

                  transform:
                    "translate(-50%, -50%)",

                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter:
                    "blur(8px)",

                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    width: 0,
                    height: 0,

                    marginLeft: "5px",

                    borderTop: isMobile
                      ? "9px solid transparent"
                      : "11px solid transparent",

                    borderBottom: isMobile
                      ? "9px solid transparent"
                      : "11px solid transparent",

                    borderLeft: isMobile
                      ? "15px solid #000000"
                      : "18px solid #000000",
                  }}
                />
              </span>
            </button>
          )}

          {/* Frame Highlight */}

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,

              borderRadius: "inherit",

              background:
                "linear-gradient(145deg, rgba(255,255,255,0.06), transparent 26%, transparent 76%, rgba(255,255,255,0.02))",

              pointerEvents: "none",
            }}
          />
        </div>

        {/* Bottom Title */}

        <div
          style={{
            marginTop: isMobile
              ? "16px"
              : "20px",
          }}
        >
          <h2
            style={{
              margin: 0,

              color: "#ffffff",

              fontSize: isMobile
                ? "22px"
                : "clamp(24px, 2.5vw, 36px)",

              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",

              textShadow:
                "0 3px 18px rgba(0,0,0,0.9)",
            }}
          >
            The JKAYY Experience
          </h2>

          <p
            style={{
              margin: "7px 0 0",

              color:
                "rgba(255,255,255,0.78)",

              fontSize: "10px",
              fontWeight: 500,

              letterSpacing: "0.22em",
              textTransform: "uppercase",

              textShadow:
                "0 2px 12px rgba(0,0,0,0.9)",
            }}
          >
            Live Performance
          </p>
        </div>
      </div>
    </section>
  );
}