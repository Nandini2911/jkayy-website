"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "919372992720";

const WHATSAPP_MESSAGE =
  "Hi JKAYY, I would like to enquire about bookings and availability. Please share the details.";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
const INSTAGRAM_LINK = "https://www.instagram.com/";

const ease = [0.16, 1, 0.3, 1] as const;

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] sm:h-5 sm:w-5"
      fill="currentColor"
    >
      <path d="M12.04 2C6.53 2 2.05 6.44 2.05 11.91c0 1.75.46 3.46 1.34 4.96L2 22l5.27-1.37a10.02 10.02 0 0 0 4.77 1.21h.01c5.5 0 9.99-4.44 9.99-9.91A9.87 9.87 0 0 0 12.04 2Zm0 18.16h-.01a8.29 8.29 0 0 1-4.22-1.15l-.3-.18-3.13.82.84-3.03-.2-.31a8.13 8.13 0 0 1-1.29-4.4c0-4.54 3.73-8.23 8.32-8.23a8.18 8.18 0 0 1 8.3 8.24c-.01 4.54-3.74 8.24-8.31 8.24Zm4.56-6.17c-.25-.12-1.48-.72-1.71-.8-.23-.08-.4-.12-.56.12-.17.25-.65.8-.8.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.23a7.6 7.6 0 0 1-1.4-1.72c-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.08s.9 2.4 1.02 2.57c.12.16 1.76 2.67 4.27 3.74.6.26 1.06.41 1.43.52.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] sm:h-5 sm:w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.4"
        cy="6.6"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export default function FloatingSocialButtons() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: 0.6,
        duration: 0.65,
        ease,
      }}
      className="
        fixed
        bottom-[calc(16px+env(safe-area-inset-bottom))]
        right-4
        z-[9998]
        flex
        flex-col
        gap-2.5
        sm:bottom-[calc(22px+env(safe-area-inset-bottom))]
        sm:right-6
        sm:gap-3
        lg:bottom-7
        lg:right-7
      "
    >
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with JKAYY on WhatsApp"
        whileHover={{
          scale: 1.08,
          y: -2,
        }}
        whileTap={{
          scale: 0.94,
        }}
        transition={{
          duration: 0.25,
          ease,
        }}
        className="
          group
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          overflow-hidden
          rounded-full
          border
          border-white/15
          bg-[#111]
          text-white
          shadow-[0_12px_35px_rgba(0,0,0,0.28)]
          backdrop-blur-xl
          sm:h-14
          sm:w-14
        "
      >
        <span
          className="
            absolute
            inset-0
            scale-0
            rounded-full
            bg-[#25D366]
            transition-transform
            duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:scale-100
          "
        />

        <span className="relative z-10">
          <WhatsAppIcon />
        </span>
      </motion.a>

      <motion.a
        href={INSTAGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow JKAYY on Instagram"
        whileHover={{
          scale: 1.08,
          y: -2,
        }}
        whileTap={{
          scale: 0.94,
        }}
        transition={{
          duration: 0.25,
          ease,
        }}
        className="
          group
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          overflow-hidden
          rounded-full
          border
          border-white/15
          bg-[#111]
          text-white
          shadow-[0_12px_35px_rgba(0,0,0,0.28)]
          backdrop-blur-xl
          sm:h-14
          sm:w-14
        "
      >
        <span
          className="
            absolute
            inset-0
            scale-0
            rounded-full
            bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]
            transition-transform
            duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:scale-100
          "
        />

        <span className="relative z-10">
          <InstagramIcon />
        </span>
      </motion.a>
    </motion.div>
  );
}