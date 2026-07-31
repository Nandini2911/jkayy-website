"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { useEffect, useState, type FormEvent } from "react";

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

const WHATSAPP_NUMBER = "919372992720";
const easeOut = [0.16, 1, 0.3, 1] as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.075,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.82,
      ease: easeOut,
    },
  },
};

const chipContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const chipVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: easeOut,
    },
  },
};

const fieldLabelStyle = {
  display: "grid",
  minWidth: 0,
  gap: "9px",
  color: "rgba(0,0,0,0.48)",
  fontSize: "8px",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
};

const inputStyle = {
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box" as const,
  minHeight: "54px",
  padding: "15px 17px",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "15px",
  color: "#111111",
  background: "rgba(255,255,255,0.82)",
  boxShadow:
    "0 8px 28px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.92)",
  fontFamily: cleanFont.style.fontFamily,
  fontSize: "13px",
  fontWeight: 400,
  textTransform: "none" as const,
  letterSpacing: "normal",
  outline: "1px solid transparent",
  transition:
    "border-color 220ms ease, background 220ms ease, box-shadow 220ms ease",
};

export default function BookJkayySection() {
  const reduceMotion = useReducedMotion();
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (!bookingOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBookingOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [bookingOpen]);

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const eventType = String(formData.get("eventType") || "").trim();
    const eventDate = String(formData.get("eventDate") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const message = String(formData.get("message") || "").trim();

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

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
          padding:
            "clamp(82px, 8vw, 150px) clamp(16px, 4vw, 72px)",
          overflow: "hidden",
          color: "#111111",
          background: "#f2f2ef",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
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

        {/* STATIC AURORA - keeps the same look without continuous heavy blur repainting */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20%",
            left: "-25%",
            zIndex: -15,
            width: "clamp(430px, 58vw, 900px)",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            opacity: 0.42,
            pointerEvents: "none",
            filter: "blur(clamp(55px, 7vw, 95px))",
            transform: "translate3d(0,0,0)",
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

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-26%",
            bottom: "-26%",
            zIndex: -15,
            width: "clamp(460px, 62vw, 940px)",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            opacity: 0.34,
            pointerEvents: "none",
            filter: "blur(clamp(60px, 8vw, 105px))",
            transform: "translate3d(0,0,0)",
            background: `
              radial-gradient(
                circle at center,
                rgba(70,70,68,0.32) 0%,
                rgba(115,115,110,0.20) 34%,
                rgba(205,205,200,0.20) 58%,
                transparent 75%
              )
            `,
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: -14,
            width: "clamp(360px, 46vw, 720px)",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            pointerEvents: "none",
            filter: "blur(clamp(70px, 8vw, 115px))",
            transform: "translate3d(-50%, -50%, 0)",
            background: `
              radial-gradient(
                circle at center,
                rgba(255,255,255,0.92) 0%,
                rgba(255,255,255,0.52) 30%,
                rgba(175,175,170,0.16) 55%,
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
            fontSize: "clamp(7rem, 24vw, 29rem)",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 0.76,
            letterSpacing: "-0.075em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            transform: "translate3d(-50%, -50%, 0)",
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
            opacity: 0.03,
            pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.42) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.42) 1px, transparent 1px)
            `,
            backgroundSize: "clamp(48px, 5vw, 78px) clamp(48px, 5vw, 78px)",
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
                rgba(242,242,239,0.82) 0%,
                transparent 22%,
                transparent 78%,
                rgba(242,242,239,0.88) 100%
              )
            `,
          }}
        />

        {/* MAIN CONTENT - one viewport trigger, one coordinated stagger */}
        <motion.div
          variants={reduceMotion ? undefined : sectionVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.14, margin: "0px 0px -8% 0px" }}
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1800px",
            margin: "0 auto",
            textAlign: "center",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* SECTION LABEL */}
          <motion.div
            variants={reduceMotion ? undefined : itemVariants}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(9px, 1.4vw, 14px)",
              width: "100%",
              marginBottom: "clamp(20px, 2.4vw, 36px)",
              color: "rgba(0,0,0,0.5)",
              fontFamily: cleanFont.style.fontFamily,
              fontSize: "clamp(7px, 0.58vw, 10px)",
              fontWeight: 600,
              letterSpacing: "clamp(0.22em, 0.45vw, 0.33em)",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "block",
                width: "clamp(26px, 3.4vw, 56px)",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(0,0,0,0.48))",
              }}
            />

            <span style={{ whiteSpace: "nowrap" }}>Book JKAYY</span>

            <span
              style={{
                display: "block",
                width: "clamp(26px, 3.4vw, 56px)",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.48), transparent)",
              }}
            />
          </motion.div>

          {/* ICON */}
          <motion.div
            variants={reduceMotion ? undefined : itemVariants}
            style={{
              display: "grid",
              placeItems: "center",
              width: "clamp(44px, 3.2vw, 52px)",
              height: "clamp(44px, 3.2vw, 52px)",
              marginBottom: "clamp(20px, 2.6vw, 32px)",
              border: "1px solid rgba(0,0,0,0.16)",
              borderRadius: "50%",
              color: "#111111",
              background: "rgba(255,255,255,0.68)",
              boxShadow:
                "0 14px 38px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.92)",
              transform: "translateZ(0)",
            }}
          >
            <Sparkles size={18} strokeWidth={1.5} />
          </motion.div>

          {/* HEADING */}
          <motion.h2
            variants={reduceMotion ? undefined : itemVariants}
            style={{
              width: "100%",
              maxWidth: "1580px",
              margin: 0,
              paddingInline: "clamp(0px, 1.5vw, 24px)",
              color: "#0b0b0b",
              fontFamily: luxuryFont.style.fontFamily,
              fontSize: "clamp(2.8rem, 8vw, 11rem)",
              fontWeight: 500,
              lineHeight: 0.88,
              letterSpacing: "clamp(-0.065em, -0.055em, -0.045em)",
              textTransform: "uppercase",
              textShadow: "0 18px 62px rgba(0,0,0,0.07)",
              textWrap: "balance",
            }}
          >
            Ready to Create
            <br />
            <em
              style={{
                display: "inline-block",
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
            variants={reduceMotion ? undefined : itemVariants}
            style={{
              width: "min(100%, 760px)",
              margin: "clamp(24px, 2.8vw, 42px) auto 0",
              paddingInline: "clamp(4px, 2vw, 18px)",
              boxSizing: "border-box",
              color: "rgba(0,0,0,0.58)",
              fontFamily: cleanFont.style.fontFamily,
              fontSize: "clamp(0.88rem, 1vw, 1.16rem)",
              fontWeight: 300,
              lineHeight: 1.75,
              textWrap: "pretty",
            }}
          >
            From high-energy festivals to intimate luxury celebrations, create a
            night your audience will remember long after the final beat.
          </motion.p>

          {/* EVENT TYPES */}
          <motion.div
            variants={reduceMotion ? undefined : chipContainerVariants}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(8px, 1vw, 11px)",
              width: "100%",
              maxWidth: "1120px",
              marginTop: "clamp(30px, 3.6vw, 54px)",
            }}
          >
            {eventTypes.map((eventType) => (
              <motion.div
                key={eventType}
                variants={reduceMotion ? undefined : chipVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { duration: 0.22, ease: easeOut },
                      }
                }
                style={{
                  maxWidth: "100%",
                  padding:
                    "clamp(10px, 0.85vw, 13px) clamp(15px, 1.7vw, 28px)",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: "999px",
                  color: "rgba(0,0,0,0.7)",
                  fontFamily: cleanFont.style.fontFamily,
                  fontSize: "clamp(7.5px, 0.62vw, 10px)",
                  fontWeight: 600,
                  letterSpacing: "clamp(0.14em, 0.28vw, 0.2em)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  background: "rgba(255,255,255,0.66)",
                  boxShadow:
                    "0 10px 28px rgba(0,0,0,0.045), inset 0 1px 0 rgba(255,255,255,0.92)",
                  cursor: "default",
                  transform: "translateZ(0)",
                }}
              >
                {eventType}
              </motion.div>
            ))}
          </motion.div>

          {/* BOOK BUTTON */}
          <motion.div
            variants={reduceMotion ? undefined : itemVariants}
            style={{
              position: "relative",
              marginTop: "clamp(36px, 4.4vw, 66px)",
            }}
          >
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -3,
                      scale: 1.012,
                    }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              transition={{ duration: 0.26, ease: easeOut }}
              style={{ transform: "translateZ(0)" }}
            >
              <Link
                href="#booking-form"
                onClick={(event) => {
                  event.preventDefault();
                  setBookingOpen(true);
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = "#ffffff";
                  event.currentTarget.style.color = "#111111";
                  event.currentTarget.style.boxShadow =
                    "0 14px 34px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = "#111111";
                  event.currentTarget.style.color = "#ffffff";
                  event.currentTarget.style.boxShadow =
                    "0 10px 28px rgba(0,0,0,0.12)";
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  minHeight: "46px",
                  padding: "11px clamp(20px, 2vw, 25px)",
                  border: "1px solid #111111",
                  borderRadius: "999px",
                  color: "#ffffff",
                  background: "#111111",
                  fontFamily: cleanFont.style.fontFamily,
                  fontSize: "clamp(8px, 0.58vw, 9px)",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                  transition:
                    "background-color 260ms ease, color 260ms ease, box-shadow 260ms ease",
                  touchAction: "manipulation",
                }}
              >
                <span>Book Event</span>
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </Link>
            </motion.div>
          </motion.div>

          {/* BOTTOM NOTE */}
          <motion.p
            variants={reduceMotion ? undefined : itemVariants}
            style={{
              margin: "clamp(18px, 2vw, 22px) 0 0",
              color: "rgba(0,0,0,0.34)",
              fontFamily: cleanFont.style.fontFamily,
              fontSize: "clamp(6.5px, 0.52vw, 9px)",
              fontWeight: 600,
              letterSpacing: "clamp(0.18em, 0.4vw, 0.27em)",
              lineHeight: 1.65,
              textTransform: "uppercase",
              textWrap: "balance",
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
            width: "min(84%, 1800px)",
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
            width: "min(84%, 1800px)",
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
            onClick={() => setBookingOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(10px, 3vw, 34px)",
              overflowY: "auto",
              overscrollBehavior: "contain",
              background: `
                radial-gradient(circle at 18% 12%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%),
                radial-gradient(circle at 82% 86%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 34%),
                rgba(5,5,5,0.90)
              `,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <motion.div
              id="booking-form"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 26,
                      scale: 0.985,
                    }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 18,
                      scale: 0.99,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.44,
                ease: easeOut,
              }}
              onClick={(event) => event.stopPropagation()}
              style={{
                position: "relative",
                isolation: "isolate",
                width: "min(100%, 920px)",
                maxHeight: "min(92svh, 980px)",
                overflowY: "auto",
                overflowX: "hidden",
                overscrollBehavior: "contain",
                boxSizing: "border-box",
                padding: "clamp(24px, 4.5vw, 60px)",
                border: "1px solid rgba(255,255,255,0.58)",
                borderRadius: "clamp(20px, 2.8vw, 34px)",
                color: "#111111",
                background: `
                  linear-gradient(
                    145deg,
                    rgba(255,255,255,0.99) 0%,
                    rgba(245,245,240,0.99) 44%,
                    rgba(228,228,222,0.99) 100%
                  )
                `,
                boxShadow: `
                  0 44px 120px rgba(0,0,0,0.48),
                  0 2px 0 rgba(255,255,255,0.92) inset,
                  0 -1px 0 rgba(0,0,0,0.08) inset
                `,
                fontFamily: cleanFont.style.fontFamily,
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              {/* LUXURY BACKGROUND WORD */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "clamp(30px, 5vw, 48px)",
                  right: "clamp(-72px, -5vw, -28px)",
                  zIndex: -3,
                  color: "rgba(0,0,0,0.028)",
                  fontFamily: luxuryFont.style.fontFamily,
                  fontSize: "clamp(7rem, 18vw, 15rem)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  lineHeight: 0.75,
                  letterSpacing: "-0.075em",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  pointerEvents: "none",
                  transform: "rotate(-7deg) translateZ(0)",
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
                  filter: "blur(24px)",
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
                onClick={() => setBookingOpen(false)}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        rotate: 2,
                      }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.22, ease: easeOut }}
                style={{
                  position: "absolute",
                  top: "clamp(14px, 2.3vw, 24px)",
                  right: "clamp(14px, 2.3vw, 24px)",
                  zIndex: 10,
                  display: "grid",
                  placeItems: "center",
                  width: "clamp(40px, 4vw, 44px)",
                  height: "clamp(40px, 4vw, 44px)",
                  padding: 0,
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: "50%",
                  color: "#ffffff",
                  background: "#111111",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
                  fontFamily: luxuryFont.style.fontFamily,
                  fontSize: "28px",
                  fontWeight: 300,
                  lineHeight: 1,
                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
              >
                ×
              </motion.button>

              {/* HEADER */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.56,
                  delay: reduceMotion ? 0 : 0.06,
                  ease: easeOut,
                }}
                style={{
                  position: "relative",
                  zIndex: 2,
                  maxWidth: "680px",
                  paddingRight: "clamp(46px, 8vw, 86px)",
                  marginBottom: "clamp(26px, 4vw, 42px)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                    color: "rgba(0,0,0,0.48)",
                    fontSize: "clamp(7px, 0.8vw, 8px)",
                    fontWeight: 600,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: "clamp(28px, 4vw, 38px)",
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
                    fontFamily: luxuryFont.style.fontFamily,
                    fontSize: "clamp(2.8rem, 8vw, 5.4rem)",
                    fontWeight: 500,
                    lineHeight: 0.9,
                    letterSpacing: "-0.055em",
                  }}
                >
                  Book Jkayy
                </h3>

                <p
                  style={{
                    maxWidth: "540px",
                    margin: "clamp(16px, 2.2vw, 20px) 0 0",
                    color: "rgba(0,0,0,0.53)",
                    fontSize: "clamp(11px, 1.25vw, 14px)",
                    fontWeight: 300,
                    lineHeight: 1.72,
                    textWrap: "pretty",
                  }}
                >
                  Share your event details. Your enquiry will open directly in
                  WhatsApp, ready to send to the JKAYY booking team.
                </p>
              </motion.div>

              {/* FORM */}
              <motion.form
                onSubmit={handleBookingSubmit}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.58,
                  delay: reduceMotion ? 0 : 0.12,
                  ease: easeOut,
                }}
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                  gap: "clamp(12px, 1.8vw, 18px)",
                }}
              >
                {[
                  {
                    name: "name",
                    label: "Your Name",
                    type: "text",
                    placeholder: "Enter your name",
                    autoComplete: "name",
                  },
                  {
                    name: "phone",
                    label: "Phone / WhatsApp",
                    type: "tel",
                    placeholder: "+91 98765 43210",
                    autoComplete: "tel",
                  },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                    autoComplete: "email",
                  },
                  {
                    name: "eventDate",
                    label: "Event Date",
                    type: "date",
                    placeholder: "",
                    autoComplete: "off",
                  },
                ].map((field) => (
                  <label key={field.name} style={fieldLabelStyle}>
                    <span style={{ paddingLeft: "3px" }}>{field.label}</span>
                    <input
                      name={field.name}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      style={inputStyle}
                    />
                  </label>
                ))}

                {/* EVENT TYPE */}
                <label style={fieldLabelStyle}>
                  <span style={{ paddingLeft: "3px" }}>Event Type</span>
                  <select
                    name="eventType"
                    required
                    defaultValue=""
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    {eventTypes.map((eventType) => (
                      <option key={eventType} value={eventType}>
                        {eventType}
                      </option>
                    ))}
                  </select>
                </label>

                {/* LOCATION */}
                <label style={fieldLabelStyle}>
                  <span style={{ paddingLeft: "3px" }}>City / Venue</span>
                  <input
                    name="location"
                    type="text"
                    required
                    placeholder="Event city or venue"
                    autoComplete="address-level2"
                    style={inputStyle}
                  />
                </label>

                {/* MESSAGE */}
                <label
                  style={{
                    ...fieldLabelStyle,
                    gridColumn: "1 / -1",
                  }}
                >
                  <span style={{ paddingLeft: "3px" }}>
                    Tell Us About The Night
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your event, expected audience, timings or any special requirements..."
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "118px",
                      padding: "16px 17px",
                      borderRadius: "17px",
                      lineHeight: 1.65,
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
                          y: -2,
                        }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.988 }}
                  transition={{ duration: 0.24, ease: easeOut }}
                  style={{
                    position: "relative",
                    gridColumn: "1 / -1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    width: "100%",
                    minHeight: "clamp(58px, 6vw, 64px)",
                    marginTop: "4px",
                    padding:
                      "8px 9px 8px clamp(18px, 3.5vw, 28px)",
                    overflow: "hidden",
                    border: "1px solid #111111",
                    borderRadius: "999px",
                    color: "#ffffff",
                    background:
                      "linear-gradient(110deg, #050505 0%, #171717 58%, #050505 100%)",
                    boxShadow: "0 16px 38px rgba(0,0,0,0.18)",
                    fontFamily: cleanFont.style.fontFamily,
                    fontSize: "clamp(7.5px, 0.75vw, 10px)",
                    fontWeight: 600,
                    letterSpacing: "clamp(0.13em, 0.32vw, 0.19em)",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    touchAction: "manipulation",
                    transform: "translateZ(0)",
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                      textAlign: "left",
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
                      width: "clamp(40px, 5vw, 44px)",
                      height: "clamp(40px, 5vw, 44px)",
                      flex: "0 0 auto",
                      borderRadius: "50%",
                      color: "#111111",
                      background: "#ffffff",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
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
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}