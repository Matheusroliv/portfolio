import ConfettiRain from "@/components/ConfettiRain";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type PieceKind = "man" | "king";
type Player = "white" | "black";
type Piece = { player: Player; kind: PieceKind };
type Cell = Piece | null;
const BOARD_SIZE = 8;
type Board = Cell[][];

function initialBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, (_, row) =>
    Array.from({ length: BOARD_SIZE }, (_, col) => {
      if ((row + col) % 2 === 1) {
        if (row < 3) return { player: "black", kind: "man" };
        if (row > 4) return { player: "white", kind: "man" };
      }
      return null;
    })
  );
}

function isOpponent(a: Piece, b: Piece | null) {
  return b && a.player !== b.player;
}

function getDirections(kind: PieceKind, player: Player): [number, number][] {
  if (kind === "king") return [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  return player === "white" ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
}

function getCaptures(board: Board, row: number, col: number): { to: [number, number], capture: [number, number] }[] {
  const piece = board[row][col];
  if (!piece) return [];
  const dirs = getDirections(piece.kind, piece.player);
  let moves: { to: [number, number], capture: [number, number] }[] = [];
  for (const [dr, dc] of dirs) {
    let r = row + dr, c = col + dc;
    if (piece.kind === "king") {
      let found = false;
      let enemy: [number, number] | null = null;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        if (!board[r][c]) {
          if (found && enemy) moves.push({ to: [r, c], capture: enemy });
        } else if (isOpponent(piece, board[r][c]) && !found) {
          found = true;
          enemy = [r, c];
        } else {
          break;
        }
        r += dr; c += dc;
      }
    } else {
      if (
        r + dr >= 0 && r + dr < BOARD_SIZE &&
        c + dc >= 0 && c + dc < BOARD_SIZE &&
        isOpponent(piece, board[r][c]) &&
        !board[r + dr][c + dc]
      ) {
        moves.push({ to: [r + dr, c + dc], capture: [r, c] });
      }
    }
  }
  return moves;
}

function getMoves(board: Board, row: number, col: number): [number, number][] {
  const piece = board[row][col];
  if (!piece) return [];
  const dirs = getDirections(piece.kind, piece.player);
  let moves: [number, number][] = [];
  for (const [dr, dc] of dirs) {
    let r = row + dr, c = col + dc;
    if (piece.kind === "king") {
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && !board[r][c]) {
        moves.push([r, c]);
        r += dr; c += dc;
      }
    } else {
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && !board[r][c]) {
        moves.push([r, c]);
      }
    }
  }
  return moves;
}

function getAllCaptures(board: Board, player: Player) {
  let result: [number, number][] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c]?.player === player && getCaptures(board, r, c).length > 0) {
        result.push([r, c]);
      }
    }
  }
  return result;
}

function getAllMoves(board: Board, player: Player) {
  let moves: { from: [number, number], to: [number, number], capture?: [number, number] }[] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c]?.player === player) {
        const captures = getCaptures(board, r, c);
        if (captures.length) {
          captures.forEach(cap => moves.push({ from: [r, c], ...cap }));
        } else {
          getMoves(board, r, c).forEach(to => moves.push({ from: [r, c], to }));
        }
      }
    }
  }
  return moves;
}

