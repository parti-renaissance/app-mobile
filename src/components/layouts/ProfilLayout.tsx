import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { isWeb, useMedia, XStack, YStack } from 'tamagui'
import SkeCard from '../Skeleton/CardSkeleton'
import PageLayout from './PageLayout/PageLayout'

const Skeleton = () => (
  <SkeCard>
    <SkeCard.Content>
      <SkeCard.Chip />
      <SkeCard.Title />
      <SkeCard.Image />
      <SkeCard.Description />
    </SkeCard.Content>
  </SkeCard>
)

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  const media = useMedia()

  return media.md ? (
    <PageLayout>
      <PageLayout.MainSingleColumn>
        <BoundarySuspenseWrapper
          fallback={
            <YStack
              gap={16}
              $gtSm={{
                pt: '$8',
                pl: '$8',
                pr: '$8',
              }}
              pb={isWeb ? '$10' : '$12'}
            >
              {[1, 2, 3].map((x) => (
                <Skeleton key={x} />
              ))}
            </YStack>
          }
        >
          {children}
        </BoundarySuspenseWrapper>
      </PageLayout.MainSingleColumn>
      <PageLayout.SideBarRight />
    </PageLayout>
  ) : (
    <BoundarySuspenseWrapper
      fallback={
        <YStack
          gap={16}
          $gtSm={{
            pt: '$5',
            pl: '$5',
            pr: '$5',
          }}
          pb={isWeb ? '$10' : '$12'}
        >
          {[1, 2, 3].map((x) => (
            <Skeleton key={x} />
          ))}
        </YStack>
      }
    >
      {children}
    </BoundarySuspenseWrapper>
  )
}
