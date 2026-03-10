import React from "react";

export default function VehicleDetailsSection({ data }) {
  const { description, features } = data;

  return (
    <section className="bg-white text-black py-16 px-6 md:px-10 lg:px-0">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Heading */}
        <h2
          data-aos="fade-up"
          className="text-center text-3xl md:text-4xl font-bold text-[#317F21]"
        >
          More about this Vehicle
        </h2>

        {/* DESCRIPTION + FEATURES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT — FULL DESCRIPTION */}
          <div
            data-aos="fade-right"
            className="bg-[#F0F5F0] rounded-2xl border border-[#317F21]/20 p-6 md:p-8 shadow-md flex flex-col"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#317F21]">
              Full Description
            </h3>

            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed flex-1">
              {description}
            </p>

            
          </div>

          {/* RIGHT — HIGHLIGHT FEATURES */}
          <div data-aos="fade-left">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-2xl font-semibold text-[#317F21]">
                Highlight Features
              </h3>
             
            </div>

            <div className="bg-[#F0F5F0] rounded-2xl p-6 md:p-8 shadow-md relative">
              <div className="flex flex-col gap-4">
                {features?.map((item, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                    className="border-b border-[#317F21]/20 pb-3 flex items-start gap-3"
                  >
                    <span className="text-[#317F21] mt-1 text-xs">►</span>
                    <span className="text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="absolute text-6xl font-bold text-[#317F21]/10 right-4 bottom-4 pointer-events-none select-none">
                Features
              </div>
            </div>
          </div>
        </div>

        {/* DELIVERY QUOTE CARD */}
        {/* <div
          data-aos="fade-up"
          className="bg-[#317F21] rounded-2xl text-center py-10 px-6 shadow-md"
        >
          <h3 className="text-3xl font-semibold mb-6 text-white">
            Wish to get this delivered? Get a Quote!
          </h3>

          <div className="max-w-xl mx-auto">
            <button className="bg-[#72EF36] text-black px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Get a Quote
            </button>
          </div>

          <p className="text-[#EAFBEA] text-sm mt-4">
            Delivery to mainland UK only, excludes NI, highlands, ferry crossing and toll costs.
          </p>
        </div> */}

      </div>
    </section>
  );
}
