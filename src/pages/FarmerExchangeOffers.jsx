import { useEffect, useState } from "react";
import API from "../api";

export default function FarmerExchangeOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOffers = async () => {
    try {
      const res = await API.get("exchange-offers/my_offers/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setOffers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load exchange offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>My Exchange Offers</h2>

      {offers.length === 0 ? (
        <p>No exchange offers yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.id}</td>
                <td>{offer.product_name}</td>
                <td>{offer.quantity}</td>
                <td>
                  <span className={`status ${offer.status}`}>
                    {offer.status}
                  </span>
                </td>
                <td>{new Date(offer.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
