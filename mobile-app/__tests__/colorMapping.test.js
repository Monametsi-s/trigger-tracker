import { getColorForScore, getRangeForScore, getColorLegend, COLOR_MAP } from '../utils/colorMapping';

describe('Color Mapping Utilities', () => {
  describe('getColorForScore', () => {
    it('should return dark green for score 1', () => {
      expect(getColorForScore(1)).toBe('#2D5016');
    });

    it('should return extremely red for score 10', () => {
      expect(getColorForScore(10)).toBe('#B71C1C');
    });

    it('should clamp scores below 1', () => {
      expect(getColorForScore(0)).toBe(COLOR_MAP[1]);
      expect(getColorForScore(-5)).toBe(COLOR_MAP[1]);
    });

    it('should clamp scores above 10', () => {
      expect(getColorForScore(11)).toBe(COLOR_MAP[10]);
      expect(getColorForScore(100)).toBe(COLOR_MAP[10]);
    });

    it('should round decimal scores', () => {
      expect(getColorForScore(4.4)).toBe(COLOR_MAP[4]);
      expect(getColorForScore(4.6)).toBe(COLOR_MAP[5]);
    });
  });

  describe('getRangeForScore', () => {
    it('should return Good for scores 1-3', () => {
      expect(getRangeForScore(1)).toBe('Good');
      expect(getRangeForScore(2)).toBe('Good');
      expect(getRangeForScore(3)).toBe('Good');
    });

    it('should return Moderate for scores 4-7', () => {
      expect(getRangeForScore(4)).toBe('Moderate');
      expect(getRangeForScore(5)).toBe('Moderate');
      expect(getRangeForScore(6)).toBe('Moderate');
      expect(getRangeForScore(7)).toBe('Moderate');
    });

    it('should return Severe for scores 8-10', () => {
      expect(getRangeForScore(8)).toBe('Severe');
      expect(getRangeForScore(9)).toBe('Severe');
      expect(getRangeForScore(10)).toBe('Severe');
    });
  });

  describe('getColorLegend', () => {
    it('should return 10 legend items', () => {
      const legend = getColorLegend();
      expect(legend).toHaveLength(10);
    });

    it('should have correct structure', () => {
      const legend = getColorLegend();
      legend.forEach(item => {
        expect(item).toHaveProperty('score');
        expect(item).toHaveProperty('color');
        expect(item).toHaveProperty('label');
        expect(typeof item.score).toBe('number');
        expect(typeof item.color).toBe('string');
        expect(typeof item.label).toBe('string');
      });
    });
  });
});
