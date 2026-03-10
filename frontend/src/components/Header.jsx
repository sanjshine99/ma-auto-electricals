import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const waNumber = "447889133123";
  const waHref = `https://wa.me/${waNumber}`;

  // Update cart badge count from localStorage
  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    // Load count on page mount
    updateCount();

    // Listen for cart changes dispatched within the same tab
    window.addEventListener("cartUpdated", updateCount);

    // Listen for cart changes in other tabs via storage event
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const scrollWithOffset = (el) => {
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const serviceCategories = [
    {
      category: "Mechanical & Servicing",
      items: [
        { title: "Mechanical Repairs (All)", link: "/mechanical" },
        { title: "Car Repairs & Servicing", link: "/car-repair" },
        { title: "Brake Pads", link: "/brake-pads" },
        { title: "MOT", link: "/mot" },
      ],
    },
    {
      category: "Diagnostics & Electrical",
      items: [
        { title: "Vehicle Diagnostics", link: "/diagnostics" },
        { title: "All Car Electrics", link: "/car-electrics" },
        { title: "ECU Repairs & Services", link: "/ecu-repair-services" },
        { title: "Window Regulators", link: "/window-regulators" },
        { title: "Wiper Motors", link: "/wiper-motors" },
        { title: "Central Door Motors", link: "/central-door-motors" },
      ],
    },
    {
      category: "Emissions & Engine Systems",
      items: [
        { title: "EGR Services", link: "/egr" },
        { title: "AdBlue Services", link: "/adblue" },
      ],
    },
    {
      category: "Safety, Security & Tracking",
      items: [
        { title: "Car Security", link: "/car-security" },
        { title: "Vehicle Tracking Systems", link: "/vehicle-tracking" },
      ],
    },
    {
      category: "Accessories & Installations",
      items: [
        { title: "Car Stereos", link: "/car-stereos" },
        { title: "Handsfree Car Kits", link: "/handsfree" },
        { title: "Parking Sensors / Cameras", link: "/parking" },
        { title: "Installations & Fitting", link: "/installation" },
      ],
    },
  ];

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsServiceOpen(false);
    setOpenSubMenu(null);
  };

  return (
    <header className="fixed top-0 z-999 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img src="/logo.png" alt="MA Auto Electricals Logo" className="h-12" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <HashLink smooth to="/#" scroll={scrollWithOffset} className="text-gray-300 hover:text-white">
              Home
            </HashLink>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServiceOpen((v) => !v)}
                className="flex items-center gap-1 text-gray-300 hover:text-white"
                aria-expanded={isServiceOpen}
                aria-haspopup="true"
              >
                Services
                {isServiceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isServiceOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-black border border-gray-800 rounded-md shadow-xl">
                  {serviceCategories.map((cat, i) => (
                    <div key={i} className="border-b border-gray-800">
                      <button
                        onClick={() => setOpenSubMenu(openSubMenu === i ? null : i)}
                        className="w-full px-4 py-3 flex justify-between items-center text-white font-semibold hover:bg-gray-800"
                      >
                        {cat.category}
                        {openSubMenu === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {openSubMenu === i && (
                        <div className="bg-gray-900">
                          {cat.items.map((item, j) => (
                            <HashLink
                              key={j}
                              to={item.link}
                              onClick={closeAll}
                              className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-800 text-sm"
                            >
                              {item.title}
                            </HashLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <HashLink to="/car" className="text-gray-300 hover:text-white">Cars</HashLink>
            <HashLink to="/product" className="text-gray-300 hover:text-white">Products</HashLink>
            <HashLink to="/#testimonial" scroll={scrollWithOffset} className="text-gray-300 hover:text-white">Testimonials</HashLink>
            <HashLink to="/contact" className="text-gray-300 hover:text-white">Contact</HashLink>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer"
              aria-label="View cart"
            >
              <ShoppingCart size={26} className="text-green-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] text-white h-5 w-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-white"
              onClick={() => {
                setIsMenuOpen((v) => !v);
                setIsServiceOpen(false);
                setOpenSubMenu(null);
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 space-y-4">
            <HashLink to="/#" onClick={closeAll} className="block text-gray-300">Home</HashLink>

            {/* Services Mobile */}
            <div>
              <button
                onClick={() => setIsServiceOpen((v) => !v)}
                className="w-full flex justify-between items-center text-gray-300"
              >
                Services
                {isServiceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isServiceOpen && (
                <div className="mt-3 border-l border-gray-700 pl-3">
                  {serviceCategories.map((cat, i) => (
                    <div key={i} className="mb-3">
                      <button
                        onClick={() => setOpenSubMenu(openSubMenu === i ? null : i)}
                        className="w-full flex justify-between items-center text-white font-semibold"
                      >
                        {cat.category}
                        {openSubMenu === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      {openSubMenu === i && (
                        <div className="ml-3 mt-2 space-y-1">
                          {cat.items.map((item, j) => (
                            <HashLink
                              key={j}
                              to={item.link}
                              onClick={closeAll}
                              className="block text-gray-400 hover:text-white text-sm"
                            >
                              {item.title}
                            </HashLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <HashLink to="/car" onClick={closeAll} className="block text-gray-300">Cars</HashLink>
            <HashLink to="/product" onClick={closeAll} className="block text-gray-300">Products</HashLink>
            <HashLink to="/#testimonial" onClick={closeAll} className="block text-gray-300">Testimonials</HashLink>
            <HashLink to="/contact" onClick={closeAll} className="block text-gray-300">Contact</HashLink>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-emerald-500/10 text-emerald-400 py-3 rounded-lg"
            >
              WhatsApp Us
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
