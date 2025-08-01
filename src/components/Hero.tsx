import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const [idx, setIdx] = useState(0);

  const fullText = t("hero.role");

  useEffect(() => {
    if (idx < fullText.length) {
      const id = setTimeout(() => {
        setDisplayText((p) => p + fullText[idx]);
        setIdx((i) => i + 1);
      }, 80);
      return () => clearTimeout(id);
    }
  }, [idx, fullText]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-glow">Matheus</span>
              <br />
              <span className="gradient-text">Oliveira</span>
            </h1>

            <div className="h-16 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-muted-foreground">
                {displayText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("hero.bio")}
          </p>

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

          <div className="flex justify-center gap-6 pt-8">
            <a href="https://github.com/seu-usuario" className="p-3 glass-card hover:scale-110 transition-all duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/seu-usuario" className="p-3 glass-card hover:scale-110 transition-all duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:seuemail@exemplo.com" className="p-3 glass-card hover:scale-110 transition-all duration-300">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
}
