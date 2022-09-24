export function flexPercent(values: { [key: string]: number }): {
  [key: string]: string;
} {
  const percentValues: { [key: string]: string } = {};
  let sum = 0;

  // Calculate the sum
  for (const key in values) {
    sum += values[key];
  }

  // Convert to percentages
  for (const key in values) {
    const percent: number = Math.round((values[key] / sum) * 100);
    percentValues[key] = `${percent}%`;
  }

  return percentValues;
}
