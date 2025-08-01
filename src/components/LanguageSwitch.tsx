import { Locale, useLocale } from "@/contexts/LocaleContext";
import { getTwemojiURL } from "@/lib/getTwemoji";
import { useEffect, useRef, useState } from "react";
import i18n from "../i18n";

const emojis: Record<Locale, string> = { pt: "🇧🇷", en: "🇺🇸", es: "🇪🇸" };

function Flag({ emoji }: { emoji: string }) {
  return (
    <img
      src={getTwemojiURL(emoji)}
      alt={emoji}
      className="w-5 h-5 object-contain pointer-events-none"
    />
  );
}

export default function LanguageSwitch() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    i18n.changeLanguage(locale);
    localStorage.setItem("locale", locale);
  }, [locale]);

  const otherLocales = (["pt", "en", "es"] as Locale[]).filter(
    (l) => l !== locale,
  );

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Selecionar idioma"
        className="
          w-9 h-9 rounded-full bg-muted dark:bg-card
          flex items-center justify-center
          text-xl
          transition-transform hover:scale-110
          focus:outline-none focus:ring-2 focus:ring-primary/60
        "
      >
        <Flag emoji={emojis[locale]} />
      </button>

      {open && (
        <ul
          className="
            absolute right-0 mt-2 flex flex-col gap-2
            animate-fade-in
          "
        >
          {otherLocales.map((l) => (
            <li key={l}>
              <button
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className="
                  w-8 h-8 rounded-full bg-muted dark:bg-card
                  flex items-center justify-center
                  transition-transform hover:scale-110
                  focus:outline-none
                "
                aria-label={`Mudar idioma para ${l}`}
              >
                <Flag emoji={emojis[l]} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
