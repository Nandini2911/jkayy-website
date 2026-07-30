"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { useRef, type ReactNode } from "react";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ENTREPRENEUR_IMAGE = "/images/afterrmatch.png";
const AFTERMATCH_LOGO = "/images/afterrlogo.webp";
const AFTERMATCH_URL = "https://www.afterrmatch.com/";

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = {
  stiffness: 110,
  damping: 24,
  mass: 0.35,
} as const;

const pillars = [
  {
   
    title: "Community",
    label: "People First",
    description:
      "A social destination created for connection, movement and shared experiences.",
  },
  {
        title: "Lifestyle",
    label: "Beyond Sport",
    description:
      "Play, leisure, hospitality and culture brought together in one premium setting.",
  },
  {
  
    title: "Entertainment",
    label: "Always Alive",
    description:
      "A place to compete, celebrate and keep every shared moment in motion.",
  },
] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up";
  className?: string;
  amount?: number;
};

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  amount = 0.2,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const offset =
    direction === "left"
      ? { x: -58, y: 0 }
      : direction === "right"
        ? { x: 58, y: 0 }
        : { x: 0, y: 38 };

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.95,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type MaskedLineProps = {
  children: ReactNode;
  active: boolean;
  delay: number;
  className?: string;
};

function MaskedLine({
  children,
  active,
  delay,
  className = "",
}: MaskedLineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={reduceMotion ? false : { y: "115%", rotate: 2 }}
        animate={{
          y: active ? "0%" : "115%",
          rotate: active ? 0 : 2,
        }}
        transition={{
          duration: reduceMotion ? 0 : 1.05,
          delay: reduceMotion ? 0 : delay,
          ease: EASE,
        }}
        className="block origin-bottom-left"
      >
        {children}
      </motion.span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M7 17L17 7M9 7H17V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VisionStatement() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const labelX = useSpring(
    useTransform(scrollYProgress, [0, 0.45, 1], [-70, 0, 28]),
    SPRING,
  );
  const copyX = useSpring(
    useTransform(scrollYProgress, [0, 0.45, 1], [90, 0, -34]),
    SPRING,
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.82, 1],
    [0.18, 1, 1, 0.58],
  );
  const lineScale = useTransform(scrollYProgress, [0.08, 0.72], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-white/10 px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20"
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduceMotion ? 1 : lineScale }}
        className="absolute left-0 top-0 h-px w-full origin-left bg-white/55"
      />

      <div className="mx-auto grid w-full max-w-[1760px] gap-4 py-8 sm:py-10 lg:grid-cols-[0.4fr_1.6fr] lg:items-center lg:gap-10 lg:py-12">
        <motion.div
          style={{ x: reduceMotion ? 0 : labelX }}
          className="will-change-transform"
        >
          <p className="m-0 text-[8px] font-semibold uppercase tracking-[0.38em] text-white/36">
            The vision
          </p>
        </motion.div>

        <motion.p
          style={{
            x: reduceMotion ? 0 : copyX,
            opacity: reduceMotion ? 1 : copyOpacity,
          }}
          className="m-0 max-w-[1240px] will-change-transform text-[clamp(2.5rem,6.2vw,6.1rem)] font-medium leading-[0.9] tracking-[-0.055em] text-white"
        >
          <span style={{ fontFamily: luxuryFont.style.fontFamily }}>
            One place to play, connect and
            <em className="font-normal italic text-white/42"> celebrate.</em>
          </span>
        </motion.p>
      </div>
    </div>
  );
}

type PillarRowProps = {
  pillar: (typeof pillars)[number];
  index: number;
};

