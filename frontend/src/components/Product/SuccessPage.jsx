import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Package,
  ShoppingBag,
  Loader2,
  AlertCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SuccessPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const session_id = searchParams.get("session_id");
      if (!session_id) return;

      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(
          `${API_URL}/api/stripe/checkout-success?session_id=${session_id}`
        );
        const data = await res.json();

        if (data.success) {
          setOrder(data.order);

          // CLEAR CART AFTER SUCCESS
          localStorage.removeItem("cart");

          // Trigger Navbar update
          window.dispatchEvent(new Event("storage"));

          toast.success("Order confirmed!");
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        toast.error("Failed to fetch order.");
      }
    };

    fetchOrder();
  }, [searchParams]);

  // ---------------- Loading State ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-50 via-white to-green-50 p-4">
        <Toaster position="top-right" />
        <div className="text-center space-y-6">
          <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-full h-full rounded-full flex items-center justify-center bg-linear-to-br from-[#317F21] to-green-600 shadow-lg">
              <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 animate-pulse">
            Processing Your Order
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-sm mx-auto">
            Please wait while we confirm your payment and prepare your order details...
          </p>
          <div className="flex justify-center gap-2">
            {[0, 0.2, 0.4].map((delay, idx) => (
              <div
                key={idx}
                className="w-2 h-2 md:w-3 md:h-3 bg-[#317F21] rounded-full animate-bounce"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Error State ----------------
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-red-50 via-white to-red-50 p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto">
            <div className="relative w-full h-full rounded-full flex items-center justify-center bg-linear-to-br from-red-500 to-red-600 shadow-lg animate-shake">
              <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Order Not Found</h2>
          <p className="text-gray-600 text-sm md:text-base">
            We couldn't find your order. This might be due to an invalid session or the order might have expired.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
          >
            <ShoppingBag className="w-5 h-5" />
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  // ---------------- Success State ----------------
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-50 py-8 md:py-12 px-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-slideDown">
          <div className="relative inline-block">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mt-20">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-linear-to-br from-[#317F21] to-green-600 rounded-full w-full h-full flex items-center justify-center shadow-lg animate-scaleIn">
                <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p className="text-gray-700 text-base md:text-lg">
            Thank you, <span className="font-semibold text-green-600">{order.user}</span>! Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fadeInUp">
          <div className="bg-linear-to-r from-[#317F21] to-green-600 px-6 md:px-8 py-4 md:py-6">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 md:w-6 md:h-6" />
              Order Summary
            </h2>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Customer Info */}
            {(order.email || order.phone || order.address) && (
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 space-y-3">
                <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-3">Customer Information</h3>
                {order.email && (
                  <div className="flex items-center gap-3 text-sm md:text-base">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />
                    <span className="text-gray-700 break-all">{order.email}</span>
                  </div>
                )}
                {order.phone && (
                  <div className="flex items-center gap-3 text-sm md:text-base">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />
                    <span className="text-gray-700">{order.phone}</span>
                  </div>
                )}
                {order.address && (
                  <div className="flex items-start gap-3 text-sm md:text-base">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0 mt-1" />
                    <span className="text-gray-700">{order.address}</span>
                  </div>
                )}
                {order.createdAt && (
                  <div className="flex items-center gap-3 text-sm md:text-base">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />
                    <span className="text-gray-700">
                      {new Date(order.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Products */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                Items Ordered
              </h3>
              <div className="space-y-2">
                {order.products.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-slideInLeft"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-gray-800 text-sm md:text-base block">{item.name}</span>
                      <span className="text-xs md:text-sm text-gray-500">Quantity: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-green-600 text-sm md:text-base ml-4">£{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-gray-200" />
            <div className="flex justify-between items-center p-4 md:p-6 bg-linear-to-r from-green-50 to-green-100 rounded-xl">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                <span className="font-bold text-gray-800 text-lg md:text-xl">Total Paid:</span>
              </div>
              <span className="font-bold text-green-600 text-2xl md:text-3xl">£{order.amount}</span>
            </div>

            {order.payment_status && (
              <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                <span className="text-sm md:text-base font-medium text-green-700 capitalize">
                  Payment Status: {order.payment_status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp">
          <button
            onClick={() => navigate("/product")}
            className="w-full sm:w-auto bg-linear-to-r from-[#317F21] to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-2 animate-fadeIn">
          <p className="text-gray-600 text-sm md:text-base">
            A confirmation email has been sent to your email address.
          </p>
          <p className="text-gray-500 text-xs md:text-sm">Need help? Contact our support team anytime.</p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from {opacity:0;} to {opacity:1;} }
        @keyframes slideDown { from {opacity:0; transform:translateY(-30px);} to {opacity:1; transform:translateY(0);} }
        @keyframes fadeInUp { from {opacity:0; transform:translateY(30px);} to {opacity:1; transform:translateY(0);} }
        @keyframes slideInLeft { from {opacity:0; transform:translateX(-20px);} to {opacity:1; transform:translateX(0);} }
        @keyframes scaleIn { from {transform:scale(0);} to {transform:scale(1);} }
        @keyframes shake { 0%,100%{transform:rotate(0deg);} 25%{transform:rotate(-10deg);} 75%{transform:rotate(10deg);} }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.5s ease-out forwards; opacity:0; }
        .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
