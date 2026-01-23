import { GetCarpoolDetailUseCase } from "@application/carpool/GetCarpoolDetailUseCase";
import { UpdateCarpoolUseCase } from "@application/carpool/UpdateCarpoolUseCase";
import { UpdateCarpoolData } from "@domain/carpool/ICarpoolRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { container } from "tsyringe";

const RETREAT_NAME = "양평 십자수 기도원";

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
  return `${y}.${m}.${d}(${dayLabel})`;
}

function buildDateOptions(dates: string[]): DateOption[] {
  return dates.map((value) => {
    const [y, m, d] = value.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return { value, label: formatDateWithDay(date) };
  });
}

const BASE_DATES = ["2026-01-29", "2026-01-30", "2026-01-31", "2026-02-01"];
const DATE_OPTIONS = buildDateOptions(BASE_DATES);

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

const EMPTY_PLACE: Place = { roadAddress: "" };

export interface ModalState {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function useCarpoolEditScreenViewModel() {
  const getDetailUseCase = container.resolve(GetCarpoolDetailUseCase);
  const updateUseCase = container.resolve(UpdateCarpoolUseCase);

  const router = useRouter();
  const { user, setError, setLoading } = useAuthStore();

  const params = useLocalSearchParams();
  const raw = (params as any).carpoolId;
  const carpoolId = Number(Array.isArray(raw) ? raw[0] : raw);

  const STORAGE_KEYS = { carInfo: "carpool.carInfo" };

  const [driverId, setDriverId] = useState<number>();
  const [driverName, setDriverName] = useState("");
  const [phone, setPhone] = useState("");

  const [carInfo, setCarInfo] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [memo, setMemo] = useState("");
  const [mainPickup, setMainPickup] = useState("");

  const [membersCount, setMembersCount] = useState(0);

  const [originDisabled, setOriginDisabled] = useState(false);
  const [destDisabled, setDestDisabled] = useState(false);

  const isHome = originDisabled;

  const [date, setDate] = useState(DATE_OPTIONS[0].value);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");

  const [origin, setOrigin] = useState<Place>(EMPTY_PLACE);
  const [dest, setDest] = useState<Place>(EMPTY_PLACE);

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

  useEffect(() => {
    if (!Number.isFinite(carpoolId)) return;

    (async () => {
      try {
        setLoading?.(true);

        const detail = await getDetailUseCase.execute(carpoolId);

        setDriverId(detail.driverId);
        setDriverName(detail.driver?.name ?? "");
        setPhone(detail.driver?.phone ?? "");

        setCarInfo(detail.carInfo ?? "");
        setCapacity(detail.seatsTotal ?? 1);
        setMemo(detail.note ?? "");

        const originIsRetreat = detail.originDetailed === RETREAT_NAME;
        const destIsRetreat = detail.destinationDetailed === RETREAT_NAME;

        setOriginDisabled(originIsRetreat);
        setDestDisabled(destIsRetreat);

        setOrigin({
          roadAddress: detail.origin ?? "",
          detail: detail.originDetailed ?? "",
          lat: detail.originLat ?? undefined,
          lng: detail.originLng ?? undefined,
        });

        setDest({
          roadAddress: detail.destination ?? "",
          detail: detail.destinationDetailed ?? "",
          lat: detail.destLat ?? undefined,
          lng: detail.destLng ?? undefined,
        });

        const pickup = originIsRetreat
          ? (detail.destinationDetailed ?? "")
          : (detail.originDetailed ?? "");
        setMainPickup(pickup);

        if (detail.departureTime) {
          const d = new Date(detail.departureTime);
          if (!Number.isNaN(d.getTime())) {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");

            setDate(`${y}-${m}-${day}`);
            setHour(hh);
            setMinute(mm);
          }
        }

        setMembersCount(detail.members?.length ?? 0);
      } catch {
        const msg = "카풀 정보를 불러오지 못했습니다.";
        setError?.(msg);
        showModal("오류", msg);
      } finally {
        setLoading?.(false);
      }
    })();
  }, [carpoolId]);

  const editableMarker = useMemo(() => {
    const target = isHome ? dest : origin;
    if (target.lat == null || target.lng == null) return null;
    return { lat: target.lat, lng: target.lng };
  }, [isHome, origin, dest]);

  const incCapacity = () => setCapacity((v) => Math.min(8, v + 1));
  const decCapacity = () => setCapacity((v) => Math.max(1, v - 1));

  const submit = async () => {
    const errorMsg = validate();
    if (errorMsg) return showModal("알림", errorMsg);

    const departureTimeISO = new Date(
      `${date}T${hour}:${minute}:00`,
    ).toISOString();

    const seatsLeft = Math.max(0, capacity - membersCount);

    const payload: UpdateCarpoolData = {
      driverId,
      carInfo: carInfo.trim(),
      departureTime: departureTimeISO,
      seatsTotal: capacity,
      seatsLeft,
      note: memo.trim(),
      isArrived: false,
    };

    if (isHome) {
      payload.destination = dest.roadAddress.trim();
      payload.destinationDetailed = mainPickup.trim();
      payload.destLat = dest.lat;
      payload.destLng = dest.lng;
    } else {
      payload.origin = origin.roadAddress.trim();
      payload.originDetailed = mainPickup.trim();
      payload.originLat = origin.lat;
      payload.originLng = origin.lng;
    }

    try {
      setLoading?.(true);
      await updateUseCase.execute(carpoolId, payload);
      await AsyncStorage.setItem(STORAGE_KEYS.carInfo, carInfo.trim());
      showModal("완료", "수정이 완료되었습니다.", () => {
        router.replace(`/carpool/${carpoolId}`);
      });
    } catch {
      const msg = "수정에 실패하였습니다.";
      setError?.(msg);
      showModal("오류", msg);
    } finally {
      setLoading?.(false);
    }
  };

  const validate = (): string | null => {
    if (driverId !== user?.id) return "로그인 정보가 일치하지 않습니다.";
    if (!Number.isFinite(carpoolId)) return "잘못된 접근입니다.";

    const carInfoTrim = carInfo.trim();
    if (!carInfoTrim) return "차량 정보를 입력해주세요.";

    if (capacity < membersCount) {
      return "수정 후 탑승 인원이 현재 신청 인원보다 적습니다.\n수정하시려면 삭제 후 다시 등록해주세요.";
    }

    // 장소 필수
    const road = isHome ? dest.roadAddress?.trim() : origin.roadAddress?.trim();
    if (!road)
      return isHome ? "도착지를 선택해주세요." : "출발지를 선택해주세요.";

    const pickupTrim = mainPickup.trim();
    if (!pickupTrim) return "탑승 장소(상세)를 입력해주세요.";

    // 좌표는 있으면 숫자여야 함(없어도 저장 가능하게 할지 여부는 너 정책에 맞춰)
    const lat = isHome ? dest.lat : origin.lat;
    const lng = isHome ? dest.lng : origin.lng;
    if (lat != null && !Number.isFinite(lat))
      return "좌표(lat)가 올바르지 않습니다.";
    if (lng != null && !Number.isFinite(lng))
      return "좌표(lng)가 올바르지 않습니다.";

    return null;
  };

  return {
    isHome,

    driverName,
    carInfo,
    setCarInfo,

    capacity,
    incCapacity,
    decCapacity,

    phone,
    mainPickup,
    setMainPickup,

    memo,
    setMemo,

    date,
    setDate,
    hour,
    setHour,
    minute,
    setMinute,

    DATE_OPTIONS,
    HOUR_OPTIONS,
    MINUTE_OPTIONS,

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
  };
}
