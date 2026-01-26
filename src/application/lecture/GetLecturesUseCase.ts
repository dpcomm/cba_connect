import { ILectureRepository } from "@domain/lecture/ILectureRepository";
import { Lecture } from "@domain/lecture/Lecture";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetLecturesUseCase {
  constructor(
    @inject("LectureRepository") private lectureRepository: ILectureRepository,
  ) {}

  /**
   * termId를 받아 해당 학기의 강의 목록 조회
   */
  async execute(termId: number): Promise<Lecture[]> {
    return this.lectureRepository.getLecturesByTerm(termId);
  }
}
