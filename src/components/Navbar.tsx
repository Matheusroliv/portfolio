import LanguageSwitch from "@/components/LanguageSwitch"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useTheme } from "@/contexts/ThemeContext"
import { AnimatePresence, motion } from "framer-motion"
import { Download, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation, useNavigate } from "react-router-dom"

const IDS = ["sites", "services", "experience", "stack", "contact"] as const

export default function Navbar() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== "/") return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    ;["home", ...IDS].forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [location.pathname])

  const go = (id: string) => {
    setOpen(false)
    if (location.pathname !== "/") navigate(`/#${id}`)
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  if (location.pathname.startsWith("/sites/")) return null

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <nav
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          scrolled || open ? "glass-card border-border/60 py-2.5 shadow-lg" : "border-transparent bg-transparent py-3.5"
        }`}
      >
        <div className="flex items-center justify-between px-4">
          <Link to="/" className="group flex items-center gap-2.5" onClick={() => go("home")}>
            <img src={theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg"} alt="" className="h-7 w-7 transition-transform group-hover:rotate-12" />
            <span className="text-sm font-semibold tracking-tight">
              Matheus<span className="text-primary">.</span>dev
            </span>
          </Link>

          <ul className="hidden items-center gap-1 text-sm font-medium lg:flex">
            {IDS.map((id) => (
              <li key={id}>
                <button type="button" onClick={() => go(id)} className="relative rounded-full px-4 py-2 transition-colors hover:text-primary">
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/12 ring-1 ring-primary/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={active === id ? "text-primary" : ""}>{t(`nav.${id}`)}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/curriculo-matheus-oliveira.pdf"
              download
              className="hidden items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" /> {t("nav.cv")}
            </a>
            <LanguageSwitch />
            <ThemeSwitch />
            <button className="rounded-lg p-2 transition-colors hover:bg-muted lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden px-4 text-sm font-medium lg:hidden"
            >
              <div className="py-3">
                {IDS.map((id) => (
                  <li key={id}>
                    <button type="button" onClick={() => go(id)} className="block w-full rounded-lg px-3 py-2.5 text-left hover:bg-muted hover:text-primary">
                      {t(`nav.${id}`)}
                    </button>
                  </li>
                ))}
                <li>
                  <a href="/curriculo-matheus-oliveira.pdf" download className="flex items-center gap-2 rounded-lg px-3 py-2.5 hover:bg-muted hover:text-primary">
                    <Download className="h-4 w-4" /> {t("nav.cv")}
                  </a>
                </li>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
