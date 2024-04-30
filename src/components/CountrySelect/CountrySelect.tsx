import { countries } from 'country-data'
import { Adapt, Select, Sheet } from 'tamagui'

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  return (
    <Select defaultValue="FR" onValueChange={onChange}>
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
            <Select.Label>Pays</Select.Label>
            {countriesSource.map((el, index) => (
              <Select.Item key={`${el.alpha3}-${el.name}`} value={el.alpha2} index={index}>
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

const countriesSource = countries.all.filter((el) => el.emoji)
