import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Dir = "up" | "left" | "right" | "down";

interface Props {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
  className?: string;
}

const offset: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 64 },
  right: { x: -64 },
};

export default function Reveal({ children, dir = "up", delay = 0, className }: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset[dir] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </motion.div>
  );
}
