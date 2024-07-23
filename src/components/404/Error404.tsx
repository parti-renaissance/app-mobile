import { Button } from '@/components'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { Link, router } from 'expo-router'
import { Image, View } from 'tamagui'
import Text from '../base/Text'

export default function Error404() {
  return (
    <PageLayout>
      <PageLayout.StateFrame justifyContent="center" $gtSm={{ mt: 0 }}>
        <Image source={require('../../assets/images/blocs.png')} height={200} width={200} resizeMode={'contain'} />
        <Text color="$gray6">Impossible de trouver la page demandée</Text>

        <View>
          <Link href="/" asChild>
            <Button variant="text">
              <Button.Text>Retour à l'accueil</Button.Text>
            </Button>
          </Link>
        </View>
      </PageLayout.StateFrame>
    </PageLayout>
  )
}
