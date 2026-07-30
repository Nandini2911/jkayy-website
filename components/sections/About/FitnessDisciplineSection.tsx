"use client";

import {
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
  useRef,
  useState,
  type ReactNode,
  type RefObject,
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

const FITNESS_VIDEO = "https://cdn.shopify.com/videos/c/o/v/8aa0d31ccb11478c8f6a4ca590bd8a0e.mp4";
const FITNESS_POSTER = "jkgym2.webp";

const disciplinePoints = ["Strength", "Focus", "Consistency"];

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
const MOBILE_BREAKPOINT = 768;

type EntranceProps = {
  children: ReactNode;
  sectionRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean | null;
};

type MobileEntranceProps = {
  children: ReactNode;
  hasEntered: boolean;
  reduceMotion: boolean | null;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener("change", updateDevice);

    return () => {
      mediaQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  return isMobile;
}

function MobileEntrance({
  children,
  hasEntered,
  reduceMotion,
}: MobileEntranceProps) {
  return (
    <motion.div
      initial={reduceMotion ? false : { x: "-100%" }}
      animate={{
        x: reduceMotion || hasEntered ? "0%" : "-100%",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.68,
        ease: LUXURY_EASE,
      }}
      style={{
        transformOrigin: "left center",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      className="
        relative isolate min-h-[100svh] w-full
        transform-gpu overflow-hidden
        bg-[#101113] text-[#f4f4f1]
        shadow-[14px_0_42px_rgba(0,0,0,0.38)]
        [contain:layout_paint_style]
      "
    >
      {children}
    </motion.div>
  );
}

function DesktopEntrance({
  children,
  sectionRef,
  reduceMotion,
}: EntranceProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const smoothEntrance = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    mass: 0.72,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const sectionX = useTransform(
    smoothEntrance,
    [0, 0.08, 0.88, 1],
    ["-102%", "-102%", "0%", "0%"],
  );

  const sectionScale = useTransform(
    smoothEntrance,
    [0, 0.7, 1],
    [0.995, 0.999, 1],
  );

  const sectionRadius = useTransform(
    smoothEntrance,
    [0, 0.75, 1],
    [32, 14, 0],
  );

  const entranceLineOpacity = useTransform(
    smoothEntrance,
    [0, 0.12, 0.82, 1],
    [0, 0.7, 0.18, 0],
  );

  return (
    <motion.div
      style={{
        x: reduceMotion ? "0%" : sectionX,
        scale: reduceMotion ? 1 : sectionScale,
        borderTopLeftRadius: reduceMotion ? 0 : sectionRadius,
        borderTopRightRadius: reduceMotion ? 0 : sectionRadius,
        transformOrigin: "left center",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      className="
        relative isolate min-h-[100svh] w-full
        transform-gpu overflow-hidden
        bg-[#101113] text-[#f4f4f1]
        shadow-[24px_0_80px_rgba(0,0,0,0.42)]
        [contain:paint] will-change-transform
      "
    >
      <motion.div
        aria-hidden="true"
        style={{
          opacity: reduceMotion ? 0 : entranceLineOpacity,
        }}
        className="
          pointer-events-none absolute
          inset-y-0 right-0 z-50 w-px
          bg-gradient-to-b
          from-transparent via-white/35 to-transparent
        "
      />

      {children}
    </motion.div>
  );
}

export default function FitnessDisciplineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoFrameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const soundOnRef = useRef(false);

  const [isSoundOn, setIsSoundOn] = useState(false);

  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const hasEntered = useInView(sectionRef, {
    once: true,
    amount: isMobile ? 0.025 : 0.08,
    margin: isMobile
      ? "0px 0px -2% 0px"
      : "0px 0px -5% 0px",
  });

  const isVideoVisible = useInView(videoFrameRef, {
    amount: isMobile ? 0.12 : 0.3,
    margin: isMobile
      ? "-4% 0px -4% 0px"
      : "-8% 0px -8% 0px",
  });

  const setVideoSound = useCallback((enabled: boolean) => {
    const video = videoRef.current;

    soundOnRef.current = enabled;
    setIsSoundOn(enabled);

    if (!video) return;

    video.volume = 1;
    video.muted = !enabled;
    video.defaultMuted = !enabled;
  }, []);

  const handleMobileSoundToggle = useCallback(async () => {
    if (!isMobile || !isVideoVisible) return;

    const video = videoRef.current;

    if (!video) return;

    if (soundOnRef.current) {
      setVideoSound(false);
      return;
    }

    setVideoSound(true);

    try {
      await video.play();
    } catch {
      /*
       * Mobile browsers require a real tap before audible
       * playback. If the request is still blocked, keep the
       * video playing silently rather than breaking playback.
       */
      setVideoSound(false);
      await video.play().catch(() => undefined);
    }
  }, [isMobile, isVideoVisible, setVideoSound]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.volume = 1;
    video.playsInline = true;

    if (
      !isVideoVisible ||
      document.visibilityState !== "visible"
    ) {
      setVideoSound(false);
      video.pause();
      return;
    }

    /*
     * Start in muted mode. Desktop sound is enabled only
     * during hover; mobile sound is enabled only after a tap.
     */
    if (!soundOnRef.current) {
      video.muted = true;
      video.defaultMuted = true;
    }

    const playDelay = window.setTimeout(() => {
      video.play().catch(() => undefined);
    }, isMobile ? 180 : 0);

    return () => {
      window.clearTimeout(playDelay);
      video.pause();
    };
  }, [isMobile, isVideoVisible, setVideoSound]);

  useEffect(() => {
    if (!isMobile) return;

    let resumeTimerId = 0;

    const pauseWhileScrolling = () => {
      const video = videoRef.current;

      if (!video) return;

      if (!video.paused) {
        video.pause();
      }

      if (resumeTimerId) {
        window.clearTimeout(resumeTimerId);
      }

      resumeTimerId = window.setTimeout(() => {
        const currentVideo = videoRef.current;

        if (
          currentVideo &&
          isVideoVisible &&
          document.visibilityState === "visible"
        ) {
          currentVideo.play().catch(() => undefined);
        }
      }, 170);
    };

    window.addEventListener("scroll", pauseWhileScrolling, {
      passive: true,
    });

    window.addEventListener("touchmove", pauseWhileScrolling, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        pauseWhileScrolling,
      );

      window.removeEventListener(
        "touchmove",
        pauseWhileScrolling,
      );

      if (resumeTimerId) {
        window.clearTimeout(resumeTimerId);
      }
    };
  }, [isMobile, isVideoVisible]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;

      if (!video) return;

      if (document.visibilityState !== "visible") {
        setVideoSound(false);
        video.pause();
        return;
      }

      if (isVideoVisible) {
        video.play().catch(() => undefined);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [isVideoVisible, setVideoSound]);

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion || isMobile ? 0 : 24,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: reduceMotion
          ? 0
          : isMobile
            ? 0.38
            : 0.9,

        ease: LUXURY_EASE,
      },
    },
  };

  const container = {
    hidden: {},

    visible: {
      transition: {
        delayChildren: reduceMotion
          ? 0
          : isMobile
            ? 0.24
            : 0.08,

        staggerChildren: reduceMotion
          ? 0
          : isMobile
            ? 0.035
            : 0.1,
      },
    },
  };

  const content = (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          block
        "
        style={{
          background: `
            radial-gradient(
              circle at 82% 8%,
              rgba(255,255,255,0.22) 0%,
              rgba(255,255,255,0.08) 18%,
              transparent 38%
            ),
            radial-gradient(
              circle at 8% 92%,
              rgba(255,255,255,0.10) 0%,
              transparent 34%
            ),
            linear-gradient(
              118deg,
              #07080a 0%,
              #151619 25%,
              #3a3c40 48%,
              #18191c 68%,
              #08090b 100%
            )
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-70
        "
        style={{
          background: `
            linear-gradient(
              135deg,
              transparent 0%,
              rgba(255,255,255,0.08) 33%,
              rgba(255,255,255,0.18) 47%,
              rgba(255,255,255,0.04) 58%,
              transparent 76%
            )
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.045]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.32) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.32) 1px, transparent 1px)
          `,
          backgroundSize: "84px 84px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />

      <div
  aria-hidden="true"
  className="
    pointer-events-none
    absolute
    right-[-0vw]
    top-[4vh]
    hidden
    w-full
    select-none
    whitespace-nowrap
    text-right
    text-[clamp(6rem,17vw,18rem)]
    font-medium
    italic
    leading-none
    tracking-[-0.075em]
    text-white/[0.035]
    md:block
  "
  style={{
    fontFamily: luxuryFont.style.fontFamily,
  }}
>
  Discipline
</div>
      <motion.div
        variants={container}
        initial="hidden"
        animate={hasEntered ? "visible" : "hidden"}
        className="
          relative z-10 mx-auto
          flex min-h-[100svh] w-full max-w-[1920px] flex-col
          px-4 py-5
          sm:px-7 sm:py-7
          md:px-9
          lg:px-12 lg:py-10
          xl:px-16
          2xl:px-20
        "
        style={{
          fontFamily: cleanFont.style.fontFamily,
        }}
      >
        <motion.div
          variants={reveal}
          className="
            flex items-center justify-between
            border-b border-white/12
            pb-4 sm:pb-5
          "
        >
          <div className="flex items-center gap-3 sm:gap-4">
           

            <span className="h-px w-9 bg-white/45 sm:w-14" />

            <span
              className="
                text-[8px] font-medium uppercase
                tracking-[0.26em]
                text-white/50
              "
            >
              Fitness &amp; Discipline
            </span>
          </div>

          <span
            className="
              hidden text-[8px] font-medium uppercase
              tracking-[0.24em]
              text-white/38
              sm:block
            "
          >
            Beyond Music
          </span>
        </motion.div>

        <div
          className="
            grid flex-1 grid-cols-1
            gap-8 py-7
            sm:gap-10 sm:py-10
            lg:grid-cols-[minmax(390px,0.88fr)_minmax(480px,1.12fr)]
            lg:items-center lg:gap-16 lg:py-12
            xl:gap-24
          "
        >
          <motion.div
            variants={reveal}
            className="order-1 relative max-w-[850px] lg:order-2 lg:pr-4"
          >
            <p
              className="
                mb-4
                text-[8px] font-semibold uppercase
                tracking-[0.34em]
                text-white/45

                sm:mb-5
                sm:text-[9px]
                sm:tracking-[0.38em]
              "
            >
              Discipline Beyond Music
            </p>

            <h2
              className="
                m-0
                text-[clamp(3.75rem,16vw,6.4rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.07em]
                text-[#f7f7f4]

                sm:text-[clamp(5.7rem,12vw,8.8rem)]
                sm:leading-[0.78]
                sm:tracking-[-0.075em]

                lg:text-[clamp(6rem,7.7vw,9.6rem)]
              "
              style={{
                fontFamily: luxuryFont.style.fontFamily,
              }}
            >
              Before the
              <br />

              <em className="font-normal italic text-white/45">
                spotlight.
              </em>
            </h2>

            <div
              className="
                mt-7
                flex max-w-[650px]
                items-start gap-5

                sm:mt-10
                sm:gap-7
              "
            >
              <motion.span
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: hasEntered ? 1 : 0,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : isMobile
                      ? 0.48
                      : 1.1,

                  delay: reduceMotion
                    ? 0
                    : isMobile
                      ? 0.36
                      : 0.28,

                  ease: LUXURY_EASE,
                }}
                className="
                  mt-1
                  h-20 w-px shrink-0
                  origin-top
                  bg-gradient-to-b
                  from-white/60
                  to-transparent

                  sm:h-28
                "
              />

              <p
                className="
                  m-0 max-w-[560px]
                  text-[clamp(0.98rem,4vw,1.15rem)]
                  font-light
                  leading-[1.68]
                  tracking-[-0.02em]
                  text-white/64

                  sm:text-[clamp(1rem,2.1vw,1.25rem)]
                  sm:leading-[1.72]
                "
              >
                Fitness builds the focus, control and confidence
                carried into every performance.
              </p>
            </div>

            <div className="mt-9 border-y border-white/12 sm:mt-14">
              {disciplinePoints.map((point, index) => (
                <motion.div
                  key={point}
                  variants={reveal}
                  className="
                    group
                    flex items-center justify-between
                    border-b border-white/12
                    py-4
                    last:border-b-0
                    sm:py-5
                  "
                >
                  <div className="flex items-center gap-5 sm:gap-7">
                    

                    <span
                      className="
                        text-[clamp(1.8rem,7vw,3rem)]
                        font-medium
                        leading-none
                        tracking-[-0.04em]
                        text-white/88

                        sm:text-[clamp(1.8rem,5vw,3rem)]
                      "
                      style={{
                        fontFamily: luxuryFont.style.fontFamily,
                      }}
                    >
                      {point}
                    </span>
                  </div>

                  <span
                    className="
                      h-2 w-2 rounded-full
                      border border-white/30

                      md:transition-all
                      md:duration-500
                      md:group-hover:bg-white
                    "
                  />
                </motion.div>
              ))}
            </div>

            <div
              className="
                mt-8
                flex items-end justify-between
                gap-6
                sm:mt-11
              "
            >
              <p
                className="
                  m-0 max-w-[500px]
                  text-[clamp(1.35rem,5vw,2rem)]
                  font-medium italic
                  leading-[1.25]
                  tracking-[-0.035em]
                  text-white/72

                  sm:text-[clamp(1.35rem,3vw,2rem)]
                "
                style={{
                  fontFamily: luxuryFont.style.fontFamily,
                }}
              >
                “The body trains. The mind leads.”
              </p>

              <span
                className="
                  hidden
                  text-[8px] font-semibold uppercase
                  tracking-[0.28em]
                  text-white/30
                  sm:block
                "
              >
                JKAYY 
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={reveal}
            className="
              order-2 relative mx-auto w-full max-w-[680px]
              lg:order-1 lg:mx-0
            "
          >
            <div
              ref={videoFrameRef}
              role={isMobile ? "button" : undefined}
              tabIndex={isMobile ? 0 : undefined}
              aria-label={
                isMobile
                  ? isSoundOn
                    ? "Mute fitness video"
                    : "Play fitness video with sound"
                  : "Fitness and discipline video. Hover for sound."
              }
              onClick={() => {
                void handleMobileSoundToggle();
              }}
              onKeyDown={(event) => {
                if (
                  isMobile &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  void handleMobileSoundToggle();
                }
              }}
              onPointerEnter={(event) => {
                if (isMobile || event.pointerType === "touch") return;

                const video = videoRef.current;

                if (!video || !isVideoVisible) return;

                setVideoSound(true);

                video.play().catch(() => {
                  setVideoSound(false);
                  video.play().catch(() => undefined);
                });
              }}
              onPointerLeave={(event) => {
                if (isMobile || event.pointerType === "touch") return;

                setVideoSound(false);
              }}
              className="
                group relative
                h-[68svh] min-h-[430px] max-h-[590px]
                overflow-hidden rounded-[22px]
                bg-[#090a0c]
                shadow-[0_22px_55px_rgba(0,0,0,0.48)]

                sm:h-auto
                sm:min-h-[650px]
                sm:max-h-none
                sm:aspect-[4/5.35]
                sm:rounded-[32px]
                sm:shadow-[0_34px_100px_rgba(0,0,0,0.55)]

                lg:min-h-[700px]
              "
            >
              <video
                ref={videoRef}
                loop
                playsInline
                preload={isMobile ? "none" : "metadata"}
                poster={FITNESS_POSTER}
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noremoteplayback"
                aria-label="Fitness and discipline training session"
                className="
                  h-full w-full
                  object-cover object-[center_34%]

                  md:transform-gpu
                  md:transition-transform
                  md:duration-[1600ms]
                  md:ease-[cubic-bezier(0.16,1,0.3,1)]
                  md:group-hover:scale-[1.018]
                "
              >
                <source
                  src={FITNESS_VIDEO}
                  type="video/mp4"
                />
              </video>

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                "
                style={{
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.12) 0%,
                      transparent 32%,
                      rgba(0,0,0,0.18) 62%,
                      rgba(0,0,0,0.42) 100%
                    )
                  `,
                }}
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-b
                  from-black/10
                  via-transparent
                  to-black/78
                "
              />

              <div
                className="
                  absolute left-4 right-4 top-4
                  flex items-center justify-between
                  sm:left-6 sm:right-6 sm:top-6
                "
              >
                

               
                 
              </div>

              <div
                className="
                  absolute inset-x-5 bottom-5 z-10
                  sm:inset-x-7 sm:bottom-7
                "
              >
                

                <h3
                  className="
                    mb-0 mt-3
                    max-w-[520px]
                    text-[clamp(2.8rem,10vw,5.4rem)]
                    font-medium
                    leading-[0.86]
                    tracking-[-0.06em]
                    text-white
                  "
                  style={{
                    fontFamily: luxuryFont.style.fontFamily,
                  }}
                >
                  Built in
                  <br />

                  <em className="font-normal italic text-white/60">
                    silence.
                  </em>
                </h3>
              </div>

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  rounded-[inherit]
                  border border-white/15
                "
              />
            </div>

            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                -bottom-3 -right-3 -z-10
                h-[92%] w-[92%]
                rounded-[26px]
                border border-white/12

                sm:-bottom-6 sm:-right-6
                sm:rounded-[36px]
                sm:border-white/15
              "
            />
          </motion.div>
        </div>

        
         

         
        
      </motion.div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="fitness-discipline"
      className="
        relative z-40
        -mt-[100svh] w-full
        overflow-x-clip
        bg-transparent
      "
    >
      {isMobile ? (
        <MobileEntrance
          hasEntered={hasEntered}
          reduceMotion={reduceMotion}
        >
          {content}
        </MobileEntrance>
      ) : (
        <DesktopEntrance
          sectionRef={sectionRef}
          reduceMotion={reduceMotion}
        >
          {content}
        </DesktopEntrance>
      )}
    </section>
  );
}