import { ReactNode } from "react";
import { useInView } from "../hooks/use-in-view";

type Dir = "up" | "left" | "right";

interface Props {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
}

export default function Reveal({ children, dir = "up", delay = 0 }: Props) {
  const { ref, isInView } = useInView<HTMLDivElement>("0px 0px -80px 0px");

  const animClass: Record<Dir, string> = {
    up: "animate-slide-up-fade",
    left: "animate-slide-left-fade",
    right: "animate-slide-right-fade"
  };

  return (
    <div
      ref={ref}
      className={`reveal-init ${isInView ? animClass[dir] : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
