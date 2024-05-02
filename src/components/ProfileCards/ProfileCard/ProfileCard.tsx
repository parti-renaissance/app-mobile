import Avatar from '@/components/Avatar/Avatar'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import Tag from '@/components/Tag/Tag'
import { useSession } from '@/ctx/SessionProvider'
import { activistTagShape } from '@/data/activistTagShape'
import { YStack } from 'tamagui'

interface Props {}

export default function ProfileCard({}: Props) {
  const { user } = useSession()
  const profile = user?.data

  return (
    <ProfileCallToActionLayout>
      <ProfileCallToActionLayout.Content>
        <YStack gap={'$4'}>
          <Avatar firstName={profile?.first_name} lastName={profile?.last_name} imageLeft withArrow />

          {['adherent'].map((label) => (
            <Tag label={label} color={activistTagShape[label]?.color} bgColor={activistTagShape[label]?.bgColor} />
          ))}
        </YStack>
      </ProfileCallToActionLayout.Content>
    </ProfileCallToActionLayout>
  )
}
