import * as Linking from 'expo-linking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { useAuthStore } from '@shared/stores/useAuthStore';

import { Ionicons } from '@expo/vector-icons';
import { Button } from '@shared/components/button/Button';
import { Header } from '@shared/components/header/Header';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { formatDateTimePretty } from '@shared/utils/dateFormat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useCarpoolDetailViewModel } from './useCarpoolDetailViewModel';

let MapView: any = null;
let Marker: any = null;
if (Platform.OS !== 'web') {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
}

const RETREAT_NAME = '딱따구리 수련원';

export default function CarpoolDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthStore();

  const { carpool, isDriver, isMember, load, join, leave, toEdit, deleteCarpool } =
    useCarpoolDetailViewModel({
      carpoolId: Number(id),
      userId: user?.id ?? 0,
    });

  useEffect(() => {
    if (id) load();
  }, [id, load]);

  if (!carpool) return null;

  const isToRetreat = carpool.destinationDetailed === RETREAT_NAME;

  // ✅ 지도 기준
  const mapLat = Number(isToRetreat ? carpool.originLat : carpool.destLat);
  const mapLng = Number(isToRetreat ? carpool.originLng : carpool.destLng);

  const mapRegion = useMemo(() => {
    if (!Number.isFinite(mapLat) || !Number.isFinite(mapLng)) return null;
    return {
      latitude: mapLat,
      longitude: mapLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [mapLat, mapLng]);

  const currentMembers =
    carpool.seatsTotal && carpool.seatsLeft != null
      ? carpool.seatsTotal - carpool.seatsLeft
      : undefined;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.default.background }}>
      <Header
        title={`${carpool.driver.name}님의 카풀`}
        onBack={() => router.back()}
        rightContent={
          <TouchableOpacity style={{ padding: 4 }} onPress={() => Linking.openURL(`tel:${carpool.driver.phone}`)}>
            <Ionicons name="call" size={24} color={Color.text.main} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: Layout.spacing.l, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 28 }}>
          <View style={styles.card}>
            {/* 방향 칩 */}
            <View style={styles.directionChip}>
              <ThemedText variant="text4">
                {isToRetreat ? '🚌 수련회장으로' : '🏠 집으로'}
              </ThemedText>
            </View>

            {/* Driver */}
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <ThemedText variant="heading3">👤</ThemedText>
              </View>
              <View>
                <ThemedText variant="heading3">{carpool.driver.name}</ThemedText>
                <ThemedText variant="text4" color={Color.text.sub}>
                  {carpool.driver.phone} | {carpool.carInfo}
                </ThemedText>
              </View>
            </View>

            {/* Map */}
            <View style={styles.mapWrap}>
              {MapView && mapRegion ? (
                <MapView style={styles.map} initialRegion={mapRegion} scrollEnabled={false}>
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
                    {carpool.originDetailed ? `${carpool.originDetailed}` : ''}({carpool.origin})
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
                        : ''}
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
              <ThemedText variant="text2">
                {formatDateTimePretty(carpool.departureTime)} 출발
              </ThemedText>
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

            {/* 노트 */}
            {!!carpool.note && (
              <View style={styles.infoRow}>
                <View style={styles.iconCircle}>
                  <ThemedText variant="text2">⚡</ThemedText>
                </View>
                <ThemedText variant="text2">{carpool.note}</ThemedText>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
}
