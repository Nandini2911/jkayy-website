"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ArrowUpRight, Disc3, Radio } from "lucide-react";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const premiumEase = [0.16, 1, 0.3, 1] as const;

const spectrumBars = Array.from({ length: 84 }, (_, index) => {
  const wave =
    Math.sin(index * 0.46) * 22 +
    Math.sin(index * 0.17) * 16 +
    34;

  return Math.max(12, Math.round(wave));
});

const particles = [
  { id: 1, left: "8%", top: "17%", size: 2, duration: 8, delay: 0.4 },
  { id: 2, left: "17%", top: "72%", size: 1, duration: 10, delay: 1.3 },
  { id: 3, left: "31%", top: "24%", size: 1, duration: 9, delay: 0.8 },
  { id: 4, left: "45%", top: "82%", size: 2, duration: 11, delay: 1.8 },
  { id: 5, left: "57%", top: "13%", size: 1, duration: 8, delay: 1.1 },
  { id: 6, left: "69%", top: "66%", size: 2, duration: 12, delay: 0.3 },
  { id: 7, left: "81%", top: "22%", size: 1, duration: 9, delay: 1.6 },
  { id: 8, left: "92%", top: "77%", size: 1, duration: 10, delay: 0.7 },
];

const SPOTIFY_URL = "https://open.spotify.com/";

