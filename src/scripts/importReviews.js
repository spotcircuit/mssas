import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { logger } from '../utils/logger.js';
import nodeStore from '../data/reviews/nodeStore.js';
import { reviewAnalyzer } from '../services/analysis/index.js';

async function importReviews() {
  try {
    // Initialize store
    await nodeStore.initialize();
    logger.info('Node review store initialized');

    // Read reviews from JSON file
    const reviewsPath = join(process.cwd(), 'data', 'reviews.json');
    const reviews = JSON.parse(readFileSync(reviewsPath, 'utf8'));
    logger.info(`Found ${reviews.length} reviews to import`);

    // Analyze reviews (add/update sentiment and category)
    logger.info('Analyzing reviews...');
    const analyzedReviews = reviewAnalyzer.analyzeReviews(reviews);

    // Save to store
    await nodeStore.clear(); // Clear existing reviews
    await nodeStore.batchCreate(analyzedReviews);
    logger.info(`Successfully imported ${analyzedReviews.length} reviews`);

    // Log import summary
    const summary = {
      totalImported: analyzedReviews.length,
      sentimentDistribution: countBySentiment(analyzedReviews),
      categoryDistribution: countByCategory(analyzedReviews)
    };

    logger.info('Import Summary:', summary);

    // Create the reviews directory if it doesn't exist
    const reviewsDir = join(process.cwd(), 'src', 'data', 'reviews');
    if (!existsSync(reviewsDir)) {
      mkdirSync(reviewsDir, { recursive: true });
    }

    // Now sync with realReviews.js for browser use
    const fileContent = `// This file is auto-generated. Do not edit directly.
export const realReviews = ${JSON.stringify(analyzedReviews, null, 2)};`;

    const outputPath = join(reviewsDir, 'realReviews.js');
    writeFileSync(outputPath, fileContent);
    logger.info('Successfully synced reviews to realReviews.js');

  } catch (error) {
    logger.error('Error importing reviews:', error);
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
    acc[review.category] = (acc[review.category] || 0) + 1;
    return acc;
  }, {});
}

// Run the import
importReviews();