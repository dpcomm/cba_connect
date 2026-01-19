import { Notice, NoticeAuthor } from "./Notice";

export interface NoticeIRepository {
  getNotices(author?: NoticeAuthor): Promise<Notice[]>;
  getNotice(id: number): Promise<Notice>;
}
