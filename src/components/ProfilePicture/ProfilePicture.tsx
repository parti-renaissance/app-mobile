import { Image } from 'react-native'
import { Circle, Square, Text } from 'tamagui'

interface ProfilePictureProps {
  fullName: string
  src?: string
  size?: number
  alt: string
  bgColor?: string
  textColor?: string
  rounded: boolean
}

const ProfilePicture = (props: ProfilePictureProps) => {
  const { fullName, size = 128, src, alt, rounded, bgColor, textColor } = props

  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')

  const Shape = rounded ? Circle : Square

  return (
    <Shape backgroundColor={bgColor || '$blue3'} size={size}>
      {src ? (
        <Image
          alt={alt}
          source={{ uri: src }}
          style={{
            width: size,
            height: size,
            borderRadius: rounded ? 64 : 0,
          }}
        />
      ) : (
        <Text color={textColor || '$blue8'} fontSize="$7" fontWeight="$2">
          {initials}
        </Text>
      )}
    </Shape>
  )
}

export default ProfilePicture
