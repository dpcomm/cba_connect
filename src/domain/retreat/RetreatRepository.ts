import { Retreat } from './Retreat';

export interface RetreatRepository {
  getUpcomingRetreat(): Promise<Retreat | null>;
  register(retreatId: string, options: any): Promise<void>;
}
