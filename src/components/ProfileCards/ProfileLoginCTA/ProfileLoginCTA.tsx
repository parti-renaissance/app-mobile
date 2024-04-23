import AuthButton from '@/components/Buttons/AuthButton'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import { View } from 'tamagui'

export default function ProfileLoginCTA() {
  return (
    <ProfileCallToActionLayout>
      <ProfileCallToActionLayout.Image source={require('./loginCTAImage.png')} height={205} />
      <ProfileCallToActionLayout.Content content={'Créez un compte ou connectez-vous pour rejoindre la campagne dès maintenant.'} />
      <ProfileCallToActionLayout.Actions>
        <View flex={1}>
          <AuthButton.SignInButton />
        </View>
        <View flex={1} flexDirection={'row'} justifyContent={'flex-end'}>
          <AuthButton.SignUpButton />
        </View>
      </ProfileCallToActionLayout.Actions>
    </ProfileCallToActionLayout>
  )
}
