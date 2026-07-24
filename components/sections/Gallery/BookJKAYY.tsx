"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  bodyFont,
  displayFont,
  premiumEase,
} from "./galleryShared";

export default function BookJKAYY() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="book-jkayy"
      className="relative isolate min-h-[82svh] overflow-hidden bg-black text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 22%,rgba(255,255,255,0.08),transparent 28%),radial-gradient(circle at 82% 78%,rgba(255,255,255,0.055),transparent 30%),linear-gradient(145deg,#030303 0%,#111 52%,#020202 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.45) 1px,transparent 1px)",
          backgroundSize:
            "clamp(52px,5vw,82px) clamp(52px,5vw,82px)",
        }}
      />

      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -right-[18vw] top-1/2 aspect-square w-[min(88vw,1050px)] -translate-y-1/2 rounded-full border border-white/7"
      >
        <div className="absolute inset-[11%] rounded-full border border-dashed border-white/8" />
        <div className="absolute inset-[25%] rounded-full border border-white/6" />
        <div className="absolute inset-[39%] rounded-full border border-dashed border-white/8" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[82svh] w-full max-w-[1920px] flex-col px-4 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24 xl:px-14 2xl:px-16">
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
            04 · Book JKAYY
          </span>

          <span
            className="hidden text-[8px] uppercase tracking-[0.3em] text-white/32 sm:block"
            style={{
              fontFamily: bodyFont.style.fontFamily,
            }}
          >
            Live · Private · Festival
          </span>
        </motion.div>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.55fr] lg:gap-20">
          <div>
            <motion.p
              initial={{
                opacity: 0,
                x: -45,
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
                duration: 0.85,
                ease: premiumEase,
              }}
              className="mb-7 text-[8px] uppercase tracking-[0.4em] text-white/42"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              The Next Experience Starts Here
            </motion.p>

            <motion.h2
              initial={{
                opacity: 0,
                y: 55,
                filter: "blur(12px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.22,
              }}
              transition={{
                duration: 1.1,
                ease: premiumEase,
              }}
              className="text-[clamp(3.9rem,10vw,10.5rem)] font-medium uppercase leading-[0.75] tracking-[-0.075em]"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Ready To Create
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
                amount: 0.22,
              }}
              transition={{
                duration: 1.05,
                delay: 0.08,
                ease: premiumEase,
              }}
              className="ml-[6%] mt-2 text-[clamp(3.7rem,9.5vw,9.8rem)] font-normal italic leading-[0.75] tracking-[-0.07em] text-white/52"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              The Next
            </motion.h2>

            <motion.h2
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : -80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.22,
              }}
              transition={{
                duration: 1.05,
                delay: 0.14,
                ease: premiumEase,
              }}
              className="mt-2 text-[clamp(3.5rem,9vw,9.2rem)] font-medium uppercase leading-[0.75] tracking-[-0.07em]"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Unforgettable Moment?
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
            className="max-w-md lg:justify-self-end"
          >
            <div className="mb-7 h-px w-16 bg-white/25" />

            <p
              className="text-[14px] leading-7 text-white/48 sm:text-[16px] sm:leading-8"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              For performances, private events, festivals and collaborations,
              connect with the JKAYY team.
            </p>

            <Link
              href="/contact"
              className="group relative mt-10 inline-flex w-full items-center justify-between overflow-hidden rounded-full border border-white bg-white px-5 py-3 text-black shadow-[0_16px_60px_rgba(255,255,255,0.09)] sm:w-auto sm:min-w-[220px]"
            >
              <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#202020] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

              <span
                className="relative z-10 pl-1 text-[8px] font-semibold uppercase tracking-[0.26em] transition-colors duration-500 group-hover:text-white"
                style={{
                  fontFamily: bodyFont.style.fontFamily,
                }}
              >
                Book JKAYY
              </span>

              <span className="relative z-10 ml-5 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <span
            className="text-[7px] uppercase tracking-[0.3em] text-white/30"
            style={{
              fontFamily: bodyFont.style.fontFamily,
            }}
          >
            Booking Enquiries
          </span>

          <span
            className="text-[7px] uppercase tracking-[0.3em] text-white/30"
            style={{
              fontFamily: bodyFont.style.fontFamily,
            }}
          >
            Worldwide
          </span>
        </div>
      </div>
    </section>
  );
}