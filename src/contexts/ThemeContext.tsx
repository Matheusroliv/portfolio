import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem("theme") as Theme) ?? "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    const favicon = document.getElementById("site-favicon") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{
      theme, toggle: () =>
        setTheme(t => (t === "light" ? "dark" : "light"))
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};
