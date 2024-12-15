import React from 'react';
import StatCard from './StatCard';

function AnalyticsSummary({ data }) {
  if (!data) return null;

  const { totalReviews, sentimentPercentages = {}, categoryPercentages = {} } = data;

  // Find the top category
  const topCategory = Object.entries(categoryPercentages)
    .reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];

  const categoryLabels = {
    booking: 'Booking & Scheduling',
    pricing: 'Pricing Transparency',
    treatment: 'Treatment Outcomes',
    aftercare: 'Aftercare Support',
    staff: 'Staff Professionalism',
    facility: 'Facility Environment'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Reviews"
        value={totalReviews}
        description="Total reviews analyzed"
      />
      <StatCard
        title="Positive Sentiment"
        value={`${Math.round(sentimentPercentages.positive || 0)}%`}
        description="Reviews with positive sentiment"
      />
      <StatCard
        title="Top Category"
        value={categoryLabels[topCategory] || 'N/A'}
        description="Most discussed category"
      />
    </div>
  );
}

export default AnalyticsSummary;