import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, SafeAreaView } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import i18n from '../../utils/i18n'
import Theme from '../../themes/Theme'
import Classements from './Classements'
import LocationAuthorization from './LocationAuthorization'

const DoorToDoorScreen = () => {
  const styles = useThemedStyles(stylesFactory)
  const [modalVisible, setModalVisible] = useState(false)
  const [locationAuthorized, setLocationAuthorized] = useState<Boolean>(false)

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <Classements onDismissModal={() => setModalVisible(false)} />
      </Modal>
      <TouchablePlatform
        style={styles.classementIconContainer}
        touchHighlight={Colors.touchHighlight}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={styles.classementIcon}
          source={require('../../assets/images/iconClassement.png')}
        />
      </TouchablePlatform>
      <Text style={styles.title}>{i18n.t('doorToDoor.title')}</Text>

      {!locationAuthorized && (
        <LocationAuthorization
          onAuthorization={(isAuthorized) => {
            setLocationAuthorized(isAuthorized)
          }}
        />
      )}
    </SafeAreaView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
    classementIcon: {
      margin: Spacing.margin,
      tintColor: theme.primaryColor,
    },
    classementIconContainer: {
      alignSelf: 'flex-end',
    },
    title: {
      ...Typography.title,
      marginBottom: Spacing.margin,
      marginHorizontal: Spacing.margin,
    },
  })
}

export default DoorToDoorScreen