function PillarRow({ pillar, index }: PillarRowProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const fromLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 28%"],
  });

  const rowX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.46, 1],
      [fromLeft ? -76 : 76, 0, fromLeft ? 10 : -10],
    ),
    SPRING,
  );
  const rowOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0.86],
  );
  const numberX = useTransform(
    scrollYProgress,
    [0, 1],
    [fromLeft ? -18 : 18, fromLeft ? 16 : -16],
  );
  const underlineScale = useTransform(
    scrollYProgress,
    [0.1, 0.72],
    [0, 1],
  );

  return (
    <motion.article
      ref={ref}
      style={{
        x: reduceMotion ? 0 : rowX,
        opacity: reduceMotion ? 1 : rowOpacity,
      }}
      className="group relative grid gap-4 overflow-hidden border-t border-white/12 py-6 will-change-transform last:border-b sm:grid-cols-[58px_minmax(0,0.78fr)_minmax(220px,1fr)_48px] sm:items-center sm:gap-6 sm:py-7 lg:py-9"
    >
      <motion.span
        style={{ x: reduceMotion ? 0 : numberX }}
        className="text-[9px] font-semibold tracking-[0.3em] text-white/27"
      >
      
      </motion.span>

      <div>
        <p className="m-0 text-[7px] font-semibold uppercase tracking-[0.32em] text-white/30">
          {pillar.label}
        </p>

        <h4
          className="mb-0 mt-2 text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[0.86] tracking-[-0.06em]"
          style={{ fontFamily: luxuryFont.style.fontFamily }}
        >
          {pillar.title}
        </h4>
      </div>

      <p className="m-0 max-w-[500px] text-[12px] font-light leading-[1.8] text-white/42 sm:text-[13px]">
        {pillar.description}
      </p>

      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white/72 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
        <ArrowIcon />
      </span>

      <motion.span
        aria-hidden="true"
        style={{
          scaleX: reduceMotion ? 1 : underlineScale,
          transformOrigin: fromLeft ? "left center" : "right center",
        }}
        className="absolute bottom-0 left-0 h-px w-full bg-white/55"
      />
    </motion.article>
  );
}

