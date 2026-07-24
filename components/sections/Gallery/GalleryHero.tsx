"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ScanLine } from "lucide-react";
import {
  useEffect,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  bodyFont,
  displayFont,
  heroImages,
  premiumEase,
  type GalleryMediaItem,
} from "./galleryShared";

const marqueeImages = [
  ...heroImages.slice(0, 6),
  ...heroImages.slice(0, 6),
];

type HeroMediaProps = {
  item: GalleryMediaItem;
  sizes: string;
  className: string;
  priority?: boolean;
};

function HeroMedia({
  item,
  sizes,
  className,
  priority = false,
}: HeroMediaProps) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        poster={item.poster}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        aria-label={item.alt}
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

const floatingPoints = [
  { left: "8%", top: "20%", duration: 8, delay: 0.4 },
  { left: "19%", top: "76%", duration: 10, delay: 1.2 },
  { left: "37%", top: "14%", duration: 9, delay: 0.7 },
  { left: "62%", top: "82%", duration: 11, delay: 1.6 },
  { left: "81%", top: "18%", duration: 8, delay: 0.9 },
  { left: "93%", top: "72%", duration: 12, delay: 0.3 },
];

export default function GalleryHero() {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeImage, setActiveImage] = useState(0);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const smoothX = useSpring(pointerX, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const contentX = useTransform(smoothX, [0, 100], [-10, 10]);
  const contentY = useTransform(smoothY, [0, 100], [-6, 6]);

  const backgroundX = useTransform(smoothX, [0, 100], [15, -15]);
  const backgroundY = useTransform(smoothY, [0, 100], [9, -9]);

  const glow = useMotionTemplate`
    radial-gradient(
      min(720px, 84vw) circle at ${smoothX}% ${smoothY}%,
      rgba(255,255,255,0.11) 0%,
      rgba(255,255,255,0.045) 30%,
      transparent 68%
    )
  `;

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();

    pointerX.set(
      ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) *
        100,
    );

    pointerY.set(
      ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) *
        100,
    );
  };

  const resetPointer = () => {
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <section
      id="gallery-hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="group/hero relative isolate min-h-[120svh] w-full touch-pan-y overflow-hidden bg-[#050505] text-white"
    >
      {/* Base background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 18%,rgba(255,255,255,0.07),transparent 28%),radial-gradient(circle at 84% 80%,rgba(255,255,255,0.045),transparent 30%),linear-gradient(145deg,#030303 0%,#101010 48%,#020202 100%)",
        }}
      />

      {/* Faded center background crossfade */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] z-[1] overflow-hidden opacity-[0.14] blur-[1px] transition-opacity duration-[1200ms] group-hover/hero:opacity-[0.24]"
        style={{
          x: backgroundX,
          y: backgroundY,
          maskImage:
            "radial-gradient(ellipse at center,black 0%,black 34%,transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center,black 0%,black 34%,transparent 76%)",
        }}
      >
        {heroImages.map((image, index) => (
          <motion.div
            key={`background-${image.src}`}
            initial={false}
            animate={{
              opacity: activeImage === index ? 1 : 0,
              scale: activeImage === index ? 1.05 : 1.13,
            }}
            transition={{
              opacity: {
                duration: 1.5,
                ease: "easeInOut",
              },
              scale: {
                duration: 6,
                ease: "linear",
              },
            }}
            className="absolute inset-0"
          >
            <HeroMedia
              item={image}
              sizes="100vw"
              priority={index < 2}
              className="object-cover grayscale transition-[filter,opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero:grayscale-0"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Background dark cover */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-black/38 transition-colors duration-[1200ms] group-hover/hero:bg-black/24" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.16)_35%,rgba(0,0,0,0.16)_65%,rgba(0,0,0,0.82)_100%)] opacity-100 transition-opacity duration-[1200ms] group-hover/hero:opacity-75" />

      {/* Cursor spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background: glow,
        }}
      />

      {/* Fine grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.45) 1px,transparent 1px)",
          backgroundSize:
            "clamp(54px,5vw,86px) clamp(54px,5vw,86px)",
        }}
      />

      {/* Moving scan beam */}
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion
            ? undefined
            : {
                x: ["-130%", "230%"],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 2.4,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-y-0 z-[5] w-[28vw] min-w-[220px] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-xl"
      />

      {/* Left image marquee */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-0 z-[6] hidden h-full w-[clamp(145px,14vw,225px)] overflow-hidden border-x border-white/[0.08] bg-black/20 p-2 opacity-65 md:block"
        style={{
          maskImage:
            "linear-gradient(to bottom,transparent,black 9%,black 91%,transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom,transparent,black 9%,black 91%,transparent)",
        }}
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  y: ["0%", "-50%"],
                }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-col gap-2"
        >
          {marqueeImages.map((image, index) => (
            <div
              key={`left-${image.src}-${index}`}
              className="group relative aspect-[4/5] overflow-hidden border border-white/[0.12] bg-white/[0.04]"
            >
              <HeroMedia
                item={image}
                sizes="225px"
                className="object-cover grayscale opacity-75 transition-[filter,opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero:grayscale-0 group-hover/hero:opacity-100 group-hover:scale-105"
              />

              <span className="absolute inset-0 bg-black/18" />

              {image.type === "video" && (
                <span
                  className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/35 px-2 py-1 text-[6px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-md"
                  style={{
                    fontFamily: bodyFont.style.fontFamily,
                  }}
                >
                  Video
                </span>
              )}

              <span
                className="absolute bottom-2 left-2 text-[6px] uppercase tracking-[0.24em] text-white/58"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                {String((index % 6) + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right image marquee */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-0 z-[6] hidden h-full w-[clamp(145px,14vw,225px)] overflow-hidden border-x border-white/[0.08] bg-black/20 p-2 opacity-65 md:block"
        style={{
          maskImage:
            "linear-gradient(to bottom,transparent,black 9%,black 91%,transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom,transparent,black 9%,black 91%,transparent)",
        }}
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  y: ["-50%", "0%"],
                }
          }
          transition={{
            duration: 31,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-col gap-2"
        >
          {[...marqueeImages].reverse().map((image, index) => (
            <div
              key={`right-${image.src}-${index}`}
              className="group relative aspect-[4/5] overflow-hidden border border-white/[0.12] bg-white/[0.04]"
            >
              <HeroMedia
                item={image}
                sizes="225px"
                className="object-cover grayscale opacity-75 transition-[filter,opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero:grayscale-0 group-hover/hero:opacity-100 group-hover:scale-105"
              />

              <span className="absolute inset-0 bg-black/18" />

              {image.type === "video" && (
                <span
                  className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/35 px-2 py-1 text-[6px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-md"
                  style={{
                    fontFamily: bodyFont.style.fontFamily,
                  }}
                >
                  Video
                </span>
              )}

              <span
                className="absolute bottom-2 right-2 text-[6px] uppercase tracking-[0.24em] text-white/58"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                {String((index % 6) + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile horizontal marquees */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[12%] z-[6] overflow-hidden opacity-42 md:hidden"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max gap-2"
        >
          {marqueeImages.map((image, index) => (
            <div
              key={`mobile-top-${image.src}-${index}`}
              className="relative aspect-[4/5] w-[80px] overflow-hidden border border-white/10"
            >
              <HeroMedia
                item={image}
                sizes="80px"
                className="object-cover grayscale transition-[filter,opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero:grayscale-0"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[9%] z-[6] overflow-hidden opacity-32 md:hidden"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: ["-50%", "0%"],
                }
          }
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max gap-2"
        >
          {[...marqueeImages].reverse().map((image, index) => (
            <div
              key={`mobile-bottom-${image.src}-${index}`}
              className="relative aspect-[4/5] w-[70px] overflow-hidden border border-white/10"
            >
              <HeroMedia
                item={image}
                sizes="70px"
                className="object-cover grayscale transition-[filter,opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero:grayscale-0"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating points */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[7]"
      >
        {floatingPoints.map((point, index) => (
          <motion.span
            key={`point-${index}`}
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, -16, 0],
                    x: [0, 8, -4, 0],
                    opacity: [0.15, 0.8, 0.15],
                    scale: [0.8, 1.35, 0.8],
                  }
            }
            transition={{
              duration: point.duration,
              delay: point.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            style={{
              left: point.left,
              top: point.top,
            }}
          />
        ))}
      </div>

      {/* Main center content */}
      <div className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-[1920px] flex-col px-4 pb-8 pt-6 sm:px-7 sm:pb-10 md:px-[clamp(11rem,16vw,16rem)]">
        {/* Top bar */}
        <motion.div
          initial={{
            opacity: 0,
            y: -16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: premiumEase,
          }}
          className="flex items-center justify-between border-b border-white/[0.12] pb-5"
        >
          <div className="flex items-center gap-3">
            <motion.span
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: [0.35, 1, 0.35],
                      scale: [0.8, 1.25, 0.8],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-white"
            />

            <span
              className="text-[8px] uppercase tracking-[0.38em] text-white/48"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Visual Archive
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ScanLine className="h-3.5 w-3.5 text-white/40" />

            <span
              className="hidden text-[8px] uppercase tracking-[0.3em] text-white/34 sm:block"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Frames Beyond The Music
            </span>
          </div>
        </motion.div>

        {/* Centered editorial content */}
        <motion.div
          style={{
            x: contentX,
            y: contentY,
          }}
          className="flex flex-1 flex-col items-center justify-center py-24 text-center sm:py-28"
        >
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: premiumEase,
            }}
            className="mb-7 text-[8px] uppercase tracking-[0.46em] text-white/42"
            style={{
              fontFamily: bodyFont.style.fontFamily,
            }}
          >
            Captured Moments
          </motion.p>

          <div className="overflow-hidden pb-3">
            <motion.h1
              initial={{
                y: "112%",
                rotate: 2,
              }}
              animate={{
                y: "0%",
                rotate: 0,
              }}
              transition={{
                duration: 1.15,
                delay: 0.12,
                ease: premiumEase,
              }}
              className="text-[clamp(5.2rem,16vw,16rem)] font-medium uppercase leading-[0.66] tracking-[-0.09em]"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Gallery
            </motion.h1>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.35,
              ease: premiumEase,
            }}
            className="my-8 h-px w-[clamp(90px,14vw,220px)] origin-center bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />

          <motion.p
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.42,
              ease: premiumEase,
            }}
            className="max-w-xl text-[clamp(1.45rem,3.2vw,3rem)] font-normal italic leading-[1.03] tracking-[-0.04em] text-white/68"
            style={{
              fontFamily: displayFont.style.fontFamily,
            }}
          >
            Every frame tells a story beyond the music.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.54,
              ease: premiumEase,
            }}
          >
            <Link
              href="#gallery-collection"
              className="group relative mt-9 inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/[0.2] bg-white/[0.06] px-5 py-3 backdrop-blur-xl transition-all duration-500 hover:border-white hover:bg-white hover:text-black"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-[35%] w-[28%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />

              <span
                className="relative z-10 text-[8px] font-semibold uppercase tracking-[0.28em]"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Explore Gallery
              </span>

              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-current/20 transition-transform duration-500 group-hover:translate-y-1">
                <ArrowDown className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>

          {/* Active image indicator */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.7,
            }}
            className="mt-10 flex items-center gap-3"
          >
            <span
              className="text-[7px] uppercase tracking-[0.28em] text-white/30"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Frame
            </span>

            <span
              className="text-[8px] text-white/64"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              {String(activeImage + 1).padStart(2, "0")}
            </span>

            <span className="h-px w-10 bg-white/20" />

            <span
              className="text-[8px] text-white/28"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              {String(heroImages.length).padStart(2, "0")}
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.7,
            ease: premiumEase,
          }}
          className="flex items-center justify-between border-t border-white/[0.1] pt-5"
        >
          <span
            className="text-[7px] uppercase tracking-[0.3em] text-white/30"
            style={{
              fontFamily: bodyFont.style.fontFamily,
            }}
          >
            Performance · Backstage · Travel
          </span>

          <div className="flex items-center gap-2">
            {heroImages.slice(0, 6).map((image, index) => (
              <button
                key={`hero-dot-${image.src}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Show gallery frame ${index + 1}`}
                className="relative h-4 w-4"
              >
                <span
                  className={`absolute left-1/2 top-1/2 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                    activeImage === index
                      ? "w-4 bg-white"
                      : "w-1 bg-white/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}