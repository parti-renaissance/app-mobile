import { useCallback } from 'react'
import ProfileCard from '@/components/ProfileCards/ProfileCard/ProfileCard'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { openURL } from 'expo-linking'

export default function MyProfileCard() {
  const { user } = useSession()
  const profile = user?.data

  const onNavigateToCadre = useCallback(() => openURL(`https://${clientEnv.CADRE_RENAISSANCE_HOST}`), [])

  if (!profile) {
    return null
  }

  return (
    <ProfileCard
      lastName={profile?.last_name}
      firstName={profile?.first_name}
      tags={profile?.tags}
      onButtonPress={profile?.cadre_access ? onNavigateToCadre : undefined}
    />
  )
}
