"use client";

import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
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
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cleanFont = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const ADVENTURE_VIDEO = "https://cdn.shopify.com/videos/c/o/v/0f390617f65e417c828f78f227f83c78.mp4";



/*
  This video appears behind the continuously scrolling image gallery.

  You can replace this path with another video later.
*/
const GALLERY_BACKGROUND_VIDEO =
  "https://cdn.shopify.com/videos/c/o/v/880b7db15f0a4eb3942fbf0d0722d0ab.mp4";


type AdventureGalleryItem = {
  number: string;
  title: string;
  eyebrow: string;
  image: string;
  alt: string;
};

const adventureGallery: AdventureGalleryItem[] = [
  {
    number: "01",
    title: "Mountain",
    eyebrow: "Higher Ground",
    image: "/images/ad1.jpg",
    alt: "Jitesh exploring a mountain landscape",
  },
  {
    number: "02",
    title: "Snow",
    eyebrow: "Into The Cold",
    image: "/images/ad2.jpg",
    alt: "Snow-covered mountain adventure",
  },
  {
    number: "03",
    title: "Camping",
    eyebrow: "Under Open Skies",
    image: "/images/ad3.jpg",
    alt: "Camping in the mountains",
  },
  {
    number: "04",
    title: "Sunrise",
    eyebrow: "First Light",
    image: "/images/ad4.jpg",
    alt: "Sunrise over a mountain range",
  },
  {
    number: "05",
    title: "Road Trips",
    eyebrow: "The Open Road",
    image: "/images/ad5.jpg",
    alt: "A scenic road trip through the mountains",
  },
  {
    number: "06",
    title: "Summit",
    eyebrow: "Above The Clouds",
    image: "/images/ad6.jpg",
    alt: "A mountain summit beneath a dramatic sky",
  },
  {
    number: "07",
    title: "Trails",
    eyebrow: "The Long Way",
    image: "/images/ad7.jpg",
    alt: "A scenic mountain trail",
  },
  {
    number: "08",
    title: "Freedom",
    eyebrow: "Beyond Limits",
    image: "/images/ad8.jpg",
    alt: "Mountain landscape beneath an open sky",
  },
];

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

type AdventureCardProps = {
  item: AdventureGalleryItem;
  decorative?: boolean;
};

