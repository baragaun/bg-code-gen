export const haveCommonTags = (
  tags1: string[] | null | undefined,
  tags2: string[] | null | undefined,
  resultIfBothAreEmpty = true,
  resultIfTags2Empty = true,
): boolean => {
  if (
    (!tags1 && !tags2) ||
    (!Array.isArray(tags1) && !Array.isArray(tags2)) ||
    (!Array.isArray(tags1) && !Array.isArray(tags2)) ||
    ((tags1?.length || 0) < 1 && (tags2?.length || 0) < 1)
  ) {
    return resultIfBothAreEmpty;
  }

  if (!Array.isArray(tags2) || tags2.length < 1) {
    return resultIfTags2Empty;
  }

  if (
    !Array.isArray(tags1) ||
    !Array.isArray(tags2) ||
    tags1.length < 1 ||
    tags2.length < 1
  ) {
    return false
  }

  const setA = new Set(tags1);
  const setB = new Set(tags2);

  for (const tag of setA) {
    if (setB.has(tag)) {
      return true;
    }
  }

  return false;
}
