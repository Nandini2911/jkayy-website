"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

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

const eventTypes = [
  "Festivals",
  "Luxury Weddings",
  "Corporate Events",
  "Private Parties",
  "Nightclubs",
];

export default function BookJkayySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="book-jkayy"
      style={{
        position: "relative",
        isolation: "isolate",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        width: "100%",
        minHeight: "100svh",

        boxSizing: "border-box",

        padding: "clamp(90px, 10vw, 150px) 20px",

        overflow: "hidden",

        color: "#111111",
        background: "#f2f2ef",
      }}
    >
      {/* BASE BACKGROUND */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -20,

          pointerEvents: "none",

          background: `
            radial-gradient(
              circle at 50% 42%,
              rgba(255,255,255,0.96) 0%,
              rgba(246,246,242,0.94) 34%,
              rgba(224,224,218,0.82) 68%,
              rgba(244,244,240,1) 100%
            )
          `,
        }}
      />

      {/* LEFT MONOCHROME AURORA */}

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-8%", "10%", "-4%"],
                y: ["-6%", "8%", "-3%"],
                scale: [1, 1.15, 1.03],
                rotate: [-8, 5, -4],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",

          top: "-18%",
          left: "-24%",

          zIndex: -15,

          width: "min(850px, 72vw)",
          height: "min(850px, 72vw)",

          minWidth: "520px",
          minHeight: "520px",

          borderRadius: "50%",

          opacity: 0.45,

          pointerEvents: "none",

          filter: "blur(100px)",

          willChange: "transform",

          background: `
            radial-gradient(
              circle at center,
              rgba(255,255,255,0.98) 0%,
              rgba(210,210,205,0.62) 32%,
              rgba(150,150,145,0.23) 57%,
              transparent 74%
            )
          `,
        }}
      />

      {/* RIGHT MONOCHROME AURORA */}

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["9%", "-8%", "5%"],
                y: ["8%", "-7%", "4%"],
                scale: [1.08, 0.95, 1.13],
                rotate: [7, -5, 4],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",

          right: "-25%",
          bottom: "-24%",

          zIndex: -15,

          width: "min(900px, 76vw)",
          height: "min(900px, 76vw)",

          minWidth: "550px",
          minHeight: "550px",

          borderRadius: "50%",

          opacity: 0.36,

          pointerEvents: "none",

          filter: "blur(115px)",

          willChange: "transform",

          background: `
            radial-gradient(
              circle at center,
              rgba(70,70,68,0.35) 0%,
              rgba(115,115,110,0.22) 34%,
              rgba(205,205,200,0.22) 58%,
              transparent 75%
            )
          `,
        }}
      />

      {/* CENTER LIGHT */}

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.3, 0.62, 0.34],
                scale: [0.94, 1.1, 0.98],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",

          top: "50%",
          left: "50%",

          zIndex: -14,

          width: "min(680px, 58vw)",
          height: "min(680px, 58vw)",

          minWidth: "420px",
          minHeight: "420px",

          borderRadius: "50%",

          pointerEvents: "none",

          filter: "blur(120px)",

          transform: "translate(-50%, -50%)",

          background: `
            radial-gradient(
              circle at center,
              rgba(255,255,255,0.95) 0%,
              rgba(255,255,255,0.55) 30%,
              rgba(175,175,170,0.18) 55%,
              transparent 74%
            )
          `,
        }}
      />

      {/* LARGE BACKGROUND WORD */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",

          top: "50%",
          left: "50%",

          zIndex: -10,

          color: "rgba(0,0,0,0.026)",

          fontFamily: luxuryFont.style.fontFamily,

          fontSize: "clamp(9rem, 25vw, 27rem)",
          fontWeight: 500,
          fontStyle: "italic",

          lineHeight: 0.76,
          letterSpacing: "-0.075em",

          whiteSpace: "nowrap",

          pointerEvents: "none",
          userSelect: "none",

          transform: "translate(-50%, -50%)",
        }}
      >
        Unforgettable
      </div>

      {/* GRID */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -8,

          opacity: 0.035,

          pointerEvents: "none",

          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.42) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,0,0,0.42) 1px,
              transparent 1px
            )
          `,

          backgroundSize: "72px 72px",

          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",

          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />

      {/* EDGE SHADOW */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -5,

          pointerEvents: "none",

          background: `
            radial-gradient(
              circle at center,
              transparent 0%,
              rgba(242,242,239,0.06) 42%,
              rgba(210,210,205,0.44) 100%
            ),
            linear-gradient(
              180deg,
              rgba(242,242,239,0.8) 0%,
              transparent 24%,
              transparent 76%,
              rgba(242,242,239,0.86) 100%
            )
          `,
        }}
      />

      {/* MAIN CONTENT */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 45,
                scale: 0.98,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: reduceMotion ? 0 : 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: "relative",
          zIndex: 10,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          width: "100%",
          maxWidth: "1450px",

          margin: "0 auto",

          textAlign: "center",
        }}
      >
        {/* SECTION LABEL */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.72,
            delay: reduceMotion ? 0 : 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            gap: "14px",

            marginBottom: "clamp(24px, 3vw, 38px)",

            color: "rgba(0,0,0,0.5)",

            fontFamily: cleanFont.style.fontFamily,
            fontSize: "clamp(7px, 0.7vw, 10px)",
            fontWeight: 600,

            letterSpacing: "0.33em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "block",

              width: "clamp(30px, 4vw, 56px)",
              height: "1px",

              background:
                "linear-gradient(90deg, transparent, rgba(0,0,0,0.48))",
            }}
          />

          <span> Book JKAYY</span>

          <span
            style={{
              display: "block",

              width: "clamp(30px, 4vw, 56px)",
              height: "1px",

              background:
                "linear-gradient(90deg, rgba(0,0,0,0.48), transparent)",
            }}
          />
        </motion.div>

        {/* ICON */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.7,
                  rotate: -12,
                }
          }
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "grid",
            placeItems: "center",

            width: "48px",
            height: "48px",

            marginBottom: "clamp(22px, 3vw, 32px)",

            border: "1px solid rgba(0,0,0,0.17)",
            borderRadius: "50%",

            color: "#111111",

            background: "rgba(255,255,255,0.46)",

            boxShadow:
              "0 15px 45px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",

            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <Sparkles size={18} strokeWidth={1.5} />
        </motion.div>

        {/* HEADING */}

        <motion.h2
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                  scale: 0.95,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            maxWidth: "1250px",

            margin: 0,

            color: "#0b0b0b",

            fontFamily: luxuryFont.style.fontFamily,
            fontSize: "clamp(3.5rem, 9vw, 9.6rem)",

            fontWeight: 500,

            lineHeight: 0.82,
            letterSpacing: "-0.065em",

            textTransform: "uppercase",

            textShadow:
              "0 20px 70px rgba(0,0,0,0.08)",
          }}
        >
          Ready to Create
          <br />

          <em
            style={{
              color: "rgba(0,0,0,0.48)",

              fontWeight: 400,
              fontStyle: "italic",

              textTransform: "none",
            }}
          >
            An Unforgettable Night?
          </em>
        </motion.h2>

        {/* DESCRIPTION */}

        <motion.p
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.17,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            maxWidth: "720px",

            margin: "clamp(25px, 3vw, 40px) auto 0",

            color: "rgba(0,0,0,0.58)",

            fontFamily: cleanFont.style.fontFamily,
            fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)",
            fontWeight: 300,

            lineHeight: 1.8,
          }}
        >
          From high-energy festivals to intimate luxury
          celebrations, create a night your audience will
          remember long after the final beat.
        </motion.p>

        {/* EVENT TYPES */}

        <motion.div
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
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.85,
            delay: reduceMotion ? 0 : 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",

            gap: "10px",

            width: "100%",
            maxWidth: "1050px",

            marginTop: "clamp(34px, 4vw, 52px)",
          }}
        >
          {eventTypes.map((eventType, index) => (
            <motion.div
              key={eventType}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 14,
                      scale: 0.95,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.58,
                delay: reduceMotion
                  ? 0
                  : 0.24 + index * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.025,
                    }
              }
              style={{
                padding: "13px clamp(18px, 2vw, 27px)",

                border: "1px solid rgba(0,0,0,0.16)",
                borderRadius: "999px",

                color: "rgba(0,0,0,0.7)",

                fontFamily: cleanFont.style.fontFamily,
                fontSize: "clamp(8px, 0.75vw, 10px)",
                fontWeight: 600,

                letterSpacing: "0.2em",
                textTransform: "uppercase",

                background: "rgba(255,255,255,0.42)",

                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)",

                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",

                cursor: "default",
              }}
            >
              {eventType}
            </motion.div>
          ))}
        </motion.div>

        {/* BOOK BUTTON */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                  scale: 0.96,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.82,
            delay: reduceMotion ? 0 : 0.42,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: "relative",

            marginTop: "clamp(40px, 5vw, 65px)",
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
  }}
  transition={{
    duration: reduceMotion ? 0 : 0.7,
    delay: reduceMotion ? 0 : 0.38,
    ease: [0.16, 1, 0.3, 1],
  }}
  style={{
    marginTop: "clamp(32px, 4vw, 48px)",
  }}
>
  <Link
    href="#contact"
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",

      gap: "10px",

      minHeight: "44px",

      padding: "11px 21px",

      border: "1px solid #111111",
      borderRadius: "999px",

      color: "#ffffff",
      background: "#111111",

      fontFamily: cleanFont.style.fontFamily,
      fontSize: "9px",
      fontWeight: 600,

      letterSpacing: "0.2em",
      textDecoration: "none",
      textTransform: "uppercase",

      boxShadow: "0 10px 28px rgba(0,0,0,0.12)",

      transition:
        "transform 300ms ease, background 300ms ease, color 300ms ease",
    }}
    onMouseEnter={(event) => {
      event.currentTarget.style.transform =
        "translateY(-2px)";

      event.currentTarget.style.background =
        "#ffffff";

      event.currentTarget.style.color =
        "#111111";
    }}
    onMouseLeave={(event) => {
      event.currentTarget.style.transform =
        "translateY(0px)";

      event.currentTarget.style.background =
        "#111111";

      event.currentTarget.style.color =
        "#ffffff";
    }}
  >
    <span>Book Event</span>

    <ArrowUpRight
      size={14}
      strokeWidth={1.7}
    />
  </Link>
</motion.div>
</motion.div>

        {/* BOTTOM NOTE */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.54,
          }}
          style={{
            margin: "22px 0 0",

            color: "rgba(0,0,0,0.34)",

            fontFamily: cleanFont.style.fontFamily,
            fontSize: "clamp(7px, 0.65vw, 9px)",
            fontWeight: 600,

            letterSpacing: "0.27em",
            textTransform: "uppercase",
          }}
        >
          Bookings · Collaborations · Live Experiences
        </motion.p>
      </motion.div>

      {/* TOP BORDER */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",

          top: 0,
          left: "50%",

          width: "84%",
          height: "1px",

          pointerEvents: "none",

          transform: "translateX(-50%)",

          background:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.18), transparent)",
        }}
      />

      {/* BOTTOM BORDER */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",

          bottom: 0,
          left: "50%",

          width: "84%",
          height: "1px",

          pointerEvents: "none",

          transform: "translateX(-50%)",

          background:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent)",
        }}
      />
    </section>
  );
}