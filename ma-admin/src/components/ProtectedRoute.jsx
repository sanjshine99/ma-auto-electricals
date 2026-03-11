import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsVerified(false);
        return;
      }
      try {
       
        const response = await axios.post("https://ma-auto-electricals.onrender.com/api/user/checkTokenCorrect", { token });
        
        if (response.data.success) {
          setIsVerified(true);
        } else {
          localStorage.removeItem("token");
          setIsVerified(false);
        }
      } catch (error) {
        setIsVerified(false);
      }
    };
    checkAuth();
  }, [token]);

  if (isVerified === null) return null; 

  return isVerified ? children : <Navigate to="/" replace />;
}