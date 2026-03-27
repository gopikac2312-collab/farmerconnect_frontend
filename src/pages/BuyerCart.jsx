import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function BuyerCart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  // 🔹 Load cart (AUTH REQUIRED)
  function loadCart() {
    API.get("cart/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Failed to load cart", err));
  }

  useEffect(() => {
    loadCart();
  }, []);

  // 🔹 Remove item
  async function removeItem(id) {
    try {
      await API.post(
        "cart/remove-item/",
        { item_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      loadCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  }

  // 🔹 Create order & go to payment
  async function proceedToCheckout() {
    try {
      const res = await API.post(
        "orders/create/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      navigate("/payment", {
        state: {
          orderId: res.data.id,
          amount: res.data.total_amount,
        },
      });
    } catch (err) {
      console.error("Checkout failed", err);
      alert(err.response?.data?.detail || "Checkout failed");
    }
  }

  if (!cart) return <p>Loading...</p>;

  const total = cart.items.reduce(
    (acc, item) => acc + item.product_detail.price * item.quantity,
    0
  );

  const canCheckout = cart.items.every(
    (item) => item.product_detail.stock > 0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between items-center p-4 border rounded shadow ${
                item.product_detail.stock === 0 ? "opacity-50" : ""
              }`}
            >
              <div>
                <p className="font-semibold">
                  {item.product_detail.name}
                </p>
                <p>
                  {item.quantity} × ₹{item.product_detail.price} — Stock:{" "}
                  {item.product_detail.stock}
                  {item.product_detail.stock === 0 && (
                    <span className="text-red-600 font-bold ml-2">
                      Out of Stock
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-4">Total: ₹{total}</h3>

          <button
            onClick={proceedToCheckout}
            disabled={!canCheckout}
            className={`mt-4 px-6 py-2 rounded text-white font-semibold ${
              canCheckout
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
