import React, { FunctionComponent } from 'react'
import { ActivityIndicator, Platform, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '../../themes'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
}>

const LoaderView: FunctionComponent<Props> = ({ style }) => {
  const { theme } = useTheme()
  return (
    <ActivityIndicator
      style={style}
      size={Platform.OS === 'android' ? 'large' : 'small'}
      color={Platform.OS === 'android' ? theme.primaryColor : undefined}
    />
  )
}

export default LoaderView
