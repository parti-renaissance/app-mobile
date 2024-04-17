import Button from '@/components/Button'
import { ProfileCallToAction } from '@/components/ProfileCards/ProfileCallToAction/ProfileCallToAction'
import { gray } from '../../../../theme/colors.hex'

export default function BotBilanCTA() {
  return (
    <ProfileCallToAction backgroundColor={'transparent'} noPadding>
      <ProfileCallToAction.Content
        title="BOT BILAN D’EUROPE"
        titleStyle={{
          color: gray.gray6,
        }}
        content={'Retrouvez tous les éléments de bilan européen sur ces 5 dernières années'}
        padding={'$3'}
        compact
      />
      <ProfileCallToAction.Actions>
        <Button variant={'outlined'} marginTop={'$2'} marginLeft={'$2.5'} zIndex={10}>
          <Button.Text>Ouvrir</Button.Text>
        </Button>
      </ProfileCallToAction.Actions>
    </ProfileCallToAction>
  )
}
