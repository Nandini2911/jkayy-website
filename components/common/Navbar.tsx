"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type MenuItem = {
  roman: string;
  label: string;
  description: string;
  href: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    roman: "I",
    label: "Home",
    description: "Enter the world of JKAYY",
    href: "/",
    image: "/menu/home.webp",
  },
  {
    roman: "II",
    label: "About",
    description: "Artist, performer and creator",
    href: "/about",
    image: "/menu/about.webp",
  },
  {
    roman: "III",
    label: "Events",
    description: "Upcoming shows and appearances",
    href: "#events",
    image: "/menu/events.webp",
  },
  {
    roman: "IV",
    label: "Gallery",
    description: "Moments beyond the stage",
    href: "#gallery",
    image: "/menu/gallery.webp",
  },
  {
    roman: "V",
    label: "Music",
    description: "Latest tracks and releases",
    href: "#music",
    image: "/menu/music.webp",
  },
  {
    roman: "VI",
    label: "Contact",
    description: "Bookings and collaborations",
    href: "#contact",
    image: "/menu/contact.webp",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [previewError, setPreviewError] = useState(false);

  const menuScrollRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);

  /*
   * Navbar scroll behaviour:
   * Scroll down = hide navbar
   * Scroll up = show navbar
   * Top of page = always show navbar
   * Menu open = always show navbar
   */
  useEffect(() => {
    lastScrollYRef.current = Math.max(window.scrollY, 0);

    if (menuOpen) {
      setNavVisible(true);
    }

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const previousScrollY = lastScrollYRef.current;
        const scrollDifference = currentScrollY - previousScrollY;

        setScrolled(currentScrollY > 40);

        if (menuOpen || currentScrollY <= 20) {
          setNavVisible(true);
        } else if (
          scrollDifference > 4 &&
          currentScrollY > 80
        ) {
          setNavVisible(false);
        } else if (scrollDifference < -4) {
          setNavVisible(true);
        }

        lastScrollYRef.current = currentScrollY;
        scrollFrameRef.current = null;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [menuOpen]);

  /*
   * Lock body scroll when full-screen menu is open.
   */
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      if (menuScrollRef.current) {
        menuScrollRef.current.scrollTop = 0;
      }
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  /*
   * Close menu with Escape key.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const openMenu = () => {
    setActiveItem(menuItems[0]);
    setPreviewError(false);
    setNavVisible(true);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const selectMenuItem = (item: MenuItem) => {
    setActiveItem(item);
    setPreviewError(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          navVisible || menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-[110%] opacity-0"
        } ${
          scrolled
            ? "border-b border-white/10 bg-black/75 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-4 sm:h-[74px] sm:px-6 md:h-[82px] md:px-10">
          {/* JK Logo */}
          <Link
            href="#home"
            onClick={closeMenu}
            className="group relative flex shrink-0 items-center"
            aria-label="Go to JKAYY home"
          >
            <span
              className="
                font-logo
                bg-gradient-to-b
                from-white
                via-[#e5edf5]
                to-[#8793a2]
                bg-clip-text
                text-[20px]
                font-bold
                tracking-[0.2em]
                text-transparent
                drop-shadow-[0_0_16px_rgba(34,211,238,0.38)]
                transition-all
                duration-500
                [-webkit-text-stroke:0.25px_rgba(255,255,255,0.4)]
                sm:text-[22px]
                sm:tracking-[0.22em]
                md:text-[24px]
                group-hover:scale-[1.04]
                group-hover:drop-shadow-[0_0_26px_rgba(34,211,238,0.8)]
              "
            >
              JK
            </span>

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_14px_rgba(34,211,238,0.9)] transition-all duration-500 group-hover:w-[calc(100%-0.2em)]" />
          </Link>

          {/* Menu Button */}
          <button
            type="button"
            onClick={openMenu}
            className="
              group
              relative
              z-[120]
              flex
              shrink-0
              touch-manipulation
              select-none
              items-center
              gap-2.5
              pointer-events-auto
              sm:gap-3
              md:gap-4
            "
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <span
              className="
                font-logo
                bg-gradient-to-b
                from-white
                via-[#e5edf5]
                to-[#8793a2]
                bg-clip-text
                text-[11px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-transparent
                drop-shadow-[0_0_16px_rgba(34,211,238,0.38)]
                transition-all
                duration-500
                [-webkit-text-stroke:0.2px_rgba(255,255,255,0.35)]
                sm:text-[13px]
                sm:tracking-[0.2em]
                md:text-[15px]
                md:tracking-[0.22em]
                group-hover:scale-[1.04]
                group-hover:drop-shadow-[0_0_26px_rgba(34,211,238,0.8)]
              "
            >
              Menu
            </span>

            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 sm:h-11 sm:w-11 md:h-12 md:w-12 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.22)]">
              <span className="absolute inset-0 scale-0 rounded-full bg-gradient-to-br from-blue-600 via-cyan-400 to-purple-600 transition-transform duration-500 group-hover:scale-100" />

              <span className="relative z-10 flex w-[18px] flex-col gap-[5px] md:w-5">
                <span className="h-px w-[18px] bg-white transition-transform duration-300 md:w-5 group-hover:translate-x-1" />

                <span className="h-px w-3 bg-white transition-all duration-300 group-hover:-translate-x-1 group-hover:w-[18px] md:group-hover:w-5" />
              </span>
            </span>
          </button>
        </nav>
      </header>

      {/* Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.78,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-[200] h-screen h-[100dvh] overflow-hidden bg-[#030303]"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            <div className="flex h-full min-h-0">
              {/* Desktop JK Rail */}
              <aside className="relative hidden h-full w-[66px] shrink-0 border-r border-white/10 md:flex lg:w-[78px] xl:w-[86px]">
                <Link
                  href="#home"
                  onClick={closeMenu}
                  aria-label="Go to JKAYY home section"
                  className="group absolute left-1/2 top-7 -translate-x-1/2 md:top-9 lg:top-10"
                >
                  <span
                    className="
                      font-logo
                      relative
                      block
                      bg-gradient-to-b
                      from-white
                      via-[#e5edf5]
                      to-[#8793a2]
                      bg-clip-text
                      text-[17px]
                      font-bold
                      tracking-[0.2em]
                      text-transparent
                      drop-shadow-[0_0_14px_rgba(34,211,238,0.4)]
                      transition-all
                      duration-500
                      [-webkit-text-stroke:0.2px_rgba(255,255,255,0.35)]
                      lg:text-[19px]
                      xl:text-[20px]
                      group-hover:scale-105
                      group-hover:drop-shadow-[0_0_22px_rgba(34,211,238,0.8)]
                    "
                  >
                    JK
                  </span>

                  <span className="absolute -bottom-3 left-0 h-px w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_14px_rgba(34,211,238,0.9)] transition-all duration-500 group-hover:w-[calc(100%-0.2em)]" />

                  <span className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full bg-cyan-400/0 blur-2xl transition-all duration-500 group-hover:scale-100 group-hover:bg-cyan-400/20" />
                </Link>
              </aside>

              {/* Desktop Image Preview */}
              <section className="relative hidden h-full w-[37%] shrink-0 overflow-hidden border-r border-white/10 bg-[#080808] lg:block xl:w-[40%] 2xl:w-[42%]">
                <AnimatePresence mode="wait">
                  {!previewError ? (
                    <motion.div
                      key={activeItem.image}
                      initial={{
                        opacity: 0,
                        scale: 1.08,
                        filter: "blur(12px)",
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.98,
                        filter: "blur(8px)",
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeItem.image}
                        alt={`${activeItem.label} preview`}
                        fill
                        sizes="(min-width: 1536px) 42vw, (min-width: 1280px) 40vw, 37vw"
                        className="object-cover"
                        priority
                        onError={() => setPreviewError(true)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`${activeItem.label}-fallback`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(126,34,206,0.2),transparent_40%),#050505]"
                    >
                      <span className="text-[10vw] font-semibold uppercase tracking-[-0.08em] text-white/[0.04]">
                        {activeItem.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/25" />

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,211,238,0.12),transparent_35%)]" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.label}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute bottom-7 left-7 right-7 z-10 xl:bottom-10 xl:left-10 xl:right-10"
                  >
                    <p className="mb-3 text-[9px] uppercase tracking-[0.4em] text-cyan-300 xl:mb-4 xl:text-[10px] xl:tracking-[0.48em]">
                      JKAYY / {activeItem.roman}
                    </p>

                    <h3 className="text-3xl font-semibold uppercase tracking-[-0.05em] text-white xl:text-4xl 2xl:text-5xl">
                      {activeItem.label}
                    </h3>

                    <p className="mt-3 max-w-sm text-xs leading-5 text-white/55 xl:mt-4 xl:text-sm xl:leading-6">
                      {activeItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </section>

              {/* Responsive Menu Panel */}
              <section className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#030303]">
                {/* Menu Header */}
                <div className="relative z-10 flex h-[80px] shrink-0 items-center justify-between border-b border-white/10 px-4 sm:h-[88px] sm:px-6 md:h-[100px] md:px-8 lg:h-[110px] lg:px-10 xl:px-14">
                  <div className="min-w-0 pr-4">
                    <p className="truncate text-[11px] text-white/55 sm:text-xs md:text-sm">
                      Explore the world of JKAYY
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:h-12 sm:w-12 md:h-14 md:w-14"
                    aria-label="Close menu"
                  >
                    <X
                      size={22}
                      strokeWidth={1.6}
                      className="transition-transform duration-500 group-hover:rotate-90 sm:h-6 sm:w-6 md:h-7 md:w-7"
                    />
                  </button>
                </div>

                {/* Scrollable Navigation */}
                <div
                  ref={menuScrollRef}
                  className="jkayy-menu-scroll relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14"
                >
                  <div className="flex min-h-full flex-col justify-start py-2 sm:py-3 md:py-4 2xl:justify-center">
                    {menuItems.map((item, index) => {
                      const selected =
                        activeItem.label === item.label;

                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.1 + index * 0.045,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          onPointerEnter={() =>
                            selectMenuItem(item)
                          }
                        >
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            onFocus={() =>
                              selectMenuItem(item)
                            }
                            className="group relative flex min-h-[70px] min-w-0 items-center border-b border-white/15 sm:min-h-[78px] md:min-h-[88px] xl:min-h-[98px]"
                          >
                            <span
                              className={`absolute inset-0 origin-left bg-white/[0.035] transition-transform duration-500 ${
                                selected
                                  ? "scale-x-100"
                                  : "scale-x-0 group-hover:scale-x-100"
                              }`}
                            />

                            {/* Roman Number */}
                            <span
                              className={`relative z-10 w-9 shrink-0 font-serif text-xs transition-colors duration-300 sm:w-11 sm:text-sm md:w-14 lg:w-16 ${
                                selected
                                  ? "text-cyan-300"
                                  : "text-white/20 group-hover:text-cyan-300"
                              }`}
                            >
                              {item.roman}
                            </span>

                            {/* Menu Name */}
                            <span
                              className={`relative z-10 shrink-0 text-[27px] font-semibold uppercase leading-none tracking-[-0.05em] transition-all duration-300 min-[360px]:text-[30px] sm:text-[36px] md:text-[44px] lg:text-[42px] xl:text-[52px] 2xl:text-[60px] ${
                                selected
                                  ? "translate-x-1.5 text-white sm:translate-x-2"
                                  : "text-white/30 group-hover:translate-x-1.5 group-hover:text-white sm:group-hover:translate-x-2"
                              }`}
                            >
                              {item.label}
                            </span>

                            {/* Description */}
                            <span
                              className={`relative z-10 ml-auto hidden max-w-[170px] pl-6 text-xs leading-5 transition-colors duration-300 md:block xl:max-w-[220px] xl:text-sm ${
                                selected
                                  ? "text-white/75"
                                  : "text-white/25 group-hover:text-white/70"
                              }`}
                            >
                              {item.description}
                            </span>

                            <ArrowUpRight
                              size={19}
                              className={`relative z-10 ml-auto shrink-0 transition-all duration-300 md:ml-4 xl:h-[22px] xl:w-[22px] ${
                                selected
                                  ? "translate-x-0 text-cyan-300 opacity-100"
                                  : "-translate-x-2 text-white opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                              }`}
                            />

                            <span
                              className={`absolute bottom-[-1px] left-0 h-px bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_18px_rgba(34,211,238,0.75)] transition-all duration-500 ${
                                selected
                                  ? "w-full"
                                  : "w-0 group-hover:w-full"
                              }`}
                            />
                          </Link>
                        </motion.div>
                      );
                    })}

                    {/* Mobile Image Below Contact */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.38,
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative mb-4 mt-5 h-[190px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080808] md:hidden"
                    >
                      <Image
                        src="/menu/contact.webp"
                        alt="JKAYY contact"
                        fill
                        sizes="(max-width: 767px) calc(100vw - 32px), 0px"
                        className="object-cover"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                    </motion.div>
                  </div>
                </div>

                {/* Mobile JK Home Button */}
                <div className="relative z-10 flex shrink-0 items-center justify-between border-t border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl sm:px-6 md:hidden">
                  <Link
                    href="#home"
                    onClick={closeMenu}
                    className="group relative"
                    aria-label="Return to JKAYY home"
                  >
                    <span className="font-logo bg-gradient-to-b from-white via-[#e5edf5] to-[#8793a2] bg-clip-text text-[17px] font-bold tracking-[0.2em] text-transparent drop-shadow-[0_0_14px_rgba(34,211,238,0.4)]">
                      JK
                    </span>
                  </Link>

                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                    Artist Experience
                  </span>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}