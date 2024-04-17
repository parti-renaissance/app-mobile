import { PropsWithChildren, ReactNode } from 'react'
import { ImageSourcePropType } from 'react-native'
import SpacedContainer from '@/components/SpacedContainer/SpacedContainer'
import { Card, Image, Text, TextProps, View, withStaticProperties } from 'tamagui'

export interface ProfileCallToActionProps extends PropsWithChildren {
  title?: string
  image?: ImageSourcePropType
  background?: ImageSourcePropType
  Buttons?: () => ReactNode | ReactNode[]
  content?: string
  contentStyle?: TextProps['style']
}

function Layout({ children }: Readonly<ProfileCallToActionProps>) {
  return (
    <Card padding={'$3'} backgroundColor={'$white1'}>
      {children && <SpacedContainer>{children}</SpacedContainer>}
    </Card>
  )
}

interface CardImageProps {
  source: ImageSourcePropType
  height: number
}

const CardImage = ({ source, height }: Readonly<CardImageProps>) => {
  return (
    <SpacedContainer>
      <Image source={source} height={height} width="auto" resizeMode={'contain'} />
    </SpacedContainer>
  )
}

interface CardContentProps extends PropsWithChildren {
  title?: string
  contentStyle?: TextProps['style']
  content?: string
  textAlign?: 'center' | 'left' | 'right'
}

const CardContent = ({ contentStyle, title, content, children, textAlign }: Readonly<CardContentProps>) => (
  <>
    {title && (
      <SpacedContainer>
        <Text style={contentStyle} textAlign={textAlign}>
          {title}
        </Text>
      </SpacedContainer>
    )}

    {content && (
      <SpacedContainer>
        <Text fontSize="$2" fontWeight="$7" textAlign={textAlign}>
          {content}
        </Text>
      </SpacedContainer>
    )}

    {children && <SpacedContainer>{children}</SpacedContainer>}
  </>
)

const Actions = ({ children }: Readonly<PropsWithChildren>) => <View flexDirection={'row'}>{children}</View>

export const ProfileCallToAction = withStaticProperties(Layout, {
  Image: CardImage,
  Content: CardContent,
  Actions,
})
