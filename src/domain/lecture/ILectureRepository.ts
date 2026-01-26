import { Lecture } from "./Lecture";

export interface ILectureRepository {
  /**
   * 특정 Term에 속한 강의 목록 조회
   */
  getLecturesByTerm(termId: number): Promise<Lecture[]>;

  /**
   * 강의 단건 조회
   */
  getLecture(id: number): Promise<Lecture | null>;

  /**
   * 수강 신청
   */
  enrollLecture(lectureId: number): Promise<void>;

  /**
   * 수강 취소
   */
  dropLecture(lectureId: number): Promise<void>;

  /**
   * 내가 신청한 강의 ID 조회
   * 현재 API에서 직접 지원하지 않으므로 클라이언트에서 관리
   */
  getMyEnrolledLectureId(): Promise<number | null>;
}
