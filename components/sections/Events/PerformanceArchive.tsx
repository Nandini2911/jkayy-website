"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
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

const displayFont = Cormorant_Garamond({
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

const ease = [0.16, 1, 0.3, 1] as const;

type ClubEvent = {
  category: string;
  title: string;
  location: string;
  video: string;
};

const events: ClubEvent[] = [
  {
    category: "Club Event",
    title: "Festival Set",
    location: "Delhi",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784805159/hy.press_eqtxj2.mp4",
  },
  {
    category: "Club Event",
    title: "Midnight Set",
    location: "Mumbai",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784635508/jkayyofficial_9_fyhuq8.mp4",
  },
  {
    category: "Club Event",
    title: "Peak Hour",
    location: "Goa",
    video:
      "https://cdn.shopify.com/videos/c/o/v/565ecb0878e04842a3f53a5bf3e7f2be.mp4",
  },
  {
    category: "Club Event",
    title: "Main Floor",
    location: "Noida",
    video:
      "https://cdn.shopify.com/videos/c/o/v/18e7631a877343db9e558534585a1b5e.mp4",
  },
  {
    category: "Club Event",
    title: "After Hours",
    location: "Goa",
    video:
      "https://cdn.shopify.com/videos/c/o/v/7bb9912065244711ae0e22b8ce8c58a1.mp4",
  },
  {
    category: "Club Event",
    title: "Closing Set",
    location: "Noida",
    video:
      "https://cdn.shopify.com/videos/c/o/v/bf840fbaf4f340ce8952a863dbb2c2ba.mp4",
  },
   {
    category: "Club Event",
    title: "Main Floor",
    location: "Noida",
    video:
      "https://cdn.shopify.com/videos/c/o/v/e338409bd12d480f9f7019d735dd9721.mp4",
  },
  {
    category: "Club Event",
    title: "After Hours",
    location: "Goa",
    video:
      "https://cdn.shopify.com/videos/c/o/v/d3bc88e3a9a049bd89340de260f2aa44.mp4",
  },
  {
    category: "Club Event",
    title: "Closing Set",
    location: "Noida",
    video:
      "https://cdn.shopify.com/videos/c/o/v/a1f57461ad2c4b4fad6c605c36f64ae6.mp4",
  },
];

function useIsMobileScreen() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");

    const update = () => {
      setIsMobile(media.matches);
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

  return isMobile;
}

function EventCard({
  item,
  index,
  isMobile,
}: {
  item: ClubEvent;
  index: number;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const mobileEntered = useInView(cardRef, {
    once: true,
    amount: 0.16,
    margin: "0px 0px -7% 0px",
  });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.preload = "metadata";
    video.load();

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
        video.muted = true;
        setPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility,
      );
      video.pause();
    };
  }, []);

  const play = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setPlaying(true);
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    video.play().catch(() => undefined);
  };

  const pause = () => {
    const video = videoRef.current;

    setPlaying(false);

    if (!video) {
      return;
    }

    video.pause();
    video.muted = true;
    video.defaultMuted = true;
  };

  const toggleMobile = () => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    if (videoRef.current?.paused) {
      play();
    } else {
      pause();
    }
  };

  return (
    <motion.article
      ref={cardRef}
      initial={false}
      animate={
        isMobile
          ? {
              opacity: mobileEntered ? 1 : 0,
              x: mobileEntered
                ? 0
                : index % 2 === 0
                  ? -52
                  : 52,
              y: mobileEntered ? 0 : 14,
              scale: mobileEntered ? 1 : 0.985,
            }
          : {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
      }
      transition={{
        duration: isMobile ? 0.72 : 0,
        ease,
        delay: isMobile ? (index % 3) * 0.035 : 0,
      }}
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={toggleMobile}
      className="
        group
        relative
        aspect-[4/5]
        w-full
        max-w-[430px]
        min-w-0
        shrink-0
        sm:max-w-none
        cursor-pointer
        overflow-hidden
        rounded-[18px]
        border
        sm:rounded-[26px]
        border-white/[0.11]
        bg-[#090909]
        shadow-[0_30px_90px_rgba(0,0,0,0.34)]
        lg:w-[31vw]
        lg:max-w-[520px]
        xl:w-[29vw]
      "
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_35%,#1d1d1d_0%,#0a0a0a_58%,#050505_100%)]
        "
      />

      <video
        ref={videoRef}
        src={item.video}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={() => {
          const video = videoRef.current;

          if (
            video &&
            Number.isFinite(video.duration) &&
            video.duration > 0
          ) {
            try {
              video.currentTime = Math.min(
                0.01,
                video.duration,
              );
            } catch {
              // Browser may wait for more buffered data.
            }
          }
        }}
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onError={() => setReady(false)}
        className={`
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-[opacity,transform,filter]
          duration-700
          ease-out
          group-hover:scale-[1.035]
          group-hover:brightness-[0.9]

          ${ready ? "opacity-100" : "opacity-0"}
        `}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.02)_40%,rgba(0,0,0,0.76)_100%)]
        "
      />

      <div
        className="
          absolute
          left-4
          top-4
          z-20
          flex
          items-center
          gap-2.5
          rounded-full
          border
          border-white/15
          bg-black/35
          px-3
          py-2
          backdrop-blur-md
          sm:left-5
          sm:top-5
        "
      >
        <span
          className={`
            h-1.5
            w-1.5
            rounded-full
            ${
              playing
                ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]"
                : "bg-white/45"
            }
          `}
        />

        <span
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.28em]
            text-white/68
          "
          style={{
            fontFamily: cleanFont.style.fontFamily,
          }}
        >
          {playing ? (
            "Playing muted"
          ) : (
            <>
              <span className="sm:hidden">Tap to play</span>
              <span className="hidden sm:inline">Hover to play</span>
            </>
          )}
        </span>
      </div>

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20
          p-4
          sm:p-6
          lg:p-7
        "
      >
        <div
          className="
            mb-2.5
            flex
            items-center
            gap-3
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-white/46
            sm:text-[8px]
          "
          style={{
            fontFamily: cleanFont.style.fontFamily,
          }}
        >
          <span>{item.location}</span>
          <span className="h-px w-7 bg-white/20" />
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>

        <h3
          className="
            text-[clamp(2.15rem,11vw,3.15rem)]
            font-medium
            sm:text-[clamp(2.6rem,7vw,4.9rem)]
            leading-[0.82]
            tracking-[-0.055em]
            text-white
            lg:text-[clamp(3.1rem,3.9vw,4.9rem)]
          "
          style={{
            fontFamily: displayFont.style.fontFamily,
          }}
        >
          {item.title}
        </h3>
      </div>
    </motion.article>
  );
}

