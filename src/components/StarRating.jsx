import React from "react";

export default function StarRating({ rating = 0, onChange, readOnly = false }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "20px",
            cursor: readOnly ? "default" : "pointer",
            color: star <= rating ? "#ffc107" : "#e4e5e9",
          }}
          onClick={() => !readOnly && onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
