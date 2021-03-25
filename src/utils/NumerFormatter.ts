import i18n from './i18n'

const formatPercent = (input: number): string => {
  return new Intl.NumberFormat(i18n.language, { style: 'percent' }).format(
    input,
  )
}

const formatDecimal = (input: number): string => {
  return new Intl.NumberFormat(i18n.language, { style: 'decimal' }).format(
    input,
  )
}

const NumberFormatter = {
  formatPercent,
  formatDecimal,
}

export default NumberFormatter
