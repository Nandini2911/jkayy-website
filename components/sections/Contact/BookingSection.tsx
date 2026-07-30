"use client";

import { motion } from "framer-motion";
import {
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const eventTypes = [
  "Festival",
  "Wedding",
  "Corporate",
  "Private",
  "Club Show",
  "Luxury Event",
  "Other",
];

type FormStatus =
  | "idle"
  | "sending"
  | "success"
  | "error";

const inputStyle = {
  width: "100%",
  border: 0,
  borderBottom:
    "1px solid rgba(255,255,255,0.17)",
  borderRadius: 0,
  outline: "none",
  padding: "4px 0 14px",
  backgroundColor: "transparent",
  color: "#f5f3ed",
  WebkitTextFillColor: "#f5f3ed",
  caretColor: "#f5f3ed",
  WebkitBoxShadow:
    "0 0 0 1000px transparent inset",
  boxShadow:
    "0 0 0 1000px transparent inset",
  font: "inherit",
  fontSize: "14px",
  boxSizing: "border-box" as const,
  colorScheme: "dark" as const,
  transition:
    "border-color 250ms ease, box-shadow 250ms ease",
};

export default function BookingSection() {
  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;

    const payload = Object.fromEntries(
      new FormData(form).entries(),
    );

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to send your request.",
        );
      }

      form.reset();

      setStatus("success");

      setMessage(
        "Request received. We’ll be in touch shortly.",
      );
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  function handleFocus(
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLSelectElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) {
    event.currentTarget.style.borderColor =
      "rgba(255,255,255,0.75)";

    event.currentTarget.style.boxShadow =
      "0 10px 20px -18px rgba(255,255,255,0.9)";
  }

  function handleBlur(
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLSelectElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) {
    event.currentTarget.style.borderColor =
      "rgba(255,255,255,0.17)";

    event.currentTarget.style.boxShadow =
      "none";
  }

  return (
    <>
      <section
        id="booking"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          minHeight: "125vh",
          display: "flex",
          alignItems: "center",
          padding: "17vh 5vw 18vh",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "min(1320px, 100%)",
            margin: "0 auto",

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 430px), 1fr))",

            gap: "clamp(54px, 8vw, 140px)",
            alignItems: "center",
          }}
        >
          {/* LEFT CONTENT */}

          <motion.article
            initial={{
              opacity: 0,
              y: 48,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.95,
              ease,
            }}
            style={{
              maxWidth: "620px",
            }}
          >
            <small
              style={{
                display: "block",
                color:
                  "rgba(245,243,237,0.48)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              01 / Start A Conversation
            </small>

            <h2
              style={{
                margin: "34px 0 31px",

                fontFamily:
                  "Cormorant Garamond, Times New Roman, serif",

                fontSize:
                  "clamp(46px, 5vw, 82px)",

                fontWeight: 400,
                letterSpacing: "-0.045em",
                lineHeight: 0.98,
              }}
            >
              Every unforgettable event
              <br />
              starts with a conversation.
            </h2>

            <p
              style={{
                margin: 0,

                color:
                  "rgba(245,243,237,0.58)",

                fontSize:
                  "clamp(14px, 1.1vw, 17px)",

                lineHeight: 1.85,
              }}
            >
              Tell us about your vision.
              <br />
              We’ll take care of the experience.
            </p>
          </motion.article>

          {/* FORM CARD */}

          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              y: 90,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.18,
            }}
            transition={{
              duration: 1.1,
              ease,
            }}
            style={{
              position: "relative",
              overflow: "hidden",

              padding:
                "clamp(30px, 4.5vw, 64px)",

              border:
                "1px solid rgba(255,255,255,0.14)",

              borderRadius: "3px",

              background:
                "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.018) 46%, rgba(255,255,255,0.04)), rgba(7,7,7,0.67)",

              boxShadow:
                "0 35px 100px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.07)",

              backdropFilter:
                "blur(28px) saturate(115%)",

              boxSizing: "border-box",
            }}
          >
            {/* GLASS REFLECTION */}

            <motion.i
              aria-hidden="true"
              animate={{
                x: ["-180%", "280%"],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: "-40%",
                left: 0,

                display: "block",

                width: "42%",
                height: "180%",

                transform: "rotate(18deg)",

                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",

                pointerEvents: "none",
              }}
            />

            {/* NAME AND EMAIL */}

            <div
              style={{
                position: "relative",
                zIndex: 1,

                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",

                gap: "0 30px",
              }}
            >
              <Field index={0}>
                <span
                  style={{
                    display: "block",
                    marginBottom: "10px",

                    color:
                      "rgba(245,243,237,0.42)",

                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Your Name
                </span>

                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle}
                />
              </Field>

              <Field index={1}>
                <span
                  style={{
                    display: "block",
                    marginBottom: "10px",

                    color:
                      "rgba(245,243,237,0.42)",

                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </span>

                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* PHONE AND LOCATION */}

            <div
              style={{
                position: "relative",
                zIndex: 1,

                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",

                gap: "0 30px",
              }}
            >
              <Field index={2}>
                <span
                  style={{
                    display: "block",
                    marginBottom: "10px",

                    color:
                      "rgba(245,243,237,0.42)",

                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Phone
                </span>

                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle}
                />
              </Field>

              <Field index={3}>
                <span
                  style={{
                    display: "block",
                    marginBottom: "10px",

                    color:
                      "rgba(245,243,237,0.42)",

                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Location
                </span>

                <input
                  name="location"
                  type="text"
                  autoComplete="address-level2"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* EVENT TYPE */}

            <Field index={4}>
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",

                  color:
                    "rgba(245,243,237,0.42)",

                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Event Type
              </span>

              <select
                name="eventType"
                defaultValue=""
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                  appearance: "auto",
                }}
              >
                <option
                  value=""
                  disabled
                  style={{
                    background: "#0d0d0d",
                    color: "#f5f3ed",
                  }}
                >
                  Select an experience
                </option>

                {eventTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                    style={{
                      background: "#0d0d0d",
                      color: "#f5f3ed",
                    }}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            {/* DATE */}

            <Field index={5}>
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",

                  color:
                    "rgba(245,243,237,0.42)",

                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Preferred Date
              </span>

              <input
                name="date"
                type="date"
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                }}
              />
            </Field>

            {/* MESSAGE */}

            <Field index={6}>
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",

                  color:
                    "rgba(245,243,237,0.42)",

                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Message
              </span>

              <textarea
                name="message"
                rows={4}
                placeholder="Tell us what you’re imagining..."
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,

                  minHeight: "120px",
                  resize: "vertical",
                  lineHeight: 1.7,
                }}
              />
            </Field>

            {/* SEND BUTTON */}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              initial="rest"
              animate="rest"
              whileHover={
                status === "sending"
                  ? undefined
                  : "hover"
              }
              whileTap={{
                scale: 0.985,
              }}
              variants={{
                rest: {
                  backgroundColor:
                    "rgba(255,255,255,0.025)",

                  color: "#f5f3ed",
                },

                hover: {
                  backgroundColor: "#f5f3ed",
                  color: "#050505",

                  boxShadow:
                    "0 0 38px rgba(255,249,231,0.11)",

                  transition: {
                    duration: 0.4,
                    ease,
                  },
                },
              }}
              style={{
                position: "relative",
                zIndex: 1,

                width: "100%",
                minHeight: "74px",

                border:
                  "1px solid rgba(255,255,255,0.22)",

                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                padding: "0 30px",

                cursor:
                  status === "sending"
                    ? "progress"
                    : "pointer",

                opacity:
                  status === "sending"
                    ? 0.6
                    : 1,

                fontFamily:
                  "Manrope, Arial, sans-serif",

                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              <span>
                {status === "sending"
                  ? "Sending"
                  : "Send Request"}
              </span>

              <motion.span
                variants={{
                  rest: {
                    x: 0,
                  },

                  hover: {
                    x: 8,

                    transition: {
                      duration: 0.4,
                      ease,
                    },
                  },
                }}
                aria-hidden="true"
                style={{
                  fontSize: "20px",
                }}
              >
                →
              </motion.span>
            </motion.button>

            {/* STATUS MESSAGE */}

            <output
              aria-live="polite"
              style={{
                display: "block",
                minHeight: "20px",
                marginTop: "16px",

                color:
                  status === "error"
                    ? "#efb5b5"
                    : "rgba(245,243,237,0.58)",

                fontSize: "11px",
                lineHeight: 1.6,
              }}
            >
              {message}
            </output>
          </motion.form>
        </div>
      </section>

      {/* 
        Browser autofill and pseudo-elements cannot
        be controlled with React inline styles.
      */}

      <style jsx global>{`
        #booking input:-webkit-autofill,
        #booking input:-webkit-autofill:hover,
        #booking input:-webkit-autofill:focus,
        #booking input:-webkit-autofill:active {
          -webkit-text-fill-color: #f5f3ed !important;
          caret-color: #f5f3ed !important;

          -webkit-box-shadow:
            0 0 0 1000px #0d0d0d inset !important;

          box-shadow:
            0 0 0 1000px #0d0d0d inset !important;

          border-bottom:
            1px solid
            rgba(255, 255, 255, 0.17) !important;

          transition:
            background-color 9999s ease-out,
            color 9999s ease-out;
        }

        #booking input:-moz-autofill {
          color: #f5f3ed !important;
          caret-color: #f5f3ed !important;

          box-shadow:
            0 0 0 1000px #0d0d0d inset !important;
        }

        #booking input::selection,
        #booking textarea::selection {
          background:
            rgba(255, 255, 255, 0.2);

          color: #ffffff;
        }

        #booking input::placeholder,
        #booking textarea::placeholder {
          color:
            rgba(245, 243, 237, 0.28);

          opacity: 1;
        }

        #booking input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(1);
          opacity: 0.8;
        }

        #booking select {
          color-scheme: dark;
        }

        @media (max-width: 720px) {
          #booking {
            min-height: auto !important;
            padding: 130px 20px !important;
          }
        }
      `}</style>
    </>
  );
}

function Field({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.label
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
        amount: 0.7,
      }}
      transition={{
        delay: 0.16 + index * 0.07,
        duration: 0.65,
        ease,
      }}
      style={{
        position: "relative",
        display: "block",
        marginBottom: "34px",
      }}
    >
      {children}
    </motion.label>
  );
}