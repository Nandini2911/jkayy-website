"use client";

import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  useRef,
  type MouseEvent as ReactMouseEvent,
} from "react";


import ArrivalSection from "@/components/sections/Contact/ArrivalSection";
import DirectContactSection from "@/components/sections/Contact/DirectContactSection";
import GoodbyeSection from "@/components/sections/Contact/GoodbyeSection";
import StayConnectedSection from "@/components/sections/Music/StayConnectedSection";
import BookingSection from "@/components/sections/Contact/BookingSection";
import Navbar from "@/components/common/Navbar";


export default function ContactPageClient() {
  const pageRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 38,
    damping: 22,
    mass: 0.9,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 42,
    damping: 24,
    mass: 0.8,
  });

  const { scrollYProgress } = useScroll();

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.16],
    [1, 0.9],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.22],
    [1, 0.86, 0.18],
  );

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, -90],
  );

  const spotlightTop = useTransform(
    scrollYProgress,
    [0, 0.14, 0.3, 0.58, 1],
    [18, 72, 50, 54, 48],
  );

  const spotlightOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.36, 0.7, 1],
    [0.92, 0.98, 0.54, 0.32, 0.22],
  );

  const smokeOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.62, 1],
    [0.44, 0.34, 0.16, 0.08],
  );

  const spotlightLeft = useMotionTemplate`${smoothMouseX}%`;
  const spotlightTopValue = useMotionTemplate`${spotlightTop}vh`;

  const spotlightStyle: MotionStyle = {
    left: spotlightLeft,
    top: spotlightTopValue,
    y: smoothMouseY,
    opacity: reduceMotion ? 0.55 : spotlightOpacity,
  };

  const beamStyle: MotionStyle = {
    opacity: reduceMotion ? 0.2 : spotlightOpacity,
  };

  const smokeStyle: MotionStyle = {
    opacity: reduceMotion ? 0.12 : smokeOpacity,
  };

  const heroStyle: MotionStyle | undefined = reduceMotion
    ? undefined
    : {
        scale: heroScale,
        opacity: heroOpacity,
        y: heroY,
      };

  function handleMouseMove(
    event: ReactMouseEvent<HTMLElement>,
  ) {
    if (reduceMotion) return;

    const normalizedX =
      event.clientX / window.innerWidth - 0.5;

    const normalizedY =
      event.clientY / window.innerHeight - 0.5;

    mouseX.set(50 + normalizedX * 9);
    mouseY.set(normalizedY * 22);
  }

  function handleMouseLeave() {
    mouseX.set(50);
    mouseY.set(0);
  }

  return (
    <main
      ref={pageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
     
<Navbar/>
      <ArrivalSection heroStyle={heroStyle} />

      <BookingSection />

      <DirectContactSection />

      <StayConnectedSection />

      <GoodbyeSection />
    </main>
  );
}