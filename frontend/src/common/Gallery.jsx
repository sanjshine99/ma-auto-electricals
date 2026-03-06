import React, { useState, useEffect } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function GallerySection({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length < 2) return null;

  const big = images.slice(0, 2);
  const thumbs = images.slice(2);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isOpen, images.length]);

  const openPopup = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      id="V-Gallery"
      className="py-12 md:py-16 bg-white rounded-3xl overflow-hidden relative shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">

        {/* Heading */}
        <h2
          data-aos="fade-up"
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#317F21] mb-8"
        >
          Photo Gallery
        </h2>

        {/* Large Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {big.map((url, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={url}
                alt="gallery"
                className="w-full h-56 sm:h-64 md:h-80 object-cover cursor-pointer border-4 border-[#317F21] hover:scale-105 transition-transform duration-300"
                onClick={() => openPopup(index)}
              />
            </div>
          ))}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
          {thumbs.map((url, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={url}
                alt="thumb"
                className="w-full h-20 sm:h-24 object-cover cursor-pointer border-2 border-[#317F21]/50 hover:scale-105 transition-transform"
                onClick={() => openPopup(index + 2)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div
        data-aos="fade-in"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[70px] sm:text-[100px] md:text-[140px] font-extrabold text-[#317F21]/10 pointer-events-none select-none"
      >
        Gallery
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">

          {/* Close Button */}
          <button
            className="absolute right-6 top-20 md:right-10 bg-white text-[#317F21] p-3 rounded-full shadow-lg hover:scale-110 transition"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={26} />
          </button>

          {/* Image */}
          <img
            src={images[activeIndex]}
            alt="preview"
            className="max-w-[95%] md:max-w-[80%] max-h-[75vh] rounded-2xl shadow-2xl border-4 border-[#317F21]"
          />

          {/* Previous */}
          <button
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 text-[#317F21] p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition"
            onClick={prevImage}
          >
            <IoChevronBack size={28} />
          </button>

          {/* Next */}
          <button
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 text-[#317F21] p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition"
            onClick={nextImage}
          >
            <IoChevronForward size={28} />
          </button>
        </div>
      )}
    </section>
  );
}