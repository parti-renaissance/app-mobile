import React, { FunctionComponent } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'

type Props = {
  onPress: () => void
  text?: string
  image: ImageSourcePropType
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

const MapButton: FunctionComponent<Props> = ({
  onPress,
  text,
  image,
  style,
  disabled = false,
}) => (
  <CardView
    borderRadius={30}
    backgroundColor={Colors.defaultBackground}
    style={style}
  >
    <TouchablePlatform
      onPress={onPress}
      touchHighlight={Colors.touchHighlight}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Image
          style={[styles.mapButtonIcon, disabled ? styles.imageDisabled : null]}
          source={image}
        />
        {text !== undefined && (
          <Text
            style={[styles.mapButtonText, disabled ? styles.disabled : null]}
          >
            {text}
          </Text>
        )}
      </View>
    </TouchablePlatform>
  </CardView>
)

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Spacing.unit,
  },
  disabled: {
    color: Colors.lightText,
  },
  imageDisabled: {
    tintColor: Colors.lightText,
  },
  mapButtonIcon: {
    alignSelf: 'center',
    height: 16,
    marginVertical: Spacing.small,
    width: 16,
  },
  mapButtonText: {
    ...Typography.callout,
    alignSelf: 'center',
    marginHorizontal: Spacing.unit,
    textAlign: 'center',
  },
})

export default MapButton
