import { SectionHeader } from "@/components/fx"
import { motion } from "framer-motion"
import { Globe, ShieldCheck, Smartphone } from "lucide-react"
import { useTranslation } from "react-i18next"

const items = [
  { key: "web", Icon: Globe, tags: ["React", "Angular", "Vue", "Tailwind"] },
  { key: "mobile", Icon: Smartphone, tags: ["React Native", "Flutter", "Ionic"] },
  { key: "api", Icon: ShieldCheck, tags: ["NestJS", "PostgreSQL", "MongoDB", "2FA"] },
] as const

export default function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow={t("services.eyebrow")} prefix={t("services.prefix")} highlight={t("services.highlight")} subtitle={t("services.subtitle")} />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ key, Icon, tags }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex flex-col p-8"
            >
              <span aria-hidden className="absolute inset-0 rounded-2xl border border-dashed border-border transition-colors group-hover:border-primary/40" />
              {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
                <span key={c} aria-hidden className={`absolute h-4 w-4 border-primary transition-all duration-300 group-hover:h-6 group-hover:w-6 ${c}`} />
              ))}
              <span className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-2xl font-bold tracking-tight">{t(`services.items.${key}.title`)}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{t(`services.items.${key}.desc`)}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
