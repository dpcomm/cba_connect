import React from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { Header } from '@shared/components/header/Header';
import { Layout } from '@shared/constants/layout';

import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { styles } from './styles';
import { useCarpoolHistoryViewModel } from './useCarpoolHistoryViewModel';

export default function CarpoolHistoryScreen() {
  const { items, onPressItem } = useCarpoolHistoryViewModel();

  return (
    <View style={styles.container}>
      <Header title="카풀 전체 내역" />

      {items.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <View style={styles.emptyCard}>
            <ThemedText variant="text2" style={styles.emptyText}>
              카풀 이용한 이력이 없습니다.
            </ThemedText>
          </View>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={items}
          keyExtractor={(it) => String(it.id)}
          renderItem={({ item }) => {
            const roleLabel = item.isDriver ? '드라이버' : '게스트';
            const roleIcon = item.isDriver ? '🛞' : '✋'; // 핸들/손 아이콘 (이모지로 간단히)

            return (
              <Pressable onPress={() => onPressItem(item.id)} style={styles.card}>
                {/* Top row: icon + date + chip */}
                <View style={styles.topRow}>
                  <ThemedText variant="heading2" style={styles.leftIcon}>
                    {roleIcon}
                  </ThemedText>

                  <ThemedText variant="heading2" style={styles.dateText}>
                    {item.dateText}
                  </ThemedText>

                  <View style={styles.roleChip}>
                    <ThemedText variant="text2" style={styles.roleChipText}>
                      {roleLabel}
                    </ThemedText>
                  </View>
                </View>

                {/* Info rows */}
                <View style={styles.row}>
                  <ThemedText variant="text2" style={styles.label}>
                    만나는 장소
                  </ThemedText>
                  <ThemedText variant="text2" style={styles.value}>
                    {item.originDisplay}
                  </ThemedText>
                </View>

                <View style={styles.row}>
                  <ThemedText variant="text2" style={styles.label}>
                    만나는 시간
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
          ItemSeparatorComponent={() => <View style={{ height: Layout.spacing.m }} />}
        />
      )}
    </View>
  );
}
