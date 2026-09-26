import { getSite, type SiteEntry } from "@/sites/registry"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { ComponentType, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

const EASE = [0.76, 0, 0.24, 1] as const

function Loader({ site, progress }: { site: SiteEntry; progress: number }) {
  const { t } = useTranslation()
  const C = 2 * Math.PI * 110
  return (
    <motion.div className="fixed inset-0 z-[80]" exit={{ pointerEvents: "none" }}>
      {(["top", "bottom"] as const).map((side) => (
        <motion.div
          key={side}
          className={`absolute inset-x-0 h-1/2 ${side === "top" ? "top-0" : "bottom-0"}`}
          style={{ background: site.bg }}
          exit={{ y: side === "top" ? "-100%" : "100%" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        />
      ))}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
        style={{ color: site.accent }}
        exit={{ opacity: 0, scale: 1.3, filter: "blur(8px)" }}
        transition={{ duration: 0.45 }}
      >
        <div className="relative h-60 w-60">
          <svg viewBox="0 0 240 240" className="absolute inset-0 -rotate-90">
            <circle cx="120" cy="120" r="110" fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" />
            <circle
              cx="120"
              cy="120"
              r="110"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress / 100)}
            />
          </svg>
          <motion.div
            className="absolute inset-6"
            animate={{ rotate: [0, -4, 4, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <site.Logo className="h-full w-full" />
          </motion.div>
        </div>
        <div className="flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.4em]">
          <span className="text-3xl font-light tabular-nums tracking-normal">{Math.round(progress)}%</span>
          <span className="opacity-60">{t("sites.loading")}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SiteViewer() {
  const { slug } = useParams()
  const site = getSite(slug)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [Comp, setComp] = useState<ComponentType | null>(null)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!site) return
    window.scrollTo(0, 0)
    let alive = true
    let loaded = false
    let raf = 0
    const min = reduce ? 0 : 1800
    const start = performance.now()
    site.load().then((m) => {
      if (!alive) return
      loaded = true
      setComp(() => m.default)
    })
    const tick = () => {
      const k = min ? Math.min((performance.now() - start) / min, 1) : 1
      const p = 100 * (1 - Math.pow(1 - k, 3))
      setProgress(loaded ? p : Math.min(p, 92))
      if (loaded && k >= 1) setTimeout(() => alive && setDone(true), 200)
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [site, reduce])

  if (!site) return <Navigate to="/#sites" replace />

  return (
    <div className="min-h-screen pt-11" style={{ background: site.bg }}>
      <header className="fixed inset-x-0 top-0 z-[90] flex h-11 items-center justify-between gap-3 border-b border-border/60 bg-background/85 px-3 text-foreground backdrop-blur-xl sm:px-5">
        <button
          type="button"
          onClick={() => setLeaving(true)}
          className="group flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/25 transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          {t("sites.back")}
        </button>
        <span className="hidden truncate text-xs text-muted-foreground sm:block">
          {t("sites.viewing")} <strong className="text-foreground">{site.name}</strong> · {t("sites.by")}
        </span>
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold tracking-tight">
          <img src="/favicon-dark.svg" alt="" className="hidden h-5 w-5 dark:block" />
          <img src="/favicon-light.svg" alt="" className="h-5 w-5 dark:hidden" />
          <span className="hidden sm:inline">
            Matheus<span className="text-primary">.</span>dev
          </span>
        </Link>
      </header>

      {Comp && <Comp />}

      <AnimatePresence>{!done && <Loader site={site} progress={progress} />}</AnimatePresence>

      {leaving && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background"
          initial={{ clipPath: "circle(0% at 60px 22px)" }}
          animate={{ clipPath: "circle(150% at 60px 22px)" }}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
          onAnimationComplete={() => navigate("/#sites")}
        />
      )}
    </div>
  )
}
