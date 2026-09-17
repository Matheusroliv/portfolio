import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import { CursorGlow, Marquee, ScrollProgress } from "@/components/fx";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Skills from "@/components/Skills";

const Index = () => (
  <main className="min-h-screen">
    <ScrollProgress />
    <CursorGlow />
    <div aria-hidden className="grain" />
    <Hero />
    <Marquee items={["Angular", "React", "Vue", "NestJS", "React Native", "Flutter", "TypeScript"]} />
    <About />
    <Experience />
    <Marquee reverse items={["Full Stack", "Clean Code", "UI/UX", "Performance", "Mobile", "APIs"]} />
    <Skills />
    <Services />
    <Contact />
    <Footer />
  </main>
);

export default Index;
