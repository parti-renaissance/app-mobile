import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, Image, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import {
  PhoningSessionNoNumberAvailableScreenProps,
  Screen,
} from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { TertiaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'
import i18n from '../../utils/i18n'

const PhoningSessionNoNumberAvailableScreen: FunctionComponent<PhoningSessionNoNumberAvailableScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('phoningsession.no_number.title')}
      </Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <Text style={styles.body}>{route.params.message}</Text>
      <VerticalSpacer spacing={Spacing.mediumMargin} />
      <View style={styles.imageContainer}>
        <View style={styles.imageCircle}>
          <Image
            source={require('../../assets/images/noPhoneNumber.png')}
            resizeMode="center"
          />
        </View>
      </View>
      <TertiaryButton
        title={i18n.t('phoningsession.end_session')}
        onPress={() => navigation.navigate(Screen.phoning)}
      />
    </SafeAreaView>
  )
}

const IMAGE_SIZE = 140

const styles = StyleSheet.create({
  body: {
    ...Typography.body,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    paddingBottom: Spacing.margin,
    paddingHorizontal: Spacing.margin,
  },
  imageCircle: {
    alignItems: 'center',
    backgroundColor: Colors.secondaryButtonBackground,
    borderRadius: IMAGE_SIZE / 2,
    height: IMAGE_SIZE,
    justifyContent: 'center',
    width: IMAGE_SIZE,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.title,
  },
})

export default PhoningSessionNoNumberAvailableScreen
