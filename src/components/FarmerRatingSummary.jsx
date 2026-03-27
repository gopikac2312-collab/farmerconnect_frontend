import { useEffect, useState } from "react";
import API from "../api";

export default function FarmerRatingSummary() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    API.get("farmer/ratings/")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h4>Ratings Summary</h4>

      {summary.length === 0 && (
        <p className="text-muted">No ratings yet.</p>
      )}

      {summary.map((item, i) => (
        <div key={i} className="alert alert-success">
          <strong>{item.product__name}</strong>
          <br />
          ⭐ {item.avg_rating?.toFixed(1)} ({item.total} reviews)
        </div>
      ))}
    </div>
  );
}
