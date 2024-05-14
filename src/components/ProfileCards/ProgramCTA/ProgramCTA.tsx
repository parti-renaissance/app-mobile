import { useCallback } from 'react'
import { Linking } from 'react-native'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import { gray } from '../../../../theme/colors.hex'
import Button from '../../Button'

export default function ProgramCTA() {
  const onPress = useCallback(async () => {
    const link = 'https://besoindeurope.fr/projet?utm_source=app'
    if (await Linking.canOpenURL(link)) {
      await Linking.openURL(link)
    }
  }, [])

  return (
    <ProfileCallToActionLayout noPadding>
      <ProfileCallToActionLayout.Content
        title="NOTRE PROGRAMME"
        titleStyle={{
          fontWeight: 600,
          color: gray.gray6,
        }}
        content={'Nos 48 propositions en\ndétail sur notre site.'}
        contentStyle={{
          lineHeight: 24,
        }}
        padding={'$3'}
        compact
      />
      <ProfileCallToActionLayout.Actions>
        <Button variant={'outlined'} marginTop={'$2'} marginLeft={'$2.5'} zIndex={10} onPress={onPress}>
          <Button.Text>Voir Notre Projet</Button.Text>
        </Button>
      </ProfileCallToActionLayout.Actions>
      <ProfileCallToActionLayout.BackgroundImageBottomRight source={require('./assets/program.png')} bottom={-20} right={-16} height={170} />
    </ProfileCallToActionLayout>
  )
}
