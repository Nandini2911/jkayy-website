"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const socialLinks = [
  {
    name: "Instagram",
    description: "Behind The Scenes",
    href: "https://instagram.com/",
  },
  {
    name: "Spotify",
    description: "Latest Releases",
    href: "https://open.spotify.com/",
  },
  {
    name: "YouTube",
    description: "Showreels",
    href: "https://youtube.com/",
  },
];

const backgroundVariants = {
  rest: {
    scaleX: 0,
  },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const socialArrowVariants = {
  rest: {
    x: 0,
  },
  hover: {
    x: 13,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

export default function StayConnectedSection() {
  return (
    <section
      id="stay-connected"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        minHeight: "120vh",
        display: "flex",
        alignItems: "center",
        padding: "17vh 5vw",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "min(1480px, 100%)",
          margin: "0 auto",
        }}
      >
        <motion.header
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "20px 30px",
            marginBottom: "62px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "rgba(245,243,237,0.48)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            03 / Stay Connected
          </p>

          <span
            style={{
              color: "rgba(245,243,237,0.35)",
              fontSize: "11px",
            }}
          >
            Sound, movement and everything between
            shows.
          </span>
        </motion.header>

        <nav
          style={{
            borderTop:
              "1px solid rgba(255,255,255,0.13)",
          }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              initial={{
                opacity: 0,
                x:
                  index % 2 === 0
                    ? -100
                    : 100,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 1,
                delay: index * 0.08,
                ease,
              }}
              animate="rest"
              whileHover="hover"
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: "190px",
                borderBottom:
                  "1px solid rgba(255,255,255,0.13)",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 220px), 1fr)) auto",
                alignItems: "center",
                gap: "24px 38px",
                padding: "30px 34px",
                color: "#f5f3ed",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              <motion.span
                variants={{
                  rest: {
                    x: 0,
                  },
                  hover: {
                    x: 18,
                    transition: {
                      duration: 0.6,
                      ease,
                    },
                  },
                }}
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily:
                    "Cormorant Garamond, Times New Roman, serif",
                  fontSize:
                    "clamp(44px, 6vw, 94px)",
                  fontWeight: 400,
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                }}
              >
                {social.name}
              </motion.span>

              <p
                style={{
                  position: "relative",
                  zIndex: 2,
                  margin: 0,
                  color:
                    "rgba(255,255,255,0.42)",
                  fontSize: "10px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                }}
              >
                {social.description}
              </p>

              <motion.span
                variants={socialArrowVariants}
                aria-hidden="true"
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontSize: "34px",
                }}
              >
                →
              </motion.span>

              <motion.i
                variants={backgroundVariants}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  transformOrigin: "left",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.065), transparent 75%)",
                }}
              />
            </motion.a>
          ))}
        </nav>
      </div>
    </section>
  );
}