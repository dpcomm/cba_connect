import { NoticeIRepository } from '@domain/notice/INoticeRepository';
import { Notice, NoticeAuthor } from '@domain/notice/Notice';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetNoticesUseCase {
  constructor(
    @inject('NoticeRepository')
    private readonly noticeRepository: NoticeIRepository
  ) {}

  async execute(author?: NoticeAuthor): Promise<Notice[]> {
    return this.noticeRepository.getNotices(author);
  }
}
