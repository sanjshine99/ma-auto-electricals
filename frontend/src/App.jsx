import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import TermsConditions from "./components/Term";
import Home from "./page/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import GDPRBanner from "../src/components/GDPRBanner"
import Navbar from "./components/Header";
import ContactPage from "./page/Contact";
import ProductPage from "./page/ProductPage";
import ProductDetails from "./components/Product/ProductDetails";
import CartPage from "./components/Product/CartPage";
import SuccessPage from "./components/Product/SuccessPage";
import Nissan from "./page/Nissan";
import MotPage from "../src/page/mot"
import ParkingPage from "./page/Parking";
import InstallationPage from "./page/Installation";
import HandfreePage from "./page/Handfree";
import DiagnosticsPage from "./page/Diagnostics";
import CarStereosPage from "./page/CarStereos";
import CarSecurityPage from "./page/CarSecurity";
import CarRepairPage from "./page/CarRepair";
import VehicleTrackingPage from "./page/VehicleTracking";
import Ford from "./page/Ford";
import Vauxhall from "./page/Vauxhall";
import AdBluePage from "./page/AdBlue";
import EGRPage from "./page/EGR";
import ECUPage from "./page/ECU";
import CarElectricsPage from "./page/CarElectrics";
import CentralDoorMotorsPage from "./page/CentralDoorMotors";
import WiperMotorsPage from "./page/WiperMotors";
import WindowRegulatorsPage from "./page/WindowRegulators";
import BrakePadsPage from "./page/BrakePads";
import MechanicalPage from "./page/Mechanical";
import CarPage from "./page/CarPage"
import CarDetailPage from "../src/page/CarDetailPage"
import ScrollToHash from "./components/ScrollToHash";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function App() {

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true,     // Whether animation should happen only once
      offset: 100,    // Offset (in px) from the original trigger point
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/nissan" element={<Nissan />} />
        <Route path="/mot" element={<MotPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/installation" element={<InstallationPage />} />
        <Route path="/handsfree" element={<HandfreePage />} />
        <Route path="/diagnostics" element={<DiagnosticsPage />} />
        <Route path="/car-stereos" element={<CarStereosPage />} />
        <Route path="/car-security" element={<CarSecurityPage />} />
        <Route path="/car-repair" element={<CarRepairPage />} />
        <Route path="/vehicle-tracking" element={<VehicleTrackingPage />} />
        <Route path="/AdBlue" element={<AdBluePage />} />
        <Route path="/EGR" element={<EGRPage />} />
        <Route path="/ecu-repair-services" element={<ECUPage />} />
        <Route path="/Car-Electrics" element={<CarElectricsPage />} />
        <Route path="/central-door-motors" element={<CentralDoorMotorsPage />} />
        <Route path="/WiperMotors" element={<WiperMotorsPage />} />
        <Route path="/WindowRegulators" element={<WindowRegulatorsPage />} />
        <Route path="/BrakePads" element={<BrakePadsPage />} />
        <Route path="/mechanical" element={<MechanicalPage />} />
        <Route path="/ford" element={<Ford />} />
        <Route path="/vauxhall" element={<Vauxhall />} />
        <Route path="/car" element={<CarPage />} />
        <Route path="/car/:slug" element={<CarDetailPage />} />
      </Routes>
      <Footer />
      <GDPRBanner />
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/447889133123"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 right-7 md:bottom-33 md:right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-2 md:p-3 rounded-full shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={20} />
      </a>
      {/* Phone Floating Button */}
      <a
        href="tel:+447889133123"
        rel="noopener noreferrer"
        className="fixed bottom-18 right-7 md:bottom-20 md:right-6 z-40  bg-[#317F21] hover:bg-[#317F21]/80 text-white p-2 md:p-3 rounded-full shadow-lg transition-transform hover:scale-110"
        aria-label="Call Us"
      >
        <FaPhoneAlt size={18} className="hover:text-black" />
      </a>
    </Router>
  );
}

export default App;