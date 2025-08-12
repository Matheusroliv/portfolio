import LanguageSwitch from "@/components/LanguageSwitch"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useTheme } from "@/contexts/ThemeContext"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"

export default function Navbar() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navBg = "bg-background/50 supports-[backdrop-filter]:bg-background/40 backdrop-blur border-b border-border"
  const dropdownBg = "bg-background/50 supports-[backdrop-filter]:bg-background/40 backdrop-blur border-t border-border"
  const logoSrc = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg"

  const navItems = [
    { id: "about", label: t("nav.about", "Sobre") },
    { id: "contact", label: t("nav.contact", "Contato") },
    { id: "games", label: t("nav.games", "Games"), to: "/games" },
  ]

  const smoothScrollTo = (el: HTMLElement, offset = 0, duration = 650) => {
    const startY = window.scrollY || window.pageYOffset
    const targetY = el.getBoundingClientRect().top + startY + offset
    const distance = targetY - startY
    const startTime = performance.now()

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOutCubic(progress)
      window.scrollTo({ top: startY + distance * eased })
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  const handleNavClick = (id: string) => {
    const scrollTo = () => {
      const el = document.getElementById(id)
      if (el) {
        smoothScrollTo(el, 0, 700)
      }
    }
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(scrollTo, 100)
    } else {
      scrollTo()
    }
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className={`transition-colors duration-300 ${navBg}`}>
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoSrc} alt="logo" className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>

          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {navItems.map((item) =>
              item.to ? (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? "text-primary" : "hover:text-primary"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ) : (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className="hover:text-primary"
                    role="link"
                  >
                    {item.label}
                  </button>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <LanguageSwitch />
            <ThemeSwitch />
            <button
              className="md:hidden p-2 rounded hover:bg-muted"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={`
            md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
            ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
            ${dropdownBg}
          `}
        >
          <ul className="flex flex-col gap-2 px-6 py-4 text-sm font-medium">
            {navItems.map((item) =>
              item.to ? (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    className="block py-2 hover:text-primary"
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
                    className="block py-2 hover:text-primary text-left w-full"
                    role="link"
                  >
                    {item.label}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
