import { useCallback } from 'react'
import ProfileCard from '@/components/ProfileCards/ProfileCard/ProfileCard'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { useGetProfil } from '@/services/profile/hook'
import { useUserStore } from '@/store/user-store'
import { openURL } from 'expo-linking'

export default function MyProfileCard() {
  const { session } = useSession()
  const { user: credentials } = useUserStore()
  const user = useGetProfil({ enabled: !!session })
  const profile = user?.data
  const onNavigateToCadre = useCallback(
    () => openURL(`${credentials?.isAdmin ? clientEnv.ADMIN_URL : clientEnv.OAUTH_BASE_URL}${profile?.cadre_auth_path}`),
    [profile],
  )

  if (!profile) {
    return null
  }

  if (!session) {
    return null
  }

  return (
    <ProfileCard
      lastName={profile.last_name}
      firstName={profile.first_name}
      src={user.data?.image_url ?? undefined}
      tags={profile.tags}
      onButtonPress={profile.cadre_access ? onNavigateToCadre : undefined}
    />
  )
}
