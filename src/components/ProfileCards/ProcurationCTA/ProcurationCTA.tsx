import Button from '@/components/Button'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import { gray } from '../../../../theme/colors.hex'

export default function ProcurationCTA() {
  return (
    <ProfileCallToActionLayout backgroundColor={'#DEECF1'} noPadding>
      <ProfileCallToActionLayout.Content
        title="PROCURATION"
        titleStyle={{
          color: gray.gray6,
        }}
        content={'Disponible le 9 juin ?'}
        padding={'$3'}
        compact
      />
      <ProfileCallToActionLayout.Actions>
        <Button variant={'outlined'} marginTop={'$2'} marginLeft={'$2.5'} zIndex={10}>
          <Button.Text>Accéder aux démarches</Button.Text>
        </Button>
      </ProfileCallToActionLayout.Actions>
      <ProfileCallToActionLayout.BackgroundImageBottomRight source={require('./box.png')} height={200} />
    </ProfileCallToActionLayout>
  )
}
