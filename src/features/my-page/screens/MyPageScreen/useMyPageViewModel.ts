import { LogoutUseCase } from "@application/auth/LogoutUseCase";
import { container } from "@shared/di/container";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { useRouter } from "expo-router";
import { useState } from "react";

type ModalType =
  | "CONFIRM_LOGOUT"
  | "CAR_INFO"
  | "TECH_SUPPORT"
  | "UNDER_CONSTRUCTION";

export function useMyPageViewModel() {
  const router = useRouter();
  const { logout: clearAuthState } = useAuthStore();
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const closeModal = () => setActiveModal(null);
  const openCarInfoModal = () => setActiveModal("CAR_INFO");
  const openTechSupport = () => setActiveModal("TECH_SUPPORT");
  const openUnderConstruction = () => setActiveModal("UNDER_CONSTRUCTION");

  const handleLogout = () => {
    setActiveModal("CONFIRM_LOGOUT");
  };

  const confirmLogout = async () => {
    try {
      const logoutUseCase = container.resolve(LogoutUseCase);
      await logoutUseCase.execute();
      clearAuthState();
      setActiveModal(null);
      router.dismissAll();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuthState();
      setActiveModal(null);
      router.dismissAll();
      router.replace("/");
    }
  };

  const navigateToNotice = () => {
    router.push("/notice" as any);
  };

  const navigateToHistory = () => {
    router.push("/carpool/history" as any);
  };

  return {
    activeModal,
    closeModal,
    openCarInfoModal,
    openTechSupport,
    openUnderConstruction,
    handleLogout,
    confirmLogout,
    navigateToNotice,
    navigateToHistory,
    router,
  };
}
