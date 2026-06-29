import { GetMyRetreatApplicationUseCase } from "@application/retreat/GetMyRetreatApplicationUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { RetreatApplication } from "@domain/retreat/RetreatApplication";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { container } from "@shared/di/container";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "../components/HomeHeader";
import { HomeMenuGrid } from "../components/HomeMenuGrid";
import { MainBanner } from "../components/MainBanner";

export default function HomeScreen() {
  const router = useRouter();
  const [retreatApplication, setRetreatApplication] =
    useState<RetreatApplication | null>(null);
  const [retreatStartAt, setRetreatStartAt] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadRetreatApplication = async () => {
        try {
          const getSystemConfigUseCase = container.resolve(
            GetSystemConfigUseCase,
          );
          const getMyRetreatApplicationUseCase = container.resolve(
            GetMyRetreatApplicationUseCase,
          );

          const systemConfig = await getSystemConfigUseCase.execute();
          console.log(
            `[HomeScreen] Current Retreat ID: ${systemConfig.currentRetreatId}`,
          );

          const application = await getMyRetreatApplicationUseCase.execute(
            systemConfig.currentRetreatId,
          );
          console.log(`[HomeScreen] Application result:`, application);

          setRetreatApplication(application);
          if (systemConfig.currentRetreat?.retreatStartAt) {
            setRetreatStartAt(systemConfig.currentRetreat.retreatStartAt);
          }
        } catch (error) {
          console.error("Failed to load retreat application:", error);
          setRetreatApplication(null);
        }
      };

      loadRetreatApplication();
    }, []),
  );

  const handleMenuPress = () => {
    router.push("/my-page");
  };

  const handleRetreatPress = () => {
    if (retreatApplication) {
      router.push("/retreat/application-detail" as any);
    } else {
      // 미등록 상태 → 인앱 수련회 신청서 작성 화면으로 이동
      router.push("/retreat/application" as any);
    }
  };

  const handleCarpoolPress = () => {
    router.push("/carpool");
  };

  const handleGuidebookPress = () => {
    router.push("/guidebook");
  };

  const handleVideoPress = () => {
    Linking.openURL("https://www.youtube.com/@recba_129");
  };

  const handleLecturePress = () => {
    Alert.alert("안내", "선택식 강의 신청 기간이 아닙니다.");
  };

  const dDay = React.useMemo(() => {
    if (!retreatStartAt) return "-";
    const target = new Date(retreatStartAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = target.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days <= 0 ? "Day" : days;
  }, [retreatStartAt]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: Color.default.background,
        paddingHorizontal: Layout.spacing.l,
        gap: 25,
      }}
    >
      <HomeHeader dDay={dDay} onMenuPress={handleMenuPress} />
      <MainBanner
        images={[
          require("../../../../assets/images/2026_summer_retreat_poster.png"),
        ]}
      />
      <HomeMenuGrid
        isRetreatRegistered={retreatApplication !== null}
        onRetreatPress={handleRetreatPress}
        onCarpoolPress={handleCarpoolPress}
        onGuidebookPress={handleGuidebookPress}
        onVideoPress={handleVideoPress}
        onLecturePress={handleLecturePress}
      />
    </SafeAreaView>
  );
}
