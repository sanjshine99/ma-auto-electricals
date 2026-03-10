import React from "react";
import { Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Footer() {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=13+laburnum+drive+oswaldtwistle+accrington+bb5+3aw";

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="MA Auto Electrics"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-gray-400 mb-4 mt-2">
              Expert Auto Electrical Repairs & Advanced Diagnostics.
              Balanced, professional, and fits your full service range.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/maautoelectrics/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook
                  className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors"
                  size={20}
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-[#317F21]">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <HashLink smooth to="/#" className="hover:text-white transition-colors">
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#services" className="hover:text-white transition-colors">
                  Services
                </HashLink>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-white transition-colors">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/car" className="hover:text-white transition-colors">
                  Car
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-[#317F21]">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>MA Auto Electrics</li>
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  13 Laburnum Drive, Oswaldtwistle
                  <br />
                  Accrington, BB5 3AW
                  <br />
                  United Kingdom
                </a>
              </li>
              <li>
                <a href="tel:+447889133123" className="hover:text-white transition-colors">
                  +44 7889 133123
                </a>
              </li>
              <li>
                <a
                  href="mailto:maautoelectrics@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  maautoelectrics@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MA Auto Electrics. All rights reserved.</p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3 text-center font-semibold text-gray-400">
          <div className="flex gap-4 text-sm">
            <Link to="/terms" className="hover:text-[#317F21] transition">
              Terms & Conditions
            </Link>
            <span className="text-gray-500">|</span>
            <Link to="/privacy" className="hover:text-[#317F21] transition">
              Privacy Policy
            </Link>
          </div>

          <p className="text-sm">
            Powered by{" "}
            <a
              href="https://www.ansely.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#317F21] hover:underline"
            >
              Ansely
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}