import { CreateCarpoolUseCase } from "@application/carpool";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { container } from "tsyringe";
import { ModalState } from "../detail/useCarpoolDetailViewModel";

type Destination = "HOME" | "RETREAT";

const RETREAT_NAME = "양평 십자수 기도원";
const RETREAT_ROAD_ADDRESS = "경기 양평군 서종면 중미산로 938";
const RETREAT_LAT = 37.5939493541455;
const RETREAT_LNG = 127.438637548918;

type DateOption = { label: string; value: string };

const DAY_LABEL_KR: Record<number, string> = {
  0: "주일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
};

function formatDateWithDay(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dayLabel = DAY_LABEL_KR[date.getDay()];
  return `${y}-${m}-${d}(${dayLabel})`;
}

function buildDateOptions(dates: string[]): DateOption[] {
  return dates.map((value) => {
    const [y, m, day] = value.split("-").map(Number);
    const date = new Date(y, m - 1, day);
    return { value, label: formatDateWithDay(date) };
  });
}

// 기준 날짜만 관리 (value는 YYYY-MM-DD 유지)
const BASE_DATES = ["2026-01-29", "2026-01-30", "2026-01-31", "2026-02-01"];

// ✅ 화면 라벨은 요일 붙인 버전, 내부 값은 YYYY-MM-DD
const DATE_OPTIONS = buildDateOptions(BASE_DATES);

// ✅ 시간 옵션
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, "0"),
);

type Place = {
  roadAddress: string;
  detail?: string;
  lat?: number;
  lng?: number;
};

const RETREAT_PLACE: Place = {
  roadAddress: RETREAT_ROAD_ADDRESS, // ✅ 저장/표시/좌표용 실제 주소
  detail: RETREAT_NAME, // ✅ 화면에서 이름이 필요하면 사용
  lat: RETREAT_LAT,
  lng: RETREAT_LNG,
};

const EMPTY_PLACE: Place = { roadAddress: "" };

function toUtcISOStringFromKst(dateStr: string, hour: string, minute: string) {
  // dateStr: 'YYYY-MM-DD'
  const [y, m, d] = dateStr.split("-").map((v) => Number(v));
  const hh = Number(hour);
  const mm = Number(minute);

  // KST(UTC+9) → UTC: 9시간 빼서 Date.UTC에 넣기
  const utc = new Date(Date.UTC(y, m - 1, d, hh - 9, mm, 0, 0));
  return utc.toISOString();
}

