import { useEffect, useState } from "react";
import API from "../api";
import StarRating from "./StarRating";

export default function FarmerReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get("reviews/")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h4>Customer Reviews</h4>

      {reviews.length === 0 && (
        <p className="text-muted">No reviews yet.</p>
      )}

      {reviews.map((r) => (
        <div key={r.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h6>{r.product}</h6>
            <StarRating rating={r.rating} readOnly />
            <p className="mt-2">{r.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
