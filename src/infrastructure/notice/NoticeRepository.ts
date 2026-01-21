import { NoticeIRepository } from '@domain/notice/INoticeRepository';
import { Notice, NoticeAuthor } from '@domain/notice/Notice';
import { API_PREFIX, apiClient } from '@shared/api/client';
import { ApiResponse } from '@shared/api/types';

export class NoticeRepository implements NoticeIRepository {
  async getNotices(author?: NoticeAuthor): Promise<Notice[]> {
    const res = await apiClient.get<ApiResponse<Notice[]>>(`${API_PREFIX}/notice`, {
      params: author ? { author } : undefined,
    });

    return res.data.data ?? [];
  }

  async getNotice(id: number): Promise<Notice> {
    const res = await apiClient.get<ApiResponse<Notice>>(`${API_PREFIX}/notice/${id}`);
    return res.data.data;
  }
}
