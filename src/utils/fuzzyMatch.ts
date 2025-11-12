/**
 * Fuzzy String Matching Utilities
 * Handles Spanish accents, ñ, and provides similarity scoring
 */

/**
 * Normalize Spanish text by removing accents and converting to lowercase
 * Preserves ñ as a distinct character
 */
export function normalizeSpanish(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents but preserve base characters
    .trim();
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching
 */
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Calculate similarity percentage between two strings
 * Returns a value between 0 and 100
 * 
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @param normalize - Whether to normalize Spanish characters (default: true)
 * @returns Similarity percentage (0-100)
 */
export function calculateSimilarity(
  str1: string,
  str2: string,
  normalize: boolean = true
): number {
  if (!str1 || !str2) return 0;

  // Normalize if requested
  const s1 = normalize ? normalizeSpanish(str1) : str1.toLowerCase().trim();
  const s2 = normalize ? normalizeSpanish(str2) : str2.toLowerCase().trim();

  // Exact match
  if (s1 === s2) return 100;

  // Calculate Levenshtein distance
  const distance = levenshteinDistance(s1, s2);
  const maxLen = Math.max(s1.length, s2.length);

  // Convert distance to similarity percentage
  const similarity = ((maxLen - distance) / maxLen) * 100;

  return Math.round(similarity);
}

/**
 * Check if a string contains another with fuzzy matching
 * Useful for matching phrases within longer text
 * 
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @param threshold - Minimum similarity threshold (default: 60)
 * @returns true if pattern is found with sufficient similarity
 */
export function fuzzyContains(
  text: string,
  pattern: string,
  threshold: number = 60
): boolean {
  if (!text || !pattern) return false;

  const normalizedText = normalizeSpanish(text);
  const normalizedPattern = normalizeSpanish(pattern);

  // Exact substring match
  if (normalizedText.includes(normalizedPattern)) return true;

  // Try to find pattern in words
  const words = normalizedText.split(/\s+/);
  const patternWords = normalizedPattern.split(/\s+/);

  // Check if all pattern words have matches
  for (const patternWord of patternWords) {
    if (patternWord.length < 3) continue; // Skip very short words

    let found = false;
    for (const word of words) {
      const similarity = calculateSimilarity(word, patternWord, false);
      if (similarity >= threshold) {
        found = true;
        break;
      }
    }

    if (!found && patternWord.length >= 3) {
      return false; // Required word not found
    }
  }

  return true;
}

/**
 * Find the best matching string from an array
 * 
 * @param input - The input string to match
 * @param candidates - Array of candidate strings
 * @param threshold - Minimum similarity threshold (default: 60)
 * @returns Best matching string or null if no match meets threshold
 */
export function findBestMatch(
  input: string,
  candidates: string[],
  threshold: number = 60
): { match: string; similarity: number } | null {
  if (!input || !candidates.length) return null;

  let bestMatch: string | null = null;
  let bestSimilarity = 0;

  for (const candidate of candidates) {
    const similarity = calculateSimilarity(input, candidate);
    if (similarity >= threshold && similarity > bestSimilarity) {
      bestMatch = candidate;
      bestSimilarity = similarity;
    }
  }

  return bestMatch ? { match: bestMatch, similarity: bestSimilarity } : null;
}

/**
 * Check if input matches expected input with fuzzy matching
 * Specifically designed for script matching
 * 
 * @param userInput - What the user actually said/typed
 * @param expectedInput - What the script expects
 * @param threshold - Minimum similarity threshold (default: 60)
 * @returns true if match is good enough
 */
export function matchesExpectedInput(
  userInput: string,
  expectedInput: string,
  threshold: number = 60
): boolean {
  if (!userInput || !expectedInput) return false;

  // Direct fuzzy match
  const directSimilarity = calculateSimilarity(userInput, expectedInput);
  if (directSimilarity >= threshold) return true;

  // Check if user input contains the expected input (or vice versa)
  if (fuzzyContains(userInput, expectedInput, threshold)) return true;
  if (fuzzyContains(expectedInput, userInput, threshold)) return true;

  return false;
}
