import LanguageSwitch from "@/components/LanguageSwitch"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useTheme } from "@/contexts/ThemeContext"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"

export default function Navbar() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")
  const navigate = useNavigate()
  const location = useLocation()

  const logoSrc = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg"

  const navItems = [
    { id: "home", label: t("nav.home", "Início") },
    { id: "about", label: t("nav.about", "Sobre") },
    { id: "experience", label: t("nav.experience", "Experiência") },
    { id: "skills", label: t("nav.skills", "Stack") },
    { id: "services", label: t("nav.services", "Serviços") },
    { id: "contact", label: t("nav.contact", "Contato") },
    { id: "games", label: t("nav.games", "Games"), to: "/games" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== "/") return
    const ids = ["home", "about", "experience", "skills", "services", "contact"]
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [location.pathname])

  const handleNavClick = (id: string) => {
    const scrollTo = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(scrollTo, 120)
    } else {
      scrollTo()
    }
    setActive(id)
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <nav
        className={`container mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass-card border-border/60 py-2.5 shadow-lg"
            : "border-transparent bg-transparent py-3.5"
        }`}
      >
        <div className="flex items-center justify-between px-4">
          <Link to="/" className="group flex items-center gap-2.5" onClick={() => handleNavClick("home")}>
            <img src={logoSrc} alt="logo" className="h-7 w-7 transition-transform group-hover:rotate-12" />
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">
              Matheus<span className="text-primary">.</span>dev
            </span>
          </Link>

          <ul className="hidden items-center gap-1 text-sm font-medium md:flex">
            {navItems.map((item) => {
              const isActive = item.to ? location.pathname === item.to : active === item.id
              const inner = (
                <span className="relative rounded-full px-4 py-2 transition-colors hover:text-primary">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/12 ring-1 ring-primary/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? "text-primary" : ""}>{item.label}</span>
                </span>
              )
              return (
                <li key={item.id}>
                  {item.to ? (
                    <NavLink to={item.to}>{inner}</NavLink>
                  ) : (
                    <button type="button" onClick={() => handleNavClick(item.id)} role="link">
                      {inner}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitch />
            <ThemeSwitch />
            <button
              className="rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
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
              className="flex flex-col gap-1 overflow-hidden px-4 text-sm font-medium md:hidden"
            >
              <div className="py-3">
                {navItems.map((item) =>
                  item.to ? (
                    <li key={item.id}>
                      <NavLink
                        to={item.to}
                        className="block rounded-lg px-3 py-2.5 hover:bg-muted hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ) : (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className="block w-full rounded-lg px-3 py-2.5 text-left hover:bg-muted hover:text-primary"
                        role="link"
                      >
                        {item.label}
                      </button>
                    </li>
                  )
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
