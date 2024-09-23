import { useCallback } from 'react'
import ProfileCard from '@/components/ProfileCards/ProfileCard/ProfileCard'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { useUserStore } from '@/store/user-store'
import { openURL } from 'expo-linking'

export default function MyProfileCard() {
  const { user, session } = useSession()
  const { user: credentials } = useUserStore()
  const profile = user?.data

  if (!profile) {
    return null
  }

  if (!session) {
    return null
  }

  const onNavigateToCadre = useCallback(() => openURL(`${credentials?.isAdmin ? clientEnv.ADMIN_URL : clientEnv.OAUTH_BASE_URL}${profile.cadre_auth_path}`), [])

  return (
    <ProfileCard
      lastName={profile.last_name}
      firstName={profile.first_name}
      tags={profile.tags}
      onButtonPress={profile.cadre_access ? onNavigateToCadre : undefined}
    />
  )
}
