import React from 'react';

function DistributionList({ distribution = {} }) {
  if (!distribution || Object.keys(distribution).length === 0) {
    return <div className="text-gray-500">No data available</div>;
  }

  return (
    <div className="space-y-2">
      {Object.entries(distribution).map(([key, percentage]) => (
        <div key={key} className="flex justify-between">
          <span className="capitalize">{key}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      ))}
    </div>
  );
}

export default DistributionList;