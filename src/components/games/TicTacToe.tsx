import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

type Player = "X" | "O";
type Cell = Player | null;
type Level = "easy" | "medium" | "hard";

const WIN = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const;

const LEVELS: Record<Level, string> = {
  easy: "😴 Easy",
  medium: "🙂 Medium",
  hard: "🤖 Hard",
};

const hasWin = (board: Cell[], p: Player) =>
  WIN.some(line => line.every(i => board[i] === p));

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [moves, setMoves] = useState<Record<Player, number[]>>({ X: [], O: [] });
  const [turn, setTurn] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [level, setLevel] = useState<Level>("easy");
  const [locked, setLocked] = useState(false);

  const place = (p: Player, idx: number, brd = board, mvs = moves) => {
    const nb = [...brd];
    const q = [...mvs[p]];

    if (q.length === 3) {
      const out = q.shift()!;
      nb[out] = null;
    }
    nb[idx] = p;
    q.push(idx);

    return { board: nb, moves: { ...mvs, [p]: q } };
  };

  const handleClick = (idx: number) => {
    if (winner || board[idx] || turn !== "X") return;

    const { board: nb, moves: nm } = place("X", idx);
    if (hasWin(nb, "X")) {
      setBoard(nb); setMoves(nm); setWinner("X");
      return;
    }
    setBoard(nb); setMoves(nm); setTurn("O"); setLocked(true);
  };

  const pickAiMove = (): number | null => {
    const free = board.flatMap((c, i) => (c ? [] : i));
    if (!free.length) return null;

    const random = () => free[Math.floor(Math.random() * free.length)];

    const tryLine = (p: Player) => {
      for (const idx of free) {
        const sim = place(p, idx);
        if (hasWin(sim.board, p)) return idx;
      }
      return null;
    };

    if (level === "easy") return random();

    const win = tryLine("O");
    if (win !== null) return win;

    const block = tryLine("X");
    if (block !== null) return level === "medium" ? block : block;

    if (level === "hard") {
      if (board[4] === null) return 4;                   // centro
      const corners = [0, 2, 6, 8].filter(i => board[i] === null);
      if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    }

    return random();
  };

  useEffect(() => {
    if (turn !== "O" || winner) return;
    const idx = pickAiMove();
    if (idx === null) return;

    const t = setTimeout(() => {
      const { board: nb, moves: nm } = place("O", idx);
      if (hasWin(nb, "O")) {
        setBoard(nb); setMoves(nm); setWinner("O");
      } else {
        setBoard(nb); setMoves(nm); setTurn("X");
      }
    }, 350);
    return () => clearTimeout(t);
  }, [turn, winner, board, moves, level]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setMoves({ X: [], O: [] });
    setTurn("X");
    setWinner(null);
    setLocked(false);
  };

  const status = winner
    ? `🏆 ${winner} venceu!`
    : `Vez de ${turn}`;

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        {(Object.keys(LEVELS) as Level[]).map(l => (
          <Button
            key={l}
            size="sm"
            variant={level === l ? "default" : "outline"}
            disabled={locked}
            onClick={() => setLevel(l)}
          >
            {LEVELS[l]}
          </Button>
        ))}
      </div>

      <Card className="glass-card p-2 text-center">
        <span className="text-sm">{status}</span>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {board.map((v, i) => {
          const willVanish =
            v !== null &&
            moves[v].length === 3 &&
            moves[v][0] === i;

          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`
          w-20 h-20 md:w-24 md:h-24 rounded-xl
          bg-muted dark:bg-card
          text-3xl md:text-4xl font-bold
          flex items-center justify-center
          transition-transform hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-primary/60
          ${willVanish ? "opacity-40" : ""}
        `}
            >
              {v}
            </button>
          );
        })}
      </div>

      <Button onClick={reset} className="w-full">
        Reiniciar
      </Button>
    </div>
  );
}
