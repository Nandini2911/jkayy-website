"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { Expand, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  bodyFont,
  displayFont,
  galleryImages,
  premiumEase,
} from "./galleryShared";

export default function GalleryCollection() {
  const reducedMotion = useReducedMotion() ?? false;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null
            ? 0
            : (current + 1) % galleryImages.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null
            ? 0
            : (current - 1 + galleryImages.length) %
              galleryImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex]);

  const selectedMedia =
    selectedIndex === null ? null : galleryImages[selectedIndex];

  return (
    <>
      <section
        id="gallery-collection"
        className="relative isolate overflow-hidden bg-[#f2f2ef] text-black"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 12%,rgba(0,0,0,0.055),transparent 24%),radial-gradient(circle at 88% 74%,rgba(0,0,0,0.05),transparent 28%),linear-gradient(135deg,#ffffff 0%,#f3f3f0 48%,#e9e9e6 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.22) 1px,transparent 1px)",
            backgroundSize:
              "clamp(52px,5vw,82px) clamp(52px,5vw,82px)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32 xl:px-14 2xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.45,
            }}
            transition={{
              duration: 0.8,
              ease: premiumEase,
            }}
            className="flex items-center justify-between border-b border-black/12 pb-5"
          >
            <span
              className="text-[8px] uppercase tracking-[0.36em] text-black/52"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              02 · Gallery Collection
            </span>

            <span
              className="hidden text-[8px] uppercase tracking-[0.3em] text-black/36 sm:block"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              {galleryImages.length} Selected Moments
            </span>
          </motion.div>

          <div className="grid gap-8 pb-14 pt-12 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:gap-20 lg:pb-20">
            <div>
              <motion.h2
                initial={{
                  opacity: 0,
                  x: reducedMotion ? 0 : -70,
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
                  duration: 1,
                  ease: premiumEase,
                }}
                className="text-[clamp(4.5rem,11vw,11rem)] font-medium uppercase leading-[0.7] tracking-[-0.08em]"
                style={{
                  fontFamily: displayFont.style.fontFamily,
                }}
              >
                The
              </motion.h2>

              <motion.h2
                initial={{
                  opacity: 0,
                  x: reducedMotion ? 0 : 85,
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
                  duration: 1,
                  delay: 0.08,
                  ease: premiumEase,
                }}
                className="ml-[7%] mt-1 text-[clamp(4rem,10vw,10rem)] font-normal italic leading-[0.7] tracking-[-0.07em] text-black/47"
                style={{
                  fontFamily: displayFont.style.fontFamily,
                }}
              >
                Collection
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: premiumEase,
              }}
              className="max-w-md lg:justify-self-end"
            >
              <div className="mb-5 h-px w-16 bg-black/25" />

              <p
                className="text-[13px] leading-6 text-black/55 sm:text-[15px] sm:leading-7"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Images and films from performances, crowds, travel,
                discipline and the moments between the noise.
              </p>
            </motion.div>
          </div>

          {/* Mixed image and video masonry */}
          <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">
            {galleryImages.map((media, index) => {
              const aspect =
                index % 7 === 0
                  ? "aspect-[4/5]"
                  : index % 5 === 0
                    ? "aspect-[5/7]"
                    : index % 3 === 0
                      ? "aspect-square"
                      : "aspect-[4/3]";

              return (
                <motion.button
                  key={`${media.type}-${media.src}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.12,
                  }}
                  transition={{
                    duration: 0.75,
                    delay: (index % 6) * 0.055,
                    ease: premiumEase,
                  }}
                  className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden bg-[#d8d8d5] text-left shadow-[0_25px_70px_rgba(0,0,0,0.08)] sm:mb-4 ${aspect}`}
                >
                  {media.type === "video" ? (
                    <video
                      src={media.src}
                      poster={media.poster}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={media.alt}
                      onPointerEnter={(event) => {
                        if (reducedMotion) return;
                        void event.currentTarget.play();
                      }}
                      onPointerLeave={(event) => {
                        event.currentTarget.pause();
                        event.currentTarget.currentTime = 0;
                      }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                  ) : (
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                  )}

                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-black/0 to-black/5 opacity-50 transition-opacity duration-500 group-hover:opacity-90" />

                  {media.type === "video" && (
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-lg transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                    <div className="translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p
                        className="text-[7px] uppercase tracking-[0.28em] text-white/55"
                        style={{
                          fontFamily: bodyFont.style.fontFamily,
                        }}
                      >
                        {media.type === "video"
                          ? "Video · "
                          : "Image · "}
                        {media.label}
                      </p>

                      <p
                        className="mt-2 text-xl font-medium leading-none tracking-[-0.035em] text-white sm:text-2xl"
                        style={{
                          fontFamily: displayFont.style.fontFamily,
                        }}
                      >
                        {media.type === "video"
                          ? "Play Film"
                          : "View Frame"}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white opacity-0 backdrop-blur-lg transition-all duration-500 group-hover:translate-y-0 group-hover:rotate-90 group-hover:opacity-100">
                      {media.type === "video" ? (
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      ) : (
                        <Expand className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mixed media lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && selectedMedia && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery media viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl sm:p-6"
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
              className="relative flex h-[88svh] w-full max-w-[1450px] flex-col overflow-hidden border border-white/12 bg-[#080808]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
                <div>
                  <p
                    className="text-[7px] uppercase tracking-[0.3em] text-white/38"
                    style={{
                      fontFamily: bodyFont.style.fontFamily,
                    }}
                  >
                    {selectedMedia.type === "video"
                      ? "Video"
                      : "Image"}{" "}
                    · {selectedMedia.label}
                  </p>

                  <p
                    className="mt-1 text-sm text-white/65"
                    style={{
                      fontFamily: bodyFont.style.fontFamily,
                    }}
                  >
                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                    {String(galleryImages.length).padStart(2, "0")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close gallery viewer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:rotate-90 hover:bg-white hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative flex-1 bg-black">
                {selectedMedia.type === "video" ? (
                  <video
                    key={selectedMedia.src}
                    src={selectedMedia.src}
                    poster={selectedMedia.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + galleryImages.length) %
                        galleryImages.length,
                    )
                  }
                  className="border-r border-white/10 px-5 py-4 text-left text-[8px] uppercase tracking-[0.28em] text-white/52 transition-colors duration-300 hover:bg-white hover:text-black"
                  style={{
                    fontFamily: bodyFont.style.fontFamily,
                  }}
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex + 1) %
                        galleryImages.length,
                    )
                  }
                  className="px-5 py-4 text-right text-[8px] uppercase tracking-[0.28em] text-white/52 transition-colors duration-300 hover:bg-white hover:text-black"
                  style={{
                    fontFamily: bodyFont.style.fontFamily,
                  }}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}