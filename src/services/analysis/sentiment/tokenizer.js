/**
 * Tokenizes text into words, converting to lowercase and removing punctuation
 * @param {string} text - The text to tokenize
 * @returns {string[]} Array of tokens
 */
export function tokenize(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  // Convert to lowercase and split on whitespace and punctuation
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)            // Split on whitespace
    .filter(word => word.length > 0); // Remove empty strings
}