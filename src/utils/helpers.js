export const createPageLis = (count) => {
  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(i + 1);
  }

  return pages;
};

export const hexToRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16)
  } : null;
};
