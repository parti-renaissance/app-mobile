import React, { FunctionComponent } from 'react'
import {
  ImageSourcePropType,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
import { Colors, Typography, Spacing } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'

type Props = {
  onPress: () => void
  text?: string
  image: ImageSourcePropType
}

const MapButton: FunctionComponent<Props> = ({ onPress, text, image }) => {
  return (
    <TouchablePlatform
      style={styles.searchHereButton}
      onPress={onPress}
      touchHighlight={Colors.touchHighlight}
    >
      <View style={styles.searchHereButtonContainer}>
        <Image style={styles.mapButtonIcon} source={image} />
        {text !== undefined && <Text style={styles.mapButtonText}>{text}</Text>}
      </View>
    </TouchablePlatform>
  )
}

const styles = StyleSheet.create({
  mapButtonIcon: {
    alignSelf: 'center',
    height: 16,
    width: 16,
  },
  mapButtonListContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: Spacing.margin,
  },
  mapButtonText: {
    ...Typography.callout,
    alignSelf: 'center',
    marginLeft: Spacing.small,
    textAlign: 'center',
  },
  searchHereButton: {
    borderRadius: 20,
    flex: 0,
    overflow: 'hidden',
  },
  searchHereButtonContainer: {
    backgroundColor: Colors.defaultBackground,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
    padding: Spacing.unit,
  },
})

export default MapButton
