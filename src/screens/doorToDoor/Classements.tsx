import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { NavigationHeaderButton } from '../shared/NavigationHeaderButton'

type Props = Readonly<{
  onDismissModal: () => void
}>

const Classements: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <NavigationHeaderButton
          source={require('../../assets/images/navigationBarClose.png')}
          onPress={props.onDismissModal}
        />
        <Text style={styles.headerTitle}>
          {i18n.t('doorToDoor.classements.title')}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    ...Typography.title2,
    textAlign: 'center',
  },
})

export default Classements
