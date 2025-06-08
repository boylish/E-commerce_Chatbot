// backend/utils/extractKeyword.js
const extractKeyword = (input) => {
  if (!input) return [];

  const stopWords = new Set([
    'i', 'want', 'to', 'buy', 'a', 'an', 'the', 'me', 'you', 'do', 'have', 'any',
    'can', 'get', 'show', 'please', 'with', 'for', 'looking', 'need', 'there',
    'is', 'it', 'on', 'of', 'phone', 'laptop'
  ]);

  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // remove punctuation
    .split(/\s+/)
    .filter(word => word && !stopWords.has(word));
};

module.exports = extractKeyword;
