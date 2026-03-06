import React, { useEffect, useState, useRef, useCallback } from "react";
import { ChevronRight, X, Search, ChevronDown, SlidersHorizontal, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const PAGE_SIZE_OPTIONS = [12, 24, 48, 96];
const DEFAULT_PAGE_SIZE = 24;

function CategoryAccordion({ categories, localCats, isAll, toggleCat }) {
  const [open, setOpen] = useState(true);
  const activeCount = isAll ? 0 : localCats.length;

  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between text-sm font-bold text-gray-900"
      >
        <span>
          Product Category
          {activeCount > 0 && (
            <sup className="ml-1 text-[10px] text-[#317F21] font-bold">{activeCount}</sup>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 space-y-1">
          {categories
            .filter((c) => c.value !== "All")
            .map((cat) => {
              const active = localCats.some((c) => c.value === cat.value);
              return (
                <button
                  key={cat.value}
                  onClick={() => toggleCat(cat)}
                  className="w-full flex items-center gap-3 px-1 py-2.5 text-sm text-gray-700 hover:text-gray-900 transition-colors text-left"
                >
                  <span
                    className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                      active ? "bg-gray-900 border-gray-900" : "border-gray-300"
                    }`}
                  >
                    {active && (
                      <svg width="8" height="6" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  {cat.label}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}

function FilterSidebar({ open, onClose, categories, selectedCategories, onChange, sortOption, onSortChange }) {
  const [localCats, setLocalCats] = useState(selectedCategories);
  const [localSort, setLocalSort] = useState(sortOption);

  useEffect(() => {
    if (open) {
      setLocalCats(selectedCategories);
      setLocalSort(sortOption);
    }
  }, [open]);

  const toggleCat = (cat) => {
    if (cat.value === "All") { setLocalCats([cat]); return; }
    const withoutAll = localCats.filter((c) => c.value !== "All");
    const exists = withoutAll.find((c) => c.value === cat.value);
    const next = exists
      ? withoutAll.filter((c) => c.value !== cat.value)
      : [...withoutAll, cat];
    setLocalCats(next.length === 0 ? [{ value: "All", label: "All Categories" }] : next);
  };

  const handleApply = () => { onChange(localCats); onSortChange(localSort); onClose(); };
  const handleClear = () => { setLocalCats([{ value: "All", label: "All Categories" }]); setLocalSort("default"); };

  const isAll = localCats.some((c) => c.value === "All");
  const appliedCats = isAll ? [] : localCats;

  const sortOptions = [
    { value: "default", label: "Latest / Newest" },
    { value: "popular", label: "Most Popular" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "price-asc", label: "Price: Low to High" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">Filter</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
          {appliedCats.length > 0 && (
            <div>
              <p className="text-sm font-bold text-gray-900 mb-3">Applied Filters</p>
              <div className="flex flex-wrap gap-2">
                {appliedCats.map((cat) => (
                  <span key={cat.value} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                    <button onClick={() => toggleCat(cat)} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                    {cat.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-bold text-gray-900 mb-3">Sort By</p>
            <div className="space-y-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLocalSort(opt.value)}
                  className="w-full flex items-center gap-3 px-1 py-2.5 text-sm text-gray-700 hover:text-gray-900 transition-colors text-left"
                >
                  <span className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${localSort === opt.value ? "bg-gray-900 border-gray-900" : "border-gray-300"}`}>
                    {localSort === opt.value && (
                      <svg width="8" height="6" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100" />
          <CategoryAccordion categories={categories} localCats={localCats} isAll={isAll} toggleCat={toggleCat} />
        </div>

        <div className="border-t border-gray-100 grid grid-cols-2">
          <button onClick={handleClear} className="py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wider border-r border-gray-100">
            Clear Selection
          </button>
          <button onClick={handleApply} className="py-4 text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 transition-colors uppercase tracking-wider">
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

// ── Pagination Controls ──────────────────────────────────────────────────────
function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page number list: always show first, last, current ±1, with ellipsis gaps
  const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  const pages = new Set([1, totalPages, page, page - 1, page + 1].filter((p) => p >= 1 && p <= totalPages));
  const sorted = [...pages].sort((a, b) => a - b);

  const withEllipsis = sorted.reduce((acc, cur, i) => {
    if (i > 0 && cur - sorted[i - 1] > 1) acc.push("...");
    acc.push(cur);
    return acc;
  }, []);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10 mb-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-[#317F21] hover:text-[#317F21] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {withEllipsis.map((item, i) =>
        item === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">…</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
              item === page
                ? "bg-[#317F21] text-white shadow-md shadow-[#317F21]/30"
                : "border border-gray-200 text-gray-600 hover:border-[#317F21] hover:text-[#317F21]"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-[#317F21] hover:text-[#317F21] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductCard() {
  // allProducts holds the complete list fetched from API (used for client-side pagination)
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // ── Fetch ALL products (client-side pagination) ─────────────────────────────
  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.products ?? []);
      setAllProducts(list);

      const catMap = new Map();
      list.forEach((p) => {
        if (!p.category) return;
        const norm = p.category.trim().toLowerCase();
        if (!catMap.has(norm)) catMap.set(norm, p.category.trim());
      });
      const options = [
        { value: "All", label: "All Categories" },
        ...Array.from(catMap.values()).map((c) => ({ value: c, label: c })),
      ];
      setCategories(options);
      setSelectedCategories((prev) => (prev.length === 0 ? [options[0]] : prev));
    } catch (err) {
      console.error(err);
    }
  }, [API_URL]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Realtime socket ─────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = io(API_URL);
    socket.on("newProduct", fetchAll);
    socket.on("updateProduct", fetchAll);
    socket.on("stockUpdated", fetchAll);
    socket.on("deleteProduct", fetchAll);
    return () => socket.disconnect();
  }, [API_URL, fetchAll]);

  // ── Reset to page 1 when filters/search/sort change ────────────────────────
  const handleCategoryChange = (cats) => { setPage(1); setSelectedCategories(cats); };
  const handleSortChange = (sort) => { setPage(1); setSortOption(sort); };
  const handleSearchChange = (q) => { setPage(1); setSearchQuery(q); };
  const handlePageSizeChange = (size) => { setPage(1); setPageSize(size); };

  // ── Apply filters + search + sort to full list ──────────────────────────────
  const isAllSelected = selectedCategories.some((c) => c.value === "All");

  let filtered = isAllSelected
    ? allProducts
    : allProducts.filter((p) =>
        selectedCategories.some(
          (c) => c.value.trim().toLowerCase() === p.category?.trim().toLowerCase()
        )
      );

  if (searchQuery.trim()) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortOption === "price-asc")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortOption === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortOption === "name")  filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  else if (sortOption === "in-stock") filtered = [...filtered].sort((a, b) => b.count - a.count);

  // ── Pagination derived values ───────────────────────────────────────────────
  const totalProducts = filtered.length;
  const totalPages    = Math.max(1, Math.ceil(totalProducts / pageSize));
  const safePage      = Math.min(page, totalPages);
  const pageStart     = (safePage - 1) * pageSize;
  const products      = filtered.slice(pageStart, pageStart + pageSize);

  const inStock    = filtered.filter((p) => p.count > 0).length;
  const outOfStock = filtered.filter((p) => p.count === 0).length;

  const activeFilterCount = isAllSelected ? 0 : selectedCategories.length;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: fadeUp 0.35s ease-out both; }
      `}</style>

      <FilterSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#f0f7ee] via-white to-[#e8f4e5] p-4 sm:p-6 lg:p-10">
        {/* Header */}
        <div className="text-center mb-10 pt-16">
          <span className="inline-block px-4 py-1 bg-[#317F21]/10 text-[#317F21] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Our Products
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2 leading-tight">
            Browse by{" "}
            <span className="text-[#317F21] relative">
              Category
              <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                <path d="M0 3 Q50 0 100 3" stroke="#317F21" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-3">
            Showing{" "}
            <strong className="text-gray-800">
              {totalProducts === 0 ? 0 : pageStart + 1}–{Math.min(pageStart + pageSize, totalProducts)}
            </strong>{" "}
            of <strong className="text-gray-800">{totalProducts}</strong> products
            {inStock > 0 && <> · <span className="text-[#317F21]">{inStock} in stock</span></>}
            {outOfStock > 0 && <> · <span className="text-red-500">{outOfStock} out of stock</span></>}
          </p>
        </div>

        {/* Toolbar */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg shadow-gray-100/60 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 bg-white border-2 border-[#317F21]/20 rounded-2xl text-gray-700 font-semibold text-sm shadow-sm hover:border-[#317F21]/60 hover:shadow-md transition-all duration-200 focus:outline-none focus:border-[#317F21] flex-shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#317F21]" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#317F21] text-white text-[10px] font-black flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {!isAllSelected && (
                <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                  {selectedCategories.map((cat) => (
                    <span key={cat.value} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#317F21]/10 text-[#317F21] text-xs font-semibold rounded-full border border-[#317F21]/20 whitespace-nowrap">
                      {cat.label}
                      <button
                        onClick={() => {
                          const next = selectedCategories.filter((c) => c.value !== cat.value);
                          handleCategoryChange(next.length === 0 ? [{ value: "All", label: "All Categories" }] : next);
                        }}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 ml-auto">
                {/* Per-page selector */}
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-2xl px-3 py-2 flex-shrink-0">
                  <span className="text-xs text-gray-400 font-medium hidden sm:inline">Show</span>
                  <div className="flex items-center gap-0.5">
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <button
                        key={size}
                        onClick={() => handlePageSizeChange(size)}
                        className={`w-8 h-7 rounded-xl text-xs font-bold transition-all ${
                          pageSize === size
                            ? "bg-[#317F21] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-800 hover:bg-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ width: searchOpen ? "260px" : "0px", opacity: searchOpen ? 1 : 0, pointerEvents: searchOpen ? "auto" : "none" }}
                >
                  <div className="flex items-center gap-2 w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-[#317F21]/40 focus-within:shadow-sm transition-all">
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search products..."
                      className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none min-w-0"
                    />
                    {searchQuery && (
                      <button onClick={() => handleSearchChange("")} className="flex-shrink-0">
                        <X className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const next = !searchOpen;
                    setSearchOpen(next);
                    if (!next) handleSearchChange("");
                    else setTimeout(() => searchInputRef.current?.focus(), 320);
                  }}
                  className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl border-2 font-semibold transition-all duration-200 shadow-sm ${
                    searchOpen ? "bg-[#317F21] border-[#317F21] text-white hover:bg-[#266a1a]" : "bg-white border-gray-100 text-gray-500 hover:border-[#317F21]/50 hover:text-[#317F21]"
                  }`}
                >
                  {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product, i) => {
            const isOutOfStock = product.count === 0;
            return (
              <div
                key={product._id}
                className={`card-enter group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 ${
                  isOutOfStock ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl hover:shadow-[#317F21]/10 hover:-translate-y-1 cursor-pointer"
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => !isOutOfStock && navigate(`/products/${product._id}`)}
              >
                <div className="relative bg-gradient-to-br from-[#f0f7ee] to-gray-50 h-52 flex items-center justify-center overflow-hidden">
                  <img
                    src={`${API_URL}/images/${product.images?.[0]}`}
                    alt={product.name}
                    className="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.category && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-gray-500 uppercase tracking-wider rounded-full border border-gray-100">
                      {product.category}
                    </span>
                  )}
                  {isOutOfStock && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                      Out of Stock
                    </span>
                  )}
                  {!isOutOfStock && product.count <= 5 && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                      Low Stock
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-2 leading-snug">{product.name}</h3>
                  <div className="flex items-end justify-between mt-3">
                    <p className="text-xl font-black text-[#317F21]">£{Number(product.price).toFixed(2)}</p>
                    {!isOutOfStock && <span className="text-[11px] text-gray-400 font-medium">{product.count} left</span>}
                  </div>
                  <div className={`flex items-center gap-1 mt-4 text-xs font-bold transition-colors ${isOutOfStock ? "text-gray-300" : "text-[#317F21] group-hover:gap-2"}`}>
                    {isOutOfStock ? "Unavailable" : "View Details"}
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>

                {!isOutOfStock && (
                  <div className="h-0.5 bg-gradient-to-r from-[#317F21] to-[#5cb85c] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </div>
            );
          })}

          {products.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-semibold text-lg">No products found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search query</p>
              <button
                onClick={() => { handleSearchChange(""); handleCategoryChange([{ value: "All", label: "All Categories" }]); handleSortChange("default"); }}
                className="mt-4 px-5 py-2 bg-[#317F21] text-white text-sm font-semibold rounded-full hover:bg-[#266a1a] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="max-w-7xl mx-auto">
          <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </>
  );
}