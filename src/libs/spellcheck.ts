import { hamsterSafeFoods, hamsterUnsafeFoods } from "../data/can-herb-eat-it/food-data";

const HAMSTER_SAFE_FOODS = hamsterSafeFoods.map((food) => food.name.toLowerCase());
const HAMSTER_UNSAFE_FOODS = hamsterUnsafeFoods.map((food) => food.name.toLowerCase());


function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[a.length][b.length];
}

interface MatchResult {
  exactMatch: boolean;
  closestMatch: string | null;
  distance: number;
  isSuggestion: boolean; // true if it's a "did you mean" case, not exact
}

export function spellCheckHamsterFood(
  input: string,
  foodList: string[] = [...HAMSTER_SAFE_FOODS, ...HAMSTER_UNSAFE_FOODS],
  threshold = 2 // max edit distance to count as a "close enough" match
): MatchResult {
  const normalizedInput = input.trim().toLowerCase();

  // Exact match check second, after canonical variant matching.
  const exact = foodList.find(
    (food) => food.toLowerCase() === normalizedInput
  );
  if (exact) {
    return { exactMatch: true, closestMatch: exact, distance: 0, isSuggestion: false };
  }

  // Prefer a longer canonical match only when the input is a meaningful chunk of the item name, not a tiny fragments.
  const containedMatch = foodList
    .filter((food) => {
      const lowerFood = food.toLowerCase();

      if (lowerFood === normalizedInput) {
        return false;
      }

      if (normalizedInput.length < 3) {
        return false;
      }

      const foodWords = lowerFood.split(/\s+/);
      const hasMeaningfulWordMatch = foodWords.some((word) => {
        if (word.length < 3) return false;
        if (word === normalizedInput) return true;
        return normalizedInput.length >= Math.ceil(word.length / 2) && word.includes(normalizedInput);
      });

      const hasPhraseMatch =
        lowerFood.startsWith(`${normalizedInput} `) ||
        lowerFood.endsWith(` ${normalizedInput}`) ||
        lowerFood.includes(` ${normalizedInput} `);

      return hasMeaningfulWordMatch || hasPhraseMatch;
    })
    .sort((a, b) => b.length - a.length)
    .at(0);

  if (containedMatch) {
    return {
      exactMatch: false,
      closestMatch: containedMatch,
      distance: 0,
      isSuggestion: true,
    };
  }

  // Otherwise find closest by edit distance
  let closest: string | null = null;
  let minDistance = Infinity;

  for (const food of foodList) {
    const distance = levenshteinDistance(normalizedInput, food.toLowerCase());
    if (distance < minDistance) {
      minDistance = distance;
      closest = food;
    }
  }

  return {
    exactMatch: false,
    closestMatch: minDistance <= threshold ? closest : null,
    distance: minDistance,
    isSuggestion: minDistance <= threshold,
  };
}
