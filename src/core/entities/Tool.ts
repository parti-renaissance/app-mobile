export interface Tool {
  id: number
  url: string
  image: ToolImage
  title: string
}

export enum ToolImage {
  NEAR,
  REFORMS,
  ANOTHERMANDATE,
}
