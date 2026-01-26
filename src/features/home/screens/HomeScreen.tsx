import { GetMyRetreatApplicationUseCase } from "@application/retreat/GetMyRetreatApplicationUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { RetreatApplication } from "@domain/retreat/RetreatApplication";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { container } from "@shared/di/container";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "../components/HomeHeader";
import { HomeMenuGrid } from "../components/HomeMenuGrid";
import { MainBanner } from "../components/MainBanner";

export default function HomeScreen() {
  const router = useRouter();
  const [retreatApplication, setRetreatApplication] =
    useState<RetreatApplication | null>(null);

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
      router.push("/retreat/check-in" as any);
    } else {
      Linking.openURL("https://recba.me");
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
    router.push("/lecture" as any);
  };

  const dDay = React.useMemo(() => {
    const target = new Date(2026, 0, 30);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = target.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days <= 0 ? "Day" : days;
  }, []);

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
          require("../../../../assets/images/rolling_banner_26_retreat.png"),
          require("../../../../assets/images/rolling_banner_26_retreat.png"),
          require("../../../../assets/images/rolling_banner_26_retreat.png"),
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
