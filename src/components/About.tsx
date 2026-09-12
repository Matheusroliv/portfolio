import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Github, Linkedin, Mail, Palette, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

const socials = [
  { icon: Github, href: "https://github.com/Matheusroliv", key: "github" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/matheusroliv/", key: "linkedin" },
  {
    icon: Mail,
    href: "mailto:matheusrdeoliv1@gmail.com?subject=Contato%20via%20Portfolio&body=Ol%C3%A1%20Matheus%2C%0D%0A",
    key: "email",
  },
];

export default function About() {
  const { t } = useTranslation();

  const cards = [
    { icon: Code, key: "development" },
    { icon: Palette, key: "design" },
    { icon: Rocket, key: "innovation" },
  ];

  const stats = [
    { value: "5+", key: "experience" },
    { value: "3", key: "companies" },
    { value: "∞", key: "coffee" },
  ];

  const experience = ["okegen", "codetech", "tgt"] as const;

  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <Reveal dir="up">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t("about.eyebrow", "Quem sou")}
            </span>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              {t("about.title_prefix", "Sobre")}{" "}
              <span className="gradient-text">{t("about.highlight", "Mim")}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("about.subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal dir="up" delay={0.1}>
          <div className="mb-12 flex justify-center gap-4">
            {socials.map(({ icon: Icon, href, key }) => (
              <a
                key={key}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={t(`about.social.${key}`)}
                className="glass-card glass-card-glow flex h-12 w-12 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* stats strip */}
        <Reveal dir="up" delay={0.15}>
          <div className="mb-12 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.key} className="glass-card p-5 text-center md:p-6">
                <div className="gradient-text text-3xl font-bold md:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {t(`about.stats.${s.key}`)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <div className="grid gap-6">
            {cards.map(({ icon: Icon, key }, i) => (
              <Reveal key={key} dir="left" delay={i * 0.12}>
                <Card className="glass-card glass-card-glow border-0 bg-transparent p-7">
                  <header className="mb-4 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent-2/20 ring-1 ring-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{t(`about.cards.${key}.title`)}</h3>
                  </header>
                  <p className="leading-relaxed text-muted-foreground">
                    {t(`about.cards.${key}.description`)}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal dir="right" delay={0.15}>
            <Card className="glass-card border-0 bg-transparent p-7 md:p-8">
              <h3 className="mb-8 text-2xl font-bold">{t("about.experience.title")}</h3>
              <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-primary before:via-accent-2/50 before:to-transparent">
                {experience.map((k, i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative pl-8"
                  >
                    <span
                      className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-background ${
                        i === 0 ? "bg-primary shadow-[0_0_12px_hsl(var(--primary))]" : "bg-muted-foreground/40"
                      }`}
                    />
                    <h4 className="text-lg font-semibold">
                      {t(`about.experience.items.${k}.role`)}
                    </h4>
                    <p className="text-sm font-medium text-primary">
                      {t(`about.experience.items.${k}.company`)} •{" "}
                      {t(`about.experience.items.${k}.period`)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`about.experience.items.${k}.description`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
