import { PageSnapshot } from "./fetch-page";

export interface PageDiff {
  url: string;
  titleChanged: boolean;
  oldTitle?: string;
  newTitle?: string;
  descriptionChanged: boolean;
  oldDescription?: string;
  newDescription?: string;
  addedHeadings: string[];
  removedHeadings: string[];
  textSimilarity: number;
  significantChange: boolean;
}

export function diffSnapshots(
  oldSnap: PageSnapshot,
  newSnap: PageSnapshot
): PageDiff {
  const titleChanged = oldSnap.title !== newSnap.title;
  const descriptionChanged = oldSnap.description !== newSnap.description;

  const oldHeadingsSet = new Set(oldSnap.headings);
  const newHeadingsSet = new Set(newSnap.headings);

  const addedHeadings = newSnap.headings.filter((h) => !oldHeadingsSet.has(h));
  const removedHeadings = oldSnap.headings.filter(
    (h) => !newHeadingsSet.has(h)
  );

  const textSimilarity = computeSimilarity(oldSnap.bodyText, newSnap.bodyText);

  const significantChange =
    titleChanged ||
    descriptionChanged ||
    addedHeadings.length > 0 ||
    removedHeadings.length > 0 ||
    textSimilarity < 0.9;

  return {
    url: newSnap.url,
    titleChanged,
    ...(titleChanged && {
      oldTitle: oldSnap.title,
      newTitle: newSnap.title,
    }),
    descriptionChanged,
    ...(descriptionChanged && {
      oldDescription: oldSnap.description,
      newDescription: newSnap.description,
    }),
    addedHeadings,
    removedHeadings,
    textSimilarity: Math.round(textSimilarity * 100) / 100,
    significantChange,
  };
}

function computeSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;

  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));

  let intersection = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) intersection++;
  }

  const union = new Set([...wordsA, ...wordsB]).size;
  return union === 0 ? 1 : intersection / union;
}
