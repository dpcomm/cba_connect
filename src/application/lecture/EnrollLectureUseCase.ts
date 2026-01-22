import { ILectureRepository } from "@domain/lecture/ILectureRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnrollLectureUseCase {
  constructor(
    @inject("LectureRepository") private lectureRepository: ILectureRepository,
  ) {}

  async execute(lectureId: number): Promise<void> {
    await this.lectureRepository.enrollLecture(lectureId);
  }
}
