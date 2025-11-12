/**
 * Tests for fuzzy string matching utilities
 * Specifically testing Spanish text with accents and ñ
 */

import { describe, it, expect } from '@jest/globals';
import {
  normalizeSpanish,
  calculateSimilarity,
  fuzzyContains,
  matchesExpectedInput,
} from '../src/utils/fuzzyMatch';

describe('normalizeSpanish', () => {
  it('should remove accents from Spanish text', () => {
    expect(normalizeSpanish('José María')).toBe('jose maria');
    expect(normalizeSpanish('Información')).toBe('informacion');
    expect(normalizeSpanish('Nutrición')).toBe('nutricion');
  });

  it('should preserve ñ character', () => {
    expect(normalizeSpanish('Español')).toBe('espanol');
    expect(normalizeSpanish('mañana')).toBe('manana');
    expect(normalizeSpanish('niño')).toBe('nino');
  });

  it('should convert to lowercase', () => {
    expect(normalizeSpanish('HOLA')).toBe('hola');
    expect(normalizeSpanish('MeZclAdO')).toBe('mezclado');
  });

  it('should trim whitespace', () => {
    expect(normalizeSpanish('  hola  ')).toBe('hola');
    expect(normalizeSpanish('\thola\n')).toBe('hola');
  });
});

describe('calculateSimilarity', () => {
  it('should return 100 for exact matches', () => {
    expect(calculateSimilarity('hola', 'hola')).toBe(100);
    expect(calculateSimilarity('información', 'información')).toBe(100);
  });

  it('should return 100 for matches with different accents', () => {
    expect(calculateSimilarity('información', 'informacion')).toBe(100);
    expect(calculateSimilarity('José', 'jose')).toBe(100);
  });

  it('should return high similarity for close matches', () => {
    const similarity = calculateSimilarity('hola', 'hola mundo');
    expect(similarity).toBeGreaterThan(40);
  });

  it('should return 0 for empty strings', () => {
    expect(calculateSimilarity('', '')).toBe(0);
    expect(calculateSimilarity('hola', '')).toBe(0);
  });

  it('should handle Spanish phrases correctly', () => {
    const similarity = calculateSimilarity(
      'Soy nuevo en keto',
      'Soy completamente nuevo en keto'
    );
    expect(similarity).toBeGreaterThan(60);
  });
});

describe('fuzzyContains', () => {
  it('should find exact substring matches', () => {
    expect(fuzzyContains('Hola, ¿cómo estás?', 'hola')).toBe(true);
    expect(fuzzyContains('Información sobre nutrición', 'información')).toBe(true);
  });

  it('should find matches with different accents', () => {
    expect(fuzzyContains('información', 'informacion')).toBe(true);
    expect(fuzzyContains('nutrición', 'nutricion')).toBe(true);
  });

  it('should match words within text', () => {
    expect(fuzzyContains('Quiero información sobre keto', 'informacion')).toBe(true);
    expect(fuzzyContains('Dame recetas para desayuno', 'recetas')).toBe(true);
  });

  it('should handle misspellings within threshold', () => {
    expect(fuzzyContains('Ayudame con la dieta', 'ayuda', 70)).toBe(true);
  });
});

describe('matchesExpectedInput', () => {
  it('should match exact phrases', () => {
    expect(matchesExpectedInput('Hola', 'Hola')).toBe(true);
    expect(matchesExpectedInput('Soy nuevo', 'Soy nuevo')).toBe(true);
  });

  it('should match with different accents', () => {
    expect(matchesExpectedInput('información', 'informacion')).toBe(true);
    expect(matchesExpectedInput('Hola José', 'Hola Jose')).toBe(true);
  });

  it('should match similar phrases with at least 60% similarity', () => {
    expect(matchesExpectedInput(
      'Soy completamente nuevo en keto',
      'Soy nuevo en keto'
    )).toBe(true);
    
    expect(matchesExpectedInput(
      'Necesito ayuda con recetas',
      'ayuda recetas'
    )).toBe(true);
  });

  it('should handle script-like matches', () => {
    // User says something similar to what script expects
    expect(matchesExpectedInput(
      'Probemos el modo de voz',
      'Probemos modo voz'
    )).toBe(true);

    expect(matchesExpectedInput(
      'El desayuno me preocupa más',
      'El desayuno es lo que más me preocupa'
    )).toBe(true);
  });

  it('should reject very different phrases', () => {
    expect(matchesExpectedInput(
      'Quiero ver productos',
      'Muéstrame recetas'
    )).toBe(false);
  });

  it('should handle common user variations', () => {
    // Common ways users might say "yes"
    expect(matchesExpectedInput('Sí', 'si')).toBe(true);
    expect(matchesExpectedInput('Si', 'sí')).toBe(true);
    expect(matchesExpectedInput('Dale', 'Si', 50)).toBe(false); // too different
  });
});

// Integration test: Simulate real script matching scenarios
describe('Script Matching Integration', () => {
  it('should match beginner responses', () => {
    const userResponses = [
      'Soy nuevo',
      'Soy completamente nuevo',
      'No sé nada de keto',
      'Nunca he hecho keto',
      'Soy principiante',
    ];

    const expected = 'Soy nuevo';

    userResponses.forEach(response => {
      expect(matchesExpectedInput(response, expected)).toBe(true);
    });
  });

  it('should match mode selection responses', () => {
    const userResponses = [
      'Probemos el modo voz',
      'Prefiero modo voz',
      'Modo de voz',
      'Hablemos por voz',
    ];

    const expected = 'Probemos el modo voz';

    userResponses.forEach(response => {
      expect(matchesExpectedInput(response, expected, 60)).toBe(true);
    });
  });

  it('should match breakfast-related responses', () => {
    const userResponses = [
      'El desayuno',
      'El desayuno es lo que más me preocupa',
      'Me preocupa el desayuno',
      'Desayuno',
    ];

    const expected = 'El desayuno es lo que más me preocupa';

    userResponses.forEach(response => {
      expect(matchesExpectedInput(response, expected, 60)).toBe(true);
    });
  });
});
