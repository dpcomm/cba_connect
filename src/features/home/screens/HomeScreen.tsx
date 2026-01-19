import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { useRouter } from "expo-router";
import React from "react";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "../components/HomeHeader";
import { HomeMenuGrid } from "../components/HomeMenuGrid";
import { MainBanner } from "../components/MainBanner";

export default function HomeScreen() {
  const router = useRouter();

  const handleMenuPress = () => {
    router.push("/my-page");
  };

  const handleRetreatPress = () => {
    Linking.openURL("https://recba.me");
  };

  const handleCarpoolPress = () => {
    router.push("/carpool");
  };

  const handleGuidebookPress = () => {
    Linking.openURL("https://recba.me");
  };

  const handleVideoPress = () => {
    Linking.openURL("https://recba.me");
  };

  const handleLecturePress = () => {
    Linking.openURL("https://recba.me");
  };

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
      <HomeHeader dDay={0} onMenuPress={handleMenuPress} />
      <MainBanner
        images={[
          require("../../../../assets/images/rolling_banner_26_retreat.png"),
          require("../../../../assets/images/rolling_banner_26_retreat.png"),
          require("../../../../assets/images/rolling_banner_26_retreat.png"),
        ]}
      />
      <HomeMenuGrid
        onRetreatPress={handleRetreatPress}
        onCarpoolPress={handleCarpoolPress}
        onGuidebookPress={handleGuidebookPress}
        onVideoPress={handleVideoPress}
        onLecturePress={handleLecturePress}
      />
    </SafeAreaView>
  );
}
