export enum ActionImage {
  DOORTODOOR,
  PHONING,
  POLLS,
}

export interface Action {
  id: number
  image: ActionImage
  screen: string
  title: string
}
