"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { useEffect, useRef, useState } from "react";

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

const PORTRAIT_IMAGE = "/images/about3.webp";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function TheStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const reduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.12,
  });

  const [sectionReady, setSectionReady] = useState(false);

  /*
   * Section loading animation starts only when
   * the section enters the screen.
   */
  useEffect(() => {
    if (!isInView || sectionReady) return;

    if (reduceMotion) {
      setSectionReady(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setSectionReady(true);
    }, 1350);

    return () => window.clearTimeout(timer);
  }, [isInView, reduceMotion, sectionReady]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "5%"],
  );

  const portraitScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.07, 1.02, 1.07],
  );

  const watermarkX = useTransform(
    scrollYProgress,
    [0, 1],
    ["-2%", "2%"],
  );

  const contentContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.08,
        staggerChildren: reduceMotion ? 0 : 0.09,
      },
    },
  };

  const revealItemVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.9,
        ease: LUXURY_EASE,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="the-story"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#080808]
        text-white
      "
    >
      {/* =========================================
          SECTION LOADING ANIMATION
      ========================================== */}

      <AnimatePresence>
        {isInView && !sectionReady && (
          <motion.div
            key="story-loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.55,
                ease: LUXURY_EASE,
              },
            }}
            className="
              absolute
              inset-0
              z-[100]
              flex
              min-h-[100svh]
              items-center
              justify-center
              overflow-hidden
              bg-[#080808]
            "
          >
            {/* Background loader text */}

            <motion.div
              aria-hidden="true"
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: [0, 0.035, 0.035],
                scale: [0.94, 1, 1.02],
              }}
              transition={{
                duration: 1.2,
                ease: LUXURY_EASE,
              }}
              className="
                pointer-events-none
                absolute
                select-none
                whitespace-nowrap
                text-[clamp(10rem,35vw,34rem)]
                font-semibold
                italic
                leading-none
                tracking-[-0.12em]
                text-white
              "
              style={{
                fontFamily: luxuryFont.style.fontFamily,
              }}
            >
              JK
            </motion.div>

            <div
              className="
                relative
                z-10
                flex
                w-[min(82vw,520px)]
                flex-col
                items-center
              "
            >
              <motion.span
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  ease: LUXURY_EASE,
                }}
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.55em]
                  text-white/45
                "
                style={{
                  fontFamily: cleanFont.style.fontFamily,
                }}
              >
                The Story
              </motion.span>

              {/* Loading line */}

              <div
                className="
                  relative
                  mt-6
                  h-px
                  w-full
                  overflow-hidden
                  bg-white/10
                "
              >
                <motion.span
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 1.05,
                    delay: 0.12,
                    ease: LUXURY_EASE,
                  }}
                  className="
                    absolute
                    inset-0
                    origin-left
                    bg-white/75
                  "
                />
              </div>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0.45],
                }}
                transition={{
                  duration: 1.05,
                  delay: 0.2,
                  ease: "easeInOut",
                }}
                className="
                  mb-0
                  mt-5
                  text-center
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.32em]
                  text-white/50
                "
                style={{
                  fontFamily: cleanFont.style.fontFamily,
                }}
              >
                Passion · Discipline · Performance
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          LARGE BACKGROUND JK
      ========================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          x: reduceMotion ? 0 : watermarkX,
          fontFamily: luxuryFont.style.fontFamily,
        }}
        className="
          pointer-events-none
          absolute
          bottom-[-8vw]
          right-[-5vw]
          z-0
          select-none
          whitespace-nowrap
          text-[clamp(15rem,38vw,43rem)]
          font-semibold
          italic
          leading-none
          tracking-[-0.11em]
          text-white/[0.022]
        "
      >
        JK
      </motion.div>

      {/* TOP BORDER */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-30
          h-px
          w-[calc(100%-40px)]
          max-w-[1760px]
          -translate-x-1/2
          bg-white/15
          sm:w-[calc(100%-64px)]
        "
      />

      {/* =========================================
          MAIN SECTION LAYOUT
      ========================================== */}

      <motion.div
        initial={false}
        animate={{
          opacity: sectionReady ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
          ease: LUXURY_EASE,
        }}
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[1920px]
          grid-cols-1
          lg:min-h-[100svh]
          lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]
        "
      >
        {/* =========================================
            LEFT PORTRAIT
        ========================================== */}

        <div
          className="
            relative
            h-[66svh]
            min-h-[440px]
            overflow-hidden
            sm:h-[72svh]
            sm:min-h-[560px]
            lg:h-auto
            lg:min-h-[100svh]
          "
        >
          <motion.div
            initial={false}
            animate={
              sectionReady
                ? {
                    opacity: 1,
                    scale: 1,
                    clipPath: "inset(0% 0% 0% 0%)",
                  }
                : {
                    opacity: 0,
                    scale: reduceMotion ? 1 : 1.035,
                    clipPath: reduceMotion
                      ? "inset(0% 0% 0% 0%)"
                      : "inset(7% 5% 7% 5%)",
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 1.15,
              delay: reduceMotion ? 0 : 0.08,
              ease: LUXURY_EASE,
            }}
            className="
              absolute
              inset-x-5
              bottom-5
              top-5
              overflow-hidden
              bg-black
              sm:inset-x-8
              sm:bottom-8
              sm:top-8
              lg:bottom-12
              lg:left-12
              lg:right-8
              lg:top-12
              xl:left-16
              xl:right-10
            "
          >
            <motion.div
              style={{
                y: reduceMotion ? 0 : portraitY,
                scale: reduceMotion ? 1.04 : portraitScale,
              }}
              className="
                absolute
                inset-[-7%]
                will-change-transform
              "
            >
              <Image
                src={PORTRAIT_IMAGE}
                alt="Jitesh Kapoor performing as a DJ"
                fill
                priority
                sizes="
                  (max-width: 1023px) 100vw,
                  50vw
                "
                className="
                  object-cover
                  object-center
                "
                style={{
                  filter:
                    "grayscale(100%) contrast(1.12) brightness(0.8)",
                }}
              />
            </motion.div>

            {/* IMAGE BOTTOM SHADE */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-b
                from-transparent
                via-transparent
                to-black/70
              "
            />

            {/* IMAGE BORDER */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                border
                border-white/10
              "
            />

            {/* TOP IMAGE NUMBER */}


            {/* IMAGE LABEL */}

            <motion.div
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 14,
              }}
              animate={{
                opacity: sectionReady ? 1 : 0,
                y: sectionReady ? 0 : reduceMotion ? 0 : 14,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: reduceMotion ? 0 : 0.62,
                ease: LUXURY_EASE,
              }}
              className="
                absolute
                bottom-5
                left-5
                right-5
                flex
                items-center
                justify-between
                sm:bottom-7
                sm:left-7
                sm:right-7
              "
            >
             
               
               
              <span
                className="
                  hidden
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-white/35
                  sm:block
                "
                style={{
                  fontFamily: cleanFont.style.fontFamily,
                }}
              >
                Delhi · India
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* =========================================
            RIGHT STORY CONTENT
        ========================================== */}

        <div
          className="
            relative
            flex
            items-center
            px-5
            pb-20
            pt-12
            sm:px-10
            sm:pb-24
            sm:pt-16
            lg:min-h-[100svh]
            lg:px-12
            lg:py-16
            xl:px-16
            2xl:px-20
          "
        >
          {/* DESKTOP VERTICAL DIVIDER */}

          <motion.div
            aria-hidden="true"
            initial={{
              scaleY: 0,
            }}
            animate={{
              scaleY: sectionReady ? 1 : 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.15,
              delay: reduceMotion ? 0 : 0.25,
              ease: LUXURY_EASE,
            }}
            className="
              absolute
              bottom-[7%]
              left-0
              top-[7%]
              hidden
              w-px
              origin-top
              bg-white/20
              lg:block
            "
          />

          {/* MOVING DIVIDER LIGHT */}

          {sectionReady && !reduceMotion && (
            <motion.span
              aria-hidden="true"
              initial={{
                top: "10%",
                opacity: 0,
              }}
              animate={{
                top: ["10%", "82%", "10%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-[-1px]
                hidden
                h-14
                w-[2px]
                bg-white/70
                lg:block
              "
            />
          )}

          <motion.div
            variants={contentContainerVariants}
            initial="hidden"
            animate={sectionReady ? "visible" : "hidden"}
            className="
              relative
              z-10
              w-full
              max-w-[900px]
            "
          >
            {/* EYEBROW */}

           
            

            
            {/* ONE-LINE HEADING */}

            <motion.h1
              variants={revealItemVariants}
              className="
                m-0
                mt-5
                flex
                max-w-full
                select-none
                items-baseline
                whitespace-nowrap
                pb-[0.12em]
                text-[clamp(3.15rem,14vw,9.1rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.072em]
                text-white
                sm:mt-6
                lg:text-[clamp(5.4rem,7.5vw,9.1rem)]
              "
              style={{
                fontFamily: luxuryFont.style.fontFamily,
              }}
            >
              <span>The</span>

              <em
                className="
                  ml-[0.09em]
                  font-normal
                  italic
                  text-white/45
                "
              >
                Story
              </em>
            </motion.h1>

            {/* ANIMATED HORIZONTAL LINE */}

            <motion.div
              variants={revealItemVariants}
              className="
                relative
                mt-5
                h-px
                w-full
                overflow-hidden
                bg-white/15
                sm:mt-7
              "
            >
              {!reduceMotion && sectionReady && (
                <motion.span
                  animate={{
                    x: ["-110%", "110%"],
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    inset-y-0
                    w-[35%]
                    bg-gradient-to-r
                    from-transparent
                    via-white/65
                    to-transparent
                  "
                />
              )}
            </motion.div>

           {/* ATTRACTIVE STORY STATEMENT */}

<motion.p
  variants={revealItemVariants}
  className="
    m-0
    mt-6
    w-full
    max-w-full
    text-balance
    text-[clamp(1.25rem,4.7vw,1.8rem)]
    font-medium
    leading-[1.12]
    tracking-[-0.03em]
    text-white
    sm:mt-7
    sm:text-[clamp(1.35rem,3.2vw,2rem)]
    md:whitespace-nowrap
    md:text-[clamp(1.2rem,2.35vw,1.8rem)]
    lg:text-[clamp(1.15rem,1.65vw,1.65rem)]
    xl:text-[clamp(1.25rem,1.55vw,1.85rem)]
    2xl:text-[clamp(1.4rem,1.5vw,2rem)]
  "
  style={{
    fontFamily: luxuryFont.style.fontFamily,
  }}
>
  Built through passion. Driven by discipline. Defined by performance.
</motion.p>

            {/* SINGLE STORY PARAGRAPH */}

            <motion.p
              variants={revealItemVariants}
              className="
                mb-0
                mt-6
                max-w-[790px]
                text-[clamp(0.96rem,1.05vw,1.08rem)]
                font-light
                leading-[1.85]
                text-white/55
                sm:mt-7
              "
              style={{
                fontFamily: cleanFont.style.fontFamily,
              }}
            >
              JKAYY has built his identity around passion,
              discipline and performance. Known for his signature blend of
              Techno and Trance, he has performed across some of Delhi
              NCR&apos;s leading clubs, creating high-energy experiences
              that connect people through music.
            </motion.p>

            {/* FEATURED QUOTE */}

            <motion.div
              variants={revealItemVariants}
              className="
                relative
                mt-8
                max-w-[850px]
                overflow-hidden
                border-l
                border-white/35
                pl-5
                sm:mt-10
                sm:pl-7
              "
            >
              <motion.span
                aria-hidden="true"
                initial={{
                  x: "-120%",
                }}
                animate={
                  sectionReady && !reduceMotion
                    ? {
                        x: ["-120%", "180%"],
                      }
                    : undefined
                }
                transition={{
                  duration: 2.8,
                  delay: 1.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  w-24
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.04]
                  to-transparent
                "
              />

              <p
                className="
                  relative
                  m-0
                  text-[clamp(1.55rem,2.55vw,3.25rem)]
                  font-medium
                  leading-[1.02]
                  tracking-[-0.04em]
                  text-white
                  xl:whitespace-nowrap
                "
                style={{
                  fontFamily: luxuryFont.style.fontFamily,
                }}
              >
                Music isn&apos;t just heard —{" "}
                <em className="font-normal italic text-white/45">
                  it&apos;s remembered.
                </em>
              </p>
            </motion.div>

            {/* BOTTOM CATEGORIES */}

            <motion.div
              variants={revealItemVariants}
              className="
                mt-9
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-4
                border-t
                border-white/10
                pt-6
                sm:mt-10
                sm:gap-x-6
              "
            >
              {["Music", "Discipline", "Performance"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-4
                      sm:gap-6
                    "
                  >
                    {index !== 0 && (
                      <span
                        className="
                          h-1
                          w-1
                          rounded-full
                          bg-white/25
                        "
                      />
                    )}

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.27em]
                        text-white/40
                      "
                      style={{
                        fontFamily: cleanFont.style.fontFamily,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ),
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* BOTTOM BORDER */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-30
          h-px
          w-[calc(100%-40px)]
          max-w-[1760px]
          -translate-x-1/2
          bg-white/15
          sm:w-[calc(100%-64px)]
        "
      />
    </section>
  );
}