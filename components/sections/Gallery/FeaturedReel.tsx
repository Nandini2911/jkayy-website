"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  bodyFont,
  displayFont,
  premiumEase,
  REEL_URL,
} from "./galleryShared";

export default function FeaturedReel() {
  const reducedMotion = useReducedMotion() ?? false;
  const [reelOpen, setReelOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!reelOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setReelOpen(false);
        setIsPlaying(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [reelOpen]);

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <section
        id="featured-reel"
        className="relative isolate overflow-hidden bg-[#0a0a0a] text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 22% 20%,rgba(255,255,255,0.08),transparent 26%),radial-gradient(circle at 82% 76%,rgba(255,255,255,0.05),transparent 28%),linear-gradient(145deg,#060606 0%,#141414 50%,#030303 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
            backgroundSize:
              "clamp(52px,5vw,82px) clamp(52px,5vw,82px)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32 xl:px-14 2xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.45,
            }}
            transition={{
              duration: 0.8,
              ease: premiumEase,
            }}
            className="flex items-center justify-between border-b border-white/10 pb-5"
          >
            <span
              className="text-[8px] uppercase tracking-[0.36em] text-white/48"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              03 · Featured Reel
            </span>

            <span
              className="hidden text-[8px] uppercase tracking-[0.3em] text-white/32 sm:block"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              2026 Showreel
            </span>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => setReelOpen(true)}
            initial={{
              opacity: 0,
              y: 55,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              ease: premiumEase,
            }}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    y: -8,
                    scale: 1.008,
                  }
            }
            className="group relative mt-12 aspect-[16/9] w-full overflow-hidden border border-white/12 bg-[#111] text-left shadow-[0_45px_140px_rgba(0,0,0,0.45)] sm:mt-16"
          >
            <Image
              src="/gallery/jkayy-reel-cover.jpg"
              alt="JKAYY 2026 live showreel"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />

            <span className="absolute inset-0 bg-black/52 transition-colors duration-700 group-hover:bg-black/38" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.8)_100%)]" />

            <span className="pointer-events-none absolute inset-y-0 -left-[35%] w-[22%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/16 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[118%] group-hover:opacity-100" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
              <p
                className="text-[8px] uppercase tracking-[0.46em] text-white/55 sm:text-[10px]"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Live Reel
              </p>

              <h3
                className="mt-4 text-[clamp(3rem,9vw,9rem)] font-medium uppercase leading-[0.75] tracking-[-0.075em]"
                style={{
                  fontFamily: displayFont.style.fontFamily,
                }}
              >
                2026 Showreel
              </h3>

              <span className="mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-lg transition-all duration-700 group-hover:scale-110 group-hover:bg-white group-hover:text-black sm:h-20 sm:w-20">
                <Play className="ml-1 h-5 w-5 fill-current sm:h-6 sm:w-6" />
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/12 px-4 py-4 sm:px-6">
              <span
                className="text-[7px] uppercase tracking-[0.3em] text-white/38"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Performance Archive
              </span>

              <span
                className="text-[7px] uppercase tracking-[0.3em] text-white/38"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Play Fullscreen
              </span>
            </div>
          </motion.button>
        </div>
      </section>

      {/* Reel modal */}
      <AnimatePresence>
        {reelOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="JKAYY featured showreel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={() => {
              setReelOpen(false);
              setIsPlaying(false);
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/96 p-3 backdrop-blur-xl sm:p-6"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              transition={{
                duration: 0.55,
                ease: premiumEase,
              }}
              onPointerDown={(event) => event.stopPropagation()}
              className="relative w-full max-w-[1500px] overflow-hidden border border-white/12 bg-black"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
                <div>
                  <p
                    className="text-[7px] uppercase tracking-[0.3em] text-white/38"
                    style={{
                      fontFamily: bodyFont.style.fontFamily,
                    }}
                  >
                    Live Reel
                  </p>

                  <p
                    className="mt-1 text-xl font-medium text-white sm:text-2xl"
                    style={{
                      fontFamily: displayFont.style.fontFamily,
                    }}
                  >
                    2026 Showreel
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setReelOpen(false);
                    setIsPlaying(false);
                  }}
                  aria-label="Close showreel"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:rotate-90 hover:bg-white hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={toggleVideo}
                className="group relative block aspect-video w-full bg-black"
                aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
              >
                <video
                  ref={videoRef}
                  src={REEL_URL}
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  className="h-full w-full object-contain"
                />

                <AnimatePresence>
                  {!isPlaying && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-lg sm:h-20 sm:w-20"
                    >
                      <Play className="ml-1 h-5 w-5 fill-current sm:h-6 sm:w-6" />
                    </motion.span>
                  )}
                </AnimatePresence>

                {isPlaying && (
                  <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-lg transition-opacity duration-300 group-hover:opacity-100">
                    <Pause className="h-4 w-4 fill-current" />
                  </span>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}