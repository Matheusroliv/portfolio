import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Boxes, Globe, GraduationCap, RefreshCw, Server, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { key: "web", icon: Globe },
  { key: "mobile", icon: Smartphone },
  { key: "api", icon: Server },
  { key: "saas", icon: Boxes },
  { key: "migration", icon: RefreshCw },
  { key: "consulting", icon: GraduationCap },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <Reveal dir="up">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t("services.eyebrow")}
            </span>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              {t("services.title_prefix")}{" "}
              <span className="gradient-text">{t("services.title")}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon: Icon }, i) => (
            <Reveal key={key} dir="up" delay={(i % 3) * 0.1}>
              <Card className="glass-card glass-card-glow h-full border-0 bg-transparent p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent-2/20 ring-1 ring-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {t(`services.items.${key}.description`)}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
