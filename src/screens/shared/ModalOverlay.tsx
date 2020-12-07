import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Modal, StyleProp, ViewStyle } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing } from '../../styles'
import { CloseButton } from './NavigationHeaderButton'

type Props = Readonly<{
  modalVisible: boolean
  onRequestClose: () => void
  children: any
  contentContainerStyle?: StyleProp<ViewStyle>
}>

const ModalOverlay: FunctionComponent<Props> = ({
  modalVisible,
  onRequestClose,
  children,
  contentContainerStyle,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, contentContainerStyle]}>
          <CloseButton style={styles.close} onPress={onRequestClose} />
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.modalOverlayBackground,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.largeMargin,
    paddingTop: Spacing.topMargin,
    paddingBottom: Spacing.margin,
    backgroundColor: Colors.defaultBackground,
    borderRadius: 8,
    overflow: 'hidden',
  },
  close: {
    position: 'absolute',
    start: 3, // takes image blank padding into account
    top: 3,
    zIndex: 1,
  },
})

export default ModalOverlay
