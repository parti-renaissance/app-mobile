import React from 'react'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import { YStack } from 'tamagui'
import AuthDialog from '../AuthDialog'

const SkeletonCard = () => (
  <SkeCard>
    <SkeCard.Content>
      <SkeCard.Chip />
      <SkeCard.Title />
      <SkeCard.Description />
    </SkeCard.Content>
  </SkeCard>
)

const CardListAuthSkeleton = (props: { title: string }) => {
  return (
    <YStack
      gap="$4"
      flex={1}
      pt="$4"
      $gtSm={{
        pt: '$7',
        pl: '$7',
        pr: '$7',
      }}
    >
      <SkeletonCard />
      <AuthDialog title={props.title}>
        <SkeletonCard />
      </AuthDialog>
      <SkeletonCard />
      <SkeletonCard />
    </YStack>
  )
}

export default CardListAuthSkeleton
