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
  const [image, setImage] = useState(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // DOWNLOAD FUNCTION
  const downloadCard = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 4,
      useCORS: true,
      backgroundColor: "#0f172a",
    });

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    // 📱 Mobile share
    if (navigator.share) {
      try {
        const file = new File([blob], `EidWish_${userName || "Card"}.png`, {
          type: "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Eid Wish Card",
          });

          return;
        }
      } catch (err) {}
    }

    // 💻 Desktop download
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `EidWish_${userName || "Card"}.png`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="wish"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-[#0f172a] to-[#1e293b] overflow-hidden"
    >
      {/* Moon */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: [0, 1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-10 w-36 h-36 bg-yellow-200 rounded-full shadow-[0_0_60px_rgba(255,255,200,0.4)]"
      />

      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: "0 0 4px white",
          }}
        />
      ))}

      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-green-400 text-center">
        Generate Your Eid Wish 🎁
      </h2>

      {/* Input + Button */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Enter your name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full md:flex-1 px-6 py-3 rounded-full text-black font-medium text-base md:text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90"
        />

        <button
          onClick={generateWish}
          className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 font-semibold shadow-lg"
        >
          Generate
        </button>
      </div>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-10 text-white"
      />

      {/* Wish Card */}
      {generatedWish && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] p-8 rounded-3xl shadow-2xl border-2 border-yellow-400"
        >
          {image && (
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
              <img
                src={image}
                alt="User Upload"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <p className="text-white text-lg md:text-xl font-medium mb-6 text-center">
            {generatedWish}
          </p>

          <div className="flex justify-center md:justify-end items-center gap-4">
            <button
              onClick={copyWish}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-semibold text-sm"
            >
              Copy
            </button>

            <button
              onClick={downloadCard}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full font-semibold text-sm"
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