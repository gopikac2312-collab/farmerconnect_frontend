import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import confetti from "canvas-confetti";
import "../styles/ordersuccess.css";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const paymentMode = location.state?.paymentMode;

  // 🎉 Confetti burst on load
  useEffect(() => {
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <h2>🎉 Order Successful!</h2>

        {paymentMode && (
          <p>
            Payment Method: <strong>{paymentMode}</strong>
          </p>
        )}

        {order ? (
          <>
            <div className="order-details">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>

            <Link to="/buyer-orders">
              View My Orders
            </Link>
          </>
        ) : (
          <>
            <p>Your payment was successful and your order is confirmed.</p>
            <Link to="/buyer-orders">
              View My Orders
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

/* Page background */
