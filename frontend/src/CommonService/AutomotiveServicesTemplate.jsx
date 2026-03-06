import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function AutomotiveServicesTemplate({ data }) {
  // Logic to check item count
  const serviceCount = data.services.length;

  return (
    <section className="py-16 bg-[#F9F9F9] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#111827]">
            {data.heading.title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-[#4B5563]">
            {data.heading.subtitle}
          </p>
        </div>

        {/* Grid Container */}
        <div 
          className={`grid gap-8 ${
            serviceCount === 1 
            ? "flex justify-center" // Centers the single box horizontally
            : "md:grid-cols-2"      // Standard 2-column layout for multiple services
          }`}
        >
          {data.services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                className={`flex flex-col gap-6 rounded-xl py-8 px-8 shadow-sm border transition-all duration-300 
                bg-white border-[#E6EAE7] 
                hover:shadow-[0_8px_24px_rgba(200,16,46,0.25)] 
                hover:ring-2 hover:ring-[#317F21] hover:ring-offset-2 hover:ring-offset-white 
                ${serviceCount === 1 ? "max-w-3xl w-full" : "w-full"}`} 
              >
                {/* Header */}
                <div className="grid auto-rows-min items-start gap-1.5">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#C6F0C2]">
                      <Icon className="h-6 w-6 text-[#317F21]" />
                    </div>
                    <div className="text-2xl font-bold text-[#111827]">
                      {service.title}
                    </div>
                  </div>

                  <div className="text-[#4B5563] text-lg leading-relaxed">
                    {service.desc}
                  </div>
                </div>

                {/* Points */}
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                  {service.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-center text-base text-[#4B5563]"
                    >
                      <FaCheckCircle className="h-4 w-4 mr-3 flex-shrink-0 text-[#317F21]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}