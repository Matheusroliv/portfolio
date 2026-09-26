import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Clock, MapPin, Phone, Plus, User } from "lucide-react"
import { useMemo, useState } from "react"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { Link, useSearchParams } from "react-router-dom"
import { BASE, HOURS, IMG, INFO, MENU, PLANS, SALOON, SERVICES, TEAM, brl, openNow } from "./data"
import { Ornament, PageHero, Title } from "./ui"

const up = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" } }

/* ------------------------------ Serviços ------------------------------ */

export function Services() {
  return (
    <>
      <PageHero eyebrow="Cardápio da casa" title={<>Serviços <span className="text-nv-brass">& valores</span></>} img={IMG.tools}>
        <div className="mt-8 flex flex-wrap gap-2">
          {[...MENU.map((c) => c.cat), "Saloon", "Clube"].map((c) => (
            <a
              key={c}
              href={`#${c}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(c)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="rounded-full border border-nv-tan/25 px-4 py-1.5 font-oswald text-xs uppercase tracking-[0.2em] transition-colors hover:border-nv-brass hover:bg-nv-brass hover:text-nv-bg"
            >
              {c}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-x-16 gap-y-20 px-6 py-24 lg:grid-cols-2">
        {MENU.map((cat) => (
          <motion.div key={cat.cat} id={cat.cat} {...up} className="scroll-mt-40">
            <h2 className="font-rye text-4xl text-nv-brass">{cat.cat}</h2>
            <p className="mb-8 mt-2 text-sm italic text-nv-tan/60">{cat.note}</p>
            <ul className="space-y-7">
              {cat.items.map((s) => (
                <li key={s.id} className="group">
                  <div className="flex items-end">
                    <h3 className="font-oswald text-lg font-medium uppercase tracking-wider">{s.name}</h3>
                    {s.tag && (
                      <span className="mb-1 ml-3 rounded-sm bg-nv-rust px-2 py-0.5 font-oswald text-[10px] uppercase tracking-widest">
                        {s.tag}
                      </span>
                    )}
                    <span className="nv-leader" />
                    <span className="font-rye text-xl text-nv-brass">{brl(s.price)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-4 text-sm text-nv-tan/60">
                    <p>
                      {s.desc} <span className="text-nv-tan/40">· {s.min} min</span>
                    </p>
                    <Link
                      to={`${BASE}/agendar?servico=${s.id}`}
                      className="shrink-0 font-oswald text-xs uppercase tracking-[0.2em] text-nv-brass opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100"
                    >
                      Agendar →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      <section id="Saloon" className="nv-leather relative scroll-mt-28 overflow-hidden py-24">
        <span className="nv-grain nv-noise" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <motion.div {...up} className="nv-stitch rounded-md border border-nv-brass/40 bg-nv-bg/70 p-10 shadow-2xl">
            <p className="text-center font-oswald text-xs uppercase tracking-[0.45em] text-nv-brass">Enquanto espera</p>
            <h2 className="mt-2 text-center font-rye text-5xl">Saloon</h2>
            <Ornament className="my-6" />
            <ul className="space-y-5">
              {SALOON.map((d) => (
                <li key={d.name}>
                  <div className="flex items-end">
                    <span className="font-oswald uppercase tracking-wider">{d.name}</span>
                    <span className="nv-leader" />
                    <span className="font-rye text-nv-brass">{brl(d.price)}</span>
                  </div>
                  <p className="text-sm italic text-nv-tan/55">{d.desc}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-xs text-nv-tan/50">Bebidas alcoólicas apenas para maiores de 18 anos.</p>
          </motion.div>
          <motion.div {...up} transition={{ delay: 0.15 }}>
            <Title eyebrow="Balcão de madeira" center={false}>
              Uma dose <span className="text-nv-brass">de cortesia</span>
            </Title>
            <p className="leading-relaxed text-nv-tan/75">
              Todo combo acompanha uma dose por nossa conta. Bourbon, cachaça de amburana ou um café coado na hora — você escolhe
              enquanto a toalha esquenta.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="Clube" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-28">
        <Title eyebrow="Assinatura mensal">Clube Navalha</Title>
        <div className="grid items-center gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              {...up}
              transition={{ delay: i * 0.12 }}
              className={`relative rounded-md p-9 ${
                p.featured ? "nv-leather nv-stitch py-12 shadow-2xl shadow-nv-brass/10 ring-1 ring-nv-brass/60" : "border border-nv-tan/15 bg-nv-bg2"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-nv-brass px-3 py-1 font-oswald text-[10px] font-semibold uppercase tracking-[0.25em] text-nv-bg">
                  Favorito
                </span>
              )}
              <h3 className="font-rye text-3xl">{p.name}</h3>
              <p className="mt-4 font-oswald text-5xl font-bold text-nv-brass">
                {brl(p.price)}
                <span className="text-base font-normal text-nv-tan/50">/mês</span>
              </p>
              <ul className="my-8 space-y-3 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-nv-tan/80">
                    <Check className="h-4 w-4 shrink-0 text-nv-brass" /> {perk}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${INFO.whatsapp}?text=${encodeURIComponent(`Quero assinar o plano ${p.name} do Clube Navalha`)}`}
                target="_blank"
                rel="noreferrer"
                className={`nv-btn w-full ${p.featured ? "" : "nv-btn-ghost"}`}
              >
                Assinar
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ------------------------------ Equipe ------------------------------ */

export function Team() {
  return (
    <>
      <PageHero eyebrow="Os homens da navalha" title={<>Nossa <span className="text-nv-brass">equipe</span></>} img={IMG.beard} />
      <section className="mx-auto max-w-6xl space-y-24 px-6 py-24">
        {TEAM.map((b, i) => (
          <motion.article key={b.id} {...up} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="group relative">
              <div className={`absolute -inset-3 rounded-md border border-nv-brass/30 transition-transform duration-500 ${i % 2 ? "-rotate-2" : "rotate-2"} group-hover:rotate-0`} />
              <img src={b.photo} alt={b.name} loading="lazy" className="nv-photo relative aspect-[4/5] w-full rounded-md object-cover" />
              <span className="absolute -bottom-5 left-6 rounded-sm bg-nv-brass px-4 py-2 font-oswald text-xs font-semibold uppercase tracking-[0.25em] text-nv-bg">
                {b.years} anos de ofício
              </span>
            </div>
            <div>
              <p className="font-oswald text-xs uppercase tracking-[0.4em] text-nv-brass">{b.role}</p>
              <h2 className="mt-3 font-rye text-5xl md:text-6xl">{b.name}</h2>
              <p className="mt-6 border-l-2 border-nv-brass pl-5 text-lg italic text-nv-tan/75">“{b.quote}”</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {b.skills.map((s) => (
                  <span key={s} className="rounded-sm border border-nv-tan/20 px-3 py-1 font-oswald text-xs uppercase tracking-widest text-nv-tan/80">
                    {s}
                  </span>
                ))}
              </div>
              <Link to={`${BASE}/agendar?barbeiro=${b.id}`} className="nv-btn mt-10">
                Agendar com {b.name.split(" ")[0]} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </section>
    </>
  )
}

/* ------------------------------ Agendar ------------------------------ */

const STEPS = ["Serviço", "Barbeiro", "Horário", "Seus dados"]
const pad = (n: number) => String(n).padStart(2, "0")
const dayKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const busy = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 4 === 0

export function Booking() {
  const [params] = useSearchParams()
  const initialService = SERVICES.some((s) => s.id === params.get("servico")) ? [params.get("servico")!] : []
  const initialBarber = TEAM.some((b) => b.id === params.get("barbeiro")) ? params.get("barbeiro")! : "any"

  const [step, setStep] = useState(initialService.length ? 1 : 0)
  const [picked, setPicked] = useState<string[]>(initialService)
  const [barber, setBarber] = useState(initialBarber)
  const [day, setDay] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [done, setDone] = useState(false)

  const chosen = SERVICES.filter((s) => picked.includes(s.id))
  const total = chosen.reduce((a, s) => a + s.price, 0)
  const minutes = chosen.reduce((a, s) => a + s.min, 0)
  const barberName = TEAM.find((b) => b.id === barber)?.name ?? "Sem preferência"

  const days = useMemo(() => {
    const out: Date[] = []
    for (let i = 0; out.length < 12 && i < 21; i++) {
      const d = new Date()
      d.setHours(0, 0, 0, 0)
      d.setDate(d.getDate() + i)
      if (HOURS[d.getDay()].open) out.push(d)
    }
    return out
  }, [])

  const slots = useMemo(() => {
    if (!day) return []
    const d = days.find((x) => dayKey(x) === day)!
    const [from, to] = HOURS[d.getDay()].open!
    const now = new Date()
    const out: { t: string; off: boolean }[] = []
    for (let m = from * 60; m + Math.max(minutes, 30) <= to * 60; m += 30) {
      const t = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`
      const past = dayKey(now) === day && m <= now.getHours() * 60 + now.getMinutes()
      out.push({ t, off: past || busy(day + t + barber) })
    }
    return out
  }, [day, days, minutes, barber])

  const phoneDigits = phone.replace(/\D/g, "")
  const valid = [picked.length > 0, true, !!day && !!time, name.trim().length >= 2 && phoneDigits.length >= 10 && phoneDigits.length <= 11]

  const toggle = (id: string) => {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
    setTime(null)
  }

  const dateLabel = (d: Date) => d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" }).replace(/^./, (c) => c.toUpperCase())
  const chosenDate = day ? days.find((x) => dayKey(x) === day) : undefined
  const code = useMemo(() => `NV-${Math.random().toString(36).slice(2, 6).toUpperCase()}`, [done]) // eslint-disable-line react-hooks/exhaustive-deps

  const waText = encodeURIComponent(
    `Olá, Navalha! Quero confirmar meu agendamento ${code}:\n` +
      `• ${chosen.map((s) => s.name).join(", ")}\n• Barbeiro: ${barberName}\n` +
      `• ${chosenDate ? dateLabel(chosenDate) : ""} às ${time}\n• Nome: ${name.trim()}` +
      (note.trim() ? `\n• Obs: ${note.trim()}` : "")
  )

  const reset = () => {
    setDone(false)
    setStep(0)
    setPicked([])
    setDay(null)
    setTime(null)
  }

  return (
    <>
      <PageHero eyebrow="Reserva online" title={<>Agende sua <span className="text-nv-brass">cadeira</span></>} img={IMG.shave} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="nv-leather nv-stitch mx-auto max-w-lg rounded-md p-10 text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-nv-brass text-nv-bg"
            >
              <Check className="h-8 w-8" />
            </motion.div>
            <p className="mt-6 font-oswald text-xs uppercase tracking-[0.4em] text-nv-brass">Reserva {code}</p>
            <h2 className="mt-2 font-rye text-4xl">Tá marcado, {name.trim().split(" ")[0]}!</h2>
            <Ornament className="my-6" />
            <dl className="space-y-2 text-left text-sm">
              {[
                ["Serviços", chosen.map((s) => s.name).join(", ")],
                ["Barbeiro", barberName],
                ["Quando", `${chosenDate ? dateLabel(chosenDate) : ""} · ${time}`],
                ["Total", brl(total)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-nv-tan/10 pb-2">
                  <dt className="text-nv-tan/60">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3">
              <a href={`https://wa.me/${INFO.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer" className="nv-btn">
                <FaWhatsapp /> Confirmar no WhatsApp
              </a>
              <button type="button" onClick={reset} className="nv-btn nv-btn-ghost">
                Novo agendamento
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0">
              <ol className="mb-10 flex gap-2">
                {STEPS.map((s, i) => (
                  <li key={s} className="flex-1">
                    <button
                      type="button"
                      disabled={i > step && !valid.slice(0, i).every(Boolean)}
                      onClick={() => setStep(i)}
                      className="w-full text-left disabled:opacity-40"
                    >
                      <span className={`block h-1 rounded-full transition-colors ${i <= step ? "bg-nv-brass" : "bg-nv-tan/15"}`} />
                      <span className={`mt-2 block font-oswald text-[11px] uppercase tracking-[0.2em] ${i === step ? "text-nv-brass" : "text-nv-tan/50"}`}>
                        {i + 1}. {s}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  {step === 0 && (
                    <div className="space-y-10">
                      {MENU.map((cat) => (
                        <div key={cat.cat}>
                          <h3 className="mb-4 font-rye text-2xl text-nv-brass">{cat.cat}</h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {cat.items.map((s) => {
                              const on = picked.includes(s.id)
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => toggle(s.id)}
                                  className={`flex items-center justify-between gap-4 rounded-sm border p-4 text-left transition-all ${
                                    on ? "border-nv-brass bg-nv-brass/10" : "border-nv-tan/15 hover:border-nv-tan/40"
                                  }`}
                                >
                                  <span>
                                    <span className="block font-oswald uppercase tracking-wider">{s.name}</span>
                                    <span className="text-xs text-nv-tan/55">
                                      {s.min} min · {brl(s.price)}
                                    </span>
                                  </span>
                                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${on ? "border-nv-brass bg-nv-brass text-nv-bg" : "border-nv-tan/30"}`}>
                                    {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[{ id: "any", name: "Sem preferência", role: "Primeiro barbeiro disponível", photo: "" }, ...TEAM].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setBarber(b.id)
                            setTime(null)
                          }}
                          className={`flex items-center gap-4 rounded-sm border p-4 text-left transition-all ${
                            barber === b.id ? "border-nv-brass bg-nv-brass/10" : "border-nv-tan/15 hover:border-nv-tan/40"
                          }`}
                        >
                          {b.photo ? (
                            <img src={b.photo} alt="" className="nv-photo h-16 w-16 rounded-full object-cover" />
                          ) : (
                            <span className="grid h-16 w-16 place-items-center rounded-full bg-nv-leather">
                              <User className="text-nv-brass" />
                            </span>
                          )}
                          <span>
                            <span className="block font-oswald text-lg uppercase tracking-wider">{b.name}</span>
                            <span className="text-sm text-nv-tan/55">{b.role}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-3">
                        {days.map((d) => {
                          const k = dayKey(d)
                          return (
                            <button
                              key={k}
                              type="button"
                              onClick={() => {
                                setDay(k)
                                setTime(null)
                              }}
                              className={`flex w-20 shrink-0 flex-col items-center rounded-sm border py-3 transition-all ${
                                day === k ? "border-nv-brass bg-nv-brass text-nv-bg" : "border-nv-tan/15 hover:border-nv-tan/40"
                              }`}
                            >
                              <span className="font-oswald text-[11px] uppercase tracking-widest">
                                {d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}
                              </span>
                              <span className="font-rye text-2xl">{d.getDate()}</span>
                              <span className="text-[11px] uppercase">{d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}</span>
                            </button>
                          )
                        })}
                      </div>
                      {day ? (
                        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
                          {slots.map((s) => (
                            <button
                              key={s.t}
                              type="button"
                              disabled={s.off}
                              onClick={() => setTime(s.t)}
                              className={`rounded-sm border py-2.5 font-oswald tracking-wider transition-all disabled:cursor-not-allowed disabled:border-transparent disabled:text-nv-tan/20 disabled:line-through ${
                                time === s.t ? "border-nv-brass bg-nv-brass text-nv-bg" : "border-nv-tan/15 hover:border-nv-brass"
                              }`}
                            >
                              {s.t}
                            </button>
                          ))}
                          {!slots.some((s) => !s.off) && <p className="col-span-full text-nv-tan/60">Sem horários livres neste dia.</p>}
                        </div>
                      ) : (
                        <p className="mt-8 italic text-nv-tan/55">Escolha um dia para ver os horários livres.</p>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid max-w-lg gap-5">
                      <label className="grid gap-2 font-oswald text-xs uppercase tracking-[0.2em] text-nv-tan/70">
                        Nome
                        <input className="nv-input font-lora text-base normal-case tracking-normal" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="Como te chamamos?" />
                      </label>
                      <label className="grid gap-2 font-oswald text-xs uppercase tracking-[0.2em] text-nv-tan/70">
                        WhatsApp
                        <input
                          className="nv-input font-lora text-base normal-case tracking-normal"
                          value={phone}
                          inputMode="tel"
                          maxLength={16}
                          onChange={(e) => setPhone(e.target.value.replace(/[^\d()\s-]/g, ""))}
                          placeholder="(62) 99999-9999"
                        />
                        {phone && phoneDigits.length < 10 && <span className="normal-case tracking-normal text-nv-rust">Informe DDD + número.</span>}
                      </label>
                      <label className="grid gap-2 font-oswald text-xs uppercase tracking-[0.2em] text-nv-tan/70">
                        Observação (opcional)
                        <textarea className="nv-input min-h-24 font-lora text-base normal-case tracking-normal" value={note} maxLength={280} onChange={(e) => setNote(e.target.value)} placeholder="Alguma preferência?" />
                      </label>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex justify-between gap-4">
                <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="nv-btn nv-btn-ghost">
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
                <button
                  type="button"
                  disabled={!valid[step]}
                  onClick={() => (step === 3 ? setDone(true) : setStep((s) => s + 1))}
                  className="nv-btn"
                >
                  {step === 3 ? "Confirmar reserva" : "Continuar"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <aside className="h-fit lg:sticky lg:top-32">
              <div className="nv-leather nv-stitch rounded-md p-7 shadow-2xl">
                <p className="font-oswald text-xs uppercase tracking-[0.4em] text-nv-brass">Sua reserva</p>
                <ul className="mt-5 min-h-12 space-y-2 text-sm">
                  {chosen.length ? (
                    chosen.map((s) => (
                      <li key={s.id} className="flex justify-between gap-3">
                        <span>{s.name}</span>
                        <span className="text-nv-tan/70">{brl(s.price)}</span>
                      </li>
                    ))
                  ) : (
                    <li className="italic text-nv-tan/50">Nenhum serviço ainda.</li>
                  )}
                </ul>
                <div className="my-5 space-y-2 border-y border-nv-tan/15 py-4 text-sm text-nv-tan/75">
                  <p className="flex items-center gap-2">
                    <User className="h-4 w-4 text-nv-brass" /> {barberName}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-nv-brass" />
                    {chosenDate && time ? `${dateLabel(chosenDate)} · ${time}` : "A definir"}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-sm text-nv-tan/60">{minutes ? `${minutes} min` : ""}</span>
                  <span className="font-rye text-3xl text-nv-brass">{brl(total)}</span>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-nv-tan/45">Pagamento no local · Pix, cartão ou dinheiro</p>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}

/* ------------------------------ Contato ------------------------------ */

const FAQ = [
  ["Preciso agendar ou posso chegar?", "Atendemos por ordem de chegada quando há cadeira livre, mas quem agenda tem prioridade garantida."],
  ["Quais formas de pagamento?", "Pix, cartões de crédito e débito, e dinheiro. Assinantes do Clube pagam no débito automático."],
  ["Tem estacionamento?", "Sim, pátio próprio com 8 vagas nos fundos da barbearia, entrada pela Rua do Tropeiro."],
  ["Posso cancelar ou remarcar?", "Pode sim, com até 2 horas de antecedência pelo WhatsApp, sem custo."],
]

export function Contact() {
  const todayIdx = new Date().getDay()
  const open = openNow()
  const cards = [
    { Icon: MapPin, label: "Endereço", value: `${INFO.address}, ${INFO.city}`, href: "https://www.openstreetmap.org/#map=16/-16.688/-49.269" },
    { Icon: Phone, label: "Telefone", value: INFO.phone, href: `tel:+${INFO.whatsapp}` },
    { Icon: FaWhatsapp, label: "WhatsApp", value: "Fale com a gente", href: `https://wa.me/${INFO.whatsapp}` },
    { Icon: FaInstagram, label: "Instagram", value: INFO.instagram, href: "https://instagram.com" },
  ]

  return (
    <>
      <PageHero eyebrow="Apareça por aqui" title={<>Contato <span className="text-nv-brass">& horários</span></>} img={IMG.chair} />

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ Icon, label, value, href }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            {...up}
            transition={{ delay: i * 0.08 }}
            className="group rounded-md border border-nv-tan/15 bg-nv-bg2 p-7 transition-colors hover:border-nv-brass"
          >
            <Icon className="h-7 w-7 text-nv-brass transition-transform group-hover:scale-110" />
            <p className="mt-5 font-oswald text-xs uppercase tracking-[0.3em] text-nv-tan/50">{label}</p>
            <p className="mt-1">{value}</p>
          </motion.a>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 lg:grid-cols-2">
        <motion.div {...up} className="nv-leather nv-stitch rounded-md p-9 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="font-rye text-3xl">Horários</h2>
            <span className={`flex items-center gap-2 rounded-full px-3 py-1 font-oswald text-xs uppercase tracking-widest ${open ? "bg-green-600/20 text-green-400" : "bg-nv-rust/30 text-nv-tan"}`}>
              <span className={`h-2 w-2 rounded-full ${open ? "animate-pulse bg-green-400" : "bg-nv-rust"}`} />
              {open ? "Aberto agora" : "Fechado agora"}
            </span>
          </div>
          <Ornament className="my-6 !justify-start" />
          <ul className="space-y-1">
            {[1, 2, 3, 4, 5, 6, 0].map((i) => {
              const h = HOURS[i]
              return (
                <li
                  key={h.day}
                  className={`flex justify-between rounded-sm px-3 py-2.5 font-oswald uppercase tracking-wider ${i === todayIdx ? "bg-nv-brass/15 text-nv-brass" : ""}`}
                >
                  <span>
                    {h.day} {i === todayIdx && <span className="ml-2 text-[10px] tracking-[0.3em]">hoje</span>}
                  </span>
                  <span className={h.open ? "" : "text-nv-rust"}>{h.open ? `${pad(h.open[0])}:00 – ${pad(h.open[1])}:00` : "Fechado"}</span>
                </li>
              )
            })}
          </ul>
        </motion.div>
        <motion.div {...up} transition={{ delay: 0.1 }} className="overflow-hidden rounded-md border border-nv-tan/15">
          <iframe title="Mapa Navalha" src={INFO.map} loading="lazy" className="nv-map h-full min-h-[380px] w-full" />
        </motion.div>
      </section>

      <section className="bg-nv-bg2 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Title eyebrow="Tira-dúvidas">Perguntas frequentes</Title>
          <div className="space-y-3">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group rounded-sm border border-nv-tan/15 bg-nv-bg px-6 py-5 open:border-nv-brass/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-oswald uppercase tracking-wider">
                  {q}
                  <Plus className="h-4 w-4 shrink-0 text-nv-brass transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-4 leading-relaxed text-nv-tan/70">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
