import ConfettiRain from "@/components/ConfettiRain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

type Player = "X" | "O";
type Cell = Player | null;
type Level = "easy" | "medium" | "hard";
type Line = readonly [number, number, number];

const WIN: readonly Line[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

const LEVELS: Record<Level, string> = { easy: "😴 Easy", medium: "🙂 Medium", hard: "🤖 Hard" };

const getWinLine = (board: Cell[], p: Player): Line | null =>
  WIN.find((line) => line.every((i) => board[i] === p)) ?? null;

const opposite = (p: Player): Player => (p === "X" ? "O" : "X");

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [moves, setMoves] = useState<Record<Player, number[]>>({ X: [], O: [] });
  const [turn, setTurn] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<Line | null>(null);
  const [level, setLevel] = useState<Level>("easy");
  const [locked, setLocked] = useState(false);
  const [winPts, setWinPts] = useState<{ x1: number; y1: number; x2: number; y2: number; len: number } | null>(null);
  const [trophyPos, setTrophyPos] = useState<{ x: number; y: number } | null>(null);
  const [playerAs, setPlayerAs] = useState<Player>("X");

  const boardRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
    if (winner || board[idx] || turn !== playerAs) return;
    const { board: nb, moves: nm } = place(playerAs, idx);
    const line = getWinLine(nb, playerAs);
    if (line) {
      setBoard(nb);
      setMoves(nm);
      setWinner(playerAs);
      setWinningLine(line);
      return;
    }
    setBoard(nb);
    setMoves(nm);
    setTurn(opposite(playerAs));
    setLocked(true);
  };

  const pickAiMove = (): number | null => {
    const free = board.flatMap((c, i) => (c ? [] : i));
    if (!free.length) return null;
    const random = () => free[Math.floor(Math.random() * free.length)];
    const tryLine = (p: Player) => {
      for (const idx of free) {
        const sim = place(p, idx);
        if (getWinLine(sim.board, p)) return idx;
      }
      return null;
    };
    if (level === "easy") return random();
    const ai = opposite(playerAs);
    const win = tryLine(ai);
    if (win !== null) return win;
    const block = tryLine(playerAs);
    if (block !== null) return block;
    if (level === "hard") {
      if (board[4] === null) return 4;
      const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
      if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    }
    return random();
  };

  useEffect(() => {
    const ai = opposite(playerAs);
    if (turn !== ai || winner) return;
    const idx = pickAiMove();
    if (idx === null) return;
    const t = setTimeout(() => {
      const aiP = opposite(playerAs);
      const { board: nb, moves: nm } = place(aiP, idx);
      const line = getWinLine(nb, aiP);
      if (line) {
        setBoard(nb);
        setMoves(nm);
        setWinner(aiP);
        setWinningLine(line);
      } else {
        setBoard(nb);
        setMoves(nm);
        setTurn(playerAs);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [turn, winner, board, moves, level, playerAs]);

  useEffect(() => {
    if (!winningLine || !boardRef.current) {
      setWinPts(null);
      return;
    }
    const [a, , c] = winningLine;
    const ra = cellRefs.current[a]?.getBoundingClientRect();
    const rc = cellRefs.current[c]?.getBoundingClientRect();
    const rBoard = boardRef.current.getBoundingClientRect();
    if (!ra || !rc) return;
    const ax = ra.left + ra.width / 2 - rBoard.left;
    const ay = ra.top + ra.height / 2 - rBoard.top;
    const cx = rc.left + rc.width / 2 - rBoard.left;
    const cy = rc.top + rc.height / 2 - rBoard.top;
    const len = Math.hypot(cx - ax, cy - ay);
    setWinPts({ x1: ax, y1: ay, x2: cx, y2: cy, len });
  }, [winningLine]);

  const midIdx = winningLine?.[1];

  useEffect(() => {
    if (!winner || midIdx == null || !boardRef.current) {
      setTrophyPos(null);
      return;
    }
    const rMid = cellRefs.current[midIdx]?.getBoundingClientRect();
    const rBoard = boardRef.current.getBoundingClientRect();
    if (!rMid) return;
    setTrophyPos({
      x: rMid.left + rMid.width / 2 - rBoard.left,
      y: rMid.top + rMid.height / 2 - rBoard.top,
    });
  }, [winner, midIdx]);

  const reset = (nextPlayerAs: Player = playerAs) => {
    setBoard(Array(9).fill(null));
    setMoves({ X: [], O: [] });
    setTurn("X");
    setWinner(null);
    setWinningLine(null);
    setWinPts(null);
    setTrophyPos(null);
    setLocked(false);
    setPlayerAs(nextPlayerAs);
  };

  const status = winner ? `🏆 ${winner} venceu!` : `Vez de ${turn}`;
  const winEmoji = winner ? (winner === playerAs ? "🏆" : "😭") : "🏆";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(Object.keys(LEVELS) as Level[]).map((l) => (
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

      <div className="flex flex-wrap items-center justify-center gap-2">
        {(["X", "O"] as Player[]).map((p) => (
          <Button
            key={p}
            size="sm"
            variant={playerAs === p ? "default" : "outline"}
            disabled={locked}
            onClick={() => reset(p)}
          >
            {p}
          </Button>
        ))}
      </div>

      <Card className="glass-card p-2 text-center">
        <span className="text-sm">{status}</span>
      </Card>

      <div className="relative mx-auto w-fit" ref={boardRef}>
        <ConfettiRain active={!!winner} />

        {winPts && (
          <svg className="pointer-events-none absolute inset-0 z-40" width="100%" height="100%">
            <line
              x1={winPts.x1}
              y1={winPts.y1}
              x2={winPts.x2}
              y2={winPts.y2}
              className="win-line win-line--glow"
              style={{ ["--len" as any]: `${winPts.len}px` }}
            />
            <line
              x1={winPts.x1}
              y1={winPts.y1}
              x2={winPts.x2}
              y2={winPts.y2}
              className="win-line"
              style={{ ["--len" as any]: `${winPts.len}px` }}
            />
          </svg>
        )}

        {trophyPos && winner && (
          <div
            className="pointer-events-none absolute z-50"
            style={{ left: trophyPos.x, top: trophyPos.y, transform: "translate(-50%, -50%)" }}
          >
            <span className="trophy-animate drop-shadow text-6xl md:text-7xl">{winEmoji}</span>
          </div>
        )}

        <div className={`grid grid-cols-3 gap-3 ${winner ? "animate-board-shake" : ""}`}>
          {board.map((v, i) => {
            const willVanish = v !== null && moves[v].length === 3 && moves[v][0] === i;
            const isWin = winningLine?.includes(i);
            const dim = willVanish && !isWin;
            return (
              <button
                key={i}
                ref={(el) => (cellRefs.current[i] = el)}
                onClick={() => handleClick(i)}
                className={`
                  w-20 h-20 md:w-24 md:h-24 rounded-xl
                  bg-muted dark:bg-card
                  text-3xl md:text-4xl font-bold
                  flex items-center justify-center
                  transition-transform hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-primary/60
                  ${dim ? "opacity-40" : ""} ${isWin ? "win-cell" : ""}
                `}
              >
                <span className={isWin ? "animate-win-pop" : ""}>{v}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Button onClick={() => reset()} className="w-full">
        Reiniciar
      </Button>
    </div>
  );
}
