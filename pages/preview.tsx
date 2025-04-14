import { useEffect, useRef } from "react";
import Link from "next/link";

export default function PreviewPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure client-side only
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
      if (!canvas || !ctx) return;
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
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10 min-h-screen px-6 py-20 text-white flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          World Preview
        </h1>
        <p className="text-white/70 text-lg mb-10">Sneak peeks coming soon. Stay tuned.</p>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl text-center">
    <Link href="/" className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur hover:bg-white/20 transition text-center">
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Home</h3>
      <p className="text-white/60">Return to the main landing page.</p>
    </Link>
    <Link href="/join" className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur hover:bg-white/20 transition text-center">
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Join Abyssal RP</h3>
      <p className="text-white/60">Connect to our Discord and get whitelisted.</p>
    </Link>
    <Link href="/rules" className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur hover:bg-white/20 transition text-center">
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Server Rules</h3>
      <p className="text-white/60">View all roleplay and community guidelines.</p>
    </Link>
  </div>
</div>
</>
  );
}


