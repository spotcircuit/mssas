import { CATEGORY_KEYWORDS } from './constants.js';

export function findCategoryMatches(text) {
  const matches = new Map();
  const lowerText = text.toLowerCase();

  Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
    const matchCount = keywords.reduce((count, keyword) => {
      return count + (lowerText.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    
    if (matchCount > 0) {
      matches.set(category, matchCount);
    }
  });

  return matches;
}

export function determineTopCategory(matches) {
  if (matches.size === 0) return null;

  const [topCategory] = [...matches.entries()].reduce((max, current) => 
    current[1] > max[1] ? current : max
  );

  return topCategory;
}