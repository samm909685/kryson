import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <img
          src={logo}
          alt="Kryson Logo"
          className="h-12 sm:h-14 md:h-16 lg:h-20 object-contain"
        />

        {/* Desktop Menu (UNCHANGED) */}
        <ul
          className={`hidden md:flex gap-6 lg:gap-10 font-semibold transition-colors duration-500 ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          <li><a href="#home" className="hover:text-blue-600">Home</a></li>
          <li><a href="#about" className="hover:text-blue-600">About</a></li>
          <li><a href="#products" className="hover:text-blue-600">Products</a></li>
          <li><a href="#quality" className="hover:text-blue-600">Quality</a></li>
          <li><a href="#vision" className="hover:text-blue-600">Vision</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden text-3xl transition-colors ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
{menuOpen && (
  <div className="md:hidden absolute top-full left-0 w-full px-4 pt-3">
    <div className="rounded-3xl backdrop-blur-2xl bg-black/55 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden">
      
      <ul className="flex flex-col p-4 space-y-2">

        {[
          { name: "Home", link: "#home" },
          { name: "About", link: "#about" },
          { name: "Products", link: "#products" },
          { name: "Quality", link: "#quality" },
          { name: "Vision", link: "#vision" },
          { name: "Contact", link: "#contact" },
        ].map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 rounded-2xl text-white text-base font-medium hover:bg-blue-600/30 hover:pl-7 transition-all duration-300"
            >
              {item.name}
            </a>
          </li>
        ))}

      </ul>
    </div>
  </div>
)}
    </nav>
  );
}

export default Navbar;