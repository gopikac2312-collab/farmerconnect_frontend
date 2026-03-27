import { useState } from "react";
import API from "../api";
import StarRating from "./StarRating";

const AddReview = ({ onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!rating || !comment.trim()) {
      alert("Please add rating and comment");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/reviews/", {
        rating,
        comment,
      });

      console.log("Review added:", res.data);

      // ✅ Safe call
      if (typeof onReviewAdded === "function") {
        onReviewAdded(true); // reset page
      }

      setRating(0);
      setComment("");
      alert("Review submitted successfully ✅");
    } catch (err) {
      console.error("Add review error:", err);
      alert("Failed to submit review ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Add Review</h5>

        <StarRating rating={rating} setRating={setRating} />

        <textarea
          className="form-control mt-3"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
        />

        <button
          className="btn btn-success mt-3"
          onClick={submitReview}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddReview;
