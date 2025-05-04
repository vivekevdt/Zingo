import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./verify.css";

import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const location = useLocation();
  const success = location.search.includes("success=true");
  const orderId = parseInt(location.search.split("=")[1]);

  const { url } = useContext(StoreContext)
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId })
    if (response.data.success) {
      navigate("/myorders");
    }
    else {
      navigate("/");
    }
    console.log("verify")
  }


  useEffect(() => {
    verifyPayment();
  }, [])



  return (
    <div className="verify">
      <div className="spinner">


      </div>
    </div>
  );
};

export default Verify;
