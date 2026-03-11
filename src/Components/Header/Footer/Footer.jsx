import React from "react";
import { FaMoon, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-white mt-20 border-t border-gray-700">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-green-400 mb-4">
            <FaMoon />
            EidVerse
          </div>

          <p className="text-gray-400 leading-relaxed">
            Celebrate Eid with joy and blessings. Generate beautiful Eid wishes,
            explore greeting cards, and enjoy the countdown to the blessed day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li>
              <NavLink to="/" className="hover:text-green-400 transition">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/countdown" className="hover:text-green-400 transition">
                Countdown
              </NavLink>
            </li>

            <li>
              <NavLink to="/wish" className="hover:text-green-400 transition">
                Wish Generator
              </NavLink>
            </li>

            <li>
              <NavLink to="/card" className="hover:text-green-400 transition">
                Greeting Card
              </NavLink>
            </li>

          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            Follow Me
          </h2>

          <div className="flex gap-4 text-2xl">

            <a
              href="#"
              className="hover:text-green-400 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="hover:text-green-400 transition"
            >
              <FaGithub />
            </a>

            <a
              href="#"
              className="hover:text-green-400 transition"
            >
              <FaLinkedin />
            </a>

          </div>

          <p className="text-gray-400 mt-4">
            Connect with me for more creative projects.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400">

        © {new Date().getFullYear()} EidVerse. All rights reserved.

      </div>

    </footer>
  );
};

export default Footer;