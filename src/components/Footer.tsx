import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const socials = [
  { icon: Github, href: "https://github.com/Matheusroliv", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/matheusroliv/", label: "LinkedIn" },
  {
    icon: Mail,
    href: "mailto:matheusrdeoliv1@gmail.com?subject=Contato%20via%20Portfolio&body=Ol%C3%A1%20Matheus%2C%0D%0A",
    label: "Email",
  },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 pb-10 pt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="glass-card p-8 md:p-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">
                <span className="gradient-text">Matheus&nbsp;Oliveira</span>
              </h3>
              <p className="max-w-xs text-sm text-muted-foreground">{t("footer.tagline")}</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="glass-card glass-card-glow flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t("footer.quick_links")}</h4>
              <ul className="space-y-2 text-sm">
                {(["about", "contact", "games"] as const).map((k) => (
                  <li key={k}>
                    {k === "games" ? (
                      <Link to="/games" className="text-muted-foreground transition-colors hover:text-primary">
                        {t(`nav.${k}`)}
                      </Link>
                    ) : (
                      <a href={`#${k}`} className="text-muted-foreground transition-colors hover:text-primary">
                        {t(`nav.${k}`)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t("footer.services")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(["web", "api"] as const).map((k) => (
                  <li key={k}>{t(`footer.services_list.${k}`)}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
            <p className="text-sm text-muted-foreground">{t("footer.rights", { year })}</p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              {t("footer.made_with")}
              <Heart className="h-4 w-4 animate-pulse text-red-500" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
