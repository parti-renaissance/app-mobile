/**
 * @see https://www.youtube.com/watch?v=kiWnG4WowDk
 * @param code
 */
export default function isoToEmoji(code: string) {
  return code
    .split('')
    .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
    .map((n) => String.fromCodePoint(n))
    .join('')
}
