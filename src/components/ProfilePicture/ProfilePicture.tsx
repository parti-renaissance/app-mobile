import { Platform } from 'react-native'
import { GetThemeValueForKey } from '@tamagui/web'
import { Image } from 'expo-image'
import { Circle, CircleProps, getTokenValue, Spinner, Square, SquareProps, Token } from 'tamagui'
import Text from '../base/Text'

type ProfilePictureProps = {
  fullName: string
  src?: string
  alt: string
  size?: Token
  textColor?: string
  rounded?: boolean
  fontWeight?: 'unset' | GetThemeValueForKey<'fontWeight'>
  loading?: boolean
} & (
  | ({
      rounded: true
    } & Omit<CircleProps, 'size'>)
  | ({
      rounded: false
    } & Omit<SquareProps, 'size'>)
)

const ProfilePicture = (props: ProfilePictureProps) => {
  const { size = '$4', src, alt, rounded, backgroundColor, textColor, fullName, ...rest } = props

  const initials = fullName
    .split(' ')
    .slice(0, 2)
    .map(([letter]) => letter?.toUpperCase())
    .join('')

  const Shape = rounded ? Circle : Square

  const sizeValue = getTokenValue(size, 'size')
  const content = src ? (
    <Image
      alt={alt}
      source={{ uri: src }}
      key={src}
      style={{
        width: sizeValue,
        height: sizeValue,
      }}
    />
  ) : (
    <Text color={textColor ?? '$blue4'} fontSize={Platform.OS === 'ios' ? sizeValue / 2 : sizeValue / 2.5} fontWeight={props.fontWeight ?? '$2'}>
      {initials}
    </Text>
  )

  return (
    <Shape backgroundColor={backgroundColor || '$blue2'} size={size} {...rest} overflow="hidden">
      {props.loading ? <Spinner color={textColor ?? '$blue4'} /> : content}
    </Shape>
  )
}

export default ProfilePicture
