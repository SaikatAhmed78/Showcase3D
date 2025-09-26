import { useState } from "react";
import { navLinks } from "../constants";

const NavItems = ({ onClick = () => {} }) => (
  <ul className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
    {navLinks.map((item) => (
      <li key={item.id} className="relative group">
        <a
          href={item.href}
          className="text-neutral-300 font-medium tracking-wide hover:text-white transition-colors"
          onClick={onClick}
        >
          {item.name}
        </a>
        {/*  hover effect */}
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1">
            <img src="/assets/parsonal-logo.png" alt="logo" className="w-10 h-10" />
            <span className="text-white font-bold text-xl tracking-wide">
              Ahmed
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex">
            <NavItems />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="text-neutral-300 hover:text-white sm:hidden flex"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt=""
            />
          </button>
        </div>
      </div>

      {/* Mobile  */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <span className="text-white font-bold text-xl">Ahmed</span>
          <button
            className="text-neutral-400 hover:text-white"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>
        <nav className="p-6">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
