import React, { FC } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { NavigationHeaderButton } from '../shared/NavigationHeaderButton'

type Props = Readonly<{
  onDismissModal: () => void
}>

const EventQuickFilters: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <NavigationHeaderButton
          source={require('../../assets/images/navigationBarBack.png')}
          onPress={props.onDismissModal}
        />
        <Text style={styles.headerTitle}>{i18n.t('events.filters.title')}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.defaultBackground, flex: 1 },
  headerContainer: {
    flexDirection: 'row',
  },
  headerTitle: {
    ...Typography.title2,
    alignSelf: 'center',
    flexGrow: 1,
    marginEnd: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

export default EventQuickFilters
