const nextLetterInAlphabet = (letter: string): string => {
  return String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);
};

const firstLetterInAlphabet = "A";

const AlphabetHelper = {
  firstLetterInAlphabet,
  nextLetterInAlphabet,
};

export default AlphabetHelper;
