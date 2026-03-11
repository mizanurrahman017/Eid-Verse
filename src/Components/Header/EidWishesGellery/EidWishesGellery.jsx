import React, { useState } from "react";
import { motion } from "framer-motion";

const galleryImages = [
  { id: 1, src: "/eid 1.jpg", alt: "Family celebrating Eid with lanterns" },
  { id: 2, src: "/eid 2.jpg", alt: "Crescent moon and stars with festive lights" },
  { id: 3, src: "/eid 3.webp", alt: "Traditional Eid sweets on table" },
  { id: 4, src: "/eid 4.jpg", alt: "Children playing with colorful lanterns" },
  { id: 5, src: "/eid 5.avif", alt: "Mosque silhouette at sunset with decorations" },
  { id: 6, src: "/eid 6.png", alt: "Happy family exchanging gifts" },
];
const EidWishesGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-16 bg-[#0f172a] text-white text-center overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-green-400">
        Eid Wishes Gallery 🌙
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {galleryImages.map((img) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover rounded-2xl"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-3xl w-full"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full rounded-3xl shadow-2xl"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full font-semibold transition shadow-lg hover:shadow-2xl"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default EidWishesGallery;