import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import CarList from "./pages/List/CarList";
import ProductList from "./pages/List/ProductList";
import AddCar from "./pages/Add/AddCar";
import AddProduct from "./pages/Add/AddProduct";
import OrdersTable from "./pages/Order";

import Login from "./components/Login";
import Signup from "./components/Signup";
import InvoiceGenerator from "./pages/InvoicePage";
import InvoiceDataPage from "./pages/InvoiceDataPage";

const url = "https://ma-auto-electricals.onrender.com"; // Backend URL

/* ---------------- AUTH ROUTE ---------------- */
const AuthRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        await axios.post(
          `${url}/api/user/checkTokenCorrect`,
          {}, // empty body
          { headers: { Authorization: `Bearer ${token}` } } // token in header
        );
        setIsValid(true); // token valid → redirect to dashboard
      } catch (err) {
        localStorage.removeItem("token"); // token invalid → remove
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) return <div>Loading...</div>;

  return isValid ? <Navigate to="/list/product" replace /> : children;
};

/* ---------------- PROTECTED ROUTE ---------------- */
const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        await axios.post(
          `${url}/api/user/checkTokenCorrect`,
          {}, // empty body
          { headers: { Authorization: `Bearer ${token}` } } // token in header
        );
        setIsValid(true); // token valid → allow access
      } catch (err) {
        localStorage.removeItem("token"); // invalid token → remove
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) return <div>Loading...</div>;

  return isValid ? <Outlet /> : <Navigate to="/signup" replace />;
};

/* ---------------- LAYOUT ---------------- */
const Layout = () => (
  <div className="flex min-h-screen">
    <Sidebar className="w-64" />
    <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-auto">
      <Navbar />
      <Outlet />
    </div>
  </div>
);

/* ---------------- APP ---------------- */
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        {/* AUTH ROUTES */}
        <Route
          path="/"
          element={
            <AuthRoute>
              <Login url={url} />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup url={url} />
            </AuthRoute>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/list/product" element={<ProductList url={url} />} />
            <Route path="/list/car" element={<CarList url={url} />} />
            <Route path="/add/car" element={<AddCar url={url} />} />
            <Route path="/add/product" element={<AddProduct url={url} />} />
            <Route path="/list/order" element={<OrdersTable url={url} />} />
            <Route path="/invoice" element={<InvoiceGenerator url={url} />} />
            <Route path="/invoice-data" element={<InvoiceDataPage url={url} />} />
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
