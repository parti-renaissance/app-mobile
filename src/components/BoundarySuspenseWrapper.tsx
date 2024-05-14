import { Suspense } from 'react'
import Button from '@/components/Button'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Image, Spinner, View, YStack } from 'tamagui'
import Text from './base/Text'

type BoundarySuspenseWrapperProps = {
  children: React.ReactNode
  errorMessage?: string
  loadingMessage?: string
  fallback?: React.ReactNode
}

const BoundarySuspenseWrapper = (props: BoundarySuspenseWrapperProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <PageLayout.StateFrame>
            <Image source={require('../assets/images/blocs.png')} height={200} width={200} resizeMode={'contain'} />
            <Text color="$gray6" textAlign="center">
              Une erreur est survenue. Veuillez recharger la page.
            </Text>
            <View>
              <Button variant="text" onPress={resetErrorBoundary}>
                <Button.Text>Réessayer</Button.Text>
              </Button>
            </View>
          </PageLayout.StateFrame>
        )}
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
