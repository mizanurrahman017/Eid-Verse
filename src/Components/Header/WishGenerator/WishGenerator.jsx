import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

const Wish = () => {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [image, setImage] = useState(null);
  const [copied, setCopied] = useState(false);

  const cardRef = useRef(null);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const wishes = [
    "May Allah bless you with happiness and prosperity.",
    "Wishing you peace, joy, and endless blessings.",
    "May this Eid bring your family together with love and laughter.",
    "Sending you heartfelt wishes for a joyous Eid.",
    "Eid Mubarak! May your prayers be accepted.",
    "May your Eid be filled with love, light, and blessings.",
  ];

  // Generate wish
  const generateWish = () => {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setWish(`🌙 Eid Mubarak ${name ? name : ""}! ${randomWish}`);
  };

  // Copy wish
  const copyWish = () => {
    navigator.clipboard.writeText(wish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  // ✅ Download Card (Image + Text)
  const downloadCard = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });

    const fileName = `EidWish_${name || "Guest"}.png`;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);

      if (isMobile) {
        // Mobile → open image
        const newTab = window.open(url, "_blank");
        if (!newTab) {
          alert("Please allow popups to save image.");
        }
      } else {
        // Desktop → download
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  // WhatsApp share
  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(wish)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-4 py-16">

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-10 text-center">
        Generate Your Eid Wish 🎁
      </h2>

      {/* Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:flex-1 px-6 py-3 rounded-full text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={generateWish}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold"
        >
          Generate
        </button>
      </div>

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-8"
      />

      {/* Card */}
      {wish && (
        <motion.div
          ref={cardRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] p-6 rounded-3xl shadow-2xl max-w-xl text-center"
        >

          {/* Image + Overlay Text */}
          <div className="relative w-full max-h-[500px] rounded-2xl overflow-hidden shadow-xl mb-4">

            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-auto object-contain"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
              <p className="text-white text-lg md:text-2xl font-bold text-center leading-relaxed drop-shadow-lg">
                {wish}
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={copyWish}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-full font-semibold"
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={downloadCard}
              className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full font-semibold"
            >
              {isMobile ? "Open & Save" : "Download Card"}
            </button>

            <button
              onClick={shareWhatsApp}
              className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-full font-semibold"
            >
              WhatsApp Share
            </button>
          </div>

          {/* Mobile Hint */}
          {isMobile && (
            <p className="text-sm text-gray-400 mt-3">
              👉 Open image → Tap & hold to save
            </p>
          )}

        </motion.div>
      )}

    </div>
  );
};

export default Wish;