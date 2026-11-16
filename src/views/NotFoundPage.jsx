"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const SIZE = 15;
const TILE = 16;
const SPEED = 130;

export default function NotFoundPage() {
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);

  const snakeRef = useRef([
    [7, 7],
    [6, 7],
    [5, 7],
  ]);
  const foodRef = useRef([12, 7]);
  const dirRef = useRef([1, 0]);
  const nextDirRef = useRef([1, 0]);
  const touchStartRef = useRef([0, 0]);

  const draw = useCallback((ctx, snake, food) => {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, SIZE * TILE, SIZE * TILE);

    ctx.fillStyle = "#161616";
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        if ((x + y) % 2 === 0) ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
      }
    }

    // Snake
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

    // Food
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(food[0] * TILE + TILE / 2, food[1] * TILE + TILE / 2, TILE / 3, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // Draw initial board
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    draw(ctx, snakeRef.current, foodRef.current);
  }, [draw]);

  const startGame = () => {
    snakeRef.current = [
      [7, 7],
      [6, 7],
      [5, 7],
    ];
    foodRef.current = [12, 7];
    dirRef.current = [1, 0];
    nextDirRef.current = [1, 0];
    setScore(0);
    setDead(false);
    setPlaying(true);
  };

  // Keyboard controls
  useEffect(() => {
    if (!playing) return;

    const handler = (e) => {
      const map = {
        ArrowUp: [0, -1],
        KeyW: [0, -1],
        w: [0, -1],
        ArrowDown: [0, 1],
        KeyS: [0, 1],
        s: [0, 1],
        ArrowLeft: [-1, 0],
        KeyA: [-1, 0],
        a: [-1, 0],
        ArrowRight: [1, 0],
        KeyD: [1, 0],
        d: [1, 0],
      };

      const d = map[e.code] || map[e.key];
      if (!d) return;
      e.preventDefault();

      const prev = dirRef.current;
      if (d[0] === -prev[0] && d[1] === -prev[1]) return;
      nextDirRef.current = d;
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [playing]);

  // Main game tick
  useEffect(() => {
    if (!playing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let pts = 0;
    let ended = false;

    const loop = setInterval(() => {
      if (ended) return;

      dirRef.current = nextDirRef.current;
      const dir = dirRef.current;
      const snake = snakeRef.current;

      // Wrap around edges when leaving screen
      const nextX = (snake[0][0] + dir[0] + SIZE) % SIZE;
      const nextY = (snake[0][1] + dir[1] + SIZE) % SIZE;
      const head = [nextX, nextY];

      // Snake only dies if it touches itself
      if (snake.some((s) => s[0] === head[0] && s[1] === head[1])) {
        ended = true;
        setDead(true);
        setPlaying(false);
        clearInterval(loop);
        return;
      }

      snake.unshift(head);

      let currentFood = foodRef.current;
      if (head[0] === currentFood[0] && head[1] === currentFood[1]) {
        pts += 1;
        setScore(pts);

        let f;
        do {
          f = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
        } while (snake.some((s) => s[0] === f[0] && s[1] === f[1]));

        foodRef.current = f;
        currentFood = f;
      } else {
        snake.pop();
      }

      draw(ctx, snake, currentFood);
    }, SPEED);

    return () => {
      ended = true;
      clearInterval(loop);
    };
  }, [playing, draw]);

  // Mobile swipe support
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = [touch.clientX, touch.clientY];
  };

  const handleTouchEnd = (e) => {
    if (!playing) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current[0];
    const dy = touch.clientY - touchStartRef.current[1];
    const prev = dirRef.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 15) {
      const d = dx > 0 ? [1, 0] : [-1, 0];
      if (d[0] !== -prev[0]) nextDirRef.current = d;
    } else if (Math.abs(dy) > 15) {
      const d = dy > 0 ? [0, 1] : [0, -1];
      if (d[1] !== -prev[1]) nextDirRef.current = d;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 text-center font-sans">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">404</p>
      <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
        You&apos;ve reached the void.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
        This page doesn&apos;t exist. While you&apos;re here, try feeding the snake.
      </p>

      <div className="mt-8 flex flex-col items-center">
        <div
          className="relative overflow-hidden rounded-lg border border-zinc-800"
          style={{ width: SIZE * TILE, height: SIZE * TILE }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <canvas
            ref={canvasRef}
            width={SIZE * TILE}
            height={SIZE * TILE}
            className="block"
          />

          {!playing && !dead && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
              <button
                type="button"
                onClick={startGame}
                className="cursor-pointer rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-opacity hover:opacity-85 active:scale-95"
              >
                Play now
              </button>
            </div>
          )}
        </div>

        {dead && (
          <div className="mt-4">
            <p className="text-sm text-zinc-400">
              Score: {score} &mdash; Better luck next time.
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-3 cursor-pointer rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-opacity hover:opacity-85 active:scale-95"
            >
              Play again
            </button>
          </div>
        )}

        {playing && (
          <p className="mt-3 text-xs text-zinc-500">
            Score: {score} &middot; Arrow keys or swipe to move
          </p>
        )}
      </div>

      <Link
        href="/"
        className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-white"
      >
        Back home
      </Link>
    </div>
  );
}
