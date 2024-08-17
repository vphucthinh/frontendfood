import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { Constants } from '../../Constant/Constant';
import api from "../../API/api.jsx";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { token } = useContext(StoreContext); 
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log("Verifying payment with data:", { success, orderId });

      console.log("it is token from verify: " + token );

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
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
