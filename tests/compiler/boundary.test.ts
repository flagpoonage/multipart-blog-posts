import { generateBoundary, validateBoundary } from 'compiler/boundary';

describe('Boundary utilities', () => {
  describe('generateBoundary', () => {
    const boundary = generateBoundary();
    it('should generate a string', () => {
      expect(typeof boundary).toBe('string');
    });

    it('should generate a string of a specific format', () => {
      expect(boundary).toHaveLength(20);
      expect(boundary.slice(0, 4)).toBe('----');
      expect(boundary.slice(4)).toMatch(/^[a-z0-9]+$/);
    });
  });

  describe('validateBoundary', () => {
    it('identifies incorrect boundaries', () => {
      expect(validateBoundary('abcd')).toBe(false);
      expect(validateBoundary('abcd3tbdxgcxmwhu7epk')).toBe(false);
      expect(validateBoundary('--cd3tbdxgcxmwhu7epk')).toBe(false);
      expect(validateBoundary('---d3tbdxgcxmwhu7epk')).toBe(false);
      expect(validateBoundary('-----tbdxgcxmwhu7epk')).toBe(false);
      expect(validateBoundary(' ----3tbdxgcxmwhu7epk')).toBe(false);
      expect(validateBoundary('----3tbdxgcxmwhu7epk ')).toBe(false);
    });

    it('identifies correct boundaries', () => {
      expect(validateBoundary('----3tbdxgcxmwhu7epk')).toBe(true);
      expect(validateBoundary('----mas238gb8ordmo81')).toBe(true);
      expect(validateBoundary('----q14un3hizbh1gr0d')).toBe(true);
      expect(validateBoundary('----lhx1bffhaodegsyg')).toBe(true);
    });
  });
});
