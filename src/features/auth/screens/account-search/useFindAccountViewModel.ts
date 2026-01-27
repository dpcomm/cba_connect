import { FindIdUseCase } from "@application/auth/FindIdUseCase";
import { ResetPasswordUseCase } from "@application/auth/ResetPasswordUseCase";
import { SendEmailVerificationUseCase } from "@application/auth/SendEmailVerificationUseCase";
import { VerifyEmailCodeUseCase } from "@application/auth/VerifyEmailCodeUseCase";
import { EmailVerificationType } from "@domain/auth/EmailVerificationType";
import { container } from "@shared/di/container";
import { useState } from "react";
import { Alert } from "react-native";

export type FindAccountTab = "ID" | "PW";
export type FindIdStep = "input" | "result";
export type FindPwStep = "input" | "verification" | "newPassword";

export function useFindAccountViewModel(onPasswordResetSuccess?: () => void) {
  const [activeTab, setActiveTab] = useState<FindAccountTab>("ID");
  const [isLoading, setIsLoading] = useState(false);

  const showModal = (
    title: string,
    message: string,
    onConfirm?: () => void,
  ) => {
    Alert.alert(title, message, [
      {
        text: "확인",
        onPress: onConfirm,
      },
    ]);
  };

  // 아이디 찾기
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [findIdStep, setFindIdStep] = useState<FindIdStep>("input");
  const [foundIds, setFoundIds] = useState<string[]>([]);

  // 비밀번호 찾기
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [findPwStep, setFindPwStep] = useState<FindPwStep>("input");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const findId = async () => {
    if (!name.trim()) {
      showModal("오류", "이름을 입력해주세요.");
      return;
    }
    if (!phone.trim()) {
      showModal("오류", "전화번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const findIdUseCase = container.resolve(FindIdUseCase);
      const ids = await findIdUseCase.execute(name, phone);
      setFoundIds(ids);
      setFindIdStep("result");
    } catch (error: any) {
      showModal("오류", error.message || "아이디 찾기에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async () => {
    if (!email.trim()) {
      showModal("오류", "이메일을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      const sendEmailVerificationUseCase = container.resolve(
        SendEmailVerificationUseCase,
      );
      await sendEmailVerificationUseCase.execute(
        email,
        EmailVerificationType.RESET_PASSWORD,
        userId,
      );
      setFindPwStep("verification");
    } catch (error: any) {
      showModal("오류", error.message || "인증번호 발송에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    setIsLoading(true);
    try {
      const sendEmailVerificationUseCase = container.resolve(
        SendEmailVerificationUseCase,
      );
      await sendEmailVerificationUseCase.execute(
        email,
        EmailVerificationType.RESET_PASSWORD,
        userId,
      );
      showModal("알림", "인증번호가 재발송되었습니다.");
    } catch (error: any) {
      showModal("오류", error.message || "인증번호 재발송에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode.trim()) {
      showModal("오류", "인증번호를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      const verifyEmailCodeUseCase = container.resolve(VerifyEmailCodeUseCase);
      const token = await verifyEmailCodeUseCase.execute(
        email,
        verificationCode,
      );
      setVerificationToken(token);
      setFindPwStep("newPassword");
    } catch (error: any) {
      showModal("오류", error.message || "인증번호 확인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      showModal("오류", "비밀번호를 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showModal("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsLoading(true);
    try {
      const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
      await resetPasswordUseCase.execute({
        email,
        verificationToken,
        newPassword,
      });
      showModal("성공", "비밀번호가 변경되었습니다.", () => {
        onPasswordResetSuccess?.();
      });
    } catch (error: any) {
      showModal("오류", error.message || "비밀번호 재설정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const submit = () => {
    if (activeTab === "ID") {
      if (findIdStep === "input") {
        findId();
      }
    } else {
      if (findPwStep === "input") {
        sendVerificationCode();
      } else if (findPwStep === "verification") {
        verifyCode();
      } else if (findPwStep === "newPassword") {
        resetPassword();
      }
    }
  };

  const getButtonTitle = () => {
    if (activeTab === "ID") {
      return findIdStep === "input" ? "아이디 찾기" : "로그인";
    } else {
      if (findPwStep === "input") return "비밀번호 찾기";
      if (findPwStep === "verification") return "확인";
      return "로그인 하기";
    }
  };

  const isPasswordValid = newPassword.length >= 8;
  const isConfirmMatch =
    newPassword === confirmPassword && confirmPassword.length > 0;

  const isSubmitDisabled = () => {
    if (isLoading) return true;
    if (activeTab === "PW" && findPwStep === "newPassword") {
      return !isPasswordValid || !isConfirmMatch;
    }
    return false;
  };

  return {
    activeTab,
    setActiveTab,
    name,
    setName,
    phone,
    setPhone,
    findIdStep,
    foundIds,
    userId,
    setUserId,
    email,
    setEmail,
    findPwStep,
    verificationCode,
    setVerificationCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    resendVerificationCode,
    submit,
    getButtonTitle,
    isSubmitDisabled,
    isLoading,
  };
}
