import { uniqBy, upperFirst } from 'lodash'
import Select from '../Select'
import nationalities from './nationalities.json'

interface NationalitySelectProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  id: string
  error?: string
  onBlur?: (fieldOrEvent: any) => void
  placeholder?: string
}

export default function NationalitySelect(props: NationalitySelectProps) {
  return <Select canSearch options={countriesSource} {...props} />
}

const countriesSource = uniqBy(nationalities, 'iso').map((n) => ({
  value: n.iso!,
  label: upperFirst(n.nationality!),
  index: n.index!,
}))
