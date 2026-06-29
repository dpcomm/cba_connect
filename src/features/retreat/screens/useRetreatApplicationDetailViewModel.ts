import { CancelApplicationUseCase } from "@application/retreat/CancelApplicationUseCase";
import { GetApplicationOptionsUseCase } from "@application/retreat/GetApplicationOptionsUseCase";
import { GetMyApplicationDetailUseCase } from "@application/retreat/GetMyApplicationDetailUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { GetMeUseCase } from "@application/user/GetMeUseCase";
import { ApplicationDetail } from "@domain/retreat/ApplicationDetail";
import { ApplicationOptions, TransportType } from "@domain/retreat/ApplicationOption";
import { container } from "@shared/di/container";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { buildMealRows, MealRow } from "./useRetreatApplicationFormViewModel";

const TRANSPORT_TYPE_LABEL: Record<TransportType, string> = {
  OWN_CAR: "자차",
  CARPOOL: "카풀",
  BUS: "버스",
  PUBLIC: "대중교통",
  OTHER: "기타",
};

export const APPLICATION_STATUS_LABEL: Record<
  ApplicationDetail["status"],
  string
> = {
  SUBMITTED: "신청 완료",
  CANCELED: "신청 취소됨",
  CHECKED_IN: "체크인 완료",
};

export function useRetreatApplicationDetailViewModel() {
  const router = useRouter();

  const [detail, setDetail] = useState<ApplicationDetail | null>(null);
  const [options, setOptions] = useState<ApplicationOptions | null>(null);
  const [group, setGroup] = useState<string>("");
  const [retreatId, setRetreatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const getSystemConfig = container.resolve(GetSystemConfigUseCase);
      const getDetail = container.resolve(GetMyApplicationDetailUseCase);
      const getOptions = container.resolve(GetApplicationOptionsUseCase);
      const getMe = container.resolve(GetMeUseCase);

      const config = await getSystemConfig.execute();
      setRetreatId(config.currentRetreatId);

      const [detailResult, me] = await Promise.all([
        getDetail.execute(config.currentRetreatId),
        getMe.execute(),
      ]);
      setDetail(detailResult);
      setGroup(me.group ?? "");

      // 식사 그리드/교통 이름 표시에 필요한 옵션 (실패해도 상세 조회는 유지)
      try {
        const opts = await getOptions.execute(config.currentRetreatId);
        setOptions(opts);
      } catch (optErr) {
        console.warn("Failed to load options for detail:", optErr);
        setOptions(null);
      }
    } catch (e) {
      console.error("Failed to load application detail:", e);
      setError("신청 내역을 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 식사 그리드 (선택된 식사 하이라이트) — 신청서 화면과 동일한 구조
  const selectedMealIds = new Set((detail?.meals ?? []).map((m) => m.id));
  const mealRows: MealRow[] = options
    ? buildMealRows(options.meals, selectedMealIds)
    : [];

  const departureTransport = detail?.transports.find(
    (t) => t.direction === "DEPARTURE",
  );
  const returnTransport = detail?.transports.find(
    (t) => t.direction === "RETURN",
  );

  const transportName = (transportId: number, type: TransportType): string => {
    const all = options
      ? [...options.transports.departure, ...options.transports.return]
      : [];
    return all.find((o) => o.id === transportId)?.name ?? TRANSPORT_TYPE_LABEL[type];
  };

  const departureName = departureTransport
    ? transportName(departureTransport.transportId, departureTransport.transportType)
    : "";
  const returnName = returnTransport
    ? transportName(returnTransport.transportId, returnTransport.transportType)
    : "";
  const vehicleNumber =
    departureTransport?.vehicleNumber ?? returnTransport?.vehicleNumber ?? "";

  const handleEdit = () => {
    router.push("/retreat/application?mode=edit" as any);
  };

  const requestCancel = () => setConfirmCancelVisible(true);
  const dismissCancel = () => setConfirmCancelVisible(false);

  const confirmCancel = async () => {
    if (retreatId == null || canceling) return;
    try {
      setCanceling(true);
      const cancelUseCase = container.resolve(CancelApplicationUseCase);
      await cancelUseCase.execute(retreatId);
      setConfirmCancelVisible(false);
      Alert.alert("취소 완료", "수련회 신청이 취소되었습니다.");
      await load();
    } catch (e) {
      console.error("Failed to cancel application:", e);
      setConfirmCancelVisible(false);
      Alert.alert("취소 실패", "신청 취소 중 문제가 발생했어요. 다시 시도해주세요.");
    } finally {
      setCanceling(false);
    }
  };

  const handleBack = () => router.back();
  const goToApply = () => router.push("/retreat/application" as any);

  return {
    detail,
    group,
    mealRows,
    departureName,
    returnName,
    vehicleNumber,
    loading,
    error,
    canceling,
    confirmCancelVisible,
    load,
    handleEdit,
    requestCancel,
    dismissCancel,
    confirmCancel,
    handleBack,
    goToApply,
  };
}
