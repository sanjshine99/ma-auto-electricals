import React, { useState, useEffect } from "react";
import { ChevronRight, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =" https://ma-auto-electricals.onrender.com";

const toSlug = (car) =>
  `${car.name}-${car.model}`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function CarPage() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/cars`)
      .then(res => setCars(res.data))
      .catch(err => console.error("Failed to fetch cars:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-20">
      <h1 className="text-4xl font-extrabold text-center text-[#35542C] mb-14">Cars For Sale</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3].map(i => <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse h-80" />)}
      </div>
    </div>
  );

  if (cars.length === 0) return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center px-6 py-20">
      <Car size={64} className="text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-600 mb-2">No Cars Listed Yet</h2>
      <p className="text-gray-400">Check back soon for available vehicles.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-20">
      <h1 className="text-4xl font-extrabold text-center text-[#35542C] mb-3">Cars For Sale</h1>
      <p className="text-center text-gray-500 mb-14">
        Browse our current vehicles — click to view full details
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {cars.map(car => (
          <div key={car._id}
            onClick={() => navigate(`/car/${toSlug(car)}--${car._id}`)}
            className="group cursor-pointer bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-[#35542C] shadow-sm hover:shadow-lg transition-all duration-300">

            {/* Image Section */}
            <div className="h-56 overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-800">
              {car.images?.[0] ? (
                <img src={`${API_URL}/images/${car.images[0]}`}
                  alt={`${car.name} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Car size={48} />
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{car.name} {car.model}</h3>
                <span className="text-xs bg-[#35542C]/10 text-[#35542C] font-semibold px-2 py-1 rounded-full ml-2 shrink-0">
                  {car.year}
                </span>
              </div>
              {car.variant && <p className="text-sm text-gray-500 mb-2">{car.variant}</p>}
              
              <div className="h-1 w-14 bg-[#35542C] rounded-full mb-3" />
              
              {/* PRICE: Green color */}
              <p className="text-2xl font-bold text-[#2F7D33] dark:text-[#2F7D33] mb-4">
                £{car.price?.toLocaleString()}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {car.fuelType && <Chip>{car.fuelType}</Chip>}
                {car.transmission && <Chip>{car.transmission}</Chip>}
                {car.mileage > 0 && <Chip>{car.mileage.toLocaleString()} mi</Chip>}
              </div>

              <button className="flex items-center gap-2 text-[#35542C] font-semibold hover:gap-3 transition-all">
                View Details <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Chip = ({ children }) => (
  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
    {children}
  </span>
);