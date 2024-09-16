import { useCallback } from 'react'
import { Linking } from 'react-native'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import clientEnv from '@/config/clientEnv'
import { gray } from '../../../../theme/colors.hex'
import { VoxButton } from '../../Button'

export default function ProgramCTA() {
  const onPress = useCallback(async () => {
    const link = `https://${clientEnv.CAMPAIGN_DOMAIN}/projet?utm_source=app`
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
        <VoxButton variant={'outlined'} marginTop={'$2'} marginLeft={'$2.5'} zIndex={10} onPress={onPress}>
          Voir Notre Projet
        </VoxButton>
      </ProfileCallToActionLayout.Actions>
      <ProfileCallToActionLayout.BackgroundImageBottomRight source={require('./assets/program.png')} bottom={-20} right={-16} height={170} />
    </ProfileCallToActionLayout>
  )
}
