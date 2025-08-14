import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Code, Github, Linkedin, Mail, Palette, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-20 px-1 scroll-mt-24">
      <div className="container mx-auto">
        <Reveal dir="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.title_prefix", "Sobre")} {" "}
              <span className="gradient-text">{t("about.highlight", "Mim")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t(
                "about.subtitle",
                "Desenvolvedor apaixonado por criar soluções inovadoras e interfaces que conectam pessoas à tecnologia"
              )}
            </p>
          </div>
        </Reveal>

        <Reveal dir="up" delay={0.6}>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://github.com/Matheusroliv"
              className="p-3 glass-card hover:scale-110 transition-transform"
              aria-label={t("about.social.github", "GitHub")}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/matheusroliv/"
              className="p-3 glass-card hover:scale-110 transition-transform"
              aria-label={t("about.social.linkedin", "LinkedIn")}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:matheusrdeoliv1@gmail.com?subject=Contato%20via%20Portfolio&body=Ol%C3%A1%20Matheus%2C%0D%0A"
              className="p-3 glass-card hover:scale-110 transition-transform"
              aria-label={t("about.social.email", "Email")}
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Reveal dir="left">
              <Card className="glass-card p-8">
                <header className="flex items-center gap-4 mb-4">
                  <div className="p-3 glass-card"><Code className="w-6 h-6 text-primary" /></div>
                  <h3 className="text-xl font-semibold">{t("about.cards.development.title", "Desenvolvimento")}</h3>
                </header>
                <p className="text-muted-foreground">
                  {t(
                    "about.cards.development.description",
                    "Especialista em React, TypeScript, Node.js e tecnologias modernas — focado em performance e UX."
                  )}
                </p>
              </Card>
            </Reveal>

            <Reveal dir="right" delay={0.2}>
              <Card className="glass-card p-8">
                <header className="flex items-center gap-4 mb-4">
                  <div className="p-3 glass-card"><Palette className="w-6 h-6 text-primary" /></div>
                  <h3 className="text-xl font-semibold">{t("about.cards.design.title", "Design")}</h3>
                </header>
                <p className="text-muted-foreground">
                  {t(
                    "about.cards.design.description",
                    "Combino funcionalidade com estética, criando interfaces intuitivas e atraentes."
                  )}
                </p>
              </Card>
            </Reveal>

            <Reveal dir="left" delay={0.4}>
              <Card className="glass-card p-8">
                <header className="flex items-center gap-4 mb-4">
                  <div className="p-3 glass-card"><Rocket className="w-6 h-6 text-primary" /></div>
                  <h3 className="text-xl font-semibold">{t("about.cards.innovation.title", "Inovação")}</h3>
                </header>
                <p className="text-muted-foreground">
                  {t(
                    "about.cards.innovation.description",
                    "Sempre em busca das últimas tendências e tecnologias para solucionar desafios complexos."
                  )}
                </p>
              </Card>
            </Reveal>
          </div>

          <Reveal dir="up" delay={0.3}>
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">{t("about.experience.title", "Experiência")}</h3>
              <div className="space-y-6">
                {[
                  {
                    cargo: t("about.experience.items.okegen.role", "Software Engineer"),
                    empresa: t("about.experience.items.okegen.company", "OKEGEN Exchange"),
                    periodo: t("about.experience.items.okegen.period", "2024 - Presente"),
                    desc: t(
                      "about.experience.items.okegen.description",
                      "Desenvolvimento de APIs REST com NestJS e criação de componentes reutilizáveis em Angular e Ionic, reduzindo o tempo de entrega e aumentando a segurança da plataforma."
                    ),
                  },
                  {
                    cargo: t("about.experience.items.codetech.role", "Full Stack Developer"),
                    empresa: t("about.experience.items.codetech.company", "Code Tech"),
                    periodo: t("about.experience.items.codetech.period", "2023 - Presente"),
                    desc: t(
                      "about.experience.items.codetech.description",
                      "Criação de templates white-label com NestJS e React, agilizando em até 80% o lançamento de novas aplicações para clientes."
                    ),
                  },
                  {
                    cargo: t("about.experience.items.tgt.role", "Frontend Developer"),
                    empresa: t("about.experience.items.tgt.company", "TGT Digital"),
                    periodo: t("about.experience.items.tgt.period", "2021 - 2023"),
                    desc: t(
                      "about.experience.items.tgt.description",
                      "Construção de apps robustos em React, React Native e Angular, atuando em projetos variados que impactaram milhares de usuários finais."
                    ),
                  },
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
