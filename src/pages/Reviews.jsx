import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Make sure useNavigate is also imported
import "../styles/Reviews.css"; // We'll add matching styling

function Reviews() {
  const [reviewsList, setReviewsList] = useState([]);

  // Static/Preset reviews to show by default
  const defaultReviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      feedback: "FarmerConnect changed the way I sell my crop. I get fair prices and the payout is extremely fast! Highly recommended to all fellow farmers.",
      date: "12 Jun 2026",
      rating: 5
    },
    {
      id: 2,
      name: "Anjali Nair",
      feedback: "As a buyer, getting fresh vegetables directly from the farm is amazing. The quality is outstanding, and the customer service is superb.",
      date: "08 Jun 2026",
      rating: 5
    }
  ];

  useEffect(() => {
    // Load customer reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem("customReviews")) || [];
    
    // Merge both static defaults and user custom reviews
    setReviewsList([...savedReviews, ...defaultReviews]);
  }, []);

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>Customer Reviews</h1>
        <p>See what farmers and consumers are saying about FarmerConnect 🌱</p>
      </div>

      <div className="reviews-grid">
        {reviewsList.length === 0 ? (
          <p className="no-reviews">No reviews posted yet. Be the first!</p>
        ) : (
          reviewsList.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="review-text">"{review.feedback}"</p>
              <div className="review-meta">
                <h4 className="review-author">— {review.name}</h4>
                <span className="review-date">{review.date}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;