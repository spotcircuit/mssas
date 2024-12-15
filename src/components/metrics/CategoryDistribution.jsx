import React from 'react';
import DistributionList from './DistributionList';

function CategoryDistribution({ categoryPercentages }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Categories</h2>
      <DistributionList distribution={categoryPercentages} />
    </div>
  );
}

export default CategoryDistribution;