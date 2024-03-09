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
      image: undefined,
      date: new Date(),
      location: {
        city: "Montpellier",
        postalCode: "34090",
        street: " 43 Place du marché de la croix saint Simon",
      },
    }
  }
};
