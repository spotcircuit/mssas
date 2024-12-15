import natural from 'natural';

class TextTokenizer {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
  }

  tokenize(text) {
    if (!text || typeof text !== 'string') {
      return [];
    }
    return this.tokenizer.tokenize(text.toLowerCase());
  }
}

export default new TextTokenizer();