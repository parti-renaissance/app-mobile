export function hashCode(string: string): number {
  for (var i = 0, hash = 0; i < string.length; i++)
    // eslint-disable-next-line no-bitwise
    hash = (Math.imul(31, hash) + string.charCodeAt(i)) | 0
  return hash
}
