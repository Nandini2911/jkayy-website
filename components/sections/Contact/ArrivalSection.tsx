"use client";

import {
  motion,
  type MotionStyle,
} from "framer-motion";

const lines = [
  "Let’s Create",
  "The Next",
  "Unforgettable",
  "Night.",
];

const ease = [0.16, 1, 0.3, 1] as const;

type ArrivalSectionProps = {
  heroStyle?: MotionStyle;
};

export default function ArrivalSection({
  heroStyle,
}: ArrivalSectionProps) {
  return (
    <motion.section
      id="arrival"
      style={
        {
          position: "relative",
          zIndex: 1,
          width: "100%",
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          padding: "120px 6vw 70px",
          transformOrigin: "center top",
          boxSizing: "border-box",
          ...(heroStyle ?? {}),
        } as MotionStyle
      }
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(980px, 100%)",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.45,
            duration: 0.8,
            ease,
          }}
          style={{
            margin: 0,
            color: "rgba(245,243,237,0.48)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.33em",
            textTransform: "uppercase",
          }}
        >
          Contact
        </motion.p>

        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "34px 0 42px",
            fontFamily:
              "Cormorant Garamond, Times New Roman, serif",
            fontSize: "clamp(56px, 8.2vw, 136px)",
            fontWeight: 400,
            letterSpacing: "-0.055em",
            lineHeight: 0.82,
          }}
        >
          {lines.map((line, index) => (
            <motion.span
              key={line}
              initial={{
                opacity: 0,
                y: 42,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.75 + index * 0.18,
                duration: 1,
                ease,
              }}
              style={{
                display: "block",
                color:
                  index === 1
                    ? "rgba(245,243,237,0.82)"
                    : "#f5f3ed",
                fontStyle:
                  index === 1
                    ? "italic"
                    : "normal",
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.nav
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.8,
            duration: 1,
          }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px 24px",
            color: "rgba(245,243,237,0.44)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            lineHeight: 1.6,
            textTransform: "uppercase",
          }}
        >
          <span>Bookings</span>

          <span
            aria-hidden="true"
            style={{
              opacity: 0.35,
            }}
          >
            •
          </span>

          <span>Collaborations</span>

          <span
            aria-hidden="true"
            style={{
              opacity: 0.35,
            }}
          >
            •
          </span>

          <span>Festivals</span>

          <span
            aria-hidden="true"
            style={{
              opacity: 0.35,
            }}
          >
            •
          </span>

          <span>Luxury Events</span>
        </motion.nav>
      </div>

      <motion.aside
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 2.1,
          duration: 0.8,
        }}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.35)",
          fontSize: "8px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        <span>Scroll</span>

        <motion.i
          animate={{
            opacity: [0.2, 1, 0.2],
            scaleY: [0.35, 1, 0.35],
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            display: "block",
            width: "1px",
            height: "42px",
            transformOrigin: "top",
            background:
              "linear-gradient(to bottom, transparent, white, transparent)",
          }}
        />
      </motion.aside>
    </motion.section>
  );
}