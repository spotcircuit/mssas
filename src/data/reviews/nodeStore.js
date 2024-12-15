import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import { logger } from '../../utils/logger.js';

class NodeReviewStore {
  constructor() {
    this.dataPath = path.join(process.cwd(), 'data', 'reviews.json');
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Create data directory if it doesn't exist
      const dataDir = path.dirname(this.dataPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Create reviews file if it doesn't exist
      if (!fs.existsSync(this.dataPath)) {
        fs.writeFileSync(this.dataPath, JSON.stringify([]));
      }

      this.initialized = true;
      logger.info('Node review store initialized');
    } catch (error) {
      logger.error('Failed to initialize node review store:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Failed to read reviews:', error);
      return [];
    }
  }

  async batchCreate(reviews) {
    try {
      const existingReviews = await this.getAll();
      const timestamp = new Date().toISOString();
      
      const newReviews = reviews.map(review => ({
        id: nanoid(),
        ...review,
        createdAt: timestamp,
        updatedAt: timestamp
      }));

      const updatedReviews = [...existingReviews, ...newReviews];
      fs.writeFileSync(this.dataPath, JSON.stringify(updatedReviews, null, 2));
      
      return newReviews;
    } catch (error) {
      logger.error('Failed to batch create reviews:', error);
      throw error;
    }
  }

  async clear() {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify([]));
      logger.info('Cleared all reviews');
    } catch (error) {
      logger.error('Failed to clear reviews:', error);
      throw error;
    }
  }
}

export default new NodeReviewStore();