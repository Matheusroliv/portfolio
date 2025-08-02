import { Locale, useLocale } from "@/contexts/LocaleContext"
import { getTwemojiURL } from "@/lib/getTwemoji"
import { useEffect, useRef, useState } from "react"
import i18n from "../i18n"

const emojis: Record<Locale, string> = { pt: "🇧🇷", en: "🇺🇸" }

function Flag({ emoji }: { emoji: string }) {
  return (
    <img
      src={getTwemojiURL(emoji)}
      alt={emoji}
      className="w-5 h-5 object-contain pointer-events-none"
    />
  )
}

export default function LanguageSwitch() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    i18n.changeLanguage(locale)
    localStorage.setItem("locale", locale)
  }, [locale])

  useEffect(() => {
    const close = (e: MouseEvent) =>
      !ref.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [])

  const others = (["pt", "en"] as Locale[]).filter((l) => l !== locale)

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Select language"
        className="
          w-9 h-9 rounded-full bg-muted dark:bg-card
          flex items-center justify-center
          transition-transform hover:scale-110 focus:outline-none
        "
      >
        <Flag emoji={emojis[locale]} />
      </button>

      {open && (
        <ul
          className="
            absolute left-1/2 top-full -translate-x-1/2 mt-2
            flex flex-col gap-2 bg-background/90 backdrop-blur
            rounded-lg p-2 shadow-lg animate-fade-in
          "
        >
          {others.map((l) => (
            <li key={l}>
              <button
                onClick={() => {
                  setLocale(l)
                  setOpen(false)
                }}
                className="
                  w-8 h-8 rounded-full bg-muted dark:bg-card
                  flex items-center justify-center
                  transition-transform hover:scale-110 focus:outline-none
                "
              >
                <Flag emoji={emojis[l]} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
