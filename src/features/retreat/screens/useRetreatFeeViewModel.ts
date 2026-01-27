import { GetRetreatPaymentStatusUseCase } from "@application/retreat/GetRetreatPaymentStatusUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { container } from "@shared/di/container";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useRetreatFeeViewModel() {
  const router = useRouter();
  const [isPaid, setIsPaid] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);

  const accountInfo = "카카오뱅크 79795194749 배윤희";

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const getSystemConfigUseCase = container.resolve(GetSystemConfigUseCase);
      const getRetreatPaymentStatusUseCase = container.resolve(
        GetRetreatPaymentStatusUseCase,
      );

      const config = await getSystemConfigUseCase.execute();
      const status = await getRetreatPaymentStatusUseCase.execute(
        config.currentRetreatId,
      );
      setIsPaid(status.isPaid);
    } catch (error) {
      console.error("Failed to load payment status:", error);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(accountInfo);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  const handleBack = () => {
    router.back();
  };

  return {
    isPaid,
    accountInfo,
    handleCopy,
    handleBack,
    toastVisible,
  };
}
