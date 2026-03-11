import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

const ProfessionalWishGenerator = () => {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const cardRef = useRef(null);

  const wishes = [
    "May Allah bless you with happiness and prosperity.",
    "Wishing you peace, joy, and endless blessings.",
    "May this Eid bring your family together with love and laughter.",
    "Sending you heartfelt wishes for a joyous Eid.",
    "Eid Mubarak! May your prayers be accepted.",
  ];

  const generateWish = () => {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setWish(`🌙 Eid Mubarak ${name ? name : ""}! ${randomWish}`);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = `EidWish_${name || "Guest"}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="py-16 bg-[#0f172a] text-white text-center overflow-hidden relative">
      
      {/* Floating stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: Math.random() * 5 }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: "0 0 4px white",
          }}
        />
      ))}

      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-green-400">
        Generate Your Eid Wish 🎁
      </h2>

      {/* Input + Generate */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
       <input
  type="text"
  placeholder="Enter your name..."
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="
    w-full 
    max-w-md md:max-w-lg 
    px-6 py-3 
    rounded-full 
    text-black 
    font-medium 
    text-base md:text-lg 
    placeholder-gray-400 
    focus:outline-none 
    focus:ring-2 focus:ring-green-400 
    bg-white/90 dark:bg-black/80
  "
/>
        <button
          onClick={generateWish}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-2xl"
        >
          Generate
        </button>
      </div>

      {/* Wish Card */}
      {wish && (
        <motion.div
          ref={cardRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-xl bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] p-8 rounded-3xl shadow-2xl text-white text-lg font-medium"
        >
          {/* Floating moon */}
          {/* <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-300 rounded-full shadow-[0_0_50px_20px_rgba(255,255,200,0.3)]" /> */}
          
          {/* Lantern */}
          <div className="absolute -bottom-6 left-4 w-12 h-24 bg-orange-400 rounded-lg shadow-lg animate-bounce" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {wish}
          </motion.p>

          <button
            onClick={downloadCard}
            className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-semibold transition shadow-lg hover:shadow-2xl"
          >
            Download Card
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProfessionalWishGenerator;