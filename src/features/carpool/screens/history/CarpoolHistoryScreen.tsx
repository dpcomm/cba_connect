import { ThemedText } from '@shared/components/themed-text/ThemedText';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { useCarpoolHistoryViewModel } from './useCarpoolHistoryViewModel';

export default function CarpoolHistoryScreen() {
  const { items, goBack } = useCarpoolHistoryViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.headerSide} hitSlop={10}>
          <ThemedText variant="heading3" style={styles.headerIcon}>←</ThemedText>
        </Pressable>

        <ThemedText variant="heading3" style={styles.headerTitle}>
          카풀 전체 내역
        </ThemedText>

        <View style={styles.headerSide} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {items.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* 상단: 날짜 + 뱃지 */}
              <View style={styles.cardTopRow}>
                <View style={styles.dateRow}>
                  <View style={styles.dot} />
                  <ThemedText variant="text2" style={styles.dateText}>
                    {item.date}
                  </ThemedText>
                </View>

                <View style={styles.roleBadge}>
                  <ThemedText variant="text3" style={styles.roleBadgeText}>
                    {item.roleLabel}
                  </ThemedText>
                </View>
              </View>

              {/* 내용 */}
              <View style={styles.infoList}>
                <View style={styles.infoRow}>
                  <ThemedText variant="text3" style={styles.infoLabel}>만나는 장소</ThemedText>
                  <ThemedText variant="text3" style={styles.infoValue}>{item.meetPlace}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <ThemedText variant="text3" style={styles.infoLabel}>만나는 시간</ThemedText>
                  <ThemedText variant="text3" style={styles.infoValue}>{item.meetTime}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <ThemedText variant="text3" style={styles.infoLabel}>탑승 인원</ThemedText>
                  <ThemedText variant="text3" style={styles.infoValue}>{item.seatsText}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <ThemedText variant="text3" style={styles.infoLabel}>도착지</ThemedText>
                  <ThemedText variant="text3" style={styles.infoValue}>{item.destination}</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
