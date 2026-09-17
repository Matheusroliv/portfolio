import { SectionHeader, Spotlight } from "@/components/fx";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const items = [
  { key: "codetech", stack: ["NestJS", "React", "Angular", "Vue", "Ionic", "React Native", "Flutter"], color: "from-primary to-accent-2" },
  { key: "tgt", stack: ["React", "React Native", "NestJS", "Angular", "Ionic"], color: "from-accent-2 to-warm" },
  { key: "inss", stack: ["Excel", "GitHub", "HTML"], color: "from-accent-3 to-primary" },
] as const;

export default function Experience() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="experience" className="relative scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            align="left"
            eyebrow={t("experience.eyebrow")}
            prefix={t("experience.title_prefix")}
            highlight={t("experience.title")}
            subtitle={t("experience.subtitle")}
          />
        </div>

        <div ref={ref} className="relative pl-10 md:pl-14">
          <div className="absolute left-[11px] top-0 h-full w-px bg-border md:left-[15px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[11px] top-0 h-full w-px origin-top bg-gradient-to-b from-primary via-accent-2 to-warm shadow-[0_0_16px_hsl(var(--primary))] md:left-[15px]"
          />

          <div className="space-y-10">
            {items.map(({ key, stack, color }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                  className={`absolute -left-10 top-7 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${color} ring-4 ring-background md:-left-14 md:h-8 md:w-8`}
                >
                  <span className="h-2 w-2 rounded-full bg-background" />
                </motion.span>

                <Spotlight className="p-7 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold md:text-2xl">{t(`about.experience.items.${key}.role`)}</h3>
                      <p className={`mt-1 bg-gradient-to-r ${color} bg-clip-text font-semibold text-transparent`}>
                        {t(`about.experience.items.${key}.company`)}
                      </p>
                    </div>
                    <span className="glass-card px-3 py-1 text-xs font-medium text-muted-foreground">
                      {t(`about.experience.items.${key}.period`)}
                    </span>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{t(`about.experience.items.${key}.description`)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {stack.map((s, j) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.08 + i * 0.05 }}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </Spotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
