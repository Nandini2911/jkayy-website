"use client";

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
  },
  {
    title: "Phone",
    value: "+91 XXXXX XXXXX",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    title: "Based In",
    value: "Delhi",
    secondary: "Available Worldwide",
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
          ? -55
          : index === 2
            ? 55
            : 0,
      y: index === 1 ? 45 : 0,
    },

    visible: {
      opacity: 1,
      x: 0,
      y: 0,

      transition: {
        delay: index * 0.13,
        duration: 0.9,
        ease,
      },
    },

    hover: {
      y: -10,

      borderColor:
        "rgba(255,255,255,0.30)",

      background:
        "linear-gradient(145deg, rgba(255,255,255,0.085), transparent 62%), rgba(255,255,255,0.026)",

      boxShadow:
        "0 28px 75px rgba(0,0,0,0.38), 0 0 42px rgba(255,248,230,0.035)",

      transition: {
        duration: 0.45,
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
    x: 5,
    y: -5,

    transition: {
      duration: 0.4,
      ease,
    },
  },
};

const reflectionVariants: Variants = {
  hidden: {
    x: "-180%",
    opacity: 0,
  },

  visible: {
    x: "-180%",
    opacity: 0,
  },

  hover: {
    x: "320%",
    opacity: [0, 0.75, 0],

    transition: {
      duration: 1,
      ease,
    },
  },
};

const cardStyle: CSSProperties = {
  position: "relative",
  overflow: "hidden",
  minHeight: "330px",

  border:
    "1px solid rgba(255,255,255,0.13)",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  padding: "25px",

  background:
    "linear-gradient(145deg, rgba(255,255,255,0.05), transparent 60%), rgba(255,255,255,0.018)",

  backdropFilter: "blur(17px)",
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
        minHeight: "105vh",

        display: "flex",
        alignItems: "center",

        padding: "16vh 5vw",
        boxSizing: "border-box",
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
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",

            gap: "20px 30px",
            marginBottom: "62px",
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
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",

            gap: "18px",
          }}
        >
          {contacts.map((contact, index) => {
            const cardContent = (
              <>
                <small
                  style={{
                    color:
                      "rgba(255,255,255,0.28)",

                    fontSize: "9px",
                    letterSpacing: "0.18em",
                  }}
                >
                  0{index + 1}
                </small>

                <div>
                  <p
                    style={{
                      margin: "0 0 14px",

                      color:
                        "rgba(255,255,255,0.39)",

                      fontSize: "9px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                    }}
                  >
                    {contact.title}
                  </p>

                  <h3
                    style={{
                      margin: 0,
                      overflowWrap: "anywhere",

                      fontFamily:
                        "Cormorant Garamond, Times New Roman, serif",

                      fontSize:
                        "clamp(29px, 2.45vw, 43px)",

                      fontWeight: 400,
                      letterSpacing: "-0.035em",
                      lineHeight: 1.02,
                    }}
                  >
                    {contact.value}
                  </h3>

                  {contact.secondary ? (
                    <span
                      style={{
                        display: "block",
                        marginTop: "10px",

                        color:
                          "rgba(245,243,237,0.46)",

                        fontSize: "10px",
                        letterSpacing: "0.17em",
                        textTransform: "uppercase",
                      }}
                    >
                      {contact.secondary}
                    </span>
                  ) : null}
                </div>

                {contact.href ? (
                  <motion.b
                    variants={arrowVariants}
                    style={{
                      position: "absolute",
                      top: "22px",
                      right: "25px",

                      fontSize: "20px",
                      fontWeight: 400,
                    }}
                  >
                    ↗
                  </motion.b>
                ) : null}

                <motion.i
                  variants={reflectionVariants}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-20%",
                    left: 0,

                    display: "block",

                    width: "42%",
                    height: "150%",

                    transform: "rotate(18deg)",

                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.075), transparent)",

                    pointerEvents: "none",
                  }}
                />
              </>
            );

            return (
              <ContactCard
                key={contact.title}
                href={contact.href}
                variants={createCardVariants(
                  index,
                )}
              >
                {cardContent}
              </ContactCard>
            );
          })}
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
          amount: 0.35,
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
        amount: 0.35,
      }}
      style={cardStyle}
    >
      {children}
    </motion.article>
  );
}