import React, { useEffect, useState } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from "../../API/api.jsx";
import { Constants } from '../../Constant/Constant';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const [token, setToken] = useState(null);  // Local state to hold token
  const navigate = useNavigate();

  // Function to check for token in sessionStorage
  const checkToken = () => {
    const tokenFromStorage = sessionStorage.getItem("atoken");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    } else {
      console.warn("Token not yet available in sessionStorage.");
    }
  };

  const verifyPayment = async () => {
    if (!token) {
      console.error('Token is missing!');
      navigate("/");  // Navigate to homepage or login if token is missing
      return;
    }

    try {
      console.log("Verifying payment with data:", { success, orderId });

      const response = await api.post(
          `${Constants.API_URL}${Constants.API_ENDPOINTS.ORDER.VERIFY}`,
          { success, orderId },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
      );

      console.log("Verification response:", response);

      if (response.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate("/");  // Navigate to homepage in case of error
    }
  };

  // Poll for the token on component mount
  useEffect(() => {
    const tokenInterval = setInterval(() => {
      checkToken();  // Poll for token availability
    }, 500);  // Check every 500ms

    // Cleanup interval once token is found
    return () => clearInterval(tokenInterval);
  }, []);

  // Run verification once token is available
  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]);

  return (
      <div className="verify">
        <div className="spinner"></div>
        <p>Verifying your payment, please wait...</p>
      </div>
  );
};

export default Verify;
