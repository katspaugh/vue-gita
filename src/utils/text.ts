export function splitLineWords(text: string, wordSeparator = /(\s|।)+/, lineSeparator = /\n+\s?/): Array<string[]> {
  return text.split(lineSeparator).map(line => line.split(wordSeparator))
}
