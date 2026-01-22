import { ILectureRepository } from "@domain/lecture/ILectureRepository";
import { Lecture } from "@domain/lecture/Lecture";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetLectureUseCase {
  constructor(
    @inject("LectureRepository") private lectureRepository: ILectureRepository,
  ) {}

  async execute(id: number): Promise<Lecture | null> {
    return this.lectureRepository.getLecture(id);
  }
}
