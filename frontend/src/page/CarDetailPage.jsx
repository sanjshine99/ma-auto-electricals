import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Car } from "lucide-react";

// Original common components — untouched
import VehicleDetailsPage    from "../common/BuyHeader";
import VehicleDetailsSection from "../common/VehicleDetailsSection";
import UnderTheBonnet        from "../common/UnderTheBonnet";

const API_URL ="https://ma-auto-electricals.onrender.com";

export default function CarDetailPage() {
  const { slug }            = useParams(); // "ford-ka--676abc123def"
  const navigate            = useNavigate();
  const [car, setCar]           = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // _id is everything after the last "--"
    const id = slug.split("--").pop();
    axios.get(`${API_URL}/api/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#317F21] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (notFound || !car) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <Car size={64} className="text-gray-300" />
      <h2 className="text-2xl font-bold text-gray-600">Car Not Found</h2>
      <button onClick={() => navigate("/car")}
        className="text-[#317F21] hover:underline flex items-center gap-1 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Cars
      </button>
    </div>
  );

  // ── Map DB → exactly what each component expects ──────────

  // BuyHeader (VehicleDetailsPage) needs:
  // vehicle.make, .model, .variant, .price, .year, .registration,
  // .mileage, .fuelType, .transmission, .bodyType, .engine, .colour, .images[]
  const vehicleData = {
    make:           car.name,
    model:          car.model,
    variant:        car.variant        || "",
    price:          car.price,
    monthlyPayment: car.monthlyPayment || 0,
    year:           car.year,
    registration:   car.registration   || "Not specified",
    mileage:        car.mileage        || 0,
    fuelType:       car.fuelType       || "Petrol",
    transmission:   car.transmission   || "Manual",
    bodyType:       car.bodyType       || "",
    engine:         car.engine         || "",
    colour:         car.colour         || "",
    // Full URL for each image
    images: (car.images || []).map(img => `${API_URL}/images/${img}`),
  };

  // VehicleDetailsSection needs: data.description, data.features[]
  const vehicleDetails = {
    description: car.description || "",
    features:    car.features    || [],
  };

  // UnderTheBonnet needs: items[{icon, title, value}]
  // Only show rows that have both title and value filled
  const bonnetItems = (car.bonnetData || []).filter(b => b.title && b.value);

  // Gallery needs: images[] with full URLs
  const galleryImages = (car.images || []).map(img => `${API_URL}/images/${img}`);

  return (
    <div>
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 pt-24 pb-0">
        <button onClick={() => navigate("/car")}
          className="flex items-center gap-2 text-[#317F21] hover:underline font-medium text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Cars
        </button>
      </div>

      {/*
        ✅ Exact original components — zero style/structure changes
        Just passing API data in the same shape as the old hardcoded data
      */}
      <VehicleDetailsPage    vehicle={vehicleData} />
      <VehicleDetailsSection data={vehicleDetails} />
      {bonnetItems.length > 0 && <UnderTheBonnet items={bonnetItems} />}
      
    </div>
  );
}