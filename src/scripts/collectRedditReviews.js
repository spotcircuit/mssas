import { redditScraper } from '../services/reddit/index.js';
import { reviewAnalyzer } from '../services/analysis/index.js';
import { logger } from '../utils/logger.js';
import nodeStore from '../data/reviews/nodeStore.js';
import reviewValidator from '../services/reddit/validator.js';
import { REDDIT_CONFIG } from '../services/reddit/config.js';

async function collectRedditReviews(subredditType = 'ESTHETICS') {
  try {
    // Initialize the store
    await nodeStore.initialize();
    logger.info('Starting Reddit review collection...');

    // Get subreddit config
    const config = REDDIT_CONFIG[subredditType];
    if (!config) {
      logger.error(`Invalid subreddit type: ${subredditType}`);
      return;
    }

    logger.info(`Collecting reviews from r/${config.subreddit}...`);
    const scrapedReviews = await redditScraper.scrapeReviews(subredditType);

    if (scrapedReviews.length === 0) {
      logger.warn('No reviews collected from Reddit');
      return;
    }

    // Validate and deduplicate reviews
    const validReviews = await reviewValidator.validateAndDeduplicate(scrapedReviews);
    
    if (validReviews.length === 0) {
      logger.info('No new valid reviews to add');
      return;
    }

    // Analyze reviews
    logger.info('Analyzing reviews...');
    const analyzedReviews = reviewAnalyzer.analyzeReviews(validReviews);

    // Save reviews
    await nodeStore.batchCreate(analyzedReviews);
    logger.info(`Successfully saved ${analyzedReviews.length} reviews to the store`);

    // Log summary
    const summary = {
      totalScraped: scrapedReviews.length,
      savedReviews: analyzedReviews.length,
      sentimentDistribution: countBySentiment(analyzedReviews),
      categoryDistribution: countByCategory(analyzedReviews)
    };

    logger.info('Collection Summary:', summary);
  } catch (error) {
    logger.error('Error collecting Reddit reviews:', error);
  }
}

function countBySentiment(reviews) {
  return reviews.reduce((acc, review) => {
    acc[review.sentiment] = (acc[review.sentiment] || 0) + 1;
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

// Run the collection with specified subreddit type
const subredditType = process.argv[2] || 'ESTHETICS';
collectRedditReviews(subredditType);