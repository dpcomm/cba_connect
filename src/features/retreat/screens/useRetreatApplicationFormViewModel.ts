import { GetApplicationOptionsUseCase } from "@application/retreat/GetApplicationOptionsUseCase";
import { GetApplicationSurveyIdUseCase } from "@application/retreat/GetApplicationSurveyIdUseCase";
import { GetMyApplicationDetailUseCase } from "@application/retreat/GetMyApplicationDetailUseCase";
import { SubmitRetreatApplicationUseCase } from "@application/retreat/SubmitRetreatApplicationUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { GetMeUseCase } from "@application/user/GetMeUseCase";
import {
  ApplicationOptionMeal,
  ApplicationOptionTransport,
  ApplicationOptions,
  MealType,
} from "@domain/retreat/ApplicationOption";
import type { UpsertApplicationTransport } from "@infrastructure/retreat/RetreatRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { container } from "@shared/di/container";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ApiErrorResponse } from "@shared/api/types";
import { isAxiosError } from "axios";
import { Alert } from "react-native";

// 마이페이지 "내 차 정보" 저장 키 (CarInfoModal과 동일). "차종/색상/차번호" 형식 문자열.
const CAR_INFO_STORAGE_KEY = "carpool.carInfo";

export const MEAL_TYPE_ORDER: MealType[] = ["BREAKFAST", "LUNCH", "DINNER"];

export const MEAL_TYPE_LABEL: Record<MealType, string> = {
  BREAKFAST: "아침",
  LUNCH: "점심",
  DINNER: "저녁",
};

export type MealCell =
  | { kind: "available"; id: number; mealType: MealType; selected: boolean }
  | { kind: "unavailable"; mealType: MealType };

export interface MealRow {
  mealDay: string;
  label: string;
  cells: MealCell[];
}

function formatMealDayLabel(mealDay: string): string {
  const [, m, d] = mealDay.split("-");
  return `${Number(m)}/${Number(d)}`;
}

export function buildMealRows(
  meals: ApplicationOptionMeal[],
  selectedIds: Set<number>,
): MealRow[] {
  const byDay = new Map<string, Map<MealType, ApplicationOptionMeal>>();
  meals.forEach((meal) => {
    if (!byDay.has(meal.mealDay)) {
      byDay.set(meal.mealDay, new Map());
    }
    byDay.get(meal.mealDay)!.set(meal.mealType, meal);
  });

  // 수련회 날짜 = 식사 데이터에 존재하는 날짜들 (mealDay). 신청 기간(retreat.startAt/endAt)과 무관.
  const sortedDays = Array.from(byDay.keys()).sort();

  return sortedDays.map((mealDay) => {
    const dayMap = byDay.get(mealDay)!;
    const cells: MealCell[] = MEAL_TYPE_ORDER.map((mealType) => {
      const meal = dayMap.get(mealType);
      // 해당 날짜의 식사 옵션에 없는 끼니 → 글자 없는 disabled 셀
      if (!meal) {
        return { kind: "unavailable", mealType };
      }
      return {
        kind: "available",
        id: meal.id,
        mealType,
        selected: selectedIds.has(meal.id),
      };
    });

    return {
      mealDay,
      label: formatMealDayLabel(mealDay),
      cells,
    };
  });
}

