import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, Calendar, Car, DollarSign, X } from "lucide-react";

const EditCar = ({ url, existingData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    year: "",
    model: "",
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);

  useEffect(() => {
    if (existingData) {
      setFormData({
        name: existingData.name,
        description: existingData.description,
        price: existingData.price,
        year: existingData.year,
        model: existingData.model,
      });
      setImages(existingData.images || []);
      setPreviews(existingData.images ? existingData.images.map(img => `${url}/images/${img}`) : []);
      setRemoveImages([]);
    }
  }, [existingData, url]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const handleRemoveImage = (idx) => {
    const img = images[idx];
    if (typeof img === "string") {
      setRemoveImages(prev => [...prev, img]);
    }
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(idx, 1);
    newPreviews.splice(idx, 1);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("year", formData.year);
      data.append("model", formData.model);
      data.append("removeImages", JSON.stringify(removeImages));

      images.forEach(img => {
        if (img instanceof File) data.append("images", img);
      });

      const res = await axios.put(`${url}/api/cars/${existingData._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        onSuccess();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update car");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Edit Car</h1>
          <p className="text-gray-600">Update the details below and click "Update Car"</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-8">

            {/* Images */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Upload className="w-5 h-5" />
                <label>Upload Images (Max 5)</label>
              </div>
              <div className="relative">
                <label
                  htmlFor="images"
                  className="group cursor-pointer w-full sm:w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all duration-300 overflow-hidden flex items-center justify-center bg-gray-50"
                >
                  {previews.length > 0 ? (
                    <div className="flex flex-wrap gap-3 p-2 overflow-auto max-h-64">
                      {previews.map((src, idx) => (
                        <div key={idx} className="relative w-28 h-28 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                          <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                            onClick={(e) => { e.preventDefault(); handleRemoveImage(idx); }}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 group-hover:text-blue-500 transition-colors">
                      <Upload className="w-12 h-12 mb-2" />
                      <p className="text-sm font-medium">Click to upload</p>
                      <p className="text-xs mt-1">PNG, JPG up to 10MB each</p>
                    </div>
                  )}
                </label>
                <input type="file" id="images" multiple accept="image/*" onChange={handleImagesChange} className="hidden" />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold"><Car className="w-5 h-5" /><label htmlFor="name">Car Name</label></div>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Enter car name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300" />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold"><Car className="w-5 h-5" /><label htmlFor="description">Description</label></div>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Write detailed description..." required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 resize-none" />
            </div>

            {/* Price & Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold"><DollarSign className="w-5 h-5" /><label htmlFor="price">Price</label></div>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} placeholder="20000" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold"><Calendar className="w-5 h-5" /><label htmlFor="year">Year</label></div>
                <input type="number" name="year" id="year" value={formData.year} onChange={handleChange} placeholder="2023" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300" />
              </div>
            </div>

            {/* Model */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold"><Car className="w-5 h-5" /><label htmlFor="model">Model</label></div>
              <input type="text" name="model" id="model" value={formData.model} onChange={handleChange} placeholder="Model name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300" />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Update Car</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCar;
