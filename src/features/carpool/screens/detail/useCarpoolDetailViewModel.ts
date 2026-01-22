import {
  DeleteCarpoolUseCase,
  GetCarpoolDetailUseCase,
  JoinCarpoolUseCase,
  LeaveCarpoolUseCase,
} from "@application/carpool";
import { container } from "@shared/di/container";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";

type Args = { carpoolId: number; userId: number };

export interface ModalState {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function useCarpoolDetailViewModel({ carpoolId, userId }: Args) {
  const getDetailUseCase = useMemo(
    () => container.resolve(GetCarpoolDetailUseCase),
    [],
  );
  const joinUseCase = useMemo(() => container.resolve(JoinCarpoolUseCase), []);
  const leaveUseCase = useMemo(
    () => container.resolve(LeaveCarpoolUseCase),
    [],
  );
  const deleteUseCase = useMemo(
    () => container.resolve(DeleteCarpoolUseCase),
    [],
  );

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

  const isDriver = !!carpool && carpool.driverId === userId;

  const isMember = useMemo(() => {
    if (!carpool) return false;
    if (typeof carpool.isMember === "boolean") return carpool.isMember;

    if (Array.isArray(carpool?.members))
      return carpool.members?.some((m: any) => m.id === userId);

    return false;
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
          showModal(
            "오류",
            e instanceof Error ? e.message : "신청에 실패했습니다.",
          );
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
          showModal(
            "오류",
            e instanceof Error ? e.message : "취소에 실패했습니다.",
          );
        } finally {
          setIsLoading(false);
        }
      },
      "예",
      "아니요",
    );
  }, [carpoolId, userId, leaveUseCase, load]);

  const toEdit = (carpoolId: number) => {
    const hasMembers = (carpool?.members?.length ?? 0) > 1;

    const message = hasMembers
      ? "카풀 신청자가 있습니다.\n정말로 수정하시겠습니까?\n\n탑승자에게 수정 알림이 발송됩니다."
      : "정말로 수정하시겠습니까?";

    showModal(
      "수정",
      message,
      () => {
        router.push(`/carpool/edit/${carpoolId}`);
      },
      "예",
      "아니요",
    );
  };

  const deleteCarpool = useCallback(async () => {
    if (!carpoolId) return;

    if (!userId || userId <= 0) {
      showModal("오류", "로그인 정보를 찾을 수 없습니다.");
      return;
    }

    let message = "";
    if (carpool?.members && carpool?.members?.length > 1) {
      message =
        "카풀 신청자가 있습니다. 정말로 삭제 하시겠습니까? \n탑승자에게는 삭제 알림이 발송됩니다.";
    } else {
      message = "정말로 삭제 하시겠습니까?";
    }

    showModal(
      "취소",
      message,
      async () => {
        setIsLoading(true);
        try {
          await deleteUseCase.execute(carpoolId);
          showModal("완료", "카풀이 삭제되었습니다.", () => {
            router.push("/carpool");
          });
        } catch (e) {
          showModal(
            "오류",
            e instanceof Error ? e.message : "삭제에 실패했습니다.",
          );
        } finally {
          setIsLoading(false);
        }
      },
      "예",
      "아니요",
    );
  }, [carpoolId, userId, deleteUseCase]); // Removed unused dependencies

  return {
    carpool,
    isLoading,
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
