import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, HeartHandshake, Sparkles, Frown } from 'lucide-react';

const NO_PHRASES = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Please? 🥺",
  "Don't do this to me!",
  "What if I buy you food? 🍔",
  "I'll be your best friend forever! 👯‍♀️",
  "Have a heart!",
  "You're breaking my heart 💔",
  "I'm gonna cry... 😭",
  "Ok, I'm crying now.",
  "You leave me no choice...",
  "Look how big the Yes button is!",
  "Just click Yes!!!",
];

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [forgiven, setForgiven] = useState(false);

  const getNoButtonText = () => {
    return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setForgiven(true);
    // Throw confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const yesButtonSize = Math.min(100, 18 + noCount * 5);
  const yesPaddingY = Math.min(60, 12 + noCount * 4);
  const yesPaddingX = Math.min(100, 24 + noCount * 6);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 p-4 font-sans text-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!forgiven ? (
          <motion.div
            key="apology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center max-w-2xl w-full"
          >
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mb-8"
            >
              <img
                src="https://giphy.com/static/img/error_pages/crying-cowbow-emoji.gif"
                alt="Crying cowboy emoji"
                referrerPolicy="no-referrer"
                className="w-64 h-64 object-cover rounded-3xl shadow-xl border-4 border-white"
              />
            </motion.div>

            <h1 className="relative text-4xl md:text-5xl font-extrabold text-rose-900 mb-6 flex items-center justify-center gap-3 drop-shadow-sm">
              I'm so incredibly sorry! <Frown className="w-10 h-10 text-rose-700" />
              <span className="absolute -bottom-4 right-0 md:-right-8 text-xs font-normal text-rose-400/80 -rotate-[10deg] italic">
                (not my fault)
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-rose-700 mb-10 font-medium max-w-lg">
              I know you're mad at me, and I was wrong. Can you find it in your heart to forgive your favorite person? 🥺
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 w-full min-h-[120px]">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg transition-colors flex items-center justify-center"
                style={{
                  fontSize: yesButtonSize + 'px',
                  padding: `${yesPaddingY}px ${yesPaddingX}px`,
                }}
              >
                Yes! <Heart className="inline-block ml-2 w-auto h-auto drop-shadow-md" style={{ height: '1em', width: '1em' }}/>
              </motion.button>

              <motion.button
                onClick={handleNoClick}
                animate={{ 
                  scale: Math.max(0.1, 1 - noCount * 0.07),
                  x: noCount > 0 ? (Math.random() * 60 - 30) : 0,
                  y: noCount > 0 ? (Math.random() * 60 - 30) : 0,
                }}
                whileHover={{
                  scale: Math.max(0.1, 1 - noCount * 0.07) * 0.9,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-semibold py-3 px-6 rounded-full shadow transition-colors z-10 whitespace-nowrap"
              >
                {getNoButtonText()}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="flex flex-col items-center max-w-2xl w-full"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mb-8 relative"
            >
              <Sparkles className="absolute -top-6 -right-6 w-12 h-12 text-yellow-500 animate-pulse" />
              <Sparkles className="absolute -bottom-4 -left-8 w-10 h-10 text-yellow-400 animate-pulse delay-75" />
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3cxZDl4NDVwb3ByNzZ3YmNjZndtcGhpNXh0eDBxZHRndzUyYXdzaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vz58J8shFW6BvqnYTm/giphy.gif"
                alt="Cute happy hug"
                referrerPolicy="no-referrer"
                className="w-72 h-72 object-cover rounded-full shadow-2xl border-8 border-white"
              />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-rose-600 mb-4 tracking-tight">
              YAAAY! 🎉
            </h1>
            <p className="text-xl md:text-2xl text-rose-800 font-semibold mb-6">
              I knew you couldn't stay mad at me!
            </p>
            
            <div className="bg-white/60 p-6 rounded-3xl shadow-sm backdrop-blur-sm border border-rose-100 flex flex-col items-center justify-center gap-3">
              <HeartHandshake className="w-12 h-12 text-rose-500" />
              <p className="text-rose-900 font-medium text-lg">
                Best friends forever reinstated.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
