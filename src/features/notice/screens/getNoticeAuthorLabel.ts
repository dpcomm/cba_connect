import { NoticeAuthor } from '@domain/notice/Notice';

export function getNoticeAuthorLabel(author?: NoticeAuthor | null): string {
  if (author === 'GENERAL_AFFAIRS') return '총무팀';
  if (author === 'DEVELOPMENT') return '개발팀';
  return '전체';
}