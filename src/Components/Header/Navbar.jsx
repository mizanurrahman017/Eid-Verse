import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaMoon, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Countdown", path: "/countdown" },
    { name: "Wish Generator", path: "/wish" },
    { name: "Greeting Card", path: "/card" },
    { name: "Gallery", path: "/gallery" }
  ];

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#020617] shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-green-400"
        >
          <FaMoon className="text-3xl" />
          EidVerse
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative transition duration-300 
                ${isActive ? "text-green-400" : "text-white"} 
                hover:text-green-400`
              }
            >
              {item.name}

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all duration-300 hover:w-full"></span>
            </NavLink>
          ))}

        </ul>

        {/* Button */}
        <div className="hidden md:block">
          <NavLink
            to="/wish"
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-semibold transition"
          >
            Create Wish
          </NavLink>
        </div>

        {/* Mobile Icon */}
        <div
          className="md:hidden text-2xl text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#020617] text-center pb-6 border-t border-gray-700">

          <ul className="flex flex-col gap-6 text-lg font-medium pt-6">

            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? "text-green-400" : "text-white"} hover:text-green-400`
                }
              >
                {item.name}
              </NavLink>
            ))}

          </ul>

          <NavLink
            to="/wish"
            onClick={() => setMenuOpen(false)}
            className="inline-block mt-6 bg-green-500 px-6 py-2 rounded-full"
          >
            Create Wish
          </NavLink>

        </div>
      )}

    </nav>
  );
};

export default Navbar;