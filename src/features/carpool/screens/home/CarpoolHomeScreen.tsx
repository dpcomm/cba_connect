import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { styles } from './styles';
import { useCarpoolHomeViewModel } from './useCarpoolHomeViewModel';

export default function CarpoolHomeScreen() {
  const {
    applicationsPreview,
    posts,
    activeTab,
    setActiveTab,
    query,
    setQuery,
    goBack,
    goApplications,
    goRegister,
    // goDetail,
    // applyToPost,
  } = useCarpoolHomeViewModel();

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
          카풀 서비스
        </ThemedText>

        <View style={styles.headerSide} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* 카풀 신청내역 */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText variant="text2" style={styles.sectionTitle}>
              📒 카풀 신청내역
            </ThemedText>

            <Pressable onPress={goApplications} hitSlop={10} style={styles.chevronBtn}>
              <ThemedText variant="text2" color={Color.text.sub}>
                ›
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.applicationList}>
            {applicationsPreview.map((item) => (
              <View key={item.id} style={styles.applicationCard}>
                <ThemedText variant="text3" style={styles.applicationDriver}>
                  {item.driverName} 카풀
                </ThemedText>
                <ThemedText variant="text3" style={styles.applicationDesc}>
                  • {item.summary}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* 집으로 / 수련회장 세그먼트 */}
        <View style={styles.segmentWrap}>
          <Pressable
            onPress={() => setActiveTab('HOME')}
            style={[styles.segmentBtn, activeTab === 'HOME' && styles.segmentBtnActive]}
          >
            <ThemedText
              variant="text3"
              style={[styles.segmentText, activeTab === 'HOME' && styles.segmentTextActive]}
            >
              집으로
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('RETREAT')}
            style={[styles.segmentBtn, activeTab === 'RETREAT' && styles.segmentBtnActive]}
          >
            <ThemedText
              variant="text3"
              style={[styles.segmentText, activeTab === 'RETREAT' && styles.segmentTextActive]}
            >
              수련회장
            </ThemedText>
          </Pressable>
        </View>

        {/* 카풀 찾기 + 등록 버튼 */}
        <View style={styles.findHeader}>
          <ThemedText variant="text2" style={styles.findTitle}>
            🚗 카풀 찾기
          </ThemedText>

          <Pressable onPress={goRegister} style={styles.pillBtn} hitSlop={10}>
            <ThemedText variant="text3" style={styles.pillBtnText}>
              + 카풀 등록
            </ThemedText>
          </Pressable>
        </View>

        {/* 검색 */}
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="목적지, 운전자 이름, 픽업 장소 검색"
          placeholderTextColor={Color.text.disabled}
          style={styles.searchInput}
        />

        {/* 모집글 리스트 */}
        <View style={styles.postList}>
          {posts.map((post) => (
            <Pressable key={post.id} style={styles.postCard} onPress={() => goDetail(post.id)}>
              <View style={styles.postTopRow}>
                <View style={styles.avatar} />
                <ThemedText variant="text2" style={styles.postName}>
                  {post.driverName}
                </ThemedText>

                <View style={{ flex: 1 }} />

                {post.isClosed ? (
                  <View style={styles.statusBtnClosed}>
                    <ThemedText variant="text3" style={styles.statusTextClosed}>
                      마감
                    </ThemedText>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => applyToPost(post.id)}
                    style={styles.statusBtnApply}
                    hitSlop={6}
                  >
                    <ThemedText variant="text3" style={styles.statusTextApply}>
                      신청
                    </ThemedText>
                  </Pressable>
                )}
              </View>

              <View style={styles.postInfo}>
                <View style={styles.infoRow}>
                  <ThemedText variant="text3" color={Color.text.sub}>
                    시간:
                  </ThemedText>
                  <ThemedText variant="text3" style={styles.infoValue}>
                    {post.timeText}
                  </ThemedText>
                </View>

                <View style={styles.infoRow}>
                  <ThemedText variant="text3" color={Color.text.sub}>
                    장소:
                  </ThemedText>
                  <ThemedText variant="text3" style={styles.infoValue}>
                    {post.placeText}
                  </ThemedText>
                </View>

                <View style={styles.routeRow}>
                  <ThemedText variant="text3" style={styles.routeText}>
                    📍 {post.routeText}
                  </ThemedText>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
