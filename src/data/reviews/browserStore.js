import { nanoid } from 'nanoid';
import { logger } from '../../utils/logger.js';
import { realReviews } from './realReviews.js';

class BrowserReviewStore {
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

      // After DB is initialized, sync with realReviews data
      await this.syncWithRealReviews();
      
      this.initialized = true;
      logger.info('Browser review store initialized');
    } catch (error) {
      logger.error('Failed to initialize browser review store:', error);
      throw error;
    }
  }

  async syncWithRealReviews() {
    try {
      // Get existing reviews
      const existingReviews = await this.getAll();
      
      // Only sync if we have new reviews
      if (!existingReviews.length && realReviews?.length) {
        await this.batchCreate(realReviews);
        logger.info(`Synced ${realReviews.length} reviews from realReviews data`);
      }
    } catch (error) {
      logger.error('Failed to sync with realReviews data:', error);
    }
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  async batchCreate(reviews) {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const timestamp = new Date().toISOString();

        reviews.forEach(review => {
          const reviewWithId = {
            ...review,
            id: review.id || nanoid(),
            createdAt: review.createdAt || timestamp,
            updatedAt: timestamp
          };
          store.add(reviewWithId);
        });

        transaction.oncomplete = () => resolve(reviews);
        transaction.onerror = () => reject(transaction.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  async clear() {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new BrowserReviewStore();