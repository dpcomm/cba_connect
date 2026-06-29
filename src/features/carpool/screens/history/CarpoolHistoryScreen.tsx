import React from "react";
import { FlatList, Pressable, ScrollView, View } from "react-native";

import { useRouter } from "expo-router";

import { EmptyState } from "@shared/components/empty-state/EmptyState";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Layout } from "@shared/constants/layout";

import CarpoolDriverIcon from "../../../../../assets/svgs/carpool_driver.svg";
import CarpoolGuestIcon from "../../../../../assets/svgs/carpool_guest.svg";

import { Header } from "@shared/components/header/Header";
import { Color } from "@shared/constants/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusChipMeta } from "./getCarpoolStatusChip";
import { styles } from "./styles";
import { useCarpoolHistoryViewModel } from "./useCarpoolHistoryViewModel";

export default function CarpoolHistoryScreen() {
  const router = useRouter();
  const { items, onPressItem } = useCarpoolHistoryViewModel();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.default.background }}
    >
      <Header title="카풀 전체 내역" onBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Layout.spacing.l,
          paddingBottom: 40,
          paddingTop: Layout.spacing.l,
        }}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <EmptyState message="카풀 이용한 이력이 없습니다." />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(it) => String(it.id)}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const RoleIcon = item.isDriver
                ? CarpoolDriverIcon
                : CarpoolGuestIcon;

              const chip = getStatusChipMeta(item.status);

              return (
                <Pressable
                  onPress={() => onPressItem(item.id)}
                  style={styles.card}
                >
                  <View style={styles.topRow}>
                    <View style={styles.roleIconWrap}>
                      <RoleIcon width={25} height={25} />
                    </View>

                    <ThemedText variant="heading3" style={styles.dateText}>
                      {item.dateText}
                    </ThemedText>

                    <View
                      style={[
                        styles.statusChip,
                        { backgroundColor: chip.backgroundColor },
                      ]}
                    >
                      <ThemedText
                        variant="text4"
                        style={[styles.statusChip, { color: chip.textColor }]}
                      >
                        {chip.label}
                      </ThemedText>
                    </View>
                  </View>

                  {/* Info rows */}
                  <View style={styles.row}>
                    <ThemedText variant="text2" style={styles.label}>
                      출발지
                    </ThemedText>
                    <ThemedText variant="text2" style={styles.value}>
                      {item.originDisplay}
                    </ThemedText>
                  </View>

                  <View style={styles.row}>
                    <ThemedText variant="text2" style={styles.label}>
                      출발 시간
                    </ThemedText>
                    <ThemedText variant="text2" style={styles.value}>
                      {item.timeText}
                    </ThemedText>
                  </View>

                  <View style={styles.row}>
                    <ThemedText variant="text2" style={styles.label}>
                      탑승 인원
                    </ThemedText>
                    <ThemedText variant="text2" style={styles.value}>
                      {item.seatText}
                    </ThemedText>
                  </View>

                  <View style={styles.row}>
                    <ThemedText variant="text2" style={styles.label}>
                      도착지
                    </ThemedText>
                    <ThemedText variant="text2" style={styles.value}>
                      {item.destDisplay}
                    </ThemedText>
                  </View>
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={{ height: Layout.spacing.m }} />
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
