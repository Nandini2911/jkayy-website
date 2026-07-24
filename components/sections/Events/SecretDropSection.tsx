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

const particles = [
  {
    left: "8%",
    top: "18%",
    size: 2,
    duration: 7,
    delay: 0.2,
  },
  {
    left: "16%",
    top: "72%",
    size: 3,
    duration: 9,
    delay: 1.4,
  },
  {
    left: "24%",
    top: "32%",
    size: 1,
    duration: 6,
    delay: 0.8,
  },
  {
    left: "35%",
    top: "82%",
    size: 2,
    duration: 8,
    delay: 2,
  },
  {
    left: "46%",
    top: "14%",
    size: 2,
    duration: 10,
    delay: 0.5,
  },
  {
    left: "57%",
    top: "74%",
    size: 1,
    duration: 7,
    delay: 1.7,
  },
  {
    left: "68%",
    top: "24%",
    size: 3,
    duration: 9,
    delay: 0.3,
  },
  {
    left: "76%",
    top: "82%",
    size: 2,
    duration: 8,
    delay: 2.2,
  },
  {
    left: "88%",
    top: "42%",
    size: 2,
    duration: 7,
    delay: 1,
  },
  {
    left: "94%",
    top: "16%",
    size: 1,
    duration: 10,
    delay: 1.8,
  },
  {
    left: "12%",
    top: "48%",
    size: 1,
    duration: 8,
    delay: 2.5,
  },
  {
    left: "82%",
    top: "61%",
    size: 1,
    duration: 6,
    delay: 1.1,
  },
];

