import React, { FC } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { Address } from '../../core/entities/DetailedProfile'
import { Colors, Typography } from '../../styles'
import { AddressFormatter } from '../../utils/AddressFormatter'
import { TouchablePlatform } from '../shared/TouchablePlatform'

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
    <TouchablePlatform
      style={styles.container}
      touchHighlight={Colors.touchHighlight}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
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
      </View>
    </TouchablePlatform>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textContainer: {
    flex: 1,
  },
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
