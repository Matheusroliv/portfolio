import { Button } from "@/components/ui/button";
import { FRONTEND_FRAMEWORKS, WHATSAPP_URL } from "@/lib/contact";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

const socials = [
  { icon: Github, href: "https://github.com/Matheusroliv", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/matheusroliv/", label: "LinkedIn" },
  {
    icon: Mail,
    href: "mailto:matheusrdeoliv1@gmail.com?subject=Contato%20via%20Portfolio&body=Ol%C3%A1%20Matheus%2C%0D%0A",
    label: "Email",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { t } = useTranslation();

  const [text, setText] = useState("");
  const role = t("hero.role");

  useEffect(() => setText(""), [role]);
  useEffect(() => {
    if (text.length < role.length) {
      const id = setTimeout(() => setText(role.slice(0, text.length + 1)), 55);
      return () => clearTimeout(id);
    }
  }, [text, role]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-28 md:pt-32"
    >
      {/* decorative floating glow blobs */}
      <div className="glow-blob animate-float left-[8%] top-[22%] h-64 w-64 bg-primary/40" />
      <div
        className="glow-blob animate-float right-[10%] top-[30%] h-72 w-72 bg-accent-2/30"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="glow-blob animate-float bottom-[12%] left-[35%] h-56 w-56 bg-accent-3/30"
        style={{ animationDelay: "3s" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="glass-card mb-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t("hero.badge")}
        </motion.span>

        <motion.h1
          variants={item}
          className="text-6xl font-bold leading-[1.05] tracking-tight md:text-8xl"
        >
          <span className="text-glow">Matheus</span>
          <br />
          <span className="gradient-text">Oliveira</span>
        </motion.h1>

        <motion.div variants={item} className="mt-6 flex min-h-[2.5rem] justify-center">
          <p className="typewriter text-xl font-medium text-muted-foreground md:text-2xl">
            {text}
            <span aria-hidden className="caret" />
          </p>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {t("hero.bio")}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("hero.frameworks_label")}
          </span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {FRONTEND_FRAMEWORKS.map((fw) => (
              <span
                key={fw}
                className="glass-card px-4 py-1.5 text-sm font-medium text-foreground/90"
              >
                {fw}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild className="gradient-button h-12 rounded-full px-8 text-base">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <FaWhatsapp className="mr-2 h-4 w-4" />
              {t("hero.cta_contact")}
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToId("about")}
            className="h-12 rounded-full border-primary/40 bg-background/30 px-8 text-base backdrop-blur transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            {t("hero.cta_about")}
          </Button>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glass-card glass-card-glow flex h-12 w-12 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId("about")}
        aria-label={t("hero.cta_about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="pointer-events-auto absolute inset-x-0 bottom-6 mx-auto flex w-fit justify-center"
      >
        <ArrowDown className="h-6 w-6 animate-bounce text-primary" />
      </motion.button>
    </section>
  );
}
