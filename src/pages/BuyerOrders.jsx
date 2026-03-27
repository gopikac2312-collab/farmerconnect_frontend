import { useEffect, useState } from "react";
import API from "../api";
import "../styles/buyerorder.css";



export default function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/buyer/orders/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders yet</p>;

  return (
    <div className="buyer-orders">
  <h2>My Orders</h2>

  {orders.map(order => (
    <div key={order.id} className="order-card">
      <div className="order-header">
        <span className="order-id">Order ID: {order.id}</span>
        <span
          className={`order-status ${
            order.status === "PAID" ? "paid" : "pending"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="order-items">
        {order.items.length > 0 ? (
          order.items.map(item => (
            <div key={item.id} className="order-item">
              <img
                src={`http://127.0.0.1:8000${item.product.image}`}
                alt={item.product.name}
              />
              <div className="item-details">
                <p><strong>{item.product.name}</strong></p>
                <p>Price: ₹{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₹{item.total_price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items in this order</p>
        )}
      </div>

      <div className="order-total">
        Order Total: ₹{order.total_amount}
      </div>
    </div>
  ))}
</div>

  );
}

