import { ThemedText } from '@shared/components/themed-text/ThemedText';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { useCarpoolDetailViewModel } from './useCarpoolDetailViewModel';

export default function CarpoolDetailScreen() {
  const { titleName, profile, info, goBack, callDriver } = useCarpoolDetailViewModel();

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
          {titleName}님의 카풀 정보
        </ThemedText>

        <Pressable onPress={callDriver} style={styles.headerSide} hitSlop={10}>
          <ThemedText variant="heading3" style={styles.headerIcon}>
            📞
          </ThemedText>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.detailCard}>
          {/* 프로필 */}
          <View style={styles.profileRow}>
            <View style={styles.profileAvatar} />
            <View style={{ flex: 1 }}>
              <ThemedText variant="text2" style={styles.profileName}>
                {profile.name}
              </ThemedText>
              <ThemedText variant="text3" style={styles.profileSub}>
                {profile.sub}
              </ThemedText>
            </View>
          </View>

          {/* 지도(스텁) */}
          <View style={styles.mapStub}>
            <ThemedText variant="text3" style={styles.mapStubText}>
              카풀 픽업 위치 표시
            </ThemedText>
          </View>

          {/* 정보 리스트 */}
          <View style={styles.infoList}>
            {info.map((row) => (
              <View key={row.key} style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <ThemedText variant="text3">{row.icon}</ThemedText>
                </View>
                <View style={styles.infoTextWrap}>
                  <ThemedText variant="text3" style={styles.infoText}>
                    {row.text}
                  </ThemedText>
                  {row.subText ? (
                    <ThemedText variant="text3" style={styles.infoSubText}>
                      {row.subText}
                    </ThemedText>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.bottomArea}>
        <View style={styles.bottomButton}>
          <ThemedText variant="text2" style={styles.bottomButtonText}>
            신청완료
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
