import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EidCountDown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetDate = new Date("2026-03-21T00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const numberVariant = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <div className="text-center py-12 bg-gradient-to-r from-[#0f172a] to-[#020617] text-white rounded-xl max-w-3xl mx-auto shadow-2xl mt-16 mb-16 ">
      <h2 className="text-5xl font-bold mb-8 text-green-400">Eid Countdown 🌙</h2>

      <div className="flex justify-center gap-12 text-3xl md:text-5xl font-bold">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div key={unit} className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={timeLeft[unit]}
                variants={numberVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-green-400"
              >
                {timeLeft[unit]}
              </motion.p>
            </AnimatePresence>
            <span className="text-white text-sm md:text-lg">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EidCountDown;