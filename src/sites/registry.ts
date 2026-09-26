import type { ComponentType } from "react"
import NavalhaLogo from "./navalha/Logo"

export type SiteEntry = {
  slug: string
  name: string
  cover: string
  bg: string
  accent: string
  tags: string[]
  Logo: ComponentType<{ className?: string }>
  load: () => Promise<{ default: ComponentType }>
}

export const sites: SiteEntry[] = [
  {
    slug: "navalha",
    name: "Navalha",
    cover: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=900&q=70&auto=format",
    bg: "#140d08",
    accent: "#c8963e",
    tags: ["React", "Three.js", "Framer Motion"],
    Logo: NavalhaLogo,
    load: () => import("./navalha"),
  },
]

export const getSite = (slug?: string) => sites.find((s) => s.slug === slug)
