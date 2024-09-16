import { Button } from '@/components'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { Link } from 'expo-router'
import { Image, View } from 'tamagui'
import Text from '../base/Text'
import { VoxButton } from '../Button'

export default function Error404() {
  return (
    <PageLayout>
      <PageLayout.StateFrame justifyContent="center" $gtSm={{ mt: 0 }}>
        <Image source={require('../../assets/images/blocs.png')} height={200} width={200} resizeMode={'contain'} />
        <Text color="$gray6">Impossible de trouver la page demandée</Text>

        <View>
          <Link href="/" asChild>
            <VoxButton variant="text">Retour à l'accueil</VoxButton>
          </Link>
        </View>
      </PageLayout.StateFrame>
    </PageLayout>
  )
}
