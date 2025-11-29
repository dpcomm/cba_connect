import { PrayTalk } from './PrayTalk';

export interface CommunityRepository {
  getPrayTalks(page: number): Promise<PrayTalk[]>;
  createPrayTalk(content: string, isAnonymous: boolean): Promise<PrayTalk>;
}
