"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";
import {
  type MouseEvent,
  useRef,
} from "react";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const premiumEase = [0.16, 1, 0.3, 1] as const;

function MagneticBookButton() {
  const buttonRef =
    useRef<HTMLAnchorElement | null>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  const x = useSpring(magneticX, {
    stiffness: 190,
    damping: 17,
    mass: 0.35,
  });

  const y = useSpring(magneticY, {
    stiffness: 190,
    damping: 17,
    mass: 0.35,
  });

  const handleMouseMove = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      shouldReduceMotion ||
      !buttonRef.current
    ) {
      return;
    }

    const bounds =
      buttonRef.current.getBoundingClientRect();

    const relativeX =
      event.clientX -
      bounds.left -
      bounds.width / 2;

    const relativeY =
      event.clientY -
      bounds.top -
      bounds.height / 2;

    magneticX.set(relativeX * 0.2);
    magneticY.set(relativeY * 0.2);
  };

  const resetPosition = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  return (
    <motion.a
      ref={buttonRef}
      href="#contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{
        x,
        y,
        fontFamily: cleanFont.style.fontFamily,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className="
        group
        relative
        inline-flex
        min-w-[190px]
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-white
        bg-white
        px-8
        py-4
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.28em]
        text-black
        shadow-[0_20px_65px_rgba(255,255,255,0.12)]
        transition-shadow
        duration-500
        hover:shadow-[0_25px_90px_rgba(255,255,255,0.26)]
        sm:min-w-[220px]
        sm:px-10
        sm:py-5
        sm:text-[11px]
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute
          inset-0
          origin-bottom
          scale-y-0
          bg-[#161616]
          transition-transform
          duration-500
          ease-out
          group-hover:scale-y-100
        "
      />

      <span
        className="
          relative
          z-10
          flex
          items-center
          gap-4
          transition-colors
          duration-500
          group-hover:text-white
        "
      >
        Book JKAYY

        <ArrowUpRight
          size={16}
          strokeWidth={1.7}
          className="
            transition-transform
            duration-500
            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
        />
      </span>
    </motion.a>
  );
}

