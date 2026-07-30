"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {
  ArrowUpRight,
  Globe2,
  Headphones,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

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


/*
  Paste the direct "Echoes Of Night" song URL for each platform below.
  Every platform card in this section uses this single link map.
*/
const platformLinks: Record<string, string> = {
  Spotify: "https://open.spotify.com/track/5IVkBMMh6hgRvvEpwXEX1t?si=-hK74JkxTR682C5IPXje_A&utm_source=copy-link",
  "Apple Music": "https://music.apple.com/us/album/keep-them-close-single/6769612576",
  "YouTube Music": "https://music.youtube.com/watch?v=MnleUnPcF7g&si=jhdd4fQThmlwo61u",
  "Amazon Music": "https://music.amazon.in/tracks/B0H1QHMCXJ?marketplaceId=A21TJRUUN4KGV&musicTerritory=IN&ref=dm_sh_eNdDvKZa8EMwQQDqV2IVoedKI",
  JioSaavn: "",
  Deezer: "",
  iTunes: "",
  Instagram: "",
  TikTok: "",
  Pandora: "",
  TIDAL: "",
  iHeartRadio: "",
  Qobuz: "https://www.qobuz.com/us-en/album/keep-them-close-jkayy/xw9t48qgfg70x",
  Boomplay: "",
  Anghami: "",
  "NetEase Music": "https://music.youtube.com/watch?v=MnleUnPcF7g&si=64tgQImMzKp2vNpB",
  "Tencent Music": "",
  "Kuack Media": "",
  KKBOX: "",
  "7digital": "",
  Adaptr: "",
  FLO: "",
  MediaNet: "",
};


type Platform = {
  name: string;
  code: string;
  type: string;
  featured?: boolean;
};

const platforms: Platform[] = [
  {
    name: "Spotify",
    code: "SP",
    type: "Global Streaming",
    featured: true,
  },
  {
    name: "Apple Music",
    code: "AM",
    type: "Global Streaming",
    featured: true,
  },
  {
    name: "YouTube Music",
    code: "YT",
    type: "Music & Video",
    featured: true,
  },
  {
    name: "Amazon Music",
    code: "AZ",
    type: "Global Streaming",
    featured: true,
  },
  {
    name: "JioSaavn",
    code: "JS",
    type: "India Streaming",
    featured: true,
  },
  {
    name: "Deezer",
    code: "DZ",
    type: "Global Streaming",
    featured: true,
  },
  {
    name: "iTunes",
    code: "IT",
    type: "Digital Store",
  },
  {
    name: "Instagram",
    code: "IG",
    type: "Social Music",
  },
  {
    name: "TikTok",
    code: "TT",
    type: "Social Music",
  },
  {
    name: "Pandora",
    code: "PA",
    type: "Radio & Streaming",
  },
  {
    name: "TIDAL",
    code: "TD",
    type: "Hi-Fi Streaming",
  },
  {
    name: "iHeartRadio",
    code: "IH",
    type: "Radio & Streaming",
  },
  {
    name: "Qobuz",
    code: "QB",
    type: "Hi-Res Streaming",
  },
  {
    name: "Boomplay",
    code: "BP",
    type: "Global Streaming",
  },
  {
    name: "Anghami",
    code: "AN",
    type: "Regional Streaming",
  },
  {
    name: "NetEase Music",
    code: "NE",
    type: "Asian Streaming",
  },
  {
    name: "Tencent Music",
    code: "TM",
    type: "Asian Streaming",
  },
  {
    name: "Kuack Media",
    code: "KU",
    type: "Digital Distribution",
  },
  {
    name: "KKBOX",
    code: "KK",
    type: "Asian Streaming",
  },
  {
    name: "7digital",
    code: "7D",
    type: "Digital Store",
  },
  {
    name: "Adaptr",
    code: "AD",
    type: "Licensed Streaming",
  },
  {
    name: "FLO",
    code: "FL",
    type: "Korean Streaming",
  },
  {
    name: "MediaNet",
    code: "MN",
    type: "Digital Distribution",
  },
];

const featuredPlatforms = platforms.filter(
  (platform) => platform.featured,
);

const featuredRows = [
  featuredPlatforms.slice(0, 3),
  featuredPlatforms.slice(3, 6),
];

const backgroundWords = [
  "STREAM",
  "PLAY",
  "DISCOVER",
  "REPEAT",
  "WORLDWIDE",
  "LISTEN",
];

