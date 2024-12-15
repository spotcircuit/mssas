import React from 'react';

function ReviewLocation({ spaName, city, state }) {
  return (
    <div className="mt-2 text-sm text-gray-600">
      {spaName && (
        <span className="font-medium text-blue-600 mr-2">
          {spaName}
        </span>
      )}
      {city && state && (
        <span>
          {city}, {state}
        </span>
      )}
    </div>
  );
}

export default ReviewLocation;