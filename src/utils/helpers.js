export const createPageLis = (count) => {
  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(i + 1);
  }

  return pages;
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16)
  } : null;
};

const numToHex = (num) => {
  const hex = num.toString(16);

  return hex.length == 1 ? "0" + hex : hex;
}

export const generateTint = (rgbObj, step) => {
  let rgb = Object.assign({}, rgbObj);
  let hex = '';

  if (step > 0) {
    if (rgb.r <= 255 - step) {
      rgb.r += step;
    }
    if (rgb.g <= 255 - step) {
      rgb.g += step;
    }
    if (rgb.b <= 255 - step) {
      console.log(rgb.b);
      rgb.b += step;
    }
  }
  else if (step < 0) {
    if (rgb.r >= 0 - step) {
      rgb.r += step;
    }
    if (rgb.g >= 0 - step) {
      rgb.g += step;
    }
    if (rgb.b >= 0 - step) {
      rgb.b += step;
    }
    console.log(rgb, step);
  }
  else {
    for (const channel in rgb) {
      hex += numToHex(rgb[channel]);
    }

    return '#' + hex;
  }

  for (const channel in rgb) {
    hex += numToHex(rgb[channel]);
  }

  return '#' + hex;
}
