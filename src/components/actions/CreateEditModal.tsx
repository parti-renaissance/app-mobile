import { memo } from 'react'
import ModalOrPageBase from '../ModalOrPageBase/ModalOrPageBase'
import ActionForm from './ActionForm'

type CreateEditModalProps = {
  open: boolean
  onClose: () => void
  activeAction?: string
  scope?: string
}

const CreateEditModal = (props: CreateEditModalProps) => {
  return (
    <ModalOrPageBase open={props.open} onClose={props.onClose} shouldDisplayCloseHeader>
      {props.open && <ActionForm onCancel={props.onClose} onClose={props.onClose} uuid={props.activeAction} scope={props.scope} />}
    </ModalOrPageBase>
  )
}

export default memo(CreateEditModal)
