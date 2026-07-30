"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useInView,
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
  useEffect,
  useRef,
  useState,
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

function useFinePointer() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => setFinePointer(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return finePointer;
}

function MagneticBookButton() {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const finePointer = useFinePointer();

  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  const x = useSpring(magneticX, {
    stiffness: 220,
    damping: 24,
    mass: 0.22,
  });

  const y = useSpring(magneticY, {
    stiffness: 220,
    damping: 24,
    mass: 0.22,
  });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    boundsRef.current = buttonRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMouseMove = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      shouldReduceMotion ||
      !finePointer ||
      !buttonRef.current
    ) {
      return;
    }

    const bounds =
      boundsRef.current ??
      buttonRef.current.getBoundingClientRect();

    const relativeX =
      event.clientX -
      bounds.left -
      bounds.width / 2;

    const relativeY =
      event.clientY -
      bounds.top -
      bounds.height / 2;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      magneticX.set(relativeX * 0.14);
      magneticY.set(relativeY * 0.14);
    });
  };

  const resetPosition = () => {
    boundsRef.current = null;
    magneticX.set(0);
    magneticY.set(0);
  };

  return (
    <motion.a
      ref={buttonRef}
      href="#contact"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{
        x,
        y,
        fontFamily: cleanFont.style.fontFamily,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        group
        relative
        inline-flex
        min-h-12
        min-w-[170px]
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-white
        bg-white
        px-6
        py-3.5
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.24em]
        text-black
        shadow-[0_16px_44px_rgba(255,255,255,0.10)]
        transition-[box-shadow,transform]
        duration-300
        hover:shadow-[0_18px_54px_rgba(255,255,255,0.18)]
        sm:min-w-[200px]
        sm:px-8
        sm:py-4
        sm:text-[10px]
        md:min-w-[220px]
        md:text-[11px]
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
          duration-300
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
          gap-3
          transition-colors
          duration-300
          group-hover:text-white
        "
      >
        Book JKAYY

        <ArrowUpRight
          size={16}
          strokeWidth={1.7}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        />
      </span>
    </motion.a>
  );
}

export default function BookJkayySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    margin: "180px 0px 180px 0px",
    amount: 0.08,
  });

  const animateDecor =
    isInView && !shouldReduceMotion;

  return (
    <section
      ref={sectionRef}
      id="book-jkayy"
      className="
        relative
        z-30
        flex
        min-h-[660px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#030303]
        px-4
        py-16
        text-white
        sm:min-h-[720px]
        sm:px-6
        sm:py-18
        md:px-8
        lg:min-h-[100svh]
        lg:px-10
        lg:py-16
        xl:px-12
      "
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "850px",
      }}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_8%,rgba(0,0,0,0.34)_58%,rgba(0,0,0,0.96)_100%)]
        "
      />

      <motion.div
        aria-hidden="true"
        animate={
          animateDecor
            ? {
                x: ["-5%", "5%", "-5%"],
                opacity: [0.55, 0.88, 0.55],
              }
            : {
                x: "0%",
                opacity: 0.55,
              }
        }
        transition={
          animateDecor
            ? {
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0.3,
              }
        }
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[26%]
          h-[62svh]
          w-[20vw]
          min-w-[180px]
          max-w-[320px]
          -translate-x-1/2
          -rotate-[10deg]
          bg-[linear-gradient(to_bottom,rgba(255,255,255,0.09),rgba(255,255,255,0.018)_46%,transparent_82%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-20%]
          left-1/2
          h-[48vh]
          w-[90vw]
          max-w-[1200px]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),rgba(140,140,140,0.02)_42%,transparent_75%)]
        "
      />

      <motion.div
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
          duration: 0.7,
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
          via-white/18
          to-transparent
          sm:left-8
          sm:right-8
          sm:top-8
          lg:left-10
          lg:right-10
        "
      />

      <motion.div
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
          duration: 0.7,
          delay: 0.08,
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
          via-white/18
          to-transparent
          sm:bottom-8
          sm:left-8
          sm:right-8
          lg:left-10
          lg:right-10
        "
      />

      <motion.div
        aria-hidden="true"
        animate={
          animateDecor
            ? {
                x: ["1%", "-1%", "1%"],
              }
            : {
                x: "0%",
              }
        }
        transition={
          animateDecor
            ? {
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0.3,
              }
        }
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
          text-[19vw]
          font-medium
          uppercase
          leading-none
          tracking-[-0.09em]
          text-white/[0.014]
          xl:block
        "
        style={{
          fontFamily: luxuryFont.style.fontFamily,
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
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.52,
            ease: premiumEase,
          }}
          className="
            mb-7
            flex
            items-center
            gap-3
            sm:mb-9
            sm:gap-4
          "
        >
          <span className="h-px w-8 bg-white/25 sm:w-14" />

          <span
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.40em]
              text-white/45
              sm:text-[9px]
              md:text-[10px]
            "
            style={{
              fontFamily: cleanFont.style.fontFamily,
            }}
          >
            04 · Book JKAYY
          </span>

          <span className="h-px w-8 bg-white/25 sm:w-14" />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.975,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.65,
            delay: 0.05,
            ease: premiumEase,
          }}
          className="relative"
        >
          <p
            className="
              mb-2
              text-[clamp(1.15rem,5vw,2.4rem)]
              font-normal
              italic
              leading-none
              text-white/42
              sm:text-[clamp(1.3rem,3vw,2.6rem)]
              lg:text-[clamp(1.5rem,2.4vw,2.8rem)]
            "
            style={{
              fontFamily: luxuryFont.style.fontFamily,
            }}
          >
            Ready to create
          </p>

          <h2
            className="
              max-w-[94vw]
              text-[clamp(3rem,14vw,5.7rem)]
              font-medium
              uppercase
              leading-[0.78]
              tracking-[-0.065em]
              text-white
              sm:text-[clamp(4rem,10vw,7.4rem)]
              md:text-[clamp(4.6rem,9vw,8.2rem)]
              lg:max-w-[1100px]
              lg:text-[clamp(5.4rem,7.3vw,9.2rem)]
            "
            style={{
              fontFamily: luxuryFont.style.fontFamily,
            }}
          >
            An Unforgettable

            <span
              className="
                block
                font-normal
                italic
                text-white/62
              "
            >
              Night?
            </span>
          </h2>

          <span
            aria-hidden="true"
            className="
              absolute
              -bottom-5
              left-1/2
              h-px
              w-[40%]
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-white/48
              to-transparent
            "
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.52,
            delay: 0.16,
            ease: premiumEase,
          }}
          className="mt-12 sm:mt-14 md:mt-16"
        >
          <MagneticBookButton />
        </motion.div>
      </div>

      {[
        "left-5 top-6 border-l border-t sm:left-8 sm:top-8",
        "right-5 top-6 border-r border-t sm:right-8 sm:top-8",
        "bottom-6 left-5 border-b border-l sm:bottom-8 sm:left-8",
        "bottom-6 right-5 border-b border-r sm:bottom-8 sm:right-8",
      ].map((classes) => (
        <span
          key={classes}
          className={`
            pointer-events-none
            absolute
            h-5
            w-5
            border-white/20
            ${classes}
          `}
        />
      ))}
    </section>
  );
}