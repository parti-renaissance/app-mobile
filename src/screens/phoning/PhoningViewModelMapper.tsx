import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import { PhoningViewModel } from './PhoningViewModel'
import { PhoningRowViewModel } from './PhoningRowViewModel'

export const PhoningViewModelMapper = {
  map: (theme: Theme): PhoningViewModel => {
    const rows: Array<PhoningRowViewModel> = []

    appendTutorial(rows)

    return {
      title: i18n.t('phoning.title'),
      rows: rows,
    }
  },
}

function appendTutorial(rows: PhoningRowViewModel[]) {
  rows.push({
    type: 'tutorial',
    value: {
      id: 'string',
    },
  })
}
