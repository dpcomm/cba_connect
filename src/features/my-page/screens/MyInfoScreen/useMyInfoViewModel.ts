import { DeleteAccountUseCase } from "@application/user/DeleteAccountUseCase";
import { UpdateProfileUseCase } from "@application/user/UpdateProfileUseCase";
import { UpdateProfileData } from "@domain/user/IUserRepository";
import { container } from "@shared/di/container";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { isValidPassword } from "@shared/utils/validators";
import { useRouter } from "expo-router";
import { useState } from "react";

type ModalType = "CONFIRM_DELETE" | "ERROR" | "SUCCESS";

interface ModalState {
  type: ModalType;
  message?: string;
}

export function useMyInfoViewModel() {
  const router = useRouter();
  const { user, logout: clearAuthState, setUser } = useAuthStore();
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UpdateProfileData>({});

  const handleBack = () => {
    router.back();
  };

  const startEditing = () => {
    if (!user) return;
    setEditForm({
      name: user.name,
      phone: user.phone,
      group: user.group,
      birth: user.birth,
      gender: user.gender,
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const handleChange = (field: keyof UpdateProfileData, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGroupChange = (group: string) => {
    setEditForm((prev) => ({ ...prev, group }));
  };

  const goToEmailVerification = () => {
    router.push("/auth/email-verification?source=mypage");
  };

  const saveProfile = async (confirmPassword?: string) => {
    try {
      if (!user) return;
      if (editForm.password) {
        if (!isValidPassword(editForm.password)) {
          throw new Error("비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.");
        }
        if (editForm.password !== confirmPassword) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }
      }

      const updateProfileUseCase = container.resolve(UpdateProfileUseCase);

      const dataToUpdate = Object.fromEntries(
        Object.entries(editForm).filter(([key, v]) => {
          if (key === "password" && !v) return false;
          return v !== undefined;
        })
      );

      await updateProfileUseCase.execute(dataToUpdate);

      // Update local store
      setUser({ ...user, ...dataToUpdate } as any);

      setIsEditing(false);
      setModalState({
        type: "SUCCESS",
        message: "내 정보가 수정되었습니다.",
      });
    } catch (error: any) {
      setModalState({
        type: "ERROR",
        message: error.message || "내 정보 수정을 실패했습니다.",
      });
    }
  };

  const handleDeleteAccount = () => {
    setModalState({ type: "CONFIRM_DELETE" });
  };

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
      case "male":
      case "M":
        return "남자";
      case "female":
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
    isEditing,
    editForm,
    startEditing,
    cancelEditing,
    handleChange,
    handleGroupChange,
    saveProfile,
    goToEmailVerification,
  };
}
