import { ReadOnlyStepValue } from "@features/auth/components/ReadOnlyStepValue";
import { Button } from "@shared/components/button/Button";
import { Header } from "@shared/components/header/Header";
import { LoadingOverlay } from "@shared/components/loading-overlay/LoadingOverlay";
import { BaseModal } from "@shared/components/modal/BaseModal";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { formatDateTimePretty } from "@shared/utils/dateFormat";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLectureDetailViewModel } from "./useLectureDetailViewModel";

export default function LectureDetailScreen() {
  const {
    lecture,
    myAppliedId,
    isLoading,
    modalState,
    handleApply,
    handleCancel,
    closeModal,
    confirmAction,
    goBack,
  } = useLectureDetailViewModel();

  if (!lecture) return <LoadingOverlay visible={true} />;

  const isApplied = myAppliedId === lecture.id;
  const isOtherApplied = myAppliedId !== null && !isApplied;
  const isFull = lecture.currentCount >= lecture.maxCapacity;

  const scheduleStr = formatDateTimePretty(lecture.startTime);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.default.background }}
    >
      <Header title="선택식 강의" onBack={goBack} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Quote Box */}
        <View style={styles.quoteBox}>
          <ThemedText
            variant="heading2"
            color={Color.primary.main}
            style={styles.quoteTitle}
          >
            {lecture.title}
          </ThemedText>
          <ThemedText
            variant="text1"
            color={Color.text.main}
            style={styles.quoteIntroduction}
          >
            {lecture.introduction}
          </ThemedText>
        </View>

        {/* Instructor Section */}
        <View style={styles.infoSection}>
          <ReadOnlyStepValue label="강사" value={lecture.instructorName} />

          <View style={styles.divider} />

          {lecture.instructorBio && (
            <ThemedText
              variant="text4"
              color={Color.text.main}
              style={styles.instructorBio}
            >
              {lecture.instructorBio}
            </ThemedText>
          )}

          <ReadOnlyStepValue label="장소" value={lecture.location} />

          <View style={styles.divider} />

          <ReadOnlyStepValue label="일정" value={scheduleStr} />

          <View style={styles.divider} />

          <ReadOnlyStepValue
            label="참여인원"
            value={
              <ThemedText variant="heading3">
                <ThemedText
                  variant="heading3"
                  color={isFull ? Color.accents.pink : Color.primary.main}
                >
                  {lecture.currentCount}명
                </ThemedText>
                {" / "}
                {lecture.maxCapacity}명
              </ThemedText>
            }
          />

          <View style={styles.divider} />

        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        {isApplied ? (
          <Button
            title="취소하기"
            onPress={handleCancel}
            size="large"
            style={{ backgroundColor: Color.tertiary.main }}
          />
        ) : (
          <Button
            title={
              isFull
                ? "정원 마감"
                : isOtherApplied
                  ? "다른 강의 신청됨"
                  : "신청하기"
            }
            onPress={handleApply}
            disabled={isFull || isOtherApplied}
            size="large"
          />
        )}
      </View>

      <BaseModal
        visible={modalState.visible}
        onClose={closeModal}
        title={modalState.title}
        rightButton={{
          text: "확인",
          onPress: confirmAction,
        }}
        leftButton={
          modalState.type === "CONFIRM_ENROLL" ||
          modalState.type === "CONFIRM_DROP"
            ? { text: "취소", onPress: closeModal, color: Color.tertiary.main }
            : undefined
        }
      >
        <ThemedText variant="text1" color={Color.text.main}>
          {modalState.message}
        </ThemedText>
      </BaseModal>

      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
    paddingTop: Layout.spacing.l,
    paddingHorizontal: Layout.spacing.l,
  },
  quoteBox: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
    ...Layout.shadow.default,
  },
  quoteTitle: {
    textAlign: "center",
    marginBottom: Layout.spacing.m,
  },
  quoteIntroduction: {
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: Layout.spacing.m,
  },
  infoSection: {
    paddingBottom: 20,
  },
  instructorBio: {
    marginTop: -Layout.spacing.l,
  },
  divider: {
    height: 1,
    backgroundColor: Color.text.main,
    opacity: 0.1,
    marginBottom: Layout.spacing.l,
    marginTop: -Layout.spacing.s,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Color.default.background,
    padding: Layout.spacing.l,
    paddingBottom: Layout.spacing.l,
    borderTopWidth: 2,
    borderTopColor: "#eee",
  },
});
