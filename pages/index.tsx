// /pages/index.tsx
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ambientRef = useRef<HTMLDivElement | null>(null);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const colors = ['#ffffff', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#caffbf'];
    const maxDimension = Math.max(canvas.width, canvas.height);
    const stars = Array.from({ length: 500 }, () => ({
      x: (Math.random() - 0.5) * maxDimension * 6,
      y: (Math.random() - 0.5) * maxDimension * 6,
      z: Math.random() * maxDimension,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      vz: -1.5 + Math.random() * -0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      ctx.fillStyle = 'black';
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

    window.addEventListener('resize', resize);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
      <div
        ref={ambientRef}
        className="fixed inset-0 z-10 pointer-events-none animate-pulse"
        style={{
          background: `
            radial-gradient(circle at center, rgba(255,255,255,0.06), transparent 70%),
            radial-gradient(circle at 30% 40%, rgba(173,216,230,0.08), transparent 60%),
            radial-gradient(circle at 70% 60%, rgba(186,85,211,0.1), transparent 60%)
          `,
          filter: 'blur(80px) brightness(1.2)'
        }}
      />

      <div className="fixed inset-0 z-10 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />
      <div className="fixed inset-0 z-0 pointer-events-none animate-pulse" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.025), transparent 70%)' }} />

      <AnimatePresence>
        {!showMain && (
          <motion.div
            key="intro"
            className="relative z-20 flex flex-col items-center justify-center h-screen text-white text-center px-6 animate-fade-in"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-float"
            >
              We came to escape.
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5 }}
              className="text-xl md:text-2xl mb-8 drop-shadow-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-float"
            >
              We stayed because our stories got better than real life.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1.5 }}
            >
              <button
                onClick={() => setShowMain(true)}
                className="relative group px-10 py-4 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] before:absolute before:inset-0 before:bg-white/20 before:blur-xl before:opacity-0 group-hover:before:opacity-100"
              >
                <span className='relative z-10 font-semibold tracking-wide'>Enter Abyssal RP</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMain && (
          <motion.div
            key="main"
            className="relative z-20 flex flex-col items-center justify-center min-h-screen text-white text-center px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="max-w-3xl text-left text-white bg-black/40 border border-white/20 rounded-2xl p-8 mb-12 shadow-xl backdrop-blur-md"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to Abyssal RP
              </h2>
              <p className="leading-relaxed text-sm md:text-base whitespace-pre-line bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                If you're here, chances are you've walked the same path many of us have. You've spent hours, days, even months searching for a city that truly feels like home—a city free from admin abuse, metagaming, and toxicity. Like you, we've grown tired of servers dominated by repetitive cop-and-criminal scenarios, neglecting the vibrant experiences that civilians crave.

At Abyssal RP, we're building something different. We're not just another GTA RP server—we're a thriving community built by roleplayers, for roleplayers. Our vision is clear: to foster a balanced ecosystem where every character has a meaningful story to tell. Whether you're a seasoned criminal mastermind, an upstanding officer of the law, or a civilian running a business or simply exploring your creativity, your story matters here.

We passionately believe that great roleplay isn't defined by power or status, but by rich interactions, immersive experiences, and fair play. Our team is dedicated to transparency, impartial moderation, and genuine community engagement, ensuring Abyssal RP is your escape from the frustrations you've encountered elsewhere.

Join us and become part of a city that values your narrative, respects your journey, and encourages you to thrive. Abyssal RP—more than just a city; it's your new home.
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-float"
            >
              Welcome to the City
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="max-w-2xl text-lg opacity-80 mb-12 bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent"
            >
              This is where your journey begins. Explore the rules, meet the community, or head straight into the world of Abyssal RP.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {["Rules", "Join Our Discord", "World Preview"].map((title, i) => (
                <motion.div
                  key={title}
                  className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white backdrop-blur hover:bg-white/20 transition shadow-md hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                >
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                    {title}
                  </h3>
                  <p className="opacity-70 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {title === "Rules" && "Coming soon — our server rules and roleplay standards."}
                    {title === "Join Our Discord" && "Click here to join our growing RP community."}
                    {title === "World Preview" && "Coming soon — sneak peeks of our custom world and systems."}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
