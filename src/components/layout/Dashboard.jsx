import React from 'react';
import Header from './Header';
import AnalyticsSummary from '../metrics/AnalyticsSummary';
import CategorySummary from '../metrics/CategorySummary';
import ReviewsList from '../reviews/ReviewsList';
import PieChart from '../metrics/PieChart';
import TrendChart from '../metrics/TrendChart';
import { trendAnalyzer } from '../../services/analysis';

function Dashboard({ reviews = [] }) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">No reviews available</div>
        </div>
      </div>
    );
  }

  // Calculate distributions
  const sentimentPercentages = calculatePercentages(
    reviews.reduce((acc, r) => {
      acc[r.sentiment] = (acc[r.sentiment] || 0) + 1;
      return acc;
    }, {})
  );

  const categoryPercentages = calculatePercentages(
    reviews.reduce((acc, r) => {
      if (r.category) {
        acc[r.category] = (acc[r.category] || 0) + 1;
      }
      return acc;
    }, {})
  );

  // Calculate trends
  const trends = trendAnalyzer.analyzeTrends(reviews);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Analytics Overview */}
        <AnalyticsSummary 
          data={{
            totalReviews: reviews.length,
            sentimentPercentages,
            categoryPercentages
          }} 
        />

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <PieChart 
            data={sentimentPercentages} 
            title="Sentiment Distribution" 
          />
          <PieChart 
            data={categoryPercentages} 
            title="Category Distribution" 
          />
        </div>

        {/* Trends Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TrendChart 
            data={trends.sentiment} 
            title="Sentiment Trends"
            type="sentiment"
          />
          <TrendChart 
            data={trends.volume} 
            title="Review Volume Trends"
            type="volume"
          />
        </div>

        {/* Category Summary */}
        <CategorySummary categoryPercentages={categoryPercentages} />

        {/* Reviews List */}
        <ReviewsList reviews={reviews} />
      </main>
    </div>
  );
}

function calculatePercentages(distribution) {
  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  if (total === 0) return {};

  return Object.entries(distribution).reduce((acc, [key, count]) => {
    acc[key] = (count / total) * 100;
    return acc;
  }, {});
}

export default Dashboard;