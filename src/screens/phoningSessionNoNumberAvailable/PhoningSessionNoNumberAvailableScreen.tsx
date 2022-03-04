import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing, Typography } from '../../styles'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { TertiaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'
import i18n from '../../utils/i18n'
import CircularIcon from '../shared/CircularIcon'
import { PhoningSessionModalNavigatorScreenProps } from '../../navigation/phoningSessionModal/PhoningSessionModalNavigatorScreenProps'

type PhoningSessionNoNumberAvailableScreenProps = PhoningSessionModalNavigatorScreenProps<'PhoningSessionNoNumberAvailable'>

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
        <CircularIcon
          source={require('../../assets/images/noPhoneNumber.png')}
        />
      </View>
      <TertiaryButton
        title={i18n.t('phoningsession.end_session')}
        onPress={() => navigation.pop()}
      />
    </SafeAreaView>
  )
}

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
