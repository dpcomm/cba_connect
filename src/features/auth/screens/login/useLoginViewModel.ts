import { LoginUseCase } from "@application/auth/LoginUseCase";
import { CheckConsentUseCase } from "@application/consent/CheckConsentUseCase";
import { SubmitConsentUseCase } from "@application/consent/SubmitConsentUseCase";
import { container } from "@shared/di/container";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useLoginViewModel() {
  const loginUseCase = container.resolve(LoginUseCase);
  const checkConsentUseCase = container.resolve(CheckConsentUseCase);
  const submitConsentUseCase = container.resolve(SubmitConsentUseCase);
  const router = useRouter();

  const { setUser, setLoading, setError, isLoading } = useAuthStore();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const auth = await loginUseCase.execute(userId, password, true);
      setUser(auth.user);

      // 약관 동의 체크
      const isConsented = await checkConsentUseCase.execute();
      if (!isConsented) {
        setShowPermissionModal(true);
        return;
      }

      alert("로그인에 성공하였습니다.");
      router.replace("/home");
    } catch (error: any) {
      setError(error.message || "로그인에 실패하였습니다.");
      alert(error.message || "로그인에 실패하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionConfirm = async () => {
    try {
      await submitConsentUseCase.execute();
      setShowPermissionModal(false);
      alert("로그인에 성공하였습니다.");
      router.replace("/home");
    } catch (error) {
      console.warn("Consent submission failed:", error);
      // 에러 발생해도 진행
      setShowPermissionModal(false);
      router.replace("/home");
    }
  };

  const navigateToResetPassword = () => {
    router.push("/auth/account-search");
  };

  const navigateToRegister = () => {
    router.push("/auth/register");
  };

  return {
    userId,
    setUserId,
    password,
    setPassword,
    isLoading,
    login,
    navigateToResetPassword,
    navigateToRegister,
    showPermissionModal,
    handlePermissionConfirm,
  };
}
