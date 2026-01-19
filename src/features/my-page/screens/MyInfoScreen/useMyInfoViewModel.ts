import { DeleteAccountUseCase } from "@application/user/DeleteAccountUseCase";
import { container } from "@shared/di/container";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { useRouter } from "expo-router";
import { useState } from "react";

type ModalType = "CONFIRM_DELETE" | "ERROR";

interface ModalState {
  type: ModalType;
  message?: string;
}

export function useMyInfoViewModel() {
  const router = useRouter();
  const { user, logout: clearAuthState } = useAuthStore();
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const handleBack = () => {
    router.back();
  };

  // Trigger modal instead of Alert
  const handleDeleteAccount = () => {
    setModalState({ type: "CONFIRM_DELETE" });
  };

  // Actual logic to run when user confirms in modal
  const confirmDeleteAccount = async () => {
    try {
      const deleteAccountUseCase = container.resolve(DeleteAccountUseCase);
      await deleteAccountUseCase.execute();
      clearAuthState();
      setModalState(null); // Close modal
      router.replace("/");
    } catch (error: any) {
      setModalState({
        type: "ERROR",
        message: error.message || "계정 삭제에 실패했습니다.",
      });
    }
  };

  const closeModal = () => {
    setModalState(null);
  };

  const getGenderText = (gender: string) => {
    switch (gender) {
      case "M":
        return "남자";
      case "F":
        return "여자";
      default:
        return "선택안함";
    }
  };

  return {
    user,
    handleBack,
    handleDeleteAccount,
    confirmDeleteAccount,
    modalState,
    closeModal,
    getGenderText,
  };
}
