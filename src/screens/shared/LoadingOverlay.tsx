import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Text, Platform, Modal } from 'react-native'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LoaderView from './LoaderView'

type Props = Readonly<{
  visible: boolean
}>

// (Pierre Felgines) 18/11/2020 This is an ugly hack to set an overlay that works well
// on both iOS and Android
// On Android we use the Modal component to avoid issues with the elevation API
// On iOS we use an absolute container to avoid issues with Modal and Alert
// (cf https://github.com/facebook/react-native/issues/10471)
const LoadingOverlay: FunctionComponent<Props> = ({ visible }) => {
  const Inner = () => {
    return (
      <View style={styles.inner}>
        <LoaderView />
        <Text style={styles.text}>{i18n.t('common.loading')}</Text>
      </View>
    )
  }
  if (Platform.OS === 'android') {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => null}
      >
        <View style={styles.container}>
          <Inner />
        </View>
      </Modal>
    )
  } else if (Platform.OS === 'ios') {
    if (visible) {
      return (
        <View style={[styles.container, styles.overlay]}>
          <Inner />
        </View>
      )
    } else {
      return null
    }
  }
  return null
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.loadingOverlayBackground,
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    alignContent: 'center',
    borderRadius: 8,
    elevation: 6,
    justifyContent: 'center',
    minHeight: 100,
    minWidth: 100,
    padding: Spacing.margin,
    ...Styles.elevatedContainerStyle,
  },
  overlay: {
    bottom: 0,
    end: 0,
    position: 'absolute',
    start: 0,
    top: 0,
    zIndex: 100,
  },
  text: {
    marginTop: Spacing.margin,
    ...Typography.body,
  },
})

export default LoadingOverlay
