import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, DollarSign, Layers, Tag, X, Package } from "lucide-react";

const EditProduct = ({ url, existingData, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    count: "",
    category: "",
    isBestSelling: ""
  });

  const [images, setImages] = useState([]); // New or existing images
  const [previews, setPreviews] = useState([]); // Image previews
  const [removeImages, setRemoveImages] = useState([]); // Images marked for removal

  // Initialize form data when modal opens
  useEffect(() => {
    if (existingData) {
      setFormData({
        name: existingData.name,
        description: existingData.description,
        price: existingData.price,
        count: existingData.count,
        category: existingData.category,
        isBestSelling: existingData.isBestSelling,
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
    if (typeof img === "string") setRemoveImages(prev => [...prev, img]);
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
      data.append("count", formData.count);
      data.append("category", formData.category);
      data.append("isBestSelling", formData.isBestSelling);
      data.append("removeImages", JSON.stringify(removeImages));

      images.forEach(img => {
        if (img instanceof File) data.append("images", img);
      });
   const token = localStorage.getItem("token");
      const res = await axios.put(`${url}/api/products/${existingData._id}`, data, {
  headers: { 
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${token}` 
  },
});
      if (res.data.success) {
        toast.success(res.data.message);
        onSuccess();
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 lg:p-10 overflow-auto max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Images */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <Upload className="w-5 h-5" />
              <label>Upload Images (Max 5)</label>
            </div>
            <div className="relative">
              <label
                htmlFor="images"
                className="group cursor-pointer w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all duration-300 overflow-hidden flex items-center justify-center bg-gray-50"
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
            <label className="flex items-center gap-2 text-gray-700 font-semibold"><Package /> Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300" required />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700 font-semibold"><Tag /> Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 resize-none" required />
          </div>

          {/* Price & Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">£ Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300" required />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-700 font-semibold"><Layers /> Count</label>
              <input type="number" name="count" value={formData.count} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300" required />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700 font-semibold"><Tag /> Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300" required />
          </div>
          {/* Best Selling Toggle */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <input
              type="checkbox"
              id="isBestSelling"
              name="isBestSelling"
              checked={formData.isBestSelling}
              onChange={(e) => setFormData(prev => ({ ...prev, isBestSelling: e.target.checked }))}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="isBestSelling" className="text-gray-700 font-semibold cursor-pointer select-none">
              Mark as <span className="text-[#B62025] dark:text-[#FF4B4B]">Best Selling</span> Product
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
              Update Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;
