import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, Car, Plus, Trash2, Settings, AlertCircle, Star } from "lucide-react";

const BONNET_DEFAULTS = [
  { icon: "/fueltype.svg",  title: "Fuel Type",      value: "Petrol" },
  { icon: "/engine.svg",    title: "Engine Size",    value: "1.2L" },
  { icon: "/power.svg",     title: "Max Power",      value: "85 bhp" },
  { icon: "/speed.svg",     title: "Top Speed",      value: "109 mph" },
  { icon: "/emissions.svg", title: "CO₂ Emissions",  value: "119 g/km" },
  { icon: "/mpg.svg",       title: "Combined MPG",   value: "55.4 mpg" },
  { icon: "/mot.svg",       title: "MOT Expiry",     value: "March 2026" },
  { icon: "/tax.svg",       title: "Road Tax (12m)", value: "£165" },
];

const validate = (formData, imageItems, features, bonnetData) => {
  const errors = {};

  if (!formData.name.trim())
    errors.name = "Make is required (e.g. Ford)";

  if (!formData.model.trim())
    errors.model = "Model is required (e.g. KA)";

  if (
    !formData.year ||
    isNaN(formData.year) ||
    formData.year < 1900 ||
    formData.year > new Date().getFullYear() + 1
  )
    errors.year = `Year must be between 1900 and ${new Date().getFullYear() + 1}`;

  if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
    errors.price = "Price must be a positive number";

  if (!formData.registration.trim())
    errors.registration = "Registration is required (e.g. AB15 XYZ)";

  if (formData.mileage === "" || formData.mileage === null || formData.mileage === undefined)
    errors.mileage = "Mileage is required";
  else if (isNaN(formData.mileage) || Number(formData.mileage) < 0)
    errors.mileage = "Mileage must be 0 or more";

  if (!formData.fuelType.trim())     errors.fuelType     = "Fuel type is required";
  if (!formData.transmission.trim()) errors.transmission = "Transmission is required";
  if (!formData.bodyType.trim())     errors.bodyType     = "Body type is required";
  if (!formData.engine.trim())       errors.engine       = "Engine is required (e.g. 1.2L)";
  if (!formData.colour.trim())       errors.colour       = "Colour is required";

  if (!formData.description.trim())
    errors.description = "Description is required";
  else if (formData.description.trim().length < 20)
    errors.description = "Description must be at least 20 characters";

  if (imageItems.length === 0)
    errors.images = "At least one image is required";
  else if (imageItems.length > 15)
    errors.images = "Maximum 15 images allowed";

  const filledFeatures = features.filter((f) => f.trim());
  if (filledFeatures.length === 0)
    errors.features = "Add at least one feature (e.g. Full Service History)";

  const bonnetErrors = [];
  bonnetData.forEach((b, idx) => {
    if (
      (b.title.trim() && !b.value.trim()) ||
      (!b.title.trim() && b.value.trim())
    ) {
      bonnetErrors.push(`Row ${idx + 1}: Both title and value must be filled, or both left empty`);
    }
  });
  if (bonnetErrors.length > 0) errors.bonnet = bonnetErrors;

  return errors;
};

