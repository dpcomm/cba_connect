import { GetNoticeUseCase } from '@application/notice/GetNoticeUseCase';
import { GetNoticesUseCase } from '@application/notice/GetNoticesUseCase';
import { Notice, NoticeAuthor } from '@domain/notice/Notice';
import { container } from '@shared/di/container';
import { useEffect, useMemo, useState } from 'react';

export type NoticeTab = 'ALL' | NoticeAuthor;

function tabToAuthor(tab: NoticeTab): NoticeAuthor | undefined {
  return tab === 'ALL' ? undefined : tab;
}

function formatDateDot(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function useNoticeListViewModel() {
  const getNoticesUseCase = container.resolve(GetNoticesUseCase);
  const getNoticeUseCase = container.resolve(GetNoticeUseCase);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<NoticeTab>('ALL');
  const [notices, setNotices] = useState<Notice[]>([]);

  const [isDetailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Notice | null>(null);

  const author = useMemo(() => tabToAuthor(activeTab), [activeTab]);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const list = await getNoticesUseCase.execute(author);

      // 최신순 정렬
      list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

      setNotices(list);
    } catch (e: any) {
      const msg = e?.message ?? '공지 목록을 불러오지 못했어요.';
      setError(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const openDetail = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      const detail = await getNoticeUseCase.execute(id);
      setSelected({
        ...detail,
        createdAt: detail.createdAt,
      });

      setDetailOpen(true);
    } catch (e: any) {
      const msg = e?.message ?? '공지 상세를 불러오지 못했어요.';
      setError(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelected(null);
  };

  return {
    // status
    isLoading,
    error,

    // tabs
    activeTab,
    setActiveTab,

    // data
    notices,

    // helpers
    formatDateDot,

    // modal
    isDetailOpen,
    selected,

    // actions
    reload: load,
    openDetail,
    closeDetail,
  };
}
