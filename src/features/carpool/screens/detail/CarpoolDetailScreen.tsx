import * as Linking from 'expo-linking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { useAuthStore } from '@shared/stores/useAuthStore';

import { Color } from '@shared/constants/color';
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

function formatDeparturePretty(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';

  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const min = d.getMinutes();

  let period = '오전';
  if (h >= 18) period = '저녁';
  else if (h >= 12) period = '오후';

  const hh = h % 12 === 0 ? 12 : h % 12;
  const mm = min === 0 ? '' : ` ${min}분`;

  return `${m}월 ${day}일 ${period} ${hh}시${mm} 출발`;
}

export default function CarpoolDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const me = useAuthStore((s) => s.user);

  const { carpool, isDriver, isMember, load, join, leave } =
    useCarpoolDetailViewModel({
      carpoolId: Number(id),
      userId: me?.id ?? 0,
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerSide}>
          <ThemedText variant="heading3">←</ThemedText>
        </Pressable>
        <ThemedText variant="heading3" style={styles.headerTitle}>
          {carpool.driver.name}님의 카풀
        </ThemedText>
        <Pressable
          style={styles.headerSide}
          onPress={() => Linking.openURL(`tel:${carpool.driver.phone}`)}
        >
          <ThemedText variant="heading3">☎</ThemedText>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
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
                  {carpool.origin}
                  {carpool.originDetailed ? `\n${carpool.originDetailed}` : ''}
                </ThemedText>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.infoRow}>
                <View style={styles.iconCircle}>
                  <ThemedText variant="text2">📍</ThemedText>
                </View>
                <View style={styles.infoTextCol}>
                  <ThemedText variant="text3">출발 위치</ThemedText>
                  <ThemedText variant="text2">{RETREAT_NAME}</ThemedText>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.iconCircle}>
                  <ThemedText variant="text2">📌</ThemedText>
                </View>
                <View style={styles.infoTextCol}>
                  <ThemedText variant="text3">도착 위치</ThemedText>
                  <ThemedText variant="text2">
                    {carpool.destination}
                    {carpool.destinationDetailed
                      ? `\n${carpool.destinationDetailed}`
                      : ''}
                  </ThemedText>
                </View>
              </View>
            </>
          )}

          {/* ⏰ 시간 (❗절대 변경 안 함) */}
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <ThemedText variant="text2">🕒</ThemedText>
            </View>
            <ThemedText variant="text2">
              {formatDeparturePretty(carpool.departureTime)}
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
      </ScrollView>
    </View>
  );
}
