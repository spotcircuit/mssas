import { nanoid } from 'nanoid';
import { logger } from '../../utils/logger.js';
import { realReviews } from './index.js';

class ReviewStore {
  constructor() {
    this.dbName = 'medicalSpaDB';
    this.storeName = 'reviews';
    this.version = 1;
    this.db = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      this.db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: 'id' });
          }
        };
      });

      // Load reviews from JSON file into IndexedDB
      await this.syncWithJsonData();

      this.initialized = true;
      logger.info('Review store initialized');
    } catch (error) {
      logger.error('Failed to initialize review store:', error);
      throw error;
    }
  }

  async syncWithJsonData() {
    try {
      // Get existing reviews from IndexedDB
      const existingReviews = await this.getAll();
      const existingUrls = new Set(existingReviews.map(r => r.url));

      // Filter out reviews we already have
      const newReviews = realReviews.filter(review => !existingUrls.has(review.url));

      if (newReviews.length > 0) {
        await this.batchCreate(newReviews);
        logger.info(`Synced ${newReviews.length} new reviews from JSON data`);
      }
    } catch (error) {
      logger.error('Failed to sync with JSON data:', error);
    }
  }

  // ... rest of the ReviewStore class remains the same ...
}

export default new ReviewStore();