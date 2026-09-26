import { motion } from "framer-motion"
import { Star } from "lucide-react"
import type { ReactNode } from "react"

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-nv-brass ${className}`} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-nv-brass" />
      <Star className="h-3 w-3 fill-current" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-nv-brass" />
    </div>
  )
}

export function Title({ eyebrow, children, center = true }: { eyebrow: string; children: ReactNode; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${center ? "text-center" : ""}`}
    >
      <p className="mb-3 font-oswald text-xs uppercase tracking-[0.45em] text-nv-brass">{eyebrow}</p>
      <h2 className="font-oswald text-4xl font-bold uppercase leading-none tracking-wide text-nv-tan md:text-6xl">{children}</h2>
      {center && <Ornament className="mt-6" />}
    </motion.div>
  )
}

export function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5 text-nv-brass">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  )
}

export const PageHero = ({ eyebrow, title, img, children }: { eyebrow: string; title: ReactNode; img: string; children?: ReactNode }) => (
  <section className="relative flex min-h-[52vh] items-end overflow-hidden pb-16 pt-40">
    <img src={img} alt="" className="nv-photo absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-nv-bg via-nv-bg/80 to-nv-bg/40" />
    <div className="relative mx-auto w-full max-w-6xl px-6">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 font-oswald text-xs uppercase tracking-[0.45em] text-nv-brass"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-oswald text-5xl font-bold uppercase leading-[0.95] md:text-7xl"
      >
        {title}
      </motion.h1>
      {children}
    </div>
  </section>
)
