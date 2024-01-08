import React, { FunctionComponent } from 'react'
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
          <View style={styles.closeButtonContainer}>
            <CloseButton onPress={onRequestClose} />
          </View>
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  closeButtonContainer: {
    position: 'absolute',
    start: 3, // takes image blank padding into account
    top: 3,
    zIndex: 1,
  },
  container: {
    backgroundColor: Colors.modalOverlayBackground,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.defaultBackground,
    borderRadius: 8,
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.largeMargin,
    maxHeight: '100%',
    overflow: 'hidden',
    paddingBottom: Spacing.margin,
    paddingTop: Spacing.topMargin,
  },
})

export default ModalOverlay
