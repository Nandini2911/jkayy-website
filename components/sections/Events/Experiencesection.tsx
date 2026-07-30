"use client";

import {
  motion,
  type MotionValue,
  useMotionValueEvent,
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

type VisualProps = {
  active: boolean;
  compact?: boolean;
};

type ExperienceCard = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  direction: "left" | "right";
  visual: ComponentType<VisualProps>;
  glow: string;
};

function useDesktopLayout() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setIsDesktop(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);

      return () => {
        media.removeEventListener("change", update);
      };
    }

    media.addListener(update);

    return () => {
      media.removeListener(update);
    };
  }, []);

  return isDesktop;
}

function SoundVisual({
  active,
}: VisualProps) {
  const bars = [
    30, 54, 82, 46, 92, 62, 76, 38,
  ];

  return (
    <div className="relative flex h-full min-h-[118px] items-center justify-center overflow-hidden sm:min-h-[135px]">
      <motion.div
        animate={
          active
            ? {
                scale: [0.82, 1.22],
                opacity: [0.34, 0],
              }
            : {
                scale: 1,
                opacity: 0.14,
              }
        }
        transition={
          active
            ? {
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }
            : {
                duration: 0.3,
              }
        }
        className="absolute h-20 w-20 rounded-full border border-white/20 sm:h-24 sm:w-24"
      />

      <div className="relative z-10 flex h-20 items-center gap-1.5 sm:h-24">
        {bars.map((height, index) => (
          <motion.span
            key={`sound-${index}`}
            animate={
              active
                ? {
                    scaleY: [
                      0.45,
                      1,
                      0.62,
                    ],
                    opacity: [
                      0.42,
                      0.95,
                      0.55,
                    ],
                  }
                : {
                    scaleY: 0.62,
                    opacity: 0.45,
                  }
            }
            transition={
              active
                ? {
                    duration:
                      0.8 +
                      (index % 4) * 0.12,
                    delay:
                      index * 0.035,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0.25,
                  }
            }
            style={{
              height: `${height}%`,
              transformOrigin: "center",
            }}
            className="
              block
              w-[3px]
              rounded-full
              bg-gradient-to-t
              from-white/75
              via-neutral-300
              to-neutral-500
            "
          />
        ))}
      </div>
    </div>
  );
}

function LightsVisual({
  active,
}: VisualProps) {
  return (
    <div className="relative h-full min-h-[118px] overflow-hidden sm:min-h-[135px]">
      <div
        className="
          absolute
          left-1/2
          top-5
          h-2
          w-12
          -translate-x-1/2
          rounded-full
          bg-white
          shadow-[0_0_16px_rgba(255,255,255,0.65)]
        "
      />

      <motion.span
        animate={
          active
            ? {
                rotate: [-24, 20, -24],
              }
            : {
                rotate: -12,
              }
        }
        transition={
          active
            ? {
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0.3,
              }
        }
        className="
          absolute
          left-1/2
          top-7
          h-[145px]
          w-px
          origin-top
          bg-gradient-to-b
          from-white
          via-neutral-300/70
          to-transparent
        "
      />

      <motion.span
        animate={
          active
            ? {
                rotate: [26, -18, 26],
              }
            : {
                rotate: 14,
              }
        }
        transition={
          active
            ? {
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0.3,
              }
        }
        className="
          absolute
          left-1/2
          top-7
          h-[145px]
          w-px
          origin-top
          bg-gradient-to-b
          from-neutral-100
          via-neutral-400/65
          to-transparent
        "
      />

      <div
        className="
          absolute
          bottom-4
          left-1/2
          h-10
          w-24
          -translate-x-1/2
          rounded-[50%]
          border
          border-white/15
          bg-white/[0.025]
        "
      />
    </div>
  );
}

