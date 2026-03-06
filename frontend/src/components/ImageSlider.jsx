import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    name: "Drew Peacock",
    role: "Client",
    image: "/test.png",
    text: "Absolutely top notch, he went above and beyond all auto electrician's who'd tried and failed to fix her car previously. and what's more he was really fair with the price. Thanks Bud, I appreciate it",
  },
  {
    name: "Wilf Jones",
    role: "Client",
    image: "https://i.pravatar.cc/150?img=2",
    text: `Boot would not open, eliminated various options and then called M A electrics who luckily was working nearby. Came within the hour made correct diagnosis stripped wiring down, repaired and put back together. All within an hour. Top company.`,
  },
  {
    name: "Ell Shane",
    role: "AutoExpert",
    image: "https://i.pravatar.cc/150?img=3",
    text: "Great guy, great service. Helped with a electrical issue on my car, came out and met me (on the weekend) and fixed it. Couldn't be happier.",
  },
  {
    name: "Sarah Awan",
    role: "Partner",
    image: "https://i.pravatar.cc/150?img=4",
    text: "Excellent service , needed to get one of are vans back on the road quickly , he came out with in the hour , it was only something minor , problem sorted he only charged £20 , would of cost a lot more to call someone else out , will be using this guy in the future if we have any other issues . thank you",
  },
  {
    name: "Kalpesh Patel",
    role: "Partner",
    image: "https://i.pravatar.cc/150?img=4",
    text: "Very good service from M A Auto Electrics, knows what's he doing and impressed to fault find so quickly. Highly recommended",
  },
  {
    name: "Razh Amin",
    role: "Partner",
    image: "https://i.pravatar.cc/150?img=4",
    text: `Great guy, good communication, very knowledgeable and quick to find fault and fix. Highly recommended.`,
  },
  {
    name: "Mike vickers",
    role: "Partner",
    image: "https://i.pravatar.cc/150?img=4",
    text: "He came at the time arranged sorted the problem within an hour 5star",
  },
];


export default function Testimonials() {
  const scrollRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    // ✅ Center the first card after mount
    const timeout = setTimeout(() => {
      const container = scrollRef.current;
      if (container && container.children.length > 0) {
        const firstCard = container.children[0];
        const scrollPosition =
          firstCard.offsetLeft -
          (container.offsetWidth / 2 - firstCard.offsetWidth / 2);
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }, 300); // small delay ensures layout is ready

    return () => clearTimeout(timeout);
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimonial" className="py-12 bg-white  transition-colors duration-500 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#317F21]  font-semibold tracking-widest uppercase text-lg">
            Our Testimonials
          </p>
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 mt-20 -translate-y-1/2 bg-[#317F21] p-3 rounded-full shadow-md hover:bg-[#173610] hover:text-white transition z-20 group"
        >
          <FaChevronLeft className="transition-transform duration-300 group-hover:-translate-x-1" size={18} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 mt-20 -translate-y-1/2 bg-[#317F21] p-3 rounded-full shadow-md hover:bg-[#173610] hover:text-white transition z-20 group"
        >
          <FaChevronRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex space-x-6 translate-x-6 md:translate-x-0 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-8 hide-scrollbar"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="
                flex-shrink-0
                w-[94%] sm:w-80 md:w-85 lg:w-96
                bg-white
                rounded-2xl shadow-lg overflow-hidden 
                hover:shadow-[#317F21] active:shadow-[#317F21] 
                relative snap-start
              "
            >
              {/* Corner Triangle */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-[80px] border-t-[#317F21] border-r-[80px] border-r-transparent"></div>

              {/* Profile Section */}
              <div className="relative pt-6 px-6 pb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-white p-1 bg-[#317F21] justify-center flex items-center text-white text-2xl sm:text-3xl font-bold">
                      {testimonial.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()}
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-100  py-3 px-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 ">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600  text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700  text-sm sm:text-base leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}