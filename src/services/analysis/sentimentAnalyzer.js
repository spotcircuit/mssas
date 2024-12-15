import { logger } from '../../utils/logger.js';

class SentimentAnalyzer {
  constructor() {
    this.positiveWords = new Set([
      'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
      'professional', 'helpful', 'friendly', 'clean', 'smooth',
      'trustworthy', 'reliable', 'clear', 'satisfied', 'recommend'
    ]);

    this.negativeWords = new Set([
      'terrible', 'horrible', 'awful', 'bad', 'poor',
      'disappointing', 'rude', 'unprofessional', 'expensive',
      'overpriced', 'wait', 'frustrated', 'dirty', 'unclear'
    ]);
  }

  analyzeSentiment(text) {
    if (!text || typeof text !== 'string') {
      return 'neutral';
    }

    try {
      const words = text.toLowerCase().split(/\s+/);
      let score = 0;

      words.forEach(word => {
        if (this.positiveWords.has(word)) score++;
        if (this.negativeWords.has(word)) score--;
      });

      if (score > 0) return 'positive';
      if (score < 0) return 'negative';
      return 'neutral';
    } catch (error) {
      logger.error('Error analyzing sentiment:', error);
      return 'neutral';
    }
  }

  batchAnalyze(reviews) {
    return reviews.map(review => ({
      ...review,
      sentiment: this.analyzeSentiment(review.text)
    }));
  }
}

export default new SentimentAnalyzer();