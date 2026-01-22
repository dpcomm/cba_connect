import { Term } from "./Term";

export interface ITermRepository {
  getTerm(id: number): Promise<Term | null>;
}
