import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-out-cubic",
    });
  }, []);

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
    <section className="py-16 bg-[#F3F6F4] dark:bg-[#0B0F0C] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div
            data-aos="fade-right"
            className="flex flex-col gap-6 rounded-xl border border-brand-border dark:border-white/10 
                       bg-white dark:bg-[#0F1115] py-6 shadow-sm box-border w-full"
          >
            <div className="px-6">
              <div className="text-2xl font-bold flex items-center text-[#111827] dark:text-gray-100">
                <FaCommentDots className="mr-2 h-5 w-5 text-[#2F7D33]" />
                Send Us a Message
              </div>
              <p className="text-sm mt-1 text-muted dark:text-gray-400">
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
                <label htmlFor="service" className="text-sm font-medium dark:text-gray-200">
                  Service Required
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-3 py-2 rounded-md border bg-white dark:bg-[#1B1E24] text-[#111827] dark:text-white border-brand-border dark:border-white/10 hover:border-[#2F7D33] focus:border-[#2F7D33] focus:ring-[#2F7D33]"
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
                <label htmlFor="message" className="text-sm font-medium dark:text-gray-200">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Please describe your requirements..."
                  className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#1B1E24] text-[#111827] dark:text-white dark:border-white/10"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 h-9 w-full rounded-md font-semibold transition-colors bg-[#2F7D33] text-white hover:shadow-md"
              >
                <FaCommentDots className="h-4 w-4" />
                Send Message
              </button>

              <p className="text-xs text-muted dark:text-gray-400">
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
              <HoursRow day="Monday" time="8:00 AM – 5:30 PM" />
              <HoursRow day="Tuesday" time="8:00 AM – 5:30 PM" />
              <HoursRow day="Wednesday" time="8:00 AM – 5:30 PM" />
              <HoursRow day="Thursday" time="8:00 AM – 5:30 PM" />
              <HoursRow day="Friday" time="8:00 AM – 5:30 PM" />
              <HoursRow day="Saturday" time="8:00 AM – 4:00 PM" />
              <HoursRow day="Sunday" time="Closed" muted />
            </SideCard>

            <SideCard data-aos="fade-left" title="Find Us" icon={<FaMapMarkerAlt className="h-5 w-5" />}>
              <div className="space-y-1 mb-4">
                <p className="font-semibold">Stoneley's Garage Services</p>
                <p className="text-sm text-muted dark:text-gray-400">
                  Oakham Business Park, Hamilton Way, Mansfield NG18 5BU, UK
                </p>
              </div>

              <a
                href="https://www.google.com/maps/place/Stoneley's+Garage+Services/data=!4m2!3m1!1s0x0:0x5a644c3262063baf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="h-9 w-full rounded-md border px-4 py-2 text-sm font-medium flex items-center justify-center bg-white dark:bg-[#1B1E24] text-[#111827] dark:text-white border-brand-border dark:border-white/10 hover:shadow">
                  <FaDirections className="mr-2 h-4 w-4" />
                  View on Google Maps
                </button>
              </a>
            </SideCard>

            <SideCard data-aos="fade-left" title="About Stoneley's Garage">
              <p className="text-sm text-muted dark:text-gray-400 leading-relaxed">
                Family-run garage established in 1973, serving Mansfield and surrounding areas.
                Our certified technicians provide reliable service for cars, commercial vehicles,
                and motorhomes.
              </p>
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
      <label htmlFor={id} className="text-sm font-medium dark:text-gray-200">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={`h-9 w-full rounded-md border bg-white dark:bg-[#1B1E24] px-3 pl-10 text-[#111827] dark:text-white ${error ? "border-red-500" : "border-brand-border dark:border-white/10"
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
      className="rounded-xl border border-brand-border dark:border-white/10 bg-white dark:bg-[#0F1115] py-6 shadow-sm box-border w-full"
    >
      <div className="px-6 mb-2">
        <div className="text-xl font-bold flex items-center text-[#111827] dark:text-white">
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
      <span className="font-medium text-[#111827] dark:text-white">{day}</span>
      <span className={`text-sm ${muted ? "text-gray-400" : "text-[#111827] dark:text-white"}`}>
        {time}
      </span>
    </div>
  );
}
