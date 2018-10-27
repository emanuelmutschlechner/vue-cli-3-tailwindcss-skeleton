function hexToRgb (hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function contrast (hex, threshold) {
  const { r, g, b } = hexToRgb(hex)

  const contrast = (
    Math.round(r * 299) +
    Math.round(g * 587) +
    Math.round(b * 114)
  ) / 1000

  return contrast >= threshold
}
