export const createPageLis = (count, curPage) => {
  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(i + 1);
  }

  return pages;
};
