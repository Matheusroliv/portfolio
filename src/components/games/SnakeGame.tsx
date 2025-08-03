import ConfettiRain from "@/components/ConfettiRain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useMemo, useRef, useState } from "react";
import { DPadControl } from "../DPadControl";

type Level = "easy" | "medium" | "hard";
type Cell = { r: number; c: number };
type Dir = { r: number; c: number };

const ROWS = 10;
const COLS = 10;

const START_LEN = 4;
const TICK_MS = 240;

const LEVEL_POINTS: Record<Level, number> = { easy: 2, medium: 1, hard: 1 };
const FOOD_EMOJIS = ["🍎", "🍓", "🍇", "🍌", "🍒", "🍑", "🍍", "🥝", "🍉", "🥕", "🌮", "🍕", "🍪", "🍩", "🥨", "🍰", "🧁"];

const SPECIAL_ROLL_INTERVAL_MS = 1000;
const STAR_ROLL_CHANCE = 0.18;
const PEPPER_ROLL_CHANCE = 0.22;
const STAR_POSTEAT_CHANCE = 0.14;
const PEPPER_POSTEAT_CHANCE = 0.20;

const POWER_DURATION_MS = 12000;

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

function isMobile() {
  return typeof window !== "undefined" && (
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)
  );
}

function eq(a: Cell, b: Cell) { return a.r === b.r && a.c === b.c; }
function opp(a: Dir, b: Dir) { return a.r === -b.r && a.c === -b.c; }
function inside(p: Cell) { return p.r >= 0 && p.r < ROWS && p.c >= 0 && p.c < COLS; }

function rndEmptyCell(occupied: Set<string>) {
  const free: Cell[] = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const key = `${r}:${c}`;
    if (!occupied.has(key)) free.push({ r, c });
  }
  if (free.length === 0) return null;
  return free[Math.floor(Math.random() * free.length)];
}

