import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"
import { useTranslation } from "react-i18next"
import { MAILTO } from "@/lib/contact"

const socials = [
  { Icon: Github, href: "https://github.com/Matheusroliv", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/matheusroliv/", label: "LinkedIn" },
  { Icon: Mail, href: MAILTO, label: "Email" },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="px-6 pb-10">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
        <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
        <div className="flex items-center gap-2">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a href="#home" className="ml-2 inline-flex items-center gap-1.5 rounded-full px-3 py-2 transition-colors hover:bg-muted hover:text-foreground">
            <ArrowUp className="h-4 w-4" /> {t("footer.top")}
          </a>
        </div>
      </div>
    </footer>
  )
}
