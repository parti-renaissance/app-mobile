import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningContactTutorialScreenProp, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'

export interface PhoningResources {}

const PhoningContactTutorialScreen: FunctionComponent<PhoningContactTutorialScreenProp> = ({
  navigation,
  route,
}) => {
  const navigateToQuestionnaire = () => {
    navigation.replace(Screen.phoningSessionLoader, {
      data: route.params,
    })
  }

  navigation.setOptions({
    headerLeft: () => <CloseButton onPress={() => navigation.pop()} />,
  })

  const { theme } = useTheme()
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('phoningcontacttutorial.title')}</Text>
      <VerticalSpacer spacing={Spacing.extraLargeMargin} />
      <Text style={styles.body}>
        {i18n.t('phoningcontacttutorial.description')}
      </Text>
      <FlexibleVerticalSpacer minSpacing={Spacing.margin} />
      <PrimaryButton
        title={i18n.t('phoningsession.call_started')}
        onPress={() => navigateToQuestionnaire()}
      />
      <VerticalSpacer spacing={Spacing.margin} />
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
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title,
  },
})

export default PhoningContactTutorialScreen
