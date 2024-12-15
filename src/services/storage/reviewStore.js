import { logger } from '../../utils/logger.js';

class ReviewStore {
  constructor() {
    this.reviews = [];
  }

  saveReviews(reviews) {
    try {
      this.reviews = reviews;
      logger.info(`Saved ${reviews.length} reviews to store`);
      return true;
    } catch (error) {
      logger.error('Error saving reviews:', error);
      return false;
    }
  }

  getReviews() {
    return this.reviews;
  }

  clear() {
    this.reviews = [];
  }
}

export default new ReviewStore();