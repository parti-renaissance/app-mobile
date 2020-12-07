// NOTE: (Pierre Felgines) 17/11/2020 This is not optimal to store string in two parts
// We made this choice because it's complicated to handle attributed string
// in combination with localization in React native
// As we only support French locale for now, this is not an issue to split the string.
export interface QuestionTextLinkRowViewModel {
  id: string
  content: string
  highlightedSuffix: string
}
