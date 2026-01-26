export interface Lecture {
  id: number;
  title: string;
  instructorName: string;
  location: string;
  introduction: string;

  // 일정 관련
  startTime: string;
  termName: string;
  codeNumber: string;

  // 인원 관련
  currentCount: number;
  maxCapacity: number;

  // 추가 강사 정보
  instructorBio: string;
}

export type LectureStatus = "WAITING" | "OPEN" | "CLOSED" | "APPLIED";
