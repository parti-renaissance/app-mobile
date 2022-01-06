import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, Image, BackHandler } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PollDetailSuccessScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'

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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/images/blue/imageMerci.png')}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{i18n.t('polldetail.success.title')}</Text>
          <Text style={styles.text}>
            {i18n.t('polldetail.success.message')}
          </Text>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Spacing.margin,
  },
  content: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  image: {
    aspectRatio: 395 / 283,
    height: undefined,
    width: '100%',
  },
  primaryButton: {
    marginBottom: Spacing.unit,
  },
  scrollView: {
    backgroundColor: Colors.defaultBackground,
  },
  text: {
    ...Typography.body,
    marginBottom: Spacing.mediumMargin,
  },
  title: {
    ...Typography.largeTitle,
    marginBottom: Spacing.unit,
  },
})

export default PollDetailSuccess
