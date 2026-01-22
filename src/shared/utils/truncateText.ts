/**
 * 텍스트가 maxLength를 초과하면 말줄임(...) 처리
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
