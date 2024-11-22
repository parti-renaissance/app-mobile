import { useCallback } from 'react'
import { Linking } from 'react-native'
import Button from '@/components/Button'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import { gray } from '../../../../theme/colors.hex'

export default function BotBilanCTA() {
  const onPress = useCallback(async () => {
    const link = 'https://t.me/bilandeurope_bot'
    if (await Linking.canOpenURL(link)) {
      await Linking.openURL(link)
    }
  }, [])

  return (
    <ProfileCallToActionLayout backgroundColor={'transparent'} noPadding noBorder>
      <ProfileCallToActionLayout.Content
        title="BOT BILAN D’EUROPE"
        titleStyle={{
          color: gray.gray6,
        }}
        content={'Retrouvez tous les éléments de bilan européen sur ces 5 dernières années'}
        padding={'$medium'}
        compact
      />
      <ProfileCallToActionLayout.Actions>
        <Button variant={'outlined'} marginTop={'$small'} marginLeft={'$small'} zIndex={10} onPress={onPress}>
          <Button.Text>Ouvrir</Button.Text>
        </Button>
      </ProfileCallToActionLayout.Actions>
    </ProfileCallToActionLayout>
  )
}
