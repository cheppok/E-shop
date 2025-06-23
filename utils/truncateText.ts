// export function truncateText(str: string): string {
//   if (str.length <= 25) {
//     return str;
//   }
//   return str.substring(0, 25) + "...";
// }



export function TruncateText(str: string): string {
  return str.length <= 25 ? str : `${str.substring(0, 25)}.....`;
}
