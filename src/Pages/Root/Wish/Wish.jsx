import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

const wishes = [
  "🌙 Eid Mubarak! May your day be filled with joy and blessings.",
  "🏮 Wishing you peace, love, and laughter this Eid.",
  "✨ May Allah shower endless happiness on you this Eid.",
  "🌙 Celebrate Eid with a heart full of gratitude and love.",
  "🏮 Joy, prosperity, and happiness to you and your family.",
  "✨ May your Eid be as bright as the moon and stars tonight.",
];

const Wish = () => {
  const [userName, setUserName] = useState("");
  const [generatedWish, setGeneratedWish] = useState("");
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  const generateWish = () => {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setGeneratedWish(
      userName ? randomWish.replace("Eid", `Eid, ${userName}`) : randomWish
    );
    setCopied(false);
  };

  const copyWish = () => {
    if (generatedWish) {
      navigator.clipboard.writeText(generatedWish);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `EidWish_${userName || "Card"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <section
      id="wish"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-[#0f172a] to-[#1e293b] overflow-hidden"
    >
      {/* Festive Floating Moon */}
      <motion.div
                     initial={{ y: -50, opacity: 0 }}
                     animate={{ y: [0, -20, 0], opacity: [0, 1, 1] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-20 right-10 w-36 h-36 bg-yellow-200 rounded-full shadow-[0_0_50px_20px_rgba(255,255,200,0.3)]"
                 />
     

      

      {/* Floating Stars */}
       {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5 }}
                          className={`absolute w-1 h-1 bg-white rounded-full`}
                          style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              boxShadow: "0 0 4px white",
                          }}
                      />
                  ))}
      

      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-green-400 text-center">
        Generate Your Eid Wish 🎁
      </h2>

      {/* Input & Button */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Enter your name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full md:flex-1 px-6 py-3 rounded-full text-black font-medium text-base md:text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90 dark:bg-black/80"
        />
        <button
          onClick={generateWish}
          className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 font-semibold transition shadow-lg hover:shadow-2xl"
        >
          Generate
        </button>
      </div>

      {/* Generated Wish Card */}
      {generatedWish && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] p-8 rounded-3xl shadow-2xl border-2 border-green-500"
        >
          {/* Decorative Stars on Card */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-pink-400 rounded-full animate-pulse" />

          <p className="text-white text-lg md:text-xl font-medium mb-6 text-center">
            {generatedWish}
          </p>

          {/* Copy & Download Buttons */}
          <div className="flex justify-center md:justify-end items-center gap-4">
            <button
              onClick={copyWish}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-semibold text-sm transition shadow-lg hover:shadow-2xl"
            >
              Copy
            </button>
            <button
              onClick={downloadCard}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full font-semibold text-sm transition shadow-lg hover:shadow-2xl"
            >
              Download Card
            </button>
            {copied && (
              <span className="text-green-400 font-medium text-sm animate-pulse">
                Copied!
              </span>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Wish;