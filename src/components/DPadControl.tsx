import { useState } from "react";

const BTN = {
  up: {
    default: "/assets/game-assets/up-button.png",
    pressed: "/assets/game-assets/up-button-pressed.png",
  },
  down: {
    default: "/assets/game-assets/down-button.png",
    pressed: "/assets/game-assets/down-button-pressed.png",
  },
  left: {
    default: "/assets/game-assets/left-button.png",
    pressed: "/assets/game-assets/left-button-pressed.png",
  },
  right: {
    default: "/assets/game-assets/right-button.png",
    pressed: "/assets/game-assets/right-button-pressed.png",
  },
};

type DPadControlProps = {
  onMove: (dir: "up" | "down" | "left" | "right") => void;
};

export function DPadControl({ onMove }: DPadControlProps) {
  const [pressed, setPressed] = useState<{ [K in keyof typeof BTN]?: boolean }>({});

  const press = (dir: keyof typeof BTN) => {
    setPressed((p) => ({ ...p, [dir]: true }));
    onMove(dir);
  };
  const release = (dir: keyof typeof BTN) => {
    setPressed((p) => ({ ...p, [dir]: false }));
  };

  return (
    <div className="dpad-outer flex flex-col items-center justify-center mt-2 select-none">
      <div className="flex justify-center">
        <button
          className="dpad-btn"
          style={{ width: 70, height: 70 }}
          onTouchStart={() => press("up")}
          onTouchEnd={() => release("up")}
          onMouseDown={() => press("up")}
          onMouseUp={() => release("up")}
          onMouseLeave={() => release("up")}
          aria-label="Cima"
        >
          <img
            src={pressed.up ? BTN.up.pressed : BTN.up.default}
            alt="Up"
            width={60}
            height={60}
          />
        </button>
      </div>
      <div className="flex">
        <button
          className="dpad-btn"
          style={{ width: 70, height: 70 }}
          onTouchStart={() => press("left")}
          onTouchEnd={() => release("left")}
          onMouseDown={() => press("left")}
          onMouseUp={() => release("left")}
          onMouseLeave={() => release("left")}
          aria-label="Esquerda"
        >
          <img
            src={pressed.left ? BTN.left.pressed : BTN.left.default}
            alt="Left"
            width={60}
            height={60}
          />
        </button>
        <div style={{ width: 70, height: 70 }} />
        <button
          className="dpad-btn"
          style={{ width: 70, height: 70 }}
          onTouchStart={() => press("right")}
          onTouchEnd={() => release("right")}
          onMouseDown={() => press("right")}
          onMouseUp={() => release("right")}
          onMouseLeave={() => release("right")}
          aria-label="Direita"
        >
          <img
            src={pressed.right ? BTN.right.pressed : BTN.right.default}
            alt="Right"
            width={60}
            height={60}
          />
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="dpad-btn"
          style={{ width: 70, height: 70 }}
          onTouchStart={() => press("down")}
          onTouchEnd={() => release("down")}
          onMouseDown={() => press("down")}
          onMouseUp={() => release("down")}
          onMouseLeave={() => release("down")}
          aria-label="Baixo"
        >
          <img
            src={pressed.down ? BTN.down.pressed : BTN.down.default}
            alt="Down"
            width={60}
            height={60}
          />
        </button>
      </div>
      <style>{`
        .dpad-outer {
          user-select: none;
          -webkit-user-select: none;
        }
        .dpad-btn {
          background: none;
          border: none;
          outline: none;
          padding: 0;
          margin: 0 10px;
          touch-action: none;
        }
      `}</style>
    </div>
  );
}
