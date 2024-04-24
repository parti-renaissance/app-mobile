import { Button } from '@/components'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { Link } from 'expo-router'
import { Image, Text, View } from 'tamagui'

export default function Error404() {
  return (
    <PageLayout>
      <PageLayout.MainSingleColumn>
        <View alignSelf="center" alignItems="center" justifyContent="center" flex={1} gap="$1" maxWidth={maxWidth}>
          <Image source={require('./blocs.png')} height={300} width={300} resizeMode={'contain'} maxWidth={maxWidth} />

          <Text color="$gray6" textAlign="center">
            Impossible de trouver la page demandée
          </Text>

          <Link href="/">
            <Button variant="text" alignSelf={'center'}>
              <Button.Text>Retour à l'accueil</Button.Text>
            </Button>
          </Link>
        </View>
      </PageLayout.MainSingleColumn>
    </PageLayout>
  )
}

const maxWidth = '80vw'
