"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
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

type ArtistCard = {
  title: string;
  eyebrow: string;
  description: string;
  video: string;
 
};

type TheArtistSectionProps = {
  enterFrom?: "left" | "right";
};

const artistCards: ArtistCard[] = [
  {
    title: "Signature Sound",
    eyebrow: "Techno & Trance",
    description:
      "Powerful rhythms, seamless transitions and emotionally driven sets.",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784537170/jkayyofficial_3_ggonwj.mp4",
   
  },
  {
    title: "Live Performances",
    eyebrow: "Energy In Motion",
    description:
      "Every audience is different. Every performance is built around energy, connection and unforgettable moments.",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784537173/jkayyofficial_2_h963q1.mp4",
  
  },
  {
    title: "Reading The Crowd",
    eyebrow: "Connection First",
    description:
      "Understanding people is what transforms a performance into an experience.",
    video:
      "https://res.cloudinary.com/dl9zkv77/video/upload/v1784537175/jkayyofficial_4_sdexiy.mp4",
 
  },
];

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function TheArtistSection({
  enterFrom = "right",
}: TheArtistSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const videosPreloadedRef = useRef(false);
  const playbackRequestRef = useRef(0);
  const mobileActiveCardRef = useRef<number | null>(null);
  const mobileAudioUnlockedRef = useRef(false);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const [playingCard, setPlayingCard] = useState<number | null>(null);

  const [audibleCard, setAudibleCard] = useState<number | null>(null);

  const [sectionReady, setSectionReady] = useState(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [panelHeight, setPanelHeight] = useState(0);

  const reduceMotion = useReducedMotion();

  /*
   * Measure the complete Artist panel. Tall layouts scroll
   * naturally first, then hold their final position while
   * the next section travels in from the left.
   */
  useLayoutEffect(() => {
    const panel = panelRef.current;

    if (!panel) return;

    const updatePanelHeight = () => {
      setPanelHeight(panel.offsetHeight);
    };

    updatePanelHeight();

    const resizeObserver = new ResizeObserver(updatePanelHeight);

    resizeObserver.observe(panel);
    window.addEventListener("resize", updatePanelHeight, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePanelHeight);
    };
  }, []);

  const stickyTop =
    panelHeight > 0 ? `min(0px, calc(100svh - ${panelHeight}px))` : "0px";

  /*
   * Starts loading video data before the section
   * fully enters the viewport.
   */
  const shouldPreload = useInView(sectionRef, {
    amount: 0,
    margin: "450px 0px 450px 0px",
  });

  /*
   * Controls loader, playback cleanup and content
   * animations when the section is actually visible.
   */
  const isInView = useInView(sectionRef, {
    amount: 0.08,
    margin: "120px 0px 120px 0px",
  });

  /*
   * Side-entry animation based on native scrolling.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  /*
   * Spring smoothing removes hard scroll movement
   * and keeps the side reveal fluid.
   */
  const smoothEntrance = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    mass: 0.72,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const enteringX = enterFrom === "right" ? "102%" : "-102%";

  const artistX = useTransform(
    smoothEntrance,
    [0, 0.08, 0.88, 1],
    [enteringX, enteringX, "0%", "0%"],
  );

  const artistScale = useTransform(
    smoothEntrance,
    [0, 0.52, 1],
    [0.985, 0.996, 1],
  );

  const artistRadius = useTransform(smoothEntrance, [0, 0.72, 1], [42, 20, 0]);

  const edgeOpacity = useTransform(
    smoothEntrance,
    [0, 0.14, 0.8, 1],
    [0, 0.8, 0.3, 0],
  );

  /*
   * Store each video element without muting it again on every React render.
   * The data flag is important because callback refs can run repeatedly.
   */
  const setVideoElementRef = useCallback(
    (index: number, element: HTMLVideoElement | null) => {
      videoRefs.current[index] = element;

      if (!element || element.dataset.artistVideoReady === "true") {
        return;
      }

      element.muted = true;
      element.defaultMuted = true;
      element.volume = 1;
      element.playsInline = true;
      element.dataset.artistVideoReady = "true";
    },
    [],
  );

  /*
   * Pause every video except the selected video.
   */
  const pauseOtherVideos = useCallback((selectedIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (!video || index === selectedIndex) return;

      /*
       * Mute first so sound stops immediately, even before
       * the pause operation has completed.
       */
      video.muted = true;
      video.defaultMuted = true;

      if (!video.paused) {
        video.pause();
      }
    });

    setAudibleCard((current) =>
      current === selectedIndex ? current : null,
    );
  }, []);

  /*
   * Stop all playback and invalidate any older
   * unfinished play request.
   */
  const stopAllVideos = useCallback(() => {
    playbackRequestRef.current += 1;

    videoRefs.current.forEach((video) => {
      if (!video) return;

      video.muted = true;
      video.defaultMuted = true;

      if (!video.paused) {
        video.pause();
      }
    });

    setPlayingCard(null);
    setAudibleCard(null);
  }, []);

  /*
   * Play the selected card video.
   * Desktop requests sound on hover.
   * Mobile requests sound after the visitor taps a card once.
   */
  const playCardVideo = useCallback(
    async (index: number, enableSound = false) => {
      const video = videoRefs.current[index];

      setActiveCard(index);
      pauseOtherVideos(index);

      if (!video) return;

      playbackRequestRef.current += 1;
      const requestId = playbackRequestRef.current;

      /*
       * Audible playback is requested only from a real user gesture:
       * desktop hover or a mobile card tap. Mobile viewport autoplay
       * remains muted until the first tap unlocks audio.
       */
      const shouldPlayWithSound = enableSound;

      video.volume = 1;
      video.muted = !shouldPlayWithSound;
      video.defaultMuted = !shouldPlayWithSound;
      video.playsInline = true;
      video.preload = "auto";

      try {
        await video.play();

        if (requestId === playbackRequestRef.current) {
          setPlayingCard(index);
          setAudibleCard(video.muted ? null : index);
        }
      } catch {
        /*
         * Some browsers can still reject audible playback when the
         * gesture has expired. Keep a muted fallback so playback never
         * breaks; another direct tap will retry sound.
         */
        if (shouldPlayWithSound) {
          video.muted = true;
          video.defaultMuted = true;

          try {
            await video.play();

            if (requestId === playbackRequestRef.current) {
              setPlayingCard(index);
              setAudibleCard(null);
            }

            return;
          } catch {
            // Continue to the shared failed-play state below.
          }
        }

        if (requestId === playbackRequestRef.current) {
          setPlayingCard(null);
          setAudibleCard(null);
        }
      }
    },
    [isTouchDevice, pauseOtherVideos],
  );

  /*
   * Detect touch-first/mobile devices. These devices do not
   * have true hover, so playback follows viewport visibility.
   */
  useEffect(() => {
    const inputModeQuery = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    );

    const updateInputMode = () => {
      setIsTouchDevice(inputModeQuery.matches);
    };

    updateInputMode();

    inputModeQuery.addEventListener("change", updateInputMode);

    return () => {
      inputModeQuery.removeEventListener("change", updateInputMode);
    };
  }, []);

  /*
   * On mobile, automatically play the card that occupies the
   * largest part of the central viewport. No tap is required.
   */
  useEffect(() => {
    if (!isTouchDevice || !sectionReady) {
      mobileActiveCardRef.current = null;
      return;
    }

    const visibilityRatios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex(
            (card) => card === entry.target,
          );

          if (index === -1) return;

          visibilityRatios.set(
            index,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let nextCard: number | null = null;
        let highestRatio = 0;

        visibilityRatios.forEach((ratio, index) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            nextCard = index;
          }
        });

        if (highestRatio < 0.42) {
          nextCard = null;
        }

        if (mobileActiveCardRef.current === nextCard) {
          return;
        }

        mobileActiveCardRef.current = nextCard;

        if (nextCard === null) {
          stopAllVideos();
          setActiveCard(null);
          return;
        }

        void playCardVideo(
          nextCard,
          mobileAudioUnlockedRef.current,
        );
      },
      {
        root: null,
        rootMargin: "-12% 0px -12% 0px",
        threshold: [0, 0.2, 0.42, 0.6, 0.8, 1],
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
      mobileActiveCardRef.current = null;
      stopAllVideos();
      setActiveCard(null);
    };
  }, [isTouchDevice, playCardVideo, sectionReady, stopAllVideos]);

  /*
   * Run section loading animation once.
   */
  useEffect(() => {
    if (!isInView || sectionReady) return;

    if (reduceMotion) {
      setSectionReady(true);
      return;
    }

    const timer = window.setTimeout(
      () => {
        setSectionReady(true);
      },
      isTouchDevice ? 260 : 560,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [isInView, isTouchDevice, reduceMotion, sectionReady]);

  /*
   * Begin loading all three video files shortly
   * before the section enters the viewport.
   *
   * Videos remain paused until desktop hover or mobile viewport activation.
   */
  useEffect(() => {
    if (!shouldPreload || videosPreloadedRef.current) {
      return;
    }

    videosPreloadedRef.current = true;

    videoRefs.current.forEach((video) => {
      if (!video) return;

      video.muted = true;
      video.defaultMuted = true;
      video.preload = isTouchDevice ? "metadata" : "auto";

      /*
       * Calling load once prepares playback without
       * automatically starting the video.
       */
      video.load();
    });
  }, [isTouchDevice, shouldPreload]);

  /*
   * Pause everything when the section leaves
   * the screen.
   */
  useEffect(() => {
    if (isInView) return;

    stopAllVideos();
    setActiveCard(null);
  }, [isInView, stopAllVideos]);

  /*
   * Pause videos if the browser tab becomes hidden.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAllVideos();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      stopAllVideos();
    };
  }, [stopAllVideos]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.08,
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const revealVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 26,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.85,
        ease: LUXURY_EASE,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="the-artist"
      className="
        relative
        z-30
        w-full
        overflow-x-clip
        bg-transparent
        lg:-mt-[100svh]
      "
    >
      {/* =========================================
          SIDE-ENTRY SECTION WRAPPER
      ========================================== */}

      <motion.div
        ref={panelRef}
        style={{
          top: stickyTop,
          x: reduceMotion ? "0%" : artistX,
          scale: reduceMotion ? 1 : artistScale,
          borderTopLeftRadius: reduceMotion ? 0 : artistRadius,
          borderTopRightRadius: reduceMotion ? 0 : artistRadius,
        }}
        className="
          sticky
          relative
          isolate
          w-full
          transform-gpu
          overflow-hidden
          bg-white
          text-[#090909]
          shadow-[-24px_0_80px_rgba(0,0,0,0.16)]
          [contain:paint]
          will-change-transform
        "
      >
        {/* ENTERING EDGE */}

        <motion.div
          aria-hidden="true"
          style={{
            opacity: reduceMotion ? 0 : edgeOpacity,
          }}
          className={`
            pointer-events-none
            absolute
            bottom-0
            top-0
            z-[120]
            w-px
            bg-gradient-to-b
            from-transparent
            via-black/35
            to-transparent
            ${enterFrom === "right" ? "left-0" : "right-0"}
          `}
        />

        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            animate={{
              top: ["-25%", "110%"],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
            className={`
              pointer-events-none
              absolute
              z-[125]
              h-40
              w-[2px]
              bg-gradient-to-b
              from-transparent
              via-black/40
              to-transparent
              ${enterFrom === "right" ? "left-0" : "right-0"}
            `}
          />
        )}

        {/* =========================================
            SECTION LOADER
        ========================================== */}

        <AnimatePresence>
          {isInView && !sectionReady && (
            <motion.div
              key="artist-loader"
              initial={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                visibility: "hidden",
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.48,
                ease: LUXURY_EASE,
              }}
              className="
                absolute
                inset-x-0
                top-0
                z-[100]
                flex
                min-h-[100svh]
                items-center
                justify-center
                overflow-hidden
                bg-white
              "
            >
              <motion.span
                aria-hidden="true"
                initial={{
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  opacity: [0, 0.035, 0.035],
                  scale: [0.92, 1, 1.025],
                }}
                transition={{
                  duration: 0.95,
                  ease: LUXURY_EASE,
                }}
                className="
                  pointer-events-none
                  absolute
                  select-none
                  text-[clamp(13rem,44vw,40rem)]
                  font-semibold
                  leading-none
                  tracking-[-0.12em]
                  text-black
                "
                style={{
                  fontFamily: luxuryFont.style.fontFamily,
                }}
              >
                03
              </motion.span>

              <div
                className="
                  relative
                  z-10
                  flex
                  w-[min(82vw,520px)]
                  flex-col
                  items-center
                "
              >
                <motion.span
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: LUXURY_EASE,
                  }}
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.45em]
                    text-black/50
                    sm:text-[9px]
                    sm:tracking-[0.5em]
                  "
                  style={{
                    fontFamily: cleanFont.style.fontFamily,
                  }}
                >
                  03 / The Artist
                </motion.span>

                <div
                  className="
                    relative
                    mt-6
                    h-px
                    w-full
                    overflow-hidden
                    bg-black/10
                  "
                >
                  <motion.span
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 0.85,
                      delay: 0.08,
                      ease: LUXURY_EASE,
                    }}
                    className="
                      absolute
                      inset-0
                      origin-left
                      bg-black
                    "
                  />
                </div>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0.45],
                  }}
                  transition={{
                    duration: 0.85,
                    delay: 0.16,
                    ease: "easeInOut",
                  }}
                  className="
                    mb-0
                    mt-5
                    text-center
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.25em]
                    text-black/50
                    sm:text-[9px]
                    sm:tracking-[0.3em]
                  "
                  style={{
                    fontFamily: cleanFont.style.fontFamily,
                  }}
                >
                  Sound · Energy · Connection
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================
            BACKGROUND TYPOGRAPHY
        ========================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[6%]
            z-0
            -translate-x-1/2
            select-none
            whitespace-nowrap
            text-[clamp(6rem,20vw,20rem)]
            font-semibold
            uppercase
            leading-none
            tracking-[-0.09em]
            text-black/[0.025]
          "
          style={{
            fontFamily: luxuryFont.style.fontFamily,
          }}
        >
          Artist
        </div>

        {/* TOP BORDER */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            z-20
            h-px
            w-[calc(100%-32px)]
            max-w-[1760px]
            -translate-x-1/2
            bg-black/10
            sm:w-[calc(100%-64px)]
          "
        />

        {/* =========================================
            MAIN CONTENT
        ========================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionReady ? "visible" : "hidden"}
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-[1920px]
            px-4
            pb-14
            pt-16
            sm:px-7
            sm:pb-20
            sm:pt-24
            md:px-9
            lg:px-12
            lg:pb-24
            lg:pt-28
            xl:px-16
            2xl:px-20
          "
          style={{
            fontFamily: cleanFont.style.fontFamily,
          }}
        >
          {/* =========================================
              HEADING
          ========================================== */}

          <div
            className="
              mx-auto
              mb-10
              flex
              max-w-[1650px]
              flex-col
              gap-7
              sm:mb-14
              lg:mb-16
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <motion.div variants={revealVariants} className="max-w-[980px]">
              
                

                <motion.span
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: sectionReady ? 1 : 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.85,
                    delay: reduceMotion ? 0 : 0.2,
                    ease: LUXURY_EASE,
                  }}
                  className="
                    h-px
                    w-10
                    origin-left
                    bg-black/30
                    sm:w-16
                  "
                />

               
              

              <h2
                className="
                  m-0
                  max-w-[1000px]
                  text-[clamp(3.7rem,18vw,6rem)]
                  font-medium
                  leading-[0.8]
                  tracking-[-0.075em]
                  text-black
                  sm:text-[clamp(5rem,12vw,8rem)]
                  lg:text-[clamp(6rem,8vw,9.5rem)]
                "
                style={{
                  fontFamily: luxuryFont.style.fontFamily,
                }}
              >
                The{" "}
                <em
                  className="
                    font-normal
                    italic
                    text-black/35
                  "
                >
                  Artist
                </em>
              </h2>
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="
                max-w-[450px]
                border-l
                border-black/20
                pl-4
                sm:pl-7
                lg:mb-2
              "
            >
              <p
                className="
                  m-0
                  text-[clamp(0.94rem,1.4vw,1.2rem)]
                  font-medium
                  leading-[1.6]
                  tracking-[-0.02em]
                  text-black/70
                "
              >
                Every set is shaped by instinct, emotion and the energy moving
                through the room.
              </p>
            </motion.div>
          </div>

          {/* =========================================
              RESPONSIVE VIDEO CARDS
          ========================================== */}

          <motion.div
            variants={revealVariants}
            onMouseLeave={() => {
              stopAllVideos();
              setActiveCard(null);
            }}
            className="
              mx-auto
              flex
              max-w-[1760px]
              flex-col
              gap-4
              sm:gap-5
              lg:h-[clamp(570px,74svh,820px)]
              lg:flex-row
              lg:gap-4
            "
          >
            {artistCards.map((card, index) => {
              const isActive = activeCard === index;

              const isPlaying = playingCard === index;

              const hasSound = audibleCard === index;

              const cardStyle = {
                "--artist-card-grow": isActive ? 1.72 : 1,
              } as CSSProperties;

              return (
                <motion.article
                  key={card.title}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  aria-label={`${card.title} video card`}
                  style={cardStyle}
                  onPointerEnter={(event) => {
                    if (isTouchDevice || event.pointerType === "touch") {
                      return;
                    }

                    void playCardVideo(index, true);
                  }}
                  onPointerLeave={(event) => {
                    if (isTouchDevice || event.pointerType === "touch") {
                      return;
                    }

                    stopAllVideos();
                    setActiveCard(null);
                  }}
                  onClick={() => {
                    if (!isTouchDevice) return;

                    /*
                     * Mobile browsers require a real tap before they
                     * permit sound. After this first tap, the card in
                     * the central viewport will continue with audio.
                     */
                    mobileAudioUnlockedRef.current = true;
                    mobileActiveCardRef.current = index;

                    void playCardVideo(index, true);
                  }}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 32,
                  }}
                  animate={{
                    opacity: sectionReady ? 1 : 0,
                    y: sectionReady ? 0 : reduceMotion ? 0 : 32,
                  }}
                  transition={{
                    opacity: {
                      duration: reduceMotion ? 0 : 0.72,
                      delay: reduceMotion ? 0 : 0.14 + index * 0.08,
                      ease: LUXURY_EASE,
                    },
                    y: {
                      duration: reduceMotion ? 0 : 0.8,
                      delay: reduceMotion ? 0 : 0.14 + index * 0.08,
                      ease: LUXURY_EASE,
                    },
                  }}
                  className={`
                    group
                    relative
                    h-[72svh]
                    min-h-[500px]
                    max-h-[680px]
                    w-full
                    select-none
                    touch-pan-y
                    overflow-hidden
                    rounded-[24px]
                    border
                    bg-[#101010]
                    transform-gpu
                    transition-[border-color,box-shadow]
                    duration-500
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    lg:transition-[flex-grow,border-color,box-shadow]
                    lg:duration-700
                    sm:min-h-[560px]
                    sm:max-h-[720px]
                    sm:rounded-[30px]
                    lg:h-full
                    lg:min-h-0
                    lg:max-h-none
                    lg:basis-0
                    lg:[flex-grow:var(--artist-card-grow)]
                    ${
                      isActive
                        ? "border-black/25 shadow-[0_28px_90px_rgba(0,0,0,0.2)]"
                        : "border-black/10 shadow-[0_20px_65px_rgba(0,0,0,0.11)]"
                    }
                  `}
                >
                  {/* VIDEO */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      overflow-hidden
                      bg-[#111111]
                    "
                  >
                    <video
                      ref={(element) => {
                        setVideoElementRef(index, element);
                      }}
                      loop
                      playsInline
                      preload="metadata"
                     
                      disablePictureInPicture
                      controlsList="nodownload noremoteplayback"
                      aria-hidden="true"
                      tabIndex={-1}
                      onPlay={() => {
                        setPlayingCard(index);
                      }}
                      onPause={() => {
                        setPlayingCard((current) =>
                          current === index ? null : current,
                        );
                        setAudibleCard((current) =>
                          current === index ? null : current,
                        );
                      }}
                      className={`
                        h-full
                        w-full
                        object-cover
                        object-center
                        transform-gpu
                        transition-[transform,filter,opacity]
                        duration-[1100ms]
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        will-change-transform
                        ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-[1.045] opacity-90 lg:scale-[1.075]"
                        }
                        ${isPlaying ? "grayscale-0" : "grayscale-[18%]"}
                      `}
                      style={{
                        transformOrigin: "center",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <source src={card.video} type="video/mp4" />
                    </video>
                  </div>

                  {/* CINEMATIC OVERLAYS */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-b
                      from-black/10
                      via-black/5
                      to-black/90
                    "
                  />

                  <div
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      transition-colors
                      duration-700
                      ${isActive ? "bg-black/5" : "bg-black/18 lg:bg-black/28"}
                    `}
                  />

                  {/* TOP CARD DETAILS */}

                  <div
                    className="
                      absolute
                      left-4
                      right-4
                      top-4
                      z-20
                      flex
                      items-start
                      justify-between
                      sm:left-6
                      sm:right-6
                      sm:top-6
                      xl:left-8
                      xl:right-8
                      xl:top-8
                    "
                  >
                    <div
                      className={`
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3
                        py-2
                        md:backdrop-blur-md
                        transition-all
                        duration-500
                        ${
                          isPlaying
                            ? "border-white/50 bg-white text-black"
                            : "border-white/20 bg-black/35 text-white"
                        }
                      `}
                    >
                      <span
                        className={`
                          h-1.5
                          w-1.5
                          rounded-full
                          transition-all
                          duration-500
                          ${
                            isPlaying
                              ? "animate-pulse bg-black opacity-100"
                              : "bg-white opacity-65"
                          }
                        `}
                      />

                      <span
                        className="
                          text-[7px]
                          font-semibold
                          uppercase
                          tracking-[0.2em]
                          sm:text-[8px]
                          sm:tracking-[0.24em]
                        "
                      >
                        {isPlaying
                          ? hasSound
                            ? "Sound on"
                            : isTouchDevice
                              ? "Tap for sound"
                              : "Playing"
                          : isTouchDevice
                            ? "Tap for sound"
                            : "Hover for sound"}
                      </span>
                    </div>
                  </div>

                  {/* GLASS CONTENT PANEL */}

                  <div
                    className={`
                      absolute
                      bottom-3
                      left-3
                      right-3
                      z-20
                      overflow-hidden
                      rounded-[20px]
                      border
                      p-5
                      shadow-[0_18px_60px_rgba(0,0,0,0.24)]
                      md:backdrop-blur-md
                      transition-[background-color,border-color,transform]
                      duration-700
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      sm:bottom-5
                      sm:left-5
                      sm:right-5
                      sm:rounded-[25px]
                      sm:p-7
                      lg:p-6
                      xl:p-8
                      ${
                        isActive
                          ? "translate-y-0 border-white/30 bg-black/38 md:bg-black/25"
                          : "translate-y-0 border-white/20 bg-black/32 md:bg-black/20 lg:translate-y-1"
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className={`
                          h-px
                          bg-white/65
                          transition-[width]
                          duration-700
                          ${isActive ? "w-12" : "w-8"}
                        `}
                      />

                      <p
                        className="
                          m-0
                          text-[7px]
                          font-semibold
                          uppercase
                          tracking-[0.26em]
                          text-white/70
                          sm:text-[8px]
                          sm:tracking-[0.32em]
                        "
                      >
                        {card.eyebrow}
                      </p>
                    </div>

                    <h3
                      className={`
                        mb-0
                        mt-4
                        font-medium
                        leading-[0.9]
                        tracking-[-0.055em]
                        text-white
                        transition-[font-size,opacity]
                        duration-700
                        sm:mt-5
                        ${
                          isActive
                            ? "text-[clamp(2.7rem,11vw,4.8rem)] lg:text-[clamp(2.8rem,4vw,5.2rem)]"
                            : "text-[clamp(2.5rem,10vw,4.4rem)] lg:text-[clamp(2rem,2.7vw,3.5rem)]"
                        }
                      `}
                      style={{
                        fontFamily: luxuryFont.style.fontFamily,
                      }}
                    >
                      {card.title}
                    </h3>

                    <div
                      className="
                        relative
                        mt-4
                        h-px
                        w-full
                        overflow-hidden
                        bg-white/20
                        sm:mt-5
                      "
                    >
                      <span
                        className={`
                          absolute
                          inset-y-0
                          left-0
                          bg-white
                          transition-[width]
                          duration-700
                          ease-[cubic-bezier(0.16,1,0.3,1)]
                          ${isActive ? "w-full" : "w-12"}
                        `}
                      />
                    </div>

                    <p
                      className={`
                        mb-0
                        mt-4
                        max-w-[520px]
                        text-[clamp(0.9rem,2.7vw,1.05rem)]
                        font-light
                        leading-[1.65]
                        text-white/75
                        transition-[opacity,transform]
                        duration-700
                        sm:mt-5
                        ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-75 lg:opacity-60"
                        }
                      `}
                    >
                      {card.description}
                    </p>

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        gap-3
                        sm:mt-6
                      "
                    ></div>
                  </div>

                  {/* ACTIVE BORDER */}

                  <div
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-[inherit]
                      border
                      transition-colors
                      duration-700
                      ${isActive ? "border-white/40" : "border-white/10"}
                    `}
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>

        {/* BOTTOM BORDER */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            z-20
            h-px
            w-[calc(100%-32px)]
            max-w-[1760px]
            -translate-x-1/2
            bg-black/10
            sm:w-[calc(100%-64px)]
          "
        />
      </motion.div>

      {/*
       * Hold distance shared with FitnessDisciplineSection.
       * The next section uses -mt-[100svh], so it overlaps
       * this phase while the Artist panel stays pinned.
       */}
      <div aria-hidden="true" className="h-[100svh] w-full" />
    </section>
  );
}