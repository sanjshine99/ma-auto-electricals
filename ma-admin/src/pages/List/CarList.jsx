import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Trash2,
  Car,
  Calendar,
  DollarSign,
  Edit,
  Plus,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Settings,
} from "lucide-react";
import AddCar from "../Add/AddCar";
import EditCar from "../Edit/EditCar";

const CarList = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  // Data table states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/cars`);
      setList(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  }, [url]);

const removeCar = async (id) => {
  try {
    const token = localStorage.getItem("token"); // 1. Get the token
    setDeleteId(id);
    
    // 2. Pass headers as the second argument
    await axios.delete(`${url}/api/cars/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    toast.success("Car deleted successfully");
    fetchList();
    setCarToDelete(null);
  } catch (err) {
    // 3. Handle specific 401/403 errors if the token is invalid
    const message = err.response?.status === 401 ? "Unauthorized: Please login" : "Failed to delete car";
    toast.error(message);
  } finally {
    setDeleteId(null);
  }
};

  const openEdit = (car) => setEditingCar(car);
  const closeModal = () => {
    setEditingCar(null);
    setShowAddModal(false);
  };
  const openDeleteConfirmation = (car) => setCarToDelete(car);
  const closeDeleteConfirmation = () => setCarToDelete(null);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filteredData = [...list];

    // Search filter
    if (searchTerm) {
      filteredData = filteredData.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.year?.toString().includes(searchTerm) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort data
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        // Handle null/undefined
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        // Handle strings
        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [list, searchTerm, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} className="opacity-40" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              All Cars
            </h1>
            <p className="text-slate-600">
              Manage your car inventory ({filteredAndSortedData.length} total)
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Add Car
          </button>
        </div>

        {/* Data Table Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Search and Controls */}
          <div className="p-4 md:p-6 border-b border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Items per page */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600 whitespace-nowrap">
                  Show:
                </label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Image
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-600 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-2">
                      Name
                      <SortIcon columnKey="name" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-600 transition-colors"
                    onClick={() => handleSort("model")}
                  >
                    <div className="flex items-center gap-2">
                      Model
                      <SortIcon columnKey="model" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-600 transition-colors"
                    onClick={() => handleSort("year")}
                  >
                    <div className="flex items-center gap-2">
                      Year
                      <SortIcon columnKey="year" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-600 transition-colors"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center gap-2">
                      Price
                      <SortIcon columnKey="price" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentData.length > 0 ? (
                  currentData.map((car) => (
                    <tr
                      key={car._id}
                      className="hover:bg-slate-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-slate-100">
                          <img
                            src={`${url}/images/${car.images?.[0]}`}
                            alt={car.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {car.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{car.model}</td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 rounded-full text-blue-700 text-sm font-medium">
                          <Calendar size={14} />
                          {car.year}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-green-600 font-bold text-lg">
                        £{car.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEdit(car)}
                            className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit car"
                          >
                            <Edit size={18} className="text-blue-500" />
                          </button>
                          <button
                            onClick={() => openDeleteConfirmation(car)}
                            className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete car"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Car size={48} className="text-slate-300" />
                        <p className="text-slate-500 font-medium">
                          No cars found
                        </p>
                        <p className="text-slate-400 text-sm">
                          {searchTerm
                            ? "Try adjusting your search"
                            : "Start adding cars to your inventory"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden p-4 space-y-4">
            {currentData.length > 0 ? (
              currentData.map((car) => (
                <div
                  key={car._id}
                  className="bg-slate-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="shrink-0">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md bg-slate-100">
                        <img
                          src={`${url}/images/${car.images?.[0]}`}
                          alt={car.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 mb-1 text-lg">
                        {car.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {car.model}
                      </p>

                      {/* Year Badge */}
                      <div className="mb-3">
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full text-blue-700 text-xs font-medium">
                          <Calendar size={12} />
                          {car.year}
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-green-600 font-bold text-xl">
                            £{car.price?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(car)}
                            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                          >
                            <Edit size={18} className="text-blue-500" />
                          </button>
                          <button
                            onClick={() => openDeleteConfirmation(car)}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <Car size={48} className="text-slate-300" />
                  <p className="text-slate-500 font-medium">No cars found</p>
                  <p className="text-slate-400 text-sm">
                    {searchTerm
                      ? "Try adjusting your search"
                      : "Start adding cars to your inventory"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredAndSortedData.length > 0 && (
            <div className="p-4 md:p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Results info */}
                <div className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-semibold text-slate-800">
                    {startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-800">
                    {Math.min(endIndex, filteredAndSortedData.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {filteredAndSortedData.length}
                  </span>{" "}
                  results
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="First page"
                  >
                    <ChevronsLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        return (
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1
                        );
                      })
                      .map((page, idx, arr) => (
                        <React.Fragment key={page}>
                          {idx > 0 && arr[idx - 1] !== page - 1 && (
                            <span className="px-2 text-slate-400">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-10 px-3 py-2 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? "bg-blue-500 text-white"
                                : "border border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Last page"
                  >
                    <ChevronsRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {carToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-xl font-bold">Confirm Delete</h3>
                  </div>
                  <button
                    onClick={closeDeleteConfirmation}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                    disabled={deleteId === carToDelete._id}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Car Preview */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-slate-100 shrink-0">
                    <img
                      src={`${url}/images/${carToDelete.images?.[0]}`}
                      alt={carToDelete.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 truncate">
                      {carToDelete.name}
                    </h4>
                    <p className="text-sm text-slate-600">{carToDelete.model}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">
                        {carToDelete.year}
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        £{carToDelete.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="space-y-2 mb-6">
                  <p className="text-slate-700 font-medium">
                    Are you sure you want to delete this car?
                  </p>
                  <p className="text-sm text-slate-600">
                    This action cannot be undone. The car will be permanently
                    removed from your inventory.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    onClick={closeDeleteConfirmation}
                    disabled={deleteId === carToDelete._id}
                    className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => removeCar(carToDelete._id)}
                    disabled={deleteId === carToDelete._id}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-white hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {deleteId === carToDelete._id ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} />
                        Delete Car
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {(editingCar || showAddModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
              {editingCar ? (
                <EditCar
                  url={url}
                  existingData={editingCar}
                  onSuccess={() => {
                    closeModal();
                    fetchList();
                  }}
                  onClose={closeModal}
                />
              ) : (
                <AddCar
                  url={url}
                  onSuccess={() => {
                    closeModal();
                    fetchList();
                  }}
                  onClose={closeModal}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CarList;