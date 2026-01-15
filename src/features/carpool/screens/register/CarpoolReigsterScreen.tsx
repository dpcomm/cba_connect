import { ThemedText } from '@shared/components/themed-text/ThemedText';
import React from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';
import { useCarpoolRegisterViewModel } from './useCarpoolRegisterViewModel';

export default function CarpoolRegisterScreen() {
  const { selected, selectDestination, goBack } = useCarpoolRegisterViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.headerSide} hitSlop={10}>
          <ThemedText variant="heading3">←</ThemedText>
        </Pressable>

        <ThemedText variant="heading3" style={styles.headerTitle}>
          카풀 등록
        </ThemedText>

        <View style={styles.headerSide} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ThemedText variant="heading3" style={styles.title}>
          목적지 선택
        </ThemedText>

        {/* 수련회장 */}
        <Pressable
          style={[
            styles.card,
            selected === 'RETREAT' && styles.cardActive,
          ]}
          onPress={() => selectDestination('RETREAT')}
        >
          <ThemedText variant="heading1">⛪</ThemedText>
          <ThemedText
            variant="text3"
            style={[
              styles.cardText,
              selected === 'RETREAT' && styles.cardTextActive,
            ]}
          >
            수련회장으로
          </ThemedText>
        </Pressable>

        {/* 집으로 */}
        <Pressable
          style={[
            styles.card,
            selected === 'HOME' && styles.cardActive,
          ]}
          onPress={() => selectDestination('HOME')}
        >
          <ThemedText variant="heading1">🏠</ThemedText>
          <ThemedText
            variant="text3"
            style={[
              styles.cardText,
              selected === 'HOME' && styles.cardTextActive,
            ]}
          >
            집으로
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
