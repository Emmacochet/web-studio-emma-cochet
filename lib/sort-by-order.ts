export function sortBySlugOrder(slugs: string[], order: string[]): string[] {
  return [...slugs].sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);

    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}
