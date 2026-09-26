import { AnimatePresence, motion } from "framer-motion"
import { Clock, MapPin, Menu, Phone, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom"
import { BASE, HOURS, INFO } from "./data"
import Home from "./Home"
import Logo from "./Logo"
import "./navalha.css"
import { Booking, Contact, Services, Team } from "./pages"

const NAV = [
  { to: BASE, label: "Início", end: true },
  { to: `${BASE}/servicos`, label: "Serviços" },
  { to: `${BASE}/equipe`, label: "Equipe" },
  { to: `${BASE}/contato`, label: "Contato" },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(scrollY > 40)
    on()
    addEventListener("scroll", on, { passive: true })
    return () => removeEventListener("scroll", on)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-11 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-nv-tan/10 bg-nv-bg/90 py-2 backdrop-blur-md" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link to={BASE} className="group flex items-center gap-3 text-nv-brass">
          <Logo className="h-12 w-12 transition-transform duration-500 group-hover:rotate-[20deg]" />
          <span className="font-rye text-2xl tracking-wide text-nv-tan">Navalha</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `relative font-oswald text-sm uppercase tracking-[0.2em] transition-colors hover:text-nv-brass ${
                  isActive ? "text-nv-brass" : "text-nv-tan/80"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && <motion.span layoutId="nv-nav" className="absolute -bottom-1.5 left-0 right-0 h-px bg-nv-brass" />}
                </>
              )}
            </NavLink>
          ))}
          <Link to={`${BASE}/agendar`} className="nv-btn !px-5 !py-2.5">
            Agendar
          </Link>
        </nav>

        <button type="button" className="p-2 text-nv-tan md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {[...NAV, { to: `${BASE}/agendar`, label: "Agendar horário" }].map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={"end" in n}
                  className={({ isActive }) =>
                    `border-b border-nv-tan/10 py-3 font-oswald uppercase tracking-[0.2em] ${isActive ? "text-nv-brass" : "text-nv-tan"}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  return (
    <footer className="nv-leather relative overflow-hidden border-t-4 border-nv-brass/60">
      <span className="nv-grain nv-noise" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-5 flex items-center gap-4 text-nv-brass">
            <Logo className="h-20 w-20" />
            <div>
              <p className="font-rye text-3xl text-nv-tan">Navalha</p>
              <p className="font-oswald text-xs uppercase tracking-[0.35em] text-nv-tan/60">Barbearia de respeito</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-nv-tan/70">
            Couro, madeira, café coado e navalha afiada. Desde 2012 cuidando do visual de quem não abre mão de tradição.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
              { Icon: FaWhatsapp, href: `https://wa.me/${INFO.whatsapp}`, label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-nv-tan/30 text-nv-tan transition-colors hover:border-nv-brass hover:bg-nv-brass hover:text-nv-bg"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 flex items-center gap-2 font-oswald text-sm uppercase tracking-[0.3em] text-nv-brass">
            <Clock className="h-4 w-4" /> Horários
          </h4>
          <ul className="space-y-1.5 text-sm text-nv-tan/80">
            {[...HOURS.slice(1), HOURS[0]].map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className={h.open ? "" : "text-nv-rust"}>{h.open ? `${h.open[0]}h – ${h.open[1]}h` : "Fechado"}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-oswald text-sm uppercase tracking-[0.3em] text-nv-brass">Visite</h4>
          <p className="flex gap-2 text-sm text-nv-tan/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {INFO.address}
              <br />
              {INFO.city}
            </span>
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-nv-tan/80">
            <Phone className="h-4 w-4" /> {INFO.phone}
          </p>
        </div>
      </div>
      <div className="relative border-t border-nv-tan/10 py-5 text-center font-oswald text-[11px] uppercase tracking-[0.3em] text-nv-tan/50">
        © {new Date().getFullYear()} Navalha Barbearia · Projeto demonstrativo
      </div>
    </footer>
  )
}

export default function Navalha() {
  const location = useLocation()

  return (
    <div className="nv relative min-h-screen overflow-x-clip">
      <Helmet>
        <title>Navalha Barbearia · Goiânia</title>
        <meta name="description" content="Barbearia country premium em Goiânia. Cortes, barba na navalha, toalha quente e agendamento online." />
      </Helmet>
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
        >
          <Routes location={location}>
            <Route index element={<Home />} />
            <Route path="servicos" element={<Services />} />
            <Route path="equipe" element={<Team />} />
            <Route path="agendar" element={<Booking />} />
            <Route path="contato" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
