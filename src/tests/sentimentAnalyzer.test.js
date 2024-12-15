import { expect, test } from 'vitest';
import sentimentAnalyzer from '../services/analysis/sentimentAnalyzer.js';
import { SENTIMENT_TYPES } from '../config/constants.js';

test('analyzes positive sentiment correctly', () => {
  const text = "Great experience! The staff was very professional and caring.";
  expect(sentimentAnalyzer.analyzeSentiment(text)).toBe(SENTIMENT_TYPES.POSITIVE);
});

test('analyzes negative sentiment correctly', () => {
  const text = "Terrible service. Long wait times and rude staff.";
  expect(sentimentAnalyzer.analyzeSentiment(text)).toBe(SENTIMENT_TYPES.NEGATIVE);
});

test('analyzes neutral sentiment correctly', () => {
  const text = "The procedure was as expected.";
  expect(sentimentAnalyzer.analyzeSentiment(text)).toBe(SENTIMENT_TYPES.NEUTRAL);
});