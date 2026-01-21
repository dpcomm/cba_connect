export type NoticeAuthor = 'GENERAL_AFFAIRS' | 'DEVELOPMENT';

export type Notice = {
  id: number;
  author: NoticeAuthor;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};
