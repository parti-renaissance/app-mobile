import { Suspense } from 'react'
import { VoxButton } from '@/components/Button'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { NotFoundError } from '@/core/errors'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Image, Spinner, View, YStack } from 'tamagui'
import Error404 from './404/Error404'
import Text from './base/Text'

type BoundarySuspenseWrapperProps = {
  children: React.ReactNode
  errorMessage?: string
  loadingMessage?: string
  fallback?: React.ReactNode
  errorChildren?: (err: FallbackProps) => React.ReactNode
}

export const DefaultErrorFallback = ({ resetErrorBoundary, error }: FallbackProps) => {
  if (error instanceof NotFoundError) {
    return <Error404 />
  }
  return (
    <>
      <Image source={require('../assets/images/blocs.png')} height={200} width={200} objectFit={'contain'} />
      <Text color="$gray6" textAlign="center">
        Une erreur est survenue. Veuillez recharger la page.
      </Text>
      <View>
        <VoxButton variant="text" onPress={resetErrorBoundary}>
          Réessayer
        </VoxButton>
      </View>
    </>
  )
}

const BoundarySuspenseWrapper = (props: BoundarySuspenseWrapperProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={(EBprops) =>
          props.errorChildren ? (
            props.errorChildren(EBprops)
          ) : (
            <PageLayout.StateFrame>
              <DefaultErrorFallback {...EBprops} />
            </PageLayout.StateFrame>
          )
        }
      >
        <Suspense
          fallback={
            props.fallback ?? (
              <YStack justifyContent="center" alignItems="center" flex={1} width="100%">
                <Spinner size="large" color="$blue6" />
              </YStack>
            )
          }
        >
          {props.children}
        </Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)

export default BoundarySuspenseWrapper
