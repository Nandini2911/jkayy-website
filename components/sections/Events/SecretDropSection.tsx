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
      href="https://www.instagram.com/jkayyofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
      target="_blank"
      rel="noopener noreferrer"
      suppressHydrationWarning
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{
        x,
        y,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className={`
        ${cleanFont.className}
        group
        relative
        inline-flex
        min-h-12
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-white/25
        bg-white
        px-6
        py-3.5
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.20em]
        text-black
        shadow-[0_14px_40px_rgba(255,255,255,0.08)]
        transition-[box-shadow,transform]
        duration-300
        hover:shadow-[0_16px_48px_rgba(255,255,255,0.15)]
        sm:px-8
        sm:py-4
        sm:text-[10px]
        md:px-9
        md:text-[11px]
        !text-black
        !no-underline
      `}
    >
      <span
        aria-hidden="true"
        className="
          absolute
          inset-0
          origin-left
          scale-x-0
          bg-[#202020]
          transition-transform
          duration-300
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
          duration-300
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
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        />
      </span>
    </motion.a>
  );
}

export default function SecretDropSection() {
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
      id="secret-drop"
      className="
        relative
        z-30
        flex
        min-h-[720px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-black
        px-4
        py-14
        text-white
        sm:min-h-[760px]
        sm:px-6
        sm:py-16
        md:px-8
        lg:min-h-[100svh]
        lg:px-10
        lg:py-12
        xl:px-12
      "
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "900px",
      }}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_12%,rgba(0,0,0,0.32)_62%,rgba(0,0,0,0.94)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[36%]
          h-[42vw]
          w-[78vw]
          max-h-[430px]
          max-w-[980px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),rgba(170,170,170,0.025)_42%,transparent_72%)]
          opacity-80
        "
      />

      <motion.div
        aria-hidden="true"
        animate={
          animateDecor
            ? {
                x: ["1.5%", "-1.5%", "1.5%"],
              }
            : {
                x: "0%",
              }
        }
        transition={
          animateDecor
            ? {
                duration: 20,
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
          left-0
          top-1/2
          hidden
          w-full
          -translate-y-1/2
          select-none
          whitespace-nowrap
          text-center
          text-[17vw]
          font-medium
          uppercase
          leading-none
          tracking-[-0.08em]
          text-white/[0.014]
          xl:block
        "
        style={{
          fontFamily: luxuryFont.style.fontFamily,
        }}
      >
        Secret Drop
      </motion.div>

      <div
        className="
          relative
          w-full
          max-w-[1500px]
          rounded-[24px]
          border
          border-white/[0.09]
          bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015)_35%,rgba(255,255,255,0.05)_70%,rgba(255,255,255,0.02))]
          p-px
          sm:rounded-[30px]
          lg:rounded-[34px]
        "
      >
        <div
          className="
            relative
            flex
            min-h-[600px]
            items-center
            justify-center
            overflow-hidden
            rounded-[23px]
            border
            border-white/[0.05]
            bg-[#070707]
            px-5
            py-14
            shadow-[0_28px_90px_rgba(0,0,0,0.62)]
            sm:min-h-[640px]
            sm:rounded-[29px]
            sm:px-8
            sm:py-16
            md:px-10
            lg:min-h-[76svh]
            lg:rounded-[33px]
            lg:px-14
            xl:min-h-[80svh]
          "
          style={{
            contain: "layout paint style",
          }}
        >
          <motion.div
            aria-hidden="true"
            animate={
              animateDecor
                ? {
                    x: ["-7%", "7%", "-7%"],
                    opacity: [0.55, 0.9, 0.55],
                  }
                : {
                    x: "0%",
                    opacity: 0.55,
                  }
            }
            transition={
              animateDecor
                ? {
                    duration: 12,
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
              top-[36%]
              h-[240px]
              w-[70vw]
              max-w-[780px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-[50%]
              bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),rgba(160,160,160,0.02)_40%,transparent_72%)]
            "
          />

          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.7,
              ease: premiumEase,
            }}
            className="
              absolute
              left-6
              right-6
              top-6
              h-px
              origin-center
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              sm:left-10
              sm:right-10
              sm:top-8
            "
          />

          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: premiumEase,
            }}
            className="
              absolute
              bottom-6
              left-6
              right-6
              h-px
              origin-center
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              sm:bottom-8
              sm:left-10
              sm:right-10
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
                amount: 0.35,
              }}
              transition={{
                duration: 0.55,
                ease: premiumEase,
              }}
              className="
                mb-6
                flex
                items-center
                gap-3
                sm:mb-8
                sm:gap-4
              "
            >
              <span className="h-px w-7 bg-white/25 sm:w-12" />

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
                The Next Drop
              </span>

              <span className="h-px w-7 bg-white/25 sm:w-12" />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 32,
                scale: 0.97,
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
                duration: 0.68,
                delay: 0.05,
                ease: premiumEase,
              }}
              className="relative"
            >
              <h2
                className="
                  relative
                  max-w-[92vw]
                  text-[clamp(3.8rem,18vw,8.8rem)]
                  font-medium
                  uppercase
                  leading-[0.72]
                  tracking-[-0.07em]
                  text-white
                  sm:text-[clamp(4.8rem,12vw,9.4rem)]
                  md:text-[clamp(5.2rem,10vw,9.8rem)]
                  lg:max-w-none
                  lg:text-[clamp(6rem,8vw,10.2rem)]
                "
                style={{
                  fontFamily: luxuryFont.style.fontFamily,
                }}
              >
                Coming
                <span
                  className="
                    block
                    font-normal
                    italic
                    text-white/62
                  "
                >
                  Soon
                </span>
              </h2>

              <span
                aria-hidden="true"
                className="
                  absolute
                  -bottom-4
                  left-1/2
                  h-px
                  w-[52%]
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-white/50
                  to-transparent
                  sm:-bottom-5
                "
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
                duration: 0.58,
                delay: 0.14,
                ease: premiumEase,
              }}
              className="
                mt-10
                max-w-[560px]
                sm:mt-12
                md:mt-14
              "
            >
              <p
                className="
                  text-[12px]
                  leading-6
                  text-white/50
                  sm:text-[14px]
                  sm:leading-7
                  md:text-[15px]
                  md:leading-8
                "
                style={{
                  fontFamily: cleanFont.style.fontFamily,
                }}
              >
                Every unforgettable night begins with the right moment.
              </p>

              <p
                className="
                  mt-3
                  text-[12px]
                  leading-6
                  text-white/34
                  sm:mt-4
                  sm:text-[14px]
                  sm:leading-7
                  md:text-[15px]
                  md:leading-8
                "
                style={{
                  fontFamily: cleanFont.style.fontFamily,
                }}
              >
                The next destination is currently under wraps. Follow the
                journey and be the first to know when the lights come on.
              </p>
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
                amount: 0.25,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: premiumEase,
              }}
              className="mt-8 sm:mt-10"
            >
              <MagneticInstagramButton />
            </motion.div>
          </div>

          {[
            "left-5 top-5 border-l border-t sm:left-8 sm:top-8",
            "right-5 top-5 border-r border-t sm:right-8 sm:top-8",
            "bottom-5 left-5 border-b border-l sm:bottom-8 sm:left-8",
            "bottom-5 right-5 border-b border-r sm:bottom-8 sm:right-8",
          ].map((classes) => (
            <span
              key={classes}
              className={`
                pointer-events-none
                absolute
                h-4
                w-4
                border-white/22
                sm:h-5
                sm:w-5
                ${classes}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}