import { SENTIMENT_WORDS } from './constants.js';
import { tokenize, calculateSentimentScore, mapScoreToSentiment } from './utils.js';
import { logger } from '../../../utils/logger.js';

class SentimentAnalyzer {
  analyzeSentiment(text) {
    if (!text || typeof text !== 'string') {
      return 'neutral';
    }

    try {
      // Break text into sentences and tokenize
      const sentences = tokenize(text);
      
      // Calculate sentiment score with context
      const score = calculateSentimentScore(sentences);
      
      // Map score to sentiment category
      return mapScoreToSentiment(score);
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