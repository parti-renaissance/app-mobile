import EventCard from './EventCard';

export default {
  title: 'EventCard',
  component: EventCard,
};

export const Event = {
  args: {
    payload: {
      title: 'Titre long : Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur',
      type: 'event',
      tag: 'Moment de convivialité',
      image: 'https://picsum.photos/600/244',
      date: new Date(),
      location: {
        city: "Montpellier",
        postalCode: "34090",
        street: " 43 Place du marché de la croix saint Simon",
      },
      author: {
        role: 'Assemblée départementale de Paris',
        name: 'Jean Voulzi',
        title: 'Responsable mobilisation',
        pictureLink: 'https://picsum.photos/id/64/200/200',
      },
    }
  }
};
