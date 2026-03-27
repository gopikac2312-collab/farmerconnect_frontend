import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";
import "../styles/payment.css";



const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const amount = location.state?.amount || 500;

  // Load Razorpay SDK
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Create Razorpay order
  const createOrder = async () => {
    const res = await API.post("/payment/create-order/", { amount });
    return res.data;
  };

  // Razorpay payment handler
  const handleRazorpay = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const data = await createOrder();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.order_id, // ✅ Razorpay order ID
        name: "FarmerConnect",
        description: "Order Payment",

        handler: async function (response) {
  try {
    const res = await API.post("/payment/verify-payment/", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });

    if (res.data.success) {
      alert("Payment successful ✅");

      navigate("/order-success", {
        state: {
          paymentMode: "ONLINE",
          razorpayOrderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
        },
      });
    } else {
      alert("Payment verification failed ❌");
    }
  } catch (err) {
    console.error("Verification error:", err);
    alert("Payment verification failed ❌");
  }
},


        prefill: {
          name: "Test User",
          email: "test@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Unable to initiate payment");
    }
  };

  // Cash on Delivery
  const handleCOD = () => {
    navigate("/order-success", {
      state: {
        paymentMode: "COD",
        amount,
      },
    });
  };

  return (
  <div className="payment-page">
  <div className="payment-card">

      <h2>Payment</h2>

      <p className="payment-amount">
        <strong>Amount:</strong> ₹{amount}
      </p>

      <button
        className="payment-btn razorpay-btn"
        onClick={handleRazorpay}
      >
        Pay with Razorpay
      </button>

      <button
        className="payment-btn cod-btn"
        onClick={handleCOD}
      >
        Cash on Delivery
      </button>
    </div>
  </div>
);

};

export default Payment;
