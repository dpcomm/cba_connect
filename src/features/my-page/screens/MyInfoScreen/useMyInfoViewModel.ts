import { DeleteAccountUseCase } from "@application/user/DeleteAccountUseCase";
import { GetUserGroupOptionsUseCase } from "@application/user/GetUserGroupOptionsUseCase";
import { UpdateProfileUseCase } from "@application/user/UpdateProfileUseCase";
import {
  UpdateProfileData,
  UserGroupOption,
} from "@domain/user/IUserRepository";
import { container } from "@shared/di/container";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { isValidPassword } from "@shared/utils/validators";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export function useMyInfoViewModel() {
  const router = useRouter();
  const { user, logout: clearAuthState, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UpdateProfileData>({});
  const [groupOptions, setGroupOptions] = useState<UserGroupOption[]>([]);
  const [groupOptionsLoading, setGroupOptionsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const loadGroupOptions = useCallback(async () => {
    setGroupOptionsLoading(true);
    try {
      const getUserGroupOptionsUseCase = container.resolve(
        GetUserGroupOptionsUseCase,
      );
      const options = await getUserGroupOptionsUseCase.execute();
      setGroupOptions(options);
    } catch (error) {
      console.error("Failed to load group options:", error);
      if (user?.group) {
        setGroupOptions([{ label: user.group, value: user.group }]);
      }
    } finally {
      setGroupOptionsLoading(false);
    }
  }, [user?.group]);

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
    void loadGroupOptions();
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
          throw new Error(
            "비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.",
          );
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
        }),
      );

      await updateProfileUseCase.execute(dataToUpdate);

      // Update local store
      setUser({ ...user, ...dataToUpdate } as any);

      setIsEditing(false);
      Alert.alert("성공", "내 정보가 수정되었습니다.");
    } catch (error: any) {
      Alert.alert("오류", error.message || "내 정보 수정을 실패했습니다.");
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "계정 삭제",
      "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: confirmDeleteAccount,
        },
      ],
    );
  };

  const confirmDeleteAccount = async () => {
    try {
      const deleteAccountUseCase = container.resolve(DeleteAccountUseCase);
      await deleteAccountUseCase.execute();
      clearAuthState();
      router.replace("/");
    } catch (error: any) {
      Alert.alert("오류", error.message || "계정 삭제에 실패했습니다.");
    }
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
    getGenderText,
    isEditing,
    editForm,
    startEditing,
    cancelEditing,
    handleChange,
    handleGroupChange,
    groupOptions,
    groupOptionsLoading,
    saveProfile,
    goToEmailVerification,
  };
}
