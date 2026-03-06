import React from "react";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

function InfoCard({ icon, title, subtitle, body, cta, delay }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      tabIndex={0}
      className="
        flex flex-col gap-4 md:gap-5 rounded-xl border py-6 md:py-5 text-center cursor-pointer
        transition-all duration-300 
        bg-[#F7F7F7] 
        border-[#E6EAE7] 
        hover:shadow-[0_8px_24px_rgba(47,125,51,0.35)] 
        hover:ring-2 hover:ring-[#317F21] hover:ring-offset-2
        focus:ring-2 focus:ring-[#317F21] focus:ring-offset-2
      "
    >
      <div className="px-4 md:px-5">
        {/* ICON */}
        <div
          className="mx-auto mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg 
                     bg-[#E7F3E9]  
                     text-[#317F21] "
        >
          {icon}
        </div>

        {/* TITLE */}
        <div className="text-lg md:text-xl font-bold text-[#111827] ">
          {title}
        </div>

        {/* SUBTITLE */}
        {subtitle && (
          <div className="text-xs md:text-sm text-[#4B5563] ">
            {subtitle}
          </div>
        )}
      </div>

      {/* BODY + CTA */}
      <div className="px-4 md:px-5 space-y-3">
        {body && (
          <p className="text-xs md:text-sm whitespace-pre-line text-[#111827] ">
            {body}
          </p>
        )}
        {cta}
      </div>
    </div>
  );
}

export default function ContactCards() {

  return (
    <section className="py-12 md:py-14 lg:py-16 bg-white ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* Call Us */}
          <InfoCard
            delay="0"
            icon={<FiPhone className="h-5 w-5 md:h-6 md:w-6" />}
            title="Call Us"
            subtitle="Speak directly with our team"
            body="+44 7889 133123"
            cta={
              <a href="tel:+44 7889 133123">
                <button
                  className="h-9 rounded-md border px-3 text-xs md:text-sm font-medium 
                             transition-all duration-300 
                             border-[#E6EAE7] 
                             text-[#111827] 
                             bg-transparent 
                             hover:border-[#317F21] hover:text-green-700 
                             hover:shadow-[0_6px_18px_rgba(47,125,51,0.35)]
                             focus:border-[#317F21] focus:text-green-700 focus:shadow-[0_6px_18px_rgba(47,125,51,0.35)]
                "
                >
                  Call Now
                </button>
              </a>
            }
          />

          {/* Visit Us */}
          <InfoCard
            delay="150"
            icon={<FaMapMarkerAlt className="h-5 w-5 md:h-6 md:w-6" />}
            title="Visit Us"
            subtitle="Find us in Mansfield"
            body={`13 laburnum drive oswaldtwistele 
accrington bb5 3aw,
United Kingdom`}
            cta={
              <a
                href="https://maps.app.goo.gl/EPnqrDkCRBvqW38z8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="h-9 rounded-md border px-3 text-xs md:text-sm font-medium 
                             transition-all duration-300 
                             border-[#E6EAE7] 
                             text-[#111827] 
                             bg-transparent 
                             hover:border-[#317F21] hover:text-green-700 
                             hover:shadow-[0_6px_18px_rgba(47,125,51,0.35)]
                             focus:border-[#317F21] focus:text-green-700 focus:shadow-[0_6px_18px_rgba(47,125,51,0.35)]
                "
                >
                  Get Directions
                </button>
              </a>
            }
          />

          {/* Opening Hours */}
          <InfoCard
            delay="300"
            icon={<FaClock className="h-5 w-5 md:h-6 md:w-6" />}
            title="Opening Hours"
            subtitle="We're here when you need us"
            body={`Mon–Sun: 9:00 AM – 6:00 PM`}
            cta={
              <span className="text-xs md:text-sm text-[#4B5563] ">
                No appointment needed
              </span>
            }
          />
        </div>
      </div>
    </section>
  );
}
