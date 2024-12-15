import { logger } from '../../../utils/logger.js';

class TrendAnalyzer {
  analyzeTrends(reviews = []) {
    try {
      // Sort reviews by date
      const sortedReviews = [...reviews].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );
      
      // Group by month
      const periods = this.groupByMonth(sortedReviews);
      
      return {
        sentiment: this.calculateSentimentTrends(periods),
        volume: this.calculateVolumeTrends(periods)
      };
    } catch (error) {
      logger.error('Error analyzing trends:', error);
      return {
        sentiment: [],
        volume: []
      };
    }
  }

  calculateSentimentTrends(periods) {
    return Object.entries(periods).map(([period, periodReviews]) => {
      const total = periodReviews.length;
      const positive = periodReviews.filter(r => r.sentiment === 'positive').length;
      const negative = periodReviews.filter(r => r.sentiment === 'negative').length;
      
      return {
        period,
        positivePercentage: (positive / total) * 100,
        negativePercentage: (negative / total) * 100,
        total
      };
    }).sort((a, b) => new Date(a.period) - new Date(b.period));
  }

  calculateVolumeTrends(periods) {
    return Object.entries(periods).map(([period, periodReviews]) => ({
      period,
      count: periodReviews.length
    })).sort((a, b) => new Date(a.period) - new Date(b.period));
  }

  groupByMonth(reviews) {
    return reviews.reduce((groups, review) => {
      const date = new Date(review.date);
      const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!groups[period]) {
        groups[period] = [];
      }
      groups[period].push(review);
      
      return groups;
    }, {});
  }
}

export default new TrendAnalyzer();