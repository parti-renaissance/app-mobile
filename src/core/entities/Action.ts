export interface Action {
  id: number
  image: ActionImage
  title: string
  screen: string
}

export enum ActionImage {
  POLLS,
  DOOR2DOOR,
  PHONING,
}
