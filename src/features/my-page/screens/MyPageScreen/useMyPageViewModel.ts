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
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => setActiveModal(null);
  const openCarInfoModal = () => setActiveModal("CAR_INFO");
  const openTechSupport = () => setActiveModal("TECH_SUPPORT");
  const openUnderConstruction = () => setActiveModal("UNDER_CONSTRUCTION");

  const handleLogout = () => {
    setActiveModal("CONFIRM_LOGOUT");
  };

  const confirmLogout = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToNotice = () => {
    router.push("/notice" as any);
  };

  const navigateToHistory = () => {
    router.push("/carpool/history" as any);
  };

  const navigateToPaymentStatus = () => {
    router.push("/retreat/fee-status" as any);
  };

  const navigateToApplicationDetail = () => {
    router.push("/retreat/application-detail" as any);
  };

  return {
    activeModal,
    isLoading,
    closeModal,
    openCarInfoModal,
    openTechSupport,
    openUnderConstruction,
    handleLogout,
    confirmLogout,
    navigateToNotice,
    navigateToHistory,
    navigateToPaymentStatus,
    navigateToApplicationDetail,
    router,
  };
}
