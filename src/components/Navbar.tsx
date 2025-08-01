import LanguageSwitch from "@/components/LanguageSwitch"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useTheme } from "@/contexts/ThemeContext"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navBg = scrolled
    ? "bg-background/80 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b border-border"
    : "bg-transparent"

  const logoSrc = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg"

  const navItems = [
    { id: "about", label: t("footer.links.about") },
    { id: "projects", label: t("footer.links.projects") },
    { id: "games", label: t("nav.games", "Games"), to: "/games" },
  ]

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
                  <a href={`#${item.id}`} className="hover:text-primary">
                    {item.label}
                  </a>
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
            bg-background/90 supports-[backdrop-filter]:bg-background/70 backdrop-blur border-t border-border
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
                  <a
                    href={`#${item.id}`}
                    className="block py-2 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
