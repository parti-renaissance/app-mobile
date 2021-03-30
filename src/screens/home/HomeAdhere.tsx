import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { Spacing, Typography } from '../../styles'
import BlueTheme from '../../themes/BlueTheme'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import CardView from '../shared/CardView'

type Props = Readonly<{
  onPress: () => void
}>

const HomeAdhere: FunctionComponent<Props> = ({ onPress }) => {
  const theme = BlueTheme
  return (
    <CardView style={styles.container} backgroundColor={theme.lightBackground}>
      <Text style={styles.title}>{i18n.t('home.footer.title')}</Text>
      <Text style={styles.description}>
        {i18n.t('home.footer.description')}
      </Text>
      <PrimaryButton
        theme={theme}
        style={styles.button}
        onPress={onPress}
        title={i18n.t('home.footer.button')}
      />
      <Image
        style={styles.logo}
        source={require('../../assets/images/imagesEngagementBleuDFault.png')}
      />
    </CardView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  container: {
    margin: Spacing.margin,
  },
  description: {
    ...Typography.body,
    alignSelf: 'center',
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
  logo: {
    aspectRatio: 288 / 78,
    height: undefined,
    marginTop: Spacing.margin,
    width: '100%',
  },
  title: {
    ...Typography.largeTitle,
    alignSelf: 'center',
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.largeMargin,
  },
})

export default HomeAdhere
