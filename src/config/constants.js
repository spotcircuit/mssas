export const REVIEW_PLATFORMS = {
  YELP: 'yelp',
  GOOGLE: 'google',
  REALSELF: 'realself',
  REDDIT: 'reddit'
};

export const SENTIMENT_TYPES = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral'
};

export const FEEDBACK_CATEGORIES = {
  BOOKING: 'booking',
  PRICING: 'pricing',
  AFTERCARE: 'aftercare',
  TRUST: 'trust',
  OTHER: 'other'
};

export const REDDIT_CONFIG = {
  SUBREDDITS: [
    'Skincare_Addiction',
    'PlasticSurgery',
    'SkincareAddicts'
  ],
  SEARCH_TIMEFRAMES: ['month', 'year'],
  POSTS_PER_REQUEST: 25,
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 30,
    DELAY_BETWEEN_SUBREDDITS: 2000
  }
};

export const DATA_COLLECTION_INTERVAL = '0 0 * * *'; // Daily at midnight