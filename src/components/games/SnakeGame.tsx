import ConfettiRain from "@/components/ConfettiRain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useMemo, useRef, useState } from "react";

type Level = "easy" | "medium" | "hard";
type Cell = { r: number; c: number };
type Dir = { r: number; c: number };

const ROWS = 15;
const COLS = 15;

const START_LEN = 4;
const TICK_MS = 200;

const LEVEL_POINTS: Record<Level, number> = { easy: 6, medium: 3, hard: 1 };
const FOOD_EMOJIS = ["🍎", "🍓", "🍇", "🍌", "🍒", "🍑", "🍍", "🥝", "🍉", "🥕", "🌮", "🍕", "🍪", "🍩", "🥨", "🍰", "🧁"];

const DIRS = {
  ArrowUp: { r: -1, c: 0 },
  ArrowDown: { r: 1, c: 0 },
  ArrowLeft: { r: 0, c: -1 },
  ArrowRight: { r: 0, c: 1 },
  w: { r: -1, c: 0 },
  s: { r: 1, c: 0 },
  a: { r: 0, c: -1 },
  d: { r: 0, c: 1 },
} as const;

function eq(a: Cell, b: Cell) { return a.r === b.r && a.c === b.c; }
function inside(p: Cell) { return p.r >= 0 && p.r < ROWS && p.c >= 0 && p.c < COLS; }
function opp(a: Dir, b: Dir) { return a.r === -b.r && a.c === -b.c; }

function rndEmptyCell(occupied: Set<string>) {
  const free: Cell[] = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const key = `${r}:${c}`;
    if (!occupied.has(key)) free.push({ r, c });
  }
  if (free.length === 0) return null;
  return free[Math.floor(Math.random() * free.length)];
}