export default function PerformanceArchive() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobileScreen();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rowOneX = useTransform(
    scrollYProgress,
    [0, 1],
    ["7%", "-10%"],
  );

  const rowTwoX = useTransform(
    scrollYProgress,
    [0, 1],
    ["-8%", "9%"],
  );

  const rowOneY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -10, -18],
  );

  const rowTwoY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -24, -46],
  );

  const rowThreeX = useTransform(
    scrollYProgress,
    [0, 1],
    ["6%", "-8%"],
  );

  const rowThreeY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -38, -72],
  );

  const topRow = events.slice(0, 3);
  const middleRow = events.slice(3, 6);
  const bottomRow = events.slice(6, 9);

  return (
    <section
      ref={sectionRef}
      id="performance-highlights"
      className="
        relative
        z-10
        isolate
        overflow-x-hidden
        bg-[#050505]
        text-white
        sm:overflow-x-visible
        lg:min-h-[225vh]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 30%), #050505",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1800px]
          px-4
          pb-16
          pt-16
          sm:px-7
          sm:pb-28
          sm:pt-28
          lg:sticky
          lg:top-0
          lg:flex
          lg:min-h-screen
          lg:flex-col
          lg:justify-center
          lg:overflow-hidden
          lg:px-12
          lg:py-16
          2xl:px-16
        "
      >
        <motion.header
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease,
          }}
          className="
            mb-10
            flex
            flex-col
            items-center
            gap-5
            border-b
            border-white/10
            pb-8
            text-center
            sm:mb-12
            sm:flex-row
            sm:items-end
            sm:justify-between
            sm:gap-6
            sm:pb-10
            sm:text-left
            lg:mb-9
          "
        >
          <div>
            <div className="mb-5 flex items-center justify-center gap-3 sm:justify-start sm:gap-4">
              <span className="h-px w-10 bg-white/30 sm:w-14" />

              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.38em]
                  text-white/42
                  sm:text-[9px]
                "
                style={{
                  fontFamily: cleanFont.style.fontFamily,
                }}
              >
                Selected club moments
              </span>
            </div>

            <h2
              className="
                whitespace-nowrap
                text-[clamp(2.75rem,13vw,3.8rem)]
                font-medium
                leading-[0.82]
                tracking-[-0.065em]
                text-white
                sm:whitespace-normal
                sm:text-[clamp(4.8rem,10vw,8.4rem)]
                sm:leading-[0.75]
                sm:tracking-[-0.075em]
                lg:text-[clamp(5rem,6vw,8.4rem)]
              "
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Club
              <span className="ml-[0.1em] font-normal italic text-white/45 sm:ml-[0.12em]">
                Nights
              </span>
            </h2>
          </div>

          <p
            className="
              mx-auto
              max-w-[330px]
              text-center
              text-[11px]
              leading-5
              text-white/42
              sm:mx-0
              sm:max-w-[390px]
              sm:text-left
              sm:text-[13px]
              sm:leading-6
            "
            style={{
              fontFamily: cleanFont.style.fontFamily,
            }}
          >
            <span className="sm:hidden">
              Nine club moments, crafted for a clean mobile experience.
            </span>
            <span className="hidden sm:inline">
              Three rows. Nine club moments. Scroll through the energy as
              each row crosses the next in a subtle luxury motion.
            </span>
          </p>
        </motion.header>

        <div className="relative">
          <motion.div
            style={{
              x: reduceMotion || isMobile ? 0 : rowOneX,
              y: reduceMotion || isMobile ? 0 : rowOneY,
            }}
            className="
              relative
              z-10
              grid
              grid-cols-1
              justify-items-center
              gap-4
              sm:grid-cols-3
              sm:justify-items-stretch
              sm:gap-5
              lg:flex
              lg:w-max
              lg:gap-5
              xl:gap-6
            "
          >
            {topRow.map((item, index) => (
              <EventCard
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </motion.div>

          <motion.div
            style={{
              x: reduceMotion || isMobile ? 0 : rowTwoX,
              y: reduceMotion || isMobile ? 0 : rowTwoY,
            }}
            className="
              relative
              z-20
              mt-4
              grid
              grid-cols-1
              justify-items-center
              gap-4
              sm:grid-cols-3
              sm:justify-items-stretch
              sm:gap-5
              lg:-mt-[7vw]
              lg:ml-auto
              lg:flex
              lg:w-max
              lg:gap-5
              xl:-mt-[6vw]
              xl:gap-6
            "
          >
            {middleRow.map((item, localIndex) => (
              <EventCard
                key={`${item.title}-${localIndex + 3}`}
                item={item}
                index={localIndex + 3}
                isMobile={isMobile}
              />
            ))}
          </motion.div>

          <motion.div
            style={{
              x: reduceMotion || isMobile ? 0 : rowThreeX,
              y: reduceMotion || isMobile ? 0 : rowThreeY,
            }}
            className="
              relative
              z-30
              mt-4
              grid
              grid-cols-1
              justify-items-center
              gap-4
              sm:grid-cols-3
              sm:justify-items-stretch
              sm:gap-5
              lg:-mt-[7vw]
              lg:flex
              lg:w-max
              lg:gap-5
              xl:-mt-[6vw]
              xl:gap-6
            "
          >
            {bottomRow.map((item, localIndex) => (
              <EventCard
                key={`${item.title}-${localIndex + 6}`}
                item={item}
                index={localIndex + 6}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>

        <div
          className="
            mt-8
            hidden
            items-center
            justify-between
            border-t
            border-white/[0.08]
            pt-5
            lg:flex
          "
        >
          <span
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.32em]
              text-white/24
            "
            style={{
              fontFamily: cleanFont.style.fontFamily,
            }}
          >
            Scroll to explore
          </span>

          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-white/16" />
            <span
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-white/24
              "
              style={{
                fontFamily: cleanFont.style.fontFamily,
              }}
            >
              01 — 09
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}