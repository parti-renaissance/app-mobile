import React, { FC } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { Colors, Typography } from '../../styles'
import { Address } from '../../core/entities/DetailedProfile'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { AddressFormatter } from '../../utils/AddressFormatter'

type Props = Readonly<{
  address: Address | undefined
  placeholder: string
  textStyle?: StyleProp<TextStyle>
  onPress: () => void
}>

const LocationPicker: FC<Props> = ({
  onPress,
  textStyle,
  placeholder,
  address,
}) => {
  return (
    <View>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={onPress}
      >
        <Text
          style={[
            styles.commonText,
            textStyle,
            address ? styles.selectedAddress : styles.placeholder,
          ]}
        >
          {address
            ? AddressFormatter.formatProfileAddress(address)
            : placeholder}
        </Text>
      </TouchablePlatform>
    </View>
  )
}

const styles = StyleSheet.create({
  commonText: {
    ...Typography.body,
    paddingVertical: 4,
    textAlign: 'right',
  },
  placeholder: {
    color: Colors.lightText,
  },
  selectedAddress: {
    color: Colors.darkText,
  },
})

export default LocationPicker
