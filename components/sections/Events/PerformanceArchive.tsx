"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";
import {
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

type PerformanceHighlight = {
  category: string;
  title: string;
  location: string;
  video: string;
  poster?: string;
};

const performanceHighlights: PerformanceHighlight[] = [
  {
    category: "Festival",
    title: "Sunburn Festival",
    location: "Delhi",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784805159/hy.press_eqtxj2.mp4",
    
  },
  {
    category: "Nightclub",
    title: "Midnight Sessions",
    location: "Mumbai",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784635508/jkayyofficial_9_fyhuq8.mp4",

  },
  {
    category: "Wedding",
    title: "Luxury Wedding",
    location: "Goa",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784537175/jkayyofficial_4_sdexiy.mp4",

  },
  {
    category: "Corporate",
    title: "Private Brand Experience",
    location: "Noida",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784180733/2e39652c-6c4f-4c82-94a4-8b982d3ce785_m2vatb.mp4",

  },
  {
    category: "Wedding",
    title: "Luxury Wedding",
    location: "Goa",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784724758/jkayyofficial_12_w4nzbe.mp4",
  
  },
  {
    category: "Corporate",
    title: "Private Brand Experience",
    location: "Noida",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784537173/jkayyofficial_2_h963q1.mp4",
   
  },
];

function HighlightCard({
  item,
  index,
  finale = false,
}: {
  item: PerformanceHighlight;
  index: number;
  finale?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasRequestedVideo, setHasRequestedVideo] =
    useState(false);
  const [videoIsReady, setVideoIsReady] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  /*
    Load a video shortly before its card reaches the viewport.
    Once requested, the source remains attached so reverse scrolling
    does not force the browser to download the video again.
  */
  const isNearViewport = useInView(cardRef, {
    margin: "650px 0px 650px 0px",
    amount: 0,
  });

  /*
    Only play videos that are meaningfully visible.
    This prevents all six videos from decoding simultaneously.
  */
  const isActivelyVisible = useInView(cardRef, {
    margin: "-12% 0px -12% 0px",
    amount: 0.12,
  });

  const comesFromLeft = index % 2 === 0;

  useEffect(() => {
    if (isNearViewport) {
      setHasRequestedVideo(true);
    }
  }, [isNearViewport]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !hasRequestedVideo) return;

    const syncPlayback = () => {
      const shouldPlay =
        isActivelyVisible &&
        !document.hidden &&
        !shouldReduceMotion;

      if (!shouldPlay) {
        video.pause();
        return;
      }

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Muted inline autoplay can still be temporarily blocked.
        });
      }
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        syncPlayback,
      );
      video.pause();
    };
  }, [
    hasRequestedVideo,
    isActivelyVisible,
    shouldReduceMotion,
  ]);

  return (
    <motion.div
      ref={cardRef}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              x: comesFromLeft ? -72 : 72,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
        margin: "0px 0px -6% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.9,
        delay: shouldReduceMotion
          ? 0
          : index % 2 === 0
            ? 0
            : 0.08,
        ease: premiumEase,
      }}
      className={`
        group
        relative
        isolate
        overflow-hidden
        bg-[#090909]
        [backface-visibility:hidden]

        ${
          finale
            ? "h-full min-h-0"
            : "aspect-[4/5] min-h-[500px] sm:aspect-[16/11] sm:min-h-[560px] md:aspect-[4/3] md:min-h-0 xl:aspect-[16/10]"
        }
      `}
    >
      {/* Stable poster layer prevents a black flash while video loads. */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          scale-[1.01]
          bg-[#0b0b0b]
          bg-cover
          bg-center
        "
        style={
          item.poster
            ? {
                backgroundImage: `url(${item.poster})`,
              }
            : undefined
        }
      />

      <video
        ref={videoRef}
        src={hasRequestedVideo ? item.video : undefined}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        onLoadedData={() => setVideoIsReady(true)}
        onCanPlay={() => setVideoIsReady(true)}
        onError={() => setVideoIsReady(false)}
        className={`
          absolute
          inset-0
          h-full
          w-full
          scale-[1.01]
          object-cover
          transition-[opacity,transform]
          duration-700
          ease-out
          [backface-visibility:hidden]
          motion-reduce:transition-none
          md:duration-[1200ms]
          md:group-hover:scale-[1.035]

          ${videoIsReady ? "opacity-100" : "opacity-0"}
        `}
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/10
          transition-colors
          duration-500
          motion-reduce:transition-none
          md:group-hover:bg-black/25
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/10
          to-black/25
          opacity-100
          transition-opacity
          duration-500
          motion-reduce:transition-none
          md:opacity-65
          md:group-hover:opacity-100
        "
      />

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          animate={
            isActivelyVisible
              ? {
                  x: ["-150%", "180%"],
                  opacity: [0, 0.16, 0],
                }
              : {
                  opacity: 0,
                }
          }
          transition={{
            duration: 7.5,
            delay: (index % 2) * 0.6,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            hidden
            w-[18%]
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/12
            to-transparent
            blur-lg
            lg:block
          "
        />
      )}

      <div
        className="
          absolute
          inset-x-0
          top-0
          z-10
          flex
          items-start
          justify-between
          p-[clamp(1.1rem,3vw,2rem)]
        "
      >
        <p
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.34em]
            text-white/75
            sm:text-[10px]
          "
          style={{
            fontFamily: cleanFont.style.fontFamily,
          }}
        >
         
        </p>

        <div className="flex items-center gap-2">
          <motion.span
            animate={
              isActivelyVisible && !shouldReduceMotion
                ? {
                    opacity: [0.35, 1, 0.35],
                    scale: [0.8, 1.2, 0.8],
                  }
                : {
                    opacity: 0.5,
                    scale: 1,
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-white
              shadow-[0_0_12px_rgba(255,255,255,0.9)]
            "
          />

          <span
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-white/65
            "
            style={{
              fontFamily: cleanFont.style.fontFamily,
            }}
          >
            Playing
          </span>
        </div>
      </div>

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          p-[clamp(1.1rem,3vw,2rem)]
        "
      >
        <div
          className="
            translate-y-0
            opacity-100
            transition-[transform,opacity]
            duration-500
            ease-out
            motion-reduce:transition-none
            md:translate-y-5
            md:opacity-0
            md:group-hover:translate-y-0
            md:group-hover:opacity-100
          "
        >
          <p
            className="
              mb-3
              text-[9px]
              font-medium
              uppercase
              tracking-[0.38em]
              text-white/55
              sm:text-[10px]
            "
            style={{
              fontFamily: cleanFont.style.fontFamily,
            }}
          >
            {item.category}
          </p>

          <div className="flex items-end justify-between gap-4 sm:gap-5">
            <div className="min-w-0 flex-1">
              <h3
                className="
                  max-w-[98%]
                  break-words
                  text-[clamp(2.15rem,6.2vw,5.75rem)]
                  font-medium
                  leading-[0.87]
                  tracking-[-0.055em]
                  text-white
                  md:text-[clamp(2.5rem,4.6vw,5.75rem)]
                "
                style={{
                  fontFamily: luxuryFont.style.fontFamily,
                }}
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-4
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.32em]
                  text-white/55
                  sm:text-[10px]
                "
                style={{
                  fontFamily: cleanFont.style.fontFamily,
                }}
              >
                {item.location}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="
                hidden
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                text-white
                transition-[background-color,border-color,color]
                duration-400
                motion-reduce:transition-none
                sm:flex
                lg:h-14
                lg:w-14
                md:group-hover:border-white
                md:group-hover:bg-white
                md:group-hover:text-black
              "
            >
              <span className="text-lg">↗</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-px
          w-full
          overflow-hidden
          bg-white/15
        "
      >
        {!shouldReduceMotion && (
          <motion.div
            animate={
              isActivelyVisible
                ? {
                    x: ["-110%", "110%"],
                  }
                : {
                    x: "-110%",
                  }
            }
            transition={{
              duration: 4.8,
              delay: (index % 2) * 0.3,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
            }}
            className="
              h-full
              w-full
              bg-gradient-to-r
              from-transparent
              via-white
              to-transparent
              shadow-[0_0_12px_rgba(255,255,255,0.9)]
            "
          />
        )}
      </div>
    </motion.div>
  );
}

