import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import Avatar from '@/components/Avatar/Avatar'
import { ProfileCallToActionLayout } from '@/components/ProfileCards/ProfileCallToActionLayout/ProfileCallToActionLayout'
import Tag from '@/components/Tag/Tag'
import { useSession } from '@/ctx/SessionProvider'
import { activistTagShape } from '@/data/activistTagShape'
import { Link } from 'expo-router'
import { YStack } from 'tamagui'

interface Props {}

export default function ProfileCard({}: Props) {
  const { user } = useSession()
  const profile = user?.data

  const navigateToProfile = useCallback(() => {}, [])

  return (
    <ProfileCallToActionLayout>
      <ProfileCallToActionLayout.Content>
        <YStack gap={'$4'}>
          <Link href={'/profil'} asChild>
            <TouchableOpacity>
              <Avatar firstName={profile?.first_name} lastName={profile?.last_name} imageLeft withArrow />
            </TouchableOpacity>
          </Link>

          {profile?.tags.map((el) => (
            <Tag key={el.type} label={el.label} color={activistTagShape[el.type]?.color} bgColor={activistTagShape[el.type]?.bgColor} />
          ))}
        </YStack>
      </ProfileCallToActionLayout.Content>
    </ProfileCallToActionLayout>
  )
}
