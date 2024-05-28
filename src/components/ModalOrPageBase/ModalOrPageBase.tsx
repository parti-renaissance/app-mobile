import { PropsWithChildren } from 'react'
import { Modal, StyleSheet } from 'react-native'
import { Spacing } from '@/styles'
import { ScrollView, useMedia, View } from 'tamagui'

interface ModalOrPageBaseProps extends PropsWithChildren {
  onClose?: () => void
  open?: boolean
}

/**
 * This component create a centered modal in md and more viewport, or a page in small ones
 * @constructor
 */
export default function ModalOrPageBase({ children, onClose, open }: ModalOrPageBaseProps) {
  const viewport = useMedia()

  if (viewport.gtMd) {
    return (
      <Modal animationType={'fade'} transparent visible={!!open}>
        <View style={styles.centeredView} onPress={onClose}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </Modal>
    )
  }

  return (
    <ScrollView backgroundColor={'white'} style={styles.mediumView}>
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mediumView: {
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: Spacing.largeMargin,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
