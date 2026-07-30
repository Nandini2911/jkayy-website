"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";
import Link from "next/link";
import { useRef } from "react";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const FIRST_LINE = "Music isn't heard.";
const SECOND_LINE = "It's felt.";

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

type AnimatedLineProps = {
  text: string;
  visible: boolean;
  reduceMotion: boolean;
  delay: number;
  italic?: boolean;
  color?: string;
};

function AnimatedLine({
  text,
  visible,
  reduceMotion,
  delay,
  italic = false,
  color = "#ffffff",
}: AnimatedLineProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width: "100%",
        overflow: "hidden",
        padding: "0.18em 0.06em 0.25em",
        lineHeight: 1,
      }}
    >
      <m.span
        initial={false}
        animate={
          visible
            ? {
                opacity: 1,
                y: "0%",
              }
            : {
                opacity: 0,
                y: "-105%",
              }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.72,
          delay: reduceMotion ? 0 : delay,
          ease: SMOOTH_EASE,
        }}
        style={{
          display: "block",
          width: "100%",
          color,
          fontStyle: italic ? "italic" : "normal",
          fontWeight: italic ? 400 : 500,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </m.span>
    </span>
  );
}

export default function JKAYYQuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.18,
    margin: "0px 0px -5% 0px",
  });

  const showContent = reduceMotion || isInView;

  const firstLineDelay = 0.08;
  const secondLineDelay = 0.18;
  const authorDelay = 0.38;
  const buttonDelay = 0.52;

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        ref={sectionRef}
        id="quote"
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
            "clamp(90px, 10vw, 150px) clamp(16px, 5vw, 80px)",
          overflow: "hidden",
          color: "#ffffff",
          background: "#070505",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          contentVisibility: "auto",
          containIntrinsicSize: "100svh",
        }}
      >
        <m.div
          initial={false}
          animate={{
            opacity: showContent ? 1 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            ease: SMOOTH_EASE,
          }}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <m.div
            initial={false}
            animate={
              showContent
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.02,
              ease: SMOOTH_EASE,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "clamp(28px, 4vw, 50px)",
              color: "rgba(255,255,255,0.48)",
              fontFamily: cleanFont.style.fontFamily,
              fontSize: "clamp(7px, 0.7vw, 10px)",
              fontWeight: 600,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "clamp(28px, 4vw, 55px)",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.32))",
              }}
            />

            A JKAYY Philosophy

            <span
              style={{
                width: "clamp(28px, 4vw, 55px)",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.32), transparent)",
              }}
            />
          </m.div>

          <h2
            aria-label={`${FIRST_LINE} ${SECOND_LINE}`}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1700px",
              margin: 0,
              color: "#ffffff",
              fontFamily: luxuryFont.style.fontFamily,
              fontSize: "clamp(2.5rem, 10.8vw, 11.5rem)",
              fontWeight: 500,
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
              textAlign: "center",
              textRendering: "optimizeLegibility",
            }}
          >
            <span
              style={{
                display: "block",
                width: "100%",
                marginBottom: "-0.18em",
              }}
            >
              <AnimatedLine
                text={FIRST_LINE}
                visible={showContent}
                reduceMotion={reduceMotion}
                delay={firstLineDelay}
                color="#ffffff"
              />
            </span>

            <span
              style={{
                display: "block",
                width: "100%",
              }}
            >
              <AnimatedLine
                text={SECOND_LINE}
                visible={showContent}
                reduceMotion={reduceMotion}
                delay={secondLineDelay}
                italic
                color="rgba(255,255,255,0.58)"
              />
            </span>
          </h2>

          <m.div
            initial={false}
            animate={
              showContent
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : authorDelay,
              ease: SMOOTH_EASE,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(11px, 2vw, 16px)",
              marginTop: "clamp(30px, 4vw, 52px)",
            }}
          >
            <span
              style={{
                width: "clamp(28px, 4vw, 50px)",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.42))",
              }}
            />

            <span
              style={{
                color: "rgba(255,255,255,0.64)",
                fontFamily: cleanFont.style.fontFamily,
                fontSize: "clamp(7px, 0.72vw, 10px)",
                fontWeight: 600,
                letterSpacing: "clamp(0.26em, 0.7vw, 0.4em)",
                textTransform: "uppercase",
              }}
            >
              JKAYY
            </span>

            <span
              style={{
                width: "clamp(28px, 4vw, 50px)",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.42), transparent)",
              }}
            />
          </m.div>

          {/* MUSIC PAGE BUTTON */}
          <m.div
            initial={false}
            animate={
              showContent
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : buttonDelay,
              ease: SMOOTH_EASE,
            }}
            style={{
              marginTop: "clamp(28px, 4vw, 46px)",
            }}
          >
            <Link
              href="/music"
              aria-label="Explore JKAYY music"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                minHeight: "48px",
                padding: "0 24px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: "999px",
                color: "#ffffff",
                background: "rgba(255,255,255,0.04)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08)",
                fontFamily: cleanFont.style.fontFamily,
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.26em",
                textDecoration: "none",
                textTransform: "uppercase",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                transition:
                  "background 280ms ease, border-color 280ms ease, transform 280ms cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#ffffff";
                event.currentTarget.style.color = "#070505";
                event.currentTarget.style.borderColor = "#ffffff";
                event.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background =
                  "rgba(255,255,255,0.04)";
                event.currentTarget.style.color = "#ffffff";
                event.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.22)";
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Explore Music

             
              
           
            </Link>
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
}