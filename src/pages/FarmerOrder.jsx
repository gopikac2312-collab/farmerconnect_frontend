import { useEffect, useState } from "react";
import API from "../api";

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in farmer ID from localStorage
  const farmerId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("orders/my_orders/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Product Orders</h2>
      {orders.length === 0 ? (
        <p>No orders for your products yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            // Filter products to only include those from this farmer
            const myProducts = order.products.filter((p) => p.farmer.id === farmerId);

            // Skip orders that do not include any of this farmer's products
            if (myProducts.length === 0) return null;

            return (
              <li key={order.id} className="border p-4 rounded shadow">
                <strong>Order #{order.id}</strong> - Buyer: {order.buyer.username} - Total: ${order.total_price}
                <ul className="mt-2 ml-4 list-disc">
                  {myProducts.map((p) => (
                    <li key={p.id}>
                      {p.name} - ${p.price}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
