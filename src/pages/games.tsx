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

type GameKind = "tictactoe" | "snake" | "checkers";

const gameThumbs: Record<GameKind, React.ReactNode> = {
  tictactoe: (
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
  ),
  snake: (
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
  ),
  checkers: (
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
  ),
};

export default function Games() {
  const { t } = useTranslation();
  const [openGame, setOpenGame] = useState<GameKind | null>(null);

  const games: {
    kind: GameKind;
    title: string;
    description: string;
    tech: string[];
    demo?: string;
    code?: string;
  }[] = [
      {
        kind: "tictactoe",
        title: "Tic Tac Toe Infinity",
        description: "Clássico jogo da velha feito em React + TypeScript.",
        tech: ["React", "TypeScript", "shadcn/ui"],
        code: undefined,
        demo: undefined,
      },
      {
        kind: "snake",
        title: "Snake",
        description: "Cobrinha fofa, comidas em emoji e níveis com crescimento variável.",
        tech: ["React", "TypeScript", "shadcn/ui"],
        code: undefined,
        demo: undefined,
      },
      {
        kind: "checkers",
        title: "Checkers",
        description: "Clássico jogo de damas (checkers) com lógica de dama, captura e promoção.",
        tech: ["React", "TypeScript", "shadcn/ui"],
        code: undefined,
        demo: undefined,
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
          {games.map((g, i) => (
            <Reveal key={g.title} dir="up" delay={i * 0.15}>
              <Card className="glass-card overflow-hidden group">
                <button onClick={() => setOpenGame(g.kind)} className="w-full text-left">
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-foreground/10 flex items-center justify-center">
                      {gameThumbs[g.kind]}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">{g.title}</h3>
                    <p className="text-muted-foreground">{g.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {g.tech.map((tech) => (
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
                    {(g.demo || g.code) && (
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
                    )}
                  </div>
                </button>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={openGame === "tictactoe"} onOpenChange={() => setOpenGame(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tic Tac Toe Infinity</DialogTitle>
          </DialogHeader>
          <TicTacToe />
        </DialogContent>
      </Dialog>

      <Dialog open={openGame === "snake"} onOpenChange={() => setOpenGame(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Snake</DialogTitle>
          </DialogHeader>
          <SnakeGame />
        </DialogContent>
      </Dialog>

      <Dialog open={openGame === "checkers"} onOpenChange={() => setOpenGame(null)}>
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
