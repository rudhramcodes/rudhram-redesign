import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SIZE = 15;
const TILE = 16;
const SPEED = 140;

export default function NotFoundPage() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const dirRef = useRef([1, 0]);
  const nextDirRef = useRef([1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let snake = [
      [7, 7],
      [6, 7],
      [5, 7],
    ];
    let food = [12, 7];
    let pts = 0;
    let ended = false;

    dirRef.current = [1, 0];
    nextDirRef.current = [1, 0];

    const handler = (e) => {
      if (ended) return;
      const map = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      const prev = dirRef.current;
      if (d[0] === -prev[0] && d[1] === -prev[1]) return;
      nextDirRef.current = d;
    };
    window.addEventListener("keydown", handler);

    const loop = setInterval(() => {
      if (ended) { clearInterval(loop); return; }

      dirRef.current = nextDirRef.current;
      const dir = dirRef.current;

      const head = [snake[0][0] + dir[0], snake[0][1] + dir[1]];
      if (head[0] < 0 || head[0] >= SIZE || head[1] < 0 || head[1] >= SIZE ||
          snake.some((s) => s[0] === head[0] && s[1] === head[1])) {
        ended = true;
        setDead(true);
        setScore(pts);
        clearInterval(loop);
        return;
      }

      snake.unshift(head);
      if (head[0] === food[0] && head[1] === food[1]) {
        pts++;
        setScore(pts);
        let f;
        do { f = [Math.random() * SIZE | 0, Math.random() * SIZE | 0]; }
        while (snake.some((s) => s[0] === f[0] && s[1] === f[1]));
        food = f;
      } else snake.pop();

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, SIZE * TILE, SIZE * TILE);

      ctx.fillStyle = "#1a1a1a";
      for (let x = 0; x < SIZE; x++)
        for (let y = 0; y < SIZE; y++)
          if ((x + y) % 2 === 0) ctx.fillRect(x * TILE, y * TILE, TILE, TILE);

      ctx.fillStyle = "#22c55e";
      snake.forEach(([x, y], i) => {
        ctx.fillRect(x * TILE + 1, y * TILE + 1, TILE - 2, TILE - 2);
        if (i === 0) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(x * TILE + 3, y * TILE + 3, 3, 3);
          ctx.fillRect(x * TILE + 8, y * TILE + 3, 3, 3);
          ctx.fillStyle = "#22c55e";
        }
      });

      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(food[0] * TILE + TILE / 2, food[1] * TILE + TILE / 2, TILE / 3, 0, Math.PI * 2);
      ctx.fill();
    }, SPEED);

    setDead(false);
    setScore(0);

    return () => {
      ended = true;
      window.removeEventListener("keydown", handler);
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 text-center font-sans">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">404</p>
      <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
        You&apos;ve reached the void.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
        This page doesn&apos;t exist. While you&apos;re here, try feeding the snake.
      </p>

      <div className="mt-8">
        <canvas
          ref={canvasRef}
          width={SIZE * TILE}
          height={SIZE * TILE}
          className="rounded-lg border border-zinc-800"
        />
        {dead && (
          <div className="mt-4">
            <p className="text-sm text-zinc-500">
              Score: {score} — Better luck next time.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 cursor-pointer rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-80"
            >
              Play again
            </button>
          </div>
        )}
        {!dead && (
          <p className="mt-3 text-xs text-zinc-600">
            Score: {score} &middot; Arrow keys to move
          </p>
        )}
      </div>

      <Link
        to="/"
        className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-white"
      >
        Back home
      </Link>
    </div>
  );
}
