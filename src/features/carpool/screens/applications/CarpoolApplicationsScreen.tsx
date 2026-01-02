import { ThemedText } from '@shared/components/themed-text/ThemedText';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { useCarpoolApplicationsViewModel } from './useCarpoolApplicationsViewModel';

export default function CarpoolApplicationsScreen() {
  const { items, goBack } = useCarpoolApplicationsViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.headerSide} hitSlop={10}>
          <ThemedText variant="heading3" style={styles.headerIcon}>
            ←
          </ThemedText>
        </Pressable>

        <ThemedText variant="heading3" style={styles.headerTitle}>
          카풀 신청내역
        </ThemedText>

        <View style={styles.headerSide} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {items.map((item) => (
            <View key={item.id} style={styles.card}>
              <ThemedText variant="text3" style={styles.driver}>
                {item.driverName} 카풀
              </ThemedText>
              <ThemedText variant="text3" style={styles.desc}>
                • {item.summary}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
