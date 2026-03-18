import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

const Wish = () => {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [image, setImage] = useState(null);
  const [copied, setCopied] = useState(false);

  const visibleCardRef = useRef(null);
  const downloadCardRef = useRef(null);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const wishes = [
    "May Allah bless you with happiness and prosperity.",
    "Wishing you peace, joy, and endless blessings.",
    "May this Eid bring your family together with love and laughter.",
    "Sending you heartfelt wishes for a joyous Eid.",
    "Eid Mubarak! May your prayers be accepted.",
    "May your Eid be filled with love, light, and blessings.",
  ];
// comment
  const generateWish = () => {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setWish(`🌙 Eid Mubarak ${name ? name : ""}! ${randomWish}`);
  };

  const copyWish = () => {
    navigator.clipboard.writeText(wish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  // ✅ Download full card (image + text)
  const downloadCard = async () => {
    if (!downloadCardRef.current) return;

    const canvas = await html2canvas(downloadCardRef.current, {
      scale: 2,
      useCORS: true,
    });

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);

      if (isMobile) {
        window.open(url, "_blank"); // mobile save
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = "eid-card.png";
        link.click();
      }

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-4 py-16">

      <h2 className="text-4xl font-bold text-green-400 mb-10 text-center">
        Generate Your Eid Wish 🎁
      </h2>

      {/* Input */}
      <div className="flex gap-4 mb-6 w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-6 py-3 rounded-full text-black"
        />
        <button onClick={generateWish} className="bg-green-500 px-6 py-3 rounded-full">
          Generate
        </button>
      </div>

      {/* Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-8" />

      {/* ✅ Visible Card (User sees this) */}
      {wish && (
        <div
          ref={visibleCardRef}
          className="bg-white text-black rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
        >
          {image && (
            <img src={image} alt="" className="w-full h-auto object-cover" />
          )}

          <div className="p-4">
            <p className="text-center text-lg font-semibold">{wish}</p>
          </div>
        </div>
      )}

      {/* Buttons */}
      {wish && (
        <div className="flex gap-3 mt-5">
          <button onClick={copyWish} className="bg-blue-500 px-4 py-2 rounded">
            {copied ? "Copied!" : "Copy"}
          </button>

          <button onClick={downloadCard} className="bg-green-500 px-4 py-2 rounded">
            Download
          </button>
        </div>
      )}

      {/* ⚠️ Hidden Download Card (Important) */}
      <div className="fixed -top-[9999px] left-0">
        <div
          ref={downloadCardRef}
          className="w-[600px] bg-white text-black rounded-xl overflow-hidden"
        >
          {image && (
            <img src={image} alt="" className="w-full h-auto object-cover" />
          )}

          <div className="p-6">
            <p className="text-center text-xl font-semibold">{wish}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Wish;