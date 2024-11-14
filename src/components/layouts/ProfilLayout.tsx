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
              gap="$medium"
              $gtSm={{
                pt: '$large',
                pl: '$large',
                pr: '$large',
              }}
              pb={'$xxlarge'}
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
          gap="$medium"
          $gtSm={{
            pt: '$medium',
            pl: '$medium',
            pr: '$medium',
          }}
          pb={'$xxlarge'}
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
