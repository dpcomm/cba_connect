import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, View } from "react-native";

import { TextInput } from "@shared/components/text-input/TextInput";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";

import { AddressSearchModal } from "@shared/components/address/AddressSearchModal";

import { Header } from "@shared/components/header/Header";
import { BaseModal } from "@shared/components/modal/BaseModal";
import { SelectBox } from "@shared/components/select-box/SelectBox";
import {
    InlineOption,
    InlineSelectModal,
} from "@shared/components/select-inline/InlineSelectModal";
import { Layout } from "@shared/constants/layout";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useCarpoolEditScreenViewModel } from "./useCarpoolEditScreenViewModel";

// 네이티브에서만 로드
let MapView: any = null;
let Marker: any = null;
if (Platform.OS !== "web") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const maps = require("react-native-maps");
  MapView = maps.default;
  Marker = maps.Marker;
}

const SEOUL_REGION = {
  latitude: 37.5665,
  longitude: 126.978,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

function FieldBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.fieldBlock}>
      <ThemedText
        variant="text3"
        color={Color.text.main}
        style={styles.fieldLabel}
      >
        {label}
      </ThemedText>
      {children}
    </View>
  );
}

export default function CarpoolEditScreen() {
  const {
    isHome,

    driverName,
    carInfo,
    setCarInfo,
    capacity,
    incCapacity,
    decCapacity,

    phone,
    mainPickup,
    setMainPickup,
    memo,
    setMemo,

    date,
    setDate,
    hour,
    setHour,
    minute,
    setMinute,
    DATE_OPTIONS,
    HOUR_OPTIONS,
    MINUTE_OPTIONS,

    origin,
    setOrigin,
    dest,
    setDest,
    originDisabled,
    destDisabled,
    editableMarker,

    submit,
    confirmSubmit,
    modalState,
    closeModal,
  } = useCarpoolEditScreenViewModel();

  const mapRef = useRef<any>(null);

  const [openDropdown, setOpenDropdown] = useState<
    null | "date" | "hour" | "minute"
  >(null);
  const [addressModalOpen, setAddressModalOpen] = useState<
    null | "origin" | "dest"
  >(null);

  const dateOptions: InlineOption[] = useMemo(
    () => DATE_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
    [DATE_OPTIONS],
  );
  const hourOptions: InlineOption[] = useMemo(
    () => HOUR_OPTIONS.map((h) => ({ label: h, value: h })),
    [HOUR_OPTIONS],
  );
  const minuteOptions: InlineOption[] = useMemo(
    () => MINUTE_OPTIONS.map((m) => ({ label: m, value: m })),
    [MINUTE_OPTIONS],
  );

  const dateLabel = useMemo(() => {
    return DATE_OPTIONS.find((o) => o.value === date)?.label ?? date;
  }, [DATE_OPTIONS, date]);

  useEffect(() => {
    if (!editableMarker || Platform.OS === "web" || !mapRef.current) return;

    mapRef.current.animateToRegion(
      {
        latitude: editableMarker.lat,
        longitude: editableMarker.lng,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
      250,
    );
  }, [editableMarker]);

  // 한 명 이상 등록 가능
  const minusDisabled = capacity <= 1;

  // ✅ 지도는 “활성 필드 아래”로: HOME이면 dest 아래 / RETREAT이면 origin 아래 (5번)
  const mapSection = useMemo(() => {
    if (Platform.OS === "web" || !MapView) return null;

    return (
      <View style={styles.mapBox}>
        <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={SEOUL_REGION}>
          {editableMarker && (
            <Marker
              coordinate={{
                latitude: editableMarker.lat,
                longitude: editableMarker.lng,
              }}
            />
          )}
        </MapView>

        {!editableMarker && (
          <View style={styles.mapOverlay}>
            <ThemedText variant="text2" color={Color.text.sub}>
              주소를 선택하면 지도에 표시돼요.
            </ThemedText>
          </View>
        )}
      </View>
    );
  }, [editableMarker]);

  const mainPickupSection = useMemo(() => {
    return (
      <View style={styles.fieldBlock}>
        <View style={styles.labelRow}>
          <ThemedText variant="text3" color={Color.text.main}>
            주요 위치
          </ThemedText>
          <ThemedText
            variant="text4"
            color={Color.text.sub}
            style={styles.helperText}
          >
            ※ 카풀 리스트에 표시될 위치를 입력하세요.
          </ThemedText>
        </View>

        <TextInput
          value={mainPickup}
          onChangeText={setMainPickup}
          placeholder="예: 신도림역 1번 출구 앞"
        />
      </View>
    );
  }, [mainPickup, setMainPickup]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.default.background }}
    >
      {openDropdown && (
        <Pressable
          style={styles.dropdownDismissOverlay}
          onPress={() => setOpenDropdown(null)}
        />
      )}
      <Header title="카풀 수정" onBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Layout.spacing.l,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 29 }}>
          <FieldBlock label="운전자명">
            <TextInput value={driverName} disabled placeholder="운전자명" />
          </FieldBlock>

          <FieldBlock label="연락처">
            <TextInput
              value={phone}
              disabled
              placeholder="010-0000-0000"
              keyboardType="phone-pad"
            />
          </FieldBlock>

          <FieldBlock label="내 차 정보">
            <TextInput
              value={carInfo}
              onChangeText={setCarInfo}
              placeholder="예: 셀토스/흰색/00가0000"
            />
          </FieldBlock>

          <FieldBlock label="탑승 인원(운전자 포함)">
            <View style={styles.stepperRow}>
              <Pressable
                onPress={decCapacity}
                disabled={minusDisabled}
                style={[
                  styles.stepperBtnLeft,
                  minusDisabled && styles.stepperBtnDisabled, // ✅ (4번)
                ]}
                hitSlop={10}
              >
                <ThemedText variant="heading3" style={styles.stepperBtnText}>
                  -
                </ThemedText>
              </Pressable>

              <View style={styles.stepperValue}>
                <ThemedText variant="text2" style={styles.stepperValueText}>
                  {capacity}
                </ThemedText>
              </View>

              <Pressable
                onPress={incCapacity}
                style={styles.stepperBtnRight}
                hitSlop={10}
              >
                <ThemedText variant="heading3" style={styles.stepperBtnText}>
                  +
                </ThemedText>
              </Pressable>
            </View>
          </FieldBlock>

          {/* ✅ 날짜/시간 */}
          <FieldBlock label="날짜/시간">
            <View style={styles.dateTimeRow}>
              <View style={styles.dateCol}>
                <View style={styles.inlineAnchor}>
                  <SelectBox
                    value={dateLabel}
                    onPress={() =>
                      setOpenDropdown((v) => (v === "date" ? null : "date"))
                    }
                  />
                </View>
              </View>
              <View style={styles.timeCol}>
                <View style={styles.inlineAnchor}>
                  <SelectBox
                    value={hour}
                    onPress={() =>
                      setOpenDropdown((v) => (v === "hour" ? null : "hour"))
                    }
                  />
                </View>
              </View>
              <View style={styles.timeCol}>
                <View style={styles.inlineAnchor}>
                  <SelectBox
                    value={minute}
                    onPress={() =>
                      setOpenDropdown((v) => (v === "minute" ? null : "minute"))
                    }
                  />
                </View>
              </View>
            </View>
          </FieldBlock>

          {/* 출발지/도착지 */}
          {/* ✅ RETREAT일 때 출발지 */}
          <View style={styles.fieldBlock}>
            <ThemedText
              variant="text3"
              color={Color.text.main}
              style={styles.fieldLabel}
            >
              출발지
            </ThemedText>
            <SelectBox
              value={
                originDisabled ? (origin.detail ?? "") : origin.roadAddress
              }
              placeholder={
                originDisabled ? origin.roadAddress : "도로명 주소 검색"
              }
              disabled={originDisabled}
              right={<ThemedText variant="text2">🔍</ThemedText>}
              onPress={() => {
                if (!originDisabled) setAddressModalOpen("origin");
              }}
            />
            {!isHome && (
              <>
                {mapSection}
                {mainPickupSection}
              </>
            )}
          </View>

          {/* ✅ HOME일 때 도착지 활성 */}
          <View style={styles.fieldBlock}>
            <ThemedText
              variant="text3"
              color={Color.text.main}
              style={styles.fieldLabel}
            >
              도착지
            </ThemedText>
            <SelectBox
              value={destDisabled ? (dest.detail ?? "") : dest.roadAddress}
              placeholder={destDisabled ? dest.roadAddress : "도로명 주소 검색"}
              disabled={destDisabled}
              right={<ThemedText variant="text2">🔍</ThemedText>}
              onPress={() => {
                if (!destDisabled) setAddressModalOpen("dest");
              }}
            />
            {isHome && (
              <>
                {mapSection}
                {mainPickupSection}
              </>
            )}
          </View>

          {/* 메모 */}
          <FieldBlock label="메모">
            <TextInput
              value={memo}
              onChangeText={setMemo}
              placeholder="시간 엄수, 커피 사주시면 감사, 도착하면 전화주세요 등"
              multiline
              textAlignVertical="top"
              inputStyle={{ paddingTop: Layout.spacing.s }}
              containerStyle={styles.memoContainer}
            />
          </FieldBlock>

          {/* 버튼 */}
          <Pressable
            onPress={confirmSubmit}
            style={styles.submitBtn}
            hitSlop={10}
          >
            <ThemedText variant="text2" style={styles.submitText}>
              수정하기
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>

      {/* 사용 모달 */}
      <InlineSelectModal
        visible={openDropdown === "date"}
        title="날짜 선택"
        options={dateOptions}
        selectedValue={date}
        onClose={() => setOpenDropdown(null)}
        onSelect={(opt) => setDate(opt.value)}
      />

      <InlineSelectModal
        visible={openDropdown === "hour"}
        title="시간 선택"
        options={hourOptions}
        selectedValue={hour}
        onClose={() => setOpenDropdown(null)}
        onSelect={(opt) => setHour(opt.value)}
      />

      <InlineSelectModal
        visible={openDropdown === "minute"}
        title="분 선택"
        options={minuteOptions}
        selectedValue={minute}
        onClose={() => setOpenDropdown(null)}
        onSelect={(opt) => setMinute(opt.value)}
      />

      <AddressSearchModal
        visible={addressModalOpen != null}
        title={
          addressModalOpen === "origin"
            ? "출발지 검색(도로명)"
            : "도착지 검색(도로명)"
        }
        onClose={() => setAddressModalOpen(null)}
        onSelect={(r) => {
          if (addressModalOpen === "origin") {
            setOrigin({
              roadAddress: r.roadAddress,
              lat: r.lat,
              lng: r.lng,
              detail: origin.detail,
            });
          } else {
            setDest({
              roadAddress: r.roadAddress,
              lat: r.lat,
              lng: r.lng,
              detail: dest.detail,
            });
          }
          setAddressModalOpen(null);
        }}
      />

      <BaseModal
        visible={modalState.visible}
        onClose={closeModal}
        title={modalState.title}
        leftButton={
          modalState.cancelText
            ? {
                text: modalState.cancelText,
                onPress: () => {
                  if (modalState.onCancel) modalState.onCancel();
                  closeModal();
                },
                color: Color.tertiary.main,
              }
            : undefined
        }
        rightButton={{
          text: modalState.confirmText ?? "확인",
          onPress: () => {
            if (modalState.onConfirm) modalState.onConfirm();
            closeModal();
          },
        }}
      >
        <ThemedText variant="text1" color={Color.text.main}>
          {modalState.message}
        </ThemedText>
      </BaseModal>
    </SafeAreaView>
  );
}
