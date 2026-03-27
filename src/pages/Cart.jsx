import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await API.get("cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;
    if (newQuantity < 1 || newQuantity > item.product_stock) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem("access_token");
      await API.patch(
        `cart/${itemId}/`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to update cart item:", err);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("access_token");
      await API.delete(`cart/${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove cart item:", err);
    } finally {
      setUpdating(false);
    }
  };

  // ✅ FRONTEND-CALCULATED TOTAL
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            const subtotal = item.price * item.quantity;

            return (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>₹{item.price}</td>

                <td>
                  <button
                    disabled={updating || item.quantity <= 1}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>

                  <span className="quantity">{item.quantity}</span>

                  <button
                    disabled={updating || item.quantity >= item.product_stock}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>

                  {item.quantity >= item.product_stock && (
                    <div className="stock-warning">Max stock reached</div>
                  )}
                </td>

                <td>₹{subtotal.toFixed(2)}</td>

                <td>
                  <button
                    disabled={updating}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>

      <button
        className="checkout-btn"
        disabled={cartItems.length === 0 || updating}
        onClick={() =>
          navigate("/payment", {
            state: {
              amount: totalAmount,              // ✅ REAL TOTAL
              orderId: "ORDER_" + Date.now(),
            },
          })
        }
      >
        Proceed to Payment
      </button>
    </div>
  );
}

