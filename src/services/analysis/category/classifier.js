import { findCategoryMatches, determineTopCategory } from './utils.js';
import { logger } from '../../../utils/logger.js';

class CategoryClassifier {
  classifyReview(text) {
    if (!text || typeof text !== 'string') {
      return null;
    }

    try {
      const matches = findCategoryMatches(text);
      return determineTopCategory(matches);
    } catch (error) {
      logger.error('Error classifying review:', error);
      return null;
    }
  }

  batchClassify(reviews) {
    return reviews.map(review => ({
      ...review,
      category: this.classifyReview(review.text)
    }));
  }
}

export default new CategoryClassifier();