const KOREAN_DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

function toValidDate(input?: string | Date): Date | null {
  if (!input) return null;
  const d = input instanceof Date ? input : new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** yyyy.MM.dd(요일) — 일요일은 '주일' */
export function formatDateKorean(input?: string | Date): string {
  const d = toValidDate(input);
  if (!d) return "";

  const yyyy = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  const dayIndex = d.getDay();
  const day = dayIndex === 0 ? "주일" : KOREAN_DAYS[dayIndex];

  return `${yyyy}.${MM}.${dd} (${day})`;
}

/** 24시 HH:mm */
export function formatTime24(input?: string | Date): string {
  const d = toValidDate(input);
  if (!d) return "";

  const HH = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");

  return `${HH}:${mm}`;
}

/** 조합: yyyy.MM.dd(요일) HH:mm */
export function formatDateTimePretty(iso?: string | Date): string {
  const date = formatDateKorean(iso);
  const time = formatTime24(iso);
  if (!date || !time) return "";
  return `${date} ${time}`;
}
