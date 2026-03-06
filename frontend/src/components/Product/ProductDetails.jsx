import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id, API_URL]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setInCart(cart.some((item) => item._id === id));
  }, [id]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-[#317F21] border-gray-200 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading product...</p>
        </div>
      </div>
    );

  const handleCartToggle = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (inCart) {
      const updatedCart = cart.filter((item) => item._id !== product._id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setInCart(false);
      toast.error(`${product.name} removed from cart`);
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      setInCart(true);
      toast.success(`${product.name} added to cart`);
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 py-20">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 pt-15 text-[#317F21] font-semibold mb-6 hover:text-[#3ad81a] transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
          {/* Improved Image Area */}
          <div className="bg-gray-100 flex items-center justify-center p-8">
            <div className="relative w-full aspect-square max-h-[400px]">
              <img
                src={`${API_URL}/images/${product.images[0]}`}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              <p className="text-4xl font-extrabold text-[#317F21]">£{product.price.toFixed(2)}</p>
            </div>

            <button
              onClick={handleCartToggle}
              className={`mt-8 flex items-center justify-center gap-3 text-white text-lg font-semibold py-4 rounded-xl transition ${
                inCart ? "bg-red-500 hover:bg-red-600" : "bg-[#317F21] hover:bg-[#3ad81a]"
              }`}
            >
              <ShoppingCart />
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}