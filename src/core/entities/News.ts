export interface News {
  id: string
  title: string
  description: string
  date: Date
  url?: string
  isPinned: boolean
  linkLabel?: string
  visibility: 'national' | 'local'
  creator?: string
}
