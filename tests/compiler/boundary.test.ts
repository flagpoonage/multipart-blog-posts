import { generateBoundary } from 'compiler/boundary';

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
});
