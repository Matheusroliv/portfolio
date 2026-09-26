import { useEffect } from "react"

const FONTS =
  "https://fonts.googleapis.com/css2?family=Rye&family=Oswald:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"

function useNavalhaFonts() {
  useEffect(() => {
    if (document.getElementById("nv-fonts")) return
    const l = Object.assign(document.createElement("link"), { id: "nv-fonts", rel: "stylesheet", href: FONTS })
    document.head.appendChild(l)
  }, [])
}

export default function NavalhaLogo({ className }: { className?: string }) {
  useNavalhaFonts()
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Navalha Barbearia">
      <defs>
        <path id="nv-arc-top" d="M30 100 A70 70 0 0 1 170 100" />
        <path id="nv-arc-bot" d="M20 100 A80 80 0 0 0 180 100" />
      </defs>
      <g fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="96" strokeWidth="3" />
        <circle cx="100" cy="100" r="89" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="58" strokeWidth="1.5" />
      </g>
      <g fill="currentColor">
        <text fontFamily="Oswald, sans-serif" fontSize="15" fontWeight="600" letterSpacing="6">
          <textPath href="#nv-arc-top" startOffset="50%" textAnchor="middle">BARBEARIA</textPath>
        </text>
        <text fontFamily="Oswald, sans-serif" fontSize="11" fontWeight="500" letterSpacing="4">
          <textPath href="#nv-arc-bot" startOffset="50%" textAnchor="middle">EST · 2012 · GOIÁS</textPath>
        </text>
        <path d="M24 100l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" transform="translate(1 -6)" />
        <path d="M24 100l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" transform="translate(151 -6)" />
        <path d="M66 78c-9-6-12-17-4-24-1 9 6 15 16 17 7-4 15-6 22-6s15 2 22 6c10-2 17-8 16-17 8 7 5 18-4 24-10-4-22-6-34-6s-24 2-34 6z" />
        <path d="M62 97l54-5 5 4v8l-54 3c-6 0-9-6-5-10z" />
        <path d="M121 98l30-4c5 0 7 4 4 8l-34 3z" opacity=".55" />
        <circle cx="121" cy="100" r="2.6" />
        <text x="100" y="134" textAnchor="middle" fontFamily="Rye, serif" fontSize="19" letterSpacing="1.5">
          NAVALHA
        </text>
      </g>
    </svg>
  )
}
