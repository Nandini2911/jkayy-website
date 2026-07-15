"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";

const PERFORMANCE_VIDEO = "/videos/featured.mp4";

// Full section background image
const SECTION_BACKGROUND_IMAGE =
  "/images/featured-section-bg.webp";

// Video cover/poster image
const VIDEO_POSTER_IMAGE =
  "/images/featured-video-cover.webp";

export default function FeaturedPerformanceReel() {
  const [screenWidth, setScreenWidth] = useState(1440);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth <= 767;
  const isTablet = screenWidth <= 991;

  const sectionStyle: CSSProperties = {
    position: "relative",
    zIndex: 5,
    isolation: "isolate",

    display: "flex",
    alignItems: "center",

    width: "100%",
    minHeight: "100svh",

    boxSizing: "border-box",

    padding: isMobile
      ? "60px 16px"
      : isTablet
        ? "70px 28px"
        : "80px 48px",

    overflow: "hidden",

    color: "#ffffff",

    background: "rgba(5, 5, 5, 0.16)",

    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",

    borderTop: "1px solid rgba(255,255,255,0.12)",

    boxShadow: "0 -30px 80px rgba(0,0,0,0.3)",
  };

  return (
    <section
      id="featured-performance"
      style={sectionStyle}
    >
      {/* Separate section background image */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -3,

          backgroundImage: `url("${SECTION_BACKGROUND_IMAGE}")`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          opacity: isMobile ? 0.7 : 0.82,

          transform: "scale(1.03)",
          pointerEvents: "none",
        }}
      />

      {/* Light dark overlay */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,

          pointerEvents: "none",

          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3)), linear-gradient(90deg, rgba(0,0,0,0.22), rgba(0,0,0,0.02), rgba(0,0,0,0.22))",
        }}
      />

      {/* Small glow */}

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

          filter: isMobile ? "blur(22px)" : "blur(32px)",

          transform: "translate(-50%, -50%)",

          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,

          width: "100%",
          maxWidth: "1400px",

          margin: "0 auto",
        }}
      >
        {/* Section heading */}

        <div
          style={{
            display: "flex",
            alignItems: "center",

            gap: isMobile ? "10px" : "16px",

            marginBottom: isMobile ? "20px" : "26px",
          }}
        >
          <span
            style={{
              color: "#60a5fa",

              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "0.25em",

              textShadow:
                "0 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            03
          </span>

          <span
            style={{
              width: isMobile ? "28px" : "44px",
              height: "1px",

              background:
                "linear-gradient(90deg, #60a5fa, rgba(96,165,250,0.2))",
            }}
          />

          <span
            style={{
              color: "rgba(255,255,255,0.88)",

              fontSize: isMobile ? "9px" : "11px",
              fontWeight: 500,

              letterSpacing: isMobile
                ? "0.15em"
                : "0.22em",

              textTransform: "uppercase",

              textShadow:
                "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            Featured Performance Reel
          </span>
        </div>

        {/* Video frame */}

        <div
          style={{
            position: "relative",

            width: "100%",

            height: isMobile
              ? "min(55svh, 500px)"
              : isTablet
                ? "min(62svh, 620px)"
                : "min(66svh, 720px)",

            overflow: "hidden",

            border:
              "1px solid rgba(255,255,255,0.24)",

            borderRadius: isMobile
              ? "18px"
              : isTablet
                ? "22px"
                : "26px",

            background: "rgba(0,0,0,0.35)",

            boxShadow:
              "0 26px 70px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <video
            src={PERFORMANCE_VIDEO}
            controls
            playsInline
            preload="metadata"

            // Separate video cover image
            poster={VIDEO_POSTER_IMAGE}

            style={{
              position: "absolute",
              inset: 0,

              display: "block",

              width: "100%",
              height: "100%",

              border: 0,

              background: "#000000",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          >
            Your browser does not support the video tag.
          </video>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,

              borderRadius: "inherit",

              pointerEvents: "none",

              background:
                "linear-gradient(145deg, rgba(255,255,255,0.06), transparent 26%, transparent 76%, rgba(255,255,255,0.02))",
            }}
          />
        </div>

        {/* Bottom title */}

        <div
          style={{
            marginTop: isMobile ? "16px" : "20px",
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

              color: "rgba(255,255,255,0.78)",

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