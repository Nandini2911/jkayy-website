"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function GoodbyeSection() {
  return (
    <section
      id="goodbye"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        minHeight: "108svh",
        display: "grid",
        placeItems: "center",
        padding: "110px 5vw 46px",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 55,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.45,
        }}
        transition={{
          duration: 1.2,
          ease,
        }}
        style={{
          width: "min(1200px, 100%)",
        }}
      >
        <strong
          style={{
            display: "block",
            margin: 0,
            fontFamily:
              "Manrope, Arial, sans-serif",
            fontSize:
              "clamp(85px, 18vw, 285px)",
            fontWeight: 600,
            letterSpacing: "-0.085em",
            lineHeight: 0.76,
          }}
        >
          JKAYY
        </strong>

        <p
          style={{
            margin: "34px 0 70px",
            color: "rgba(245,243,237,0.43)",
            fontFamily:
              "Cormorant Garamond, Times New Roman, serif",
            fontSize:
              "clamp(18px, 2vw, 31px)",
            fontStyle: "italic",
          }}
        >
          Live Beyond Sound.
        </p>

        <h2
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto 55px",
            fontFamily:
              "Cormorant Garamond, Times New Roman, serif",
            fontSize:
              "clamp(46px, 6.6vw, 105px)",
            fontWeight: 400,
            letterSpacing: "-0.05em",
            lineHeight: 0.86,
          }}
        >
          <span>See You</span>

          <span
            style={{
              color:
                "rgba(245,243,237,0.62)",
              fontStyle: "italic",
            }}
          >
            At The Next
          </span>

          <span>Show.</span>
        </h2>

        <motion.div
          whileHover={{
            y: -4,
          }}
          whileTap={{
            scale: 0.98,
          }}
          style={{
            width: "min(270px, 100%)",
            margin: "0 auto",
          }}
        >
          <Link
            href="/"
            onMouseEnter={(event) => {
              event.currentTarget.style.background =
                "#f5f3ed";

              event.currentTarget.style.color =
                "#050505";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background =
                "transparent";

              event.currentTarget.style.color =
                "#f5f3ed";
            }}
            style={{
              width: "100%",
              minHeight: "58px",
              border:
                "1px solid rgba(255,255,255,0.23)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 22px",
              background: "transparent",
              color: "#f5f3ed",
              fontSize: "9px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxSizing: "border-box",
              transition:
                "background 350ms ease, color 350ms ease",
            }}
          >
            <span>Back To Home</span>

            <span
              aria-hidden="true"
              style={{
                fontSize: "18px",
              }}
            >
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <small
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(245,243,237,0.24)",
          fontSize: "8px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        © {new Date().getFullYear()} JKAYY
      </small>
    </section>
  );
}