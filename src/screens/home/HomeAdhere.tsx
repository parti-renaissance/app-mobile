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
  container: {
    margin: Spacing.margin,
  },
  title: {
    ...Typography.largeTitle,
    marginTop: Spacing.largeMargin,
    marginHorizontal: Spacing.margin,
    alignSelf: 'center',
  },
  description: {
    ...Typography.body,
    marginTop: Spacing.mediumMargin,
    marginHorizontal: Spacing.margin,
    alignSelf: 'center',
  },
  button: {
    marginTop: Spacing.margin,
    marginHorizontal: Spacing.margin,
  },
  logo: {
    marginTop: Spacing.margin,
    width: '100%',
    height: undefined,
    aspectRatio: 288 / 78,
  },
})

export default HomeAdhere
