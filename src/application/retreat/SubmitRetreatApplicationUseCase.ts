import { IUserRepository } from "@domain/user/IUserRepository";
import {
  RetreatRepository,
  UpsertApplicationTransport,
} from "@infrastructure/retreat/RetreatRepository";
import { inject, injectable } from "tsyringe";

export interface SubmitRetreatApplicationInput {
  retreatId: number;
  surveyId: number;
  group: string;
  retreatMealIds: number[];
  transports: UpsertApplicationTransport[];
}

@injectable()
export class SubmitRetreatApplicationUseCase {
  constructor(
    @inject("RetreatRepository") private retreatRepository: RetreatRepository,
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(input: SubmitRetreatApplicationInput): Promise<void> {
    // 선택한 소속 중그룹을 사용자 프로필에도 반영
    await this.userRepository.updateProfile({ group: input.group });

    // 신청 정보 제출 (group/surveyId는 서버 필수 필드)
    await this.retreatRepository.upsertApplication(input.retreatId, {
      group: input.group,
      surveyId: input.surveyId,
      retreatMealIds: input.retreatMealIds,
      transports: input.transports,
      answers: [],
    });
  }
}
