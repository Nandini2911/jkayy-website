"use client";

import { motion, useReducedMotion } from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ArrowUpRight, RadioTower } from "lucide-react";

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

const socialPlatforms = [
  {
    name: "Spotify",
    code: "SP",
    description: "Stream the latest releases",
    href: "https://open.spotify.com/",
  },
  {
    name: "Apple Music",
    code: "AM",
    description: "Listen in lossless quality",
    href: "https://music.apple.com/",
  },
  {
    name: "YouTube Music",
    code: "YT",
    description: "Watch music and performances",
    href: "https://music.youtube.com/",
  },
  {
    name: "Amazon Music",
    code: "AZ",
    description: "Play across every device",
    href: "https://music.amazon.com/",
  },
  {
    name: "Instagram",
    code: "IG",
    description: "Follow releases and live moments",
    href: "https://instagram.com/",
  },
];

export default function StayConnectedSection() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="stay-connected"
      className="relative isolate w-full overflow-hidden bg-[#f4f4f1] text-black"
    >
      {/* White, grey and black background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 14%,rgba(0,0,0,0.07),transparent 24%),radial-gradient(circle at 88% 78%,rgba(0,0,0,0.055),transparent 28%),linear-gradient(135deg,#ffffff 0%,#f5f5f2 46%,#e9e9e6 100%)",
        }}
      />

      {/* Fine grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.22) 1px,transparent 1px)",
          backgroundSize:
            "clamp(52px,5vw,84px) clamp(52px,5vw,84px)",
        }}
      />

      {/* Rotating graphic rings */}
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
          duration: 42,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -left-[18vw] top-1/2 aspect-square w-[min(86vw,980px)] -translate-y-1/2 rounded-full border border-black/[0.07]"
      >
        <div className="absolute inset-[11%] rounded-full border border-black/[0.055]" />
        <div className="absolute inset-[23%] rounded-full border border-dashed border-black/[0.08]" />
        <div className="absolute inset-[37%] rounded-full border border-black/[0.06]" />

        <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-black/55" />
      </motion.div>

      {/* Oversized background text */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.025 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute bottom-[-4%] right-[-4%] whitespace-nowrap text-[clamp(9rem,25vw,28rem)] font-medium uppercase leading-none tracking-[-0.09em] text-black"
        style={{
          fontFamily: displayFont.style.fontFamily,
        }}
      >
        Follow
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32 xl:px-14 2xl:px-16">
        {/* Minimal top bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.8,
            ease: premiumEase,
          }}
          className="flex items-center justify-between border-b border-black/[0.12] pb-5"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="h-2 w-2 rounded-full bg-black" />

            <span
              className="text-[8px] font-medium uppercase tracking-[0.35em] text-black/52"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Stay Connected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <RadioTower className="h-3.5 w-3.5 text-black/45" />

            <span
              className="hidden text-[7px] uppercase tracking-[0.3em] text-black/38 sm:block"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Worldwide
            </span>
          </div>
        </motion.div>

        {/* Editorial split layout */}
        <div className="grid gap-14 pt-14 sm:pt-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:pt-20 xl:gap-24">
          {/* Left content */}
          <div className="relative lg:sticky lg:top-24 lg:self-start">
            <motion.p
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.85,
                ease: premiumEase,
              }}
              className="mb-6 text-[8px] font-medium uppercase tracking-[0.42em] text-black/42"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Follow the signal
            </motion.p>

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
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 1.05,
                ease: premiumEase,
              }}
              className="text-[clamp(4.5rem,11vw,11.5rem)] font-medium uppercase leading-[0.68] tracking-[-0.08em]"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Stay
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
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 1.05,
                delay: 0.08,
                ease: premiumEase,
              }}
              className="ml-[8%] mt-2 text-[clamp(4rem,10vw,10.5rem)] font-normal italic leading-[0.68] tracking-[-0.075em] text-black/46"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Connected
            </motion.h2>

            <motion.div
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.9,
                delay: 0.18,
                ease: premiumEase,
              }}
              className="mt-9 max-w-md sm:mt-11"
            >
              <div className="mb-6 h-px w-16 bg-black/25" />

              <p
                className="text-[13px] leading-6 text-black/56 sm:text-[15px] sm:leading-7"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Follow JKAYY across streaming, video and social platforms for
                future releases, previews and live performances.
              </p>
            </motion.div>
          </div>

          {/* Right platform rail */}
          <div className="border-t border-black/[0.13]">
            {socialPlatforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noreferrer"
                initial={{
                  opacity: 0,
                  x: reducedMotion
                    ? 0
                    : index % 2 === 0
                      ? 90
                      : -90,
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
                  duration: 0.9,
                  delay: index * 0.07,
                  ease: premiumEase,
                }}
                className="group relative block overflow-hidden border-b border-black/[0.13]"
              >
                {/* Hover fill */}
                <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

                {/* Moving shine */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-[30%] w-[24%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100"
                />

                <div className="relative z-10 grid min-h-[128px] grid-cols-[auto_1fr_auto] items-center gap-4 px-1 py-6 sm:min-h-[145px] sm:gap-6 sm:px-3 sm:py-7 lg:min-h-[155px] lg:gap-8 lg:px-5">
                  {/* Platform code */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.16] bg-black/[0.035] transition-all duration-500 group-hover:border-white/20 group-hover:bg-white group-hover:text-black sm:h-12 sm:w-12">
                    <span
                      className="text-[8px] font-semibold tracking-[0.16em]"
                      style={{
                        fontFamily: bodyFont.style.fontFamily,
                      }}
                    >
                      {platform.code}
                    </span>
                  </div>

                  {/* Name and description */}
                  <div className="min-w-0">
                    <h3
                      className="truncate text-[clamp(2rem,5vw,4.8rem)] font-medium leading-none tracking-[-0.055em] text-black transition-colors duration-500 group-hover:text-white"
                      style={{
                        fontFamily: displayFont.style.fontFamily,
                      }}
                    >
                      {platform.name}
                    </h3>

                    <p
                      className="mt-2 truncate text-[7px] uppercase tracking-[0.26em] text-black/40 transition-colors duration-500 group-hover:text-white/42 sm:text-[8px]"
                      style={{
                        fontFamily: bodyFont.style.fontFamily,
                      }}
                    >
                      {platform.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.14] text-black/52 transition-all duration-500 group-hover:rotate-45 group-hover:border-white/20 group-hover:text-white sm:h-11 sm:w-11">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.9,
            ease: premiumEase,
          }}
          className="mt-14 flex flex-col gap-4 border-t border-black/[0.12] pt-7 sm:mt-18 sm:flex-row sm:items-center sm:justify-between lg:mt-24"
        >
          <p
            className="text-[7px] uppercase tracking-[0.28em] text-black/38 sm:text-[8px]"
            style={{
              fontFamily: bodyFont.style.fontFamily,
            }}
          >
            Music · Releases · Performances
          </p>

          <p
            className="text-[7px] uppercase tracking-[0.28em] text-black/38 sm:text-[8px]"
            style={{
              fontFamily: bodyFont.style.fontFamily,
            }}
          >
            Follow JKAYY Worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}