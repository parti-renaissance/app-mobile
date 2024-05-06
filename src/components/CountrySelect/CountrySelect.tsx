import Select from '@/components/Select'
import isoToEmoji from '@/utils/isoToEmoji'
import countries from './countries.json'

interface CountrySelectProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  id: string
  error: string | undefined
  onBlur: (fieldOrEvent: any) => void
  placeholder?: string
}

export default function CountrySelect(props: CountrySelectProps) {
  return <Select canSearch options={countriesSourceAsOption} {...props} />
}

const countriesSource = Object.entries(countries).map(([iso, name]) => ({
  alpha2: iso,
  emoji: iso === 'AN' ? '' : isoToEmoji(iso),
  name,
}))

const countriesSourceAsOption = countriesSource.map((el, index) => ({
  value: el.alpha2,
  label: `${el.emoji} ${el.name}`,
  index,
}))
