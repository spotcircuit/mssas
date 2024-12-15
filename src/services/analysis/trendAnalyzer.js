import { logger } from '../../utils/logger.js';

class TrendAnalyzer {
  analyzeTrends(reviews, timeframe = 'weekly') {
    try {
      // Sort reviews by date
      const sortedReviews = [...reviews].sort((a, b) => new Date(a.date) - new Date(b.date));
      
      // Group reviews by timeframe
      const groupedReviews = this.groupByTimeframe(sortedReviews, timeframe);
      
      // Calculate trends for each metric
      return {
        sentiment: this.calculateSentimentTrends(groupedReviews),
        categories: this.calculateCategoryTrends(groupedReviews),
        volume: this.calculateVolumeTrends(groupedReviews)
      };
    } catch (error) {
      logger.error('Error analyzing trends:', error);
      return null;
    }
  }

  groupByTimeframe(reviews, timeframe) {
    return reviews.reduce((groups, review) => {
      const date = new Date(review.date);
      const key = this.getTimeframeKey(date, timeframe);
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(review);
      return groups;
    }, {});
  }

  getTimeframeKey(date, timeframe) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const week = Math.ceil(date.getDate() / 7);
    
    switch (timeframe) {
      case 'weekly':
        return `${year}-W${week}`;
      case 'monthly':
        return `${year}-${month}`;
      default:
        return `${year}-${month}`;
    }
  }

  calculateSentimentTrends(groupedReviews) {
    return Object.entries(groupedReviews).map(([period, reviews]) => {
      const total = reviews.length;
      const positive = reviews.filter(r => r.sentiment === 'positive').length;
      return {
        period,
        positivePercentage: (positive / total) * 100
      };
    });
  }

  calculateCategoryTrends(groupedReviews) {
    return Object.entries(groupedReviews).map(([period, reviews]) => {
      const categoryCounts = reviews.reduce((acc, review) => {
        if (review.category) {
          acc[review.category] = (acc[review.category] || 0) + 1;
        }
        return acc;
      }, {});

      return {
        period,
        categories: categoryCounts
      };
    });
  }

  calculateVolumeTrends(groupedReviews) {
    return Object.entries(groupedReviews).map(([period, reviews]) => ({
      period,
      count: reviews.length
    }));
  }
}

export default new TrendAnalyzer();