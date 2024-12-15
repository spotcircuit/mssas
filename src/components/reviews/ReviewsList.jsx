import React from 'react';
import ReviewItem from './ReviewItem';

function ReviewsList({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        <div className="text-gray-500 text-center py-4">
          No reviews available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </div>
  );
}

export default ReviewsList;