export enum ActivistTagEnum {
  ADHERENT = 'adherent',
  SYMPATHISANT = 'sympathisant',
  ELU = 'elu',
}

const tagsColor = {
  unknownText: '#637381',
  unknownBackground: '#EDEFF2',
  variant1Text: '#0274B1',
  variant1Background: '#D6EBFF',
  variant2Text: '#8B5311',
  variant2Background: '#FFF0DE',
  variant3Text: '#762BD8',
  variant3Background: '#EEE2FF',
}

export const activistTagShape = {
  [ActivistTagEnum.ADHERENT]: {
    theme: 'blue',
  },
  [ActivistTagEnum.SYMPATHISANT]: {
    theme: 'orange',
  },
  [ActivistTagEnum.ELU]: {
    theme: 'green',
  },
} as const
