const {
  parseSection,
  parseMeta,
  createMetaFromSections,
  parse,
} = require('./parser');
const fs = require('fs');
const path = require('path');

const mockPost = fs
  .readFileSync(path.join(__dirname, '../posts/example.post'))
  .toString('utf-8');

describe('Post parser', () => {
  describe('parseMeta', () => {
    it('retrieves an array of meta tags', () => {
      const result = parseMeta('test1=hello\ntest2=hi');
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toEqual({ key: 'test1', value: 'hello' });
      expect(result[1]).toEqual({ key: 'test2', value: 'hi' });
    });

    it('allows multiple empty lines', () => {
      const result = parseMeta('test1=hello\n\n\n\n\ntest2=hi');

      expect(result[0]).toEqual({ key: 'test1', value: 'hello' });
      expect(result[1]).toEqual({ key: 'test2', value: 'hi' });
    });

    it('removes any keys without a value', () => {
      const result = parseMeta('test1=hello\nempty=\ntest2=hi');

      expect(result[0]).toEqual({ key: 'test1', value: 'hello' });
      expect(result[1]).toEqual({ key: 'test2', value: 'hi' });
    });

    it('removes any lines that are not variable assignments', () => {
      const result = parseMeta('test1=hello\njustastring\ntest2=hi');

      expect(result[0]).toEqual({ key: 'test1', value: 'hello' });
      expect(result[1]).toEqual({ key: 'test2', value: 'hi' });
    });

    it('trims whitespace around keys and values', () => {
      const result = parseMeta('    test1    =   hello      ');

      expect(result[0]).toEqual({ key: 'test1', value: 'hello' });
    });

    it('converts all keys to lowercase', () => {
      const result = parseMeta('TEST1=hello\nTEST2=hi');
      expect(result[0]).toEqual({ key: 'test1', value: 'hello' });
      expect(result[1]).toEqual({ key: 'test2', value: 'hi' });
    });
  });
  describe('parseSection', () => {
    it('retrieves the section tag and content', () => {
      const result = parseSection('meta\n\nvalue');
      expect(result.tag).toBe('meta');
      expect(result.content).toBe('value');
    });

    it('trims additional whitespace', () => {
      const result = parseSection('  meta   \n\n   value   ');
      expect(result.tag).toBe('meta');
      expect(result.content).toBe('value');
    });
  });

  describe('createMetaFromSections', () => {
    it('finds and extracts data from meta sections', () => {
      const result = createMetaFromSections([
        { tag: 'test', content: '' },
        { tag: 'meta', content: 'mykey=hello' },
      ]);

      expect(result).toEqual({ mykey: 'hello' });
    });

    it('allows multiple meta sections', () => {
      const result = createMetaFromSections([
        { tag: 'test', content: '' },
        { tag: 'meta', content: 'mykey=hello' },
        { tag: 'meta', content: 'another=hi' },
      ]);

      expect(result).toEqual({ mykey: 'hello', another: 'hi' });
    });

    it('overwrites repeated keys with subsequent meta sections', () => {
      const result = createMetaFromSections([
        { tag: 'meta', content: 'mykey=hello' },
        { tag: 'test', content: '' },
        { tag: 'meta', content: 'another=hi' },
        { tag: 'meta', content: 'mykey=overwritten' },
      ]);

      expect(result).toEqual({ mykey: 'overwritten', another: 'hi' });
    });
  });

  describe('parse', () => {
    const result = parse(mockPost);
    it('parses the file into an object format', () => {
      expect(result.meta).toBeTruthy();
      expect(result.sections).toBeTruthy();
    });

    it('reads the meta data into the meta section', () => {
      expect(result.meta).toEqual({
        author: 'James Hay',
        created: '1989-02-09',
        title: 'Example Blog Post',
        updated: '2020-02-09',
      });
    });

    it('outputs other sections into the sections body', () => {
      expect(Array.isArray(result.sections)).toBe(true);
      expect(result.sections.length).toBeGreaterThan(0);
      expect(result.sections[0].tag).toBeTruthy();
      expect(result.sections[0].content).toBeTruthy();
    });

    it('excludes empty sections from the sections body', () => {
      expect(result.sections.some((a) => a.tag === 'emptyexample')).toBe(false);
    });

    it('excludes meta sections from the sections body', () => {
      expect(result.sections.some((a) => a.tag === 'meta')).toBe(false);
    });
  });
});