const AddCar = ({ url, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "", model: "", variant: "", year: "", price: "",
    monthlyPayment: "", registration: "", mileage: "",
    fuelType: "Petrol", transmission: "Manual", bodyType: "Hatchback",
    engine: "", colour: "", description: "",
    ulez: false,
  });

  // Each entry: { src: string (preview URL), raw: File }
  const [imageItems, setImageItems] = useState([]);
  const [features,   setFeatures]   = useState(["Full Service History"]);
  const [bonnetData, setBonnetData] = useState(BONNET_DEFAULTS.map((b) => ({ ...b })));
  const [loading,    setLoading]    = useState(false);
  const [errors,     setErrors]     = useState({});
  const [submitted,  setSubmitted]  = useState(false);

  const clearError = (key) => {
    if (errors[key])
      setErrors((prev) => { const e = { ...prev }; delete e[key]; return e; });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clearError(e.target.name);
  };

  const toggleUlez = () =>
    setFormData((prev) => ({ ...prev, ulez: !prev.ulez }));

  // Add new images
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const combined = [...imageItems, ...files.map((f) => ({ src: URL.createObjectURL(f), raw: f }))];
    if (combined.length > 15) {
      setErrors((prev) => ({ ...prev, images: "Maximum 15 images allowed" }));
      return;
    }
    setImageItems(combined);
    clearError("images");
  };

  // Remove image
  const removeImage = (idx) => {
    setImageItems((prev) => prev.filter((_, i) => i !== idx));
    clearError("images");
  };

  // Set primary — move to index 0
  const handleSetPrimary = (idx) => {
    setImageItems((prev) => {
      const updated = [...prev];
      const [picked] = updated.splice(idx, 1);
      updated.unshift(picked);
      return updated;
    });
  };

  const addFeature    = () => { setFeatures((prev) => [...prev, ""]); clearError("features"); };
  const removeFeature = (idx) => setFeatures((prev) => prev.filter((_, i) => i !== idx));
  const updateFeature = (idx, val) => {
    setFeatures((prev) => prev.map((f, i) => (i === idx ? val : f)));
    clearError("features");
  };

  const updateBonnet = (idx, field, val) => {
    setBonnetData((prev) => prev.map((b, i) => (i === idx ? { ...b, [field]: val } : b)));
    clearError("bonnet");
  };
  const addBonnetRow    = () =>
    setBonnetData((prev) => [...prev, { icon: "/fueltype.svg", title: "", value: "" }]);
  const removeBonnetRow = (idx) =>
    setBonnetData((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(formData, imageItems, features, bonnetData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[data-error="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append("features",   JSON.stringify(features.filter((f) => f.trim())));
    data.append("bonnetData", JSON.stringify(bonnetData.filter((b) => b.title && b.value)));

    // Send images in order — primary (index 0) first
    imageItems.forEach((item) => data.append("images", item.raw));

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

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>

        {/* ── IMAGES ── */}
        <Section icon={<Upload className="w-5 h-5" />} title="Car Images (Max 15)">
          <div data-error="images">

            {/* Primary large preview */}
            {imageItems.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span>Primary image <span className="text-gray-400">(shown first in listing)</span></span>
                </p>
                <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-yellow-400 shadow">
                  <img
                    src={imageItems[0].src}
                    className="w-full h-full object-cover"
                    alt="Primary"
                  />
                  <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Primary
                  </div>
                </div>
              </div>
            )}

            {/* Thumbnails grid */}
            <div className="flex flex-wrap gap-3 mb-3">
              {imageItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 shadow-sm transition ${
                    idx === 0 ? "border-yellow-400" : "border-gray-200"
                  }`}
                >
                  <img src={item.src} className="w-full h-full object-cover" alt="" loading="lazy" />

                  {/* Star button — set as primary */}
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      title="Set as primary image"
                      className="absolute top-1 left-1 bg-white/80 hover:bg-yellow-400 hover:text-white text-gray-500 rounded-full w-6 h-6 flex items-center justify-center transition"
                    >
                      <Star className="w-3 h-3" />
                    </button>
                  )}

                  {/* Primary badge */}
                  {idx === 0 && (
                    <div className="absolute top-1 left-1 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Add more */}
              {imageItems.length < 15 && (
                <label
                  htmlFor="car-images"
                  className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 flex flex-col items-center justify-center text-gray-400 hover:text-green-500 cursor-pointer transition"
                >
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-xs">Add</span>
                </label>
              )}
            </div>

            {/* Empty state */}
            {imageItems.length === 0 && (
              <label
                htmlFor="car-images"
                className={`block cursor-pointer border-2 border-dashed rounded-xl transition p-4 bg-gray-50 ${
                  errors.images ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-green-500"
                }`}
              >
                <div className="flex flex-col items-center py-8 text-gray-400">
                  <Upload className="w-10 h-10 mb-2" />
                  <p className="text-sm font-medium">Click to upload images</p>
                  <p className="text-xs mt-1">PNG, JPG, WEBP up to 5MB each</p>
                </div>
              </label>
            )}

            <input
              type="file" id="car-images" multiple accept="image/*"
              onChange={handleImagesChange} className="hidden"
            />

            <p className="text-xs text-gray-400 mt-2">
              Click the <Star className="w-3 h-3 inline text-yellow-500 fill-yellow-400" /> star on any image to make it the primary (first shown) image.
            </p>
            <ErrorMsg msg={errors.images} />
          </div>
        </Section>

        {/* ── BASIC INFO ── */}
        <Section icon={<Car className="w-5 h-5" />} title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Make (e.g. Ford)"     name="name"         value={formData.name}         onChange={handleChange} placeholder="Ford"      required error={errors.name} />
            <Field label="Model (e.g. KA)"      name="model"        value={formData.model}        onChange={handleChange} placeholder="KA"        required error={errors.model} />
            <Field label="Variant (e.g. Zetec)" name="variant"      value={formData.variant}      onChange={handleChange} placeholder="Zetec Black Edition" />
            <Field label="Year"                 name="year"         value={formData.year}         onChange={handleChange} placeholder="2015"      type="number" required error={errors.year} />
            <Field label="Price (£)"            name="price"        value={formData.price}        onChange={handleChange} placeholder="2695"      type="number" required error={errors.price} />
            <Field label="Registration"         name="registration" value={formData.registration} onChange={handleChange} placeholder="AB15 XYZ"  required error={errors.registration} />
            <Field label="Mileage"              name="mileage"      value={formData.mileage}      onChange={handleChange} placeholder="57887"     type="number" required error={errors.mileage} />
          </div>
        </Section>

        {/* ── SPECS ── */}
        <Section icon={<Settings className="w-5 h-5" />} title="Vehicle Specifications">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Fuel Type"    name="fuelType"     value={formData.fuelType}     onChange={handleChange} options={["Petrol","Diesel","Electric","Hybrid","Plug-in Hybrid"]} required error={errors.fuelType} />
            <SelectField label="Transmission" name="transmission" value={formData.transmission} onChange={handleChange} options={["Manual","Automatic","Semi-Automatic"]}                 required error={errors.transmission} />
            <SelectField label="Body Type"    name="bodyType"     value={formData.bodyType}     onChange={handleChange} options={["Hatchback","Saloon","Estate","SUV","Coupe","Convertible","Van","MPV"]} required error={errors.bodyType} />
            <Field label="Engine (e.g. 1.2L)" name="engine" value={formData.engine} onChange={handleChange} placeholder="1.2L"          required error={errors.engine} />
            <Field label="Colour"             name="colour" value={formData.colour} onChange={handleChange} placeholder="Midnight Black" required error={errors.colour} />

            {/* ULEZ Toggle */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">ULEZ Compliant</label>
              <div className="flex items-center gap-3 mt-1">
                <button
                  type="button"
                  onClick={toggleUlez}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    formData.ulez ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                      formData.ulez ? "left-7" : "left-1"
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${formData.ulez ? "text-green-600" : "text-gray-400"}`}>
                  {formData.ulez ? "Yes — ULEZ Compliant" : "No — Not ULEZ Compliant"}
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── DESCRIPTION ── */}
        <Section icon={<Car className="w-5 h-5" />} title="Description">
          <div data-error="description">
            <textarea
              name="description" value={formData.description} onChange={handleChange}
              rows="5"
              placeholder="e.g. This stunning 2015 Ford KA Zetec Black Edition comes in beautiful Midnight Black with full service history, one previous owner, and drives superbly."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm transition ${
                errors.description ? "border-red-400 bg-red-50" : "border-gray-300"
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              <ErrorMsg msg={errors.description} />
              <span className={`text-xs ml-auto ${formData.description.length < 20 ? "text-gray-400" : "text-green-600"}`}>
                {formData.description.length} chars
              </span>
            </div>
          </div>
        </Section>

        {/* ── FEATURES ── */}
        <Section icon={<Plus className="w-5 h-5" />} title="Highlight Features">
          <div className="space-y-2" data-error="features">
            {features.map((f, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text" value={f}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder={
                    idx === 0 ? "e.g. Full Service History" :
                    idx === 1 ? "e.g. 1 Previous Owner" :
                    idx === 2 ? "e.g. 12 Months MOT" :
                    idx === 3 ? "e.g. Bluetooth Connectivity" :
                    "e.g. Parking Sensors"
                  }
                  className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition ${
                    submitted && !f.trim() ? "border-orange-300 bg-orange-50" : "border-gray-300"
                  }`}
                />
                <button type="button" onClick={() => removeFeature(idx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <ErrorMsg msg={errors.features} />
            <button type="button" onClick={addFeature}
              className="flex items-center gap-1 text-green-600 text-sm hover:underline mt-1">
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>
        </Section>

        {/* ── UNDER THE BONNET ── */}
        <Section icon={<Settings className="w-5 h-5" />} title="Under the Bonnet Data">
          <p className="text-xs text-gray-400 mb-3">
            Pre-filled with example values — update them to match this car. Leave both title and value empty to hide a row.
          </p>
          <div className="space-y-2" data-error="bonnet">
            {bonnetData.map((b, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-1 flex justify-center">
                  <img src={b.icon} alt="" className="w-6 h-6 opacity-50" loading="lazy"
                    onError={(e) => (e.target.style.display = "none")} />
                </div>
                <input
                  value={b.title}
                  onChange={(e) => updateBonnet(idx, "title", e.target.value)}
                  placeholder="Title e.g. Fuel Type"
                  className={`col-span-5 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition ${
                    errors.bonnet ? "border-orange-300" : "border-gray-300"
                  }`}
                />
                <input
                  value={b.value}
                  onChange={(e) => updateBonnet(idx, "value", e.target.value)}
                  placeholder="Value e.g. Petrol"
                  className={`col-span-5 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition ${
                    errors.bonnet ? "border-orange-300" : "border-gray-300"
                  }`}
                />
                <button type="button" onClick={() => removeBonnetRow(idx)}
                  className="col-span-1 p-1 text-red-400 hover:text-red-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {errors.bonnet && errors.bonnet.map((msg, i) => <ErrorMsg key={i} msg={msg} />)}
            <button type="button" onClick={addBonnetRow}
              className="flex items-center gap-1 text-green-600 text-sm hover:underline mt-1">
              <Plus className="w-4 h-4" /> Add Row
            </button>
          </div>
        </Section>

        {/* ── SUBMIT ── */}
        <div className="pt-2 pb-6 flex flex-col sm:flex-row items-start gap-3">
          <button type="submit" disabled={loading}
            className="w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg transition-all disabled:opacity-60">
            {loading ? "Adding..." : "Add Car"}
          </button>
          {submitted && Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Please fix {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? "s" : ""} above</span>
            </div>
          )}
        </div>

      </form>
    </div>
  );
};

// ── Helpers ──

const Section = ({ icon, title, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-gray-700 font-semibold border-b pb-2">
      {icon}<span>{title}</span>
    </div>
    {children}
  </div>
);

const Field = ({ label, name, value, onChange, placeholder, type = "text", required, error }) => (
  <div data-error={name}>
    <label className="block text-xs text-gray-500 mb-1">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    <input
      type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition ${
        error ? "border-red-400 bg-red-50" : "border-gray-300"
      }`}
    />
    <ErrorMsg msg={error} />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required, error }) => (
  <div data-error={name}>
    <label className="block text-xs text-gray-500 mb-1">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    <select name={name} value={value} onChange={onChange}
      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white transition ${
        error ? "border-red-400 bg-red-50" : "border-gray-300"
      }`}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    <ErrorMsg msg={error} />
  </div>
);

const ErrorMsg = ({ msg }) =>
  msg ? (
    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />{msg}
    </p>
  ) : null;

export default AddCar;