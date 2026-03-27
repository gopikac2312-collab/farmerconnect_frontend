import { useEffect, useState } from "react";
import API from "../api";

export default function AdminExchangeOffers() {
  const [offers, setOffers] = useState([]);

  const loadOffers = async () => {
    const res = await API.get("exchange-offers/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    setOffers(res.data);
  };

  const updateStatus = async (id, status) => {
    try {
      await API.post(
        `exchange-offers/${id}/update_status/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      loadOffers();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <div className="container">
      <h2>Exchange Offers (Admin)</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Farmer</th>
            <th>Product</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.id}</td>
              <td>{offer.farmer_name}</td>
              <td>{offer.product_name}</td>
              <td>{offer.status}</td>
              <td>
                {offer.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(offer.id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(offer.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
