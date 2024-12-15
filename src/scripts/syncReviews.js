import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils/logger.js';

// Sync reviews.json data with realReviews.js
function syncReviews() {
  try {
    // Read reviews from JSON file
    const reviewsPath = join(process.cwd(), 'data', 'reviews.json');
    const reviews = JSON.parse(readFileSync(reviewsPath, 'utf8'));
    
    // Create realReviews.js content
    const fileContent = `// This file is auto-generated. Do not edit directly.
export const realReviews = ${JSON.stringify(reviews, null, 2)};`;

    // Write to realReviews.js
    const outputPath = join(process.cwd(), 'src', 'data', 'reviews', 'realReviews.js');
    writeFileSync(outputPath, fileContent);

    logger.info(`Successfully synced ${reviews.length} reviews to realReviews.js`);
  } catch (error) {
    logger.error('Error syncing reviews:', error);
  }
}

syncReviews();