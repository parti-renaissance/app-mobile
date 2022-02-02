import Color from 'color'

export const lighten = (color: string, amount: number): string => {
  return Color(color, 'hex').mix(Color('white'), amount).hex().toString()
}
