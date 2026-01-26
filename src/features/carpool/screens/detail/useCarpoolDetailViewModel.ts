import {
  DeleteCarpoolUseCase,
  GetCarpoolDetailUseCase,
  JoinCarpoolUseCase,
  LeaveCarpoolUseCase,
} from "@application/carpool";
import { container } from "@shared/di/container";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";

type Args = { carpoolId: number };

export interface ModalState {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function toNumberId(v: unknown): number | null {
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function memberIdOf(m: any): number | null {
  // 서버/모델마다 다를 수 있어서 최대한 방어
  return (
    toNumberId(m?.userId) ??
    toNumberId(m?.id) ??
    toNumberId(m?.user?.id) ??
    null
  );
}

export function useCarpoolDetailViewModel({ carpoolId }: Args) {
  const getDetailUseCase = useMemo(
    () => container.resolve(GetCarpoolDetailUseCase),
    [],
  );
  const joinUseCase = useMemo(() => container.resolve(JoinCarpoolUseCase), []);
  const leaveUseCase = useMemo(() => container.resolve(LeaveCarpoolUseCase), []);
  const deleteUseCase = useMemo(
    () => container.resolve(DeleteCarpoolUseCase),
    [],
  );

  // ✅ VM 내부에서 userId 뽑기
  const { user } = useAuthStore();
  const userId = useMemo(() => {
    const n = Number(user?.id);
    return Number.isNaN(n) ? 0 : n;
  }, [user?.id]);

  const [carpool, setCarpool] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const load = useCallback(async () => {
    if (!carpoolId) return;
    setIsLoading(true);

    try {
      const detail = await getDetailUseCase.execute(carpoolId);
      setCarpool(detail);
    } catch (e) {
      console.log("[carpool detail load error]", e);
      setCarpool(null);
      showModal(
        "오류",
        e instanceof Error ? e.message : "상세 정보를 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [carpoolId, getDetailUseCase]);

  // ✅ 운전자 여부
  const isDriver = useMemo(() => {
    if (!carpool) return false;
    const driverId =
      toNumberId(carpool?.driverId) ??
      toNumberId(carpool?.driver?.id) ??
      null;
    if (!driverId || !userId) return false;
    return driverId === userId;
  }, [carpool, userId]);

  // ✅ 멤버 여부 (members에 로그인 유저가 있으면 true)
  const isMember = useMemo(() => {
    if (!carpool) return false;

    // 백에서 isMember 내려주면 그걸 우선 신뢰
    if (typeof carpool.isMember === "boolean") return carpool.isMember;

    const members = Array.isArray(carpool?.members) ? carpool.members : [];
    if (!userId) return false;

    return members.some((m: any) => memberIdOf(m) === userId);
  }, [carpool, userId]);

  const join = useCallback(async () => {
    if (!carpoolId) return;

    if (!userId || userId <= 0) {
      showModal("오류", "로그인 정보를 찾을 수 없습니다.");
      return;
    }

    showModal(
      "신청",
      "신청하시겠습니까?",
      async () => {
        setIsLoading(true);
        try {
          await joinUseCase.execute(userId, carpoolId);
          await load();
          showModal("완료", "카풀 신청이 완료되었습니다.", () => {
            router.push("/carpool");
          });
        } catch (e) {
          showModal("오류", e instanceof Error ? e.message : "신청에 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      },
      "확인",
      "취소",
    );
  }, [carpoolId, userId, joinUseCase, load]);

  const leave = useCallback(async () => {
    if (!carpoolId) return;

    if (!userId || userId <= 0) {
      showModal("오류", "로그인 정보를 찾을 수 없습니다.");
      return;
    }

    showModal(
      "취소",
      "정말 취소할까요?",
      async () => {
        setIsLoading(true);
        try {
          await leaveUseCase.execute(userId, carpoolId);
          await load();
          showModal("완료", "카풀 신청이 취소되었습니다.", () => {
            router.push("/carpool");
          });
        } catch (e) {
          showModal("오류", e instanceof Error ? e.message : "취소에 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      },
      "예",
      "아니요",
    );
  }, [carpoolId, userId, leaveUseCase, load]);

  const toEdit = (targetCarpoolId: number) => {
    const hasMembers = (carpool?.members?.length ?? 0) > 1;

    const message = hasMembers
      ? "카풀 신청자가 있습니다.\n정말로 수정하시겠습니까?\n\n탑승자에게 수정 알림이 발송됩니다."
      : "정말로 수정하시겠습니까?";

    showModal(
      "수정",
      message,
      () => {
        router.replace(`/carpool/edit/${targetCarpoolId}`);
      },
      "예",
      "아니요",
    );
  };

  // ✅ 삭제
  const deleteCarpool = useCallback(async () => {
    if (!carpoolId) return;
 
    if (!userId || userId <= 0) {
      showModal("오류", "로그인 정보를 찾을 수 없습니다.");
      return;
    }

    const hasOthers = (carpool?.members?.length ?? 0) > 1;
    const message = hasOthers
      ? "카풀 신청자가 있습니다. 정말로 삭제 하시겠습니까? \n탑승자에게는 삭제 알림이 발송됩니다."
      : "정말로 삭제 하시겠습니까?";

    showModal(
      "취소",
      message,
      async () => {
        setIsLoading(true);
        try {
          await deleteUseCase.execute(carpoolId);
          showModal("완료", "카풀이 삭제되었습니다.", () => {
            router.replace("/carpool");
          });
        } catch (e) {
          showModal("오류", e instanceof Error ? e.message : "삭제에 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      },
      "예",
      "아니요",
    );
  }, [carpoolId, userId, carpool, deleteUseCase]);

  return {
    carpool,
    isLoading,

    userId, 
    isDriver,
    isMember,

    load,
    join,
    leave,
    toEdit,
    deleteCarpool,

    modalState,
    closeModal,
  };
}
