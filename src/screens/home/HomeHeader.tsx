import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import RegionTheme from '../../core/entities/RegionTheme'

import { Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import { ENVIRONMENT } from '../../Config'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  title: string
}>

const HomeHeader: FunctionComponent<Props> = (props) => {
  const { theme, setTheme } = useTheme()
  const onPress =
    // @ts-ignore : modified by build tools
    ENVIRONMENT !== 'production'
      ? () => {
          const newTheme = getNextTheme(theme.id)
          setTheme(newTheme)
        }
      : undefined
  return (
    <View style={[props.style, styles.container]}>
      <Text onPress={onPress} style={styles.title}>
        {props.title}
      </Text>
    </View>
  )
}

function getNextTheme(theme: RegionTheme): RegionTheme {
  switch (theme) {
    case RegionTheme.BLUE:
      return RegionTheme.YELLOW
    case RegionTheme.YELLOW:
      return RegionTheme.RED
    case RegionTheme.RED:
      return RegionTheme.ORANGE
    case RegionTheme.ORANGE:
      return RegionTheme.GREEN
    case RegionTheme.GREEN:
      return RegionTheme.PINK
    case RegionTheme.PINK:
      return RegionTheme.PURPLE
    case RegionTheme.PURPLE:
      return RegionTheme.BLUE
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.largeMargin,
  },
  title: {
    ...Typography.title,
  },
})

export default HomeHeader
