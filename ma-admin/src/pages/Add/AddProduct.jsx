import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, DollarSign, Tag, Car } from "lucide-react";

const AddProduct = ({ url }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    count: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Image change
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  // Remove selected image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price || !formData.count || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }
    if (images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    images.forEach((img) => data.append("images", img));
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${url}/api/products`, data, {
  headers: { 
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${token}` 
  },
});
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ name: "", description: "", price: "", count: "", category: "" });
        setImages([]);
        setPreviews([]);
      } else {
        toast.error(res.data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading product");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details below to add a new product to your inventory</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-8">

            {/* Image Upload */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Upload className="w-5 h-5" />
                <label>Upload Images (Max 5)</label>
              </div>

              <label
                htmlFor="images"
                className="group cursor-pointer  w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all duration-300 overflow-hidden flex items-center justify-center bg-gray-50"
              >
                {previews.length > 0 ? (
                  <div className="flex flex-wrap gap-3 p-2 overflow-auto max-h-64">
                    {previews.map((src, idx) => (
                      <div key={idx} className="relative w-28 h-28 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                        <span
                          className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center cursor-pointer hover:bg-red-600"
                          onClick={(e) => {
                            e.preventDefault();
                            removeImage(idx);
                          }}
                        >
                          &times;
                        </span>
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
                <input type="file" id="images" multiple accept="image/*" onChange={handleImagesChange} className="hidden" />
              </label>
            </div>

            {/* Name */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Car className="w-5 h-5" />
                <label htmlFor="name">Product Name</label>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Car className="w-5 h-5" />
                <label htmlFor="description">Description</label>
              </div>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write detailed description here..."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 resize-none"
              />
            </div>

            {/* Price and Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <DollarSign className="w-5 h-5" />
                  <label htmlFor="price">Price</label>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="20000"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Tag className="w-5 h-5" />
                  <label htmlFor="count">Stock Count</label>
                </div>
                <input
                  type="number"
                  name="count"
                  id="count"
                  value={formData.count}
                  onChange={handleChange}
                  placeholder="10"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Tag className="w-5 h-5" />
                <label htmlFor="category">Category</label>
              </div>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Product
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
