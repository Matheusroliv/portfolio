import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Flame, MapPin, Scissors, Sparkles, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { BASE, HOURS, IMG, INFO, openNow, REVIEWS, SERVICES, brl } from "./data"
import Scene from "./Scene"
import { Ornament, Stars, Title } from "./ui"

const FEATURED = [
  { id: "navalhado", Icon: Scissors, img: IMG.cut },
  { id: "barba", Icon: Flame, img: IMG.towel },
  { id: "rodeio", Icon: Sparkles, img: IMG.chair },
].map((f) => ({ ...f, s: SERVICES.find((s) => s.id === f.id)! }))

const STATS = [
  ["12", "anos de estrada"],
  ["18 mil", "cortes feitos"],
  ["4,9", "nota no Google"],
  ["4", "mestres barbeiros"],
]

const GALLERY = [IMG.interior, IMG.fade, IMG.tools, IMG.beardScissors, IMG.clipper, IMG.shave]

const up = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } }

export default function Home() {
  const today = HOURS[new Date().getDay()]
  const open = openNow()

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-2.75rem)] items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_40%,rgb(var(--nv-saddle)/.35),transparent_70%)]" />
        <span className="nv-grain nv-noise" />
        <Scene className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nv-bg to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-56 md:pt-32">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex items-center gap-3 font-oswald text-xs uppercase tracking-[0.45em] text-nv-brass"
          >
            <span className="h-px w-10 bg-nv-brass" /> Barbearia · Goiânia · Desde 2012
          </motion.p>
          <h1 className="max-w-2xl font-oswald text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
            {["Corte afiado,", "alma de couro."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i ? "text-nv-brass" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.35 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 max-w-md text-lg italic leading-relaxed text-nv-tan/75"
          >
            Toalha quente, navalha de aço e uma dose de bourbon. Uma barbearia do jeito que tem que ser.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to={`${BASE}/agendar`} className="nv-btn">
              Agendar horário <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to={`${BASE}/servicos`} className="nv-btn nv-btn-ghost">
              Ver serviços
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-oswald text-xs uppercase tracking-[0.2em] text-nv-tan/70"
          >
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${open ? "animate-pulse bg-green-500" : "bg-nv-rust"}`} />
              {open ? `Aberto até ${today.open![1]}h` : "Fechado agora"}
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-nv-brass text-nv-brass" /> 4,9 · 1.240 avaliações
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-nv-brass" /> Setor Oeste
            </span>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-nv-tan/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown />
        </motion.div>
      </section>

      <div className="nv-leather relative overflow-hidden border-y border-nv-brass/40 py-5">
        <div className="nv-marquee flex w-max gap-10 whitespace-nowrap font-rye text-2xl text-nv-tan/90">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Corte", "Barba", "Toalha quente", "Navalha", "Bourbon", "Café coado", "Tradição"].map((w) => (
              <span key={w + k} className="flex items-center gap-10">
                {w} <Star className="h-4 w-4 fill-nv-brass text-nv-brass" />
              </span>
            ))
          )}
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-28 md:grid-cols-2">
        <motion.div {...up} transition={{ duration: 0.7 }} className="relative">
          <img src={IMG.interior} alt="Interior da Navalha" loading="lazy" className="nv-photo aspect-[4/5] w-full rounded-sm object-cover" />
          <div className="nv-leather nv-stitch absolute -bottom-8 -right-4 rounded-md px-7 py-6 shadow-2xl md:-right-10">
            <p className="font-rye text-5xl text-nv-brass">12</p>
            <p className="font-oswald text-xs uppercase tracking-[0.3em] text-nv-tan/80">anos de navalha</p>
          </div>
        </motion.div>
        <div>
          <Title eyebrow="Nossa história" center={false}>
            Cheiro de couro <span className="text-nv-brass">& café coado</span>
          </Title>
          <motion.div {...up} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5 leading-relaxed text-nv-tan/75">
            <p>
              A Navalha nasceu em 2012, num galpão antigo de selaria no Setor Oeste. O Tião trouxe a cadeira do avô, uma navalha
              solingen e a ideia fixa de que barbearia é lugar de conversa, não de pressa.
            </p>
            <p>
              Hoje somos quatro mestres, um saloon com bourbon e cachaça de amburana, e a mesma regra de sempre: cada cliente sai
              daqui com o corte certo e vontade de voltar.
            </p>
          </motion.div>
          <p className="mt-8 font-rye text-3xl text-nv-brass">Tião Ferraz</p>
          <p className="font-oswald text-xs uppercase tracking-[0.3em] text-nv-tan/50">Fundador</p>
        </div>
      </section>

      <section className="bg-nv-bg2 py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Title eyebrow="O que fazemos">Serviços da casa</Title>
          <div className="grid gap-8 md:grid-cols-3">
            {FEATURED.map(({ s, Icon, img }, i) => (
              <motion.article
                key={s.id}
                {...up}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-md"
              >
                <img src={img} alt="" loading="lazy" className="nv-photo h-96 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-nv-bg via-nv-bg/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <Icon className="mb-4 h-8 w-8 text-nv-brass" />
                  <h3 className="font-oswald text-2xl font-semibold uppercase tracking-wide">{s.name}</h3>
                  <p className="mt-2 text-sm text-nv-tan/70">{s.desc}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-nv-tan/15 pt-4">
                    <span className="font-rye text-2xl text-nv-brass">{brl(s.price)}</span>
                    <Link
                      to={`${BASE}/agendar?servico=${s.id}`}
                      className="flex items-center gap-1 font-oswald text-xs uppercase tracking-[0.2em] text-nv-tan transition-colors hover:text-nv-brass"
                    >
                      Agendar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to={`${BASE}/servicos`} className="nv-btn nv-btn-ghost">
              Cardápio completo
            </Link>
          </div>
        </div>
      </section>

      <section className="nv-leather relative overflow-hidden py-20">
        <span className="nv-grain nv-noise" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
          {STATS.map(([n, l], i) => (
            <motion.div key={l} {...up} transition={{ delay: i * 0.1 }} className="text-center">
              <p className="font-rye text-5xl text-nv-brass md:text-6xl">{n}</p>
              <p className="mt-2 font-oswald text-xs uppercase tracking-[0.3em] text-nv-tan/80">{l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Title eyebrow="Galeria">Na cadeira</Title>
        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
          {GALLERY.map((src, i) => (
            <motion.div
              key={src}
              {...up}
              transition={{ delay: i * 0.07 }}
              className={`group overflow-hidden rounded-sm ${i === 0 ? "col-span-2 row-span-2" : ""} ${i === 3 ? "row-span-2" : ""}`}
            >
              <img src={src} alt="" loading="lazy" className="nv-photo h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:sepia-0" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-nv-bg2 py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Title eyebrow="Quem senta, volta">Palavra de cliente</Title>
          <div className="grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.blockquote
                key={r.name}
                {...up}
                transition={{ delay: i * 0.12 }}
                className="nv-leather nv-stitch rounded-md p-8 shadow-xl"
              >
                <span className="font-rye text-6xl leading-none text-nv-brass/60">“</span>
                <p className="-mt-4 italic leading-relaxed text-nv-tan/85">{r.text}</p>
                <footer className="mt-6 flex items-center justify-between">
                  <span className="font-oswald text-sm uppercase tracking-[0.2em]">{r.name}</span>
                  <Stars n={r.stars} />
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-32 text-center">
        <img src={IMG.chair} alt="" loading="lazy" className="nv-photo absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-nv-bg via-nv-bg/60 to-nv-bg" />
        <motion.div {...up} className="relative mx-auto max-w-2xl px-6">
          <Ornament className="mb-8" />
          <h2 className="font-oswald text-5xl font-bold uppercase leading-none md:text-7xl">
            A cadeira <span className="text-nv-brass">está livre</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-nv-tan/70">
            Agende em menos de um minuto. Sem fila, sem espera — só chegar, sentar e aproveitar.
          </p>
          <Link to={`${BASE}/agendar`} className="nv-btn mt-10">
            Reservar minha cadeira <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-6 font-oswald text-xs uppercase tracking-[0.25em] text-nv-tan/50">
            {INFO.address} · {INFO.phone}
          </p>
        </motion.div>
      </section>
    </>
  )
}
