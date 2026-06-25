import { useEffect, useState } from "react";
import logoDark from "../assets/images/logo.png";
import logoWhite from "../assets/images/logo-white.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide when scrolling down
        setShowNavbar(false);
      } else {
        // Show when scrolling up
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full left-0 z-50 transition-all duration-500 ${
        showNavbar ? "top-0" : "-top-40"
      } ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-0 flex justify-between items-center">

        {/* Dynamic Logo */}
        <img
          src={scrolled ? logoDark : logoWhite}
          alt="Kryson Logo"
          className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain transition-all duration-500 scale-110"
        />

        {/* Desktop Menu */}
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

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden text-3xl transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full px-4 pt-3">
          <div className="rounded-3xl backdrop-blur-2xl bg-black/60 border border-white/10 shadow-2xl overflow-hidden">

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