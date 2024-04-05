import NewsCard from './NewsCard'

export default {
  title: 'NewsCard',
  component: NewsCard,
}

const props = {
  payload: {
    title: 'Titre long : Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur',
    tag: 'Actualité',
    image: 'https://picsum.photos/600/244',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat gravida pretium ultrices at pulvinar nunc porttitor nibh. Lorem ipsum dolor sit amet consectetur Reuiat eges...',
    date: new Date(),
    location: {
      city: 'Montpellier',
      postalCode: '34090',
      street: ' 43 Place du marché de la croix saint Simon',
    },
    author: {
      role: 'Assemblée départementale de Paris',
      name: 'Jean Voulzi',
      title: 'Responsable mobilisation',
      pictureLink: 'https://picsum.photos/id/64/200/200',
    },
  },
}

export const News = { args: props }

export const NewsNoImage = {
  args: {
    payload: {
      ...props.payload,
      image: undefined,
    },
  },
}

export const NewsSubscribed = {
  args: {
    payload: {
      ...props.payload,
      isSubscribed: true,
    },
  },
}
