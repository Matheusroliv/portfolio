import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const Y = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="gradient-text">Matheus Oliveira</span>
            </h3>
            <p className="text-muted-foreground">
              {t("hero.bio")}
            </p>

            <div className="flex gap-4">
              <a href="https://github.com/seu-usuario" className="p-2 glass-card hover:scale-110 transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/seu-usuario" className="p-2 glass-card hover:scale-110 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:seuemail@exemplo.com" className="p-2 glass-card hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("footer.quick_links")}</h4>
            <ul className="space-y-2">
              {(["about", "skills", "projects", "contact"] as const).map((k) => (
                <li key={k}>
                  <a
                    href={`#${k}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`footer.links.${k}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("footer.services")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              {(["web", "api", "consulting", "mentoring"] as const).map((k) => (
                <li key={k}>{t(`footer.services_list.${k}`)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {t("footer.rights", { year: Y })}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              {t("footer.made_with")}
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
