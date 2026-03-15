/**
 * Dice rolling utilities
 */

export interface DiceRoll {
  sides: number;
  count: number;
  modifier: number;
  results: number[];
  total: number;
}

/**
 * Roll dice with format: NdS+M (e.g., 2d6+3)
 */
export function roll(notation: string): DiceRoll {
  const match = notation.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
  if (!match) {
    throw new Error(`Invalid dice notation: ${notation}`);
  }

  const count = match[1] ? parseInt(match[1], 10) : 1;
  const sides = parseInt(match[2]!, 10);
  const modifier = match[3] ? parseInt(match[3], 10) : 0;

  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * sides) + 1);
  }

  const sum = results.reduce((a, b) => a + b, 0);

  return {
    sides,
    count,
    modifier,
    results,
    total: sum + modifier,
  };
}

/**
 * Roll a single die
 */
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Roll with advantage (take highest of 2 rolls)
 */
export function rollAdvantage(sides: number = 20): { rolls: [number, number]; result: number } {
  const roll1 = rollDie(sides);
  const roll2 = rollDie(sides);
  return {
    rolls: [roll1, roll2],
    result: Math.max(roll1, roll2),
  };
}

/**
 * Roll with disadvantage (take lowest of 2 rolls)
 */
export function rollDisadvantage(sides: number = 20): { rolls: [number, number]; result: number } {
  const roll1 = rollDie(sides);
  const roll2 = rollDie(sides);
  return {
    rolls: [roll1, roll2],
    result: Math.min(roll1, roll2),
  };
}
