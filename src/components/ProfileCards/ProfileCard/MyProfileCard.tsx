import ProfileCard from '@/components/ProfileCards/ProfileCard/ProfileCard'
import { useSession } from '@/ctx/SessionProvider'

export default function MyProfileCard() {
  const { user } = useSession()
  const profile = user?.data

  return (
    <ProfileCard
      lastName={profile?.last_name}
      firstName={profile?.first_name}
      tags={profile?.tags}
      onButtonPress={profile?.cadre_access ? () => {} : undefined}
    />
  )
}