export default function ListenEverywhereSection() {
  const reducedMotion = useReducedMotion() ?? false;

  const [showAllPlatforms, setShowAllPlatforms] =
    useState(false);

  useEffect(() => {
    if (!showAllPlatforms) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAllPlatforms(false);
      }
    };

    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener(
        "keydown",
        closeWithEscape,
      );
    };
  }, [showAllPlatforms]);

  return (
    <>
      <section
        id="listen-everywhere"
        className="relative isolate w-full overflow-hidden bg-[#f7f7f5] text-[#0a0a0a]"
      >
        {/* Background base */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 16%,rgba(0,0,0,0.055),transparent 28%),radial-gradient(circle at 82% 78%,rgba(0,0,0,0.045),transparent 30%),linear-gradient(135deg,#ffffff 0%,#f4f4f1 46%,#ececea 72%,#ffffff 100%)",
          }}
        />

        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.24) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.24) 1px,transparent 1px)",
            backgroundSize:
              "clamp(48px,5vw,82px) clamp(48px,5vw,82px)",
          }}
        />

        {/* Center glow */}
        <motion.div
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.035, 0.075, 0.035],
                  scale: [0.9, 1.08, 0.9],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-1/2 top-[43%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.38] blur-[140px] sm:h-[620px] sm:w-[620px] lg:h-[760px] lg:w-[760px] lg:blur-[190px]"
        />

        {/* Top soft light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[40vh]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%,rgba(0,0,0,0.055),transparent 68%)",
          }}
        />

        {/* Background oversized words */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {backgroundWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 0.032,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      x:
                        index % 2 === 0
                          ? [0, 25, 0]
                          : [0, -25, 0],
                  }
              }
              transition={{
                opacity: {
                  duration: 1.2,
                },
                x: {
                  duration: 11 + index * 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute whitespace-nowrap text-[clamp(5rem,16vw,18rem)] font-medium uppercase leading-none tracking-[-0.08em] text-black"
              style={{
                top: `${2 + index * 18}%`,
                left: index % 2 === 0 ? "-8%" : "auto",
                right: index % 2 === 0 ? "auto" : "-8%",
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 pb-20 pt-16 sm:px-7 sm:pb-24 sm:pt-20 md:px-8 lg:px-10 lg:pb-32 lg:pt-24 xl:px-14 2xl:px-16">
          {/* Top label */}
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
            className="flex items-center justify-between border-b border-black/[0.12] pb-4 sm:pb-5"
          >
            <div className="flex items-center gap-3 sm:gap-5">
             

             
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <Globe2 className="h-3.5 w-3.5 text-black/45" />

              <span
                className="text-[7px] uppercase tracking-[0.3em] text-black/40 sm:text-[8px]"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Available Worldwide
              </span>
            </div>
          </motion.div>

          {/* Heading section */}
          <div className="grid gap-9 pb-12 pt-12 sm:gap-12 sm:pb-16 sm:pt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.55fr)] lg:items-end lg:gap-16 lg:pb-20 lg:pt-20 xl:gap-24">
            <div className="relative min-w-0">
              {/* Heading is no longer inside overflow-hidden */}
              <motion.h2
                initial={{
                  opacity: 0,
                  x: reducedMotion ? 0 : -90,
                  y: reducedMotion ? 0 : 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1.15,
                  ease: premiumEase,
                }}
                className="relative z-10 block pb-[0.08em] text-[clamp(4rem,15vw,12rem)] font-medium uppercase leading-[0.76] tracking-[-0.075em] text-black"
                style={{
                  fontFamily: displayFont.style.fontFamily,
                }}
              >
                Listen
              </motion.h2>

              <motion.h2
                initial={{
                  opacity: 0,
                  x: reducedMotion ? 0 : 100,
                  y: reducedMotion ? 0 : 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.08,
                  ease: premiumEase,
                }}
                className="relative z-10 ml-[4%] mt-1 block pb-[0.12em] text-[clamp(3.8rem,14vw,11rem)] font-normal italic leading-[0.76] tracking-[-0.075em] text-black/48 sm:ml-[7%] lg:ml-[10%]"
                style={{
                  fontFamily: displayFont.style.fontFamily,
                }}
              >
                Everywhere
              </motion.h2>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
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
                duration: 0.9,
                delay: 0.18,
                ease: premiumEase,
              }}
              className="max-w-md lg:justify-self-end lg:pb-3"
            >
              <div className="mb-5 h-px w-14 bg-black/30 sm:w-20" />

              <p
                className="max-w-[460px] text-[13px] leading-6 text-black/55 sm:text-[15px] sm:leading-7 lg:text-base lg:leading-8"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Echoes Of Night is available across the
                world&apos;s leading streaming, social and
                digital music platforms.
              </p>
            </motion.div>
          </div>

          {/* Featured platform rows */}
          <div className="relative space-y-3 sm:space-y-4">
            {featuredRows.map((row, rowIndex) => (
              <motion.div
                key={`platform-row-${rowIndex}`}
                initial={{
                  opacity: 0,
                  x: reducedMotion
                    ? 0
                    : rowIndex === 0
                      ? -180
                      : 180,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.16,
                  margin: "0px 0px -8% 0px",
                }}
                transition={{
                  duration: 1.2,
                  ease: premiumEase,
                }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
              >
                {row.map((platform, itemIndex) => {
                  return (
                    <motion.a
                      key={platform.name}
                      href={platformLinks[platform.name] || undefined}
                      target={platformLinks[platform.name] ? "_blank" : undefined}
                      rel={platformLinks[platform.name] ? "noopener noreferrer" : undefined}
                      aria-label={
                        platformLinks[platform.name]
                          ? `Listen to Echoes Of Night on ${platform.name}`
                          : `${platform.name} song link not added yet`
                      }
                      whileHover={
                        reducedMotion
                          ? undefined
                          : {
                              y: -7,
                            }
                      }
                      whileTap={{
                        scale: 0.985,
                      }}
                      className="group relative min-h-[165px] overflow-hidden border border-black/[0.12] bg-white/70 p-5 text-left shadow-[0_24px_70px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:min-h-[190px] sm:p-6 lg:min-h-[215px] xl:min-h-[230px] xl:p-7"
                    >
                      {/* White hover background */}
                      <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

                      {/* Soft hover glow */}
                      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-black/0 blur-3xl transition-colors duration-700 group-hover:bg-white/[0.1]" />

                      <div className="relative z-10 flex h-full min-h-[125px] flex-col justify-center sm:min-h-[145px] lg:min-h-[165px] xl:min-h-[175px]">
                        <div className="flex items-end justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.16] bg-black/[0.035] text-black transition-all duration-500 group-hover:border-white/20 group-hover:bg-white group-hover:text-black sm:h-12 sm:w-12 xl:h-14 xl:w-14">
                              <span
                                className="text-[8px] font-semibold tracking-[0.14em] sm:text-[9px]"
                                style={{
                                  fontFamily:
                                    bodyFont.style.fontFamily,
                                }}
                              >
                                {platform.code}
                              </span>
                            </div>

                            <div className="min-w-0">
                              <h3
                                className="truncate text-[clamp(1.65rem,3.2vw,2.65rem)] font-medium leading-none tracking-[-0.04em] text-black transition-colors duration-500 group-hover:text-white"
                                style={{
                                  fontFamily:
                                    displayFont.style.fontFamily,
                                }}
                              >
                                {platform.name}
                              </h3>

                              <p
                                className="mt-2 truncate text-[6px] uppercase tracking-[0.25em] text-black/40 transition-colors duration-500 group-hover:text-white/45 sm:text-[7px] sm:tracking-[0.3em]"
                                style={{
                                  fontFamily:
                                    bodyFont.style.fontFamily,
                                }}
                              >
                                {platform.type}
                              </p>
                            </div>
                          </div>

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.14] text-black/55 transition-all duration-500 group-hover:rotate-45 group-hover:border-white/20 group-hover:text-white sm:h-10 sm:w-10">
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>

                      {/* Animated bottom line */}
                      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-black transition-all duration-700 group-hover:w-full group-hover:bg-white" />
                    </motion.a>
                  );
                })}
              </motion.div>
            ))}
          </div>

          {/* Bottom information */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
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
              duration: 0.9,
              ease: premiumEase,
            }}
            className="mt-12 flex flex-col gap-7 border-t border-black/[0.12] pt-8 sm:mt-16 sm:gap-8 sm:pt-10 md:flex-row md:items-center md:justify-between lg:mt-20"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.14] bg-black/[0.035] sm:h-12 sm:w-12">
                <Headphones className="h-4 w-4 text-black/55" />
              </div>

              <div>
                <p
                  className="text-[12px] leading-5 text-black/72 sm:text-sm"
                  style={{
                    fontFamily: bodyFont.style.fontFamily,
                  }}
                >
                  Available on 20+ streaming services
                  worldwide.
                </p>

                <p
                  className="mt-1.5 text-[7px] uppercase tracking-[0.24em] text-black/35 sm:text-[8px] sm:tracking-[0.3em]"
                  style={{
                    fontFamily: bodyFont.style.fontFamily,
                  }}
                >
                  One release · Every major platform
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => setShowAllPlatforms(true)}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.025,
                    }
              }
              whileTap={{
                scale: 0.97,
              }}
              className="group inline-flex w-full items-center justify-between rounded-full border border-black bg-black px-4 py-2.5 text-white shadow-[0_15px_50px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 md:w-auto md:min-w-[235px]"
            >
              <span
                className="pl-1 text-[7px] font-semibold uppercase tracking-[0.22em] sm:text-[8px] sm:tracking-[0.25em]"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                View All Platforms
              </span>

              <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-90 sm:h-9 sm:w-9">
                <Plus className="h-4 w-4" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Full platform modal */}
      <AnimatePresence>
        {showAllPlatforms && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="All streaming platforms"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            onPointerDown={() =>
              setShowAllPlatforms(false)
            }
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/55 p-0 backdrop-blur-xl sm:items-center sm:p-4 lg:p-6"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 70,
                scale: 0.98,
              }}
              transition={{
                duration: 0.65,
                ease: premiumEase,
              }}
              onPointerDown={(event) =>
                event.stopPropagation()
              }
              className="relative flex max-h-[96svh] w-full max-w-[1500px] flex-col overflow-hidden rounded-t-[24px] border border-black/[0.12] bg-[#f7f7f5] text-black shadow-[0_45px_180px_rgba(0,0,0,0.36)] sm:max-h-[92svh] sm:rounded-[24px]"
            >
              {/* Modal header */}
              <div className="flex shrink-0 items-start justify-between border-b border-black/[0.12] px-4 py-5 sm:px-7 sm:py-6 lg:px-9 lg:py-7">
                <div className="min-w-0 pr-4">
                  <p
                    className="text-[7px] font-medium uppercase tracking-[0.28em] text-black/40 sm:text-[8px] sm:tracking-[0.38em]"
                    style={{
                      fontFamily: bodyFont.style.fontFamily,
                    }}
                  >
                    Global Distribution Network
                  </p>

                  <h3
                    className="mt-2 text-[clamp(2.2rem,8vw,5rem)] font-medium leading-[0.9] tracking-[-0.055em]"
                    style={{
                      fontFamily:
                        displayFont.style.fontFamily,
                    }}
                  >
                    All Platforms
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAllPlatforms(false)
                  }
                  aria-label="Close platforms modal"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.14] bg-black/[0.035] text-black transition-all duration-300 hover:rotate-90 hover:bg-black hover:text-white sm:h-11 sm:w-11"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable modal content */}
              <div className="overflow-y-auto overscroll-contain p-3 sm:p-5 lg:p-8">
                <div className="grid grid-cols-1 gap-px overflow-hidden border border-black/[0.1] bg-black/[0.1] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {platforms.map((platform, index) => (
                    <motion.a
                      key={platform.name}
                      href={platformLinks[platform.name] || undefined}
                      target={platformLinks[platform.name] ? "_blank" : undefined}
                      rel={platformLinks[platform.name] ? "noopener noreferrer" : undefined}
                      aria-label={
                        platformLinks[platform.name]
                          ? `Listen to Echoes Of Night on ${platform.name}`
                          : `${platform.name} song link not added yet`
                      }
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(
                          index * 0.025,
                          0.4,
                        ),
                        ease: premiumEase,
                      }}
                      className="group relative flex min-h-[108px] items-center justify-between gap-4 overflow-hidden bg-white p-4 transition-colors duration-500 hover:bg-black sm:min-h-[120px] sm:p-5 lg:min-h-[130px]"
                    >
                      <div className="relative z-10 flex min-w-0 items-center gap-3 sm:gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.14] bg-black/[0.035] text-black transition-all duration-500 group-hover:border-white/20 group-hover:bg-white group-hover:text-black sm:h-11 sm:w-11">
                          <span
                            className="text-[7px] font-semibold tracking-[0.15em] sm:text-[8px]"
                            style={{
                              fontFamily:
                                bodyFont.style.fontFamily,
                            }}
                          >
                            {platform.code}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <h4
                            className="truncate text-[1.35rem] font-medium leading-none tracking-[-0.03em] text-black transition-colors duration-500 group-hover:text-white sm:text-[1.55rem]"
                            style={{
                              fontFamily:
                                displayFont.style.fontFamily,
                            }}
                          >
                            {platform.name}
                          </h4>

                          <p
                            className="mt-2 truncate text-[6px] uppercase tracking-[0.21em] text-black/38 transition-colors duration-500 group-hover:text-white/45 sm:text-[7px] sm:tracking-[0.25em]"
                            style={{
                              fontFamily:
                                bodyFont.style.fontFamily,
                            }}
                          >
                            {platform.type}
                          </p>
                        </div>
                      </div>

                      <span
                        className="relative z-10 shrink-0 text-[7px] font-medium tracking-[0.2em] text-black/28 transition-colors duration-500 group-hover:text-white/35"
                        style={{
                          fontFamily:
                            bodyFont.style.fontFamily,
                        }}
                      >
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex shrink-0 flex-col gap-2 border-t border-black/[0.12] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-9">
                <p
                  className="text-[7px] uppercase tracking-[0.23em] text-black/38 sm:text-[8px] sm:tracking-[0.28em]"
                  style={{
                    fontFamily: bodyFont.style.fontFamily,
                  }}
                >
                  23 streaming and digital music services
                </p>

                <p
                  className="text-[7px] uppercase tracking-[0.23em] text-black/38 sm:text-[8px] sm:tracking-[0.28em]"
                  style={{
                    fontFamily: bodyFont.style.fontFamily,
                  }}
                >
                  Available worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}