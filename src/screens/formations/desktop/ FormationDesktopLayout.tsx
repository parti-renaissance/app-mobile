import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { View } from 'tamagui'

function FormationDesktopLayout({ topVisual, leftComponent, children }: { topVisual: number; children: React.ReactNode; leftComponent?: React.ReactNode }) {
  return (
    <PageLayout marginTop={-topVisual} bg="transparent">
      <PageLayout.SideBarLeft
        showOn="gtSm"
        $md={{
          width: 200,
          pl: '$medium',
        }}
      >
        <View marginTop={topVisual}>{leftComponent}</View>
      </PageLayout.SideBarLeft>
      <PageLayout.MainSingleColumn>{children}</PageLayout.MainSingleColumn>
    </PageLayout>
  )
}

export default FormationDesktopLayout
