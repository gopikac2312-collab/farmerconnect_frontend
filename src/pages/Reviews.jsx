import React, { useEffect, useState } from "react";
import API from "../api";
import StarRating from "../components/StarRating";
import AddReview from "../components/AddReview";
import FarmerRatingSummary from "../components/FarmerRatingSummary";

export default function Reviews() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-created_at");

  const fetchReviews = async (resetPage = false) => {
  try {
    const currentPage = resetPage ? 1 : page;
    if (resetPage) setPage(1);

    const res = await API.get(
      `reviews/?page=${currentPage}&ordering=${ordering}`
    );

    setReviews(res.data.results || res.data);
  } catch (error) {
    console.error("Fetch reviews error:", error);
  }
};

  useEffect(() => {
    fetchReviews();
  }, [page, ordering]);

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Reviews</h2>

      {/* ✅ BUYER: Add Review */}
      {user?.role === "buyer" && (
        <AddReview onReviewAdded={fetchReviews} />
      )}

      {/* ✅ FARMER: Rating Summary */}
      {user?.role === "farmer" && (
        <FarmerRatingSummary />
      )}

      {/* Sorting */}
      <select
        className="form-select mb-3"
        value={ordering}
        onChange={(e) => setOrdering(e.target.value)}
      >
        <option value="-created_at">Newest First</option>
        <option value="created_at">Oldest First</option>
        <option value="-rating">Highest Rating</option>
        <option value="rating">Lowest Rating</option>
      </select>

      {/* Reviews List */}
      {reviews.length === 0 && (
        <p className="text-muted">No reviews available.</p>
      )}

      {reviews.map((r) => (
        <div key={r.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h6>{r.buyer || r.user}</h6>
            <StarRating rating={r.rating} readOnly />
            <p className="mt-2">{r.comment}</p>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}


