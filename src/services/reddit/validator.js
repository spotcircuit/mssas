import { logger } from '../../utils/logger.js';
import nodeStore from '../../data/reviews/nodeStore.js';

class ReviewValidator {
  async validateAndDeduplicate(reviews) {
    try {
      // Get existing reviews
      const existingReviews = await nodeStore.getAll();
      logger.info(`Found ${existingReviews.length} existing reviews`);

      // Create lookup sets for quick duplicate checking
      const existingUrls = new Set(existingReviews.map(r => r.url));
      const existingContent = new Set(existingReviews.map(r => `${r.title}${r.text}`));

      // Filter out duplicates and validate remaining reviews
      const newReviews = reviews.filter(review => {
        // Check for URL duplicates
        if (existingUrls.has(review.url)) {
          logger.info(`Skipping duplicate review with URL: ${review.url}`);
          return false;
        }

        // Check for content duplicates
        const content = `${review.title}${review.text}`;
        if (existingContent.has(content)) {
          logger.info(`Skipping review with duplicate content`);
          return false;
        }

        // Basic validation
        if (!this.isValidReview(review)) {
          logger.info(`Skipping invalid review`);
          return false;
        }

        return true;
      });

      logger.info(`Found ${newReviews.length} new valid reviews to add`);
      return newReviews;
    } catch (error) {
      logger.error('Error validating reviews:', error);
      return [];
    }
  }

  isValidReview(review) {
    // Must have required fields
    if (!review.title || !review.text || !review.date || !review.url) {
      return false;
    }

    // Text must be meaningful
    if (review.text.length < 50) {
      return false;
    }

    // Must have location data
    if (!review.city || !review.state || !review.spaName) {
      return false;
    }

    // Must be a real review (not promotional)
    const promoTerms = ['promo', 'discount', 'offer', 'deal', 'coupon'];
    const isPromo = promoTerms.some(term => 
      review.text.toLowerCase().includes(term) || 
      review.title.toLowerCase().includes(term)
    );

    return !isPromo;
  }
}

export default new ReviewValidator();