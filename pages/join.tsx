import Link from "next/link";
import { useEffect, useRef } from "react";

export default function JoinPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = ["#ffffff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#caffbf"];
    const maxDimension = Math.max(window.innerWidth, window.innerHeight);
    const stars = Array.from({ length: 300 }, () => ({
      x: (Math.random() - 0.5) * maxDimension * 6,
      y: (Math.random() - 0.5) * maxDimension * 6,
      z: Math.random() * maxDimension,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      vz: -1.5 + Math.random() * -0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz;

        if (star.z <= 0) {
          star.z = maxDimension;
          star.x = (Math.random() - 0.5) * maxDimension * 6;
          star.y = (Math.random() - 0.5) * maxDimension * 6;
        }

        const k = 128.0 / star.z;
        const x = star.x * k + canvas.width / 2;
        const y = star.y * k + canvas.height / 2;

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          const size = (1 - star.z / maxDimension) * 2;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
      />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Join Abyssal RP
        </h1>
        <p className="text-center max-w-xl mb-8 text-white/80">
          Click below to join our Discord server and get started. Our whitelist application system will be available through Discord.
        </p>

        <a
          href="https://discord.gg/PCtfNK99zT"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition shadow-lg text-xl font-semibold"
        >
          💬 Join Our Discord
        </a>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl text-center">
          <Link href="/rules" className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur hover:bg-white/20 transition">
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Rules</h3>
            <p className="text-white/60">Coming soon — our server rules and roleplay standards.</p>
          </Link>
          <Link href="/join" className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur hover:bg-white/20 transition">
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Join Our Discord</h3>
            <p className="text-white/60">Click here to join our growing RP community.</p>
          </Link>
          <Link href="/preview" className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur hover:bg-white/20 transition">
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">World Preview</h3>
            <p className="text-white/60">Coming soon — sneak peeks of our custom world and systems.</p>
          </Link>
          <Link href="/" className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur hover:bg-white/20 transition">
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Back to Home</h3>
            <p className="text-white/60">Return to the main landing page.</p>
          </Link>
        </div>
      </div>
    </>
  );
}