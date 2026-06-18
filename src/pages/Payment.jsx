import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";
import "../styles/payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const amount = location.state?.amount || 500;

  // State to toggle the Address Form for Cash on Delivery
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  // Handle inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  // Handle COD Order Confirmation
  const handleConfirmCOD = (e) => {
    e.preventDefault();

    // Optionally: Make an API call to save COD order details here
    // await API.post("/orders/create-cod/", { amount, address: addressData });

    navigate("/order-success", {
      state: {
        paymentMode: "COD",
        amount,
        address: addressData, // ✅ Passing the address to the success screen
      },
    });
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        
        {/* Screen 1: Choose Payment Method */}
        {!showAddressForm ? (
          <>
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
              onClick={() => setShowAddressForm(true)} // ✅ Opens Address Form
            >
              Cash on Delivery
            </button>
          </>
        ) : (
          
          /* Screen 2: Delivery Details Form */
          <>
            <h2>Delivery Details</h2>
            <p className="payment-amount">
              <strong>Amount:</strong> ₹{amount}
            </p>

            <form onSubmit={handleConfirmCOD} className="address-form">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={addressData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={addressData.phone}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="street"
                placeholder="Delivery Address (Street, House No, Area)"
                value={addressData.street}
                onChange={handleInputChange}
                rows="3"
                required
              />
              <div className="form-row">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={addressData.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={addressData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="payment-btn back-btn"
                  onClick={() => setShowAddressForm(false)} // ✅ Goes back to Payment view
                >
                  Back
                </button>
                <button type="submit" className="payment-btn cod-confirm-btn">
                  Confirm Order
                </button>
              </div>
            </form>
          </>
        )}
        
      </div>
    </div>
  );
};

export default Payment;