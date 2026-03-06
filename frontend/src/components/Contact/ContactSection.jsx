import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCommentDots,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaCarSide,
  FaClock,
  FaMapMarkerAlt,
  FaDirections,
} from "react-icons/fa";

// EmailJS credentials
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    service: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const phoneRegex = /^(?:\+44|0)[1-9]\d{8,9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phoneRegex.test(formData.phone)) {
      setFormErrors({ ...formErrors, phone: "Invalid phone number" });
      return;
    } else {
      setFormErrors({ ...formErrors, phone: "" });
    }

    if (!emailRegex.test(formData.email)) {
      setFormErrors({ ...formErrors, email: "Invalid email address" });
      return;
    } else {
      setFormErrors({ ...formErrors, email: "" });
    }

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          vehicle: "",
          service: "",
          message: "",
        });
      })
      .catch(() => {
        toast.error("Failed to send message, please try again.");
      });
  };

  return (
    <section className="py-16 bg-[#F3F6F4] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div
            data-aos="fade-right"
            className="flex flex-col gap-6 rounded-2xl bg-white  py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
          >
            <div className="px-6">
              <div className="text-2xl font-bold flex items-center text-[#111827] ">
                <FaCommentDots className="mr-2 h-5 w-5 text-[#2F7D33]" />
                Send Us a Message
              </div>
              <p className="text-sm mt-1 text-gray-500 ">
                Get in touch for quotes, bookings, or any questions about our services
              </p>
            </div>

            <div className="px-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormInput
                  id="name"
                  label="Full Name *"
                  placeholder="Your full name"
                  icon={<FaUser className="h-4 w-4" />}
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormInput
                  id="phone"
                  label="Phone Number *"
                  placeholder="Your phone number"
                  icon={<FaPhoneAlt className="h-4 w-4" />}
                  value={formData.phone}
                  onChange={handleChange}
                  error={formErrors.phone}
                />
              </div>

              <FormInput
                id="email"
                type="email"
                label="Email Address"
                placeholder="your.email@example.com"
                icon={<FaEnvelope className="h-4 w-4" />}
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
              />

              <FormInput
                id="vehicle"
                label="Vehicle Details"
                placeholder="Make, model, year"
                icon={<FaCarSide className="h-4 w-4" />}
                value={formData.vehicle}
                onChange={handleChange}
              />

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-[#111827] ">
                  Service Required
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-3 py-2 rounded-lg bg-gray-50  text-[#111827]  focus:outline-none focus:ring-2 focus:ring-[#2F7D33] transition-colors"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="mot">MOT Test</option>
                  <option value="service">Car Service</option>
                  <option value="alignment">Wheel Alignment</option>
                  <option value="tyres">Tyre Fitting</option>
                  <option value="brakes">Brake Service</option>
                  <option value="exhaust">Exhaust Repair</option>
                  <option value="aircon">Air Conditioning</option>
                  <option value="cleaning">Engine Cleaning</option>
                  <option value="ECU">ECU Remapping and Diagnostics</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[#111827] ">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Please describe your requirements..."
                  className="w-full rounded-lg px-3 py-2 bg-gray-50  text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2F7D33] transition-colors"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 h-9 w-full rounded-md font-semibold transition-all bg-[#2F7D33] text-white hover:bg-[#266b2a] hover:shadow-md"
              >
                <FaCommentDots className="h-4 w-4" />
                Send Message
              </button>

              <p className="text-xs text-gray-500 ">
                * Required fields. We'll get back to you within 24 hours.
              </p>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            <SideCard
              data-aos="fade-left"
              title="Opening Hours"
              icon={<FaClock className="h-5 w-5" />}
            >
              <HoursRow day="Monday" time="9:00 AM – 6:00 PM" />
              <HoursRow day="Tuesday" time="9:00 AM – 6:00 PM" />
              <HoursRow day="Wednesday" time="9:00 AM – 6:00 PM" />
              <HoursRow day="Thursday" time="9:00 AM – 6:00 PM" />
              <HoursRow day="Friday" time="9:00 AM – 6:00 PM" />
              <HoursRow day="Saturday" time="9:00 AM – 6:00 PM" />
              <HoursRow day="Sunday" time="9:00 AM – 6:00 PM" />
            </SideCard>

            <SideCard data-aos="fade-left" title="Find Us" icon={<FaMapMarkerAlt className="h-5 w-5" />}>
              <div className="space-y-1 mb-4">
                <p className="font-semibold text-[#111827] ">MA Auto Electrics</p>
                <p className="text-sm text-gray-500 ">
                  13 laburnum drive oswaldtwistele
accrington bb5 3aw,
United Kingdom
                </p>
              </div>

              <a
                href="https://www.google.com/maps/place/M+A+Auto+Electrics/@53.7508303,-2.4371918,10.79z/data=!4m6!3m5!1s0x487ba568018c929d:0xfeef71b544682a6a!8m2!3d53.7460428!4d-2.3519864!16s%2Fg%2F1pxqdgy2t?entry=tts&g_ep=EgoyMDI1MTIwOS4wIPu8ASoASAFQAw%3D%3D&skid=8676a7fb-92f5-4c50-9af9-25be7b7b9d59"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="h-9 w-full rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center bg-gray-50  text-[#111827]  hover:bg-gray-100  hover:shadow-md transition-all duration-200">
                  <FaDirections className="mr-2 h-4 w-4 text-[#2F7D33]" />
                  View on Google Maps
                </button>
              </a>
            </SideCard>
           
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- Subcomponents ----- */

function FormInput({ id, label, placeholder, icon, value, onChange, type = "text", error }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-[#111827] ">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={`h-9 w-full rounded-lg px-3 pl-10 bg-gray-50  text-[#111827]  focus:outline-none focus:ring-2 focus:ring-[#2F7D33] transition-colors ${
            error ? "ring-2 ring-red-500" : ""
          }`}
          value={value}
          onChange={onChange}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
}

function SideCard({ title, icon, children, ...props }) {
  return (
    <div
      {...props}
      className="rounded-2xl bg-white  py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
    >
      <div className="px-6 mb-2">
        <div className="text-xl font-bold flex items-center text-[#111827] ">
          {icon && <span className="mr-2 text-[#2F7D33]">{icon}</span>}
          {title}
        </div>
      </div>
      <div className="px-6">{children}</div>
    </div>
  );
}

function HoursRow({ day, time, muted }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-medium text-[#111827]">{day}</span>
      <span className={`text-sm ${muted ? "text-gray-400" : "text-[#111827] "}`}>
        {time}
      </span>
    </div>
  );
}