import React from "react";

export default function EmergencyCtaTemplate({ data }) {
  const { palette, buttons } = data;
  const PhoneIcon = buttons.call.icon;

  return (
    <section
      className="py-16 transition-colors duration-300"
      style={{ backgroundColor: palette.primary, color: palette.fgOnPrimary }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
          {data.heading}
        </h2>

        {/* Subheading */}
        <p className="text-xl mb-8 opacity-90 text-white">
          {data.subheading}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          {/* Call Button - Now an <a> tag */}
          <a
            href={buttons.call.href}
            className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md font-semibold transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: palette.secondaryBg,
              color: palette.secondaryText,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.color = palette.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette.secondaryBg;
              e.currentTarget.style.color = palette.secondaryText;
            }}
          >
            <PhoneIcon className="h-5 w-5" />
            {buttons.call.text}
          </a>

          {/* Book Button - Now an <a> tag */}
          <a
            href={buttons.book.href}
            className="inline-flex items-center justify-center h-10 px-6 rounded-md font-semibold border transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "transparent",
              color: palette.fgOnPrimary,
              border: `1px solid ${palette.outline}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.color = palette.primary;
              e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = palette.fgOnPrimary;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {buttons.book.text}
          </a>
        </div>
      </div>
    </section>
  );
}