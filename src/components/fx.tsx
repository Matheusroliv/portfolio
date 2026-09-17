import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

/* ---------- Cursor spotlight following the mouse (desktop only) ---------- */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });
  const bg = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, hsl(var(--primary) / 0.12), transparent 60%)`;

  useEffect(() => {
    if (reduce || !matchMedia("(pointer:fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (reduce) return null;
  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[1]" style={{ background: bg }} />;
}

/* ---------- Top scroll progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-primary via-accent-2 to-accent-3"
    />
  );
}

/* ---------- Magnetic wrapper: children drift toward the cursor ---------- */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div className={className} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </motion.div>
  );
}

/* ---------- 3D tilt card with glare ---------- */
export function Tilt({ children, className, max = 12 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, hsl(0 0% 100% / 0.18), transparent 55%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className={`perspective-1200 ${className ?? ""}`}>
      <motion.div
        className="preserve-3d relative h-full"
        style={{ rotateX: srx, rotateY: sry }}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        {children}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />
      </motion.div>
    </div>
  );
}

/* ---------- Card whose border/bg glows where the mouse is ---------- */
export function Spotlight({ children, className = "", as: Tag = "div", ...rest }: { children: ReactNode; className?: string; as?: "div" | "a" } & Record<string, unknown>) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag {...rest} onMouseMove={onMove} className={`glass-card glass-card-glow spotlight-card ${className}`}>
      {children}
    </Tag>
  );
}

/* ---------- Count-up number when scrolled into view ---------- */
export function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) });
    return c.stop;
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {v}
      {suffix}
    </span>
  );
}

/* ---------- Section heading with word-by-word reveal ---------- */
export function SectionHeader({ eyebrow, prefix, highlight, subtitle, align = "center" }: { eyebrow: string; prefix: string; highlight: string; subtitle?: string; align?: "center" | "left" }) {
  const words = [...prefix.split(" ").map((w) => ({ w, hl: false })), { w: highlight, hl: true }];
  return (
    <div className={`mb-16 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
        {eyebrow}
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
      </motion.span>
      <h2 className={`mt-4 flex flex-wrap gap-x-3 text-4xl font-bold md:text-6xl ${align === "center" ? "justify-center" : ""}`}>
        {words.map(({ w, hl }, i) => (
          <span key={i} className="overflow-hidden pb-1">
            <motion.span
              className={`inline-block ${hl ? "gradient-text" : ""}`}
              initial={{ y: "110%", rotate: 4 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ---------- Big skewed outlined-text band scrolling on scroll velocity ---------- */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-30%", "0%"] : ["0%", "-30%"]);
  return (
    <div aria-hidden className="relative -my-6 overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <motion.div style={{ x }} className="flex w-max gap-10 whitespace-nowrap text-6xl font-black uppercase tracking-tight md:text-8xl">
        {[...items, ...items, ...items].map((s, i) => (
          <span key={i} className={i % 2 ? "outline-text" : "gradient-text"}>
            {s}
            <span className="mx-6 inline-block h-3 w-3 rounded-full bg-warm align-middle md:h-4 md:w-4" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
