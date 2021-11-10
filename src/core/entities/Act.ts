export interface Act {
  id: number
  image: ActImage
  title: string
  screen: string
  subtitle: string
}

export enum ActImage {
  POLLS,
  DOOR2DOOR,
  PHONING,
}
