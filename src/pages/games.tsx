import SnakeGame from "@/components/games/SnakeGame";
import TicTacToe from "@/components/games/TicTacToe";
import Reveal from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CheckersGame from "../components/games/Checkers";

export default function Games() {
  const { t } = useTranslation();
  const [openTTT, setOpenTTT] = useState(false);
  const [openSnake, setOpenSnake] = useState(false);
  const [openCheckers, setOpenCheckers] = useState(false);

  const games: {
    title: string;
    description: string;
    image: string;
    tech: string[];
    demo?: string;
    code?: string;
    kind?: "card";
  }[] = [
      {
        title: "Tic Tac Toe Infinity",
        description: "Clássico jogo da velha feito em React + TypeScript.",
        image: "/thumbs/tictactoe.png",
        tech: ["React", "TypeScript", "shadcn/ui"],
        kind: "card",
      },
    ];

  return (
    <section id="games" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("games.title", "My ")}
            <span className="gradient-text">
              {t("games.highlight", "Games")}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("games.subtitle", "Some side-projects & prototypes where I mix code and fun.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal dir="up" delay={0}>
            <Card className="glass-card overflow-hidden group">
              <button onClick={() => setOpenTTT(true)} className="w-full text-left">
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-foreground/10 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className="size-10 rounded-md bg-background/70 border border-border flex items-center justify-center text-lg"
                        >
                          {i % 2 ? "X" : "O"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Tic Tac Toe Infinity</h3>
                  <p className="text-muted-foreground">Clássico jogo da velha feito em React + TypeScript.</p>

                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "shadcn/ui"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button className="gradient-button" size="sm">
                      Jogar agora
                    </Button>
                  </div>
                </div>
              </button>
            </Card>
          </Reveal>

          <Reveal dir="up" delay={0.15}>
            <Card className="glass-card overflow-hidden group">
              <button onClick={() => setOpenSnake(true)} className="w-full text-left">
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-foreground/10 flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div
                          key={i}
                          className="size-8 rounded-md bg-background/70 border border-border flex items-center justify-center text-lg"
                        >
                          {i === 7 ? "🐍" : i % 5 === 0 ? "🍎" : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Snake</h3>
                  <p className="text-muted-foreground">Cobrinha fofa, comidas em emoji e níveis com crescimento variável.</p>

                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "shadcn/ui"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button className="gradient-button" size="sm">
                      Jogar agora
                    </Button>
                  </div>
                </div>
              </button>
            </Card>
          </Reveal>

          <Reveal dir="up" delay={0.30}>
            <Card className="glass-card overflow-hidden group">
              <button onClick={() => setOpenCheckers(true)} className="w-full text-left">
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-foreground/10 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }).map((_, i) => {
                        const row = Math.floor(i / 8);
                        const col = i % 8;
                        const isDark = (row + col) % 2 === 1;
                        return (
                          <div
                            key={i}
                            className={`size-5 rounded-[2px] border border-border flex items-center justify-center text-xs ${isDark ? 'bg-[#ad7b41]' : 'bg-[#e3bb7a]'}`}
                          >
                            {isDark && row < 3 ? <span className="text-neutral-900">⬤</span> : ""}
                            {isDark && row > 4 ? <span className="text-neutral-200">⬤</span> : ""}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Checkers</h3>
                  <p className="text-muted-foreground">Clássico jogo de damas (checkers) com lógica de dama, captura e promoção.</p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "shadcn/ui"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Button className="gradient-button" size="sm">
                      Jogar agora
                    </Button>
                  </div>
                </div>
              </button>
            </Card>
          </Reveal>

          {games.slice(1).map((g, i) => (
            <Reveal key={g.title} dir="up" delay={(i + 2) * 0.15}>
              <Card className="glass-card overflow-hidden hover:scale-105 transition-transform duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={g.image}
                    alt={g.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">{g.title}</h3>
                  <p className="text-muted-foreground">{g.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {g.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    {g.demo && (
                      <Button size="sm" className="gradient-button" asChild>
                        <a href={g.demo} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {g.code && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={g.code} target="_blank" rel="noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={openTTT} onOpenChange={setOpenTTT}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tic Tac Toe Infinity</DialogTitle>
          </DialogHeader>
          <TicTacToe />
        </DialogContent>
      </Dialog>

      <Dialog open={openSnake} onOpenChange={setOpenSnake}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Snake</DialogTitle>
          </DialogHeader>
          <SnakeGame />
        </DialogContent>
      </Dialog>

      <Dialog open={openCheckers} onOpenChange={setOpenCheckers}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Checkers</DialogTitle>
          </DialogHeader>
          <CheckersGame />
        </DialogContent>
      </Dialog>
    </section>
  );
}
