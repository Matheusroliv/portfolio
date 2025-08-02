import { useEffect, useState } from "react";

type Piece = {
  left: number;
  delay: number;
  dur: number;
  rot: number;
  hue: number;
  drift: number;
  size: number;
};

export default function ConfettiRain({ active, count = 64 }: { active: boolean; count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }
    const next: Piece[] = Array.from({ length: count }).map(() => {
      const dur = 1.5 + Math.random() * 1.8;
      return {
        left: Math.random() * 100,
        delay: -(Math.random() * dur),
        dur,
        rot: -360 + Math.random() * 720,
        hue: Math.floor(Math.random() * 360),
        drift: Math.random() * 120 - 60,
        size: 6 + Math.random() * 6,
      };
    });
    setPieces(next);
  }, [active, count]);

  return (
    <div className={`confetti-v2-layer ${active ? "" : "hidden"}`} aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-v2-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            ["--v2-delay" as any]: `${p.delay}s`,
            ["--v2-dur" as any]: `${p.dur}s`,
            ["--v2-rot" as any]: `${p.rot}deg`,
            ["--v2-hue" as any]: `${p.hue}deg`,
            ["--v2-drift" as any]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
