import React, { FunctionComponent, useEffect } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { TunnelDoorOpeningScreenProp } from '../../../navigation'
import { Colors, Spacing, Typography } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'
import i18n from '../../../utils/i18n'
import { BorderlessButton } from '../../shared/Buttons'
import { TouchablePlatform } from '../../shared/TouchablePlatform'

const TunnelDoorOpeningScreen: FunctionComponent<TunnelDoorOpeningScreenProp> = ({
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('doorToDoor.tunnel.opening.title')}
      </Text>
      <View style={styles.card}>
        <TouchablePlatform
          onPress={() => {}}
          touchHighlight={Colors.touchHighlight}
        >
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>
              {i18n.t('doorToDoor.tunnel.opening.yes')}
            </Text>
            <Image
              source={require('../../../assets/images/papDoorOpening.png')}
            />
          </View>
        </TouchablePlatform>
      </View>
      <View style={styles.card}>
        <TouchablePlatform
          onPress={() => {}}
          touchHighlight={Colors.touchHighlight}
        >
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>
              {i18n.t('doorToDoor.tunnel.opening.no')}
            </Text>
            <Image
              source={require('../../../assets/images/papDoorOpening.png')}
            />
          </View>
        </TouchablePlatform>
      </View>
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

export default TunnelDoorOpeningScreen
