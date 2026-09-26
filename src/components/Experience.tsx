import { SectionHeader } from "@/components/fx"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { useTranslation } from "react-i18next"

const jobs = ["codetech", "tgt", "inss"] as const
const edu = ["puc", "ucb", "labenu"] as const

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader eyebrow={t("experience.eyebrow")} prefix={t("experience.prefix")} highlight={t("experience.highlight")} subtitle={t("experience.subtitle")} />

        <ol className="relative space-y-12 border-l border-border pl-8 md:ml-40">
          {jobs.map((job, i) => (
            <motion.li
              key={job}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative"
            >
              <span className={`absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-background ${i ? "bg-muted-foreground/40" : "bg-primary"}`} />
              <p className="mb-2 text-sm font-medium text-muted-foreground md:absolute md:-left-48 md:top-0 md:w-36 md:text-right">
                {t(`experience.jobs.${job}.period`)}
              </p>
              <h3 className="text-xl font-bold tracking-tight">
                {t(`experience.jobs.${job}.role`)} <span className="text-primary">· {t(`experience.jobs.${job}.company`)}</span>
              </h3>
              <p className="text-sm text-muted-foreground">{t(`experience.jobs.${job}.place`)}</p>
              <ul className="mt-4 space-y-2">
                {(t(`experience.jobs.${job}.points`, { returnObjects: true }) as string[]).map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-muted-foreground">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>

        <h3 className="mb-6 mt-20 flex items-center gap-2 text-lg font-semibold">
          <GraduationCap className="h-5 w-5 text-primary" /> {t("experience.education")}
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {edu.map((e, i) => (
            <motion.div
              key={e}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <p className="text-xs font-medium text-muted-foreground">{t(`experience.edu.${e}.period`)}</p>
              <p className="mt-2 font-semibold leading-snug">{t(`experience.edu.${e}.title`)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(`experience.edu.${e}.org`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
