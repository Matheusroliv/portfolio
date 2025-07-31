import { Card } from "@/components/ui/card";
import { Code, Palette, Rocket } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Desenvolvedor apaixonado por criar soluções inovadoras e interfaces que conectam pessoas à tecnologia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="glass-card p-8 animate-slide-up">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 glass-card">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Desenvolvimento</h3>
              </div>
              <p className="text-muted-foreground">
                Especialista em React, TypeScript, Node.js e tecnologias modernas. 
                Focado em performance, acessibilidade e experiência do usuário.
              </p>
            </div>

            <div className="glass-card p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 glass-card">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Design</h3>
              </div>
              <p className="text-muted-foreground">
                Combinando funcionalidade com estética, criando interfaces intuitivas 
                e visualmente atrativas que encantam os usuários.
              </p>
            </div>

            <div className="glass-card p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 glass-card">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Inovação</h3>
              </div>
              <p className="text-muted-foreground">
                Sempre em busca das últimas tendências e tecnologias, 
                implementando soluções criativas para desafios complexos.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-2xl font-bold mb-6">Experiência</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-primary pl-6">
                  <h4 className="font-semibold text-lg">Senior Full Stack Developer</h4>
                  <p className="text-primary">Tech Company • 2022 - Presente</p>
                  <p className="text-muted-foreground mt-2">
                    Liderando equipes no desenvolvimento de aplicações web escaláveis
                  </p>
                </div>
                <div className="border-l-2 border-muted pl-6">
                  <h4 className="font-semibold text-lg">Full Stack Developer</h4>
                  <p className="text-primary">Startup Inovadora • 2020 - 2022</p>
                  <p className="text-muted-foreground mt-2">
                    Desenvolvimento de MVPs e soluções customizadas
                  </p>
                </div>
                <div className="border-l-2 border-muted pl-6">
                  <h4 className="font-semibold text-lg">Frontend Developer</h4>
                  <p className="text-primary">Agência Digital • 2018 - 2020</p>
                  <p className="text-muted-foreground mt-2">
                    Criação de interfaces responsivas e otimizadas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;