export default function SnakeGame() {
  const boardRef = useRef<HTMLDivElement>(null);

  const [level, setLevel] = useState<Level>("easy");
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [dir, setDir] = useState<Dir>({ r: 0, c: 1 });
  const [snake, setSnake] = useState<Cell[]>([]);
  const [food, setFood] = useState<{ pos: Cell; emoji: string } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const MAX_POINTS = useMemo(() => {
    const step = LEVEL_POINTS[level];
    return step * Math.ceil(((ROWS * COLS - START_LEN) / step));
  }, [level]);

  const occupied = useMemo(() => {
    const s = new Set<string>();
    snake.forEach((p) => s.add(`${p.r}:${p.c}`));
    return s;
  }, [snake]);

  const init = (lvl: Level) => {
    const midR = Math.floor(ROWS / 2);
    const start: Cell[] = Array.from({ length: START_LEN }).map((_, i) => ({
      r: midR,
      c: Math.floor(COLS / 2) - (START_LEN - 1) + i,
    }));
    setSnake(start);
    setDir({ r: 0, c: 1 });
    setScore(0);
    setGrowth(0);
    setGameOver(false);
    setGameWon(false);
    const occ = new Set<string>(start.map((p) => `${p.r}:${p.c}`));
    const pos = rndEmptyCell(occ);
    setFood(pos ? { pos, emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)] } : null);
    setRunning(false);
    setTimeout(() => boardRef.current?.focus(), 0);
  };

  useEffect(() => {
    init(level);
  }, [level]);

  useEffect(() => {
    if (!running || gameOver || gameWon) return;
    const id = setInterval(() => {
      setSnake((curr) => {
        const head = curr[curr.length - 1];
        const next: Cell = { r: head.r + dir.r, c: head.c + dir.c };

        if (!inside(next)) { setGameOver(true); setRunning(false); return curr; }

        const tail = curr[0];
        if (eq(tail, next)) { setGameOver(true); setRunning(false); return curr; }

        for (let i = 1; i < curr.length - 1; i++) {
          if (eq(curr[i], next)) { setGameOver(true); setRunning(false); return curr; }
        }

        const ate = food && eq(next, food.pos);
        const growBy = ate ? LEVEL_POINTS[level] : 0;

        const updated = [...curr, next];
        let result = updated;

        if (!ate) {
          if (growth > 0) {
            setGrowth((g) => Math.max(0, g - 1));
          } else {
            result = updated.slice(1);
          }
        } else {
          const nextScore = score + growBy;
          setScore(nextScore);
          setGrowth((g) => g + growBy - 1);

          if (nextScore >= MAX_POINTS) {
            setGameWon(true);
            setRunning(false);
            setFood(null);
            return result;
          }

          const occ = new Set<string>(result.map((p) => `${p.r}:${p.c}`));
          const pos = rndEmptyCell(occ);
          setFood(pos ? { pos, emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)] } : null);
        }

        return result;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running, dir, level, food, gameOver, gameWon, growth, score, MAX_POINTS]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const k = e.key as keyof typeof DIRS;
    if (!(k in DIRS)) return;
    e.preventDefault();
    const nd = DIRS[k];

    if (gameOver || gameWon) {
      init(level);
      setDir(nd);
      setRunning(true);
      return;
    }

    setDir((d) => (opp(d, nd) ? d : nd));
    if (!running) setRunning(true);
  };

  const gridCells = useMemo(() => {
    const cells: { r: number; c: number }[] = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) cells.push({ r, c });
    return cells;
  }, []);

  const head = snake[snake.length - 1];
  const headIndex = head ? head.r * COLS + head.c : -1;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(["easy", "medium", "hard"] as Level[]).map((l) => (
          <Button
            key={l}
            size="sm"
            variant={level === l ? "default" : "outline"}
            onClick={() => { if (!running) setLevel(l); }}
            disabled={running}
          >
            {l === "easy" ? "😴 Easy" : l === "medium" ? "🙂 Medium" : "🤖 Hard"}
          </Button>
        ))}
        <span className="ml-2 text-sm opacity-70">
          Score: <b>{score}</b> / {MAX_POINTS}
        </span>
      </div>

      <Card
        tabIndex={0}
        ref={boardRef}
        onKeyDown={onKeyDown}
        className="p-3 outline-none relative"
      >
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1.6rem)`,
            gridTemplateRows: `repeat(${ROWS}, 1.6rem)`,
          }}
        >
          {gridCells.map((cell, idx) => {
            const key = `${cell.r}:${cell.c}`;
            const isSnake = occupied.has(key);
            const isHead = idx === headIndex;
            const isFood = food && eq(food.pos, cell);

            return (
              <div
                key={key}
                className="
                  relative rounded-md flex items-center justify-center
                  bg-muted/60 border border-border/60
                  dark:bg-[#121212] dark:border-white/10
                "
              >
                {isSnake && (
                  <div className={`snake-cell ${isHead ? "snake-head ring-2 ring-primary/40" : ""}`} />
                )}
                {isHead && (
                  <>
                    <span className="snake-eye left" />
                    <span className="snake-eye right" />
                    <span className="snake-tongue" />
                  </>
                )}
                {isFood && <span className="text-lg select-none">{food!.emoji}</span>}
              </div>
            );
          })}
        </div>

        <ConfettiRain active={gameWon} />

        {gameWon && (
          <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
            <span className="trophy-animate drop-shadow text-6xl md:text-7xl">🏆</span>
          </div>
        )}
      </Card>

      {gameOver && !gameWon && (
        <div className="text-center text-red-600 dark:text-red-400 font-semibold">
          Game Over — press any move key to restart!
        </div>
      )}
      {gameWon && (
        <div className="text-center text-green-600 dark:text-green-400 font-semibold">
          You win! Target score reached 🎉
        </div>
      )}

      <div className="text-xs text-center opacity-60">
        Use Arrow Keys or WASD. Eating gives {LEVEL_POINTS[level]} points and grows by {LEVEL_POINTS[level]}.
      </div>
    </div>
  );
}
