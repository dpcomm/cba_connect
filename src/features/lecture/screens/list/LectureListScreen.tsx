import { Header } from "@shared/components/header/Header";
import { LoadingOverlay } from "@shared/components/loading-overlay/LoadingOverlay";
import { RefreshableScrollView } from "@shared/components/refreshable-scroll-view/RefreshableScrollView";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LectureCard } from "../../components/LectureCard";
import { useLectureListViewModel } from "./useLectureListViewModel";

import { BaseModal } from "@shared/components/modal/BaseModal";
import { ThemedText } from "@shared/components/themed-text/ThemedText";

export default function LectureListScreen() {
  const {
    lectures,
    term,
    myAppliedId,
    isLoading,
    refresh,
    navigateToDetail,
    goBack,
    cancelModal,
    requestCancel,
  } = useLectureListViewModel();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.default.background }}
    >
      <Header title="선택식 강의" onBack={goBack} />
      <RefreshableScrollView
        isRefreshing={isLoading}
        onRefresh={refresh}
        contentContainerStyle={{
          paddingHorizontal: Layout.spacing.l,
          paddingTop: Layout.spacing.l,
        }}
      >
        {(() => {
          const now = new Date();
          const isWaiting = !!term && new Date(term.startDate) > now;
          const isClosed = !!term && new Date(term.endDate) < now;

          return lectures.map((lecture) => {
          let status: "WAITING" | "OPEN" | "APPLIED" | "DISABLED" = "OPEN";

          if (myAppliedId === lecture.id) {
            status = "APPLIED";
          } else if (isClosed) {
            status = "DISABLED";
          } else if (myAppliedId !== null) {
            status = "DISABLED";
          } else if (isWaiting) {
            status = "WAITING";
          }

          return (
            <LectureCard
              key={lecture.id}
              lecture={lecture}
              status={status}
              openAt={term?.startDate}
              isClosed={isClosed}
              onPress={() => navigateToDetail(lecture.id)}
              onCancel={
                status === "APPLIED"
                  ? () => requestCancel(lecture.id)
                  : undefined
              }
            />
          );
          });
        })()}
      </RefreshableScrollView>

      <BaseModal
        visible={cancelModal.visible}
        onClose={cancelModal.close}
        title="신청 취소"
        rightButton={{
          text: "확인",
          onPress: cancelModal.confirm,
        }}
        leftButton={{
          text: "취소",
          onPress: cancelModal.close,
          color: Color.tertiary.main,
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          수강 신청을 취소하시겠습니까?
        </ThemedText>
      </BaseModal>

      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  );
}