export function useCarpoolRegisterFormViewModel() {

  // Generic Modal State
  const [modalState, setModalState] = useState<ModalState>({
    visible: false,
    title: "",
    message: "",
  });

  const showModal = (
    title: string,
    message: string,
    onConfirm?: () => void,
    confirmText = "확인",
    cancelText?: string,
    onCancel?: () => void,
  ) => {
    setModalState({
      visible: true,
      title,
      message,
      onConfirm,
      confirmText,
      cancelText,
      onCancel,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
  };

  const createUseCase = container.resolve(CreateCarpoolUseCase);
  const router = useRouter();
  const authStore = useAuthStore();
  const { user, setError, setLoading } = authStore;

  const STORAGE_KEYS = {
    carInfo: "carpool.carInfo",
  };

  // 로그인 유저 기반 기본값 + carInfo 로드
  useEffect(() => {
    if (!user) return;

    // driverId는 payload에서 user.id를 그대로 쓰니 state로 굳이 안 들고 있어도 됨
    setDriverName(user.name ?? "");
    setPhone(user.phone ?? "");

    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEYS.carInfo);
        if (saved && saved.trim().length > 0) setCarInfo(saved);
      } catch { }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.user]);

  const params = useLocalSearchParams<{ destination?: Destination }>();
  const destination: Destination =
    (params.destination as Destination) ?? "RETREAT";

  const isHome = destination === "HOME"; // HOME = 집으로 / RETREAT = 수련회장으로

  // 공통 입력 필드
  const [driverName, setDriverName] = useState("");
  const [carInfo, setCarInfo] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [phone, setPhone] = useState("");
  const [mainPickup, setMainPickup] = useState("");
  const [memo, setMemo] = useState("");

  // 날짜/시간 (SelectBox)
  const [date, setDate] = useState(DATE_OPTIONS[0].value);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");

  // 출발/도착
  const [origin, setOrigin] = useState<Place>(EMPTY_PLACE);
  const [dest, setDest] = useState<Place>(EMPTY_PLACE);

  // ✅ destination에 따라 “수련원 고정 위치”를 origin 또는 dest에 주입
  useEffect(() => {
    if (isHome) {
      // HOME: 출발지 고정(수련원) / 도착지 입력
      setOrigin(RETREAT_PLACE);
      setDest((prev) => (prev.roadAddress ? prev : EMPTY_PLACE));
    } else {
      // RETREAT: 도착지 고정(수련원) / 출발지 입력
      setDest(RETREAT_PLACE);
      setOrigin((prev) => (prev.roadAddress ? prev : EMPTY_PLACE));
    }
  }, [isHome]);

  const originDisabled = isHome; // HOME: 출발지 고정
  const destDisabled = !isHome; // RETREAT: 도착지 고정

  const incCapacity = () => setCapacity((v) => Math.min(8, v + 1));
  const decCapacity = () => setCapacity((v) => Math.max(1, v - 1));

  // 지도에 표시할 마커는 "입력 가능한 필드" 하나만
  const editableMarker = useMemo(() => {
    const editable = isHome ? dest : origin;
    if (editable.lat == null || editable.lng == null) return null;
    return { lat: editable.lat, lng: editable.lng };
  }, [isHome, origin, dest]);

  // (참고) 기존 함수 유지
  const departureTime = useMemo(
    () => toUtcISOStringFromKst(date, hour, minute),
    [date, hour, minute],
  );
  const buildDepartureTimeISO = (d: string, h: string, m: string) => {
    const dt = new Date(`${d}T${h}:${m}:00`);
    return dt.toISOString();
  };

  const submit = async () => {
    // ✅ 로그인 유저 필수
    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    // ✅ 필수값: note(메모) 제외 전부
    if (!driverName?.trim()) return alert("운전자명을 입력해 주세요.");
    if (!carInfo?.trim()) return alert("내 차 정보를 입력해 주세요.");
    if (!phone?.trim()) return alert("연락처를 입력해 주세요.");

    if (!date) return alert("날짜를 선택해 주세요.");
    if (!hour) return alert("시를 선택해 주세요.");
    if (!minute) return alert("분을 선택해 주세요.");

    // 출발/도착 주소
    if (!origin?.roadAddress?.trim()) return alert("출발지를 입력해 주세요.");
    if (!dest?.roadAddress?.trim()) return alert("도착지를 입력해 주세요.");

    // 좌표 (수련원 쪽은 RETREAT_PLACE에 이미 들어있어서 통과)
    if (origin.lat == null || origin.lng == null)
      return alert("출발지 좌표가 없습니다. 다시 선택해 주세요.");
    if (dest.lat == null || dest.lng == null)
      return alert("도착지 좌표가 없습니다. 다시 선택해 주세요.");

    // 상세(현재 UI에서 "주요 위치"만 있으므로 originDetailed에 매핑)
    if (!mainPickup?.trim()) return alert("주요 위치를 입력해 주세요.");

    // 메모
    if (!memo?.trim()) return alert("메모를 입력해 주세요.");

    // 인원
    if (!capacity || capacity < 1)
      return alert("수용 가능한 인원을 1명 이상으로 설정해 주세요.");

    const departureTimeISO = buildDepartureTimeISO(date, hour, minute);

    const originDetailed = isHome
      ? (origin.detail ?? RETREAT_NAME)
      : mainPickup.trim();
    const destinationDetailed = isHome
      ? mainPickup.trim()
      : (dest.detail ?? RETREAT_NAME);

    const payload = {
      driverId: user.id,
      carInfo: carInfo.trim(),
      departureTime: departureTimeISO,

      origin: origin.roadAddress.trim(),
      originDetailed: originDetailed,

      destination: dest.roadAddress.trim(),
      destinationDetailed: destinationDetailed,

      seatsTotal: capacity,

      note: memo?.trim() ? memo.trim() : "",

      originLat: Number(origin.lat!.toFixed(6)),
      originLng: Number(origin.lng!.toFixed(6)),
      destLat: Number(dest.lat!.toFixed(6)),
      destLng: Number(dest.lng!.toFixed(6)),
    };

    console.log(payload);

    try {
      setLoading?.(true);
      const created = await createUseCase.execute(payload);
      await AsyncStorage.setItem(STORAGE_KEYS.carInfo, carInfo.trim());
      showModal("완료", "카풀 신청이 완료되었습니다.", () => {
        router.push(`/carpool/${created.id}`)
      });
    } catch (e) {
      showModal(
        "오류",
        e instanceof Error ? e.message : "카풀 등록에 실패했습니다.",
      );
    }
  };

  return {
    destination,
    isHome,

    // 공통
    driverName,
    setDriverName,
    carInfo,
    setCarInfo,
    capacity,
    incCapacity,
    decCapacity,
    phone,
    setPhone,
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

    submit,
    modalState,
    closeModal,
    
    // 필요하면 노출(디버깅용)
    departureTime,
  };
}
