export enum ActionImage {
  DOOR2DOOR,
  PHONING,
  POLLS,
}

export interface Action {
  id: number
  image: ActionImage
  screen: string
  title: string
}
