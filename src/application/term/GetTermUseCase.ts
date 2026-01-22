import { ITermRepository } from "@domain/term/ITermRepository";
import { Term } from "@domain/term/Term";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetTermUseCase {
  constructor(
    @inject("TermRepository") private termRepository: ITermRepository,
  ) {}

  async execute(id: number): Promise<Term | null> {
    return this.termRepository.getTerm(id);
  }
}
