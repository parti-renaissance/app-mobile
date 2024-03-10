import ActionCard from './ActionCard'

export default {
  title: 'ActionCard',
  component: ActionCard,
}

export const props = {
  payload: {
    tag: 'Porte à porte',
    date: new Date(),
    location: {
      city: 'Montpellier',
      postalCode: '34090',
      street: ' 43 Place du marché de la croix saint Simon',
    },
    attendees: {
      pictures: ['https://picsum.photos/id/64/200/200', 'https://picsum.photos/id/66/200/200', 'https://picsum.photos/id/71/200/200'],
      count: 40,
    },
    author: {
      role: 'Assemblée départementale de Paris',
      name: 'Jean Voulzi',
      title: 'Responsable mobilisation',
      pictureLink: 'https://picsum.photos/id/64/200/200',
    },
  },
}

export const Action = { args: props }

export const ActionSubscribed = {
  args: {
    payload: {
      ...props.payload,
      isSubscribed: true,
    },
  },
}

export const ActionNoAttendees = {
  args: {
    payload: {
      ...props.payload,
      attendees: undefined,
    },
  },
}
