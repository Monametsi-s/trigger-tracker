/**
 * Color mapping for scores 1-10
 * 1-3: Green range (1 = dark green/best, 3 = light green)
 * 4-7: Yellow range
 * 8-10: Red range (10 = extremely red/worst)
 */

export const COLOR_MAP = {
  1: '#2D5016', // Dark green (best)
  2: '#4CAF50', // Medium green
  3: '#8BC34A', // Light green
  4: '#CDDC39', // Yellow-green
  5: '#FFEB3B', // Yellow
  6: '#FFC107', // Amber
  7: '#FF9800', // Orange
  8: '#FF5722', // Deep orange
  9: '#F44336', // Red
  10: '#B71C1C', // Extremely red (worst)
};

export const COLOR_RANGES = {
  GREEN: { min: 1, max: 3, label: 'Good' },
  YELLOW: { min: 4, max: 7, label: 'Moderate' },
  RED: { min: 8, max: 10, label: 'Severe' },
};

/**
 * Get color for a given score (1-10)
 */
export function getColorForScore(score) {
  const clampedScore = Math.max(1, Math.min(10, Math.round(score)));
  return COLOR_MAP[clampedScore];
}

/**
 * Get the range label for a score
 */
export function getRangeForScore(score) {
  if (score >= COLOR_RANGES.GREEN.min && score <= COLOR_RANGES.GREEN.max) {
    return COLOR_RANGES.GREEN.label;
  }
  if (score >= COLOR_RANGES.YELLOW.min && score <= COLOR_RANGES.YELLOW.max) {
    return COLOR_RANGES.YELLOW.label;
  }
  return COLOR_RANGES.RED.label;
}

/**
 * Get legend for displaying color mapping
 */
export function getColorLegend() {
  return Object.entries(COLOR_MAP).map(([score, color]) => ({
    score: parseInt(score),
    color,
    label: getRangeForScore(parseInt(score)),
  }));
}
