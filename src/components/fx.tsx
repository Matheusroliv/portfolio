import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";
import { MouseEvent, ReactNode } from "react";

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

