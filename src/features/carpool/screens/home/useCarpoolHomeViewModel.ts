import { GetAvailableCarpoolsUseCase } from '@application/carpool/GetAvailableCarpoolsUseCase';
import { GetParticipatingCarpoolsUseCase } from '@application/carpool/GetParticipatingCarpoolsUseCase';
import { container } from '@shared/di/container';
import { useAuthStore } from '@shared/stores/useAuthStore';
import { formatDateTimePretty } from '@shared/utils/dateFormat';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

const RETREAT_PLACE = '딱따구리 수련원';
export type DestinationTab = 'HOME' | 'RETREAT';

export type CarpoolCardStatus = 'AVAILABLE' | 'CLOSED';

function getCarpoolCardStatus(post: any): { status: CarpoolCardStatus; label: string } {
  const isClosed = (post.seatsLeft ?? 0) <= 0;
  return {
    status: isClosed ? 'CLOSED' : 'AVAILABLE',
    label: isClosed ? '마감' : '신청가능',
  };
}

function matchTab(destination?: string | null, tab?: DestinationTab): boolean {
  const isRetreat = destination === RETREAT_PLACE;
  return tab === 'RETREAT' ? isRetreat : !isRetreat;
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

  const current = Number(p?.currentCount ?? p?.currentMemberCount ?? p?.passengerCount ?? p?.appliedCount ?? 0) || 0;
  const max = Number(p?.maxCount ?? p?.capacity ?? p?.maxMemberCount ?? p?.limitCount ?? 0) || 0;
  if (max > 0) return `${p?.destination ?? '-'} | ${current} / ${max}`;

  return `${p?.destination ?? '-'}`;
}

export function useCarpoolHomeViewModel() {
  const getAvailableCarpools = container.resolve(GetAvailableCarpoolsUseCase);
  const getParticipatingCarpools = container.resolve(GetParticipatingCarpoolsUseCase);
  const router = useRouter();

  const { user } = useAuthStore();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [myCarpools, setMyCarpools] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<DestinationTab>('HOME');
  const [query, setQuery] = useState('');

  const preload = async () => {
    try {
      setLoading(true);
      setError(null);

      const rawUserId = user?.id;
      const userId = Number(rawUserId);

      if (rawUserId == null || Number.isNaN(userId)) {
        throw new Error(`userId가 올바르지 않습니다. raw=${String(rawUserId)}`);
      }

      const [allRes,myRes] = await Promise.all([
          getAvailableCarpools.execute(userId),
          getParticipatingCarpools.execute(userId),
        ]);

      console.log(allRes);
      setAllPosts(toArray(allRes));
      setMyCarpools(toArray(myRes));
    } catch (e: any) {
      const msg = e?.message || '카풀 목록 조회에 실패하였습니다.';
      setError(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  /** 상단 신청내역: 내 신청 중 isArrived=false (탭 영향 없음) */
  const carpools = useMemo(() => {
    return myCarpools
      .filter((p) => p?.isArrived === false)
      .map((p) => ({
        ...p,
        summary: p?.summary ?? buildSummary(p),
      }));
  }, [myCarpools]);

  /** 하단 전체: isArrived=false → 탭(destination) → 검색 */
  const posts = useMemo(() => {
    const base = allPosts
      .filter((p) => p?.isArrived === false)
      .filter((p) => matchTab(p?.destination, activeTab));

    const q = normalize(query);
    const filtered = !q
      ? base
      : base.filter((p) => {
        const hay = [
          p?.destination,
          p?.destinationDetailed,
          p?.origin,
          p?.originDetailed,
          // 과거 필드/서버 확장 대비로 남겨둠(있으면 검색됨)
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
      let placeText = '';
      // 장소 표시는 originDetailed 우선, 없으면 origin
      if(p?.destinationDetailed == RETREAT_PLACE) {
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
  }, [allPosts, activeTab, query]);

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