function EnergyVisual({
  active,
}: VisualProps) {
  return (
    <div className="relative flex h-full min-h-[118px] items-center justify-center overflow-hidden sm:min-h-[135px]">
      {[96, 66].map(
        (size, index) => (
          <motion.div
            key={size}
            animate={
              active
                ? {
                    rotate:
                      index === 0
                        ? 360
                        : -360,
                  }
                : {
                    rotate: 0,
                  }
            }
            transition={
              active
                ? {
                    duration:
                      index === 0
                        ? 12
                        : 16,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : {
                    duration: 0.3,
                  }
            }
            style={{
              height: size,
              width: size,
            }}
            className="
              absolute
              rounded-full
              border
              border-white/20
            "
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
              "
            />
          </motion.div>
        ),
      )}

      <motion.div
        animate={
          active
            ? {
                scale: [
                  0.88,
                  1.08,
                  0.88,
                ],
                opacity: [
                  0.6,
                  1,
                  0.6,
                ],
              }
            : {
                scale: 1,
                opacity: 0.7,
              }
        }
        transition={
          active
            ? {
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0.3,
              }
        }
        className="
          relative
          z-10
          h-8
          w-8
          rounded-full
          border
          border-white/45
          bg-white/[0.08]
        "
      />
    </div>
  );
}

function AtmosphereVisual({
  active,
}: VisualProps) {
  return (
    <div className="relative flex h-full min-h-[118px] items-center justify-center overflow-hidden sm:min-h-[135px]">
      <motion.div
        animate={
          active
            ? {
                rotate: 360,
              }
            : {
                rotate: 0,
              }
        }
        transition={
          active
            ? {
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }
            : {
                duration: 0.3,
              }
        }
        className="
          relative
          h-24
          w-24
          rounded-full
          border
          border-white/15
          bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_38%,transparent_72%)]
        "
      >
        <div className="absolute inset-3 rounded-full border border-white/15" />

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
          "
        />
      </motion.div>

      <motion.span
        animate={
          active
            ? {
                scale: [
                  0.82,
                  1.28,
                ],
                opacity: [
                  0.28,
                  0,
                ],
              }
            : {
                scale: 1,
                opacity: 0.12,
              }
        }
        transition={
          active
            ? {
                duration: 2.6,
                repeat: Infinity,
                ease: "easeOut",
              }
            : {
                duration: 0.3,
              }
        }
        className="absolute h-24 w-24 rounded-full border border-white/18"
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
    items: [
      "Deep Techno",
      "Trance",
      "Live Mixing",
    ],
    direction: "left",
    visual: SoundVisual,
    glow:
      "radial-gradient(circle at 75% 20%, rgba(255,255,255,0.10), transparent 50%)",
  },
  {
    id: "lights",
    number: "02",
    title: "Lights",
    subtitle: "See the sound",
    description:
      "Lasers and visuals transform every drop into a spectacle.",
    items: [
      "Lasers",
      "Visuals",
      "Smoke",
    ],
    direction: "right",
    visual: LightsVisual,
    glow:
      "radial-gradient(circle at 65% 20%, rgba(255,255,255,0.08), transparent 50%)",
  },
  {
    id: "energy",
    number: "03",
    title: "Energy",
    subtitle: "Move as one",
    description:
      "Artist and audience become part of the same shared pulse.",
    items: [
      "Crowd",
      "Dance",
      "Connection",
    ],
    direction: "left",
    visual: EnergyVisual,
    glow:
      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.09), transparent 50%)",
  },
  {
    id: "atmosphere",
    number: "04",
    title: "Atmosphere",
    subtitle: "Remember the feeling",
    description:
      "An immersive moment that remains after the music ends.",
    items: [
      "Immersive",
      "Emotional",
      "Unforgettable",
    ],
    direction: "right",
    visual: AtmosphereVisual,
    glow:
      "radial-gradient(circle at 70% 25%, rgba(255,255,255,0.07), transparent 50%)",
  },
];