export default function NextReleaseSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  const [sectionHovered, setSectionHovered] = useState(false);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 90,
    damping: 24,
    mass: 0.32,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 90,
    damping: 24,
    mass: 0.32,
  });

  const headingX = useTransform(smoothPointerX, [0, 100], [-14, 14]);
  const headingY = useTransform(smoothPointerY, [0, 100], [-8, 8]);

  const copyX = useTransform(smoothPointerX, [0, 100], [9, -9]);
  const copyY = useTransform(smoothPointerY, [0, 100], [6, -6]);

  const spectrumX = useTransform(smoothPointerX, [0, 100], [-22, 22]);
  const spectrumY = useTransform(smoothPointerY, [0, 100], [8, -8]);

  const backgroundTitleX = useTransform(
    smoothPointerX,
    [0, 100],
    [-35, 35],
  );

  const backgroundTitleY = useTransform(
    smoothPointerY,
    [0, 100],
    [-16, 16],
  );

  const spotlight = useMotionTemplate`
    radial-gradient(
      min(620px, 78vw) circle at ${smoothPointerX}% ${smoothPointerY}%,
      rgba(255,255,255,0.12) 0%,
      rgba(255,255,255,0.055) 27%,
      transparent 68%
    )
  `;

  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);

  const smoothButtonX = useSpring(buttonX, {
    stiffness: 220,
    damping: 18,
    mass: 0.25,
  });

  const smoothButtonY = useSpring(buttonY, {
    stiffness: 220,
    damping: 18,
    mass: 0.25,
  });

  const handleSectionPointerMove = (
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const nextX =
      ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 100;

    const nextY =
      ((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 100;

    pointerX.set(Math.min(100, Math.max(0, nextX)));
    pointerY.set(Math.min(100, Math.max(0, nextY)));
  };

  const resetSectionPointer = () => {
    pointerX.set(50);
    pointerY.set(50);
    setSectionHovered(false);
  };

  const handleButtonPointerMove = (
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const relativeX = event.clientX - bounds.left - bounds.width / 2;
    const relativeY = event.clientY - bounds.top - bounds.height / 2;

    buttonX.set(relativeX * 0.14);
    buttonY.set(relativeY * 0.2);
  };

  const resetButton = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  return (
    <section
      id="next-release"
      onPointerMove={handleSectionPointerMove}
      onPointerEnter={() => setSectionHovered(true)}
      onPointerLeave={resetSectionPointer}
      className="relative isolate min-h-[100svh] w-full touch-pan-y overflow-hidden bg-[#050505] text-white"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%,rgba(255,255,255,0.08),transparent 28%),radial-gradient(circle at 82% 72%,rgba(255,255,255,0.055),transparent 32%),linear-gradient(145deg,#050505 0%,#111111 50%,#020202 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: spotlight,
        }}
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.45) 1px,transparent 1px)",
          backgroundSize:
            "clamp(50px,5vw,80px) clamp(50px,5vw,80px)",
        }}
      />

      {/* Moving scan light */}
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion
            ? undefined
            : {
                x: ["-120%", "220%"],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-y-0 z-[3] w-[26vw] min-w-[210px] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.045] to-transparent blur-xl"
      />

      {/* Floating particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4]"
      >
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, -18, 0],
                    x: [0, 7, -4, 0],
                    opacity: [0.12, 0.52, 0.12],
                    scale: [0.8, 1.3, 0.8],
                  }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              boxShadow:
                particle.size > 1
                  ? "0 0 12px rgba(255,255,255,0.45)"
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Orbital rings */}
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 46,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -right-[20vw] top-1/2 z-[4] aspect-square w-[min(82vw,980px)] -translate-y-1/2 rounded-full border border-white/[0.065]"
      >
        <div className="absolute inset-[10%] rounded-full border border-dashed border-white/[0.08]" />
        <div className="absolute inset-[24%] rounded-full border border-white/[0.055]" />
        <div className="absolute inset-[38%] rounded-full border border-dashed border-white/[0.07]" />

        <motion.span
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.7, 1],
                  opacity: [0.45, 1, 0.45],
                }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]"
        />
      </motion.div>

      {/* Animated spectrum */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[10%] z-[5] flex h-[42vh] min-h-[260px] items-end justify-center gap-[2px] overflow-hidden px-2 opacity-40 sm:gap-[3px] lg:bottom-[6%] lg:h-[52vh]"
        style={{
          x: spectrumX,
          y: spectrumY,
          maskImage:
            "linear-gradient(to right,transparent,black 12%,black 88%,transparent)",
          WebkitMaskImage:
            "linear-gradient(to right,transparent,black 12%,black 88%,transparent)",
        }}
      >
        {spectrumBars.map((height, index) => {
          const hoverBoost = sectionHovered ? 1.16 : 1;

          return (
            <motion.span
              key={`spectrum-${index}`}
              animate={
                reducedMotion
                  ? {
                      height: `${height}%`,
                    }
                  : {
                      height: [
                        `${Math.max(8, height * 0.3)}%`,
                        `${Math.min(96, height * hoverBoost)}%`,
                        `${Math.max(10, height * 0.52)}%`,
                      ],
                      opacity: sectionHovered
                        ? [0.22, 0.9, 0.3]
                        : [0.16, 0.65, 0.24],
                    }
              }
              transition={{
                duration:
                  (sectionHovered ? 0.95 : 1.55) +
                  (index % 9) * 0.1,
                delay: index * 0.014,
                repeat: reducedMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scaleY: 1.15,
                      opacity: 1,
                    }
              }
              className="origin-bottom w-[3px] min-w-[2px] rounded-t-full bg-gradient-to-t from-white/5 via-white/50 to-white sm:w-[5px] lg:w-[7px]"
            />
          );
        })}
      </motion.div>

      {/* Large moving background title */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.027 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.035, 1],
              }
        }
        className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(8rem,22vw,24rem)] font-medium uppercase leading-none tracking-[-0.08em] text-white"
        style={{
          x: backgroundTitleX,
          y: backgroundTitleY,
          fontFamily: displayFont.style.fontFamily,
        }}
      >
        Next
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1920px] flex-col px-4 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24 xl:px-14 2xl:px-16">
        {/* Header */}
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
            ease: premiumEase,
          }}
          className="group flex items-center justify-between border-b border-white/[0.1] pb-5"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <motion.span
              animate={
                reducedMotion
                  ? undefined
                  : {
                      width: sectionHovered ? 48 : 28,
                      opacity: sectionHovered ? 0.65 : 0.28,
                    }
              }
              transition={{
                duration: 0.6,
                ease: premiumEase,
              }}
              className="h-px bg-white"
            />

            <span
              className="text-[7px] uppercase tracking-[0.32em] text-white/40 transition-colors duration-500 group-hover:text-white/70 sm:text-[8px]"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Next Release
            </span>
          </div>

          <motion.div
            whileHover={
              reducedMotion
                ? undefined
                : {
                    x: -4,
                  }
            }
            className="hidden items-center gap-3 sm:flex"
          >
            <motion.div
              animate={
                reducedMotion
                  ? undefined
                  : {
                      rotate: sectionHovered ? 14 : 0,
                      scale: sectionHovered ? 1.08 : 1,
                    }
              }
              transition={{
                duration: 0.5,
                ease: premiumEase,
              }}
            >
              <Radio className="h-3.5 w-3.5 text-white/42" />
            </motion.div>

            <span
              className="text-[7px] uppercase tracking-[0.3em] text-white/35"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Work In Progress
            </span>
          </motion.div>
        </motion.div>

        {/* Main content */}
        <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-20">
          {/* Left heading */}
          <motion.div
            className="group"
            style={{
              x: headingX,
              y: headingY,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                x: -45,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.9,
                ease: premiumEase,
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.025,
                      x: 7,
                    }
              }
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/[0.14] bg-white/[0.04] px-4 py-2 backdrop-blur-md transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.08]"
            >
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: sectionHovered ? 3.6 : 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Disc3 className="h-3.5 w-3.5 text-white/55" />
              </motion.div>

              <span
                className="text-[7px] font-medium uppercase tracking-[0.28em] text-white/52 sm:text-[8px]"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Currently In Production
              </span>

              <motion.span
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: [0.25, 1, 0.25],
                        scale: [0.8, 1.25, 0.8],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.65)]"
              />
            </motion.div>

            <motion.div
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      x: 10,
                    }
              }
              transition={{
                duration: 0.6,
                ease: premiumEase,
              }}
            >
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 55,
                  filter: "blur(12px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 1.1,
                  ease: premiumEase,
                }}
                className="text-[clamp(4.4rem,12vw,12rem)] font-medium uppercase leading-[0.68] tracking-[-0.075em]"
                style={{
                  fontFamily: displayFont.style.fontFamily,
                }}
              >
                Next
              </motion.h2>

              <motion.h2
                initial={{
                  opacity: 0,
                  x: reducedMotion ? 0 : 80,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 1.05,
                  delay: 0.1,
                  ease: premiumEase,
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        x: 12,
                        color: "rgba(255,255,255,0.72)",
                      }
                }
                className="ml-[8%] mt-2 text-[clamp(4rem,11vw,11rem)] font-normal italic leading-[0.68] tracking-[-0.07em] text-white/52"
                style={{
                  fontFamily: displayFont.style.fontFamily,
                }}
              >
                Release
              </motion.h2>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 45,
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
              duration: 0.95,
              delay: 0.15,
              ease: premiumEase,
            }}
            className="group max-w-xl lg:justify-self-end"
            style={{
              x: copyX,
              y: copyY,
            }}
          >
            <motion.div
              animate={
                reducedMotion
                  ? undefined
                  : {
                      width: sectionHovered ? 112 : 80,
                    }
              }
              transition={{
                duration: 0.65,
                ease: premiumEase,
              }}
              className="mb-7 h-px bg-white/25"
            />

            <motion.p
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      x: 7,
                    }
              }
              transition={{
                duration: 0.55,
                ease: premiumEase,
              }}
              className="text-[clamp(1.55rem,3.5vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.035em] text-white"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              New music is already taking shape.
            </motion.p>

            <motion.p
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      x: 7,
                      color: "rgba(255,255,255,0.68)",
                    }
              }
              transition={{
                duration: 0.55,
                ease: premiumEase,
              }}
              className="mt-8 text-[14px] leading-7 text-white/48 sm:text-[16px] sm:leading-8"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Stay connected for future releases, exclusive previews and live
              performances.
            </motion.p>

            {/* Magnetic Spotify button */}
            <motion.a
              ref={buttonRef}
              href={SPOTIFY_URL}
              target="_blank"
              rel="noreferrer"
              onPointerMove={handleButtonPointerMove}
              onPointerLeave={resetButton}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.035,
                    }
              }
              whileTap={{
                scale: 0.96,
              }}
              style={{
                x: smoothButtonX,
                y: smoothButtonY,
              }}
              className="group/button relative mt-10 inline-flex w-full items-center justify-between overflow-hidden rounded-full border border-white bg-white px-5 py-3 text-black shadow-[0_16px_60px_rgba(255,255,255,0.09)] sm:w-auto sm:min-w-[245px]"
            >
              <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#1b1b1b] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/button:scale-x-100" />

              <span className="pointer-events-none absolute inset-y-0 -left-[35%] w-[28%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover/button:left-[115%] group-hover/button:opacity-100" />

              <span
                className="relative z-10 pl-1 text-[8px] font-semibold uppercase tracking-[0.25em] transition-colors duration-500 group-hover/button:text-white"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Follow on Spotify
              </span>

              <motion.span
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: 45,
                        scale: 1.08,
                      }
                }
                className="relative z-10 ml-5 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-colors duration-500 group-hover/button:bg-white group-hover/button:text-black"
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom status */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="group flex items-center justify-between border-t border-white/[0.1] pt-5"
        >
          <motion.span
            whileHover={
              reducedMotion
                ? undefined
                : {
                    x: 5,
                    color: "rgba(255,255,255,0.6)",
                  }
            }
            className="text-[7px] uppercase tracking-[0.3em] text-white/30"
            style={{
              fontFamily: bodyFont.style.fontFamily,
            }}
          >
            New Frequencies Loading
          </motion.span>

          <motion.div
            whileHover={
              reducedMotion
                ? undefined
                : {
                    x: -5,
                  }
            }
            className="flex items-center gap-3"
          >
            <motion.span
              animate={
                reducedMotion
                  ? undefined
                  : {
                      scale: [0.8, 1.35, 0.8],
                      opacity: [0.4, 1, 0.4],
                    }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-white/75 shadow-[0_0_14px_rgba(255,255,255,0.5)]"
            />

            <span
              className="text-[7px] uppercase tracking-[0.3em] text-white/30"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              2026
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom animated progress line */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-px w-full bg-white/[0.06]">
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  scaleX: [0, 1, 0],
                  transformOrigin: ["left", "left", "right"],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_16px_rgba(255,255,255,0.45)]"
        />
      </div>
    </section>
  );
}
