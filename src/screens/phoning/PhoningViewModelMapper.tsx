import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import { PhoningViewModel } from './PhoningViewModel'
import { PhoningSectionViewModel } from './PhoningRowViewModel'

export const PhoningViewModelMapper = {
  map: (theme: Theme): PhoningViewModel => {
    const rows: Array<PhoningSectionViewModel> = []
    return {
      title: i18n.t('phoning.title'),
      rows: rows,
    }
  },
}
