import { memo } from 'react'
import { ImageSourcePropType } from 'react-native'
import Text from '@/components/base/Text'
import ProfilePicture from '@/components/ProfilePicture'
import { ChevronRight } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'

interface AvatarProps {
  firstName?: string
  lastName?: string
  src?: ImageSourcePropType
  imageLeft?: boolean
  imageRight?: boolean
  imageBg?: string
  withArrow?: boolean
}

function Avatar({ imageBg, imageLeft = true, imageRight = false, withArrow, ...props }: AvatarProps) {
  return (
    <XStack gap={'$4'} alignItems={'center'}>
      {imageLeft && <Picture {...props} bg={imageBg} />}

      <Label {...props} />

      {imageRight && <Picture {...props} bg={imageBg} />}

      {withArrow && <ChevronRight flex={1} />}
    </XStack>
  )
}

const Label = (props: AvatarProps) => (
  <YStack flex={4}>
    <Text fontFamily={'$PublicSans'} color="$textPrimary" fontWeight={'500'} fontSize={14}>
      {props.lastName} {props.firstName}
    </Text>
  </YStack>
)

const Picture = (props: AvatarProps) => (
  <YStack flex={1}>
    <ProfilePicture fullName={`${props?.firstName} ${props?.lastName}`} src={props.src} alt="profile picture" size="$4" rounded />
  </YStack>
)

export default memo(Avatar)
