import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await API.get("cart/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      console.log("CART RESPONSE:", res.data);

      const itemsArray =
        res.data.cart_items ||
        res.data.items ||
        res.data.cart?.items ||
        (Array.isArray(res.data) ? res.data : []);

      setCartItems(itemsArray);

      const totalPrice = itemsArray.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      setTotal(totalPrice);
    } catch (err) {
      console.error(err);
      alert("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []);


  // Place order
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      };

      await API.post("orders/", orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (cartItems.length === 0)
    return <p>Your cart is empty. Add products to checkout.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <ul className="space-y-2 mb-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="border p-2 rounded flex justify-between"
          >
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>${item.product.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total:</span>
        <span>${total}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
      >
        Place Order
      </button>
    </div>
  );
}