function CardContent({
  card,
  compact = false,
  active = false,
}: {
  card: ExperienceCard;
  compact?: boolean;
  active?: boolean;
}) {
  const Visual = card.visual;

  return (
    <motion.div
      whileHover={
        compact
          ? undefined
          : {
              y: -5,
              scale: 1.006,
            }
      }
      transition={{
        duration: 0.32,
        ease: premiumEase,
      }}
      className={`
        group
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-white/10
        bg-[#090909]
        shadow-[0_22px_70px_rgba(0,0,0,0.46)]
        sm:rounded-[28px]
        lg:rounded-[30px]

        ${
          compact
            ? "p-4 sm:p-5 md:p-6"
            : "p-5 xl:p-7"
        }
      `}
      style={{
        contain:
          "layout paint style",
      }}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-80
          transition-opacity
          duration-500
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

      <div
        className="
          pointer-events-none
          absolute
          -right-[20%]
          -top-[35%]
          h-[70%]
          w-[55%]
          rotate-12
          bg-gradient-to-br
          from-white/[0.05]
          to-transparent
          opacity-70
        "
      />

      <div
        className="
          relative
          z-10
          grid
          h-full
          grid-rows-[minmax(0,0.40fr)_minmax(0,0.60fr)]
          gap-3
          sm:gap-4
          md:grid-cols-[minmax(0,1fr)_40%]
          md:grid-rows-1
          md:gap-5
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
          <div className="flex items-center gap-2.5">
            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                bg-white
                transition-opacity
                duration-300

                ${
                  active
                    ? "opacity-100"
                    : "opacity-40"
                }
              `}
            />

            <span
              className="
                text-[7px]
                font-medium
                uppercase
                tracking-[0.30em]
                text-white/40
                sm:text-[8px]
                lg:text-[9px]
              "
              style={{
                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              Experience {card.number}
            </span>
          </div>

          <div className="mt-auto">
            <p
              className="
                mb-1.5
                text-[7px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-white/34
                sm:text-[8px]
                lg:text-[9px]
              "
              style={{
                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              {card.subtitle}
            </p>

            <h3
              className={`
                font-medium
                leading-[0.80]
                tracking-[-0.06em]
                text-white

                ${
                  compact
                    ? "text-[clamp(2.45rem,11vw,4.4rem)] sm:text-[clamp(3rem,7vw,4.8rem)]"
                    : "text-[clamp(3.6rem,5vw,6rem)]"
                }
              `}
              style={{
                fontFamily:
                  luxuryFont.style.fontFamily,
              }}
            >
              {card.title}
            </h3>

            <p
              className="
                mt-3
                max-w-[320px]
                text-[9px]
                leading-[1.7]
                text-white/38
                sm:text-[10px]
                lg:text-[11px]
              "
              style={{
                fontFamily:
                  cleanFont.style.fontFamily,
              }}
            >
              {card.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
              {card.items.map(
                (item) => (
                  <span
                    key={`${card.id}-${item}`}
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.02]
                      px-2.5
                      py-1.5
                      text-[6px]
                      font-medium
                      uppercase
                      tracking-[0.15em]
                      text-white/42
                      sm:px-3
                      sm:py-2
                      sm:text-[7px]
                    "
                    style={{
                      fontFamily:
                        cleanFont.style
                          .fontFamily,
                    }}
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div
          className="
            order-1
            relative
            min-h-0
            overflow-hidden
            rounded-[18px]
            border
            border-white/[0.06]
            bg-black/35
            md:order-2
            md:rounded-[22px]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.028]
              [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
              [background-size:24px_24px]
            "
          />

          <div className="relative z-10 h-full">
            <Visual
              active={active}
              compact={compact}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopScrollCard({
  card,
  index,
  progress,
  start,
  end,
  active,
}: {
  card: ExperienceCard;
  index: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
  active: boolean;
}) {
  const isLast =
    index === experienceCards.length - 1;

  const x = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.04,
      end,
    ],
    [
      card.direction === "left"
        ? -180
        : 180,
      0,
      0,
      card.direction === "left"
        ? 72
        : -72,
    ],
  );

  const y = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.04,
      end,
    ],
    [
      52,
      0,
      0,
      -34,
    ],
  );

  const scale = useTransform(
    progress,
    [
      start,
      start + 0.055,
      end - 0.04,
      end,
    ],
    [
      0.94,
      1,
      1,
      0.975,
    ],
  );

  const opacity = useTransform(
    progress,
    [
      start,
      start + 0.035,
      end - 0.035,
      end,
    ],
    [
      0,
      1,
      1,
      isLast ? 1 : 0,
    ],
  );

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-[27%]
        flex
        justify-center
        xl:top-[26%]
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
          h-[clamp(410px,57vh,560px)]
          max-w-[min(72vw,560px)]
          transform-gpu
        "
      >
        <CardContent
          card={card}
          active={active}
        />
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
  active,
}: {
  card: ExperienceCard;
  index: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
  active: boolean;
}) {
  const isLast =
    index === experienceCards.length - 1;

  const x = useTransform(
    progress,
    [
      start,
      start + 0.05,
      end - 0.04,
      end,
    ],
    [
      card.direction === "left"
        ? -58
        : 58,
      0,
      0,
      card.direction === "left"
        ? 24
        : -24,
    ],
  );

  const y = useTransform(
    progress,
    [
      start,
      start + 0.05,
      end - 0.04,
      end,
    ],
    [
      38,
      0,
      0,
      -24,
    ],
  );

  const scale = useTransform(
    progress,
    [
      start,
      start + 0.05,
      end - 0.04,
      end,
    ],
    [
      0.96,
      1,
      1,
      0.985,
    ],
  );

  const opacity = useTransform(
    progress,
    [
      start,
      start + 0.03,
      end - 0.03,
      end,
    ],
    [
      0,
      1,
      1,
      isLast ? 1 : 0,
    ],
  );

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-[31%]
        flex
        justify-center
        px-4
        min-[390px]:top-[30%]
        sm:top-[29%]
        sm:px-6
        md:top-[28%]
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
          w-[min(88vw,420px)]
          transform-gpu
          sm:w-[min(78vw,460px)]
          md:w-[min(68vw,500px)]
        "
      >
        <CardContent
          card={card}
          compact
          active={active}
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
    18, 36, 54, 32,
    70, 45, 82, 58,
    92, 66, 78, 48,
    64, 40, 52, 28,
  ];

  const opacity = useTransform(
    progress,
    [
      0.08,
      0.2,
      0.88,
      1,
    ],
    [
      0,
      0.13,
      0.13,
      0,
    ],
  );

  const y = useTransform(
    progress,
    [
      0.1,
      1,
    ],
    [
      18,
      -10,
    ],
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
      }}
      className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        flex
        h-[22vh]
        items-end
        justify-center
        gap-1
        overflow-hidden
      "
    >
      {bars.map(
        (height, index) => (
          <span
            key={`wave-${index}`}
            style={{
              height: `${height}%`,
            }}
            className="
              block
              w-[2px]
              rounded-t-full
              bg-gradient-to-t
              from-white/60
              via-neutral-400
              to-neutral-600
              sm:w-[3px]
            "
          />
        ),
      )}
    </motion.div>
  );
}

export default function TheExperience() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const isDesktop =
    useDesktopLayout();

  const [activeIndex, setActiveIndex] =
    useState(0);

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  /*
   * One global spring only.
   * All child motion values derive directly from this,
   * avoiding stacked springs and delayed/jittery scroll.
   */
  const progress = useSpring(
    scrollYProgress,
    {
      stiffness: 165,
      damping: 32,
      mass: 0.24,
      restDelta: 0.001,
      restSpeed: 0.001,
    },
  );

  useMotionValueEvent(
    progress,
    "change",
    (latest) => {
      let next = 0;

      if (latest >= 0.78) {
        next = 3;
      } else if (
        latest >= 0.60
      ) {
        next = 2;
      } else if (
        latest >= 0.42
      ) {
        next = 1;
      }

      setActiveIndex(
        (current) =>
          current === next
            ? current
            : next,
      );
    },
  );

  const panelScale = useTransform(
    progress,
    [
      0,
      0.08,
    ],
    [
      0.988,
      1,
    ],
  );

  const panelRadius =
    useTransform(
      progress,
      [
        0,
        0.1,
      ],
      [
        38,
        0,
      ],
    );

  const eyebrowOpacity =
    useTransform(
      progress,
      [
        0.02,
        0.08,
      ],
      [
        0,
        1,
      ],
    );

  const eyebrowY =
    useTransform(
      progress,
      [
        0.02,
        0.09,
      ],
      [
        14,
        0,
      ],
    );

  const headingOpacity =
    useTransform(
      progress,
      [
        0.045,
        0.12,
      ],
      [
        0,
        1,
      ],
    );

  const headingY =
    useTransform(
      progress,
      [
        0.045,
        0.13,
      ],
      [
        42,
        0,
      ],
    );

  const descriptionOpacity =
    useTransform(
      progress,
      [
        0.09,
        0.16,
      ],
      [
        0,
        1,
      ],
    );

  const headerScale =
    useTransform(
      progress,
      [
        0.18,
        0.3,
      ],
      [
        1,
        0.88,
      ],
    );

  const headerY =
    useTransform(
      progress,
      [
        0.18,
        0.3,
      ],
      [
        0,
        -20,
      ],
    );

  const giantTextX =
    useTransform(
      progress,
      [
        0,
        1,
      ],
      [
        "5%",
        "-10%",
      ],
    );

  const progressHeight =
    useTransform(
      progress,
      [
        0.18,
        0.92,
      ],
      [
        "0%",
        "100%",
      ],
    );

  const desktopRanges = [
    {
      start: 0.22,
      end: 0.43,
    },
    {
      start: 0.41,
      end: 0.62,
    },
    {
      start: 0.60,
      end: 0.81,
    },
    {
      start: 0.79,
      end: 0.98,
    },
  ];

  const mobileRanges = [
    {
      start: 0.21,
      end: 0.43,
    },
    {
      start: 0.41,
      end: 0.63,
    },
    {
      start: 0.61,
      end: 0.83,
    },
    {
      start: 0.81,
      end: 0.985,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="the-experience"
      className="
        relative
        z-30
        isolate
        mt-0
        h-[440svh]
        touch-pan-y
        bg-transparent
        text-white
        sm:h-[470svh]
        md:h-[490svh]
        lg:h-[480vh]
        xl:h-[500vh]
      "
    >
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                scale:
                  panelScale,
                borderTopLeftRadius:
                  panelRadius,
                borderTopRightRadius:
                  panelRadius,
              }
        }
        className="
          sticky
          top-0
          h-[100svh]
          min-h-[560px]
          origin-bottom
          transform-gpu
          overflow-hidden
          bg-[#050505]
          shadow-[0_-24px_70px_rgba(0,0,0,0.48)]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.075),transparent_32%),radial-gradient(circle_at_88%_28%,rgba(255,255,255,0.05),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_42%)]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]
            [background-size:72px_72px]
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
            text-[16vw]
            font-medium
            uppercase
            leading-none
            tracking-[-0.08em]
            text-white/[0.014]
            xl:block
          "
        >
          Experience Experience Experience
        </motion.div>

        <BackgroundWaveform
          progress={progress}
        />

        <div className="relative z-10 h-full w-full">
          <motion.div
            style={
              shouldReduceMotion
                ? undefined
                : {
                    y: headerY,
                    scale:
                      headerScale,
                  }
            }
            className="
              absolute
              inset-x-4
              top-[6.5%]
              origin-left
              transform-gpu
              sm:inset-x-6
              sm:top-[7%]
              md:inset-x-8
              md:top-[7.5%]
              lg:left-[4%]
              lg:right-auto
              lg:top-[5%]
              lg:w-[92%]
            "
          >
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity:
                        eyebrowOpacity,
                      y: eyebrowY,
                    }
              }
              className="
                mb-3
                flex
                items-center
                gap-3
                sm:mb-4
                lg:mb-5
              "
            >
              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.36em]
                  text-white/45
                  sm:text-[9px]
                "
                style={{
                  fontFamily:
                    cleanFont.style
                      .fontFamily,
                }}
              >
                03
              </span>

              <span
                className="
                  h-px
                  w-10
                  bg-gradient-to-r
                  from-white/65
                  via-neutral-300/40
                  to-neutral-600/10
                  sm:w-16
                  lg:w-20
                "
              />

              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.32em]
                  text-white/40
                  sm:text-[9px]
                "
                style={{
                  fontFamily:
                    cleanFont.style
                      .fontFamily,
                }}
              >
                The Experience
              </span>
            </motion.div>

            <div
              className="
                flex
                flex-col
                gap-3
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity:
                          headingOpacity,
                        y: headingY,
                      }
                }
                className="origin-left"
              >
                <p
                  className="
                    mb-1
                    text-[clamp(1.05rem,5vw,2.1rem)]
                    font-normal
                    italic
                    leading-none
                    text-white/34
                    sm:text-[clamp(1.2rem,3vw,2.3rem)]
                    lg:text-[clamp(1.35rem,2.2vw,2.6rem)]
                  "
                  style={{
                    fontFamily:
                      luxuryFont.style
                        .fontFamily,
                  }}
                >
                  Do not just hear it.
                </p>

                <h2
                  className="
                    max-w-[92vw]
                    text-[clamp(2.75rem,13vw,5rem)]
                    font-medium
                    uppercase
                    leading-[0.72]
                    tracking-[-0.07em]
                    text-white
                    sm:text-[clamp(3.5rem,9vw,6.7rem)]
                    md:text-[clamp(4rem,8vw,7.4rem)]
                    lg:max-w-none
                    lg:text-[clamp(4.2rem,6.2vw,8.2rem)]
                  "
                  style={{
                    fontFamily:
                      luxuryFont.style
                        .fontFamily,
                  }}
                >
                  What To

                  <span
                    className="
                      block
                      bg-gradient-to-r
                      from-white
                      via-neutral-200
                      to-neutral-500
                      bg-clip-text
                      font-normal
                      italic
                      text-transparent
                      sm:ml-[0.12em]
                      sm:inline
                    "
                  >
                    Expect
                  </span>
                </h2>
              </motion.div>

              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity:
                          descriptionOpacity,
                      }
                }
                className="
                  hidden
                  max-w-[350px]
                  pb-1
                  lg:block
                  xl:max-w-[390px]
                "
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-white
                      opacity-70
                    "
                  />

                  <span
                    className="
                      text-[7px]
                      font-medium
                      uppercase
                      tracking-[0.28em]
                      text-white/34
                    "
                    style={{
                      fontFamily:
                        cleanFont.style
                          .fontFamily,
                    }}
                  >
                    Scroll through the frequency
                  </span>
                </div>

                <p
                  className="
                    text-[11px]
                    leading-5
                    text-white/38
                    xl:text-[12px]
                    xl:leading-6
                  "
                  style={{
                    fontFamily:
                      cleanFont.style
                        .fontFamily,
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

          {isDesktop ? (
            <div>
              {experienceCards.map(
                (card, index) => (
                  <DesktopScrollCard
                    key={`desktop-${card.id}`}
                    card={card}
                    index={index}
                    progress={progress}
                    start={
                      desktopRanges[
                        index
                      ].start
                    }
                    end={
                      desktopRanges[
                        index
                      ].end
                    }
                    active={
                      Math.abs(
                        index -
                          activeIndex,
                      ) <= 1
                    }
                  />
                ),
              )}
            </div>
          ) : (
            <div>
              {experienceCards.map(
                (card, index) => (
                  <MobileScrollCard
                    key={`mobile-${card.id}`}
                    card={card}
                    index={index}
                    progress={progress}
                    start={
                      mobileRanges[
                        index
                      ].start
                    }
                    end={
                      mobileRanges[
                        index
                      ].end
                    }
                    active={
                      Math.abs(
                        index -
                          activeIndex,
                      ) <= 1
                    }
                  />
                ),
              )}
            </div>
          )}

          <div
            className="
              absolute
              bottom-[4%]
              right-4
              hidden
              h-[28%]
              w-px
              overflow-hidden
              bg-white/10
              sm:right-6
              lg:block
            "
          >
            <motion.div
              style={{
                height:
                  progressHeight,
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
              "
            />
          </div>

          <div
            className="
              absolute
              bottom-[2.5%]
              left-4
              right-4
              flex
              items-center
              justify-between
              gap-4
              border-t
              border-white/10
              pt-3
              sm:left-6
              sm:right-6
              md:left-8
              md:right-8
              lg:hidden
            "
          >
            <span
              className="
                hidden
                truncate
                text-[6px]
                font-medium
                uppercase
                tracking-[0.20em]
                text-white/24
                min-[360px]:block
                sm:text-[7px]
              "
              style={{
                fontFamily:
                  cleanFont.style
                    .fontFamily,
              }}
            >
              Sound · Lights · Energy · Atmosphere
            </span>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              {experienceCards.map(
                (card, index) => (
                  <span
                    key={`indicator-${card.id}`}
                    className={`
                      h-1
                      rounded-full
                      bg-white
                      transition-[width,opacity]
                      duration-300

                      ${
                        index ===
                        activeIndex
                          ? "w-4 opacity-80"
                          : "w-1 opacity-25"
                      }
                    `}
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