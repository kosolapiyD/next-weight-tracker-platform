/**
 * Percentage of start weight lost — the leaderboard ranking metric.
 * Higher value = better rank.
 */
export function weightLossPercent(startWeight: number, currentWeight: number): number {
  if (startWeight <= 0) return 0;
  return ((startWeight - currentWeight) / startWeight) * 100;
}

/**
 * Sort users by weight loss percentage descending.
 * Rank 1 = most weight lost as a percentage of start weight.
 */
export function rankByWeightLoss<T extends { startWeight: number; currentWeight: number }>(
  users: T[],
): T[] {
  return [...users].sort(
    (a, b) =>
      weightLossPercent(b.startWeight, b.currentWeight) -
      weightLossPercent(a.startWeight, a.currentWeight),
  );
}

/**
 * ISO 8601 week number and year for a given date.
 * Used to enforce exactly one weight entry per user per calendar week.
 */
export function isoWeek(date: Date): { week: number; year: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number (make Sunday = 7)
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return { week, year: d.getUTCFullYear() };
}

/**
 * Total weight lost in absolute units.
 */
export function absoluteLoss(startWeight: number, currentWeight: number): number {
  return startWeight - currentWeight;
}
