"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";
import {
  type ComponentType,
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

type ExperienceCard = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  direction: "left" | "right";
  position: string;
  visual: ComponentType;
  glow: string;
};

function SoundVisual() {
  const bars = [
    22, 38, 62, 88, 52, 75,
    98, 58, 84, 48, 68, 30,
  ];

  return (
    <div className="relative flex h-full min-h-[145px] items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          scale: [0.8, 1.35],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute h-28 w-28 rounded-full border border-white/25"
      />

      <motion.div
        animate={{
          scale: [0.75, 1.15, 0.75],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-20 w-20 rounded-full border border-white/20"
      />

      <div className="relative z-10 flex h-24 items-center gap-1.5">
        {bars.map((height, index) => (
          <motion.span
            key={`sound-bar-${index}`}
            animate={{
              height: [
                `${Math.max(14, height - 30)}%`,
                `${height}%`,
                `${Math.max(18, height - 18)}%`,
              ],
              opacity: [0.35, 1, 0.45],
            }}
            transition={{
              duration: 0.9 + (index % 4) * 0.18,
              delay: index * 0.05,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              block
              w-[3px]
              rounded-full
              bg-gradient-to-t
              from-white/80
              via-neutral-300
              to-neutral-500
              shadow-[0_0_14px_rgba(255,255,255,0.55)]
            "
          />
        ))}
      </div>
    </div>
  );
}

function LightsVisual() {
  return (
    <div className="relative h-full min-h-[145px] overflow-hidden">
      <div
        className="
          absolute
          left-1/2
          top-6
          h-3
          w-14
          -translate-x-1/2
          rounded-full
          bg-white
          shadow-[0_0_25px_rgba(255,255,255,0.9)]
        "
      />

      <motion.span
        animate={{
          rotate: [-28, 24, -28],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-8
          h-[170px]
          w-px
          origin-top
          bg-gradient-to-b
          from-white
          via-neutral-300/80
          to-transparent
          shadow-[0_0_16px_rgba(255,255,255,0.8)]
        "
      />

      <motion.span
        animate={{
          rotate: [28, -20, 28],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-8
          h-[170px]
          w-px
          origin-top
          bg-gradient-to-b
          from-neutral-100
          via-neutral-400/80
          to-transparent
          shadow-[0_0_16px_rgba(255,255,255,0.65)]
        "
      />

      <motion.span
        animate={{
          rotate: [-42, 38, -42],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-8
          h-[150px]
          w-px
          origin-top
          bg-gradient-to-b
          from-neutral-200
          via-neutral-500/60
          to-transparent
        "
      />

      <motion.div
        animate={{
          scaleX: [0.75, 1.15, 0.75],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-4
          left-1/2
          h-14
          w-32
          -translate-x-1/2
          rounded-[50%]
          border
          border-white/20
          bg-white/[0.04]
        "
      />
    </div>
  );
}

function EnergyVisual() {
  return (
    <div className="relative flex h-full min-h-[145px] items-center justify-center overflow-hidden">
      {[112, 82, 54].map((size, index) => (
        <motion.div
          key={size}
          animate={{
            rotate: index % 2 === 0 ? 360 : -360,
            scale: [1, 1.04, 1],
          }}
          transition={{
            rotate: {
              duration: 10 + index * 4,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            height: size,
            width: size,
          }}
          className={`
            absolute
            rounded-full
            border
            ${
              index === 0
                ? "border-white/30"
                : index === 1
                  ? "border-white/20"
                  : "border-white/25"
            }
          `}
        >
          <span
            className="
              absolute
              left-1/2
              top-[-3px]
              h-1.5
              w-1.5
              -translate-x-1/2
              rounded-full
              bg-white
              shadow-[0_0_12px_white]
            "
          />
        </motion.div>
      ))}

      <motion.div
        animate={{
          scale: [0.8, 1.2, 0.8],
          boxShadow: [
            "0 0 15px rgba(255,255,255,0.18)",
            "0 0 40px rgba(255,255,255,0.6)",
            "0 0 15px rgba(255,255,255,0.18)",
          ],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          z-10
          h-9
          w-9
          rounded-full
          border
          border-white/50
          bg-white/10
          backdrop-blur-xl
        "
      />

      <div className="absolute inset-x-8 bottom-1 flex items-end justify-center gap-2">
        {[13, 25, 17, 34, 21, 29, 15].map(
          (height, index) => (
            <motion.span
              key={`energy-bar-${index}`}
              animate={{
                height: [height, height + 12, height],
              }}
              transition={{
                duration: 1,
                delay: index * 0.08,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ height }}
              className="w-1 rounded-full bg-white/30"
            />
          ),
        )}
      </div>
    </div>
  );
}

function AtmosphereVisual() {
  return (
    <div className="relative flex h-full min-h-[145px] items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          relative
          h-28
          w-28
          rounded-full
          border
          border-white/15
          bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),rgba(255,255,255,0.045)_38%,transparent_72%)]
          shadow-[0_0_55px_rgba(255,255,255,0.12)]
        "
      >
        <div className="absolute inset-3 rounded-full border border-white/20" />
        <div className="absolute inset-7 rounded-full border border-white/10" />

        <span
          className="
            absolute
            left-1/2
            top-[-4px]
            h-2
            w-2
            -translate-x-1/2
            rounded-full
            bg-white
            shadow-[0_0_14px_rgba(255,255,255,0.8)]
          "
        />

        <span
          className="
            absolute
            bottom-3
            right-1
            h-2
            w-2
            rounded-full
            bg-white
            shadow-[0_0_14px_rgba(255,255,255,0.65)]
          "
        />
      </motion.div>

      <motion.span
        animate={{
          scale: [0.75, 1.45],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute h-28 w-28 rounded-full border border-white/25"
      />

      <motion.span
        animate={{
          scale: [0.8, 1.15, 0.8],
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          h-3
          w-3
          rounded-full
          bg-white
          shadow-[0_0_22px_white]
        "
      />
    </div>
  );
}

const experienceCards: ExperienceCard[] = [
  {
    id: "sound",
    number: "01",
    title: "Sound",
    subtitle: "Feel every frequency",
    description:
      "A sonic journey built through rhythm, tension and release.",
    items: ["Deep Techno", "Trance", "Live Mixing"],
    direction: "left",
    position:
      "",
    visual: SoundVisual,
    glow:
      "radial-gradient(circle at 75% 20%, rgba(255,255,255,0.12), transparent 48%)",
  },
  {
    id: "lights",
    number: "02",
    title: "Lights",
    subtitle: "See the sound",
    description:
      "Lasers and visuals transform every drop into a spectacle.",
    items: ["Lasers", "Visuals", "Smoke"],
    direction: "right",
    position:
      "",
    visual: LightsVisual,
    glow:
      "radial-gradient(circle at 65% 20%, rgba(255,255,255,0.09), transparent 48%)",
  },
  {
    id: "energy",
    number: "03",
    title: "Energy",
    subtitle: "Move as one",
    description:
      "Artist and audience become part of the same shared pulse.",
    items: ["Crowd", "Dance", "Connection"],
    direction: "left",
    position:
      "",
    visual: EnergyVisual,
    glow:
      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.11), transparent 48%)",
  },
  {
    id: "atmosphere",
    number: "04",
    title: "Atmosphere",
    subtitle: "Remember the feeling",
    description:
      "An immersive moment that remains after the music ends.",
    items: ["Immersive", "Emotional", "Unforgettable"],
    direction: "right",
    position:
      "",
    visual: AtmosphereVisual,
    glow:
      "radial-gradient(circle at 70% 25%, rgba(255,255,255,0.08), transparent 48%)",
  },
];

function CardContent({
  card,
  compact = false,
}: {
  card: ExperienceCard;
  compact?: boolean;
}) {
  const Visual = card.visual;

  return (
    <motion.div
      whileHover={
        compact
          ? undefined
          : {
              y: -10,
              scale: 1.012,
              rotateZ:
                card.direction === "left"
                  ? -0.25
                  : 0.25,
            }
      }
      transition={{
        duration: 0.45,
        ease: premiumEase,
      }}
      className={`
        group
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-[#090909]/95
        shadow-[0_35px_120px_rgba(0,0,0,0.7)]
        backdrop-blur-2xl
        sm:rounded-[34px]

        ${
          compact
            ? "p-5 sm:p-6"
            : "p-6 xl:p-8"
        }
      `}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-75
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
        style={{
          background: card.glow,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-[1px]
          rounded-[inherit]
          border
          border-white/[0.035]
        "
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: ["-180%", "240%"],
          opacity: [0, 0.16, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          hidden
          w-[16%]
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          blur-2xl
          sm:block
        "
      />

      <div
        className="
          relative
          z-10
          grid
          h-full
          grid-rows-[minmax(0,0.42fr)_minmax(0,0.58fr)]
          gap-4
          sm:gap-5
          md:grid-cols-[minmax(0,1fr)_42%]
          md:grid-rows-1
          md:gap-6
        "
      >
        <div
          className="
            order-2
            flex
            min-h-0
            min-w-0
            flex-col
            md:order-1
          "
        >
          <div className="flex items-center gap-3">
            <motion.span
              animate={{
                scale: [0.75, 1.25, 0.75],
                opacity: [0.35, 1, 0.35],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-white
                shadow-[0_0_14px_white]
              "
            />

            <span
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.34em]
                text-white/40
                sm:text-[9px]
              "
              style={{
                fontFamily: cleanFont.style.fontFamily,
              }}
            >
              Experience {card.number}
            </span>
          </div>

          <div className="mt-auto">
            <p
              className="
                mb-2
                text-[8px]
                font-medium
                uppercase
                tracking-[0.28em]
                text-white/35
                sm:text-[9px]
              "
              style={{
                fontFamily: cleanFont.style.fontFamily,
              }}
            >
              {card.subtitle}
            </p>

            <h3
              className={`
                font-medium
                leading-[0.78]
                tracking-[-0.065em]
                text-white
                transition-transform
                duration-700
                group-hover:translate-x-1.5

                ${
                  compact
                    ? "text-[clamp(2.9rem,13vw,4.9rem)]"
                    : "text-[clamp(4rem,6vw,6.8rem)]"
                }
              `}
              style={{
                fontFamily: luxuryFont.style.fontFamily,
              }}
            >
              {card.title}
            </h3>

            <p
              className="
                mt-4
                max-w-[330px]
                text-[10px]
                leading-5
                text-white/38
                transition-colors
                duration-500
                group-hover:text-white/60
                sm:text-[11px]
                sm:leading-6
              "
              style={{
                fontFamily: cleanFont.style.fontFamily,
              }}
            >
              {card.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
              {card.items.map((item) => (
                <span
                  key={`${card.id}-${item}`}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-3
                    py-2
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-white/45
                    transition-all
                    duration-500
                    group-hover:border-white/25
                    group-hover:text-white/80
                    sm:text-[8px]
                  "
                  style={{
                    fontFamily: cleanFont.style.fontFamily,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="
            order-1
            relative
            min-h-0
            overflow-hidden
            rounded-[22px]
            border
            border-white/[0.07]
            bg-black/35
            transition-colors
            duration-700
            group-hover:border-white/18
            group-hover:bg-black/50
            md:order-2
            md:rounded-[24px]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)]
              bg-[size:22px_22px]
            "
          />

          <div className="relative z-10 h-full">
            <Visual />
          </div>
        </div>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-px
          w-0
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-white
          to-transparent
          shadow-[0_0_18px_rgba(255,255,255,0.9)]
          transition-all
          duration-1000
          group-hover:w-[88%]
        "
      />
    </motion.div>
  );
}

function DesktopScrollCard({
  card,
  index,
  progress,
  start,
  end,
}: {
  card: ExperienceCard;
  index: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const isLast =
    index === experienceCards.length - 1;

  const rawX = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.045,
      end,
    ],
    [
      card.direction === "left" ? -260 : 260,
      0,
      0,
      card.direction === "left" ? 120 : -120,
    ],
  );

  const rawY = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.045,
      end,
    ],
    [80, 0, 0, -55],
  );

  const rawScale = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.045,
      end,
    ],
    [0.88, 1, 1, 0.95],
  );

  const opacity = useTransform(
    progress,
    [
      start,
      start + 0.035,
      end - 0.035,
      end,
    ],
    [0, 1, 1, isLast ? 1 : 0],
  );

  const x = useSpring(rawX, {
    stiffness: 105,
    damping: 24,
    mass: 0.55,
  });

  const y = useSpring(rawY, {
    stiffness: 105,
    damping: 24,
    mass: 0.55,
  });

  const scale = useSpring(rawScale, {
    stiffness: 105,
    damping: 24,
    mass: 0.55,
  });

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-[29%]
        flex
        justify-center
      "
      style={{
        zIndex: 20 + index,
      }}
    >
      <motion.div
        style={{
          x,
          y,
          scale,
          opacity,
        }}
        className="
          pointer-events-auto
          aspect-square
          h-[64vh]
          max-h-[610px]
          min-h-[470px]
          transform-gpu
          will-change-transform
        "
      >
        <CardContent card={card} />
      </motion.div>
    </div>
  );
}

function MobileScrollCard({
  card,
  index,
  progress,
  start,
  end,
}: {
  card: ExperienceCard;
  index: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const isLast =
    index === experienceCards.length - 1;

  const rawX = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.04,
      end,
    ],
    [
      card.direction === "left" ? -130 : 130,
      0,
      0,
      card.direction === "left" ? 48 : -48,
    ],
  );

  const rawY = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.04,
      end,
    ],
    [70, 0, 0, -42],
  );

  const rawScale = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.04,
      end,
    ],
    [0.9, 1, 1, 0.95],
  );

  const opacity = useTransform(
    progress,
    [
      start,
      start + 0.035,
      end - 0.035,
      end,
    ],
    [0, 1, 1, isLast ? 1 : 0],
  );

  const x = useSpring(rawX, {
    stiffness: 115,
    damping: 25,
    mass: 0.5,
  });

  const y = useSpring(rawY, {
    stiffness: 115,
    damping: 25,
    mass: 0.5,
  });

  const scale = useSpring(rawScale, {
    stiffness: 115,
    damping: 25,
    mass: 0.5,
  });

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-[29%]
        flex
        justify-center
        px-4
        sm:top-[30%]
        sm:px-7
      "
      style={{
        zIndex: 20 + index,
      }}
    >
      <motion.div
        style={{
          x,
          y,
          scale,
          opacity,
        }}
        className="
          pointer-events-auto
          aspect-square
          w-full
          max-w-[440px]
          transform-gpu
          will-change-transform
        "
      >
        <CardContent
          card={card}
          compact
        />
      </motion.div>
    </div>
  );
}

function BackgroundWaveform({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const bars = [
    16, 28, 42, 23, 56, 35,
    70, 48, 84, 62, 96, 70,
    100, 78, 92, 66, 82, 54,
    72, 45, 58, 34, 42, 22,
  ];

  const opacity = useTransform(
    progress,
    [0.06, 0.2, 0.9, 1],
    [0, 0.22, 0.22, 0],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        flex
        h-[28vh]
        items-end
        justify-center
        gap-1
        overflow-hidden
      "
    >
      {bars.map((height, index) => (
        <motion.span
          key={`waveform-bar-${index}`}
          animate={{
            height: [
              `${height * 0.28}%`,
              `${height}%`,
              `${height * 0.45}%`,
            ],
          }}
          transition={{
            duration:
              1.2 + (index % 5) * 0.17,
            delay: index * 0.035,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            w-[3px]
            rounded-t-full
            bg-gradient-to-t
            from-white/80
            via-neutral-300
            to-neutral-500
          "
        />
      ))}
    </motion.div>
  );
}

export default function TheExperience() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(
    scrollYProgress,
    {
      stiffness: 75,
      damping: 24,
      mass: 0.65,
      restDelta: 0.0005,
    },
  );

  const panelY = useTransform(
    progress,
    [0, 0.07],
    [0, 0],
  );

  const panelScale = useTransform(
    progress,
    [0, 0.07],
    [0.965, 1],
  );

  const panelRadius = useTransform(
    progress,
    [0, 0.12],
    [56, 0],
  );

  const eyebrowOpacity = useTransform(
    progress,
    [0.03, 0.09],
    [0, 1],
  );

  const eyebrowY = useTransform(
    progress,
    [0.03, 0.1],
    [24, 0],
  );

  const headingOpacity = useTransform(
    progress,
    [0.06, 0.15],
    [0, 1],
  );

  const headingY = useTransform(
    progress,
    [0.06, 0.16],
    [80, 0],
  );

  const headingScale = useTransform(
    progress,
    [0.06, 0.16],
    [0.88, 1],
  );

  const descriptionOpacity = useTransform(
    progress,
    [0.12, 0.2],
    [0, 1],
  );

  const descriptionY = useTransform(
    progress,
    [0.12, 0.2],
    [30, 0],
  );

  const headerScale = useTransform(
    progress,
    [0.2, 0.32],
    [1, 0.83],
  );

  const headerY = useTransform(
    progress,
    [0.2, 0.32],
    [0, -28],
  );

  const giantTextX = useTransform(
    progress,
    [0, 1],
    ["8%", "-18%"],
  );

  const glowRotate = useTransform(
    progress,
    [0, 1],
    [0, 50],
  );

  const progressHeight = useTransform(
    progress,
    [0.18, 0.92],
    ["0%", "100%"],
  );

  const desktopRanges = [
    {
      start: 0.24,
      end: 0.43,
    },
    {
      start: 0.42,
      end: 0.61,
    },
    {
      start: 0.6,
      end: 0.79,
    },
    {
      start: 0.78,
      end: 0.97,
    },
  ];

  const mobileRanges = [
    {
      start: 0.24,
      end: 0.43,
    },
    {
      start: 0.42,
      end: 0.61,
    },
    {
      start: 0.6,
      end: 0.79,
    },
    {
      start: 0.78,
      end: 0.97,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="the-experience"
      className="
        relative
        z-30
        -mt-[100svh]
        h-[600svh]
        touch-pan-y
        bg-transparent
        text-white
        lg:h-[620vh]
      "
    >
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: panelY,
                scale: panelScale,
                borderTopLeftRadius: panelRadius,
                borderTopRightRadius: panelRadius,
              }
        }
        className="
          sticky
          top-0
          h-[100svh]
          origin-bottom
          transform-gpu
          overflow-hidden
          bg-[#050505]
          shadow-[0_-45px_130px_rgba(0,0,0,0.72)]
          will-change-transform
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.10),transparent_33%),radial-gradient(circle_at_88%_30%,rgba(255,255,255,0.07),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_43%)]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.04]
            [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        <motion.div
          style={{
            rotate: glowRotate,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[80vw]
            w-[80vw]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.07),transparent,rgba(255,255,255,0.035),transparent)]
            blur-[90px]
          "
        />

        <motion.div
          style={{
            x: giantTextX,
          }}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            top-[7%]
            hidden
            select-none
            whitespace-nowrap
            text-[17vw]
            font-medium
            uppercase
            leading-none
            tracking-[-0.08em]
            text-white/[0.018]
            lg:block
          "
        >
          Experience Experience Experience
        </motion.div>

        <BackgroundWaveform
          progress={progress}
        />

        <div className="relative z-10 h-full w-full">
          <motion.div
            style={{
              y: headerY,
              scale: headerScale,
            }}
            className="
              absolute
              inset-x-4
              top-[8%]
              origin-left
              transform-gpu
              sm:inset-x-7
              sm:top-[9%]
              lg:left-[4%]
              lg:right-auto
              lg:top-[6%]
              lg:w-[92%]
            "
          >
            <motion.div
              style={{
                opacity: eyebrowOpacity,
                y: eyebrowY,
              }}
              className="mb-5 flex items-center gap-4 lg:mb-6"
            >
              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.42em]
                  text-white/45
                  sm:text-[10px]
                "
                style={{
                  fontFamily:
                    cleanFont.style.fontFamily,
                }}
              >
                03
              </span>

              <span
                className="
                  h-px
                  w-14
                  bg-gradient-to-r
                  from-white/75
                  via-neutral-300/50
                  to-neutral-600/20
                  sm:w-24
                "
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.36em]
                  text-white/40
                  sm:text-[10px]
                "
                style={{
                  fontFamily:
                    cleanFont.style.fontFamily,
                }}
              >
                The Experience
              </span>
            </motion.div>

            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <motion.div
                style={{
                  opacity: headingOpacity,
                  y: headingY,
                  scale: headingScale,
                }}
                className="origin-left"
              >
                <p
                  className="
                    mb-2
                    text-[clamp(1.25rem,3vw,2.8rem)]
                    font-normal
                    italic
                    leading-none
                    text-white/35
                  "
                  style={{
                    fontFamily:
                      luxuryFont.style.fontFamily,
                  }}
                >
                  Do not just hear it.
                </p>

                <h2
                  className="
                    text-[clamp(3.5rem,10vw,9rem)]
                    font-medium
                    uppercase
                    leading-[0.68]
                    tracking-[-0.08em]
                    text-white
                  "
                  style={{
                    fontFamily:
                      luxuryFont.style.fontFamily,
                  }}
                >
                  What To

                  <span
                    className="
                      ml-[0.14em]
                      bg-gradient-to-r
                      from-white
                      via-neutral-200
                      to-neutral-500
                      bg-clip-text
                      font-normal
                      italic
                      text-transparent
                    "
                  >
                    Expect
                  </span>
                </h2>
              </motion.div>

              <motion.div
                style={{
                  opacity: descriptionOpacity,
                  y: descriptionY,
                }}
                className="
                  hidden
                  max-w-[380px]
                  pb-1
                  lg:block
                "
              >
                <div className="mb-4 flex items-center gap-3">
                  <motion.span
                    animate={{
                      scale: [0.7, 1.25, 0.7],
                      opacity: [0.35, 1, 0.35],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-white
                      shadow-[0_0_18px_rgba(255,255,255,0.75)]
                    "
                  />

                  <span
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.32em]
                      text-white/35
                    "
                    style={{
                      fontFamily:
                        cleanFont.style.fontFamily,
                    }}
                  >
                    Scroll through the frequency
                  </span>
                </div>

                <p
                  className="
                    text-[12px]
                    leading-6
                    text-white/40
                  "
                  style={{
                    fontFamily:
                      cleanFont.style.fontFamily,
                  }}
                >
                  Sound, lighting, movement and
                  human connection combine to
                  create one complete sensory
                  journey.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <div className="hidden lg:block">
            {experienceCards.map(
              (card, index) => (
                <DesktopScrollCard
                  key={`desktop-${card.id}`}
                  card={card}
                  index={index}
                  progress={progress}
                  start={
                    desktopRanges[index].start
                  }
                  end={
                    desktopRanges[index].end
                  }
                />
              ),
            )}
          </div>

          <div className="lg:hidden">
            {experienceCards.map(
              (card, index) => (
                <MobileScrollCard
                  key={`mobile-${card.id}`}
                  card={card}
                  index={index}
                  progress={progress}
                  start={
                    mobileRanges[index].start
                  }
                  end={
                    mobileRanges[index].end
                  }
                />
              ),
            )}
          </div>

          <div
            className="
              absolute
              bottom-[4%]
              right-4
              hidden
              h-[31%]
              w-px
              overflow-hidden
              bg-white/10
              sm:right-7
              lg:block
            "
          >
            <motion.div
              style={{
                height: progressHeight,
              }}
              className="
                absolute
                left-0
                top-0
                w-full
                bg-gradient-to-b
                from-white
                via-neutral-300
                to-neutral-600
                shadow-[0_0_12px_rgba(255,255,255,0.55)]
              "
            />
          </div>

          <div
            className="
              absolute
              bottom-[3%]
              left-4
              right-4
              flex
              items-center
              justify-between
              border-t
              border-white/10
              pt-4
              sm:left-7
              sm:right-7
              lg:hidden
            "
          >
            <span
              className="
                text-[7px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-white/25
              "
              style={{
                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              Sound · Lights · Energy · Atmosphere
            </span>

            <div className="flex items-center gap-2">
              {experienceCards.map(
                (card, index) => (
                  <motion.span
                    key={`indicator-${card.id}`}
                    animate={{
                      opacity: [0.2, 0.9, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 1.7,
                      delay: index * 0.18,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-1 w-1 rounded-full bg-white"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}