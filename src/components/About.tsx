import { Counter, SectionHeader, Spotlight, Tilt } from "@/components/fx";
import { motion } from "framer-motion";
import { Code, Github, Linkedin, MapPin, Palette, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiAngular, SiNestjs, SiReact, SiTypescript } from "react-icons/si";

const values = [
  { icon: Code, key: "development", color: "text-primary" },
  { icon: Palette, key: "design", color: "text-accent-2" },
  { icon: Rocket, key: "innovation", color: "text-warm" },
];

const now = [
  { Icon: SiAngular, name: "Angular", pct: 92 },
  { Icon: SiReact, name: "React", pct: 88 },
  { Icon: SiNestjs, name: "NestJS", pct: 84 },
  { Icon: SiTypescript, name: "TypeScript", pct: 95 },
];

function Clock() {
  const { i18n } = useTranslation();
  const [d, setD] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setD(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className="gradient-text block text-4xl font-black tabular-nums md:text-5xl">
      {d.toLocaleTimeString(i18n.language, { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </time>
  );
}

const cell = (i: number) => ({
  initial: { opacity: 0, y: 40, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("about.eyebrow")}
          prefix={t("about.title_prefix")}
          highlight={t("about.highlight")}
          subtitle={t("about.subtitle")}
        />

        <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {/* bio + stats */}
          <motion.div {...cell(0)} className="md:col-span-4 md:row-span-2">
            <Spotlight className="flex h-full flex-col justify-between p-8">
              <p className="text-xl leading-relaxed md:text-2xl">
                {t("about.bento.bio_1")}{" "}
                <span className="gradient-text font-semibold">{t("about.bento.bio_hl")}</span>{" "}
                {t("about.bento.bio_2")}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { n: 6, s: "+", k: "experience" },
                  { n: 3, s: "", k: "companies" },
                  { n: 30, s: "+", k: "projects" },
                ].map(({ n, s, k }) => (
                  <div key={k}>
                    <div className="gradient-text text-4xl font-black md:text-5xl">
                      <Counter to={n} suffix={s} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground md:text-sm">{t(`about.stats.${k}`)}</div>
                  </div>
                ))}
              </div>
            </Spotlight>
          </motion.div>

          {/* clock */}
          <motion.div {...cell(1)} className="md:col-span-2">
            <Spotlight className="flex h-full flex-col justify-between p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-warm" />
                {t("about.bento.clock")}
              </div>
              <Clock />
              <div className="text-sm text-muted-foreground">{t("contact.location_value")}</div>
            </Spotlight>
          </motion.div>

          {/* socials */}
          <motion.div {...cell(2)} className="md:col-span-2">
            <div className="grid h-full grid-cols-2 gap-4">
              {[
                { Icon: Github, href: "https://github.com/Matheusroliv", label: "GitHub", from: "from-primary/30" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/matheusroliv/", label: "LinkedIn", from: "from-accent-3/30" },
              ].map(({ Icon, href, label, from }) => (
                <Tilt key={label} max={16}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`glass-card group flex h-full min-h-[150px] flex-col items-center justify-center gap-3 bg-gradient-to-br ${from} to-transparent`}
                  >
                    <Icon className="h-9 w-9 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[360deg]" />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                </Tilt>
              ))}
            </div>
          </motion.div>

          {/* currently using */}
          <motion.div {...cell(3)} className="md:col-span-3">
            <Spotlight className="h-full p-6">
              <div className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("about.bento.now_title")}
              </div>
              <ul className="space-y-3.5">
                {now.map(({ Icon, name, pct }, i) => (
                  <li key={name} className="flex items-center gap-3 text-sm">
                    <Icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="w-24 font-medium">{name}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-primary via-accent-2 to-accent-3"
                      />
                    </div>
                    <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{pct}%</span>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </motion.div>

          {/* values */}
          <motion.div {...cell(4)} className="md:col-span-3">
            <Spotlight className="h-full p-6">
              <ul className="grid h-full gap-3">
                {values.map(({ icon: Icon, key, color }) => (
                  <li key={key} className="group flex items-start gap-4">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted ${color} transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-semibold">{t(`about.cards.${key}.title`)}</div>
                      <div className="text-sm text-muted-foreground">{t(`about.cards.${key}.description`)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
