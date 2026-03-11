import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

const greetingCards = [
  {
    id: 1,
    title: "Eid Mubarak 🌙",
    message: "Wishing you happiness and blessings on this Eid.",
    color: "from-yellow-200 via-yellow-300 to-yellow-400",
  },
  {
    id: 2,
    title: "Joyful Eid 🌙",
    message: "May your Eid be full of love and laughter.",
    color: "from-pink-200 via-pink-300 to-pink-400",
  },
  {
    id: 3,
    title: "Blessed Eid 🌙",
    message: "Peace, prosperity, and endless joy to you.",
    color: "from-green-200 via-green-300 to-green-400",
  },
];

const GreetingCard = () => {
  const [userName, setUserName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const cardRef = useRef(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = `EidCard_${userName || "Guest"}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section className="py-16  bg-[#0f172a] text-white text-center overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-green-400">
        Interactive Eid Greeting Cards 🎁
      </h2>

      {/* User Name Input */}
      <div className="mb-12 flex justify-center gap-4 flex-col md:flex-row items-center">
        <input
  type="text"
  placeholder="Enter your name..."
  value={userName}
  onChange={(e) => setUserName(e.target.value)}
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
      </div>

      {/* Card Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {greetingCards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative bg-gradient-to-br ${card.color} p-8 rounded-3xl shadow-2xl cursor-pointer overflow-hidden`}
            onClick={() => setSelectedCard(card)}
          >
            {/* <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-300 rounded-full shadow-[0_0_30px_15px_rgba(255,255,200,0.3)]" /> */}
            <h3 className="text-2xl font-bold mb-4 text-white">{card.title}</h3>
            <p className="text-white/90">
              {card.message} {userName && `Happy Eid, ${userName}!`}
            </p>
            {/* <div className="absolute -bottom-4 left-4 w-10 h-20 bg-orange-400 rounded-lg shadow-lg animate-bounce" /> */}
          </motion.div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <motion.div
            ref={cardRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`relative bg-gradient-to-br ${selectedCard.color} p-12 rounded-3xl shadow-2xl text-white max-w-xl w-full`}
          >
            <h3 className="text-3xl font-bold mb-6">{selectedCard.title}</h3>
            <p className="text-lg mb-6">
              {selectedCard.message} {userName && `Happy Eid, ${userName}!`}
            </p>

            <button
              onClick={downloadCard}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-2xl mr-4"
            >
              Download Card
            </button>

            <button
              onClick={() => setSelectedCard(null)}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-2xl"
            >
              Close
            </button>

            {/* Floating Moon */}
            {/* <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-300 rounded-full shadow-[0_0_50px_20px_rgba(255,255,200,0.3)]" /> */}
            {/* Lantern */}
            {/* <div className="absolute -bottom-6 left-4 w-12 h-24 bg-orange-400 rounded-lg shadow-lg animate-bounce" /> */}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default GreetingCard;