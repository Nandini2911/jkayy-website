"use client";

import Image from "next/image";
import {
  motion,
  type Variants,
} from "framer-motion";

import type {
  CSSProperties,
  ReactNode,
} from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const contacts = [
  {
    title: "Bookings",
    value: "bookings@jkayy.com",
    href: "mailto:bookings@jkayy.com",
    image: "/images/contact1.jpeg",
    imageAlt: "JKAYY live performance booking",
  },
  {
    title: "Phone",
    value: "+91 XXXXX XXXXX",
    href: "tel:+91XXXXXXXXXX",
    image: "/images/contact2.jpeg",
    imageAlt: "JKAYY live club performance",
  },
  {
    title: "Based In",
    value: "Delhi",
    secondary: "Available Worldwide",
    image: "/images/contact3.jpeg",
    imageAlt: "JKAYY artist portrait",
  },
];

function createCardVariants(
  index: number,
): Variants {
  return {
    hidden: {
      opacity: 0,
      x:
        index === 0
          ? -48
          : index === 2
            ? 48
            : 0,
      y: index === 1 ? 34 : 0,
    },

    visible: {
      opacity: 1,
      x: 0,
      y: 0,

      transition: {
        delay: index * 0.1,
        duration: 0.7,
        ease,
      },
    },

    hover: {
      y: -7,

      borderColor:
        "rgba(255,255,255,0.28)",

      boxShadow:
        "0 26px 70px rgba(0,0,0,0.38)",

      transition: {
        duration: 0.35,
        ease,
      },
    },
  };
}

const arrowVariants: Variants = {
  hidden: {
    x: 0,
    y: 0,
  },

  visible: {
    x: 0,
    y: 0,
  },

  hover: {
    x: 4,
    y: -4,

    transition: {
      duration: 0.3,
      ease,
    },
  },
};

const cardStyle: CSSProperties = {
  position: "relative",
  overflow: "hidden",

  border:
    "1px solid rgba(255,255,255,0.13)",

  background: "#090909",
  boxSizing: "border-box",
};

export default function DirectContactSection() {
  return (
    <section
      id="direct-contact"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        minHeight: "100svh",

        display: "flex",
        alignItems: "center",

        padding:
          "clamp(72px, 14vh, 150px) clamp(18px, 5vw, 80px)",

        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "min(1480px, 100%)",
          margin: "0 auto",
        }}
      >
        <motion.header
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.65,
            ease,
          }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",

            gap: "16px 30px",
            marginBottom:
              "clamp(34px, 5vw, 62px)",
          }}
        >
          <p
            style={{
              margin: 0,

              color:
                "rgba(245,243,237,0.48)",

              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            02 / Direct Contact
          </p>

          <span
            style={{
              color:
                "rgba(245,243,237,0.35)",

              fontSize: "11px",
            }}
          >
            For immediate conversations.
          </span>
        </motion.header>

        <div
          className="
            grid
            grid-cols-1
            gap-[18px]
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {contacts.map(
            (contact, index) => {
              const cardContent = (
                <>
                  {/* IMAGE AREA */}
                  <div
                    className="
                      group/image
                      relative
                      aspect-[16/10]
                      w-full
                      overflow-hidden
                      bg-[#111]
                      sm:aspect-[16/9]
                      xl:aspect-[16/10]
                    "
                  >
                    <Image
                      src={contact.image}
                      alt={contact.imageAlt}
                      fill
                      sizes="
                        (max-width: 767px) 100vw,
                        (max-width: 1279px) 50vw,
                        33vw
                      "
                      className="
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        group-hover/image:scale-[1.04]
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_55%,rgba(0,0,0,0.62)_100%)]
                      "
                    />

                    <small
                      className="
                        absolute
                        left-5
                        top-5
                        z-10
                        text-[8px]
                        tracking-[0.18em]
                        text-white/55
                      "
                    >
                      0{index + 1}
                    </small>
                  </div>

                  {/* CONTENT AREA */}
                  <div
                    className="
                      relative
                      flex
                      min-h-[190px]
                      flex-col
                      justify-between
                      p-5
                      sm:min-h-[210px]
                      sm:p-6
                      xl:min-h-[220px]
                    "
                  >
                    <div>
                      <p
                        style={{
                          margin:
                            "0 0 12px",

                          color:
                            "rgba(255,255,255,0.39)",

                          fontSize:
                            "9px",
                          letterSpacing:
                            "0.25em",
                          textTransform:
                            "uppercase",
                        }}
                      >
                        {contact.title}
                      </p>

                      <h3
                        style={{
                          margin: 0,
                          overflowWrap:
                            "anywhere",

                          fontFamily:
                            "Cormorant Garamond, Times New Roman, serif",

                          fontSize:
                            "clamp(28px, 2.4vw, 43px)",

                          fontWeight: 400,
                          letterSpacing:
                            "-0.035em",
                          lineHeight: 1.02,
                        }}
                      >
                        {contact.value}
                      </h3>

                      {contact.secondary ? (
                        <span
                          style={{
                            display:
                              "block",
                            marginTop:
                              "10px",

                            color:
                              "rgba(245,243,237,0.46)",

                            fontSize:
                              "10px",
                            letterSpacing:
                              "0.17em",
                            textTransform:
                              "uppercase",
                          }}
                        >
                          {
                            contact.secondary
                          }
                        </span>
                      ) : null}
                    </div>

                    <div
                      className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/[0.08]
                        pt-4
                      "
                    >
                      <span
                        className="
                          text-[7px]
                          uppercase
                          tracking-[0.22em]
                          text-white/25
                        "
                      >
                        Direct Contact
                      </span>

                      {contact.href ? (
                        <motion.b
                          variants={
                            arrowVariants
                          }
                          style={{
                            fontSize:
                              "20px",
                            fontWeight: 400,
                          }}
                        >
                          ↗
                        </motion.b>
                      ) : (
                        <span
                          className="
                            text-[8px]
                            uppercase
                            tracking-[0.2em]
                            text-white/30
                          "
                        >
                          Worldwide
                        </span>
                      )}
                    </div>
                  </div>

                  {/* subtle reflection */}
                  <motion.i
                    aria-hidden="true"
                    initial={{
                      x: "-180%",
                      opacity: 0,
                    }}
                    whileHover={{
                      x: "330%",
                      opacity: [
                        0,
                        0.5,
                        0,
                      ],
                    }}
                    transition={{
                      duration: 0.85,
                      ease,
                    }}
                    style={{
                      position:
                        "absolute",
                      top: "-20%",
                      left: 0,

                      display:
                        "block",

                      width: "34%",
                      height: "150%",

                      transform:
                        "rotate(18deg)",

                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent)",

                      pointerEvents:
                        "none",
                    }}
                  />
                </>
              );

              return (
                <ContactCard
                  key={
                    contact.title
                  }
                  href={
                    contact.href
                  }
                  variants={createCardVariants(
                    index,
                  )}
                >
                  {cardContent}
                </ContactCard>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  href,
  variants,
  children,
}: {
  href?: string;
  variants: Variants;
  children: ReactNode;
}) {
  if (href) {
    return (
      <motion.a
        href={href}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{
          once: true,
          amount: 0.22,
        }}
        style={{
          ...cardStyle,
          color: "#f5f3ed",
          textDecoration: "none",
        }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.article
      variants={variants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{
        once: true,
        amount: 0.22,
      }}
      style={{
        ...cardStyle,
        color: "#f5f3ed",
      }}
    >
      {children}
    </motion.article>
  );
}