function hexToHsl(hex: string) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(x => x + x).join("");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hh = 0, s = 0, l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hh = (g - b) / d + (g < b ? 6 : 0); break;
      case g: hh = (b - r) / d + 2; break;
      case b: hh = (r - g) / d + 4; break;
    }
    hh /= 6;
  }
  return { h: Math.round(hh * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function hslStr(h: number, s: number, l: number) { return `hsl(${h} ${s}% ${l}%)`; }

export default function SnakeGame() {
  const boardRef = useRef<HTMLDivElement>(null);

  const [level, setLevel] = useState<Level>("easy");
  const [running, setRunning] = useState(false);
  const [growth, setGrowth] = useState(0);
  const [dir, setDir] = useState<Dir>({ r: 0, c: 1 });
  const [snake, setSnake] = useState<Cell[]>([]);
  const [food, setFood] = useState<{ pos: Cell; emoji: string } | null>(null);

  const [starFood, setStarFood] = useState<Cell | null>(null);
  const [pepperFood, setPepperFood] = useState<Cell | null>(null);

  const [power, setPower] = useState<{ star: boolean; pepper: boolean } | null>(null);
  const powerTimeoutRef = useRef<number | null>(null);

  const [firstMove, setFirstMove] = useState(true);

  const [nextDirs, setNextDirs] = useState<Dir[]>([]);

  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const [snakeColor, setSnakeColor] = useState<string>("#22c55e");
  const shades = useMemo(() => {
    const { h, s, l } = hexToHsl(snakeColor);
    const light = hslStr(h, Math.min(100, s + 5), Math.min(80, l + 5));
    const dark = hslStr(h, Math.max(30, s - 10), Math.max(20, l - 10));
    return { light, dark };
  }, [snakeColor]);

  const occupied = useMemo(() => {
    const s = new Set<string>();
    snake.forEach((p) => s.add(`${p.r}:${p.c}`));
    return s;
  }, [snake]);

  const init = (lvl: Level) => {
    setFirstMove(true);
    const midR = Math.floor(ROWS / 2);
    const start: Cell[] = Array.from({ length: START_LEN }).map((_, i) => ({
      r: midR,
      c: Math.floor(COLS / 2) - (START_LEN - 1) + i,
    }));
    setSnake(start);
    setDir({ r: 0, c: 1 });
    setGrowth(0);
    setGameOver(false);
    setGameWon(false);
    setStarFood(null);
    setPepperFood(null);
    setPower(null);
    if (powerTimeoutRef.current) { clearTimeout(powerTimeoutRef.current); powerTimeoutRef.current = null; }
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
        let currentDir = dir;

        if (nextDirs.length > 0 && !opp(currentDir, nextDirs[0])) {
          currentDir = nextDirs[0];
          setDir(currentDir);
          setNextDirs((dirs) => dirs.slice(1));
        }

        const head = curr[curr.length - 1];
        let next: Cell;
        if (level === "hard") {
          next = { r: head.r + currentDir.r, c: head.c + currentDir.c };
          if (!inside(next)) { setGameOver(true); setRunning(false); return curr; }
        } else {
          next = { r: (head.r + currentDir.r + ROWS) % ROWS, c: (head.c + currentDir.c + COLS) % COLS };
        }

        const tail = curr[0];
        if (eq(tail, next)) { setGameOver(true); setRunning(false); return curr; }
        for (let i = 1; i < curr.length - 1; i++) {
          if (eq(curr[i], next)) { setGameOver(true); setRunning(false); return curr; }
        }

        const ateNormal = food && eq(next, food.pos);
        const ateStar = starFood && eq(next, starFood);
        const atePepper = pepperFood && eq(next, pepperFood);

        const updated = [...curr, next];
        let result = updated;

        if (!ateNormal && !ateStar && !atePepper) {
          if (growth > 0) {
            setGrowth((g) => Math.max(0, g - 1));
          } else {
            result = updated.slice(1);
          }
        } else {
          if (ateStar) {
            const nextPower = { star: true, pepper: !!power?.pepper };
            setStarFood(null);
            setPower(nextPower);
            if (powerTimeoutRef.current) clearTimeout(powerTimeoutRef.current);
            powerTimeoutRef.current = window.setTimeout(() => setPower(null), POWER_DURATION_MS);
          }
          if (atePepper) {
            const nextPower = { star: !!power?.star, pepper: true };
            setPepperFood(null);
            setPower(nextPower);
            if (powerTimeoutRef.current) clearTimeout(powerTimeoutRef.current);
            powerTimeoutRef.current = window.setTimeout(() => setPower(null), POWER_DURATION_MS);
          }
          if (ateNormal) {
            const mult = power ? (power.star && power.pepper ? 3 : 2) : 1;
            const growBy = LEVEL_POINTS[level] * mult;
            setGrowth((g) => g + growBy - 1);

            const occ = new Set<string>(result.map((p) => `${p.r}:${p.c}`));
            if (starFood) occ.add(`${starFood.r}:${starFood.c}`);
            if (pepperFood) occ.add(`${pepperFood.r}:${pepperFood.c}`);
            const pos = rndEmptyCell(occ);

            if (pos) {
              setFood({ pos, emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)] });
            } else {
              setGameWon(true);
              setRunning(false);
              setFood(null);
              setStarFood(null);
              setPepperFood(null);
              return result;
            }

            if (result.length === ROWS * COLS) {
              setGameWon(true);
              setRunning(false);
              setFood(null);
              setStarFood(null);
              setPepperFood(null);
            }

            const r1 = Math.random();
            if (!starFood && r1 < STAR_POSTEAT_CHANCE) {
              const occS = new Set<string>(result.map((p) => `${p.r}:${p.c}`));
              if (food) occS.add(`${food.pos.r}:${food.pos.c}`);
              if (pepperFood) occS.add(`${pepperFood.r}:${pepperFood.c}`);
              const sPos = rndEmptyCell(occS);
              if (sPos) setStarFood(sPos);
            }
            const r2 = Math.random();
            if (!pepperFood && r2 < PEPPER_POSTEAT_CHANCE) {
              const occP = new Set<string>(result.map((p) => `${p.r}:${p.c}`));
              if (food) occP.add(`${food.pos.r}:${food.pos.c}`);
              if (starFood) occP.add(`${starFood.r}:${starFood.c}`);
              const pPos = rndEmptyCell(occP);
              if (pPos) setPepperFood(pPos);
            }
          }
        }

        return result;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running, dir, nextDirs, level, food, starFood, pepperFood, gameOver, gameWon, growth, power]);

  useEffect(() => {
    if (!running || gameOver || gameWon) return;
    const id = setInterval(() => {
      if (!starFood) {
        const r = Math.random();
        if (r < STAR_ROLL_CHANCE) {
          const occ = new Set<string>(snake.map((p) => `${p.r}:${p.c}`));
          if (food) occ.add(`${food.pos.r}:${food.pos.c}`);
          if (pepperFood) occ.add(`${pepperFood.r}:${pepperFood.c}`);
          const pos = rndEmptyCell(occ);
          if (pos) setStarFood(pos);
        }
      }
      if (!pepperFood) {
        const r = Math.random();
        if (r < PEPPER_ROLL_CHANCE) {
          const occ = new Set<string>(snake.map((p) => `${p.r}:${p.c}`));
          if (food) occ.add(`${food.pos.r}:${food.pos.c}`);
          if (starFood) occ.add(`${starFood.r}:${starFood.c}`);
          const pos = rndEmptyCell(occ);
          if (pos) setPepperFood(pos);
        }
      }
    }, SPECIAL_ROLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [running, gameOver, gameWon, snake, food, starFood, pepperFood]);

  useEffect(() => {
    return () => {
      if (powerTimeoutRef.current) clearTimeout(powerTimeoutRef.current);
    };
  }, []);

  function handleMobileDir(key: keyof typeof DIRS) {
    onKeyDown({
      key,
      preventDefault: () => { },
    } as unknown as React.KeyboardEvent<HTMLDivElement>);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement> | { key: string, preventDefault: () => void }) => {
    const k = (e as any).key as keyof typeof DIRS;
    if (!(k in DIRS)) return;
    e.preventDefault();
    const nd = DIRS[k];

    const last = nextDirs.length > 0 ? nextDirs[nextDirs.length - 1] : dir;
    if (opp(last, nd)) return;

    if (gameOver || gameWon) {
      if (opp({ r: 0, c: 1 }, nd)) return;
      init(level);
      setRunning(true);
      setNextDirs([nd]);
      return;
    }

    if (!running && snake.length === START_LEN && firstMove) {
      if (opp(dir, nd)) return;
      setNextDirs([nd]);
      setDir(nd);
      setFirstMove(false);
      setRunning(true);
      return;
    }

    setNextDirs((curr) => curr.length < 2 ? [...curr, nd] : curr);

    if (!running) setRunning(true);
  };

  function handleDPad(dir: "up" | "down" | "left" | "right") {
    const keyMap = {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
    } as const;

    onKeyDown({
      key: keyMap[dir],
      preventDefault: () => { },
    } as any);
  }

  const gridCells = useMemo(() => {
    const cells: { r: number; c: number }[] = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) cells.push({ r, c });
    return cells;
  }, []);

  const head = snake[snake.length - 1];
  const headIndex = head ? head.r * COLS + head.c : -1;

  const multiplier = power ? (power.star && power.pepper ? 3 : 2) : 1;
  const powerBadge =
    multiplier === 3 ? "🌶️⭐ 3x combo!" :
      multiplier === 2 ? "✨ 2x combo!" : null;

  const poweredClass =
    multiplier === 3 ? "snake-powered-3x" :
      multiplier === 2 ? "snake-powered-2x" : "";

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
            {l === "easy"
              ? "😴 Easy"
              : l === "medium"
                ? "🙂 Medium"
                : "🤖 Hard"}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2 w-full max-w-xl mx-auto">
        <div>
          {powerBadge && (
            <span className="text-sm font-semibold text-primary">{powerBadge}</span>
          )}
        </div>
        <label className="text-sm flex items-center gap-2">
          <span className="opacity-70">Snake color</span>
          <input
            type="color"
            value={snakeColor}
            onChange={(e) => setSnakeColor(e.target.value)}
            className="size-6 rounded overflow-hidden border border-border cursor-pointer"
            disabled={running && !gameOver && !gameWon}
            aria-label="Pick snake color"
            title="Pick snake color"
          />
        </label>
      </div>

      <Card
        tabIndex={0}
        ref={boardRef}
        onKeyDown={onKeyDown}
        className="p-3 outline-none relative"
        style={
          {
            ["--snakeLight" as any]: shades.light,
            ["--snakeDark" as any]: shades.dark,
          } as React.CSSProperties
        }
      >
        <div className="w-full flex items-center justify-center">
          <div
            className={`mx-auto grid gap-1 rounded-md ${level === "hard" ? "outline outline-2 outline-orange-500" : ""}`}
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
              const isStar = starFood && eq(starFood, cell);
              const isPepper = pepperFood && eq(pepperFood, cell);

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
                    <div className={`snake-cell ${poweredClass} ${isHead ? "snake-head ring-2 ring-primary/40" : ""}`} />
                  )}
                  {isHead && (
                    <>
                      <span className="snake-eye left" />
                      <span className="snake-eye right" />
                      <span className="snake-tongue" />
                    </>
                  )}
                  {isFood && <span className="text-lg select-none">{food!.emoji}</span>}
                  {isStar && (
                    <span className="text-lg select-none special-food-star">⭐</span>
                  )}
                  {isPepper && (
                    <span className="text-lg select-none special-food-pepper">🌶️</span>
                  )}
                </div>
              );
            })}
          </div>
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
          You win! 🎉
        </div>
      )}

      {isMobile() ? (
        <DPadControl onMove={handleDPad} />
      ) : (
        <div className="text-xs text-center opacity-60">
          Use Arrow Keys or WASD.
        </div>
      )}


    </div>
  );
}
