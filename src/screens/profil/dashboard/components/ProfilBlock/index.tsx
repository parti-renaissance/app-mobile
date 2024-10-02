import { useState } from 'react'
import Text from '@/components/base/Text'
import ProfileTags from '@/components/ProfileCards/ProfileCard/ProfileTags'
import ProfilePicture from '@/components/ProfilePicture'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetDetailProfil, useGetProfil, useGetTags, usePostProfilPicture } from '@/services/profile/hook'
import { RestProfilResponse } from '@/services/profile/schema'
import { ImageResult } from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { XStack, YStack } from 'tamagui'
import ImageCroper from '../CropImg'

const UploadPP = (props: { profil: RestProfilResponse }) => {
  const [image, setImage] = useState<ImageResult | null>(null)
  const [openCrop, setOpenCrop] = useState(false)
  const { mutate, isPending } = usePostProfilPicture({ uuid: props.profil.uuid })

  const handleCloseCrop = (img: string) => {
    mutate(img)
    setOpenCrop(false)
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })

    if (!result.canceled) {
      const _img = {
        uri: result.assets[0].uri,
        height: result.assets[0].height,
        width: result.assets[0].width,
      }
      setImage(_img)
      setOpenCrop(true)
    }
  }
  return (
    <YStack justifyContent="center" alignItems="center" gap={16}>
      <ImageCroper image={image} open={openCrop} onClose={handleCloseCrop} />
      <XStack alignItems="center" justifyContent="center">
        <ProfilePicture
          onPress={pickImage}
          size="$11"
          loading={isPending}
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
