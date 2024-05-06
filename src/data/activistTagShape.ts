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
    color: tagsColor.variant1Text,
    bgColor: tagsColor.variant1Background,
  },
  [ActivistTagEnum.SYMPATHISANT]: {
    color: tagsColor.variant2Text,
    bgColor: tagsColor.variant2Background,
  },
  [ActivistTagEnum.ELU]: {
    color: tagsColor.variant3Text,
    bgColor: tagsColor.variant3Background,
  },
}
