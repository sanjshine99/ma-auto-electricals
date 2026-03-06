import React from "react";

const palette = {
  primary: "#317F21",     // green accent
  heading: "#111827",     // dark heading
  muted: "#4B5563",       // muted body text
  badgeBg: "#A4BE6A",
  badgeText: "#1F2A10",
};

export default function ContactHero() {

  return (
    <section
      className="py-16 transition-colors duration-300 bg-linear-to-b 
                 from-[var(--contact-grad-top)] to-[var(--contact-grad-bottom)] 
                  "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            data-aos="fade-down"
            className="inline-flex mt-10 items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium mb-4"
            style={{ backgroundColor: palette.badgeBg, color: palette.badgeText }}
          >
            Get In Touch
          </span>

          <h1
            data-aos="fade-up"
            className="text-4xl lg:text-5xl font-black mb-6 text-[var(--contact-heading)]"
          >
            Contact{" "}
            <span style={{ color: palette.primary }}>
              MA Auto Electrics
            </span>
          </h1>

          <p
            data-aos="zoom-in"
            className="text-xl max-w-3xl mx-auto leading-relaxed text-[var(--contact-muted)]"
          >
            MA Auto Electrics specialise in supplying and fitting of in car audio & car DVD / navigation solutions, vehicle security, diagnostics and dashcams. Get in touch for further details
          </p>
        </div>
      </div>
    </section>
  );
}