export default function PerformanceHighlights() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="performance-highlights"
      className="
        relative
        z-10
        isolate
        overflow-x-hidden
        bg-[#030303]
        text-white
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[55svh]
        "
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 58%)",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1800px]
          px-4
          pb-14
          pt-20
          sm:px-7
          sm:pb-20
          sm:pt-28
          lg:px-12
          lg:pb-24
          lg:pt-36
          2xl:px-16
        "
      >
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.85,
            ease: premiumEase,
          }}
          className="
            flex
            flex-col
            justify-between
            gap-10
            lg:flex-row
            lg:items-end
            lg:gap-16
          "
        >
          <div className="min-w-0">
          
             

              <span className="h-px w-12 bg-white/25 sm:w-20" />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.38em]
                  text-white/45
                  sm:text-[10px]
                "
                style={{
                  fontFamily: cleanFont.style.fontFamily,
                }}
              >
                Selected moments
              </span>
          

            <p
              className="
                mb-2
                text-[clamp(1.5rem,4.6vw,3.8rem)]
                font-normal
                italic
                leading-none
                text-white/40
              "
              style={{
                fontFamily: luxuryFont.style.fontFamily,
              }}
            >
              Six moments.
            </p>

            <h2
              className="
                max-w-full
                text-[clamp(3.15rem,14vw,11rem)]
                font-medium
                uppercase
                leading-[0.76]
                tracking-[-0.075em]
                text-white
                sm:text-[clamp(4rem,11vw,11rem)]
                lg:text-[clamp(5.5rem,9vw,11rem)]
              "
              style={{
                fontFamily: luxuryFont.style.fontFamily,
              }}
            >
              Performance
              <br />

              <span className="font-normal italic text-white/55">
                Highlights
              </span>
            </h2>
          </div>

          <div className="flex max-w-md flex-col gap-5 lg:pb-2">
            <p
              className="
                text-[12px]
                font-normal
                leading-6
                text-white/45
                sm:text-[14px]
                sm:leading-7
              "
              style={{
                fontFamily: cleanFont.style.fontFamily,
              }}
            >
              From festival stages and intimate clubs to destination weddings
              and private brand experiences.
            </p>

            <p
              className="
                hidden
                text-[8px]
                font-medium
                uppercase
                tracking-[0.34em]
                text-white/30
                md:block
                sm:text-[9px]
              "
              style={{
                fontFamily: cleanFont.style.fontFamily,
              }}
            >
              Hover to reveal each performance
            </p>
          </div>
        </motion.div>
      </div>

      <div className="border-y border-white/10">
        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-[1920px]
            grid-cols-1
            overflow-hidden
            md:grid-cols-2
          "
        >
          {performanceHighlights
            .slice(0, 4)
            .map((item, index) => {
              const isLeftDesktopCard = index % 2 === 0;

              return (
                <div
                  key={`${item.category}-${item.title}-${item.location}-${index}`}
                  className={`
                    overflow-hidden
                    border-b
                    border-white/10

                    ${
                      isLeftDesktopCard
                        ? "md:border-r"
                        : "md:border-r-0"
                    }
                  `}
                >
                  <HighlightCard
                    item={item}
                    index={index}
                  />
                </div>
              );
            })}
        </div>
      </div>

      {/*
        The final row remains pinned while the following experience
        section rises over it. svh is intentionally used here because
        it does not resize continuously as mobile browser chrome moves.
      */}
      <div className="relative z-10 h-[185svh] sm:h-[195svh] lg:h-[200svh]">
        <div
          className="
            sticky
            top-0
            h-[100svh]
            overflow-hidden
            border-b
            border-white/10
            bg-[#030303]
          "
        >
          <div
            className="
              mx-auto
              grid
              h-full
              max-w-[1920px]
              grid-cols-1
              grid-rows-2
              md:grid-cols-2
              md:grid-rows-1
            "
          >
            {performanceHighlights
              .slice(4)
              .map((item, finalIndex) => {
                const index = finalIndex + 4;

                return (
                  <div
                    key={`${item.category}-${item.title}-${item.location}-${index}`}
                    className={`
                      h-full
                      min-h-0
                      overflow-hidden
                      border-white/10

                      ${
                        finalIndex === 0
                          ? "border-b md:border-b-0 md:border-r"
                          : ""
                      }
                    `}
                  >
                    <HighlightCard
                      item={item}
                      index={index}
                      finale
                    />
                  </div>
                );
              })}
          </div>

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              bg-gradient-to-t
              from-black/35
              via-transparent
              to-black/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[max(1.25rem,env(safe-area-inset-bottom))]
              left-1/2
              z-30
              flex
              max-w-[calc(100%-2rem)]
              -translate-x-1/2
              items-center
              gap-3
              whitespace-nowrap
              rounded-full
              border
              border-white/10
              bg-black/70
              px-4
              py-2.5
              sm:bottom-[max(2rem,env(safe-area-inset-bottom))]
            "
          >
            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, 4, 0],
                      opacity: [0.4, 1, 0.4],
                    }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-xs text-white/60"
            >
              ↓
            </motion.span>

            <span
              className="
                truncate
                text-[8px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-white/45
                sm:text-[9px]
                sm:tracking-[0.28em]
              "
              style={{
                fontFamily: cleanFont.style.fontFamily,
              }}
            >
              Enter the experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}