import { Magnetic } from "@/components/fx"
import { WHATSAPP_URL } from "@/lib/contact"
import { motion } from "framer-motion"
import { ArrowDown, Download } from "lucide-react"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { FaWhatsapp } from "react-icons/fa"

const DevScene = lazy(() => import("./DevScene"))

const ease = [0.22, 1, 0.36, 1] as const
const item = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.1 + i * 0.1, duration: 0.7, ease },
})

export default function Hero() {
  const { t } = useTranslation()
  const stats = [
    [t("hero.stat_years"), t("hero.stat_years_label")],
    [t("hero.stat_stack"), t("hero.stat_stack_label")],
    [t("hero.stat_loc"), t("hero.stat_loc_label")],
  ]

  return (
    <section id="home" className="relative overflow-x-clip px-6 pb-12 pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-2 xl:grid-cols-[1fr_1.1fr]">
        <div className="relative z-10 min-w-0">
          <motion.div {...item(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("hero.badge")}
          </motion.div>

          <motion.p {...item(1)} className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.2em]">
            Matheus Oliveira · {t("hero.eyebrow")}
          </motion.p>

          <h1 className="text-[2.5rem] font-black leading-[0.95] tracking-tight min-[400px]:text-5xl sm:text-6xl lg:text-[3.5rem] xl:text-7xl">
            {[t("hero.title_1"), t("hero.title_hl")].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-2">
                <motion.span
                  className={`block ${i ? "gradient-text" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 0.9, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...item(4)} className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {t("hero.bio")}
          </motion.p>

          <motion.div {...item(5)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}>
              <a href="#sites" className="gradient-button inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold">
                {t("hero.cta_sites")} <ArrowDown className="h-4 w-4" />
              </a>
            </Magnetic>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/60 px-6 text-sm font-semibold backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              <FaWhatsapp className="h-4 w-4" /> {t("hero.cta_contact")}
            </a>
            <a
              href="/curriculo-matheus-oliveira.pdf"
              download
              className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <Download className="h-4 w-4" /> {t("hero.cv")}
            </a>
          </motion.div>

          <motion.dl {...item(6)} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map(([v, l]) => (
              <div key={l}>
                <dt className="text-lg font-bold leading-tight tracking-tight sm:whitespace-nowrap sm:text-2xl">{v}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease }}
          className="relative h-[340px] w-full max-w-full overflow-hidden sm:h-[500px] lg:h-[640px]"
        >
          <Suspense fallback={<div className="absolute inset-0 m-auto h-40 w-40 animate-pulse rounded-full bg-primary/10" />}>
            <DevScene hint={t("hero.scene_hint")} hello={t("hero.scene_hello")} />
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}
