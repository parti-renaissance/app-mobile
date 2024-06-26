import { useCallback } from 'react'
import ProfileCard from '@/components/ProfileCards/ProfileCard/ProfileCard'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { openURL } from 'expo-linking'

export default function MyProfileCard() {
  const { user } = useSession()
  const profile = user?.data

  if (!profile) {
    return null
  }

  const onNavigateToCadre = useCallback(() => openURL(`${clientEnv.OAUTH_BASE_URL}${profile.cadre_auth_path}`), [])

  return (
    <ProfileCard
      lastName={profile.last_name}
      firstName={profile.first_name}
      tags={profile.tags}
      onButtonPress={profile.cadre_access ? onNavigateToCadre : undefined}
    />
  )
}
