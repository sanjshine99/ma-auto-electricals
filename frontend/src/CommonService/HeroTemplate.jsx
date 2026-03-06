import React from "react";

export default function MotHeroTemplate({ data }) {
  // Extract Icon from data
  const Icon = data.buttons.primary.icon;

  return (
    <section
      className="py-16 transition-colors duration-300 bg-gradient-to-b from-[#C6F0C2] to-[#FFFFFF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-black mb-6 mt-15 text-[#111827]">
            {data.title.before}{" "}
            <span style={{ color: "#317F21" }}>
              {data.title.highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-[#4B5563]">
            {data.description.beforeBold}
            <strong>{data.description.bold}</strong>
            {data.description.afterBold}
          </p>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

            {/* Primary Button - Simplified to <a> for identical sizing */}
            <a 
              href={data.buttons.primary.href}
              className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md font-semibold transition-transform hover:scale-105 shadow-sm"
              style={{
                backgroundColor: data.buttons.primary.bg,
                color: data.buttons.primary.color,
              }}
            >
              <Icon className="h-5 w-5" />
              <span>{data.buttons.primary.text}</span>
            </a>

            {/* Secondary Button - Matching structure exactly */}
            <a
              href={data.buttons.secondary.href}
              className="inline-flex items-center justify-center h-10 px-6 rounded-md font-semibold border transition-all duration-300"
              style={{
                backgroundColor: "#FFFFFF",
                color: data.buttons.secondary.color,
                border: `1px solid ${data.buttons.secondary.border}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = data.buttons.secondary.hoverBg;
                e.currentTarget.style.color = data.buttons.secondary.hoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.color = data.buttons.secondary.color;
              }}
            >
              {data.buttons.secondary.text}
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}