import isoToEmoji from '@/utils/isoToEmoji'
import { Adapt, Select, Sheet } from 'tamagui'
import countries from './countries.json'

interface CountrySelectProps {
  value?: string
  onChange: (value: string) => void
  title?: string
}

export default function CountrySelect({ value, onChange, title }: CountrySelectProps) {
  return (
    <Select defaultValue="FR" onValueChange={onChange} value={value}>
      <Select.Trigger>
        <Select.Value placeholder="Rechercher un pays..." />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        {/* or <Select.Sheet> */}
        <Sheet>
          <Sheet.Frame>{/* Content goes here */}</Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            <Select.Label>{title ?? 'Pays'}</Select.Label>
            {countriesSource.map((el, index) => (
              <Select.Item key={`${el.alpha2}-${el.name}`} value={el.alpha2} index={index}>
                <Select.ItemText>
                  {el.emoji} {el.name}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  )
}

const countriesSource = Object.entries(countries).map(([iso, name]) => ({
  alpha2: iso,
  emoji: iso === 'AN' ? '' : isoToEmoji(iso),
  name,
}))
