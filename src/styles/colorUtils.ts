import tinycolor from 'tinycolor2'

export const lighten = (color: string, amount: number): string => {
  const sanitizedAmount = amount < 1 ? amount * 100 : amount
  return tinycolor.mix(color, 'white', sanitizedAmount).toHexString()
}
