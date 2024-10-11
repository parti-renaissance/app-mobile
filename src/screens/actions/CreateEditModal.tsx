import { memo } from 'react'
import { VoxHeader } from '@/components/Header/Header'
import ModalOrPageBase from '@/components/ModalOrPageBase/ModalOrPageBase'
import { X } from '@tamagui/lucide-icons'
import ActionForm from './form/ActionForm'

type CreateEditModalProps = {
  open: boolean
  onClose: () => void
  activeAction?: string
  scope?: string
}

const CreateEditModal = (props: CreateEditModalProps) => {
  return (
    <ModalOrPageBase
      open={props.open}
      onClose={props.onClose}
      header={
        <VoxHeader.ModalFrame>
          <VoxHeader.LeftButton onPress={props.onClose} icon={X} backTitle="Annuler" />
        </VoxHeader.ModalFrame>
      }
    >
      {props.open && <ActionForm onCancel={props.onClose} onClose={props.onClose} uuid={props.activeAction} scope={props.scope} />}
    </ModalOrPageBase>
  )
}

export default memo(CreateEditModal)
