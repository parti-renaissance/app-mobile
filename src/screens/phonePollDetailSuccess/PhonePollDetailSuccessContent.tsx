import React, { FunctionComponent } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Spacing } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'
import { PhonePollDetailSuccessProgressContent } from './PhonePollDetailSuccessProgressContent'
import { PhonePollDetailSuccessRowSuccessViewModel } from './PhonePollDetailSuccessViewModel'

type Props = Readonly<{
  viewModel: PhonePollDetailSuccessRowSuccessViewModel
  onNewCall: () => void
  onFinish: () => void
}>

export const PhonePollDetailSuccessContent: FunctionComponent<Props> = ({
  viewModel,
  onNewCall,
  onFinish,
}) => {
  const { theme } = useTheme()
  return (
    <>
      <View style={styles.content}>
        <PhonePollDetailSuccessProgressContent viewModel={viewModel} />
      </View>
      <VerticalSpacer spacing={Spacing.margin} />
      <Image
        style={styles.image}
        source={theme.image.pollSuccess()}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <VerticalSpacer spacing={Spacing.margin} />
        <PrimaryButton
          title={i18n.t('phoningsession.new_call')}
          onPress={() => onNewCall()}
        />
        <VerticalSpacer spacing={Spacing.margin} />
        <SecondaryButton
          title={i18n.t('phoningsession.end_session')}
          onPress={() => onFinish()}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.margin,
  },
  image: {
    aspectRatio: 395 / 283,
    height: undefined,
    width: '100%',
  },
})
