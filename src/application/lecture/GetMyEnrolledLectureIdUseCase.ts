import { ILectureRepository } from "@domain/lecture/ILectureRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMyEnrolledLectureIdUseCase {
  constructor(
    @inject("LectureRepository") private lectureRepository: ILectureRepository,
  ) {}

  async execute(): Promise<number | null> {
    return this.lectureRepository.getMyEnrolledLectureId();
  }
}
