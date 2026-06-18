import { useState } from "react";
import "../styles/payment.css"; // Import the matching CSS file

function PaymentCard() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRazorpay = () => {
    alert("Redirecting to Razorpay payment gateway...");
    // Razorpay integration logic goes here
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    
    // Validate that all fields are filled
    if (!addressData.name || !addressData.phone || !addressData.street || !addressData.city || !addressData.pincode) {
      alert("Please fill in all address details.");
      return;
    }
    
    // Order payload to send to your backend database/API
    const orderDetails = {
      amount: 500,
      paymentMethod: "Cash on Delivery",
      customer: addressData
    };
    
    console.log("Submitting Order:", orderDetails);
    alert(`Order Confirmed!\n\nName: ${addressData.name}\nAddress: ${addressData.street}, ${addressData.city} - ${addressData.pincode}`);
    
    // Reset form states
    setShowAddressForm(false);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        
        {/* Screen 1: Payment Method Selection */}
        {!showAddressForm ? (
          <div className="payment-methods-view">
            <h2 className="payment-title">Payment</h2>
            <p className="payment-amount">Amount: <span>₹500</span></p>
            
            <button className="btn-pay-razorpay" onClick={handleRazorpay}>
              Pay with Razorpay
            </button>
            
            <button className="btn-pay-cod" onClick={() => setShowAddressForm(true)}>
              Cash on Delivery
            </button>
          </div>
        ) : (
          
          /* Screen 2: Cash on Delivery Address Form */
          <div className="address-form-view">
            <h2 className="payment-title">Delivery Details</h2>
            <p className="payment-amount">Confirming order for: <span>₹500</span></p>
            
            <form onSubmit={handleConfirmOrder} className="address-form">
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
                <button type="button" className="btn-back" onClick={() => setShowAddressForm(false)}>
                  Back
                </button>
                <button type="submit" className="btn-confirm">
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default PaymentCard;