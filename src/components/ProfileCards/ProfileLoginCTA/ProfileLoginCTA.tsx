import AuthButton from '@/components/Buttons/AuthButton'
import { ProfileCallToAction } from '@/components/ProfileCards/ProfileCallToAction/ProfileCallToAction'
import { View } from 'tamagui'

export default function ProfileLoginCTA() {
  return (
    <ProfileCallToAction>
      <ProfileCallToAction.Image source={require('./loginCTAImage.png')} height={205} />
      <ProfileCallToAction.Content content={'Créez un compte ou connectez-vous pour rejoindre la campagne dès maintenant.'} />
      <ProfileCallToAction.Actions>
        <View flex={1}>
          <AuthButton.SignInButton />
        </View>
        <View flex={1} flexDirection={'row'} justifyContent={'flex-end'}>
          <AuthButton.SignUpButton />
        </View>
      </ProfileCallToAction.Actions>
    </ProfileCallToAction>
  )
}