export default function BookJkayySection() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      id="book-jkayy"
      className="
        relative
        z-30
        flex
        min-h-[80svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#030303]
        px-4
        py-20
        text-white
        sm:px-7
        lg:min-h-[100svh]
        lg:px-10
      "
    >
      {/* Subtle background grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
      />

      {/* Background vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_5%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.96)_100%)]
        "
      />

      {/* Moving spotlight */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [
                  "-60%",
                  "45%",
                  "-60%",
                ],
                opacity: [
                  0.18,
                  0.48,
                  0.18,
                ],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[10%]
          h-[100svh]
          w-[38vw]
          min-w-[320px]
          -translate-x-1/2
          -rotate-[12deg]
          bg-[linear-gradient(to_bottom,rgba(255,255,255,0.16),rgba(255,255,255,0.045)_42%,transparent_78%)]
          blur-[42px]
        "
      />

      {/* Spotlight source */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [
                  "-36vw",
                  "34vw",
                  "-36vw",
                ],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[3%]
          h-2
          w-24
          -translate-x-1/2
          rounded-full
          bg-white/80
          blur-[2px]
          shadow-[0_0_30px_rgba(255,255,255,0.65)]
        "
      />

      {/* Soft smoke layer one */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [
                  "-12%",
                  "10%",
                  "-12%",
                ],
                y: [
                  "4%",
                  "-8%",
                  "4%",
                ],
                scale: [
                  1,
                  1.15,
                  1,
                ],
                opacity: [
                  0.12,
                  0.28,
                  0.12,
                ],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[-18%]
          left-[-8%]
          h-[55vh]
          w-[72vw]
          rounded-[50%]
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),rgba(150,150,150,0.04)_45%,transparent_75%)]
          blur-[70px]
        "
      />

      {/* Soft smoke layer two */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [
                  "10%",
                  "-12%",
                  "10%",
                ],
                y: [
                  "0%",
                  "-10%",
                  "0%",
                ],
                scale: [
                  1.08,
                  0.95,
                  1.08,
                ],
                opacity: [
                  0.1,
                  0.23,
                  0.1,
                ],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[-15%]
          right-[-15%]
          h-[60vh]
          w-[75vw]
          rounded-[50%]
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),rgba(130,130,130,0.035)_46%,transparent_74%)]
          blur-[85px]
        "
      />

      {/* Thin top line */}
      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 1.5,
          ease: premiumEase,
        }}
        className="
          pointer-events-none
          absolute
          left-5
          right-5
          top-6
          h-px
          origin-center
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          sm:left-10
          sm:right-10
          sm:top-9
        "
      />

      {/* Thin bottom line */}
      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 1.5,
          delay: 0.15,
          ease: premiumEase,
        }}
        className="
          pointer-events-none
          absolute
          bottom-6
          left-5
          right-5
          h-px
          origin-center
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          sm:bottom-9
          sm:left-10
          sm:right-10
        "
      />

      {/* Large background text */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [
                  "2%",
                  "-2%",
                  "2%",
                ],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          hidden
          w-full
          -translate-x-1/2
          -translate-y-1/2
          select-none
          whitespace-nowrap
          text-center
          text-[20vw]
          font-medium
          uppercase
          leading-none
          tracking-[-0.09em]
          text-white/[0.018]
          lg:block
        "
        style={{
          fontFamily:
            luxuryFont.style.fontFamily,
        }}
      >
        JKAYY JKAYY
      </motion.div>

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1200px]
          flex-col
          items-center
          text-center
        "
      >
        {/* Section label */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.85,
            ease: premiumEase,
          }}
          className="
            mb-9
            flex
            items-center
            gap-4
            sm:mb-12
          "
        >
          <span className="h-px w-10 bg-white/25 sm:w-16" />

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.48em]
              text-white/45
              sm:text-[10px]
            "
            style={{
              fontFamily:
                cleanFont.style.fontFamily,
            }}
          >
            04 · Book JKAYY
          </span>

          <span className="h-px w-10 bg-white/25 sm:w-16" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 70,
            scale: 0.92,
            filter: "blur(16px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 1.15,
            delay: 0.1,
            ease: premiumEase,
          }}
          className="relative"
        >
          <p
            className="
              mb-3
              text-[clamp(1.4rem,3vw,2.8rem)]
              font-normal
              italic
              leading-none
              text-white/45
            "
            style={{
              fontFamily:
                luxuryFont.style.fontFamily,
            }}
          >
            Ready to create
          </p>

          <h2
            className="
              max-w-[1100px]
              text-[clamp(3.6rem,9vw,9.5rem)]
              font-medium
              uppercase
              leading-[0.77]
              tracking-[-0.07em]
              text-white
            "
            style={{
              fontFamily:
                luxuryFont.style.fontFamily,
            }}
          >
            An Unforgettable

            <span
              className="
                block
                font-normal
                italic
                text-white/65
              "
            >
              Night?
            </span>
          </h2>

          <motion.span
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scaleX: [
                      0.65,
                      1,
                      0.65,
                    ],
                    opacity: [
                      0.2,
                      0.7,
                      0.2,
                    ],
                  }
            }
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -bottom-7
              left-1/2
              h-px
              w-[42%]
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-white/80
              to-transparent
              shadow-[0_0_22px_rgba(255,255,255,0.55)]
            "
          />
        </motion.div>

        {/* CTA */}
        <motion.div
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.85,
            delay: 0.38,
            ease: premiumEase,
          }}
          className="mt-16 sm:mt-20"
        >
          <MagneticBookButton />
        </motion.div>
      </div>

      {/* Corner details */}
      <span
        className="
          pointer-events-none
          absolute
          left-5
          top-6
          h-6
          w-6
          border-l
          border-t
          border-white/20
          sm:left-10
          sm:top-9
        "
      />

      <span
        className="
          pointer-events-none
          absolute
          right-5
          top-6
          h-6
          w-6
          border-r
          border-t
          border-white/20
          sm:right-10
          sm:top-9
        "
      />

      <span
        className="
          pointer-events-none
          absolute
          bottom-6
          left-5
          h-6
          w-6
          border-b
          border-l
          border-white/20
          sm:bottom-9
          sm:left-10
        "
      />

      <span
        className="
          pointer-events-none
          absolute
          bottom-6
          right-5
          h-6
          w-6
          border-b
          border-r
          border-white/20
          sm:bottom-9
          sm:right-10
        "
      />
    </section>
  );
}