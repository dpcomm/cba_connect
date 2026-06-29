// useCarpoolHomeViewModel.ts

import { GetAvailableCarpoolsUseCase } from '@application/carpool/GetAvailableCarpoolsUseCase';
import { GetParticipatingCarpoolsUseCase } from '@application/carpool/GetParticipatingCarpoolsUseCase';
import { GetSystemConfigUseCase } from '@application/system/GetSystemConfigUseCase';
import { container } from '@shared/di/container';
import { useAuthStore } from '@shared/stores/useAuthStore';
import { formatDateTimePretty } from '@shared/utils/dateFormat';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

const DEFAULT_RETREAT_PLACE = '서울성락교회';
export type DestinationTab = 'HOME' | 'RETREAT';
export type CarpoolCardStatus = 'AVAILABLE' | 'CLOSED';

function getCarpoolCardStatus(post: any): { status: CarpoolCardStatus; label: string } {
  const isClosed = (post.seatsLeft ?? 0) <= 0;
  return {
    status: isClosed ? 'CLOSED' : 'AVAILABLE',
    label: isClosed ? '마감' : '신청가능',
  };
}

function normalize(v: unknown): string {
  return String(v ?? '').trim().toLowerCase();
}

/** execute() 타입이 never로 굳는 경우 방어 */
function toArray<T = any>(res: unknown): T[] {
  if (Array.isArray(res)) return res as T[];

  if (res && typeof res === 'object') {
    const r = res as Record<string, any>;
    if (Array.isArray(r.items)) return r.items as T[];
    if (Array.isArray(r.data)) return r.data as T[];

    if (r.data && typeof r.data === 'object') {
      if (Array.isArray(r.data.items)) return r.data.items as T[];
      if (Array.isArray(r.data.data)) return r.data.data as T[];
    }

    if (Array.isArray(r.result)) return r.result as T[];
  }

  return [];
}

function deriveIsClosed(p: any): boolean {
  // 백에서 isClosed를 내려주면 그대로 사용
  if (typeof p?.isClosed === 'boolean') return p.isClosed;

  const seatsTotal = Number(p?.seatsTotal ?? p?.maxCount ?? p?.capacity ?? 0) || 0;
  const seatsLeft = Number(p?.seatsLeft ?? 0) || 0;

  if (seatsTotal <= 0) return false;

  // 남은 좌석이 0 이하면 마감
  return seatsLeft <= 0;
}

function buildSummary(p: any): string {
  const time = formatDateTimePretty(p?.departureTime);

  const origin = (p?.originDetailed ?? p?.origin ?? '').toString().trim();
  const dest = (p?.destinationDetailed ?? p?.destination ?? '').toString().trim();

  return `${time} | ${origin} → ${dest}`;
}

function buildRouteText(p: any): string {
  // swagger 기준
  const total = Number(p?.seatsTotal ?? 0) || 0;
  const left = Number(p?.seatsLeft ?? 0) || 0;

  if (total > 0) return `${p?.destination ?? '-'} | ${left} / ${total}`;

  const current = Number(
    p?.currentCount ??
      p?.currentMemberCount ??
      p?.passengerCount ??
      p?.appliedCount ??
      0,
  ) || 0;
  const max = Number(p?.maxCount ?? p?.capacity ?? p?.maxMemberCount ?? p?.limitCount ?? 0) || 0;
  if (max > 0) return `${p?.destination ?? '-'} | ${current} / ${max}`;

  return `${p?.destination ?? '-'}`;
}

/**
 * ✅ 핵심: "수련회장으로/집으로" 탭은 destination만 보지 말고
 *    수련회장이 origin(출발)인지 destination(도착)인지 둘 다 봐야 함.
 *
 * 규칙:
 * - 수련회장이 도착지(destination)이면 => RETREAT (수련회장으로)
 * - 수련회장이 출발지(origin)이면     => HOME   (집으로)
 */
function getDirectionTab(p: any, retreatName: string): DestinationTab | null {
  const origin = (p?.originDetailed ?? p?.origin ?? '').toString().trim();
  const dest = (p?.destinationDetailed ?? p?.destination ?? '').toString().trim();

  const originIsRetreat = origin === retreatName;
  const destIsRetreat = dest === retreatName;

  if (destIsRetreat) return 'RETREAT';
  if (originIsRetreat) return 'HOME';

  return null;
}

