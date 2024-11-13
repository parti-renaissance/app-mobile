import React from 'react'
import Input from '@/components/base/Input/Input'
import Text from '@/components/base/Text'
import { Card as RadioCard } from '@/components/Bento/radios/components/radioParts'
import { ChevronDown } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'

export const zoneValues = [`Mon département (DA)`, 'Toute la France'] as const
export type ZoneValue = (typeof zoneValues)[number]

type ZoneFilterProps = {
  value: ZoneValue
  onChange: (value: ZoneValue) => void
}

const ZoneFilter = ({ value, onChange }: ZoneFilterProps) => {
  return (
    <YStack gap="$3">
      <Text fontWeight="$5">Zone</Text>
      <XStack gap="$3" rowGap="$3">
        {zoneValues.map((item) => (
          <RadioCard
            height="$2.5"
            theme="gray"
            key={item}
            flexDirection="row"
            flex={1}
            // flexBasis={0}
            alignItems="center"
            gap="$3"
            padding={0}
            minWidth="initial"
            active={value === item}
            paddingHorizontal="$2.5"
            cursor="pointer"
            onPress={() => onChange(item)}
            $gtXs={{
              minWidth: 'initial',
            }}
          >
            <Text theme="VoxRadio" fontSize="$1" color={value === item ? '$textPrimary' : '$gray7'}>
              {item}
            </Text>
          </RadioCard>
        ))}
      </XStack>
      <Input placeholder="Choisir un departement" size={'lg'} iconRight={<ChevronDown />} />
    </YStack>
  )
}

export default React.memo(ZoneFilter)