function AdventureCard({
  item,
  decorative = false,
}: AdventureCardProps) {
  return (
    <article
      aria-hidden={decorative || undefined}
      className="
        group relative aspect-[4/5]
        w-[78vw] max-w-[360px] shrink-0
        overflow-hidden rounded-[24px]
        border border-black/10
        bg-[#f3f3f3]
        shadow-[0_18px_52px_rgba(21,21,21,0.16)]

        sm:w-[54vw]
        sm:max-w-[430px]
        sm:rounded-[30px]

        md:w-[39vw]

        lg:w-[29vw]
        lg:max-w-[480px]
      "
    >
      <Image
        src={item.image}
        alt={decorative ? "" : item.alt}
        fill
        sizes="
          (max-width: 639px) 78vw,
          (max-width: 767px) 54vw,
          (max-width: 1023px) 39vw,
          29vw
        "
        className="
          object-cover object-center
          transform-gpu
          transition-transform
          duration-[1200ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]

          md:group-hover:scale-[1.035]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-b
          from-white/15
          via-transparent
          to-white/92
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0 h-[52%]
          bg-gradient-to-t
          from-white
          via-white/70
          to-transparent
        "
      />

      <div
        className="
          absolute left-4 right-4 top-4 z-10
          flex items-center justify-between

          sm:left-6
          sm:right-6
          sm:top-6
        "
      >
        <span
          className="
            rounded-full
            border border-white/45
            bg-white/60
            px-3 py-2
            text-[8px]
            font-semibold uppercase
            tracking-[0.3em]
            text-black/58
            shadow-[0_8px_28px_rgba(0,0,0,0.08)]

            md:backdrop-blur-md
          "
        >
          {item.number}
        </span>

        <span
          className="
            h-2 w-2 rounded-full
            border border-white/70
            bg-white/50
            shadow-[0_4px_16px_rgba(0,0,0,0.12)]
            transition-all duration-500

            md:group-hover:bg-black
          "
        />
      </div>

      <div
        className="
          absolute bottom-5 left-5 right-5 z-10

          sm:bottom-7
          sm:left-7
          sm:right-7
        "
      >
        <p
          className="
            m-0
            text-[7px]
            font-semibold uppercase
            tracking-[0.28em]
            text-black/42
          "
        >
          {item.eyebrow}
        </p>

        <h4
          className="
            mb-0 mt-3
            text-[clamp(2.8rem,10vw,5rem)]
            font-medium
            leading-[0.88]
            tracking-[-0.055em]
            text-[#11100e]
          "
          style={{
            fontFamily: luxuryFont.style.fontFamily,
          }}
        >
          {item.title}
        </h4>

        <div
          className="
            relative mt-5 h-px
            overflow-hidden bg-black/12
          "
        >
          <span
            className="
              absolute inset-y-0 left-0
              w-12 bg-black/58
              transition-[width]
              duration-700
              ease-[cubic-bezier(0.16,1,0.3,1)]

              md:group-hover:w-full
            "
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          rounded-[inherit]
          border border-white/28
        "
      />
    </article>
  );
}

export default function AdventureExplorationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const galleryVideoRef = useRef<HTMLVideoElement | null>(null);

  const hoveredVideoRef = useRef<"hero" | "gallery" | null>(null);
  const audibleVideoRef = useRef<"hero" | "gallery" | null>(null);
  const audioRequestRef = useRef(0);

  const reduceMotion = useReducedMotion();

  const [audibleVideo, setAudibleVideo] = useState<
    "hero" | "gallery" | null
  >(null);

  const hasEntered = useInView(sectionRef, {
    once: true,
    amount: 0.04,
    margin: "0px 0px -4% 0px",
  });

  const isHeroVisible = useInView(heroRef, {
    amount: 0.12,
    margin: "8% 0px 8% 0px",
  });

  const isGalleryVisible = useInView(galleryRef, {
    amount: 0.08,
    margin: "12% 0px 12% 0px",
  });

  const setAudibleTarget = useCallback(
    (target: "hero" | "gallery" | null) => {
      audibleVideoRef.current = target;
      setAudibleVideo(target);
    },
    [],
  );

  const getVideoElement = useCallback(
    (target: "hero" | "gallery") =>
      target === "hero"
        ? heroVideoRef.current
        : galleryVideoRef.current,
    [],
  );

  /*
   * Immediately mute both videos. This guarantees that
   * two videos can never produce audio together.
   */
  const muteBothVideos = useCallback(() => {
    audioRequestRef.current += 1;

    [heroVideoRef.current, galleryVideoRef.current].forEach(
      (video) => {
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;
      },
    );

    setAudibleTarget(null);
  }, [setAudibleTarget]);

  const muteVideo = useCallback(
    (target: "hero" | "gallery") => {
      audioRequestRef.current += 1;

      const video = getVideoElement(target);

      if (video) {
        video.muted = true;
        video.defaultMuted = true;
      }

      if (audibleVideoRef.current === target) {
        setAudibleTarget(null);
      }
    },
    [getVideoElement, setAudibleTarget],
  );

  /*
   * Turn sound on for only the selected video.
   *
   * When requireHover is true, the request is cancelled if
   * the cursor leaves before video.play() finishes.
   */
  const enableVideoSound = useCallback(
    async (
      target: "hero" | "gallery",
      requireHover = false,
    ) => {
      const selectedVideo = getVideoElement(target);
      const otherTarget =
        target === "hero" ? "gallery" : "hero";
      const otherVideo = getVideoElement(otherTarget);

      if (!selectedVideo) return;

      const requestId = audioRequestRef.current + 1;
      audioRequestRef.current = requestId;

      /*
       * Mute the opposite video before enabling this one.
       */
      if (otherVideo) {
        otherVideo.muted = true;
        otherVideo.defaultMuted = true;
      }

      if (audibleVideoRef.current === otherTarget) {
        setAudibleTarget(null);
      }

      if (
        requireHover &&
        hoveredVideoRef.current !== target
      ) {
        return;
      }

      selectedVideo.volume = 1;
      selectedVideo.muted = false;
      selectedVideo.defaultMuted = false;
      selectedVideo.playsInline = true;

      try {
        await selectedVideo.play();

        const requestIsCurrent =
          requestId === audioRequestRef.current;

        const hoverIsStillValid =
          !requireHover ||
          hoveredVideoRef.current === target;

        if (!requestIsCurrent || !hoverIsStillValid) {
          selectedVideo.muted = true;
          selectedVideo.defaultMuted = true;
          return;
        }

        /*
         * Re-mute the other video after play resolves as an
         * extra safeguard against asynchronous browser events.
         */
        if (otherVideo) {
          otherVideo.muted = true;
          otherVideo.defaultMuted = true;
        }

        selectedVideo.muted = false;
        selectedVideo.defaultMuted = false;
        setAudibleTarget(target);
      } catch {
        selectedVideo.muted = true;
        selectedVideo.defaultMuted = true;

        if (requestId === audioRequestRef.current) {
          setAudibleTarget(null);
        }

        await selectedVideo.play().catch(() => undefined);
      }
    },
    [getVideoElement, setAudibleTarget],
  );

  const toggleVideoSound = useCallback(
    (target: "hero" | "gallery") => {
      if (audibleVideoRef.current === target) {
        muteVideo(target);
        return;
      }

      hoveredVideoRef.current = null;
      void enableVideoSound(target, false);
    },
    [enableVideoSound, muteVideo],
  );

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) return;

    video.playsInline = true;

    if (audibleVideoRef.current !== "hero") {
      video.muted = true;
      video.defaultMuted = true;
    }

    const updateHeroPlayback = () => {
      if (
        !reduceMotion &&
        isHeroVisible &&
        document.visibilityState === "visible"
      ) {
        video.play().catch(() => undefined);
        return;
      }

      video.muted = true;
      video.defaultMuted = true;
      video.pause();

      if (audibleVideoRef.current === "hero") {
        setAudibleTarget(null);
      }
    };

    updateHeroPlayback();

    document.addEventListener(
      "visibilitychange",
      updateHeroPlayback,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateHeroPlayback,
      );

      video.muted = true;
      video.defaultMuted = true;
      video.pause();
    };
  }, [
    isHeroVisible,
    reduceMotion,
    setAudibleTarget,
  ]);

  useEffect(() => {
    const video = galleryVideoRef.current;

    if (!video) return;

    video.playsInline = true;

    if (audibleVideoRef.current !== "gallery") {
      video.muted = true;
      video.defaultMuted = true;
    }

    const updateGalleryPlayback = () => {
      if (
        !reduceMotion &&
        isGalleryVisible &&
        document.visibilityState === "visible"
      ) {
        video.play().catch(() => undefined);
        return;
      }

      video.muted = true;
      video.defaultMuted = true;
      video.pause();

      if (audibleVideoRef.current === "gallery") {
        setAudibleTarget(null);
      }
    };

    updateGalleryPlayback();

    document.addEventListener(
      "visibilitychange",
      updateGalleryPlayback,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateGalleryPlayback,
      );

      video.muted = true;
      video.defaultMuted = true;
      video.pause();
    };
  }, [
    isGalleryVisible,
    reduceMotion,
    setAudibleTarget,
  ]);

  useEffect(() => {
    return () => {
      hoveredVideoRef.current = null;
      muteBothVideos();
    };
  }, [muteBothVideos]);

  const containerVariants = {
    hidden: {},

    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.06,
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const revealVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: reduceMotion ? 0 : 0.9,
        ease: LUXURY_EASE,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="adventure-exploration"
      className="
        relative z-50 w-full
        overflow-x-clip
        bg-white
        text-[#11100e]
      "
      style={{
        fontFamily: cleanFont.style.fontFamily,
      }}
    >
      {/* HERO */}

      <div
        ref={heroRef}
        onPointerEnter={(event) => {
          if (event.pointerType === "touch") return;

          hoveredVideoRef.current = "hero";
          void enableVideoSound("hero", true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "touch") return;

          if (hoveredVideoRef.current === "hero") {
            hoveredVideoRef.current = null;
          }

          muteVideo("hero");
        }}
        className="
          relative isolate
          min-h-[120svh] w-full
          overflow-hidden
          bg-white
        "
      >
        <video
          ref={heroVideoRef}
          loop
          playsInline
          autoPlay={!reduceMotion}
          preload="metadata"
        
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback"
          onCanPlay={() => {
            if (
              !reduceMotion &&
              isHeroVisible &&
              document.visibilityState === "visible"
            ) {
              heroVideoRef.current
                ?.play()
                .catch(() => undefined);
            }
          }}
          aria-label="Drone footage of a mountain expedition"
          className="
            absolute inset-0 z-0
            h-full w-full
            object-cover object-center
            opacity-90
            [filter:saturate(0.84)_contrast(0.9)_brightness(1.08)]
          "
        >
          <source
            src={ADVENTURE_VIDEO}
            type="video/mp4"
          />
        </video>

        <button
          type="button"
          aria-label={
            audibleVideo === "hero"
              ? "Mute adventure video"
              : "Turn on adventure video sound"
          }
          onClick={(event) => {
            event.stopPropagation();
            toggleVideoSound("hero");
          }}
          className="
            absolute
            bottom-5
            left-5
            z-30
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/35
            bg-black/60
            text-white
            shadow-[0_10px_35px_rgba(0,0,0,0.25)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-105
            hover:bg-white
            hover:text-black
            sm:bottom-7
            sm:left-7
          "
        >
          {audibleVideo === "hero" ? (
            <Volume2
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          ) : (
            <VolumeX
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}
        </button>

        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{
            opacity: hasEntered ? 1 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.2,
            delay: reduceMotion ? 0 : 0.25,
            ease: LUXURY_EASE,
          }}
          className="
            pointer-events-none
            absolute left-1/2 top-[9%] z-[4]
            -translate-x-1/2
            select-none whitespace-nowrap
            text-[clamp(7rem,23vw,24rem)]
            font-semibold uppercase
            leading-none
            tracking-[-0.1em]
            text-black/[0.035]
          "
          style={{
            fontFamily: luxuryFont.style.fontFamily,
          }}
        >
          Explore
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasEntered ? "visible" : "hidden"}
          className="
            relative z-10
            mx-auto flex
            min-h-[100svh] w-full
            max-w-[1920px]
            flex-col justify-end
            px-4 pb-12 pt-28

            sm:px-7
            sm:pb-16
            sm:pt-32

            md:px-9

            lg:px-12
            lg:pb-20

            xl:px-16

            2xl:px-20
          "
        >
          <div
            className="
              mx-auto grid w-full
              max-w-[1700px]
              grid-cols-1 gap-9

              lg:grid-cols-[minmax(520px,1.2fr)_minmax(360px,0.8fr)]
              lg:items-end
              lg:gap-16
            "
          >
            <motion.div
              variants={revealVariants}
              className="max-w-[1050px]"
            >
              <p
                className="
                  mb-4
                  text-[8px]
                  font-semibold uppercase
                  tracking-[0.4em]
                  text-black/43

                  sm:mb-5
                  sm:text-[9px]
                "
              >
                Perspective is earned
              </p>

              <h2
                className="
                  m-0
                  text-[clamp(4.2rem,18vw,7rem)]
                  font-medium
                  leading-[0.78]
                  tracking-[-0.075em]
                  text-[#11100e]

                  sm:text-[clamp(6rem,13vw,9rem)]

                  lg:text-[clamp(7rem,9vw,11rem)]
                "
                style={{
                  fontFamily: luxuryFont.style.fontFamily,
                }}
              >
                Adventure
                <br />

                <em
                  className="
                    font-normal italic
                    text-white
                  "
                >
                  Shapes Perspective
                </em>
              </h2>
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="
                max-w-[560px]
                rounded-[24px]
                border border-black/10
                bg-white/68
                p-5
                shadow-[0_20px_65px_rgba(51,46,36,0.11)]

                sm:rounded-[28px]
                sm:p-7

                md:backdrop-blur-md

                lg:justify-self-end
              "
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-black/45" />

                <span
                  className="
                    text-[7px]
                    font-semibold uppercase
                    tracking-[0.28em]
                    text-black/42
                  "
                >
                  The journey continues
                </span>
              </div>

              <div
                className="
                  space-y-4
                  text-[clamp(0.96rem,2vw,1.15rem)]
                  font-light
                  leading-[1.7]
                  tracking-[-0.02em]
                  text-black/65

                  sm:space-y-5
                "
              >
                <p className="m-0">
                  Beyond music, Jitesh embraces
                  the outdoors through trekking and
                  exploration.
                </p>

                <p className="m-0">
                  Having conquered some of India&apos;s
                  most challenging peaks, he continues
                  to push his physical and mental
                  limits.
                </p>

                <p className="m-0">
                  Every journey becomes a new source
                  of inspiration.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={revealVariants}
            className="
              mx-auto mt-10 flex w-full
              max-w-[1700px]
              items-center justify-between
              border-t border-black/10
              pt-4

              sm:mt-12
              sm:pt-5
            "
          >
           

           
          </motion.div>
        </motion.div>
      </div>

      {/* IMAGE GALLERY WITH BACKGROUND VIDEO */}

      <div
        ref={galleryRef}
        onPointerEnter={(event) => {
          if (event.pointerType === "touch") return;

          hoveredVideoRef.current = "gallery";
          void enableVideoSound("gallery", true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "touch") return;

          if (hoveredVideoRef.current === "gallery") {
            hoveredVideoRef.current = null;
          }

          muteVideo("gallery");
        }}
        className="
          relative isolate overflow-hidden
        
          pb-16 pt-14

          sm:pb-20
          sm:pt-20

          lg:pb-28
          lg:pt-24
        "
      >
        {/* BACKGROUND VIDEO */}

        <video
          ref={galleryVideoRef}
          loop
          playsInline
          autoPlay={!reduceMotion}
          preload="metadata"
    
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback"
          onCanPlay={() => {
            if (
              !reduceMotion &&
              isGalleryVisible &&
              document.visibilityState === "visible"
            ) {
              galleryVideoRef.current
                ?.play()
                .catch(() => undefined);
            }
          }}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-0
            h-full w-full
            object-cover object-center
      
            [filter:saturate(0.62)_contrast(0.92)_brightness(1.08)]
          "
        >
          <source
            src={GALLERY_BACKGROUND_VIDEO}
            type="video/mp4"
          />
        </video>

        <button
          type="button"
          aria-label={
            audibleVideo === "gallery"
              ? "Mute gallery background video"
              : "Turn on gallery background video sound"
          }
          onClick={(event) => {
            event.stopPropagation();
            toggleVideoSound("gallery");
          }}
          className="
            absolute
            right-5
            top-5
            z-30
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/40
            bg-black/60
            text-white
            shadow-[0_10px_35px_rgba(0,0,0,0.25)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-105
            hover:bg-white
            hover:text-black
            sm:right-7
            sm:top-7
          "
        >
          {audibleVideo === "gallery" ? (
            <Volume2
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          ) : (
            <VolumeX
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}
        </button>

        {/* LIGHT PREMIUM WASH */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-[1]
          
          "
        />

        {/* VIDEO DEPTH GRADIENT */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-[2]
           
          "
        />

        {/* SILVER LIGHT */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-[3]
           
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-0 z-[4]
            h-px w-[calc(100%-32px)]
            max-w-[1760px]
            -translate-x-1/2
         

            sm:w-[calc(100%-64px)]
          "
        />

        {/* HEADING */}

        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            relative z-10
            mx-auto mb-8 flex
            max-w-[1920px]
            items-end justify-between
            gap-6 px-4

            sm:mb-10
            sm:px-7

            md:px-9

            lg:px-12

            xl:px-16

            2xl:px-20
          "
        >
          <div>
            <p
              className="
                m-0
                text-[7px]
                font-semibold uppercase
                tracking-[0.3em]
                text-black/38
              "
            >
              Field notes
            </p>

            <h3
              className="
                mb-0 mt-2
                text-[clamp(3rem,10vw,5.8rem)]
                font-medium
                leading-none
                tracking-[-0.06em]
                text-[#11100e]
              "
              style={{
                fontFamily: luxuryFont.style.fontFamily,
              }}
            >
              The{" "}

              <em
                className="
                  font-normal italic
                  text-white
                "
              >
                outdoors
              </em>
            </h3>
          </div>

          <div
            className="
              hidden items-center gap-3

              sm:flex
            "
          >
            <span
              className="
                text-[7px]
                font-semibold uppercase
                tracking-[0.25em]
                text-black/35
              "
            >
              Continuous journey
            </span>

            <span className="h-px w-16 bg-black/24" />
          </div>
        </motion.div>

        {/* CONTINUOUS IMAGE MARQUEE */}

        <div
          className="
            relative z-10 w-full
            overflow-hidden py-4
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-y-0 left-0 z-20
              w-12
              bg-gradient-to-r
              from-white/90
              to-transparent

              sm:w-24

              lg:w-36
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-y-0 right-0 z-20
              w-12
              bg-gradient-to-l
              from-white/90
              to-transparent

              sm:w-24

              lg:w-36
            "
          />

          {reduceMotion ? (
            <div
              className="
                flex gap-4
                overflow-x-auto
                px-4 pb-3
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden

                sm:gap-5
                sm:px-7

                lg:gap-6
                lg:px-12
              "
            >
              {adventureGallery.map((item) => (
                <AdventureCard
                  key={`reduced-${item.number}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 52,
                ease: "linear",
                repeat: Infinity,
              }}
              className="
                flex w-max
                transform-gpu
                will-change-transform
              "
            >
              <div
                className="
                  flex shrink-0
                  gap-4 pr-4

                  sm:gap-5
                  sm:pr-5

                  lg:gap-6
                  lg:pr-6
                "
              >
                {adventureGallery.map((item) => (
                  <AdventureCard
                    key={`primary-${item.number}`}
                    item={item}
                  />
                ))}
              </div>

              <div
                aria-hidden="true"
                className="
                  flex shrink-0
                  gap-4 pr-4

                  sm:gap-5
                  sm:pr-5

                  lg:gap-6
                  lg:pr-6
                "
              >
                {adventureGallery.map((item) => (
                  <AdventureCard
                    key={`duplicate-${item.number}`}
                    item={item}
                    decorative
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div
          className="
            relative z-10
            mx-auto mt-5 flex
            max-w-[1920px]
            items-center gap-3
            px-4

            sm:px-7

            md:px-9

            lg:px-12

            xl:px-16

            2xl:px-20
          "
        >
          <span
            className="
              text-[7px]
              font-semibold uppercase
              tracking-[0.25em]
              text-black/35
            "
          >
            Mountain · Snow · Camping · Sunrise · Road Trips
          </span>

          <span
            aria-hidden="true"
            className="
              h-px flex-1
              bg-gradient-to-r
              from-black/22
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}