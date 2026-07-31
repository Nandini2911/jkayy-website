"use client";

import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

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

const SMOOTH_EASE = [
  0.16, 1, 0.3, 1,
] as const;

const BOOKING_EMAIL =
  "booking@jkayy.com";

const navigationLinks = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Events",
    href: "/events",
  },
  {label: "Gallery", 
    href: "/gallery"
},
  {
    label: "Music",
    href: "/music",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

type SocialIconProps = {
  size?: number;
  className?: string;
};

function InstagramIcon({
  size = 22,
  className,
}: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="17.4"
        cy="6.8"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function YouTubeIcon({
  size = 22,
  className,
}: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21 8.1C20.8 6.8 20 5.9 18.7 5.7C16.8 5.4 14.8 5.3 12 5.3C9.2 5.3 7.2 5.4 5.3 5.7C4 5.9 3.2 6.8 3 8.1C2.8 9.3 2.7 10.5 2.7 12C2.7 13.5 2.8 14.7 3 15.9C3.2 17.2 4 18.1 5.3 18.3C7.2 18.6 9.2 18.7 12 18.7C14.8 18.7 16.8 18.6 18.7 18.3C20 18.1 20.8 17.2 21 15.9C21.2 14.7 21.3 13.5 21.3 12C21.3 10.5 21.2 9.3 21 8.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M10 9L15 12L10 15V9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SpotifyIcon({
  size = 22,
  className,
}: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M7.4 9.2C10.7 8.2 14.8 8.4 17.4 9.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M8 12.2C10.8 11.4 14 11.6 16.5 12.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M8.7 15C10.9 14.4 13.5 14.6 15.5 15.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    handle: "@jkayy",
    description:
      "Behind the scenes & live moments",
    href: "https://www.instagram.com/jkayyofficial?igsh=MW4wdGE2b2x0cWlpdA==",
    icon: InstagramIcon,
  },
 
  {
    label: "Spotify",
    handle: "Listen on Spotify",
    description:
      "Original music & latest releases",
    href: "https://open.spotify.com/track/5IVkBMMh6hgRvvEpwXEX1t?si=-hK74JkxTR682C5IPXje_A&utm_source=copy-linkhttps://open.spotify.com/",
    icon: SpotifyIcon,
  },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const currentYear =
    new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion
        ? "auto"
        : "smooth",
    });
  };

  return (
    <footer
      id="contact"
      style={{
        fontFamily:
          cleanFont.style.fontFamily,
      }}
      className="
        relative
        isolate
        overflow-hidden
        bg-[#141414]
        text-white
      "
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        <div className="absolute inset-0 bg-[#141414]" />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    "-5%",
                    "7%",
                    "-5%",
                  ],
                  y: [
                    "-4%",
                    "5%",
                    "-4%",
                  ],
                  scale: [
                    1,
                    1.08,
                    1,
                  ],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-[20%]
            -top-[35%]
            h-[75vw]
            min-h-[560px]
            w-[75vw]
            min-w-[560px]
            rounded-full
            bg-[radial-gradient(circle,rgba(255,255,255,0.085)_0%,rgba(255,255,255,0.025)_42%,transparent_72%)]
            blur-[80px]
            md:blur-[120px]
          "
        />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    "6%",
                    "-8%",
                    "6%",
                  ],
                  y: [
                    "5%",
                    "-5%",
                    "5%",
                  ],
                  scale: [
                    1.05,
                    0.96,
                    1.05,
                  ],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-[40%]
            -right-[20%]
            h-[75vw]
            min-h-[600px]
            w-[75vw]
            min-w-[600px]
            rounded-full
            bg-[radial-gradient(circle,rgba(255,255,255,0.065)_0%,rgba(255,255,255,0.018)_42%,transparent_72%)]
            blur-[90px]
            md:blur-[135px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:radial-gradient(rgba(255,255,255,0.75)_0.55px,transparent_0.55px)]
            [background-size:5px_5px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(20,20,20,0.25)_0%,rgba(15,15,15,0.58)_55%,rgba(8,8,8,0.9)_100%)]
          "
        />
      </div>

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1700px]
          px-5
          pb-6
          pt-20
          sm:px-8
          sm:pt-24
          md:px-12
          md:pb-8
          md:pt-28
          lg:px-16
          lg:pt-32
        "
      >
        {/* TOP BAR */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
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
            duration: 0.8,
            ease: SMOOTH_EASE,
          }}
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              text-[8px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-white
              sm:text-[15px]
              sm:tracking-[0.45em]
            "
          >
            <span
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-white
                to-transparent
              "
            />

            Available Worldwide
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/[0.02]
              text-white
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-white
              hover:bg-white
              hover:text-black
            "
          >
            <ArrowUp
              size={16}
              className="
                transition-transform
                duration-500
                group-hover:-translate-y-0.5
              "
            />
          </button>
        </motion.div>

        {/* BOOKING HERO */}

        <div
          className="
            grid
            gap-12
            border-b
            border-white/10
            py-16
            sm:py-20
            md:grid-cols-12
            md:items-end
            md:gap-8
            lg:py-24
          "
        >
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 42,
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
              duration: 1,
              ease: SMOOTH_EASE,
            }}
            className="
              md:col-span-8
              lg:col-span-9
            "
          >
            <p
              className="
                mb-6
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.4em]
                text-white
                sm:text-[13px]
              "
            >
              Private Events · Festivals ·
              Global Performances
            </p>

            <h2
              style={{
                fontFamily:
                  luxuryFont.style
                    .fontFamily,
              }}
              className="
                max-w-[1120px]
                text-[clamp(2.7rem,6.2vw,7rem)]
                font-medium
                leading-[0.88]
                tracking-[-0.055em]
                text-white
              "
            >
              Let&apos;s create a night
              they&apos;ll never forget.
            </h2>
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 32,
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
              duration: 0.9,
              delay: 0.1,
              ease: SMOOTH_EASE,
            }}
            className="
              flex
              flex-col
              items-start
              md:col-span-4
              md:items-end
              lg:col-span-3
            "
          >
            <p
              className="
                mb-6
                max-w-[270px]
                text-sm
                font-light
                leading-7
                text-white
                md:text-right
              "
            >
              For bookings, collaborations
              and exclusive live
              experiences.
            </p>

           
         

              
           
          </motion.div>
        </div>

        {/* NEW SOCIAL MEDIA SECTION */}

        <section
          className="
            grid
            gap-12
            border-b
            border-white/10
            py-14
            sm:py-16
            md:grid-cols-12
            md:gap-10
            lg:py-20
          "
        >
          {/* SOCIAL INTRO */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 26,
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
              duration: 0.9,
              ease: SMOOTH_EASE,
            }}
            className="
              md:col-span-4
              lg:col-span-3
            "
          >
            <p
              className="
                mb-5
                text-[15px]
                font-semibold
                uppercase
                tracking-[0.4em]
                text-white
              "
            >
              Stay Connected
            </p>

            <h3
              style={{
                fontFamily:
                  luxuryFont.style
                    .fontFamily,
              }}
              className="
                max-w-[330px]
                text-[clamp(2.2rem,3.7vw,4rem)]
                font-medium
                leading-[0.92]
                tracking-[-0.045em]
                text-white
              "
            >
              Follow the
              <span className="italic text-white/55">
                {" "}
                journey.
              </span>
            </h3>

            <p
              className="
                mt-6
                max-w-[310px]
                text-sm
                font-light
                leading-7
                text-white
              "
            >
              Music, live performances,
              behind-the-scenes moments and
              everything happening next.
            </p>
          </motion.div>

          {/* SOCIAL CARDS */}

          <div
            className="
              grid
              gap-3
              md:col-span-8
              lg:col-span-9
            "
          >
            {socialLinks.map(
              (social, index) => {
                const Icon = social.icon;

                return (
                  <motion.div
                    key={social.label}
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
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.08,
                      ease: SMOOTH_EASE,
                    }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group
                        relative
                        flex
                        min-h-[112px]
                        items-center
                        gap-5
                        overflow-hidden
                        rounded-[22px]
                        border
                        border-white/10
                        bg-white/[0.025]
                        px-5
                        py-5
                        transition-all
                        duration-700
                        hover:-translate-y-1
                        hover:border-white/30
                        hover:bg-white
                        hover:text-black
                        sm:min-h-[125px]
                        sm:gap-7
                        sm:px-7
                      "
                    >
                      {/* HOVER LIGHT */}

                      <span
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          -right-20
                          top-1/2
                          h-40
                          w-40
                          -translate-y-1/2
                          rounded-full
                          bg-black/5
                          opacity-0
                          blur-3xl
                          transition-opacity
                          duration-700
                          group-hover:opacity-100
                        "
                      />

                      {/* ICON */}

                      <span
                        className="
                          relative
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/15
                          bg-white/[0.04]
                          text-white
                          transition-all
                          duration-700
                          group-hover:rotate-[8deg]
                          group-hover:border-black/10
                          group-hover:bg-black
                          group-hover:text-white
                          sm:h-16
                          sm:w-16
                        "
                      >
                        <Icon
                          size={22}
                          className="
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />
                      </span>

                      {/* SOCIAL TEXT */}

                      <span
                        className="
                          relative
                          min-w-0
                          flex-1
                        "
                      >
                        <span
                          className="
                            block
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                            text-white
                            transition-colors
                            duration-500
                            group-hover:text-black/45
                          "
                        >
                          {social.label}
                        </span>

                        <span
                          style={{
                            fontFamily:
                              luxuryFont.style
                                .fontFamily,
                          }}
                          className="
                            mt-1
                            block
                            truncate
                            text-[clamp(1.5rem,2.4vw,2.4rem)]
                            font-medium
                            leading-none
                            tracking-[-0.035em]
                            text-white
                            transition-colors
                            duration-500
                            group-hover:text-black
                          "
                        >
                          {social.handle}
                        </span>

                        <span
                          className="
                            mt-2
                            hidden
                            text-xs
                            font-light
                            text-white
                            transition-colors
                            duration-500
                            group-hover:text-black/45
                            sm:block
                          "
                        >
                          {social.description}
                        </span>
                      </span>

                      {/* ARROW */}

                      <span
                        className="
                          relative
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          text-white/55
                          transition-all
                          duration-700
                          group-hover:border-black/15
                          group-hover:bg-black
                          group-hover:text-white
                        "
                      >
                        <ArrowUpRight
                          size={16}
                          className="
                            transition-transform
                            duration-700
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                          "
                        />
                      </span>
                    </Link>
                  </motion.div>
                );
              },
            )}
          </div>
        </section>

        {/* EMAIL + NAVIGATION */}

        <section
          className="
            grid
            gap-12
            border-b
            border-white
            py-14
            sm:py-16
            md:grid-cols-12
            md:items-end
            md:gap-8
          "
        >
          {/* EMAIL */}

          <motion.div
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
              duration: 0.85,
              ease: SMOOTH_EASE,
            }}
            className="
              md:col-span-8
              lg:col-span-9
            "
          >
            <p
              className="
                mb-5
                text-[15px]
                font-semibold
                uppercase
                tracking-[0.4em]
                text-white
              "
            >
              Booking Enquiries
            </p>

            <Link
              href={`mailto:${BOOKING_EMAIL}`}
              style={{
                fontFamily:
                  luxuryFont.style
                    .fontFamily,
              }}
              className="
                group
                inline-flex
                max-w-full
                items-center
                gap-3
                border-b
               
                pb-2
                text-[clamp(1.8rem,4vw,4.8rem)]
                font-medium
                leading-none
                tracking-[-0.045em]
                text-white
                transition-all
                duration-500
                hover:border-white
                hover:text-white
              "
            >
              <span className="break-all">
                {BOOKING_EMAIL}
              </span>

             
            </Link>

          
          </motion.div>

          {/* NAVIGATION */}

          <motion.div
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
              duration: 0.85,
              delay: 0.1,
              ease: SMOOTH_EASE,
            }}
            className="
              md:col-span-4
              lg:col-span-3
            "
          >
            <p
              className="
                mb-6
                text-[15px]
                font-semibold
                uppercase
                tracking-[0.4em]
                text-white
              "
            >
              Explore
            </p>

            <nav
              aria-label="Footer navigation"
              className="
                grid
                grid-cols-2
                gap-x-8
                gap-y-6
              "
            >
              {navigationLinks.map(
                (link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      text-[16px]
                      font-light
                      leading-none
                      sm:text-[17px]
                      lg:text-[18px]
                      text-white
                      transition-colors
                      duration-300
                      hover:text-white
                    "
                  >
                    <span
                      className="
                        h-px
                        w-0
                        bg-white
                        transition-all
                        duration-500
                        group-hover:w-4
                      "
                    />

                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </motion.div>
        </section>

        
        {/* BOTTOM BAR */}

        <div
          className="
            flex
            flex-col
            gap-4
            py-6
            text-[15px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-white
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:text-[15px]
          "
        >
          <p>
            © {currentYear} JKAYY. All
            rights reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-3
            "
          >
            
           

            <span>
              Live Beyond Sound
            </span>

            <span className="text-white/45">
              Developed by{" "}
              <Link
                href="https://dtsworld.in"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-white
                  transition-opacity
                  duration-300
                  hover:opacity-60
                "
              >
                Double Trouble Studio
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}