const ACCENT_REGEX = /[\u0300-\u036f]/g;

export const removeAccents = (input: string): string => {
  return input
    .normalize("NFD") // transform é into e + '
    .replace(ACCENT_REGEX, ""); // remove all accents
};

const normalizeForSearch = (input: string): string => {
  return removeAccents(input).toLowerCase();
};

const elementContainsSearchTerms = (element: string, searchTerms: string[]): boolean => {
  for (const searchTerm of searchTerms) {
    if (!element.includes(searchTerm)) {
      return false; // early return if there is no match
    }
  }
  return true;
};

export const filterItemsForQuery = <
  Type extends Record<keyof Type, string>,
  Key extends keyof Type,
>(
  items: Type[],
  keyPath: Key,
  query: string,
): Type[] => {
  const trimmedQuery = normalizeForSearch(query.trim());
  const searchTerms = trimmedQuery.split(" ");
  return items.filter((item) => {
    // eslint-disable-next-line security/detect-object-injection
    const value = normalizeForSearch(item[keyPath]);
    return elementContainsSearchTerms(value, searchTerms);
  });
};
