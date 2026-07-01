import { Header } from "@shared/components/header/Header";
import { BaseModal } from "@shared/components/modal/BaseModal";
import { SelectBox } from "@shared/components/select-box/SelectBox";
import {
  InlineOption,
  InlineSelectModal,
} from "@shared/components/select-inline/InlineSelectModal";
import { TextInput } from "@shared/components/text-input/TextInput";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./RetreatApplicationFormScreen.styles";
import {
  MEAL_TYPE_LABEL,
  useRetreatApplicationFormViewModel,
} from "./useRetreatApplicationFormViewModel";

type DropdownKey =
  | "group"
  | "departureTransport"
  | "returnTransport"
  | null;


export default function RetreatApplicationFormScreen() {
  const vm = useRetreatApplicationFormViewModel();
  const [dropdown, setDropdown] = useState<DropdownKey>(null);

  const groupOptions = useMemo<InlineOption[]>(
    () =>
      vm.options?.groups.map((g) => ({ label: g.label, value: g.value })) ?? [],
    [vm.options],
  );

  const departureOptions = useMemo<InlineOption[]>(
    () =>
      vm.options?.transports.departure.map((t) => ({
        label: t.name,
        value: String(t.id),
      })) ?? [],
    [vm.options],
  );

  const returnOptions = useMemo<InlineOption[]>(
    () =>
      vm.options?.transports.return.map((t) => ({
        label: t.name,
        value: String(t.id),
      })) ?? [],
    [vm.options],
  );

  const headerTitle = vm.isEditMode ? "수련회 신청 수정" : "수련회 신청";

  if (vm.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={headerTitle} onBack={vm.handleBack} />
        <View style={styles.centered}>
          <ActivityIndicator color={Color.primary.main} />
        </View>
      </SafeAreaView>
    );
  }

  if (vm.error || !vm.options) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={headerTitle} onBack={vm.handleBack} />
        <View style={styles.centered}>
          <ThemedText variant="text2" style={styles.errorText}>
            {vm.error ?? "정보를 불러올 수 없어요."}
          </ThemedText>
          <Pressable onPress={vm.reload} hitSlop={10}>
            <ThemedText
              variant="text2"
              color={Color.primary.main}
              style={{ marginTop: 8 }}
            >
              다시 시도
            </ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const submitDisabled = !vm.selectedGroupValue || vm.submitting;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={headerTitle} onBack={vm.handleBack} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
      {/* 수련회 제목 */}
      <View style={styles.retreatSection}>
        <ThemedText
            variant="text3"
            color={Color.primary.main}
            style={styles.retreatTitle}
          >
          {vm.retreatTitle}
        </ThemedText>
      </View>
        {/* 소속 중그룹 */}
        <View style={styles.section}>
          <ThemedText
            variant="text3"
            color={Color.text.main}
            style={styles.sectionTitle}
          >
            소속 중그룹
          </ThemedText>
          <SelectBox
            value={vm.groupLabel}
            placeholder="소속 중그룹을 선택해주세요"
            onPress={() => setDropdown("group")}
          />
        </View>

        {/* 식사 선택 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText
              variant="text3"
              color={Color.text.main}
              style={styles.sectionTitle}
            >
              식사 선택
            </ThemedText>
            <Pressable
              onPress={vm.toggleAllMeals}
              style={[
                styles.allButton,
                !vm.isAllSelected && styles.allButtonInactive,
              ]}
              hitSlop={10}
            >
              <ThemedText variant="text3" style={styles.allButtonText}>
                ALL
              </ThemedText>
            </Pressable>
          </View>

          <View style={{ gap: 10 }}>
            {vm.mealRows.map((row) => (
              <View key={row.mealDay} style={styles.mealRow}>
                <ThemedText variant="text3" style={styles.mealDayLabel}>
                  {row.label}
                </ThemedText>
                {row.cells.map((cell, idx) => {
                  if (cell.kind === "unavailable") {
                    return (
                      <View
                        key={`${row.mealDay}-${cell.mealType}-${idx}`}
                        style={[styles.mealCell, styles.mealCellUnavailable]}
                      />
                    );
                  }
                  return (
                    <Pressable
                      key={`${row.mealDay}-${cell.id}`}
                      onPress={() => vm.toggleMeal(cell.id)}
                      style={[
                        styles.mealCell,
                        cell.selected
                          ? styles.mealCellSelected
                          : styles.mealCellAvailable,
                      ]}
                      hitSlop={4}
                    >
                      <ThemedText
                        variant="text3"
                        style={
                          cell.selected
                            ? styles.mealCellTextSelected
                            : styles.mealCellTextAvailable
                        }
                      >
                        {MEAL_TYPE_LABEL[cell.mealType]}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {/* 교통수단 */}
        <View style={styles.section}>
          <ThemedText
            variant="text3"
            color={Color.text.main}
            style={styles.sectionTitle}
          >
            교통수단
          </ThemedText>

          <View style={styles.transportBlock}>
            <ThemedText variant="text2" style={styles.transportLabel}>
              수련회장 가는 길
            </ThemedText>
            <SelectBox
              value={vm.departureTransport?.name ?? ""}
              placeholder="이동수단 선택"
              onPress={() => setDropdown("departureTransport")}
            />
          </View>

          <View style={[styles.transportBlock, { marginTop: 12 }]}>
            <ThemedText variant="text2" style={styles.transportLabel}>
              집으로 오는 길
            </ThemedText>
            <SelectBox
              value={vm.returnTransport?.name ?? ""}
              placeholder="이동수단 선택"
              onPress={() => setDropdown("returnTransport")}
            />
          </View>

          {/* 가는 길·오는 길 공용 차량번호 (자차 등 차량 필요 수단 선택 시 노출) */}
          {vm.needsVehicle && (
            <View style={[styles.transportBlock, { marginTop: 12 }]}>
              <ThemedText variant="text2" style={styles.transportLabel}>
                차량번호
              </ThemedText>
              <TextInput
                value={vm.vehicleNumber}
                onChangeText={vm.setVehicleNumber}
                placeholder="입력해주세요"
              />
            </View>
          )}
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.bottomBar}>
        <Pressable
          onPress={vm.submit}
          disabled={submitDisabled}
          style={[styles.submitBtn, submitDisabled && styles.submitBtnDisabled]}
          hitSlop={10}
        >
          {vm.submitting ? (
            <ActivityIndicator color={Color.text.white} />
          ) : (
            <ThemedText variant="text3" style={styles.submitText}>
              {vm.isEditMode ? "수정하기" : "신청하기"}
            </ThemedText>
          )}
        </Pressable>
      </SafeAreaView>

      <InlineSelectModal
        visible={dropdown === "group"}
        title="소속 중그룹 선택"
        options={groupOptions}
        selectedValue={vm.selectedGroupValue ?? undefined}
        onClose={() => setDropdown(null)}
        onSelect={(opt) => vm.setSelectedGroupValue(opt.value)}
      />

      <InlineSelectModal
        visible={dropdown === "departureTransport"}
        title="수련회장 가는 길"
        options={departureOptions}
        selectedValue={
          vm.departureTransportId != null
            ? String(vm.departureTransportId)
            : undefined
        }
        onClose={() => setDropdown(null)}
        onSelect={(opt) => vm.setDepartureTransportId(Number(opt.value))}
      />

      <InlineSelectModal
        visible={dropdown === "returnTransport"}
        title="집으로 오는 길"
        options={returnOptions}
        selectedValue={
          vm.returnTransportId != null
            ? String(vm.returnTransportId)
            : undefined
        }
        onClose={() => setDropdown(null)}
        onSelect={(opt) => vm.setReturnTransportId(Number(opt.value))}
      />

      <BaseModal
        visible={vm.showLoadExistingModal}
        onClose={vm.dismissLoadExisting}
        title="기존 신청서"
        leftButton={{
          text: "아니오",
          onPress: vm.dismissLoadExisting,
          color: Color.tertiary.main,
        }}
        rightButton={{
          text: "네",
          onPress: vm.confirmLoadExisting,
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          기존 신청서가 있습니다. 불러오시겠습니까?
        </ThemedText>
      </BaseModal>
    </SafeAreaView>
  );
}
