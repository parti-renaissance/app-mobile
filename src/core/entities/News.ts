export interface News {
  id: string
  title: string
  description: string
  date: Date
  url?: string
  isPinned: boolean
  isMarkdown: boolean
  visibility: 'national' | 'local'
  creator?: string
}
