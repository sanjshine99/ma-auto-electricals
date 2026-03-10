import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, Car, Plus, Trash2, Settings, X, AlertCircle, Star } from "lucide-react";

const validate = (formData, images) => {
  const errors = {};

  if (!formData.name.trim())        errors.name         = "Make is required (e.g. Ford)";
  if (!formData.model.trim())       errors.model        = "Model is required (e.g. KA)";
  if (
    !formData.year ||
    isNaN(formData.year) ||
    formData.year < 1900 ||
    formData.year > new Date().getFullYear() + 1
  )
    errors.year = `Year must be between 1900 and ${new Date().getFullYear() + 1}`;

  if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
    errors.price = "Price must be a positive number";

  if (!formData.registration.trim()) errors.registration = "Registration is required";

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

  if (images.length === 0)
    errors.images = "At least one image is required";

  return errors;
};

const EditCar = ({ url, existingData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "", model: "", variant: "", year: "", price: "",
    monthlyPayment: "", registration: "", mileage: "",
    fuelType: "Petrol", transmission: "Manual", bodyType: "Hatchback",
    engine: "", colour: "", description: "",
    ulez: false,
  });

  // Each entry: { src: string (preview URL), raw: File | string (filename), isNew: bool }
  const [imageItems,   setImageItems]   = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const [primaryIdx,   setPrimaryIdx]   = useState(0); // index of the primary/first image
  const [features,     setFeatures]     = useState([""]);
  const [bonnetData,   setBonnetData]   = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [errors,       setErrors]       = useState({});
  const [submitted,    setSubmitted]    = useState(false);

  useEffect(() => {
    if (!existingData) return;
    setFormData({
      name:           existingData.name           || "",
      model:          existingData.model          || "",
      variant:        existingData.variant        || "",
      year:           existingData.year           || "",
      price:          existingData.price          || "",
      monthlyPayment: existingData.monthlyPayment || "",
      registration:   existingData.registration   || "",
      mileage:        existingData.mileage        || "",
      fuelType:       existingData.fuelType       || "Petrol",
      transmission:   existingData.transmission   || "Manual",
      bodyType:       existingData.bodyType       || "Hatchback",
      engine:         existingData.engine         || "",
      colour:         existingData.colour         || "",
      description:    existingData.description    || "",
      ulez:           existingData.ulez           || false,
    });

    const existing = (existingData.images || []).map((img) => ({
      src:   `${url}/images/${img}`,
      raw:   img,
      isNew: false,
    }));
    setImageItems(existing);
    setPrimaryIdx(0);

    setFeatures(existingData.features?.length ? existingData.features : [""]);
    setBonnetData(
      existingData.bonnetData?.length
        ? existingData.bonnetData
        : [
            { icon: "/fueltype.svg",  title: "Fuel Type",      value: "" },
            { icon: "/engine.svg",    title: "Engine Size",    value: "" },
            { icon: "/power.svg",     title: "Max Power",      value: "" },
            { icon: "/speed.svg",     title: "Top Speed",      value: "" },
            { icon: "/emissions.svg", title: "CO₂ Emissions",  value: "" },
            { icon: "/mpg.svg",       title: "Combined MPG",   value: "" },
            { icon: "/mot.svg",       title: "MOT Expiry",     value: "" },
            { icon: "/tax.svg",       title: "Road Tax (12m)", value: "" },
          ]
    );
    setRemoveImages([]);
    setErrors({});
    setSubmitted(false);
  }, [existingData, url]);

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
    const newItems = files.map((f) => ({
      src:   URL.createObjectURL(f),
      raw:   f,
      isNew: true,
    }));
    setImageItems((prev) => [...prev, ...newItems]);
    clearError("images");
  };

  // Remove an image
  const handleRemoveImage = (idx) => {
    const item = imageItems[idx];
    if (!item.isNew) {
      setRemoveImages((prev) => [...prev, item.raw]);
    }
    setImageItems((prev) => prev.filter((_, i) => i !== idx));
    // Adjust primaryIdx if needed
    setPrimaryIdx((prev) => {
      if (idx === prev) return 0;
      if (idx < prev)  return prev - 1;
      return prev;
    });
    clearError("images");
  };

  // Set primary image — moves it to index 0
  const handleSetPrimary = (idx) => {
    setImageItems((prev) => {
      const updated = [...prev];
      const [picked] = updated.splice(idx, 1);
      updated.unshift(picked);
      return updated;
    });
    setPrimaryIdx(0);
  };

  const addFeature    = () => setFeatures((prev) => [...prev, ""]);
  const removeFeature = (idx) => setFeatures((prev) => prev.filter((_, i) => i !== idx));
  const updateFeature = (idx, val) =>
    setFeatures((prev) => prev.map((f, i) => (i === idx ? val : f)));

  const updateBonnet    = (idx, field, val) =>
    setBonnetData((prev) => prev.map((b, i) => (i === idx ? { ...b, [field]: val } : b)));
  const addBonnetRow    = () =>
    setBonnetData((prev) => [...prev, { icon: "/fueltype.svg", title: "", value: "" }]);
  const removeBonnetRow = (idx) =>
    setBonnetData((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(formData, imageItems);
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
    data.append("features",     JSON.stringify(features.filter((f) => f.trim())));
    data.append("bonnetData",   JSON.stringify(bonnetData.filter((b) => b.title && b.value)));
    data.append("removeImages", JSON.stringify(removeImages));

    // Send existing filenames in order (primary first)
    const orderedExisting = imageItems
      .filter((item) => !item.isNew)
      .map((item) => item.raw);
    data.append("orderedImages", JSON.stringify(orderedExisting));

    // Send new files
    imageItems
      .filter((item) => item.isNew)
      .forEach((item) => data.append("images", item.raw));

    try {
      const res = await axios.put(`${url}/api/cars/${existingData._id}`, data, {
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
      toast.error("Failed to update car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-6 px-4 sm:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Edit Car</h1>
        <p className="text-gray-500 text-sm">Update the details and click "Update Car"</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>

        {/* ── IMAGES ── */}
        <Section icon={<Upload className="w-5 h-5" />} title="Car Images">
          <div data-error="images">

            {/* Primary image large preview */}
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

            {/* All images grid */}
            <div className="flex flex-wrap gap-3 mb-3">
              {imageItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 shadow-sm transition ${
                    idx === 0
                      ? "border-yellow-400"
                      : "border-gray-200"
                  }`}
                >
                  <img src={item.src} className="w-full h-full object-cover" alt="" />

                  {/* Star / Set Primary button */}
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

                  {/* Primary badge (index 0) */}
                  {idx === 0 && (
                    <div className="absolute top-1 left-1 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* New badge */}
                  {item.isNew && (
                    <div className="absolute bottom-0 left-0 right-0 bg-green-500/80 text-white text-center text-[10px] py-0.5 font-semibold">
                      NEW
                    </div>
                  )}
                </div>
              ))}

              {/* Add more button */}
              <label
                htmlFor="edit-car-images"
                className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 flex flex-col items-center justify-center text-gray-400 hover:text-green-500 cursor-pointer transition"
              >
                <Upload className="w-5 h-5 mb-1" />
                <span className="text-xs">Add</span>
              </label>
            </div>

            {/* Empty state */}
            {imageItems.length === 0 && (
              <label
                htmlFor="edit-car-images"
                className="block cursor-pointer border-2 border-dashed border-gray-300 hover:border-green-500 rounded-xl p-4 bg-gray-50 transition"
              >
                <div className="flex flex-col items-center py-8 text-gray-400">
                  <Upload className="w-10 h-10 mb-2" />
                  <p className="text-sm">Click to add images</p>
                </div>
              </label>
            )}

            <input
              type="file" id="edit-car-images" multiple accept="image/*"
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
            <Field label="Make"         name="name"         value={formData.name}         onChange={handleChange} placeholder="Ford"      required error={errors.name} />
            <Field label="Model"        name="model"        value={formData.model}        onChange={handleChange} placeholder="KA"        required error={errors.model} />
            <Field label="Variant"      name="variant"      value={formData.variant}      onChange={handleChange} placeholder="Zetec Black Edition" />
            <Field label="Year"         name="year"         value={formData.year}         onChange={handleChange} placeholder="2015"      type="number" required error={errors.year} />
            <Field label="Price (£)"    name="price"        value={formData.price}        onChange={handleChange} placeholder="2695"      type="number" required error={errors.price} />
            <Field label="Registration" name="registration" value={formData.registration} onChange={handleChange} placeholder="AB15 XYZ"  required error={errors.registration} />
            <Field label="Mileage"      name="mileage"      value={formData.mileage}      onChange={handleChange} placeholder="57887"     type="number" required error={errors.mileage} />
          </div>
        </Section>

        {/* ── SPECS ── */}
        <Section icon={<Settings className="w-5 h-5" />} title="Vehicle Specifications">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Fuel Type"    name="fuelType"     value={formData.fuelType}     onChange={handleChange} options={["Petrol","Diesel","Electric","Hybrid","Plug-in Hybrid"]} required error={errors.fuelType} />
            <SelectField label="Transmission" name="transmission" value={formData.transmission} onChange={handleChange} options={["Manual","Automatic","Semi-Automatic"]}                 required error={errors.transmission} />
            <SelectField label="Body Type"    name="bodyType"     value={formData.bodyType}     onChange={handleChange} options={["Hatchback","Saloon","Estate","SUV","Coupe","Convertible","Van","MPV"]} required error={errors.bodyType} />
            <Field label="Engine (e.g. 1.2L)" name="engine" value={formData.engine} onChange={handleChange} placeholder="1.2L"          required error={errors.engine} />
            <Field label="Colour"             name="colour" value={formData.colour} onChange={handleChange} placeholder="Black"          required error={errors.colour} />

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
              rows="5" placeholder="Detailed description..."
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
          <div className="space-y-2">
            {features.map((f, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text" value={f}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder="e.g. Full Service History"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
                <button type="button" onClick={() => removeFeature(idx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
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
                    onError={(e) => (e.target.style.display = "none")} />
                </div>
                <input value={b.title} onChange={(e) => updateBonnet(idx, "title", e.target.value)}
                  placeholder="Title"
                  className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                <input value={b.value} onChange={(e) => updateBonnet(idx, "value", e.target.value)}
                  placeholder="Value"
                  className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                <button type="button" onClick={() => removeBonnetRow(idx)}
                  className="col-span-1 p-1 text-red-400 hover:text-red-600">
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

        {/* ── SUBMIT ── */}
        <div className="pt-2 pb-6 flex flex-col sm:flex-row items-start gap-3">
          <button type="submit" disabled={loading}
            className="w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg transition-all disabled:opacity-60">
            {loading ? "Updating..." : "Update Car"}
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

export default EditCar;