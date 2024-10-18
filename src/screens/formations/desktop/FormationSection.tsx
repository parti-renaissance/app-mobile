import { LayoutChangeEvent } from 'react-native'
import EmptyStateFormationIllustration from '@/assets/illustrations/EmptyStateFormationIllustration'
import ButtonGroup from '@/components/base/ButtonGroup/ButtonGroup'
import Text from '@/components/base/Text'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import VoxCard from '@/components/VoxCard/VoxCard'
import { RestGetFormationsResponse } from '@/services/formations/schema'
import { XStack, YStack } from 'tamagui'
import EmptyFormaState from '../components/EmptyFormaState'
import { FormaCard, FormaCardSkeleton } from '../components/FormaCard'
import { useCategories } from '../hooks/useCategories'

const splitIntoCol = <Data,>(array: Data[]) => {
  const col1: Data[] = []
  const col2: Data[] = []

  array.forEach((item, index) => {
    if (index % 2 === 0) {
      col1.push(item)
    } else {
      col2.push(item)
    }
  })
  return [col1, col2]
}

type Props = {
  data: RestGetFormationsResponse
  visibility: 'national' | 'local'
  onLayout?: (x: LayoutChangeEvent) => void
  theme?: 'blue' | 'green'
}

export const FormationSection = ({ data: formations, visibility, onLayout, theme }: Props) => {
  const { options, filteredFormations, activeCategories, setActiveCategories } = useCategories({ formations })
  const formationsCol = splitIntoCol(filteredFormations)
  const textColor = theme === 'blue' ? '$blue6' : '$green6'
  return (
    <VoxCard onLayout={onLayout}>
      <VoxCard.Content padding={24} gap={24}>
        {formations.length === 0 ? (
          <EmptyFormaState textColor={textColor} visibility={visibility} />
        ) : (
          <>
            <Text.LG>
              Formations <Text.LG color={textColor}>{visibility === 'local' ? 'locale' : 'nationale'}</Text.LG>
            </Text.LG>
            {options.length > 1 && (
              <ButtonGroup
                theme={theme}
                options={options}
                value={activeCategories}
                onChange={(value) => {
                  setActiveCategories(value)
                }}
              />
            )}
            <VoxCard.Separator />
            <XStack gap={24}>
              <YStack flex={1} gap={24} flexBasis={0}>
                {formationsCol[0].map((formation, index) => (
                  <FormaCard key={index} payload={formation} last={index === formationsCol[0].length - 1} />
                ))}
              </YStack>
              {formations.length > 1 && <YStack width={1} backgroundColor={'$textOutline'} />}
              <YStack flex={1} gap={24} flexBasis={0}>
                {formationsCol[1].map((formation, index) => (
                  <FormaCard key={index} payload={formation} last={index === formationsCol[1].length - 1} />
                ))}
              </YStack>
            </XStack>
          </>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}

export const FormationSectionSkeleton = () => {
  const formationsCol = splitIntoCol(new Array(6).fill(null))
  return (
    <SkeCard>
      <SkeCard.Content padding={24} gap={24}>
        <SkeCard.Title />
        <SkeCard.Separator />
        <XStack gap={24}>
          <YStack flex={1} gap={24}>
            {formationsCol[0].map((_, index) => (
              <FormaCardSkeleton key={index} last={index === formationsCol[0].length - 1} />
            ))}
          </YStack>
          <YStack width={1} backgroundColor={'$textOutline'} />
          <YStack flex={1} gap={24}>
            {formationsCol[1].map((_, index) => (
              <FormaCardSkeleton last={index === formationsCol[1].length - 1} />
            ))}
          </YStack>
        </XStack>
      </SkeCard.Content>
    </SkeCard>
  )
}

export default FormationSection
