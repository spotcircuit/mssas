import React from 'react';
import MetricCard from './MetricCard';
import PieChart from './PieChart';

function OverviewCards({ report }) {
  if (!report) {
    return (
      <div className="text-center text-gray-500 py-8">
        No analysis data available
      </div>
    );
  }

  const {
    totalReviews = 0,
    sentimentPercentages = {},
    categoryPercentages = {}
  } = report;

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Reviews" 
          value={totalReviews}
        />
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          <PieChart 
            data={sentimentPercentages} 
            title="Sentiment Distribution" 
          />
          <PieChart 
            data={categoryPercentages} 
            title="Category Distribution" 
          />
        </div>
      </div>
    </div>
  );
}

export default OverviewCards;