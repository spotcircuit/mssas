import React from 'react';
import DistributionList from './DistributionList';

function SentimentDistribution({ sentimentPercentages }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Sentiment</h2>
      <DistributionList distribution={sentimentPercentages} />
    </div>
  );
}

export default SentimentDistribution;