import { SystemConfig } from "@domain/system/SystemConfig";
import { StatusRepository } from "@infrastructure/status/StatusRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetSystemConfigUseCase {
  constructor(
    @inject("StatusRepository") private statusRepository: StatusRepository,
  ) {}

  async execute(): Promise<SystemConfig> {
    return this.statusRepository.getSystemConfig();
  }
}
