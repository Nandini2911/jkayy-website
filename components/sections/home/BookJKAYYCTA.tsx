"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
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
  useState,
  type FormEvent,
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

const eventTypes = [
  "Festivals",
  "Luxury Weddings",
  "Corporate Events",
  "Private Parties",
  "Nightclubs",
];

const WHATSAPP_NUMBER =
  "917517848682";

export default function BookJkayySection() {
  const reduceMotion = useReducedMotion();

  const [bookingOpen, setBookingOpen] =
    useState(false);

  const handleBookingSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData =
      new FormData(
        event.currentTarget,
      );

    const name = String(
      formData.get("name") || "",
    ).trim();

    const phone = String(
      formData.get("phone") || "",
    ).trim();

    const email = String(
      formData.get("email") || "",
    ).trim();

    const eventType = String(
      formData.get("eventType") || "",
    ).trim();

    const eventDate = String(
      formData.get("eventDate") || "",
    ).trim();

    const location = String(
      formData.get("location") || "",
    ).trim();

    const message = String(
      formData.get("message") || "",
    ).trim();

    const whatsappMessage = [
      "Hello JKAYY Team,",
      "",
      "I would like to enquire about booking JKAYY.",
      "",
      `Name: ${name}`,
      `Phone / WhatsApp: ${phone}`,
      `Email: ${email}`,
      `Event Type: ${eventType}`,
      `Event Date: ${eventDate}`,
      `City / Venue: ${location}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        whatsappMessage,
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
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
    href="#booking-form"
    onClick={(event) => {
      event.preventDefault();
      setBookingOpen(true);
    }}
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

      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book JKAYY"
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
              duration: 0.28,
            }}
            onClick={() => {
              setBookingOpen(false);
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              padding:
                "clamp(12px, 3vw, 34px)",

              overflowY: "auto",

              background: `
                radial-gradient(
                  circle at 18% 12%,
                  rgba(255,255,255,0.12) 0%,
                  rgba(255,255,255,0) 30%
                ),
                radial-gradient(
                  circle at 82% 86%,
                  rgba(255,255,255,0.08) 0%,
                  rgba(255,255,255,0) 34%
                ),
                rgba(5,5,5,0.9)
              `,

              backdropFilter:
                "blur(18px)",
              WebkitBackdropFilter:
                "blur(18px)",
            }}
          >
            <motion.div
              id="booking-form"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 34,
                      scale: 0.965,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 22,
                scale: 0.975,
              }}
              transition={{
                duration:
                  reduceMotion
                    ? 0
                    : 0.48,

                ease: [
                  0.16, 1, 0.3, 1,
                ],
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
              style={{
                position: "relative",
                isolation: "isolate",

                width:
                  "min(100%, 860px)",

                maxHeight: "92svh",

                overflowY: "auto",
                overflowX: "hidden",

                boxSizing: "border-box",

                padding:
                  "clamp(26px, 5vw, 58px)",

                border:
                  "1px solid rgba(255,255,255,0.58)",

                borderRadius:
                  "clamp(22px, 3vw, 34px)",

                color: "#111111",

                background: `
                  linear-gradient(
                    145deg,
                    rgba(255,255,255,0.985) 0%,
                    rgba(245,245,240,0.985) 44%,
                    rgba(228,228,222,0.985) 100%
                  )
                `,

                boxShadow: `
                  0 55px 150px rgba(0,0,0,0.58),
                  0 2px 0 rgba(255,255,255,0.92) inset,
                  0 -1px 0 rgba(0,0,0,0.08) inset
                `,

                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              {/* LUXURY BACKGROUND WORD */}

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",

                  top: "42px",
                  right: "-32px",

                  zIndex: -3,

                  color:
                    "rgba(0,0,0,0.028)",

                  fontFamily:
                    luxuryFont.style
                      .fontFamily,

                  fontSize:
                    "clamp(8rem, 23vw, 15rem)",

                  fontWeight: 500,
                  fontStyle: "italic",

                  lineHeight: 0.75,

                  letterSpacing:
                    "-0.075em",

                  whiteSpace: "nowrap",

                  userSelect: "none",
                  pointerEvents: "none",

                  transform:
                    "rotate(-7deg)",
                }}
              >
                JKAYY
              </div>

              {/* SOFT PEARL LIGHT */}

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",

                  top: "-170px",
                  left: "-120px",

                  zIndex: -4,

                  width: "430px",
                  height: "430px",

                  borderRadius: "50%",

                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 68%)",

                  filter:
                    "blur(30px)",

                  pointerEvents: "none",
                }}
              />

              {/* TOP METALLIC LINE */}

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "10%",

                  width: "80%",
                  height: "1px",

                  background:
                    "linear-gradient(90deg, transparent, rgba(0,0,0,0.42), rgba(255,255,255,0.95), rgba(0,0,0,0.32), transparent)",

                  pointerEvents: "none",
                }}
              />

              {/* CLOSE BUTTON */}

              <motion.button
                type="button"
                aria-label="Close booking form"
                onClick={() => {
                  setBookingOpen(false);
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.06,
                        rotate: 3,
                      }
                }
                whileTap={{
                  scale: 0.94,
                }}
                style={{
                  position: "absolute",

                  top:
                    "clamp(16px, 2.5vw, 24px)",

                  right:
                    "clamp(16px, 2.5vw, 24px)",

                  zIndex: 10,

                  display: "grid",
                  placeItems: "center",

                  width: "44px",
                  height: "44px",

                  padding: 0,

                  border:
                    "1px solid rgba(255,255,255,0.24)",

                  borderRadius: "50%",

                  color: "#ffffff",
                  background:
                    "#111111",

                  boxShadow:
                    "0 12px 28px rgba(0,0,0,0.18)",

                  fontFamily:
                    luxuryFont.style
                      .fontFamily,

                  fontSize: "28px",
                  fontWeight: 300,
                  lineHeight: 1,

                  cursor: "pointer",
                }}
              >
                ×
              </motion.button>

              {/* HEADER */}

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : 0.58,

                  delay:
                    reduceMotion
                      ? 0
                      : 0.08,

                  ease: [
                    0.16, 1, 0.3, 1,
                  ],
                }}
                style={{
                  position: "relative",
                  zIndex: 2,

                  maxWidth: "650px",

                  paddingRight:
                    "clamp(48px, 8vw, 84px)",

                  marginBottom:
                    "clamp(28px, 4vw, 42px)",
                }}
              >
                <div
                  style={{
                    display:
                      "inline-flex",

                    alignItems:
                      "center",

                    gap: "12px",

                    marginBottom:
                      "16px",

                    color:
                      "rgba(0,0,0,0.48)",

                    fontSize: "8px",
                    fontWeight: 600,

                    letterSpacing:
                      "0.28em",

                    textTransform:
                      "uppercase",
                  }}
                >
                  <span
                    style={{
                      display: "block",

                      width: "38px",
                      height: "1px",

                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.5), transparent)",
                    }}
                  />

                  Private Booking Enquiry
                </div>

                <h3
                  style={{
                    margin: 0,

                    color: "#0d0d0d",

                    fontFamily:
                      luxuryFont.style
                        .fontFamily,

                    fontSize:
                      "clamp(48px, 9vw, 82px)",

                    fontWeight: 500,

                    lineHeight: 0.86,

                    letterSpacing:
                      "-0.055em",
                  }}
                >
                  Book Jkayy
               

                  
                </h3>

                <p
                  style={{
                    maxWidth: "530px",

                    margin:
                      "20px 0 0",

                    color:
                      "rgba(0,0,0,0.53)",

                    fontSize:
                      "clamp(12px, 1.6vw, 14px)",

                    fontWeight: 300,
                    lineHeight: 1.75,
                  }}
                >
                  Share your event details.
                  Your enquiry will open
                  directly in WhatsApp,
                  ready to send to the
                  JKAYY booking team.
                </p>
              </motion.div>

              {/* FORM */}

              <motion.form
                onSubmit={
                  handleBookingSubmit
                }
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : 0.62,

                  delay:
                    reduceMotion
                      ? 0
                      : 0.16,

                  ease: [
                    0.16, 1, 0.3, 1,
                  ],
                }}
                style={{
                  position: "relative",
                  zIndex: 2,

                  display: "grid",

                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",

                  gap:
                    "clamp(14px, 2vw, 18px)",
                }}
              >
                {[
                  {
                    name: "name",
                    label: "Your Name",
                    type: "text",
                    placeholder:
                      "Enter your name",
                  },
                  {
                    name: "phone",
                    label:
                      "Phone / WhatsApp",
                    type: "tel",
                    placeholder:
                      "+91 98765 43210",
                  },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                    placeholder:
                      "you@example.com",
                  },
                  {
                    name: "eventDate",
                    label: "Event Date",
                    type: "date",
                    placeholder: "",
                  },
                ].map((field) => (
                  <label
                    key={field.name}
                    style={{
                      display: "grid",

                      minWidth: 0,

                      gap: "9px",

                      color:
                        "rgba(0,0,0,0.48)",

                      fontSize: "8px",
                      fontWeight: 600,

                      letterSpacing:
                        "0.18em",

                      textTransform:
                        "uppercase",
                    }}
                  >
                    <span
                      style={{
                        paddingLeft: "3px",
                      }}
                    >
                      {field.label}
                    </span>

                    <input
                      name={field.name}
                      type={field.type}
                      required
                      placeholder={
                        field.placeholder
                      }
                      style={{
                        width: "100%",
                        minWidth: 0,

                        boxSizing:
                          "border-box",

                        minHeight: "54px",

                        padding:
                          "15px 17px",

                        border:
                          "1px solid rgba(0,0,0,0.12)",

                        borderRadius:
                          "15px",

                        color: "#111111",

                        background:
                          "rgba(255,255,255,0.68)",

                        boxShadow: `
                          0 8px 28px rgba(0,0,0,0.035),
                          inset 0 1px 0 rgba(255,255,255,0.9)
                        `,

                        fontFamily:
                          cleanFont.style
                            .fontFamily,

                        fontSize: "13px",
                        fontWeight: 400,

                        textTransform:
                          "none",

                        letterSpacing:
                          "normal",

                        outline:
                          "1px solid transparent",

                        transition:
                          "border-color 220ms ease, background 220ms ease, box-shadow 220ms ease",
                      }}
                    />
                  </label>
                ))}

                {/* EVENT TYPE */}

                <label
                  style={{
                    display: "grid",

                    minWidth: 0,

                    gap: "9px",

                    color:
                      "rgba(0,0,0,0.48)",

                    fontSize: "8px",
                    fontWeight: 600,

                    letterSpacing:
                      "0.18em",

                    textTransform:
                      "uppercase",
                  }}
                >
                  <span
                    style={{
                      paddingLeft: "3px",
                    }}
                  >
                    Event Type
                  </span>

                  <select
                    name="eventType"
                    required
                    defaultValue=""
                    style={{
                      width: "100%",
                      minWidth: 0,

                      boxSizing:
                        "border-box",

                      minHeight: "54px",

                      padding:
                        "15px 17px",

                      border:
                        "1px solid rgba(0,0,0,0.12)",

                      borderRadius:
                        "15px",

                      color: "#111111",

                      background:
                        "rgba(255,255,255,0.68)",

                      boxShadow: `
                        0 8px 28px rgba(0,0,0,0.035),
                        inset 0 1px 0 rgba(255,255,255,0.9)
                      `,

                      fontFamily:
                        cleanFont.style
                          .fontFamily,

                      fontSize: "13px",
                      fontWeight: 400,

                      outline:
                        "1px solid transparent",

                      cursor: "pointer",
                    }}
                  >
                    <option
                      value=""
                      disabled
                    >
                      Select event type
                    </option>

                    {eventTypes.map(
                      (eventType) => (
                        <option
                          key={
                            eventType
                          }
                          value={
                            eventType
                          }
                        >
                          {eventType}
                        </option>
                      ),
                    )}
                  </select>
                </label>

                {/* LOCATION */}

                <label
                  style={{
                    display: "grid",

                    minWidth: 0,

                    gap: "9px",

                    color:
                      "rgba(0,0,0,0.48)",

                    fontSize: "8px",
                    fontWeight: 600,

                    letterSpacing:
                      "0.18em",

                    textTransform:
                      "uppercase",
                  }}
                >
                  <span
                    style={{
                      paddingLeft: "3px",
                    }}
                  >
                    City / Venue
                  </span>

                  <input
                    name="location"
                    type="text"
                    required
                    placeholder="Event city or venue"
                    style={{
                      width: "100%",
                      minWidth: 0,

                      boxSizing:
                        "border-box",

                      minHeight: "54px",

                      padding:
                        "15px 17px",

                      border:
                        "1px solid rgba(0,0,0,0.12)",

                      borderRadius:
                        "15px",

                      color: "#111111",

                      background:
                        "rgba(255,255,255,0.68)",

                      boxShadow: `
                        0 8px 28px rgba(0,0,0,0.035),
                        inset 0 1px 0 rgba(255,255,255,0.9)
                      `,

                      fontFamily:
                        cleanFont.style
                          .fontFamily,

                      fontSize: "13px",
                      fontWeight: 400,

                      outline:
                        "1px solid transparent",
                    }}
                  />
                </label>

                {/* MESSAGE */}

                <label
                  style={{
                    display: "grid",

                    gridColumn: "1 / -1",

                    gap: "9px",

                    color:
                      "rgba(0,0,0,0.48)",

                    fontSize: "8px",
                    fontWeight: 600,

                    letterSpacing:
                      "0.18em",

                    textTransform:
                      "uppercase",
                  }}
                >
                  <span
                    style={{
                      paddingLeft: "3px",
                    }}
                  >
                    Tell Us About The Night
                  </span>

                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your event, expected audience, timings or any special requirements..."
                    style={{
                      width: "100%",

                      boxSizing:
                        "border-box",

                      resize: "vertical",

                      minHeight: "118px",

                      padding:
                        "16px 17px",

                      border:
                        "1px solid rgba(0,0,0,0.12)",

                      borderRadius:
                        "17px",

                      color: "#111111",

                      background:
                        "rgba(255,255,255,0.68)",

                      boxShadow: `
                        0 8px 28px rgba(0,0,0,0.035),
                        inset 0 1px 0 rgba(255,255,255,0.9)
                      `,

                      fontFamily:
                        cleanFont.style
                          .fontFamily,

                      fontSize: "13px",
                      fontWeight: 400,

                      lineHeight: 1.65,

                      outline:
                        "1px solid transparent",
                    }}
                  />
                </label>

                {/* WHATSAPP CTA */}

                <motion.button
                  type="submit"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -3,
                          scale: 1.006,
                        }
                  }
                  whileTap={{
                    scale: 0.985,
                  }}
                  transition={{
                    duration: 0.26,
                    ease: [
                      0.16, 1, 0.3, 1,
                    ],
                  }}
                  style={{
                    position: "relative",

                    gridColumn: "1 / -1",

                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",

                    gap: "18px",

                    width: "100%",
                    minHeight: "62px",

                    marginTop: "4px",

                    padding:
                      "9px 10px 9px clamp(20px, 4vw, 28px)",

                    overflow: "hidden",

                    border:
                      "1px solid #111111",

                    borderRadius:
                      "999px",

                    color: "#ffffff",

                    background: `
                      linear-gradient(
                        110deg,
                        #050505 0%,
                        #171717 58%,
                        #050505 100%
                      )
                    `,

                    boxShadow:
                      "0 18px 45px rgba(0,0,0,0.2)",

                    fontFamily:
                      cleanFont.style
                        .fontFamily,

                    fontSize:
                      "clamp(8px, 1vw, 10px)",

                    fontWeight: 600,

                    letterSpacing:
                      "0.19em",

                    textTransform:
                      "uppercase",

                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    Continue on WhatsApp
                  </span>

                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,

                      display: "grid",
                      placeItems: "center",

                      width: "44px",
                      height: "44px",

                      flex: "0 0 auto",

                      borderRadius: "50%",

                      color: "#111111",

                      background:
                        "#ffffff",

                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.18)",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      width="19"
                      height="19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.4 3.6A11.85 11.85 0 0 0 12.03 0C5.47 0 .13 5.34.13 11.91c0 2.1.55 4.15 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.25-6.16-3.53-8.31Z"
                        fill="currentColor"
                      />
                      <path
                        d="M17.96 14.4c-.33-.17-1.96-.97-2.27-1.08-.3-.11-.52-.17-.74.17-.22.33-.85 1.08-1.04 1.3-.19.22-.39.25-.72.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.64-1.95-1.83-2.28-.2-.33-.02-.51.14-.67.15-.15.33-.39.5-.58.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.16-.74-1.79-1.02-2.45-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.16 1.13-1.16 2.76 0 1.63 1.19 3.2 1.35 3.42.17.22 2.34 3.57 5.67 5.01.79.34 1.41.55 1.9.7.8.25 1.52.22 2.09.13.64-.1 1.96-.8 2.24-1.58.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </span>

                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",

                      top: "-70px",
                      left: "-90px",

                      width: "190px",
                      height: "190px",

                      borderRadius: "50%",

                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 68%)",

                      pointerEvents: "none",
                    }}
                  />
                </motion.button>

                {/* TRUST NOTE */}

                <div
                  style={{
                    gridColumn: "1 / -1",

                    display: "flex",
                    flexWrap: "wrap",

                    alignItems: "center",
                    justifyContent:
                      "space-between",

                    gap: "9px 18px",

                    marginTop: "2px",

                    padding:
                      "0 4px",

                    color:
                      "rgba(0,0,0,0.37)",

                    fontSize: "7px",
                    fontWeight: 600,

                    letterSpacing:
                      "0.16em",

                    textTransform:
                      "uppercase",
                  }}
                >
                 

                  
                </div>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}