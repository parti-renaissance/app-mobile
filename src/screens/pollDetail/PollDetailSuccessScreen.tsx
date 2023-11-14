import React, { FunctionComponent } from 'react'
import { BackHandler, StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PollDetailModalNavigatorScreenProps } from '../../navigation/pollDetailModal/PollDetailModalNavigatorScreenProps'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import CircularIcon from '../shared/CircularIcon'
import { FlexibleVerticalSpacer } from '../shared/Spacer'

type PollDetailSuccessScreenProps =
  PollDetailModalNavigatorScreenProps<'PollDetailSuccess'>

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
              navigation.replace('PollDetail', {
                pollId: route.params.pollId,
              })
            }
          />
          <SecondaryButton
            title={i18n.t('polldetail.success.finish')}
            onPress={() => navigation.goBack()}
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
    ...Typography.title,
    marginBottom: Spacing.unit,
    textAlign: 'center',
  },
})

export default PollDetailSuccess
