import React from "react";

export default function UnderTheBonnet({ items }) {
 

  return (
    <section className="w-full px-4 py-12 bg-white text-black">
      {/* Heading */}
      <h2
        data-aos="fade-up"
        className="text-center text-3xl md:text-4xl font-bold mb-10 text-[#317F21]"
      >
        Under the Bonnet
      </h2>

      {/* Items Grid */}
      <div
        data-aos="fade-up"
        className="bg-[#F0F5F0] rounded-2xl py-10 px-4 shadow-md border border-[#317F21]/20"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items?.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 80}
              className="bg-white rounded-xl p-5 text-center flex flex-col items-center justify-center shadow hover:shadow-lg border border-[#317F21]/20 transition"
            >
              {/* Icon with green circle */}
              {item.icon && (
                <div className="w-14 h-14 mb-3 flex items-center justify-center rounded-full bg-[#317F21]">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-8 h-8"
                  />
                </div>
              )}

              {/* Title and Value */}
              <span className="text-gray-800 text-sm">{item.title}</span>
              <strong className="text-[#317F21] text-xl font-bold mt-1">
                {item.value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
