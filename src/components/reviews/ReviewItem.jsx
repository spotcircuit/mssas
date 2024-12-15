import React from 'react';
import ReviewLocation from './ReviewLocation';

function ReviewItem({ review }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getCategoryLabel = (category) => {
    const labels = {
      booking: 'Booking & Scheduling',
      pricing: 'Pricing Transparency',
      treatment: 'Treatment Outcomes',
      aftercare: 'Aftercare Support',
      staff: 'Staff Professionalism',
      facility: 'Facility Environment'
    };
    return labels[category] || category;
  };

  return (
    <div className="border-b last:border-0 pb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-sm font-medium text-blue-600 mr-2">
            {review.platform}
          </span>
          {review.subreddit && (
            <span className="text-sm text-gray-500">
              r/{review.subreddit}
            </span>
          )}
        </div>
        <span className="text-sm text-gray-600">
          {formatDate(review.date)}
        </span>
      </div>
      
      <ReviewLocation 
        spaName={review.spaName}
        city={review.city}
        state={review.state}
      />

      {review.title && (
        <h3 className="font-medium text-gray-900 mt-2">{review.title}</h3>
      )}
      <p className="text-gray-800 mt-1">{review.text}</p>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {review.sentiment && (
          <span className={`text-sm px-2 py-1 rounded ${
            review.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
            review.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {review.sentiment}
          </span>
        )}
        {review.category && (
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {getCategoryLabel(review.category)}
          </span>
        )}
      </div>
    </div>
  );
}

export default ReviewItem;