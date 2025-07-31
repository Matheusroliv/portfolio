import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="gradient-text">João Silva</span>
            </h3>
            <p className="text-muted-foreground">
              Desenvolvedor Full Stack apaixonado por criar soluções digitais inovadoras.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="p-2 glass-card hover:scale-110 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 glass-card hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 glass-card hover:scale-110 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projetos" className="text-muted-foreground hover:text-primary transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Serviços</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Desenvolvimento Web</li>
              <li>Aplicações Mobile</li>
              <li>Consultoria Técnica</li>
              <li>Arquitetura de Software</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 João Silva. Todos os direitos reservados.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Feito com <Heart className="w-4 h-4 text-red-500 animate-pulse" /> e muito ☕
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;