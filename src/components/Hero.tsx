import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const [text, setText] = useState("");
  const role = t("hero.role");

  useEffect(() => {
    setText("");
  }, [role]);

  useEffect(() => {
    if (text.length < role.length) {
      const id = setTimeout(() => setText(role.slice(0, text.length + 1)), 80);
      return () => clearTimeout(id);
    }
  }, [text, role]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-12 md:pt-32 pb-24 md:pb-32">
      <div className="container mx-auto px-6 relative z-10 text-center space-y-10">
        <Reveal dir="up">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="text-glow">Matheus</span>
            <br />
            <span className="gradient-text">Oliveira</span>
          </h1>
        </Reveal>

        <Reveal dir="up" delay={0.15}>
          <div className="flex justify-center">
            <p className="typewriter text-xl md:text-2xl text-muted-foreground text-center leading-relaxed">
              {text}
              <span aria-hidden className="caret" />
            </p>
          </div>
        </Reveal>

        <Reveal dir="up" delay={0.3}>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("hero.bio")}
          </p>
        </Reveal>

        <Reveal dir="up" delay={0.45}>
          <div className="flex justify-center gap-4">
            <Button className="gradient-button px-8 py-3 text-lg">
              {t("hero.cta_projects")}
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              {t("hero.cta_contact")}
            </Button>
          </div>
        </Reveal>

        <Reveal dir="up" delay={0.6}>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://github.com/seu-usuario"
              className="p-3 glass-card hover:scale-110 transition-transform"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/seu-usuario"
              className="p-3 glass-card hover:scale-110 transition-transform"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:seuemail@exemplo.com"
              className="p-3 glass-card hover:scale-110 transition-transform"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 md:bottom-8 flex justify-center">
        <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
      </div>
    </section>
  );
}
