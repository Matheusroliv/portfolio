import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Code, Palette, Rocket } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <Reveal dir="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre <span className="gradient-text">Mim</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Desenvolvedor apaixonado por criar soluções inovadoras e interfaces que conectam pessoas à tecnologia
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Reveal dir="left">
              <Card className="glass-card p-8">
                <header className="flex items-center gap-4 mb-4">
                  <div className="p-3 glass-card"><Code className="w-6 h-6 text-primary" /></div>
                  <h3 className="text-xl font-semibold">Desenvolvimento</h3>
                </header>
                <p className="text-muted-foreground">
                  Especialista em React, TypeScript, Node.js e tecnologias modernas — focado em performance e UX.
                </p>
              </Card>
            </Reveal>

            <Reveal dir="right" delay={0.2}>
              <Card className="glass-card p-8">
                <header className="flex items-center gap-4 mb-4">
                  <div className="p-3 glass-card"><Palette className="w-6 h-6 text-primary" /></div>
                  <h3 className="text-xl font-semibold">Design</h3>
                </header>
                <p className="text-muted-foreground">
                  Combino funcionalidade com estética, criando interfaces intuitivas e atraentes.
                </p>
              </Card>
            </Reveal>

            <Reveal dir="left" delay={0.4}>
              <Card className="glass-card p-8">
                <header className="flex items-center gap-4 mb-4">
                  <div className="p-3 glass-card"><Rocket className="w-6 h-6 text-primary" /></div>
                  <h3 className="text-xl font-semibold">Inovação</h3>
                </header>
                <p className="text-muted-foreground">
                  Sempre em busca das últimas tendências e tecnologias para solucionar desafios complexos.
                </p>
              </Card>
            </Reveal>
          </div>

          <Reveal dir="up" delay={0.3}>
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Experiência</h3>
              <div className="space-y-6">
                {[
                  {
                    cargo: "Software Engineer",
                    empresa: "OKEGEN Exchange",
                    periodo: "2024 – Presente",
                    desc: "Micro-serviços e front-end whitelabel em Angular / React."
                  },
                  {
                    cargo: "Full Stack Developer",
                    empresa: "Code Tech",
                    periodo: "2023 – Presente",
                    desc: "Templates NestJS + Ionic que reduziram deploy em 80%."
                  },
                  {
                    cargo: "Frontend Developer",
                    empresa: "TGT Digital",
                    periodo: "2021 – 2023",
                    desc: "Apps React / RN e portais Angular para diversos clientes."
                  }
                ].map(({ cargo, empresa, periodo, desc }, i) => (
                  <div key={cargo} className={`border-l-2 ${i === 0 ? "border-primary" : "border-muted"} pl-6`}>
                    <h4 className="font-semibold text-lg">{cargo}</h4>
                    <p className="text-primary">
                      {empresa} • {periodo}
                    </p>
                    <p className="text-muted-foreground mt-2">{desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
