import { Suspense } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Button, H1, H2, Spinner, YStack } from 'tamagui'

type BoundarySuspenseWrapperProps = {
  children: React.ReactNode
  errorMessage?: string
  loadingMessage?: string
}

const BoundarySuspenseWrapper = (props: BoundarySuspenseWrapperProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <YStack justifyContent="center">
            <H1>{props.errorMessage ?? 'Une erreur est survenue!'}</H1>
            <Button onPress={() => resetErrorBoundary()}>Réessayer</Button>
          </YStack>
        )}
      >
        <Suspense
          fallback={
            <YStack justifyContent="center" alignItems="center" flex={1}>
              <Spinner size="large" color="$blue6" />
              <H2>{props.loadingMessage ?? 'Chargement...'}</H2>
            </YStack>
          }
        >
          <HomeFeedList />
        </Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)

export default BoundarySuspenseWrapper
