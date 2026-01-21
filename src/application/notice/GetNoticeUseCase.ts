import { NoticeIRepository } from '@domain/notice/INoticeRepository';
import { Notice } from '@domain/notice/Notice';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetNoticeUseCase {
  constructor(
    @inject('NoticeRepository')
    private readonly noticeRepository: NoticeIRepository
  ) {}

  async execute(id: number): Promise<Notice> {
    return this.noticeRepository.getNotice(id);
  }
}
