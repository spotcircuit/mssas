import { SENTIMENT_TYPES } from '../../../data/reviews/constants.js';
import { SENTIMENT_WORDS } from './constants.js';

export function tokenize(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  // Split into sentences first
  const sentences = text.toLowerCase()
    .split(/[.!?]+/)
    .filter(s => s.length > 0);

  // Process each sentence
  return sentences.map(sentence => {
    return sentence
      .trim()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
  });
}

export function calculateSentimentScore(sentences) {
  let totalScore = 0;
  let contextMultiplier = 1;
  let hasStrongIndicator = false;

  sentences.forEach((words, sentenceIndex) => {
    let sentenceScore = 0;
    let hasNegator = false;
    let lastNegatorIndex = -1;

    // Look for phrase matches first (higher weight for phrases)
    const sentenceText = words.join(' ');
    SENTIMENT_WORDS.positive.phrases.forEach(phrase => {
      if (sentenceText.includes(phrase)) {
        sentenceScore += 5; // Increased weight for phrases
        hasStrongIndicator = true;
      }
    });
    SENTIMENT_WORDS.negative.phrases.forEach(phrase => {
      if (sentenceText.includes(phrase)) {
        sentenceScore -= 5; // Increased weight for phrases
        hasStrongIndicator = true;
      }
    });

    // Process individual words with context
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const prevWord = i > 0 ? words[i - 1] : null;
      const nextWord = i < words.length - 1 ? words[i + 1] : null;

      // Check for negators
      if (SENTIMENT_WORDS.modifiers.negators.includes(word)) {
        hasNegator = true;
        lastNegatorIndex = i;
        continue;
      }

      // Get base word score with increased weights
      let wordScore = 0;
      if (SENTIMENT_WORDS.positive.strong[word]) {
        wordScore = SENTIMENT_WORDS.positive.strong[word] * 1.5; // Boost strong words
        hasStrongIndicator = true;
      }
      else if (SENTIMENT_WORDS.positive.moderate[word]) wordScore = SENTIMENT_WORDS.positive.moderate[word] * 1.2;
      else if (SENTIMENT_WORDS.negative.strong[word]) {
        wordScore = SENTIMENT_WORDS.negative.strong[word] * 1.5; // Boost strong words
        hasStrongIndicator = true;
      }
      else if (SENTIMENT_WORDS.negative.moderate[word]) wordScore = SENTIMENT_WORDS.negative.moderate[word] * 1.2;

      // Apply modifiers with increased impact
      if (prevWord) {
        if (SENTIMENT_WORDS.modifiers.intensifiers[prevWord]) {
          wordScore *= SENTIMENT_WORDS.modifiers.intensifiers[prevWord] * 1.2;
        } else if (SENTIMENT_WORDS.modifiers.diminishers[prevWord]) {
          wordScore *= SENTIMENT_WORDS.modifiers.diminishers[prevWord];
        }
      }

      // Apply negation more precisely
      if (hasNegator && i - lastNegatorIndex <= 3) { // Only negate within 3 words
        wordScore *= -1.2; // Increased negation impact
      }

      sentenceScore += wordScore;
    }

    // Weight first and last sentences more heavily
    if (sentenceIndex === 0 || sentenceIndex === sentences.length - 1) {
      sentenceScore *= 1.3; // Increased weight for key sentences
    }

    // Add to total score with context
    totalScore += (sentenceScore * contextMultiplier);

    // Adjust context multiplier for next sentence
    contextMultiplier *= 0.9;
  });

  // Boost score if we have strong indicators
  if (hasStrongIndicator) {
    totalScore *= 1.3; // Increased boost for strong indicators
  }

  return totalScore;
}

export function mapScoreToSentiment(score) {
  // More aggressive thresholds to reduce neutral classifications
  if (score >= 1.5) return SENTIMENT_TYPES.POSITIVE;
  if (score <= -1.5) return SENTIMENT_TYPES.NEGATIVE;
  
  // For scores close to zero, lean towards sentiment unless truly neutral
  if (score > 0.3) return SENTIMENT_TYPES.POSITIVE;
  if (score < -0.3) return SENTIMENT_TYPES.NEGATIVE;
  
  return SENTIMENT_TYPES.NEUTRAL;
}