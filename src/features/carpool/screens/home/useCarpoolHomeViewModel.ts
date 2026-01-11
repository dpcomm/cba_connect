import { GetAvailableCarpoolsUseCase } from '@application/carpool/GetAvailableCarpoolsUseCase';
import { GetParticipatingCarpoolsUseCase } from '@application/carpool/GetParticipatingCarpoolsUseCase';
import { container } from '@shared/di/container';
import { useAuthStore } from '@shared/stores/useAuthStore';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

const RETREAT_PLACE = '딱따구리 수련원';
export type DestinationTab = 'HOME' | 'RETREAT';

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
    const r = res as Record<string, unknown>;
    if (Array.isArray(r.items)) return r.items as T[];
  }
  return [];
}

function formatKoreanDateTime(iso?: string | null): string {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';

  const m = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];

  const hour = d.getHours();
  const isPM = hour >= 12;
  const hour12 = ((hour + 11) % 12) + 1;
  const ampm = isPM ? '오후' : '오전';

  return `${m}/${day}(${weekday}) ${ampm} ${hour12}시`;
}

function deriveIsClosed(p: any): boolean {
  if (typeof p?.isClosed === 'boolean') return p.isClosed;

  const current =
    Number(p?.currentCount ?? p?.currentMemberCount ?? p?.passengerCount ?? p?.appliedCount ?? 0) || 0;
  const max = Number(p?.maxCount ?? p?.capacity ?? p?.maxMemberCount ?? p?.limitCount ?? 0) || 0;

  if (max <= 0) return false;
  return current >= max;
}

function buildSummary(p: any): string {
  const time = formatKoreanDateTime(p?.departureTime);
  const pickup = p?.pickupPlace ?? p?.origin ?? p?.startPlace ?? '';
  const dest = p?.destination ?? '';
  if (pickup && dest) return `${time} | ${pickup} → ${dest}`;
  if (dest) return `${time} | ${dest}`;
  return `${time}`;
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

  const [activeTab, setActiveTab] = useState<DestinationTab>('RETREAT');
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

      const [
        // allRes, 
        myRes] = await Promise.all([
          // getAvailableCarpools.execute(userId),
          getParticipatingCarpools.execute(userId),
        ]);

      // setAllPosts(toArray(allRes));
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

  /** ✅ 상단 신청내역: 내 신청 중 isArrived=false (탭 영향 없음) */
  const carpools = useMemo(() => {
    return myCarpools
      .filter((p) => p?.isArrived === false)
      .map((p) => ({
        ...p,
        summary: p?.summary ?? buildSummary(p),
      }));
  }, [myCarpools]);

  /** ✅ 하단 전체: isArrived=false → 탭(destination) → 검색(목적지/운전자/픽업) */
  const posts = useMemo(() => {
    const base = allPosts.filter((p) => p?.isArrived === false).filter((p) => matchTab(p?.destination, activeTab));

    const q = normalize(query);
    const filtered = !q
      ? base
      : base.filter((p) => {
        const hay = [
          p?.destination,
          p?.driverName,
          p?.pickupPlace,
          p?.origin,
          p?.startPlace,
        ]
          .map(normalize)
          .join(' ');
        return hay.includes(q);
      });

    return filtered.map((p) => {
      const timeText = p?.timeText ?? formatKoreanDateTime(p?.departureTime);
      const placeText = p?.placeText ?? (p?.pickupPlace ?? p?.origin ?? p?.startPlace ?? '-');
      const routeText =
        p?.routeText ??
        `${p?.destination ?? '-'} | ${p?.currentCount ?? p?.passengerCount ?? '-'} / ${p?.maxCount ?? p?.capacity ?? '-'}`;

      return {
        ...p,
        isClosed: deriveIsClosed(p),
        timeText,
        placeText,
        routeText,
      };
    });
  }, [allPosts, activeTab, query]);

  const goDetail = (id: number) => router.push(`/carpool/detail/${id}`);
  const goRegister = () => router.push('/carpool/register');
  const goHistory = () => router.push('/carpool/history');
  const goBack = () => router.back();

  return {
    isLoading,
    error,

    activeTab,
    setActiveTab,

    query,
    setQuery,

    carpools,
    myCarpools,
    posts,

    goDetail,
    goRegister,
    goHistory,
    goBack,
  };
}