function InstagramIcon({
  size = 15,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="17.4"
        cy="6.7"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function MagneticInstagramButton() {
  const buttonRef =
    useRef<HTMLAnchorElement | null>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  const x = useSpring(magneticX, {
    stiffness: 180,
    damping: 16,
    mass: 0.35,
  });

  const y = useSpring(magneticY, {
    stiffness: 180,
    damping: 16,
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
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      suppressHydrationWarning
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{
        x,
        y,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className={`
        ${cleanFont.className}
        group
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-white/25
        bg-white
        px-7
        py-4
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.22em]
        text-black
        shadow-[0_18px_55px_rgba(255,255,255,0.08)]
        transition-shadow
        duration-500
        hover:shadow-[0_18px_70px_rgba(255,255,255,0.2)]
        sm:px-9
        sm:py-5
        sm:text-[11px]
        !text-black
        !no-underline
      `}
    >
      <motion.span
        aria-hidden="true"
        className="
          absolute
          inset-0
          origin-left
          scale-x-0
          bg-[#202020]
          transition-transform
          duration-500
          ease-out
          group-hover:scale-x-100
        "
      />

      <span
        className="
          relative
          z-10
          flex
          items-center
          gap-3
          transition-colors
          duration-500
          group-hover:text-white
        "
      >
        <InstagramIcon size={15} />

        Follow on Instagram

        <ArrowUpRight
          size={15}
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

export default function SecretDropSection() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      id="secret-drop"
      className="
        relative
        z-30
        flex
        min-h-[85svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-black
        px-4
        py-16
        text-white
        sm:px-7
        lg:min-h-[100svh]
        lg:px-10
      "
    >
      {/* Background grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* Vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.94)_100%)]
        "
      />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map(
          (particle) => (
            <motion.span
              key={`${particle.left}-${particle.top}`}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={
                shouldReduceMotion
                  ? {
                      opacity: 0.35,
                    }
                  : {
                      opacity: [
                        0.08,
                        0.65,
                        0.08,
                      ],
                      y: [20, -26, 20],
                      scale: [
                        0.8,
                        1.3,
                        0.8,
                      ],
                    }
              }
              transition={{
                duration:
                  particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              className="
                absolute
                rounded-full
                bg-white
                shadow-[0_0_12px_rgba(255,255,255,0.75)]
              "
            />
          ),
        )}
      </div>

      {/* Large background typography */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [
                  "3%",
                  "-3%",
                  "3%",
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
          left-0
          top-1/2
          hidden
          w-full
          -translate-y-1/2
          select-none
          whitespace-nowrap
          text-center
          text-[18vw]
          font-medium
          uppercase
          leading-none
          tracking-[-0.08em]
          text-white/[0.018]
          lg:block
        "
        style={{
          fontFamily:
            luxuryFont.style.fontFamily,
        }}
      >
        Secret Drop
      </motion.div>

      {/* Animated border wrapper */}
      <div
        className="
          relative
          w-full
          max-w-[1500px]
          overflow-hidden
          rounded-[30px]
          p-px
          sm:rounded-[40px]
        "
      >
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[200%]
            w-[200%]
            -translate-x-1/2
            -translate-y-1/2
            bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.05)_70deg,rgba(255,255,255,0.8)_100deg,rgba(255,255,255,0.05)_135deg,transparent_190deg)]
          "
        />

        <div
          className="
            relative
            flex
            min-h-[72svh]
            items-center
            justify-center
            overflow-hidden
            rounded-[29px]
            border
            border-white/[0.06]
            bg-[#070707]
            px-5
            py-16
            shadow-[0_40px_140px_rgba(0,0,0,0.8)]
            sm:rounded-[39px]
            sm:px-10
            lg:min-h-[82svh]
            lg:px-16
          "
        >
          {/* Moving spotlight */}
          <motion.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [
                      "-45%",
                      "45%",
                      "-45%",
                    ],
                    opacity: [
                      0.15,
                      0.42,
                      0.15,
                    ],
                  }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[34%]
              h-[330px]
              w-[75vw]
              max-w-[950px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-[50%]
              bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),rgba(180,180,180,0.05)_35%,transparent_72%)]
              blur-[65px]
            "
          />

          {/* Top decorative line */}
          <motion.span
            aria-hidden="true"
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 1.5,
              ease: premiumEase,
            }}
            className="
              absolute
              left-8
              right-8
              top-7
              h-px
              origin-center
              bg-gradient-to-r
              from-transparent
              via-white/25
              to-transparent
              sm:left-14
              sm:right-14
            "
          />

          {/* Bottom decorative line */}
          <motion.span
            aria-hidden="true"
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 1.5,
              delay: 0.15,
              ease: premiumEase,
            }}
            className="
              absolute
              bottom-7
              left-8
              right-8
              h-px
              origin-center
              bg-gradient-to-r
              from-transparent
              via-white/25
              to-transparent
              sm:left-14
              sm:right-14
            "
          />

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              w-full
              max-w-[880px]
              flex-col
              items-center
              text-center
            "
          >
            {/* Label */}
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
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
                duration: 0.9,
                ease: premiumEase,
              }}
              className="
                mb-8
                flex
                items-center
                gap-4
                sm:mb-10
              "
            >
              <span className="h-px w-8 bg-white/25 sm:w-14" />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.5em]
                  text-white/45
                  sm:text-[10px]
                "
                style={{
                  fontFamily:
                    cleanFont.style.fontFamily,
                }}
              >
                The Next Drop
              </span>

              <span className="h-px w-8 bg-white/25 sm:w-14" />
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{
                opacity: 0,
                y: 70,
                scale: 0.9,
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
                duration: 1.2,
                delay: 0.12,
                ease: premiumEase,
              }}
              className="relative"
            >
              <h2
                className="
                  relative
                  text-[clamp(4.5rem,12vw,10.5rem)]
                  font-medium
                  uppercase
                  leading-[0.7]
                  tracking-[-0.075em]
                  text-white
                "
                style={{
                  fontFamily:
                    luxuryFont.style.fontFamily,
                }}
              >
                Coming

                <span
                  className="
                    block
                    font-normal
                    italic
                    text-white/65
                  "
                >
                  Soon
                </span>
              </h2>

              <motion.div
                aria-hidden="true"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: [
                          0.2,
                          0.65,
                          0.2,
                        ],
                        scaleX: [
                          0.7,
                          1.1,
                          0.7,
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
                  -bottom-6
                  left-1/2
                  h-px
                  w-[58%]
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-white/70
                  to-transparent
                  shadow-[0_0_20px_rgba(255,255,255,0.65)]
                "
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
                filter: "blur(8px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: premiumEase,
              }}
              className="
                mt-14
                max-w-[560px]
                sm:mt-16
              "
            >
              <p
                className="
                  text-[13px]
                  leading-7
                  text-white/50
                  sm:text-[15px]
                  sm:leading-8
                "
                style={{
                  fontFamily:
                    cleanFont.style.fontFamily,
                }}
              >
                Every unforgettable night begins
                with the right moment.
              </p>

              <p
                className="
                  mt-4
                  text-[13px]
                  leading-7
                  text-white/35
                  sm:text-[15px]
                  sm:leading-8
                "
                style={{
                  fontFamily:
                    cleanFont.style.fontFamily,
                }}
              >
                The next destination is currently
                under wraps. Follow the journey and
                be the first to know when the lights
                come on.
              </p>
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
                duration: 0.8,
                delay: 0.55,
                ease: premiumEase,
              }}
              className="mt-10 sm:mt-12"
            >
              <MagneticInstagramButton />
            </motion.div>
          </div>

          {/* Top-left corner */}
          <span
            className="
              absolute
              left-6
              top-6
              h-5
              w-5
              border-l
              border-t
              border-white/25
              sm:left-9
              sm:top-9
            "
          />

          {/* Top-right corner */}
          <span
            className="
              absolute
              right-6
              top-6
              h-5
              w-5
              border-r
              border-t
              border-white/25
              sm:right-9
              sm:top-9
            "
          />

          {/* Bottom-left corner */}
          <span
            className="
              absolute
              bottom-6
              left-6
              h-5
              w-5
              border-b
              border-l
              border-white/25
              sm:bottom-9
              sm:left-9
            "
          />

          {/* Bottom-right corner */}
          <span
            className="
              absolute
              bottom-6
              right-6
              h-5
              w-5
              border-b
              border-r
              border-white/25
              sm:bottom-9
              sm:right-9
            "
          />
        </div>
      </div>
    </section>
  );
}