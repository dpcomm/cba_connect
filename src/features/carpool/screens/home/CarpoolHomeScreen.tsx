import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { styles } from './styles';
import { useCarpoolHomeViewModel } from './useCarpoolHomeViewModel';

export default function CarpoolHomeScreen() {
  const {
    // status
    isLoading,
    error,

    // tabs
    activeTab, // 'HOME' | 'RETREAT'
    setActiveTab,

    // search
    query,
    setQuery,

    // data
    carpools,
    posts,

    // actions
    goBack,
    goDetail,
    goRegister,
    goHistory,
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
        {/* ✅ 신청 내역 + More */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText variant="text2" style={styles.sectionTitle}>
              📒 신청 내역
            </ThemedText>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Pressable onPress={goHistory} hitSlop={10} style={styles.moreBtn}>
                <ThemedText variant="text3" style={styles.moreBtnText}>
                  More
                </ThemedText>
              </Pressable>
            </View>
          </View>

          <View style={styles.applicationList}>
            {carpools?.length === 0 ? (
              <View style={styles.applicationCard}>
                <ThemedText variant="text2" style={styles.emptyText}>
                  카풀 신청한 내역이 없습니다.
                </ThemedText>
              </View>
            ) : (
              carpools?.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.applicationCard}
                  onPress={() => goDetail(item.id)}
                >
                  <ThemedText variant="text3" style={styles.applicationDriver}>
                    {item.driverName} 카풀
                  </ThemedText>
                  <ThemedText variant="text3" style={styles.applicationDesc}>
                    • {item.summary}
                  </ThemedText>
                </Pressable>
              ))
            )}
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

        {/* ✅ 찾기 + 등록 버튼 */}
        <View style={styles.findHeader}>
          <ThemedText variant="text2" style={styles.findTitle}>
            🚗 찾기
          </ThemedText>

          <Pressable onPress={goRegister} style={styles.pillBtn} hitSlop={10}>
            <ThemedText variant="text3" style={styles.pillBtnText}>
              + 등록
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
          {posts.length === 0 ? (
            <View style={styles.postCard}>
              <ThemedText variant="text3" style={styles.emptyText}>
                등록된 카풀이 없습니다.
              </ThemedText>
            </View>
          ) : (
            posts.map((post) => (
              <Pressable
                key={post.id}
                style={styles.postCard}
                onPress={() => goDetail(post.id)}
              >
                {/* 기존 카드 내용 그대로 */}
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
