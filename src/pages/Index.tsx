import Contact from "@/components/Contact"
import Experience from "@/components/Experience"
import Footer from "@/components/Footer"
import { ScrollProgress } from "@/components/fx"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import SiteGrid from "@/components/SiteGrid"
import Skills from "@/components/Skills"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function Index() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
  }, [hash])

  return (
    <main className="min-h-screen max-w-[100vw] overflow-x-clip">
      <ScrollProgress />
      <Hero />
      <SiteGrid />
      <Services />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
