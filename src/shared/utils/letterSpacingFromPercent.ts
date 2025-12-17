/** 웹에서는 letter spacing을 '%' 단위로 조절할 수 있지만 
 * 리엑트 네이티브에선 지원하지 않는 상황이므로
 * 폰트 기준으로 퍼센트 값을 넣으면 실제 앱 랜더링 상으로 값을 변환해주는 유틸 함수
 */
export const letterSpacingFromPercent = (
  fontSize: number,
  percent: number
) => fontSize * (percent / 100);