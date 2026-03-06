import React, { useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";

const palette = {
  primary: "#3F8D3A",          // green background
  fgOnPrimary: "#FFFFFF",      // white text on green
  secondaryBg: "#B9C26D",      // olive green for call button
  secondaryText: "#1F2A10",    // dark text on olive
  outline: "#FFFFFF",          // outline color
};

export default function EmergencyCTA() {

  return (
    <section
      className="py-16"
      style={{ backgroundColor: palette.primary, color: palette.fgOnPrimary }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          data-aos="fade-down"
          className="text-3xl lg:text-4xl font-bold mb-4"
        >
          Need Immediate Assistance?
        </h2>

        <p
          data-aos="fade-up"
          className="text-xl mb-8 opacity-90"
        >
          Call us directly for urgent repairs, breakdown assistance, or same-day appointments.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          data-aos="zoom-in"
        >
          {/* Call Now Button */}
          <a href="tel:+447889133123" className="inline-block">
            <button
              className="
                inline-flex items-center justify-center gap-2 h-10 rounded-md px-6 font-semibold shadow
                transition-transform hover:scale-105 active:scale-105 focus:scale-105
              "
              style={{
                backgroundColor: palette.secondaryBg,
                color: palette.secondaryText,
              }}
            >
              <FaPhoneAlt className="h-5 w-5" />
              Call +44 7889 133123
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
