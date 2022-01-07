import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, BackHandler } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SafeAreaView from 'react-native-safe-area-view'
import { PollDetailSuccessScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import CircularIcon from '../shared/CircularIcon'
import { FlexibleVerticalSpacer } from '../shared/Spacer'

const PollDetailSuccess: FunctionComponent<PollDetailSuccessScreenProps> = ({
  route,
  navigation,
}) => {
  React.useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        title: route.params.title,
      })
    }

    // Disable back press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    )

    updateNavigationHeader()
    return () => backHandler.remove()
  }, [navigation, route.params.title])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CircularIcon
          style={styles.image}
          source={require('../../assets/images/imageMerci.png')}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{i18n.t('polldetail.success.title')}</Text>
          <Text style={styles.text}>
            {i18n.t('polldetail.success.message')}
          </Text>
          <FlexibleVerticalSpacer />
          <PrimaryButton
            style={styles.primaryButton}
            title={i18n.t('polldetail.success.restart')}
            onPress={() =>
              navigation.replace(Screen.pollDetail, {
                pollId: route.params.pollId,
              })
            }
          />
          <SecondaryButton
            title={i18n.t('polldetail.success.finish')}
            onPress={() => navigation.navigate(Screen.polls)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    marginBottom: Spacing.margin,
  },
  content: {
    flex: 1,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  image: {
    alignSelf: 'center',
    marginBottom: Spacing.margin,
    marginTop: Spacing.margin,
  },
  primaryButton: {
    marginBottom: Spacing.unit,
  },
  safeArea: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  text: {
    ...Typography.body,
    marginBottom: Spacing.mediumMargin,
    textAlign: 'center',
  },
  title: {
    ...Typography.largeTitle,
    marginBottom: Spacing.unit,
    textAlign: 'center',
  },
})

export default PollDetailSuccess
