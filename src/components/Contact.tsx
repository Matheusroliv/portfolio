import { Magnetic } from "@/components/fx"
import { EMAIL, MAILTO, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact"
import { motion } from "framer-motion"
import { Check, Copy, Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaWhatsapp } from "react-icons/fa"

export default function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const copyEmail = () =>
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })

  const links = [
    { Icon: Mail, label: t("contact.email"), value: EMAIL, href: MAILTO },
    { Icon: Phone, label: t("contact.phone"), value: PHONE_DISPLAY, href: WHATSAPP_URL },
    { Icon: Linkedin, label: "LinkedIn", value: "in/matheusroliv", href: "https://www.linkedin.com/in/matheusroliv/" },
    { Icon: Github, label: "GitHub", value: "Matheusroliv", href: "https://github.com/Matheusroliv" },
    { Icon: Download, label: t("contact.cv"), value: "PDF", href: "/curriculo-matheus-oliveira.pdf" },
    { Icon: MapPin, label: t("contact.location"), value: t("contact.location_value") },
  ]

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="container relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-card/70 p-8 backdrop-blur md:p-14"
      >
        <div aria-hidden className="glow-blob -right-24 -top-24 h-80 w-80 bg-primary/25" />
        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40 ring-offset-4 ring-offset-card">
                <img src="/matheus.png" alt="Matheus Oliveira" loading="lazy" className="h-full w-full origin-[50%_28%] scale-[1.7] object-cover" />
              </div>
              <div>
                <p className="font-semibold">Matheus Oliveira</p>
                <p className="text-sm text-muted-foreground">{t("contact.role")}</p>
              </div>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("contact.eyebrow")}</p>
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              {t("contact.title_1")} <span className="gradient-text">{t("contact.title_hl")}</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">{t("contact.body")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="gradient-button inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold">
                  <FaWhatsapp className="h-5 w-5" /> {t("contact.whatsapp")}
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? t("contact.copied") : t("contact.copy_email")}
              </button>
            </div>
          </div>

          <ul className="divide-y divide-border self-center">
            {links.map(({ Icon, label, value, href }) => {
              const inner = (
                <>
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="w-24 shrink-0 text-sm text-muted-foreground">{label}</span>
                  <span className="truncate text-sm font-medium">{value}</span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      download={href.endsWith(".pdf") || undefined}
                      className="group flex items-center gap-4 py-4 transition-colors hover:text-primary"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 py-4">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
