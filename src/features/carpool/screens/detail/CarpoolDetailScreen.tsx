import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { container } from "tsyringe";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@shared/components/themed-text/ThemedText";

import { Ionicons } from "@expo/vector-icons";
import { Button } from "@shared/components/button/Button";
import { Header } from "@shared/components/header/Header";
import { BaseModal } from "@shared/components/modal/BaseModal";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { formatDateTimePretty } from "@shared/utils/dateFormat";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useCarpoolDetailViewModel } from "./useCarpoolDetailViewModel";

import CarpoolDriverIcon from "../../../../../assets/svgs/carpool_driver.svg";
import CarpoolGuestIcon from "../../../../../assets/svgs/carpool_guest.svg";

let MapView: any = null;
let Marker: any = null;
if (Platform.OS !== "web") {
  const maps = require("react-native-maps");
  MapView = maps.default;
  Marker = maps.Marker;
}

const DEFAULT_RETREAT_NAME = "서울성락교회";

export default function CarpoolDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [retreatName, setRetreatName] = useState(DEFAULT_RETREAT_NAME);

  useEffect(() => {
    const fetchRetreatName = async () => {
      try {
        const getSystemConfigUseCase = container.resolve(GetSystemConfigUseCase);
        const config = await getSystemConfigUseCase.execute();
        if (config.currentRetreat?.location) {
          setRetreatName(config.currentRetreat.location);
        } else if (config.currentRetreat?.title) {
          setRetreatName(config.currentRetreat.title);
        }
      } catch (err) {
        console.error("Failed to load retreat name in detail screen:", err);
      }
    };
    fetchRetreatName();
  }, []);

  const {
    carpool,
    isDriver,
    isMember,
    load,
    join,
    leave,
    toEdit,
    deleteCarpool,
    modalState,
    closeModal,
  } = useCarpoolDetailViewModel({
    carpoolId: Number(id),
  });

  useEffect(() => {
    if (id) load();
  }, [id, load]);

  const mapRegion = useMemo(() => {
    if (!carpool) return null;
    const isToRetreat = carpool.destinationDetailed === retreatName;
    const mapLat = Number(isToRetreat ? carpool.originLat : carpool.destLat);
    const mapLng = Number(isToRetreat ? carpool.originLng : carpool.destLng);

    if (!Number.isFinite(mapLat) || !Number.isFinite(mapLng)) return null;
    return {
      latitude: mapLat,
      longitude: mapLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [carpool, retreatName]);

  if (!carpool) return null;
  const driverId = carpool?.driver?.id ?? carpool?.driverId;
  const passengerList = Array.isArray(carpool?.members) ? carpool.members : [];

  const isToRetreat = carpool.destinationDetailed === retreatName;

  const currentMembers =
    carpool.seatsTotal && carpool.seatsLeft != null
      ? carpool.seatsTotal - carpool.seatsLeft
      : undefined;

  // ✅ 정원 마감 여부
  const isFull =
    carpool.seatsTotal != null &&
    carpool.seatsLeft != null &&
    carpool.seatsLeft <= 0;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.default.background }}
    >
      <Header
        title={`${carpool.driver.name}님의 카풀`}
        onBack={() => router.back()}
        rightContent={
          <TouchableOpacity
            style={{ padding: 4 }}
            onPress={() => Linking.openURL(`tel:${carpool.driver.phone}`)}
          >
            <Ionicons name="call" size={24} color={Color.text.main} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Layout.spacing.l,
          paddingBottom: 100,
          paddingTop: Layout.spacing.l,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 28 }}>
          <View style={styles.card}>
            {/* 방향 칩 */}
            <View style={styles.directionChip}>
              <ThemedText variant="text4">
                {isToRetreat ? "🚌 수련회장으로" : "🏠 집으로"}
              </ThemedText>
            </View>

            {/* Driver */}
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <ThemedText variant="heading3">👤</ThemedText>
              </View>
              <View style={styles.profileInfo}>
                <ThemedText variant="heading3">
                  {carpool.driver.name}
                </ThemedText>
                <ThemedText variant="text4" color={Color.text.sub}>
                  {carpool.driver.phone}
                </ThemedText>
                <ThemedText variant="text4" color={Color.text.sub}>
                  {carpool.carInfo}
                </ThemedText>
              </View>
            </View>

            {/* Map */}
            <View style={styles.mapWrap}>
              {MapView && mapRegion ? (
                <MapView
                  style={styles.map}
                  initialRegion={mapRegion}
                  scrollEnabled={false}
                >
                  <Marker coordinate={mapRegion} />
                </MapView>
              ) : (
                <View style={styles.mapPlaceholder}>
                  <ThemedText variant="text4">위치 표시</ThemedText>
                </View>
              )}
            </View>

            {/* 위치 정보 */}
            {isToRetreat ? (
              <View style={styles.infoRow}>
                <View style={styles.iconCircle}>
                  <ThemedText variant="text2">📍</ThemedText>
                </View>
                <View style={styles.infoTextCol}>
                  <ThemedText variant="text3">출발 위치</ThemedText>
                  <ThemedText variant="text2">
                    {carpool.originDetailed ? `${carpool.originDetailed}` : ""}(
                    {carpool.origin})
                  </ThemedText>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.infoRow}>
                  <View style={styles.iconCircle}>
                    <ThemedText variant="text2">📌</ThemedText>
                  </View>
                  <View style={styles.infoTextCol}>
                    <ThemedText variant="text3">도착 위치</ThemedText>
                    <ThemedText variant="text2">
                      {carpool.destinationDetailed
                        ? `${carpool.destinationDetailed}`
                        : ""}
                      ({carpool.destination})
                    </ThemedText>
                  </View>
                </View>
              </>
            )}

            {/* 시간 */}
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <ThemedText variant="text2">🕒</ThemedText>
              </View>
              <View style={styles.infoTextCol}>
                <ThemedText variant="text2">
                  {formatDateTimePretty(carpool.departureTime)} 출발
                </ThemedText>
              </View>
            </View>

            {/* 인원 */}
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <ThemedText variant="text2">👥</ThemedText>
              </View>
              <ThemedText variant="text2">
                현재 {currentMembers}명 / 정원 {carpool.seatsTotal}명
              </ThemedText>
            </View>

            {/* ✅ 탑승자 목록: 리스트만 배경 */}
            {/* ✅ 탑승자 목록: 멤버이고 + 운전자 제외 후 1명 이상일 때만 */}
            {isMember && passengerList.length > 0 && (
              <View style={styles.passengerBox}>
                <View style={styles.passengerList}>
                  {passengerList.map((m: any, idx: number) => {
                    const memberId = m?.id ?? m?.user?.id ?? 0;
                    const name = m?.name ?? m?.user?.name ?? "-";
                    const rawPhone = String(
                      m?.phone ?? m?.user?.phone ?? "",
                    ).trim();
                    const digits = rawPhone.replace(/\D/g, "");

                    let masked = "";
                    if (digits.length === 11) {
                      masked = `${digits.slice(0, 3)}-xxxx-${digits.slice(7)}`;
                    } else if (digits.length === 10) {
                      masked = `${digits.slice(0, 3)}-xxxx-${digits.slice(6)}`;
                    }

                    return (
                      <View
                        key={String(m?.userId ?? m?.id ?? m?.user?.id ?? idx)}
                        style={styles.passengerRow}
                      >
                        <View style={styles.passengerIcon}>
                          {driverId === memberId ? (
                            <CarpoolDriverIcon width={16} height={16} />
                          ) : (
                            <CarpoolGuestIcon width={16} height={16} />
                          )}
                        </View>
                        <ThemedText
                          variant="text2"
                          style={styles.passengerNamePhone}
                          numberOfLines={1}
                        >
                          {name} {masked ? `| ${masked}` : ""}
                        </ThemedText>

                        {/* ✅ 전화 아이콘: 운전자일 때만 */}
                        {isDriver && digits && (
                          <TouchableOpacity
                            style={styles.passengerCallBtn}
                            onPress={() => Linking.openURL(`tel:${digits}`)}
                          >
                            <Ionicons
                              name="call"
                              size={14}
                              color={Color.text.main}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {/* 노트 */}
            {!!carpool.note && (
              <View style={styles.infoRow}>
                <View style={styles.iconCircle}>
                  <ThemedText variant="text2">⚡</ThemedText>
                </View>
                <View style={styles.infoTextCol}>
                  <ThemedText variant="text2">{carpool.note}</ThemedText>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      {/* 하단 버튼 */}
      <View style={styles.bottomBar}>
        {isDriver ? (
          <View style={styles.bottomButtonRow}>
            <Button
              title="수정하기"
              onPress={() => toEdit(carpool.id)}
              size="large"
              textVariant="text1"
              style={styles.bottomButtonHalf}
            />
            <Button
              title="삭제하기"
              onPress={deleteCarpool}
              size="large"
              textVariant="text1"
              style={styles.deleteButtonHalf}
            />
          </View>
        ) : isMember ? (
          <Button
            title="취소하기"
            onPress={leave}
            size="large"
            textVariant="text1"
            style={styles.bottomButton}
          />
        ) : isFull ? (
          <Button
            title="마감"
            onPress={() => {}}
            disabled
            size="large"
            textVariant="text1"
            style={styles.bottomButton}
          />
        ) : (
          <Button
            title="신청하기"
            onPress={join}
            size="large"
            textVariant="text1"
            style={styles.bottomButton}
          />
        )}
      </View>

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
