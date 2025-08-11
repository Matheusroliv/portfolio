import ConfettiRain from "@/components/ConfettiRain";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

// Peg Solitaire (Resta 1)
// Board representation: -1 = invalid, 0 = empty, 1 = peg

type Hole = -1 | 0 | 1;
type Board = Hole[][];

const SIZE = 7;

function createInitialBoard(): Board {
  return Array.from({ length: SIZE }, (_, r) =>
    Array.from({ length: SIZE }, (_, c) => {
      const invalid =
        (r < 2 && c < 2) ||
        (r < 2 && c > 4) ||
        (r > 4 && c < 2) ||
        (r > 4 && c > 4);
      if (invalid) return -1;
      if (r === 3 && c === 3) return 0; // center empty
      return 1; // peg
    })
  );
}

function inBounds(r: number, c: number) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function getValidMovesFrom(board: Board, r: number, c: number): [number, number][] {
  if (board[r][c] !== 1) return [];
  const deltas: [number, number][] = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];
  const res: [number, number][] = [];
  for (const [dr, dc] of deltas) {
    const nr = r + dr;
    const nc = c + dc;
    const mr = r + dr / 2;
    const mc = c + dc / 2;
    if (!inBounds(nr, nc) || !inBounds(mr, mc)) continue;
    if (board[nr][nc] === 0 && board[mr][mc] === 1) {
      res.push([nr, nc]);
    }
  }
  return res;
}

function getAllMoves(board: Board): { from: [number, number]; to: [number, number] }[] {
  const moves: { from: [number, number]; to: [number, number] }[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 1) {
        const tos = getValidMovesFrom(board, r, c);
        for (const to of tos) moves.push({ from: [r, c], to });
      }
    }
  }
  return moves;
}

export default function RestaUm() {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [validTo, setValidTo] = useState<[number, number][]>([]);
  const [history, setHistory] = useState<Board[]>([]);
  const [won, setWon] = useState(false);
  const [stuck, setStuck] = useState(false);

  const pegs = useMemo(() => board.flat().filter((x) => x === 1).length, [board]);

  useEffect(() => {
    if (pegs === 1) {
      setWon(true);
      setStuck(false);
      return;
    }
    const hasMoves = getAllMoves(board).length > 0;
    setStuck(!hasMoves);
    if (!hasMoves) setWon(false);
  }, [board, pegs]);

  function reset() {
    setBoard(createInitialBoard());
    setSelected(null);
    setValidTo([]);
    setHistory([]);
    setWon(false);
    setStuck(false);
  }

  function undo() {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setBoard(prev.map((row) => row.slice()) as Board);
      setSelected(null);
      setValidTo([]);
      setWon(false);
      setStuck(false);
      return h.slice(0, -1);
    });
  }

  function doMove(sr: number, sc: number, r: number, c: number) {
    const mr = (sr + r) / 2;
    const mc = (sc + c) / 2;
    const newBoard = board.map((row) => row.slice()) as Board;
    newBoard[sr][sc] = 0;
    newBoard[mr][mc] = 0;
    newBoard[r][c] = 1;
    setHistory((h) => [...h, board.map((row) => row.slice()) as Board]);
    setBoard(newBoard);
    setSelected(null);
    setValidTo([]);
  }

  function handleCellClick(r: number, c: number) {
    const cell = board[r][c];
    if (cell === -1 || won) return;

    if (selected) {
      const isDest = validTo.some(([rr, cc]) => rr === r && cc === c);
      if (isDest) {
        doMove(selected[0], selected[1], r, c);
        return;
      }
    }

    if (cell === 1) {
      const moves = getValidMovesFrom(board, r, c);
      if (moves.length) {
        setSelected([r, c]);
        setValidTo(moves);
      } else {
        setSelected(null);
        setValidTo([]);
      }
    } else {
      setSelected(null);
      setValidTo([]);
    }
  }

  const status = won
    ? "🏆 Você venceu! Restou apenas 1 peça."
    : stuck
    ? "Sem movimentos disponíveis."
    : `Peças restantes: ${pegs}`;

  return (
    <Card className="p-4">
      <h3 className="font-bold text-lg mb-2">Resta 1</h3>
      <div className="flex gap-2 mb-4">
        <Button size="sm" variant="outline" onClick={undo} disabled={history.length === 0}>
          Desfazer
        </Button>
        <Button size="sm" onClick={reset}>Reiniciar</Button>
      </div>

      <div className="relative mx-auto w-fit">
        <ConfettiRain active={won} />
        {won && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-50" style={{ transform: "translate(-50%, -50%)" }}>
            <span className="drop-shadow text-6xl md:text-7xl">🏆</span>
          </div>
        )}
        <div className="grid grid-cols-7 gap-0 border-2 border-muted rounded-xl overflow-hidden">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const invalid = cell === -1;
              const isSelected = selected?.[0] === r && selected?.[1] === c;
              const isDest = validTo.some(([rr, cc]) => rr === r && cc === c);
              return (
                <button
                  key={`${r}-${c}`}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12
                    ${invalid ? "bg-transparent" : "bg-[#e3bb7a]"}
                    flex items-center justify-center transition-all relative
                    ${isSelected ? "ring-4 ring-blue-400 z-10" : ""}
                    ${isDest ? "outline outline-2 outline-green-400 z-20" : ""}
                  `}
                  onClick={() => handleCellClick(r, c)}
                  disabled={invalid || stuck}
                >
                  {cell === 1 ? (
                    <span className="text-2xl select-none drop-shadow text-neutral-900 inline-flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10">
                      ⬤
                    </span>
                  ) : (
                    <span className="text-transparent select-none">·</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <span className="font-semibold">{status}</span>
      </div>
    </Card>
  );
}
