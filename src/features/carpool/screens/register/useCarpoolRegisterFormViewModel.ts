import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

type Destination = 'HOME' | 'RETREAT';

const RETREAT_NAME = '딱따구리 수련원';
const RETREAT_ROAD_ADDRESS = '경기 양주시 광적면 현석로 313-44';

// ✅ 날짜 옵션(고정)
const DATE_OPTIONS = ['2026-01-29', '2026-01-30', '2026-01-31', '2026-02-01'];

// ✅ 시간 옵션
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

type Place = {
  roadAddress: string;
  detail?: string;
  lat?: number;
  lng?: number;
};

function toUtcISOStringFromKst(dateStr: string, hour: string, minute: string) {
  // dateStr: 'YYYY-MM-DD'
  const [y, m, d] = dateStr.split('-').map((v) => Number(v));
  const hh = Number(hour);
  const mm = Number(minute);

  // KST(UTC+9) → UTC: 9시간 빼서 Date.UTC에 넣기
  const utc = new Date(Date.UTC(y, m - 1, d, hh - 9, mm, 0, 0));
  return utc.toISOString();
}

export function useCarpoolRegisterFormViewModel() {
  const router = useRouter();
  const params = useLocalSearchParams<{ destination?: Destination }>();
  const destination: Destination = (params.destination as Destination) ?? 'RETREAT';

  const isHome = destination === 'HOME'; // HOME = 집으로 / RETREAT = 수련회장으로

  // 공통 입력 필드
  const [carInfo, setCarInfo] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [mainPickup, setMainPickup] = useState('');
  const [memo, setMemo] = useState('');

  // 날짜/시간 (SelectBox)
  const [date, setDate] = useState(DATE_OPTIONS[0]);
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  // 출발/도착
  const retreatPlace: Place = useMemo(
    () => ({
      roadAddress: `${RETREAT_NAME} (${RETREAT_ROAD_ADDRESS})`,
      lat: undefined, // 필요하면 지오코딩으로 채워도 됨
      lng: undefined,
    }),
    [],
  );

  const [origin, setOrigin] = useState<Place>(isHome ? retreatPlace : { roadAddress: '' });
  const [dest, setDest] = useState<Place>(isHome ? { roadAddress: '' } : retreatPlace);

  // destination 탭이 바뀌어도 화면은 동일하지만 조건만 변경
  // (현재는 진입할 때 destination이 고정이라 이 정도로 충분)

  const originDisabled = isHome; // HOME: 출발지 고정
  const destDisabled = !isHome;  // RETREAT: 도착지 고정

  const incCapacity = () => setCapacity((v) => Math.min(8, v + 1));
  const decCapacity = () => setCapacity((v) => Math.max(1, v - 1));

  const goBack = () => router.back();

  // 지도에 표시할 마커는 "입력 가능한 필드" 하나만
  const editableMarker = useMemo(() => {
    const editable = isHome ? dest : origin;
    if (editable.lat == null || editable.lng == null) return null;
    return { lat: editable.lat, lng: editable.lng };
  }, [isHome, origin, dest]);

  const departureTime = useMemo(() => toUtcISOStringFromKst(date, hour, minute), [date, hour, minute]);

  const submit = async () => {
    const payload = {
      driverId: 5, // TODO: 로그인 유저로 대체
      carInfo,
      departureTime,
      origin: origin.roadAddress,
      originDetailed: origin.detail ?? '',
      destination: dest.roadAddress,
      destinationDetailed: dest.detail ?? '',
      seatsTotal: capacity,
      note: memo,
      originLat: origin.lat ?? null,
      originLng: origin.lng ?? null,
      destLat: dest.lat ?? null,
      destLng: dest.lng ?? null,
    };

    // TODO: 등록 API 연결
    // console.log(payload);

    router.replace('/carpool');
  };

  return {
    destination,
    isHome,

    // 공통
    carInfo,
    setCarInfo,
    capacity,
    incCapacity,
    decCapacity,
    mainPickup,
    setMainPickup,
    memo,
    setMemo,

    // 날짜/시간
    date,
    setDate,
    hour,
    setHour,
    minute,
    setMinute,
    DATE_OPTIONS,
    HOUR_OPTIONS,
    MINUTE_OPTIONS,

    // 출발/도착
    origin,
    setOrigin,
    dest,
    setDest,
    originDisabled,
    destDisabled,
    editableMarker,

    goBack,
    submit,
  };
}
