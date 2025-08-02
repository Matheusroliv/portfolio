import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "pt" | "en";
type Ctx = { locale: Locale; setLocale: (l: Locale) => void };

const LocaleContext = createContext<Ctx | undefined>(undefined);

const DEFAULT_LOCALE: Locale = "pt";
function getInitialLocale(): Locale {
  const stored = localStorage.getItem("locale");
  return stored === "pt" || stored === "en" ? stored : DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  useEffect(() => localStorage.setItem("locale", locale), [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
};
