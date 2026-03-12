import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] flex flex-col justify-center items-center text-center overflow-hidden">

            {/* Floating Moon */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: [0, -20, 0], opacity: [0, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 w-36 h-36 bg-yellow-200 rounded-full shadow-[0_0_50px_20px_rgba(255,255,200,0.3)]"
            />

            {/* Twinkling Stars */}
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

            {/* Optional Small Shooting Star */}
            <motion.div
                initial={{ x: -100, y: 50, opacity: 0 }}
                animate={{ x: 1200, y: 300, opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 6, delay: 2 }}
                className="absolute w-2 h-1 bg-white rounded-full shadow-lg"
            />

            {/* Hero Content */}
            <div className="relative z-10 max-w-3xl px-6">
                <h1 className="text-5xl md:text-7xl font-bold text-green-400 mb-6 animate-fadeIn">
                    🌙 Eid Mubarak
                </h1>
                <p className="text-gray-300 text-lg md:text-2xl mb-8 animate-fadeIn">
                    Celebrate Eid with Wishes, Countdown & Joy
                </p>
                <NavLink
                    to="/wish" // Single-page scroll এর জন্য id
                    onClick={(e) => {
                        e.preventDefault(); // Prevent default link jump
                        const section = document.getElementById("wish");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full font-semibold text-lg transition"
                >
                    Generate Your Wish
                </NavLink>
            </div>

        </section>
    );
};

export default HeroSection;