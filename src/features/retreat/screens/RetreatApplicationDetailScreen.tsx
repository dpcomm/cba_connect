import { Button } from "@shared/components/button/Button";
import { Header } from "@shared/components/header/Header";
import { BaseModal } from "@shared/components/modal/BaseModal";
import { SelectBox } from "@shared/components/select-box/SelectBox";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles as formStyles } from "./RetreatApplicationFormScreen.styles";
import { styles } from "./RetreatApplicationDetailScreen.styles";
import {
  APPLICATION_STATUS_LABEL,
  useRetreatApplicationDetailViewModel,
} from "./useRetreatApplicationDetailViewModel";
import { MEAL_TYPE_LABEL } from "./useRetreatApplicationFormViewModel";

export default function RetreatApplicationDetailScreen() {
  const vm = useRetreatApplicationDetailViewModel();

  useFocusEffect(
    useCallback(() => {
      vm.load();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Header title="수련회 신청 조회" onBack={vm.handleBack} />

      {vm.loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={Color.primary.main} />
        </View>
      ) : vm.error ? (
        <View style={styles.centered}>
          <ThemedText variant="text2" style={styles.errorText}>
            {vm.error}
          </ThemedText>
          <Pressable onPress={vm.load} hitSlop={10}>
            <ThemedText
              variant="text2"
              color={Color.primary.main}
              style={{ marginTop: 8 }}
            >
              다시 시도
            </ThemedText>
          </Pressable>
        </View>
      ) : !vm.detail || vm.detail.status === "CANCELED" ? (
        <View style={styles.centered}>
          <ThemedText variant="text1" color={Color.text.sub}>
            {vm.detail?.status === "CANCELED"
              ? "취소된 신청 내역입니다."
              : "신청 내역이 없습니다."}
          </ThemedText>
          <View style={{ marginTop: 16, width: "60%" }}>
            <Button title="수련회 신청하기" onPress={vm.goToApply} />
          </View>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={formStyles.content}>
            <View style={styles.statusBadge}>
              <ThemedText variant="text3" style={styles.statusBadgeText}>
                {APPLICATION_STATUS_LABEL[vm.detail.status]}
              </ThemedText>
            </View>

            {/* 소속 중그룹 */}
            <View style={formStyles.section}>
              <ThemedText
                variant="text3"
                color={Color.text.main}
                style={formStyles.sectionTitle}
              >
                소속 중그룹
              </ThemedText>
              <SelectBox value={vm.group} placeholder="-" right={<View />} />
            </View>

            {/* 식사 선택 */}
            <View style={formStyles.section}>
              <ThemedText
                variant="text3"
                color={Color.text.main}
                style={formStyles.sectionTitle}
              >
                신청한 식사
              </ThemedText>
              <View style={{ gap: 10 }}>
                {vm.mealRows.map((row) => (
                  <View key={row.mealDay} style={formStyles.mealRow}>
                    <ThemedText variant="text3" style={formStyles.mealDayLabel}>
                      {row.label}
                    </ThemedText>
                    {row.cells.map((cell, idx) => {
                      if (cell.kind === "unavailable") {
                        return (
                          <View
                            key={`${row.mealDay}-${cell.mealType}-${idx}`}
                            style={[
                              formStyles.mealCell,
                              formStyles.mealCellUnavailable,
                            ]}
                          />
                        );
                      }
                      return (
                        <View
                          key={`${row.mealDay}-${cell.id}`}
                          style={[
                            formStyles.mealCell,
                            cell.selected
                              ? formStyles.mealCellSelected
                              : formStyles.mealCellAvailable,
                          ]}
                        >
                          <ThemedText
                            variant="text3"
                            style={
                              cell.selected
                                ? formStyles.mealCellTextSelected
                                : formStyles.mealCellTextAvailable
                            }
                          >
                            {MEAL_TYPE_LABEL[cell.mealType]}
                          </ThemedText>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>

            {/* 교통수단 */}
            <View style={formStyles.section}>
              <ThemedText
                variant="text3"
                color={Color.text.main}
                style={formStyles.sectionTitle}
              >
                교통수단
              </ThemedText>

              <View style={formStyles.transportBlock}>
                <ThemedText variant="text2" style={formStyles.transportLabel}>
                  수련회장 가는 길
                </ThemedText>
                <SelectBox
                  value={vm.departureName}
                  placeholder="-"
                  right={<View />}
                />
              </View>

              <View style={[formStyles.transportBlock, { marginTop: 12 }]}>
                <ThemedText variant="text2" style={formStyles.transportLabel}>
                  집으로 오는 길
                </ThemedText>
                <SelectBox
                  value={vm.returnName}
                  placeholder="-"
                  right={<View />}
                />
              </View>

              {!!vm.vehicleNumber && (
                <View style={[formStyles.transportBlock, { marginTop: 12 }]}>
                  <ThemedText variant="text2" style={formStyles.transportLabel}>
                    차량번호
                  </ThemedText>
                  <SelectBox
                    value={vm.vehicleNumber}
                    placeholder="-"
                    right={<View />}
                  />
                </View>
              )}
            </View>
          </ScrollView>

          {/* 신청 완료(SUBMITTED) 상태에서만 수정/취소 가능 */}
          {vm.detail.status === "SUBMITTED" && (
            <SafeAreaView edges={["bottom"]} style={styles.bottomBar}>
              <Pressable
                onPress={vm.requestCancel}
                disabled={vm.canceling}
                style={[styles.actionBtn, styles.cancelBtn]}
                hitSlop={4}
              >
                <ThemedText variant="text3" style={styles.cancelBtnText}>
                  취소하기
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={vm.handleEdit}
                disabled={vm.canceling}
                style={[styles.actionBtn, styles.editBtn]}
                hitSlop={4}
              >
                <ThemedText variant="text3" style={styles.editBtnText}>
                  수정하기
                </ThemedText>
              </Pressable>
            </SafeAreaView>
          )}
        </>
      )}

      <BaseModal
        visible={vm.confirmCancelVisible}
        onClose={vm.dismissCancel}
        title="신청 취소"
        leftButton={{
          text: "닫기",
          onPress: vm.dismissCancel,
          color: Color.tertiary.main,
        }}
        rightButton={{
          text: "취소하기",
          onPress: vm.confirmCancel,
          color: Color.accents.pink,
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          수련회 신청을 취소하시겠습니까?
        </ThemedText>
      </BaseModal>
    </SafeAreaView>
  );
}
