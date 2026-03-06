import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi"; 

export default function ProductSellers() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://ma-auto-electricals.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        const allProducts = Array.isArray(data) ? data : data.data;

        if (allProducts) {
          const filteredSellers = allProducts.filter((item) => item.isBestSelling === true);
          setProducts(filteredSellers);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20 font-semibold text-green-600">Loading Best Sellers...</div>;
  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-gray-900 border-l-4 border-green-500 pl-4">
          OUR <span className="text-green-600">BEST SELLERS</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-5 flex flex-col transition-all duration-300"
            >
              <div className="mb-3">
                <span className="bg-[#aaee9d] text-[#317F21] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-tighter">
                  Best Seller
                </span>
              </div>

              <div className="flex justify-center items-center mb-5 h-44 overflow-hidden">
                <img
                  src={`${BASE_URL}/images/${product.images[0]}`}
                  alt={product.name}
                  className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="mt-auto">
                <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 h-10 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-extrabold text-green-600">
                    £{product.price.toFixed(2)}
                  </span>
                  
                  {/* Updated Arrow Button */}
                  <button 
                    onClick={() => navigate(`/product`)}
                    className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-300"
                    aria-label="View product details"
                  >
                    <HiArrowRight className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}