import Color from 'color';

export function GetColorMode(hexColor) {
  const rgb = hexToRgb(hexColor);

  const hsl = rgbToHsl(rgb);

  const lightness = hsl[2];

  const threshold = 0.5;

  if (lightness > threshold) {
    return 'light';
  }
  return 'dark';
}

function hexToRgb(hexColor) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hexColor = hexColor.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

function rgbToHsl(color) {
  const r = color[0] / 255;
  const g = color[1] / 255;
  const b = color[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

// logign two
function getContrastRatio(color1, color2) {
  const luminance1 = color1.luminosity();
  const luminance2 = color2.luminosity();
  if (luminance1 > luminance2) {
    return (luminance1 + 0.05) / (luminance2 + 0.05);
  }
  return (luminance2 + 0.05) / (luminance1 + 0.05);
}

function getContrastColor(bgColor) {
  const color = Color(bgColor);
  const blackContrast = getContrastRatio(color, Color('black'));
  const whiteContrast = getContrastRatio(color, Color('white'));

  return blackContrast > whiteContrast ? 'black' : 'white';
}

// const bgColor = '#ff6600';
