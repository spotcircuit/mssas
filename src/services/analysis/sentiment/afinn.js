/**
 * AFINN-based word list with sentiment scores
 * Scores range from -5 (most negative) to +5 (most positive)
 */
export function getAfinnWordList() {
  return {
    // Positive words
    'great': 3,
    'excellent': 4,
    'amazing': 4,
    'wonderful': 4,
    'fantastic': 4,
    'professional': 2,
    'helpful': 2,
    'friendly': 2,
    'clean': 1,
    'smooth': 2,
    'trustworthy': 3,
    'reliable': 2,
    'clear': 1,
    'satisfied': 2,
    'recommend': 2,
    'love': 3,
    'perfect': 3,
    'best': 3,
    'quality': 2,
    'expert': 2,
    'skilled': 2,
    'comfortable': 2,
    'thorough': 2,
    'knowledgeable': 2,
    
    // Negative words
    'terrible': -4,
    'horrible': -4,
    'awful': -3,
    'bad': -3,
    'poor': -2,
    'disappointing': -2,
    'rude': -3,
    'unprofessional': -3,
    'expensive': -1,
    'overpriced': -2,
    'wait': -1,
    'waiting': -1,
    'frustrated': -2,
    'frustrating': -2,
    'dirty': -2,
    'unclear': -1,
    'unhelpful': -2,
    'worst': -3,
    'painful': -2,
    'uncomfortable': -2,
    'rushed': -2,
    'inexperienced': -2,
    'messy': -2
  };
}