import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const VehicleDetailsPage = ({ vehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
     console.log(vehicle);
  const details = [
       {
      value: vehicle.ulez ? " ULEZ Compliant" : " Not ULEZ Compliant",
      ulez: true,
      compliant: vehicle.ulez,
    },
    { value: `${vehicle.year} (${vehicle.registration})` },
    { value: `${vehicle.mileage.toLocaleString()} mi` },
    { value: vehicle.fuelType },
    { value: vehicle.transmission },
    { value: vehicle.bodyType },
    { value: `${vehicle.engine} ${vehicle.fuelType}` },
    { value: vehicle.colour },
  ];

  const nextImage = () =>
    setCurrentImageIndex(
      (prev) => (prev + 1) % vehicle.images.length
    );

  const prevImage = () =>
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + vehicle.images.length) %
        vehicle.images.length
    );

  return (
    <div className="min-h-screen bg-white text-black py-24 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT – IMAGE CAROUSEL */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100">

                <img
                  src={vehicle.images[currentImageIndex]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-80 sm:h-96 md:h-[520px] object-cover"
                />

                {/* Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-[#317F21]/80 p-3 rounded-full transition"
                >
                  <ChevronLeft className="w-6 h-6 text-[#317F21] hover:text-white" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-[#317F21]/80 p-3 rounded-full transition"
                >
                  <ChevronRight className="w-6 h-6 text-[#317F21] hover:text-white" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-sm text-[#317F21] font-semibold shadow">
                  {currentImageIndex + 1} / {vehicle.images.length}
                </div>

                {/* Icons */}
                
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {vehicle.images.slice(0, 8).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-none rounded-lg overflow-hidden border-2 transition ${
                      currentImageIndex === idx
                        ? "border-[#317F21]"
                        : "border-gray-300 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-8 space-y-6">

              {/* Title */}
              <div>
                <h1 className="text-4xl font-bold">
                  {vehicle.make} {vehicle.model}
                </h1>
                <p className="opacity-70 mt-1">{vehicle.variant}</p>
              </div>
              {/* Buy Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#317F21]/20 shadow text-center">
                <div className="text-sm opacity-80 mb-2">
                  Buy this Car
                </div>
                <div className="text-4xl font-bold text-[#317F21] mb-4">
                  £{vehicle.price.toLocaleString()}
                </div>

                <div className="flex flex-col gap-3">
                  <button className="bg-[#317F21] text-white py-3 rounded-full font-semibold hover:opacity-90 transition">
                    Contact Seller
                  </button>
                 
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {details.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#317F21]/10 border border-[#317F21]/30 rounded-full px-3 py-2 text-center text-sm"
                  >
                    {item.value}
                    
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
