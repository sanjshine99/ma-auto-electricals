import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit2, Trash2, Save, Search, AlertTriangle, X, ChevronDown } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceAdmin = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isNewCategory, setIsNewCategory] = useState(false);
    
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [formData, setFormData] = useState({
        category: '',
        serviceName: '',
        price: ''
    });

    // Updated Render API URL
 const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/invoices`;

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/all`);
            setInvoices(res.data.data);
        } catch (err) {
            toast.error("Failed to load data");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const uniqueCategories = [...new Set(invoices.map(item => item.category))];

    const filteredInvoices = invoices.filter(item => 
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Number(formData.price) < 0) {
            toast.error("Price cannot be negative!");
            return;
        }

        try {
            if (isEditing) {
                await axios.put(`${API_URL}/update/${isEditing}`, formData);
                toast.success("Updated successfully!");
            } else {
                await axios.post(`${API_URL}/create`, formData);
                toast.success("Added successfully!");
            }
            setFormData({ category: '', serviceName: '', price: '' });
            setIsEditing(null);
            setIsNewCategory(false);
            fetchInvoices();
        } catch (err) {
            toast.error("Operation failed!");
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/delete/${deleteId}`);
            toast.info("Removed from inventory.");
            setShowModal(false);
            fetchInvoices();
        } catch (err) {
            toast.error("Error deleting record.");
        }
    };

    const startEdit = (item) => {
        setIsEditing(item._id);
        setFormData({
            category: item.category,
            serviceName: item.serviceName,
            price: item.price
        });
        setIsNewCategory(true); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
            <ToastContainer position="top-right" autoClose={2000} />

            {/* --- DELETE MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-red-100 text-red-600 rounded-full mb-5 mx-auto">
                            <AlertTriangle size={28} />
                        </div>
                        <h3 className="text-xl font-black text-center">Delete Record?</h3>
                        <p className="text-slate-500 text-center mt-2 text-sm">This action cannot be undone.</p>
                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-blue-600 pl-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-800">MA Auto Electrics</h1>
                        <p className="text-slate-500 font-medium">Service Inventory & Pricing (GBP)</p>
                    </div>
                </header>

                {/* --- FORM SECTION --- */}
                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 mb-10">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* CATEGORY SELECT/INPUT */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</label>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setIsNewCategory(!isNewCategory);
                                        setFormData({...formData, category: ''});
                                    }}
                                    className="text-[10px] font-bold text-blue-600 hover:underline"
                                >
                                    {isNewCategory ? "Back to List" : "+ Add New"}
                                </button>
                            </div>
                            
                            {isNewCategory ? (
                                <input
                                    type="text"
                                    className="w-full p-4 bg-blue-50/30 border-2 border-blue-100 focus:border-blue-500 rounded-2xl outline-none transition-all font-semibold"
                                    placeholder="e.g. Battery"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    required
                                />
                            ) : (
                                <div className="relative">
                                    <select
                                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-semibold appearance-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {uniqueCategories.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                </div>
                            )}
                        </div>

                        {/* SERVICE NAME */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Service Name</label>
                            <input
                                type="text"
                                className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-semibold"
                                placeholder="Service Details"
                                value={formData.serviceName}
                                onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                                required
                            />
                        </div>

                        {/* PRICE (IN POUNDS) */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Price (£)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">£</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="w-full p-4 pl-8 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val >= 0 || val === "") setFormData({...formData, price: val});
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:col-span-3 flex items-center gap-4 border-t pt-6">
                            <button type="submit" className={`px-10 py-4 rounded-2xl font-black text-white transition-all shadow-lg active:scale-95 flex items-center gap-2 ${isEditing ? 'bg-amber-500 shadow-amber-200' : 'bg-blue-600 shadow-blue-200'}`}>
                                <Save size={20}/> {isEditing ? "UPDATE SERVICE" : "SAVE SERVICE"}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={() => {setIsEditing(null); setFormData({category:'', serviceName:'', price:''}); setIsNewCategory(false)}} className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-200 transition">
                                    <X size={24}/>
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* --- DATA TABLE --- */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                    <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by service or category..."
                                className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/30">
                                <tr>
                                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Description</th>
                                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Price</th>
                                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                     <tr><td colSpan="4" className="p-20 text-center text-slate-300 font-bold uppercase animate-pulse">Fetching Data...</td></tr>
                                ) : filteredInvoices.length === 0 ? (
                                    <tr><td colSpan="4" className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest">No Records Found</td></tr>
                                ) : (
                                    filteredInvoices.map((item) => (
                                        <tr key={item._id} className="hover:bg-blue-50/30 transition-all group">
                                            <td className="p-6">
                                                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="p-6 text-slate-700 font-bold">{item.serviceName}</td>
                                            <td className="p-6 text-right font-mono font-black text-blue-600 text-lg">
                                                £{Number(item.price).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center gap-3">
                                                    <button onClick={() => startEdit(item)} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-amber-100 hover:text-amber-600 transition-all"><Edit2 size={16}/></button>
                                                    <button onClick={() => confirmDelete(item._id)} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all"><Trash2 size={16}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceAdmin;