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
  backgroundColor?: string
  noPadding?: boolean
  height?: number | string
}

function Layout({ children, backgroundColor, noPadding = false, height }: Readonly<ProfileCallToActionProps>) {
  return (
    <Card padding={noPadding ? undefined : '$4'} backgroundColor={backgroundColor ?? '$white1'} height={height}>
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

const BackgroundImageBottomRight = ({ source }: Readonly<CardImageProps>) => {
  return (
    <View>
      <Image source={source} height={150} width={150} resizeMode={'contain'} position={'absolute'} right={0} bottom={-30} />
    </View>
  )
}

interface CardContentProps extends PropsWithChildren {
  title?: string
  contentStyle?: TextProps['style']
  titleStyle?: TextProps['style']
  content?: string
  textAlign?: 'center' | 'left' | 'right'
  padding: number | string
  compact?: boolean
}

const CardContent = ({ contentStyle, titleStyle, title, content, children, textAlign, padding, compact }: Readonly<CardContentProps>) => {
  const RenderText = () => (
    <Text fontSize="$2" fontWeight="$7" textAlign={textAlign} style={contentStyle}>
      {content}
    </Text>
  )

  return (
    <View padding={padding}>
      {title && (
        <SpacedContainer>
          <Text textAlign={textAlign} style={titleStyle}>
            {title}
          </Text>
        </SpacedContainer>
      )}

      {content &&
        (compact ? (
          <RenderText />
        ) : (
          <SpacedContainer>
            <RenderText />
          </SpacedContainer>
        ))}

      {children && <SpacedContainer>{children}</SpacedContainer>}
    </View>
  )
}

const Actions = ({ children }: Readonly<PropsWithChildren>) => <View flexDirection={'row'}>{children}</View>

export const ProfileCallToAction = withStaticProperties(Layout, {
  Image: CardImage,
  Content: CardContent,
  Actions,
  BackgroundImageBottomRight,
})
