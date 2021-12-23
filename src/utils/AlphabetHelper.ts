const nextLetterInAlphabet = (letter: string): string => {
  return String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1)
}

const AlphabetHelper = {
  nextLetterInAlphabet,
}

export default AlphabetHelper
