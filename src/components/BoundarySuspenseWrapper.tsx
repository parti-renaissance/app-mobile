import { Suspense } from 'react'
import Button from '@/components/Button'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Image, Spinner, Text, YStack } from 'tamagui'

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
            <PageLayout>
              <PageLayout.MainSingleColumn>
                <YStack paddingTop="$4.5" alignSelf="center" alignItems="center" justifyContent="center" flex={1} gap="$2" maxWidth={maxWidth}>
                  <Image source={require('../assets/images/blocs.png')} height={300} width={300} resizeMode={'contain'} maxWidth={maxWidth} />

                  <Text color="$gray6" textAlign="center">
                    Une erreur est survenue. Veuillez recharger la page.
                  </Text>

                  <Button variant="text" onPress={resetErrorBoundary} alignSelf="center">
                    <Button.Text>Réessayer</Button.Text>
                  </Button>
                </YStack>
              </PageLayout.MainSingleColumn>
            </PageLayout>
          </YStack>
        )}
      >
        <Suspense
          fallback={
            <YStack justifyContent="center" alignItems="center" flex={1} width="100%">
              <Spinner size="large" color="$blue6" />
            </YStack>
          }
        >
          {props.children}
        </Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)

const maxWidth = '80vw'

export default BoundarySuspenseWrapper
