import i18n from '../../utils/i18n'
import { PhoningViewModel } from './PhoningViewModel'
import { PhoningRowViewModel } from './PhoningRowViewModel'

export const PhoningViewModelMapper = {
  map: (): PhoningViewModel => {
    const rows: Array<PhoningRowViewModel> = []

    appendTutorial(rows)
    appendCallContact(rows)

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
      id: 'tutorial',
    },
  })
}

function appendCallContact(rows: PhoningRowViewModel[]) {
  rows.push({
    type: 'callContact',
    value: {
      id: 'callContact',
      calledCount: 75,
      numberOfPersonToCall: 134,
    },
  })
}