function BrandCTA() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const logoX = useSpring(
    useTransform(scrollYProgress, [0, 0.42, 1], [-92, 0, 30]),
    SPRING,
  );
  const contentX = useSpring(
    useTransform(scrollYProgress, [0, 0.42, 1], [92, 0, -30]),
    SPRING,
  );
  const ghostX = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.78, 1],
    [0, 0.08, 0.08, 0],
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-t border-white/10 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-16 2xl:px-20"
    >
      <motion.p
        aria-hidden="true"
        style={{
          x: reduceMotion ? 0 : ghostX,
          opacity: reduceMotion ? 0.05 : ghostOpacity,
          fontFamily: luxuryFont.style.fontFamily,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(7rem,20vw,22rem)] font-semibold uppercase leading-none tracking-[-0.09em] text-white"
      >
        AfterrMatch
      </motion.p>

      <div className="relative z-10 mx-auto grid w-full max-w-[1760px] gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-end lg:gap-12">
        <motion.div
          style={{ x: reduceMotion ? 0 : logoX }}
          className="will-change-transform"
        >
          <div className="relative h-16 w-44 sm:h-20 sm:w-56">
            <Image
              src={AFTERMATCH_LOGO}
              alt="AfterrMatch logo"
              fill
              sizes="224px"
              className="object-contain object-left brightness-0 invert"
            />
          </div>

          <p className="mb-0 mt-5 max-w-[430px] text-[13px] font-light leading-[1.75] text-white/42 sm:text-[14px]">
            A premium social destination combining sport, lifestyle, community
            and entertainment.
          </p>
        </motion.div>

        <motion.div
          style={{ x: reduceMotion ? 0 : contentX }}
          className="will-change-transform lg:border-l lg:border-white/14 lg:pl-10 xl:pl-14"
        >
          <p className="m-0 text-[8px] font-semibold uppercase tracking-[0.38em] text-white/34">
            The destination
          </p>

          <h3
            className="mb-0 mt-4 max-w-[920px] text-[clamp(3.6rem,8vw,8.5rem)] font-medium leading-[0.82] tracking-[-0.07em]"
            style={{ fontFamily: luxuryFont.style.fontFamily }}
          >
            Built beyond
            <em className="block font-normal italic text-white/43">
              the court.
            </em>
          </h3>

       <Link
  href={AFTERMATCH_URL}
  aria-label="Visit AfterrMatch"
  className="
    group mt-6 inline-flex w-fit items-center gap-5
    rounded-full border border-white bg-white
    py-2.5 pl-5 pr-2.5 text-black
    transition-colors duration-500
    hover:bg-black hover:text-white
  "
>
  <span className="text-[7px] font-semibold uppercase tracking-[0.24em] sm:text-[8px]">
    Visit AfterrMatch
  </span>

  <span
    className="
      flex h-8 w-8 shrink-0 items-center justify-center
      rounded-full bg-black text-white
      transition-all duration-500
      group-hover:rotate-45
      group-hover:bg-white
      group-hover:text-black
    "
  >
    <ArrowIcon />
  </span>
</Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function EntrepreneurSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const entered = useInView(sectionRef, {
    once: true,
    amount: 0.06,
    margin: "0px 0px -5% 0px",
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const textX = useSpring(
    useTransform(heroProgress, [0, 0.3, 0.72, 1], [-92, 0, 0, -42]),
    SPRING,
  );
  const textY = useSpring(
    useTransform(heroProgress, [0, 0.38, 1], [48, 0, -66]),
    SPRING,
  );
  const imageX = useSpring(
    useTransform(heroProgress, [0, 0.3, 0.72, 1], [110, 0, 0, 48]),
    SPRING,
  );
  const imageY = useSpring(
    useTransform(heroProgress, [0, 0.45, 1], [70, 0, -86]),
    SPRING,
  );
  const imageScale = useTransform(
    heroProgress,
    [0, 0.35, 0.72, 1],
    [1.09, 1, 1, 0.965],
  );
  const imageRotate = useTransform(
    heroProgress,
    [0, 0.38, 1],
    [1.6, 0, -1.2],
  );
  const heroOpacity = useTransform(
    heroProgress,
    [0, 0.15, 0.82, 1],
    [0.3, 1, 1, 0.62],
  );
  const dividerScale = useTransform(heroProgress, [0.08, 0.58], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="entrepreneur"
      className="relative isolate w-full overflow-hidden bg-black text-white"
      style={{ fontFamily: cleanFont.style.fontFamily }}
    >
      {/* CINEMATIC HERO */}
      <div ref={heroRef} className="relative">
        <div className="relative min-h-svh px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10 xl:px-16 2xl:px-20">
         

          <div className="relative z-10 mx-auto w-full max-w-[1760px]">
            <Reveal delay={0.05}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <motion.span
                    aria-hidden="true"
                    style={{ scaleX: reduceMotion ? 1 : dividerScale }}
                    className="h-px w-9 origin-left bg-white/58 sm:w-12"
                  />
                  <span className="text-[8px] font-semibold uppercase tracking-[0.34em] text-white/48">
                    Entrepreneur
                  </span>
                </div>

               
              </div>
            </Reveal>

            <div className="grid items-center gap-7 py-8 sm:gap-9 sm:py-10 lg:min-h-[calc(100svh-5.5rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:py-4 xl:gap-8">
              {/* LEFT CONTENT */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -70,
                      }
                }
                animate={{
                  opacity: entered ? 1 : 0,
                  x: entered ? 0 : -70,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1.05,
                  delay: reduceMotion ? 0 : 0.12,
                  ease: EASE,
                }}
                className="relative z-20 order-2 lg:order-1"
              >
                <motion.div
                  style={{
                    x: reduceMotion ? 0 : textX,
                    y: reduceMotion ? 0 : textY,
                    opacity: reduceMotion ? 1 : heroOpacity,
                  }}
                  className="will-change-transform"
                >
               

                <h2
                  className="mb-0 mt-4 text-[clamp(4.2rem,15vw,7.2rem)] font-medium leading-[0.78] tracking-[-0.075em] sm:text-[clamp(5.8rem,13vw,9rem)] lg:text-[clamp(5.5rem,7.2vw,9.1rem)]"
                  style={{ fontFamily: luxuryFont.style.fontFamily }}
                >
                  <MaskedLine active={entered} delay={0.18}>
                    <span className="block">Building</span>
                  </MaskedLine>

                  <MaskedLine active={entered} delay={0.3}>
                    <span className="block translate-x-[6%] font-normal italic text-white/46">
                      Experiences
                    </span>
                  </MaskedLine>

                  <MaskedLine active={entered} delay={0.42}>
                    <span className="block">Beyond Music</span>
                  </MaskedLine>
                </h2>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: -30 }}
                  animate={{
                    opacity: entered ? 1 : 0,
                    x: entered ? 0 : -30,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.9,
                    delay: reduceMotion ? 0 : 0.6,
                    ease: EASE,
                  }}
                  className="mt-6 max-w-[610px] border-l border-white/24 pl-5 sm:mt-7 sm:pl-7"
                >
                  <p className="m-0 text-[14px] font-light leading-[1.8] tracking-[-0.015em] text-white/60 sm:text-[15px]">
                    As Co-Founder of AfterrMatch, Jitesh brings sport,
                    community and entertainment together in one premium
                    destination.
                  </p>

                  <p className="mb-0 mt-3 text-[14px] font-light leading-[1.75] tracking-[-0.015em] text-white/42 sm:text-[15px]">
                    His vision is simple: create a place where people can
                    connect, compete and celebrate together.
                  </p>
                </motion.div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  animate={{
                    opacity: entered ? 1 : 0,
                    y: entered ? 0 : 22,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.85,
                    delay: reduceMotion ? 0 : 0.72,
                    ease: EASE,
                  }}
                >
                 
                </motion.div>
                </motion.div>
              </motion.div>

              {/* RIGHT IMAGE */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 90,
                      }
                }
                animate={{
                  opacity: entered ? 1 : 0,
                  x: entered ? 0 : 90,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1.15,
                  delay: reduceMotion ? 0 : 0.08,
                  ease: EASE,
                }}
                className="order-1 lg:order-2"
              >
                <motion.div
                  style={{
                    x: reduceMotion ? 0 : imageX,
                    y: reduceMotion ? 0 : imageY,
                    scale: reduceMotion ? 1 : imageScale,
                    rotate: reduceMotion ? 0 : imageRotate,
                    opacity: reduceMotion ? 1 : heroOpacity,
                  }}
                  className="relative mx-auto h-[520px] w-full max-w-[760px] origin-center will-change-transform sm:h-[680px] lg:h-[min(82vh,900px)] lg:max-w-none"
                >
                <div className="absolute inset-y-[7%] left-[11%] right-[4%] border border-white/10" />
                <div className="absolute -left-2 top-[18%] h-[46%] w-px bg-white/28 sm:left-2" />
                <div className="absolute -right-1 bottom-[15%] h-px w-[26%] bg-white/26" />

                <motion.div
                  initial={reduceMotion ? false : { scale: 1.07 }}
                  animate={{ scale: entered ? 1 : 1.07 }}
                  transition={{
                    duration: reduceMotion ? 0 : 1.7,
                    delay: reduceMotion ? 0 : 0.16,
                    ease: EASE,
                  }}
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 82% 78% at 50% 50%, #000 48%, rgba(0,0,0,0.96) 61%, rgba(0,0,0,0.64) 74%, transparent 100%)",
                    maskImage:
                      "radial-gradient(ellipse 82% 78% at 50% 50%, #000 48%, rgba(0,0,0,0.96) 61%, rgba(0,0,0,0.64) 74%, transparent 100%)",
                  }}
                  className="absolute inset-0 overflow-hidden"
                >
                  <Image
                    src={ENTREPRENEUR_IMAGE}
                    alt="Jitesh Kapoor at AfterrMatch"
                    fill
                    priority={false}
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="object-contain object-center [filter:grayscale(1)_contrast(1.12)_brightness(0.8)]"
                  />
                </motion.div>

                {/* Smooth black fade on all four sides */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.72)_7%,transparent_22%,transparent_76%,rgba(0,0,0,0.76)_92%,#000_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#000_0%,rgba(0,0,0,0.72)_7%,transparent_22%,transparent_78%,rgba(0,0,0,0.7)_93%,#000_100%)]" />

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: 34 }}
                  animate={{
                    opacity: entered ? 1 : 0,
                    x: entered ? 0 : 34,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.9,
                    delay: reduceMotion ? 0 : 0.66,
                    ease: EASE,
                  }}
                  className="absolute bottom-7 left-5 z-10 flex items-center gap-3 sm:bottom-10 sm:left-8 lg:bottom-12 lg:left-10"
                >
                  
                 
                </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex">
             
              <span className="relative h-8 w-px overflow-hidden bg-white/14">
                <motion.span
                  animate={reduceMotion ? undefined : { y: ["-100%", "140%"] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 1.65,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="absolute inset-x-0 top-0 h-1/2 bg-white/70"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <VisionStatement />

      {/* SCROLLING PILLARS */}
      <div className="px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-16 2xl:px-20">
        <div className="mx-auto grid w-full max-w-[1760px] gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-12 xl:gap-16">
          <Reveal direction="left" amount={0.12}>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-white/45" />
                <p className="m-0 text-[8px] font-semibold uppercase tracking-[0.38em] text-white/34">
                  AfterrMatch
                </p>
              </div>

              <h3
                className="mb-0 mt-4 max-w-[550px] text-[clamp(3.6rem,7vw,7rem)] font-medium leading-[0.84] tracking-[-0.065em]"
                style={{ fontFamily: luxuryFont.style.fontFamily }}
              >
                Three ideas.
                <br />
                <em className="font-normal italic text-white/44">
                  One destination.
                </em>
              </h3>

              <p className="mb-0 mt-5 max-w-[440px] text-[13px] font-light leading-[1.8] text-white/42 sm:text-[14px]">
                Designed around the way people want to spend time—together,
                actively and without compromise.
              </p>

              
               
             
              
           
            </div>
          </Reveal>

          <div>
            {pillars.map((pillar, index) => (
              <PillarRow key={pillar.title} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </div>

      <BrandCTA />
    </section>
  );
}