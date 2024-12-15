import sentimentAnalyzer from './sentiment/analyzer.js';
import categoryClassifier from './category/classifier.js';
import { logger } from '../../utils/logger.js';

class ReviewAnalyzer {
  analyzeReviews(reviews = []) {
    if (!Array.isArray(reviews)) {
      logger.error('Invalid input: reviews must be an array');
      return [];
    }

    try {
      const analyzed = reviews.map(review => ({
        ...review,
        sentiment: sentimentAnalyzer.analyzeSentiment(review.text),
        category: categoryClassifier.classifyReview(review.text)
      }));

      this.logAnalysisSummary(analyzed);
      return analyzed;
    } catch (error) {
      logger.error('Error analyzing reviews:', error);
      return [];
    }
  }

  logAnalysisSummary(reviews) {
    const sentiments = reviews.reduce((acc, r) => {
      acc[r.sentiment] = (acc[r.sentiment] || 0) + 1;
      return acc;
    }, {});

    const categories = reviews.reduce((acc, r) => {
      if (r.category) {
        acc[r.category] = (acc[r.category] || 0) + 1;
      }
      return acc;
    }, {});

    logger.info('Analysis Summary:', {
      totalReviews: reviews.length,
      sentiments,
      categories
    });
  }
}

export default new ReviewAnalyzer();