function matchTabByPost(p: any, tab: DestinationTab, retreatName: string): boolean {
  const dir = getDirectionTab(p, retreatName);

  if (!dir) return tab === 'HOME';

  return dir === tab;
}

export function useCarpoolHomeViewModel() {
  const getAvailableCarpools = useMemo(
    () => container.resolve(GetAvailableCarpoolsUseCase),
    [],
  );
  const getParticipatingCarpools = useMemo(
    () => container.resolve(GetParticipatingCarpoolsUseCase),
    [],
  );

  const { user } = useAuthStore();
  const userId = Number(user?.id);
  const hasUserId = user?.id != null && !Number.isNaN(userId);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [myCarpools, setMyCarpools] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<DestinationTab>('RETREAT');
  const [query, setQuery] = useState('');
  const [retreatName, setRetreatName] = useState(DEFAULT_RETREAT_PLACE);

  const preload = useCallback(
    async (uid: number) => {
      try {
        setLoading(true);
        setError(null);

        const [allRes, myRes] = await Promise.all([
          getAvailableCarpools.execute(uid),
          getParticipatingCarpools.execute(uid),
        ]);

        setAllPosts(toArray(allRes));
        setMyCarpools(toArray(myRes));
      } catch (e: any) {
        const msg = e?.message || '카풀 목록 조회에 실패하였습니다.';
        setError(msg);
        alert(msg);
      } finally {
        setLoading(false);
      }
    },
    [getAvailableCarpools, getParticipatingCarpools],
  );

  // ✅ 홈 화면이 "보일 때마다" 무조건 새로고침 및 시스템 설정 로드
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const getSystemConfigUseCase = container.resolve(GetSystemConfigUseCase);
          const config = await getSystemConfigUseCase.execute();
          if (config.currentRetreat?.location) {
            setRetreatName(config.currentRetreat.location);
          } else if (config.currentRetreat?.title) {
            setRetreatName(config.currentRetreat.title);
          }
        } catch (err) {
          console.error("Failed to load retreat config in carpool home VM:", err);
        }
        if (hasUserId) {
          preload(userId);
        }
      };
      loadData();
    }, [hasUserId, userId, preload]),
  );

  /** 상단 신청내역: 내 신청 중 isArrived=false (탭 영향 없음) */
  const carpools = useMemo(() => {
    return myCarpools
      .filter((p) => p?.isArrived === false)
      .map((p) => ({
        ...p,
        summary: p?.summary ?? buildSummary(p),
      }));
  }, [myCarpools]);

  /** 하단 전체: isArrived=false → 탭(수련회장/집) → 검색 */
  const posts = useMemo(() => {
    const base = allPosts
      .filter((p) => p?.isArrived === false)
      .filter((p) => matchTabByPost(p, activeTab, retreatName));

    const q = query.trim().toLowerCase();
    const filtered = !q
      ? base
      : base.filter((p) => {
          const hay = [
            p?.origin,
            p?.originDetailed,
            p?.destination,
            p?.destinationDetailed,
            p?.driverName,
            p?.pickupPlace,
            p?.startPlace,
          ]
            .map(normalize)
            .join(' ');
          return hay.includes(q);
        });

    return filtered.map((p) => {
      const timeText = p?.timeText ?? formatDateTimePretty(p?.departureTime);

      // 표시용 텍스트 (기존 로직 유지)
      let placeText = '';
      if ((p?.destinationDetailed ?? p?.destination) === retreatName) {
        placeText = (p?.originDetailed ?? p?.origin ?? '-');
      } else {
        placeText = (p?.destinationDetailed ?? p?.destination ?? '-');
      }

      const routeText = p?.routeText ?? buildRouteText(p);

      return {
        ...p,
        isClosed: deriveIsClosed(p),
        timeText,
        placeText,
        routeText,
      };
    });
  }, [allPosts, activeTab, query, retreatName]);

  const goDetail = (id: number) => router.push(`/carpool/${id}`);
  const goRegister = () => router.push('/carpool/register');
  const goHistory = () => router.push('/carpool/history');

  return {
    isLoading,
    error,

    activeTab,
    setActiveTab,

    getCarpoolCardStatus,

    query,
    setQuery,

    carpools,
    myCarpools,
    posts,

    goDetail,
    goRegister,
    goHistory,
  };
}
