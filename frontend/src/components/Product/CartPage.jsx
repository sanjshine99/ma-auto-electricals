import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Load cart from localStorage and ensure count is included
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add default count if missing
    const updatedCart = storedCart.map((item) => ({
      ...item,
      count: item.count ?? 0, // stock count from backend
    }));
    setCart(updatedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleIncrease = (id) => {
    const item = cart.find((c) => c._id === id);
    if (!item) return;

    if (item.count === 0) {
      toast.error(`${item.name} is out of stock`, { duration: 2000 });
      return;
    }

    if (item.quantity >= item.count) {
      toast.error(`Only ${item.count} item(s) available`, { duration: 2000 });
      return;
    }

    updateCart(
      cart.map((c) =>
        c._id === id ? { ...c, quantity: c.quantity + 1 } : c
      )
    );
  };

  const handleDecrease = (id) => {
    updateCart(
      cart.map((c) =>
        c._id === id ? { ...c, quantity: Math.max(1, c.quantity - 1) } : c
      )
    );
  };

  const handleRemove = (id) => {
    updateCart(cart.filter((c) => c._id !== id));
    toast.error("Removed from cart", { duration: 1500 });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const validateForm = () => {
    const { name, email, address, phone } = userDetails;
    if (!name.trim()) return toast.error("Name is required", { duration: 1500 }) && false;
    if (!email.trim()) return toast.error("Email is required", { duration: 1500 }) && false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email format", { duration: 1500 }) && false;
    if (!address.trim()) return toast.error("Address is required", { duration: 1500 }) && false;
    if (!phone.trim()) return toast.error("Phone is required", { duration: 1500 }) && false;
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) return toast.error("Phone number is invalid", { duration: 1500 }) && false;
    return true;
  };

  const handleContinueToPayment = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, userDetails }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Checkout failed", { duration: 2000 });
        return;
      }

      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error("Payment failed", { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-28">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <ShoppingCart size={28} /> Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            Cart is empty
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition"
              >
                <img
                  src={`${API_URL}/images/${item.images?.[0]}`}
                  alt={item.name}
                  loading="lazy"
                  className="w-40 h-40 object-cover rounded-xl cursor-pointer"
                  onClick={() => navigate(`/products/${item._id}`)}
                />
                <div className="flex-1 flex flex-col gap-2 w-full">
                  <h2
                    className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-[#317F21]"
                    onClick={() => navigate(`/products/${item._id}`)}
                  >
                    {item.name}
                  </h2>
                  <p className="text-gray-500">{item.description}</p>
                  <p className="text-2xl font-bold text-[#317F21]">
                    £{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="bg-gray-200 p-1 rounded hover:bg-gray-300 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 border rounded">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item._id)}
                      className={`bg-gray-200 p-1 rounded hover:bg-gray-300 transition ${item.quantity >= item.count ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      disabled={item.quantity >= item.count || item.count === 0}
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="ml-auto text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {item.count === 0 && (
                    <p className="text-red-600 font-semibold mt-2">Out of stock</p>
                  )}
                  {item.quantity > item.count && item.count > 0 && (
                    <p className="text-red-600 font-semibold mt-2">
                      Only {item.count} item(s) available
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <span className="text-xl font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-[#317F21]">
                £{totalPrice.toFixed(2)}
              </span>
              <button
                onClick={() => setShowCheckout(true)}
                className="bg-[#317F21] hover:bg-[#3ad81a] text-white font-semibold py-3 px-6 rounded-xl transition"
              >
                Buy Now
              </button>
            </div>

            {showCheckout && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative shadow-2xl">
                  <button
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 transition-colors"
                    onClick={() => setShowCheckout(false)}
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="border p-3 rounded-md w-full"
                      value={userDetails.name}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-3 rounded-md w-full"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, email: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="border p-3 rounded-md w-full"
                      value={userDetails.address}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, address: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="border p-3 rounded-md w-full"
                      value={userDetails.phone}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, phone: e.target.value })
                      }
                    />
                    <button
                      onClick={handleContinueToPayment}
                      className="bg-[#317F21] hover:bg-[#3ad81a] text-white font-semibold py-3 rounded-xl transition"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
