import { Retaliation } from '../../core/entities/Retaliation'
import { RetaliationCardViewModelMapper } from './RetaliationCardViewModelMapper'
import { RetaliationDetailViewModel } from './RetaliationDetailViewModel'

export const RetaliationDetailViewModelMapper = {
  map: (retaliation: Retaliation): RetaliationDetailViewModel => {
    return {
      title: retaliation.title,
      body: retaliation.body,
      card: RetaliationCardViewModelMapper.map(retaliation),
    }
  },
}