export function useRetreatApplicationFormViewModel() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isEditMode = mode === "edit";
  const [options, setOptions] = useState<ApplicationOptions | null>(null);
  const [surveyId, setSurveyId] = useState<number | null>(null);
  const [retreatId, setRetreatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // 취소된 기존 신청이 있을 때 "불러오시겠습니까?" 알림
  const [showLoadExistingModal, setShowLoadExistingModal] = useState(false);

  const [selectedGroupValue, setSelectedGroupValue] = useState<string | null>(
    null,
  );
  const [selectedMealIds, setSelectedMealIds] = useState<Set<number>>(
    () => new Set(),
  );
  const [departureTransportId, setDepartureTransportId] = useState<
    number | null
  >(null);
  const [returnTransportId, setReturnTransportId] = useState<number | null>(
    null,
  );
  // 가는 길·오는 길 공용 차량번호 (보통 같은 차)
  const [vehicleNumber, setVehicleNumber] = useState("");

  // 마이페이지에 저장된 내 차량번호 (자동 입력용)
  const [savedVehicleNumber, setSavedVehicleNumber] = useState("");

  useEffect(() => {
    loadOptions();
  }, []);

  // 내 차 정보 로드
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CAR_INFO_STORAGE_KEY);
        if (raw?.trim()) {
          // 차 정보 전체 문자열(차종/색상/차번호)을 그대로 차량번호 칸에 사용
          setSavedVehicleNumber(raw.trim());
        }
      } catch (e) {
        console.warn("Failed to load saved car info:", e);
      }
    })();
  }, []);

  const loadOptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const getSystemConfig = container.resolve(GetSystemConfigUseCase);
      const getOptions = container.resolve(GetApplicationOptionsUseCase);
      const getSurveyId = container.resolve(GetApplicationSurveyIdUseCase);
      const config = await getSystemConfig.execute();
      setRetreatId(config.currentRetreatId);
      const result = await getOptions.execute(config.currentRetreatId);
      setOptions(result);

      // surveyId는 제출에 필요하지만, 폼 UI 자체는 옵션만으로 충분하므로 실패해도 로딩은 막지 않음
      try {
        const sid = await getSurveyId.execute(config.currentRetreatId);
        setSurveyId(sid);
      } catch (surveyErr) {
        console.warn("Failed to load surveyId:", surveyErr);
      }

      if (isEditMode) {
        // 수정 모드: 기존 신청 내역으로 즉시 prefill
        await prefillFromExisting(config.currentRetreatId);
      } else {
        // 일반 진입: 취소된 기존 신청이 있으면 불러오기 여부를 묻는다
        try {
          const getDetail = container.resolve(GetMyApplicationDetailUseCase);
          const detail = await getDetail.execute(config.currentRetreatId);
          if (detail && detail.status === "CANCELED") {
            setShowLoadExistingModal(true);
          }
        } catch (checkErr) {
          console.warn("Failed to check existing application:", checkErr);
        }
      }
    } catch (e) {
      console.error("Failed to load retreat application options:", e);
      if (
        isAxiosError<ApiErrorResponse>(e) &&
        e.response?.data?.message === "Application period is closed"
      ) {
        setError("수련회 신청 기간이 아닙니다.");
      } else {
        setError("수련회 신청 정보를 불러오지 못했어요.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 기존 신청 내역으로 폼 채우기 (수정 모드 / 불러오기)
  const prefillFromExisting = async (retreatId: number) => {
    try {
      const getDetail = container.resolve(GetMyApplicationDetailUseCase);
      const getMe = container.resolve(GetMeUseCase);
      const [detail, me] = await Promise.all([
        getDetail.execute(retreatId),
        getMe.execute(),
      ]);
      if (!detail) return;

      setSelectedGroupValue(me.group || null);
      setSelectedMealIds(new Set(detail.meals.map((m) => m.id)));

      const dep = detail.transports.find((t) => t.direction === "DEPARTURE");
      const ret = detail.transports.find((t) => t.direction === "RETURN");
      if (dep) setDepartureTransportId(dep.transportId);
      if (ret) setReturnTransportId(ret.transportId);

      const vehicle = dep?.vehicleNumber ?? ret?.vehicleNumber ?? "";
      if (vehicle) setVehicleNumber(vehicle);
    } catch (e) {
      console.warn("Failed to prefill from existing application:", e);
    }
  };

  // "불러오시겠습니까?" → 네: 기존 내용 채우기
  const confirmLoadExisting = async () => {
    setShowLoadExistingModal(false);
    if (retreatId != null) {
      await prefillFromExisting(retreatId);
    }
  };

  // "불러오시겠습니까?" → 아니오: 초기화된 빈 폼 유지
  const dismissLoadExisting = () => setShowLoadExistingModal(false);

  const mealRows = useMemo<MealRow[]>(
    () => (options ? buildMealRows(options.meals, selectedMealIds) : []),
    [options, selectedMealIds],
  );

  const allMealIds = useMemo<number[]>(
    () => (options ? options.meals.map((m) => m.id) : []),
    [options],
  );

  const isAllSelected = useMemo(() => {
    if (allMealIds.length === 0) return false;
    return allMealIds.every((id) => selectedMealIds.has(id));
  }, [allMealIds, selectedMealIds]);

  const toggleMeal = (id: number) => {
    setSelectedMealIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllMeals = () => {
    setSelectedMealIds(() => {
      if (isAllSelected) return new Set();
      return new Set(allMealIds);
    });
  };

  const departureTransport = useMemo<ApplicationOptionTransport | null>(
    () =>
      options?.transports.departure.find(
        (t) => t.id === departureTransportId,
      ) ?? null,
    [options, departureTransportId],
  );

  const returnTransport = useMemo<ApplicationOptionTransport | null>(
    () =>
      options?.transports.return.find((t) => t.id === returnTransportId) ??
      null,
    [options, returnTransportId],
  );

  // 가는 길·오는 길 중 하나라도 차량이 필요하면 차량번호 칸을 띄운다.
  const needsVehicle =
    !!departureTransport?.isVehicleRequired ||
    !!returnTransport?.isVehicleRequired;

  // 차량번호 칸이 활성화되고 비어 있으면 저장된 내 차 정보 자동 입력.
  // (사용자가 입력/수정한 값은 덮어쓰지 않도록 vehicleNumber는 deps에서 제외)
  useEffect(() => {
    if (needsVehicle && savedVehicleNumber) {
      setVehicleNumber((prev) => (prev ? prev : savedVehicleNumber));
    }
  }, [needsVehicle, savedVehicleNumber]);

  const groupLabel = useMemo(() => {
    if (!selectedGroupValue || !options) return "";
    return (
      options.groups.find((g) => g.value === selectedGroupValue)?.label ?? ""
    );
  }, [options, selectedGroupValue]);

  const retreatTitle = options?.retreat.title ?? "";

  const submit = async () => {
    if (!options || !selectedGroupValue || submitting) {
      return;
    }

    if (surveyId == null) {
      Alert.alert(
        "신청 불가",
        "신청서 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
      );
      return;
    }

    // 차량이 필요한 교통수단을 선택했는데 차량번호 미입력이면 제출 막기
    if (needsVehicle && !vehicleNumber.trim()) {
      Alert.alert("차량번호 입력", "차량번호를 입력해주세요.");
      return;
    }

    // 차량이 필요한 교통수단에는 공용 차량번호를 동일하게 적용
    const trimmedVehicle = vehicleNumber.trim();
    const transports: UpsertApplicationTransport[] = [];
    if (departureTransportId != null) {
      transports.push({
        retreatTransportId: departureTransportId,
        vehicleNumber: departureTransport?.isVehicleRequired
          ? trimmedVehicle
          : undefined,
      });
    }
    if (returnTransportId != null) {
      transports.push({
        retreatTransportId: returnTransportId,
        vehicleNumber: returnTransport?.isVehicleRequired
          ? trimmedVehicle
          : undefined,
      });
    }

    try {
      setSubmitting(true);
      const useCase = container.resolve(SubmitRetreatApplicationUseCase);
      await useCase.execute({
        retreatId: options.retreat.id,
        surveyId,
        group: selectedGroupValue,
        retreatMealIds: Array.from(selectedMealIds),
        transports,
      });
      router.replace("/retreat/application-success" as any);
    } catch (e) {
      console.error("Failed to submit retreat application:", e);
      let message =
        "신청서 제출 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.";
      if (isAxiosError<ApiErrorResponse>(e)) {
        const serverMessage = e.response?.data?.message;
        if (serverMessage === "Application period is closed") {
          message = "수련회 신청 기간이 아닙니다.";
        }
      }
      Alert.alert("신청 실패", message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return {
    loading,
    error,
    submitting,
    isEditMode,
    options,
    retreatTitle,

    selectedGroupValue,
    setSelectedGroupValue,
    groupLabel,

    mealRows,
    isAllSelected,
    toggleMeal,
    toggleAllMeals,

    departureTransport,
    departureTransportId,
    setDepartureTransportId,

    returnTransport,
    returnTransportId,
    setReturnTransportId,

    needsVehicle,
    vehicleNumber,
    setVehicleNumber,

    showLoadExistingModal,
    confirmLoadExisting,
    dismissLoadExisting,

    submit,
    handleBack,
    reload: loadOptions,
  };
}
