import reviewStore from './store.js';
import { logger } from '../../utils/logger.js';

export async function getReviewStats() {
  try {
    const reviews = await reviewStore.getAll();
    
    return {
      total: reviews.length,
      bySentiment: countBySentiment(reviews),
      byCategory: countByCategory(reviews),
      byLocation: countByLocation(reviews)
    };
  } catch (error) {
    logger.error('Failed to get review stats:', error);
    throw error;
  }
}

export async function getRecentReviews(limit = 10) {
  try {
    const reviews = await reviewStore.getAll();
    
    return reviews
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  } catch (error) {
    logger.error('Failed to get recent reviews:', error);
    throw error;
  }
}

export async function getTopLocations(limit = 5) {
  try {
    const reviews = await reviewStore.getAll();
    const locations = countByLocation(reviews);
    
    return Object.entries(locations)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([location, count]) => ({ location, count }));
  } catch (error) {
    logger.error('Failed to get top locations:', error);
    throw error;
  }
}

// Helper functions
function countBySentiment(reviews) {
  return reviews.reduce((acc, review) => {
    if (review.sentiment) {
      acc[review.sentiment] = (acc[review.sentiment] || 0) + 1;
    }
    return acc;
  }, {});
}

function countByCategory(reviews) {
  return reviews.reduce((acc, review) => {
    if (review.category) {
      acc[review.category] = (acc[review.category] || 0) + 1;
    }
    return acc;
  }, {});
}

function countByLocation(reviews) {
  return reviews.reduce((acc, review) => {
    if (review.city && review.state) {
      const location = `${review.city}, ${review.state}`;
      acc[location] = (acc[location] || 0) + 1;
    }
    return acc;
  }, {});
}