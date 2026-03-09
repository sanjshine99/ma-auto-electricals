import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, Car, Plus, Trash2, Settings } from "lucide-react";

// Default bonnet rows — matches bonnetData format exactly
const BONNET_DEFAULTS = [
  { icon: "/fueltype.svg",  title: "Fuel Type",        value: "" },
  { icon: "/engine.svg",    title: "Engine Size",       value: "" },
  { icon: "/power.svg",     title: "Max Power",         value: "" },
  { icon: "/speed.svg",     title: "Top Speed",         value: "" },
  { icon: "/emissions.svg", title: "CO₂ Emissions",     value: "" },
  { icon: "/mpg.svg",       title: "Combined MPG",      value: "" },
  { icon: "/mot.svg",       title: "MOT Expiry",        value: "" },
  { icon: "/tax.svg",       title: "Road Tax (12m)",    value: "" },
];

const AddCar = ({ url, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "", model: "", variant: "", year: "", price: "",
    monthlyPayment: "", registration: "", mileage: "",
    fuelType: "Petrol", transmission: "Manual", bodyType: "Hatchback",
    engine: "", colour: "", description: "",
  });
  const [images,     setImages]     = useState([]);
  const [previews,   setPreviews]   = useState([]);
  const [features,   setFeatures]   = useState([""]);
  const [bonnetData, setBonnetData] = useState(BONNET_DEFAULTS.map(b => ({ ...b })));
  const [loading,    setLoading]    = useState(false);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    setPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const addFeature    = () => setFeatures(prev => [...prev, ""]);
  const removeFeature = (idx) => setFeatures(prev => prev.filter((_, i) => i !== idx));
  const updateFeature = (idx, val) =>
    setFeatures(prev => prev.map((f, i) => i === idx ? val : f));

  const updateBonnet    = (idx, field, val) =>
    setBonnetData(prev => prev.map((b, i) => i === idx ? { ...b, [field]: val } : b));
  const addBonnetRow    = () =>
    setBonnetData(prev => [...prev, { icon: "/fueltype.svg", title: "", value: "" }]);
  const removeBonnetRow = (idx) =>
    setBonnetData(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) { toast.error("Please select at least one image!"); return; }

    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append("features",   JSON.stringify(features.filter(f => f.trim())));
    data.append("bonnetData", JSON.stringify(bonnetData.filter(b => b.title && b.value)));
    images.forEach(img => data.append("images", img));

    try {
      const res = await axios.post(`${url}/api/cars`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-6 px-4 sm:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Add New Car</h1>
        <p className="text-gray-500 text-sm">Fill in all details to add a new car listing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ── IMAGES ── */}
        <Section icon={<Upload className="w-5 h-5" />} title="Car Images (Max 15)">
          <label htmlFor="car-images"
            className="block cursor-pointer border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 transition p-4 bg-gray-50">
            {previews.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border shadow-sm">
                    <img src={src} className="w-full h-full object-cover" alt="" />
                    <button type="button"
                      onClick={(e) => { e.preventDefault(); removeImage(idx); }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ×
                    </button>
                  </div>
                ))}
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-2xl">+</div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 text-gray-400">
                <Upload className="w-10 h-10 mb-2" />
                <p className="text-sm font-medium">Click to upload images</p>
                <p className="text-xs mt-1">PNG, JPG, WEBP up to 5MB each</p>
              </div>
            )}
          </label>
          <input type="file" id="car-images" multiple accept="image/*"
            onChange={handleImagesChange} className="hidden" />
        </Section>

        {/* ── BASIC INFO ── */}
        <Section icon={<Car className="w-5 h-5" />} title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Make (e.g. Ford)"      name="name"           value={formData.name}           onChange={handleChange} placeholder="Ford"          required />
            <Field label="Model (e.g. KA)"       name="model"          value={formData.model}          onChange={handleChange} placeholder="KA"            required />
            <Field label="Variant (e.g. Zetec)"  name="variant"        value={formData.variant}        onChange={handleChange} placeholder="Zetec Black Edition" />
            <Field label="Year"                  name="year"           value={formData.year}           onChange={handleChange} placeholder="2015"          type="number" required />
            <Field label="Price (£)"             name="price"          value={formData.price}          onChange={handleChange} placeholder="2695"          type="number" required />
            <Field label="Monthly Payment (£)"   name="monthlyPayment" value={formData.monthlyPayment} onChange={handleChange} placeholder="0"             type="number" />
            <Field label="Registration"          name="registration"   value={formData.registration}   onChange={handleChange} placeholder="AB15 XYZ" />
            <Field label="Mileage"               name="mileage"        value={formData.mileage}        onChange={handleChange} placeholder="57887"         type="number" />
          </div>
        </Section>

        {/* ── SPECS ── */}
        <Section icon={<Settings className="w-5 h-5" />} title="Vehicle Specifications">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Fuel Type"     name="fuelType"     value={formData.fuelType}     onChange={handleChange} options={["Petrol","Diesel","Electric","Hybrid","Plug-in Hybrid"]} />
            <SelectField label="Transmission"  name="transmission" value={formData.transmission} onChange={handleChange} options={["Manual","Automatic","Semi-Automatic"]} />
            <SelectField label="Body Type"     name="bodyType"     value={formData.bodyType}     onChange={handleChange} options={["Hatchback","Saloon","Estate","SUV","Coupe","Convertible","Van","MPV"]} />
            <Field label="Engine (e.g. 1.2L)"  name="engine"  value={formData.engine}  onChange={handleChange} placeholder="1.2L" />
            <Field label="Colour"              name="colour"  value={formData.colour}  onChange={handleChange} placeholder="Black" />
          </div>
        </Section>

        {/* ── DESCRIPTION ── */}
        <Section icon={<Car className="w-5 h-5" />} title="Description">
          <textarea name="description" value={formData.description} onChange={handleChange}
            rows="5" placeholder="Write a detailed description about this car..." required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm" />
        </Section>

        {/* ── FEATURES ── */}
        <Section icon={<Plus className="w-5 h-5" />} title="Highlight Features">
          <div className="space-y-2">
            {features.map((f, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={f} onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder="e.g. Full Service History"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                <button type="button" onClick={() => removeFeature(idx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addFeature}
              className="flex items-center gap-1 text-green-600 text-sm hover:underline mt-1">
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>
        </Section>

        {/* ── UNDER THE BONNET ── */}
        <Section icon={<Settings className="w-5 h-5" />} title="Under the Bonnet Data">
          <p className="text-xs text-gray-400 mb-3">Leave value empty to hide that row on the listing.</p>
          <div className="space-y-2">
            {bonnetData.map((b, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-1 flex justify-center">
                  <img src={b.icon} alt="" className="w-6 h-6 opacity-50"
                    onError={(e) => e.target.style.display = "none"} />
                </div>
                <input value={b.title} onChange={(e) => updateBonnet(idx, "title", e.target.value)}
                  placeholder="Title e.g. Fuel Type"
                  className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                <input value={b.value} onChange={(e) => updateBonnet(idx, "value", e.target.value)}
                  placeholder="Value e.g. Petrol"
                  className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                <button type="button" onClick={() => removeBonnetRow(idx)}
                  className="col-span-1 p-1 text-red-400 hover:text-red-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addBonnetRow}
              className="flex items-center gap-1 text-green-600 text-sm hover:underline mt-1">
              <Plus className="w-4 h-4" /> Add Row
            </button>
          </div>
        </Section>

        <div className="pt-2 pb-6">
          <button type="submit" disabled={loading}
            className="w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg transition-all disabled:opacity-60">
            {loading ? "Adding..." : "Add Car"}
          </button>
        </div>

      </form>
    </div>
  );
};

const Section = ({ icon, title, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-gray-700 font-semibold border-b pb-2">
      {icon}<span>{title}</span>
    </div>
    {children}
  </div>
);

const Field = ({ label, name, value, onChange, placeholder, type = "text", required }) => (
  <div>
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange}
      placeholder={placeholder} required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition" />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <select name={name} value={value} onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white">
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default AddCar;