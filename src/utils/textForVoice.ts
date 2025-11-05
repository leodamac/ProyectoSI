/**
 * Utility functions to sanitize text for voice output
 * Removes markdown formatting, emojis, and other visual elements
 */

/**
 * Removes markdown formatting from text
 */
export function stripMarkdown(text: string): string {
  let cleanText = text;

  // Remove code blocks
  cleanText = cleanText.replace(/```[\s\S]*?```/g, '');
  cleanText = cleanText.replace(/`([^`]+)`/g, '$1');

  // Remove headers
  cleanText = cleanText.replace(/^#{1,6}\s+/gm, '');

  // Remove bold/italic
  cleanText = cleanText.replace(/\*\*\*([^*]+)\*\*\*/g, '$1');
  cleanText = cleanText.replace(/\*\*([^*]+)\*\*/g, '$1');
  cleanText = cleanText.replace(/\*([^*]+)\*/g, '$1');
  cleanText = cleanText.replace(/___([^_]+)___/g, '$1');
  cleanText = cleanText.replace(/__([^_]+)__/g, '$1');
  cleanText = cleanText.replace(/_([^_]+)_/g, '$1');

  // Remove links but keep text
  cleanText = cleanText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove images
  cleanText = cleanText.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  // Remove horizontal rules
  cleanText = cleanText.replace(/^[-*_]{3,}$/gm, '');

  // Remove list markers
  cleanText = cleanText.replace(/^[\s]*[-*+]\s+/gm, '');
  cleanText = cleanText.replace(/^[\s]*\d+\.\s+/gm, '');

  // Remove blockquotes
  cleanText = cleanText.replace(/^>\s+/gm, '');

  return cleanText;
}

/**
 * Removes emojis from text
 */
export function stripEmojis(text: string): string {
  // Unicode ranges for emojis
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}]|[\u{FE00}-\u{FE0F}]|[\u{E0020}-\u{E007F}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F251}]/gu;
  
  return text.replace(emojiRegex, '');
}

/**
 * Removes special symbols and visual markers
 */
export function stripSymbols(text: string): string {
  let cleanText = text;

  // Remove common visual markers
  cleanText = cleanText.replace(/[✓✔✅✗✘❌➜→]/g, '');
  cleanText = cleanText.replace(/[•·]/g, '');

  return cleanText;
}

/**
 * Sanitizes text for voice output by removing all visual elements
 */
export function sanitizeForVoice(text: string): string {
  let cleanText = text;

  // Apply all sanitization steps
  cleanText = stripMarkdown(cleanText);
  cleanText = stripEmojis(cleanText);
  cleanText = stripSymbols(cleanText);

  // Clean up multiple spaces and newlines
  cleanText = cleanText.replace(/\n{3,}/g, '\n\n');
  cleanText = cleanText.replace(/[ \t]{2,}/g, ' ');
  cleanText = cleanText.trim();

  return cleanText;
}

/**
 * Converts bullet points to spoken format
 * Note: List counter resets for each separate list in the text
 */
export function convertListsToSpeech(text: string): string {
  const lines = text.split('\n');
  let listCounter = 0;
  const ordinals = ['primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo'];

  const processedLines = lines.map(line => {
    // Check if line starts with list marker
    if (/^[\s]*[-*+•]\s+/.test(line) || /^[\s]*\d+\.\s+/.test(line)) {
      const content = line.replace(/^[\s]*[-*+•]\s+/, '').replace(/^[\s]*\d+\.\s+/, '');
      const ordinal = listCounter < ordinals.length ? ordinals[listCounter] : `número ${listCounter + 1}`;
      listCounter++;
      return `${ordinal}, ${content}`;
    }
    listCounter = 0;
    return line;
  });

  return processedLines.join('. ');
}