export default function CheckersGame() {
  const [board, setBoard] = useState<Board>(initialBoard());
  const [turn, setTurn] = useState<Player>("white");
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [validMoves, setValidMoves] = useState<{ to: [number, number], capture?: [number, number] }[]>([]);
  const [mustCapture, setMustCapture] = useState<[number, number][]>(getAllCaptures(initialBoard(), "white"));
  const [mode, setMode] = useState<"pvp" | "easy" | "hard">("easy");
  const [winner, setWinner] = useState<Player | null>(null);
  const [draw, setDraw] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [started, setStarted] = useState(false);
  const botPlayer: Player = "black";
  const boardRef = useRef<HTMLDivElement>(null);

  function resetGame() {
    setBoard(initialBoard());
    setTurn("white");
    setSelected(null);
    setValidMoves([]);
    setMustCapture(getAllCaptures(initialBoard(), "white"));
    setWinner(null);
    setDraw(false);
    setAnimate(false);
    setStarted(false);
  }

  function selectCell(r: number, c: number) {
    if (winner || draw) return;
    if (!started) setStarted(true);
    const piece = board[r][c];
    if (!piece || piece.player !== turn) return;
    if (mustCapture.length && !mustCapture.some(([mr, mc]) => mr === r && mc === c)) return;
    const moves = mustCapture.length ? getCaptures(board, r, c).map(m => ({ ...m })) : getMoves(board, r, c).map(m => ({ to: m }));
    setSelected([r, c]);
    setValidMoves(moves);
  }

  function moveOrCapture(r: number, c: number) {
    if (!selected || winner || draw) return;
    const [sr, sc] = selected;
    const piece = board[sr][sc];
    if (!piece) return;
    const move = validMoves.find(m => m.to[0] === r && m.to[1] === c);
    if (!move) return;
    let newBoard = board.map(row => row.slice());
    newBoard[sr][sc] = null;
    let captured = false;
    if (move.capture) {
      const [cr, cc] = move.capture;
      newBoard[cr][cc] = null;
      captured = true;
    }
    let becomeKing = piece.kind === "man" &&
      ((piece.player === "white" && r === 0) || (piece.player === "black" && r === BOARD_SIZE - 1));
    newBoard[r][c] = becomeKing ? { ...piece, kind: "king" } : piece;
    if (captured) {
      const chain = getCaptures(newBoard, r, c);
      if (chain.length > 0) {
        setBoard(newBoard);
        setSelected([r, c]);
        setValidMoves(chain.map(m => ({ ...m })));
        setMustCapture([[r, c]]);
        return;
      }
    }
    const nextTurn = turn === "white" ? "black" : "white";
    const nextMustCapture = getAllCaptures(newBoard, nextTurn);
    setBoard(newBoard);
    setSelected(null);
    setValidMoves([]);
    setTurn(nextTurn);
    setMustCapture(nextMustCapture);
  }

  function handleCellClick(r: number, c: number) {
    if ((mode === "easy" || mode === "hard") && turn === botPlayer) return;
    if (selected && validMoves.some(m => m.to[0] === r && m.to[1] === c)) {
      moveOrCapture(r, c);
    } else {
      selectCell(r, c);
    }
  }

  function isMoveDest(r: number, c: number) {
    return validMoves.some(m => m.to[0] === r && m.to[1] === c);
  }

  function botMove(level: "easy" | "hard") {
    const allCaptures = getAllMoves(board, botPlayer).filter(m => m.capture);
    let movesToUse = allCaptures.length > 0 ? allCaptures : getAllMoves(board, botPlayer);
    if (movesToUse.length === 0) return;
    let move;
    if (level === "easy") {
      move = movesToUse[Math.floor(Math.random() * movesToUse.length)];
    } else {
      let bestScore = -Infinity;
      let bestMoves: typeof movesToUse = [];
      for (const m of movesToUse) {
        const newBoard = board.map(row => row.slice());
        const [sr, sc] = m.from;
        const [r, c] = m.to;
        const piece = board[sr][sc];
        if (!piece) continue;
        newBoard[sr][sc] = null;
        let captured = false;
        if (m.capture) {
          const [cr, cc] = m.capture;
          newBoard[cr][cc] = null;
          captured = true;
        }
        const becomeKing = piece.kind === "man" &&
          ((piece.player === "white" && r === 0) || (piece.player === "black" && r === BOARD_SIZE - 1));
        const movedPiece: Piece = becomeKing ? { ...piece, kind: "king" } : piece;
        newBoard[r][c] = movedPiece;

        let score = 0;
        if (m.capture) score += 10;
        if (becomeKing) score += 8;
        if (movedPiece.kind === "king") score += 2;

        if (captured) {
          const chain = getCaptures(newBoard, r, c);
          if (chain.length) score += 5 + chain.length;
        }

        const centerDist = Math.abs(3.5 - r) + Math.abs(3.5 - c);
        score += Math.max(0, 3 - centerDist) * 0.5;

        const opp: Player = botPlayer === "white" ? "black" : "white";
        const oppCaps = getAllMoves(newBoard, opp).filter(mm => mm.capture);
        if (oppCaps.length) score -= 7;

        if (score > bestScore) { bestScore = score; bestMoves = [m]; }
        else if (score === bestScore) { bestMoves.push(m); }
      }
      move = bestMoves.length
        ? bestMoves[Math.floor(Math.random() * bestMoves.length)]
        : movesToUse[Math.floor(Math.random() * movesToUse.length)];
    }
    if (!move) return;
    setTimeout(() => {
      let newBoard = board.map(row => row.slice());
      const [sr, sc] = move.from;
      const [r, c] = move.to;
      const piece = board[sr][sc];
      if (!piece) return;
      newBoard[sr][sc] = null;
      let captured = false;
      if (move.capture) {
        const [cr, cc] = move.capture;
        newBoard[cr][cc] = null;
        captured = true;
      }
      let becomeKing = piece.kind === "man" &&
        ((piece.player === "white" && r === 0) || (piece.player === "black" && r === BOARD_SIZE - 1));
      newBoard[r][c] = becomeKing ? { ...piece, kind: "king" } : piece;
      if (captured) {
        const chain = getCaptures(newBoard, r, c);
        if (chain.length > 0) {
          setBoard(newBoard);
          setSelected([r, c]);
          setValidMoves(chain.map(m => ({ ...m })));
          setMustCapture([[r, c]]);
          setTurn(botPlayer);
          return;
        }
      }
      const nextTurn = botPlayer === "white" ? "black" : "white";
      const nextMustCapture = getAllCaptures(newBoard, nextTurn);
      setBoard(newBoard);
      setSelected(null);
      setValidMoves([]);
      setTurn(nextTurn);
      setMustCapture(nextMustCapture);
    }, 400);
  }

  useEffect(() => {
    if (started && (mode === "easy" || mode === "hard") && turn === botPlayer && !winner && !draw) {
      botMove(mode);
    }
  }, [turn, mode, board, winner, draw, started]);

  useEffect(() => {
    if (winner || draw) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 850);
    }
  }, [winner, draw]);

  useEffect(() => {
    if (winner || draw) return;
    const piecesWhite = board.flat().filter(p => p?.player === "white").length;
    const piecesBlack = board.flat().filter(p => p?.player === "black").length;

    if (piecesWhite === 0) setWinner("black");
    else if (piecesBlack === 0) setWinner("white");
    else {
      const movesCurrent = getAllMoves(board, turn);
      if (movesCurrent.length === 0) setDraw(true);
    }
  }, [board, turn, winner, draw]);


  const status = winner
    ? winner === "white"
      ? "🏆 Brancas venceram!"
      : "🏆 Pretas venceram!"
    : draw
      ? "Empate (Afogamento)"
      : `Vez das ${turn === "white" ? "Brancas" : "Pretas"}`;

  const emoji = winner
    ? winner === "white"
      ? "🏆"
      : "😭"
    : draw
      ? "🤝"
      : "🏆";

  return (
    <Card className="p-4">
      <h3 className="font-bold text-lg mb-2">Checkers</h3>
      <div className="flex gap-2 mb-4">
        <Button size="sm" variant={mode === "pvp" ? "default" : "outline"} onClick={() => setMode("pvp")} disabled={started}>PvP</Button>
        <Button size="sm" variant={mode === "easy" ? "default" : "outline"} onClick={() => setMode("easy")} disabled={started}>Fácil 🤖</Button>
        <Button size="sm" variant={mode === "hard" ? "default" : "outline"} onClick={() => setMode("hard")} disabled={started}>Difícil 🤖</Button>
      </div>
      <div className="relative mx-auto w-fit" ref={boardRef}>
        <ConfettiRain active={!!winner || !!draw} />
        {(winner || draw) && (
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-50"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <span className="trophy-animate drop-shadow text-6xl md:text-7xl">{emoji}</span>
          </div>
        )}
        <div className={`grid grid-cols-8 gap-0 border-2 border-muted rounded-xl overflow-hidden ${animate ? "animate-board-shake" : ""}`}>
          {board.map((row, r) =>
            row.map((cell, c) => {
              const isDark = (r + c) % 2 === 1;
              return (
                <button
                  key={`${r}-${c}`}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12
                    ${isDark ? "bg-[#ad7b41]" : "bg-[#e3bb7a]"}
                    flex items-center justify-center
                    transition-all
                    ${selected?.[0] === r && selected?.[1] === c ? "ring-4 ring-blue-400 z-10" : ""}
                    ${isMoveDest(r, c) ? "outline outline-2 outline-green-400 z-20" : ""}
                  `}
                  onClick={() => handleCellClick(r, c)}
                  disabled={!isDark || ((mode === "easy" || mode === "hard") && turn === botPlayer) || (!cell && !isMoveDest(r, c)) || !!winner || draw}
                >
                  {cell && (
                    <span
                      className={`
                        text-2xl select-none drop-shadow
                        ${cell.player === "white" ? "text-neutral-200" : "text-neutral-900"}
                        ${cell.kind === "king" ? "king-glow" : ""}
                        inline-flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10
                      `}
                      style={cell.kind === "king"
                        ? { boxShadow: "0 0 12px 3px #ffd700bb, 0 0 0 2px #fff8" }
                        : undefined
                      }
                    >
                      ⬤
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-4 items-center">
        <Button onClick={resetGame}>Reiniciar</Button>
        <span className="font-semibold">{status}</span>
        {mustCapture.length > 0 && !winner && !draw &&
          <span className="ml-2 text-sm text-red-400">Captura obrigatória!</span>
        }
      </div>
    </Card>
  );
}
