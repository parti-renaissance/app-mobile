import Text from '@/components/base/Text'
import ProfileTags from '@/components/ProfileCards/ProfileCard/ProfileTags'
import ProfilePicture from '@/components/ProfilePicture'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetDetailProfil, useGetProfil, useGetTags } from '@/services/profile/hook'
import { RestProfilRequest, RestProfilResponse } from '@/services/profile/schema'
import { XStack, YStack } from 'tamagui'
import ImageCroper from '../CropImg'

const UploadPP = (props: { profil: RestProfilResponse }) => {
  return (
    <YStack justifyContent="center" alignItems="center" gap={16}>
      <ImageCroper />
      <XStack alignItems="center" justifyContent="center">
        <ProfilePicture
          size="$11"
          rounded
          fullName={props.profil.first_name + ' ' + props.profil.last_name}
          src={props.profil.image_url ?? undefined}
          alt="profile"
        />
      </XStack>
      <Text.LG>
        {props.profil.first_name} {props.profil.last_name}
      </Text.LG>
    </YStack>
  )
}

export default function () {
  const { data: profil } = useGetProfil()
  const { tags } = useGetTags({ tags: ['elu', 'sympathisant', 'adherent'] })
  const { data: detProfil } = useGetDetailProfil()
  return profil ? (
    <VoxCard $sm={{ bg: 'transparent' }}>
      <VoxCard.Content>
        <UploadPP profil={profil} />
        <ProfileTags tags={tags ?? []} justifyContent="center" />
        <Text.MD textAlign="center">
          {detProfil.main_zone?.name}, {detProfil.post_address?.city_name}
        </Text.MD>
      </VoxCard.Content>
    </VoxCard>
  ) : (
    <SkeCard>
      <SkeCard.Content>
        <SkeCard.Image />
      </SkeCard.Content>
    </SkeCard>
  )
}
