export function reverseString(str: string): string {
  if (str.length <= 1) {
    return str;
  }
  return reverseString(str.slice(1)) + str[0];
}
