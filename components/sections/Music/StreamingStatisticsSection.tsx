"use client";

import { motion, useReducedMotion } from "motion/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {
  CalendarDays,
  Disc3,
  Globe2,
  Layers3,
  ScanBarcode,
} from "lucide-react";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const premiumEase = [0.16, 1, 0.3, 1] as const;

const releaseInformation = [
  {
    label: "Released",
    value: "03 May 2026",
    detail: "Official Release Date",
    icon: CalendarDays,
  },
  {
    label: "Genre",
    value: "Techno • Trance",
    detail: "Electronic Music",
    icon: Disc3,
  },
  {
    label: "Distribution",
    value: "Worldwide",
    detail: "Global Release",
    icon: Globe2,
  },
  {
    label: "Available On",
    value: "20+ Platforms",
    detail: "Streaming Services",
    icon: Layers3,
  },
  {
    label: "UPC",
    value: "825300594222",
    detail: "Digital Release Code",
    icon: ScanBarcode,
  },
];

export default function StreamingStatisticsSection() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="streaming-statistics"
      className="relative isolate w-full overflow-hidden bg-[#f5f5f2] text-black"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 20%,rgba(0,0,0,0.06),transparent 24%),radial-gradient(circle at 86% 78%,rgba(0,0,0,0.045),transparent 26%),linear-gradient(135deg,#ffffff 0%,#f4f4f1 48%,#e9e9e6 100%)",
        }}
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.22) 1px,transparent 1px)",
          backgroundSize:
            "clamp(48px,5vw,78px) clamp(48px,5vw,78px)",
        }}
      />

      {/* Large background number */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 0.035, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: premiumEase }}
        className="pointer-events-none absolute -left-[3%] top-[5%] text-[clamp(15rem,40vw,42rem)] font-medium leading-none tracking-[-0.1em] text-black"
        style={{
          fontFamily: displayFont.style.fontFamily,
        }}
      >
        05
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32 xl:px-14 2xl:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="flex items-center justify-between border-b border-black/[0.12] pb-5"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <span
              className="text-[8px] font-semibold uppercase tracking-[0.38em] text-black/75 sm:text-[9px]"
              style={{ fontFamily: bodyFont.style.fontFamily }}
            >
              05
            </span>

            <span className="h-px w-8 bg-black/25 sm:w-12" />

            <span
              className="text-[7px] font-medium uppercase tracking-[0.32em] text-black/42 sm:text-[8px]"
              style={{ fontFamily: bodyFont.style.fontFamily }}
            >
              Release Information
            </span>
          </div>

          <span
            className="hidden text-[7px] uppercase tracking-[0.3em] text-black/35 sm:block"
            style={{ fontFamily: bodyFont.style.fontFamily }}
          >
            Verified Release Data
          </span>
        </motion.div>

        {/* Heading */}
        <div className="grid gap-8 pb-14 pt-12 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_0.58fr] lg:items-end lg:gap-20 lg:pb-20">
          <div>
            <motion.h2
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : -80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 1,
                ease: premiumEase,
              }}
              className="text-[clamp(4rem,11vw,11rem)] font-medium uppercase leading-[0.72] tracking-[-0.075em]"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Release
            </motion.h2>

            <motion.h2
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : 90,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 1,
                delay: 0.08,
                ease: premiumEase,
              }}
              className="ml-[7%] mt-2 text-[clamp(3.8rem,10vw,10rem)] font-normal italic leading-[0.72] tracking-[-0.07em] text-black/48"
              style={{
                fontFamily: displayFont.style.fontFamily,
              }}
            >
              Information
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.9,
              delay: 0.16,
              ease: premiumEase,
            }}
            className="max-w-md lg:justify-self-end"
          >
            <div className="mb-5 h-px w-16 bg-black/25" />

            <p
              className="text-[13px] leading-6 text-black/54 sm:text-[15px] sm:leading-7"
              style={{
                fontFamily: bodyFont.style.fontFamily,
              }}
            >
              Official information for the release, including its global
              distribution, streaming availability and digital identification.
            </p>
          </motion.div>
        </div>

        {/* Information cards */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          {releaseInformation.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 45,
                  scale: 0.97,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.07,
                  ease: premiumEase,
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -7,
                      }
                }
                className={`group relative min-h-[210px] overflow-hidden border border-black/[0.12] bg-white/65 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.07)] backdrop-blur-md sm:min-h-[230px] sm:p-6 ${
                  index === 0
                    ? "lg:col-span-2"
                    : index === 4
                      ? "lg:col-span-2"
                      : "lg:col-span-1"
                }`}
              >
                <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

                <div className="relative z-10 flex h-full min-h-[168px] flex-col justify-between sm:min-h-[182px]">
                  <div className="flex items-start justify-between">
                    <Icon className="h-4 w-4 text-black/40 transition-colors duration-500 group-hover:text-white/45" />

                    <span
                      className="text-[7px] uppercase tracking-[0.3em] text-black/32 transition-colors duration-500 group-hover:text-white/35"
                      style={{
                        fontFamily: bodyFont.style.fontFamily,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <p
                      className="mb-3 text-[7px] font-medium uppercase tracking-[0.34em] text-black/38 transition-colors duration-500 group-hover:text-white/42"
                      style={{
                        fontFamily: bodyFont.style.fontFamily,
                      }}
                    >
                      {item.label}
                    </p>

                    <h3
                      className="break-words text-[clamp(1.8rem,3.2vw,3rem)] font-medium leading-[0.92] tracking-[-0.045em] text-black transition-colors duration-500 group-hover:text-white"
                      style={{
                        fontFamily: displayFont.style.fontFamily,
                      }}
                    >
                      {item.value}
                    </h3>

                    <p
                      className="mt-4 text-[7px] uppercase tracking-[0.25em] text-black/32 transition-colors duration-500 group-hover:text-white/35"
                      style={{
                        fontFamily: bodyFont.style.fontFamily,
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}