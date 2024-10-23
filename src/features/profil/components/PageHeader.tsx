import { NamedExoticComponent } from 'react'
import { VoxHeader } from '@/components/Header/Header'
import type { IconProps } from '@tamagui/helpers-icon'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'

type ProfilHeaderProps = {
  icon: NamedExoticComponent<IconProps>
  title: string
  backArrow?: boolean
}

const ProfilHeader = ({ icon, title, backArrow = true }: ProfilHeaderProps) => {
  return (
    <VoxHeader justifyContent="space-between" backgroundColor="white" $gtMd={{ display: 'none' }} safeAreaView={false}>
      {backArrow ? (
        <Link href="/profil">
          <VoxHeader.LeftButton icon={ArrowLeft} />
        </Link>
      ) : (
        <VoxHeader.LeftButton opacity={0} icon={ArrowLeft} />
      )}
      <VoxHeader.Title icon={icon}>{title}</VoxHeader.Title>
      <VoxHeader.LeftButton opacity={0} icon={ArrowLeft} />
    </VoxHeader>
  )
}

export default ProfilHeader
