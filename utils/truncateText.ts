


export function TruncateText(str: string): string {
  return str.length <= 15 ? str : `${str.substring(0, 15)}.....`;
}
