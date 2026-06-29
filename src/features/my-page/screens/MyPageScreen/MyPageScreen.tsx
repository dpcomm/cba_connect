import { Header } from "@shared/components/header/Header";
import { LoadingOverlay } from "@shared/components/loading-overlay/LoadingOverlay";
import { BaseModal } from "@shared/components/modal/BaseModal";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CarInfoModal } from "../../components/CarInfoModal";
import { MenuItem } from "../../components/MenuItem";
import { MenuSection } from "../../components/MenuSection";
import { ProfileCard } from "../../components/ProfileCard";
import { styles } from "./styles";
import { useMyPageViewModel } from "./useMyPageViewModel";

export default function MyPageScreen() {
  const {
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
  } = useMyPageViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="마이 페이지"
        onBack={() => router.back()}
        rightContent={
          null
          /*
          <TouchableOpacity style={styles.notiButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Color.text.main}
            />
          </TouchableOpacity>
          */
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard />

        <View style={styles.menuContainer}>
          <MenuSection>
            <MenuItem
              label="공지사항"
              showBorder={false}
              onPress={navigateToNotice}
            />
          </MenuSection>

          <MenuSection title="마이 수련회">
            <MenuItem
              label="수련회 신청 조회"
              onPress={navigateToApplicationDetail}
            />
            <MenuItem
              label="회비 납부 조회"
              onPress={navigateToPaymentStatus}
            />
            <MenuItem
              label="수련회 히스토리"
              showBorder={false}
              onPress={openUnderConstruction}
            />
          </MenuSection>

          <MenuSection title="마이 카풀">
            <MenuItem
              label="카풀 히스토리"
              onPress={navigateToHistory}
              showBorder={false}
            />
            <MenuItem
              label="내 차 정보 조회"
              showBorder={false}
              onPress={openCarInfoModal}
            />
          </MenuSection>

          <MenuSection title="Support">
            <MenuItem
              label="기술 지원 안내"
              showBorder={false}
              onPress={openTechSupport}
            />
          </MenuSection>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <ThemedText
            variant="text2"
            color={Color.tertiary.main}
            style={styles.logoutText}
          >
            로그아웃
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>

      <CarInfoModal visible={activeModal === "CAR_INFO"} onClose={closeModal} />
      <BaseModal
        visible={activeModal === "CONFIRM_LOGOUT"}
        onClose={closeModal}
        title="로그아웃"
        leftButton={{
          text: "취소",
          onPress: closeModal,
          color: Color.tertiary.main,
        }}
        rightButton={{
          text: "로그아웃",
          onPress: confirmLogout,
          color: Color.accents.pink,
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          정말 로그아웃 하시겠습니까?
        </ThemedText>
      </BaseModal>
      <BaseModal
        visible={activeModal === "TECH_SUPPORT"}
        onClose={closeModal}
        title="기술 지원 안내"
        rightButton={{
          text: "확인",
          onPress: closeModal,
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          앱 사용 중 문제가 발생했나요?{"\n"}
          아래 이메일로 문의해 주세요.{"\n\n"}
          jipkim2@gmail.com
        </ThemedText>
      </BaseModal>
      <BaseModal
        visible={activeModal === "UNDER_CONSTRUCTION"}
        onClose={closeModal}
        title="알림"
        rightButton={{
          text: "확인",
          onPress: closeModal,
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          구현 중인 기능입니다.
        </ThemedText>
      </BaseModal>
      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  );
}
