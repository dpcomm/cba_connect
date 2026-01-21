import { ReadOnlyStepValue } from "@features/auth/components/ReadOnlyStepValue";
import { Header } from "@shared/components/header/Header";
import { BaseModal } from "@shared/components/modal/BaseModal";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useMyInfoViewModel } from "./useMyInfoViewModel";

export default function MyInfoScreen() {
  const {
    user,
    handleBack,
    handleDeleteAccount,
    confirmDeleteAccount,
    modalState,
    closeModal,
    getGenderText,
  } = useMyInfoViewModel();

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Header title="내 정보" onBack={handleBack} />
        <View style={styles.loadingContainer}>
          <ThemedText variant="text1">로그인 정보가 없습니다.</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Header title="내 정보" onBack={handleBack} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <ReadOnlyStepValue label="아이디" value={user.userId} />
        <ReadOnlyStepValue label="비밀번호" value={"•".repeat(8)} />
        <ReadOnlyStepValue label="이름" value={user.name} />
        {/* {user.birth && (
          <ReadOnlyStepValue label="생년월일" value={user.birth} />
        )} */}

        <ReadOnlyStepValue label="성별" value={getGenderText(user.gender)} />
        <ReadOnlyStepValue label="전화번호" value={user.phone} />
        <ReadOnlyStepValue label="중그룹" value={user.group} />
        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={styles.deleteButton}
        >
          <ThemedText
            variant="text2"
            color={Color.accents.pink}
            style={styles.deleteButtonText}
          >
            계정 삭제
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
      <BaseModal
        visible={modalState?.type === "CONFIRM_DELETE"}
        onClose={closeModal}
        title="계정 삭제"
        leftButton={{
          text: "취소",
          onPress: closeModal,
          color: Color.tertiary.main,
        }}
        rightButton={{
          text: "삭제",
          onPress: confirmDeleteAccount,
          color: Color.accents.pink,
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </ThemedText>
      </BaseModal>
      <BaseModal
        visible={modalState?.type === "ERROR"}
        onClose={closeModal}
        title="오류"
        rightButton={{
          text: "확인",
          onPress: closeModal,
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          {modalState?.message}
        </ThemedText>
      </BaseModal>
    </SafeAreaView>
  );
}
