import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCTA() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#317F21] py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-white text-3xl md:text-5xl font-semibold mb-6">
          Not finding what you're looking for?
        </h2>

        <p className="text-white/80 text-base md:text-lg mb-10">
          Our team is happy to help you find the perfect solution.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/contact")}
            className="
              bg-[#3ad81a] text-white
              hover:bg-[#2fc914]
              transition-all duration-300
              rounded-full flex items-center gap-2
              px-8 md:px-12 py-4
              font-medium shadow-lg
            "
          >
            Contact Us
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
