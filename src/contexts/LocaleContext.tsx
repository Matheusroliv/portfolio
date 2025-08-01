import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "pt" | "en" | "es";
type Ctx = { locale: Locale; setLocale: (l: Locale) => void };

const LocaleContext = createContext<Ctx | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(
    () => (localStorage.getItem("locale") as Locale) ?? "pt",
  );

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
