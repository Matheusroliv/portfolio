import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const icon = theme === "dark" ? "🌙" : "☀️";

  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      className="
        w-9 h-9 rounded-full bg-muted dark:bg-card
        flex items-center justify-center
        text-xl
        transition-transform hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-primary/60
      "
    >
      {icon}
    </button>
  );
}
