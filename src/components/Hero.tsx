import { Magnetic, Tilt } from "@/components/fx";
import { Button } from "@/components/ui/button";
import { FRONTEND_FRAMEWORKS, WHATSAPP_URL } from "@/lib/contact";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { SiAngular, SiFlutter, SiIonic, SiNestjs, SiNodedotjs, SiReact, SiTypescript, SiVuedotjs } from "react-icons/si";

const socials = [
  { icon: Github, href: "https://github.com/Matheusroliv", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/matheusroliv/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:matheusrdeoliv1@gmail.com?subject=Contato%20via%20Portfolio", label: "Email" },
];

const orbit = [SiAngular, SiReact, SiVuedotjs, SiNestjs, SiTypescript, SiFlutter, SiNodedotjs, SiIonic];

/* token colors: k=keyword p=property s=string n=number c=comment */
type Tok = [string, string];
const code: Tok[][] = [
  [["k", "const "], ["", "matheus "], ["", "= "], ["k", "new "], ["f", "Developer"], ["", "({"]],
  [["p", "  role"], ["", ": "], ["s", '"Full Stack"'], ["", ","]],
  [["p", "  frontend"], ["", ": ["], ["s", '"Angular"'], ["", ", "], ["s", '"React"'], ["", ", "], ["s", '"Vue"'], ["", "],"]],
  [["p", "  mobile"], ["", ": ["], ["s", '"React Native"'], ["", ", "], ["s", '"Flutter"'], ["", "],"]],
  [["p", "  backend"], ["", ": ["], ["s", '"NestJS"'], ["", ", "], ["s", '"Node.js"'], ["", "],"]],
  [["p", "  years"], ["", ": "], ["n", "6"], ["", ","]],
  [["p", "  coffee"], ["", ": "], ["n", "Infinity"], ["", ","]],
  [["", "});"]],
  [["", ""]],
  [["k", "await "], ["", "matheus."], ["f", "ship"], ["", "(yourIdea); "], ["c", "// 🚀"]],
];
const tokColor: Record<string, string> = {
  k: "text-accent-2",
  p: "text-primary",
  s: "text-warm",
  n: "text-accent-3",
  f: "text-accent-3",
  c: "text-muted-foreground",
  "": "text-foreground/80",
};
const total = code.flat().reduce((a, [, t]) => a + t.length, 0);

function CodeWindow() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= total) return;
    const id = setTimeout(() => setN((v) => v + 1), 18 + Math.random() * 30);
    return () => clearTimeout(id);
  }, [n]);

  let budget = n;
  let caretLine = -1;
  if (n < total) {
    let acc = 0;
    caretLine = code.findIndex((l) => (acc += l.reduce((a, [, t]) => a + t.length, 0)) >= n);
  }
  return (
    <div className="glass-card overflow-hidden font-mono text-[13px] leading-6 md:text-sm">
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/80" />
        <span className="h-3 w-3 rounded-full bg-warm/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-xs text-muted-foreground">matheus.ts</span>
      </div>
      <pre className="p-5">
        {code.map((line, li) => (
          <div key={li} className="flex">
            <span className="mr-4 w-4 select-none text-right text-muted-foreground/40">{li + 1}</span>
            <span>
              {line.map(([c, t], ti) => {
                if (budget <= 0) return null;
                const slice = t.slice(0, budget);
                budget -= t.length;
                return (
                  <span key={ti} className={tokColor[c]}>
                    {slice}
                  </span>
                );
              })}
              {li === caretLine && <span className="caret" />}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { t } = useTranslation();
  const [fw, setFw] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFw((i) => (i + 1) % FRONTEND_FRAMEWORKS.length), 2200);
    return () => clearInterval(id);
  }, []);

  // background blobs parallax with mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });
  const b1x = useTransform(smx, (v) => v * -40);
  const b1y = useTransform(smy, (v) => v * -40);
  const b2x = useTransform(smx, (v) => v * 60);
  const b2y = useTransform(smy, (v) => v * 60);

  const name = "Matheus Oliveira";

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        mx.set(e.clientX / innerWidth - 0.5);
        my.set(e.clientY / innerHeight - 0.5);
      }}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-32"
    >
      <motion.div style={{ x: b1x, y: b1y }} className="glow-blob animate-float left-[5%] top-[15%] h-80 w-80 bg-primary/50" />
      <motion.div style={{ x: b2x, y: b2y }} className="glow-blob animate-float right-[5%] top-[20%] h-96 w-96 bg-accent-2/40 [animation-delay:1.5s]" />
      <div className="glow-blob animate-float bottom-[5%] left-[40%] h-72 w-72 bg-accent-3/40 [animation-delay:3s]" />
      <div className="glow-blob animate-float bottom-[20%] right-[30%] h-56 w-56 bg-warm/30 [animation-delay:4.5s]" />

      <div className="container relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ---------- copy ---------- */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("hero.badge")}
          </motion.span>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-lg font-medium text-muted-foreground"
          >
            {t("hero.greeting")}
          </motion.p>

          <h1 className="mt-2 text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl md:text-8xl" aria-label={name}>
            {name.split(" ").map((word, wi) => (
              <span key={wi} className={`block ${wi ? "gradient-text" : "text-glow"}`}>
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    aria-hidden
                    className="inline-block cursor-default"
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    whileHover={{ y: -12, scale: 1.15, color: "hsl(var(--warm))" }}
                    transition={{ delay: 0.35 + (wi * 7 + ci) * 0.04, type: "spring", stiffness: 260, damping: 18 }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 flex flex-wrap items-center gap-x-3 text-2xl font-semibold md:text-3xl"
          >
            <span>{t("hero.role_prefix")}</span>
            <span className="relative inline-grid h-[1.4em] min-w-[9ch] overflow-hidden rounded-xl bg-primary/10 px-3 ring-1 ring-primary/25">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={fw}
                  initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-text col-start-1 row-start-1 whitespace-nowrap leading-[1.4em]"
                >
                  {FRONTEND_FRAMEWORKS[fw]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {t("hero.bio")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button asChild className="gradient-button h-12 rounded-full px-8 text-base">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  {t("hero.cta_contact")}
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="outline"
                onClick={() => scrollToId("about")}
                className="h-12 rounded-full border-primary/40 bg-background/30 px-8 text-base backdrop-blur hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {t("hero.cta_about")}
              </Button>
            </Magnetic>
            <div className="flex items-center gap-2 pl-2">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <Magnetic key={label} strength={0.5}>
                  <motion.a
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1, type: "spring" }}
                    className="glass-card glass-card-glow flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- code window + orbit ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-md lg:block"
        >
          <div className="orbit-ring pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/20">
            {orbit.map((Icon, i) => {
              const a = (i / orbit.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${a}deg) translate(280px) rotate(-${a}deg)` }}
                >
                  <span className="orbit-item glass-card -ml-6 -mt-6 grid h-12 w-12 place-items-center text-2xl text-primary">
                    <Icon />
                  </span>
                </span>
              );
            })}
          </div>
          <Tilt max={8}>
            <CodeWindow />
          </Tilt>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="glass-card absolute -bottom-6 -left-10 flex items-center gap-3 px-4 py-3 text-sm"
          >
            <span className="text-2xl">🚀</span>
            <div>
              <div className="font-semibold">{t("hero.float_ship")}</div>
              <div className="text-xs text-muted-foreground">{t("hero.float_ship_sub")}</div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="glass-card absolute -right-8 -top-6 flex items-center gap-3 px-4 py-3 text-sm"
          >
            <span className="text-2xl">⚡</span>
            <div>
              <div className="font-semibold">{t("hero.float_years")}</div>
              <div className="text-xs text-muted-foreground">{t("hero.float_years_sub")}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToId("about")}
        aria-label={t("hero.cta_about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        {t("hero.scroll")}
        <ArrowDown className="h-5 w-5 animate-bounce text-primary" />
      </motion.button>
    </section>
  );
}
