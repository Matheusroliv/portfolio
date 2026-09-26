import { SectionHeader, Tilt } from "@/components/fx"
import { sites, type SiteEntry } from "@/sites/registry"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"
import { MouseEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

type Launch = { site: SiteEntry; rect: DOMRect }

export default function SiteGrid() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [launch, setLaunch] = useState<Launch | null>(null)

  const open = (site: SiteEntry, e: MouseEvent<HTMLButtonElement>) => {
    site.load()
    setLaunch({ site, rect: e.currentTarget.getBoundingClientRect() })
  }

  return (
    <section id="sites" className="scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow={t("sites.eyebrow")} prefix={t("sites.title")} highlight={t("sites.highlight")} subtitle={t("sites.subtitle")} />

        <div className="flex flex-wrap justify-center gap-6 [&>*]:w-full sm:[&>*]:w-[calc(50%-0.75rem)] lg:[&>*]:w-[calc(33.333%-1rem)]">
          {sites.map((site, i) => (
            <motion.div
              key={site.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Tilt className="h-full" max={8}>
                <button
                  type="button"
                  onClick={(e) => open(site, e)}
                  onMouseEnter={() => site.load()}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl text-left shadow-xl ring-1 ring-border"
                >
                  <img
                    src={site.cover}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, ${site.bg}55 0%, ${site.bg}ee 65%, ${site.bg} 100%)` }}
                  />
                  <div className="relative flex h-full flex-col items-center justify-between p-6" style={{ color: site.accent }}>
                    <div className="flex w-full justify-end">
                      <span className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur transition-colors group-hover:bg-white group-hover:text-black">
                        {t("sites.open")} <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <site.Logo className="w-40 drop-shadow-[0_10px_30px_rgba(0,0,0,.6)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105" />
                    <div className="w-full space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-white">{site.name}</h3>
                        <p className="text-sm text-white/70">{t(`sites.items.${site.slug}`)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {site.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </Tilt>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: sites.length * 0.08, duration: 0.5 }}
            className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border p-8 text-center text-muted-foreground"
          >
            <Plus className="h-8 w-8" />
            <span className="font-semibold text-foreground">{t("sites.soon")}</span>
            <span className="text-sm">{t("sites.soon_body")}</span>
          </motion.div>
        </div>
      </div>

      {launch && (
        <motion.div
          className="fixed z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: launch.site.bg, color: launch.site.accent }}
          initial={{
            top: launch.rect.top,
            left: launch.rect.left,
            width: launch.rect.width,
            height: launch.rect.height,
            borderRadius: 24,
          }}
          animate={{ top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 }}
          transition={{ duration: reduce ? 0 : 0.75, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => navigate(`/sites/${launch.site.slug}`)}
        >
          <motion.div
            initial={{ scale: 0.6, rotate: -20, opacity: 0.6 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <launch.site.Logo className="w-40" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
