import React, { FunctionComponent, useEffect } from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { DoorToDoorTunnelOpeningScreenProp } from '../../../navigation'
import { Colors, Spacing, Typography } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'
import i18n from '../../../utils/i18n'
import { BorderlessButton } from '../../shared/Buttons'
import { TouchablePlatform } from '../../shared/TouchablePlatform'

type CardItemProps = {
  onPress: () => void
  title: string
  image: ImageSourcePropType
}

const DoorToDoorTunnelOpeningScreen: FunctionComponent<DoorToDoorTunnelOpeningScreenProp> = ({
  navigation,
}) => {
  const styles = useThemedStyles(stylesFactory)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BorderlessButton
          title={i18n.t('doorToDoor.tunnel.exit')}
          textStyle={styles.exit}
          onPress={() => navigation.pop()}
        />
      ),
    })
  }, [navigation, styles.exit])

  const CardItem = ({ onPress, title, image }: CardItemProps) => (
    <View style={styles.card}>
      <TouchablePlatform
        onPress={onPress}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>{title}</Text>
          <Image source={image} />
        </View>
      </TouchablePlatform>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('doorToDoor.tunnel.opening.title')}
      </Text>
      <CardItem
        onPress={() => {}}
        title={i18n.t('doorToDoor.tunnel.opening.yes')}
        image={require('../../../assets/images/papDoorOpening.png')}
      />
      <CardItem
        onPress={() => {}}
        title={i18n.t('doorToDoor.tunnel.opening.no')}
        image={require('../../../assets/images/papDoorNotOpening.png')}
      />
    </SafeAreaView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingRight: Spacing.margin,
    },
    buttonTitle: {
      ...Typography.title2,
      flex: 1,
      marginLeft: Spacing.margin,
      textAlign: 'center',
    },
    card: {
      backgroundColor: theme.lightBackground,
      borderRadius: 8,
      flex: 1,
      justifyContent: 'center',
      marginBottom: Spacing.unit,
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
      padding: Spacing.margin,
    },
    exit: {
      color: theme.primaryColor,
    },
    title: {
      ...Typography.title3,
      marginBottom: Spacing.unit,
    },
  })
}

export default DoorToDoorTunnelOpeningScreen
