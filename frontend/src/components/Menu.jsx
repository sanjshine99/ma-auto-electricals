import React from "react";

export default function MenuPage() {
  const menuData = {
    maki: [
      {
        title: "Spicy Tuna Maki",
        price: "£5",
        desc: "A tantalizing blend of spicy tuna, cucumber, and avocado.",
        img: "https://framerusercontent.com/images/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp",
      },
      {
        title: "Mango Maki",
        price: "£5",
        desc: "Tempura-fried shrimp, cucumber, and cream cheese.",
        img: "https://framerusercontent.com/images/fhMMbGkmrMBjUIswKIN5x3w.webp",
      },
    ],
    uramaki: [
      {
        title: "Volcano Delight",
        price: "£12",
        desc: "Creamy crab salad topped with spicy tuna & sriracha.",
        img: "https://framerusercontent.com/images/quqbVpcYdgH65rZqF71BSohYQ.webp",
      },
    ],
    special: [
      {
        title: "Sunrise Bliss",
        price: "£16",
        desc: "Fresh salmon, cream cheese & asparagus wrapped in tobiko.",
        img: "https://framerusercontent.com/images/27vE5qIMgg0IarFBK9fDPTLr9ZA.webp",
      },
    ],
  };

  return (
    <div className="bg-[#0F0F0F] text-white">
      <div className="flex w-full relative">
        {/* LEFT IMAGE */}
        <div className="w-[45%] sticky top-0 h-screen">
          <img
            src="https://framerusercontent.com/images/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp"
            className="w-full h-full object-cover rounded-r-3xl"
            alt="Menu Left"
          />
        </div>

        {/* RIGHT SCROLL PANEL */}
        <div className="w-[55%] overflow-y-auto no-scrollbar px-12 py-14">
          {/* FILTER BUTTONS */}
          <div className="flex gap-3 sticky top-0 bg-[#0F0F0F]/80 backdrop-blur py-4 z-10">
            <a
              className="px-5 py-2 border border-gray-600 rounded-md text-sm hover:bg-gray-800 transition"
              href="#maki"
            >
              MAKI
            </a>
            <a
              className="px-5 py-2 border border-gray-600 rounded-md text-sm hover:bg-gray-800 transition"
              href="#uramaki"
            >
              URAMAKI
            </a>
            <a
              className="px-5 py-2 border border-gray-600 rounded-md text-sm hover:bg-gray-800 transition"
              href="#special"
            >
              SPECIAL ROLLS
            </a>
          </div>

          {/* MAKI SECTION */}
          <section id="maki" className="mt-16">
            <h2 className="text-center text-4xl font-serif tracking-wide mb-10">
              <span className="opacity-70">— </span>MAKI
              <span className="opacity-70"> —</span>
            </h2>
            {menuData.maki.map((item, i) => (
              <div key={i} className="flex gap-6 mb-14">
                <img
                  src={item.img}
                  className="w-32 h-24 rounded-lg object-cover bg-black"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-serif tracking-wide">{item.title}</h3>
                    <span className="text-lg font-light">{item.price}</span>
                  </div>
                  <p className="text-gray-400 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* URAMAKI SECTION */}
          <section id="uramaki" className="mt-20">
            <h2 className="text-center text-4xl font-serif tracking-wide mb-10">
              <span className="opacity-70">— </span>URAMAKI
              <span className="opacity-70"> —</span>
            </h2>
            {menuData.uramaki.map((item, i) => (
              <div key={i} className="flex gap-6 mb-14">
                <img
                  src={item.img}
                  className="w-32 h-24 rounded-lg object-cover bg-black"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-serif tracking-wide">{item.title}</h3>
                    <span className="text-lg font-light">{item.price}</span>
                  </div>
                  <p className="text-gray-400 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* SPECIAL ROLLS SECTION */}
          <section id="special" className="mt-20 mb-20">
            <h2 className="text-center text-4xl font-serif tracking-wide mb-10">
              <span className="opacity-70">— </span>SPECIAL ROLLS
              <span className="opacity-70"> —</span>
            </h2>
            {menuData.special.map((item, i) => (
              <div key={i} className="flex gap-6 mb-14">
                <img
                  src={item.img}
                  className="w-32 h-24 rounded-lg object-cover bg-black"
                  loading="lazy"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-serif tracking-wide">{item.title}</h3>
                    <span className="text-lg font-light">{item.price}</span>
                  </div>
                  <p className="text-gray-400 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* HIDE SCROLLBAR */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
