import React, { useState } from "react";
import API from "../api";
import StarRating from "./StarRating";

export default function AddReview({ orderId, productId, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("feedback/create/", {
        order_id: orderId,
        product_id: productId,
        rating,
        comment,
      });

      alert("Review submitted");
      setRating(0);
      setComment("");
      onSuccess && onSuccess();
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mt-3 shadow-sm">
      <h5>Add Review</h5>

      <StarRating rating={rating} onChange={setRating} />

      <textarea
        className="form-control mt-2"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      <button
        className="btn btn-success mt-2"
        disabled={loading || rating === 0}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
