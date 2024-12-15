import { CATEGORIES } from '../../config/categories.js';
import { logger } from '../../utils/logger.js';

class CategoryClassifier {
  classifyReview(text) {
    if (!text || typeof text !== 'string') {
      return null;
    }

    try {
      const lowerText = text.toLowerCase();
      const matches = new Map();

      // Count keyword matches for each category
      Object.values(CATEGORIES).forEach(category => {
        const matchCount = category.keywords.reduce((count, keyword) => {
          return count + (lowerText.includes(keyword) ? 1 : 0);
        }, 0);
        
        if (matchCount > 0) {
          matches.set(category.id, matchCount);
        }
      });

      // Return category with most matches, or null if no matches
      if (matches.size === 0) return null;

      const [topCategory] = [...matches.entries()].reduce((max, current) => 
        current[1] > max[1] ? current : max
      );

      return topCategory;
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