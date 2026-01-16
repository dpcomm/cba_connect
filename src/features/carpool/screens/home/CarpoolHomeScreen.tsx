import { Header } from '@shared/components/header/Header';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDepartureChip } from './getDepartureChip';
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
    goDetail,
    goRegister,
    goHistory,
  } = useCarpoolHomeViewModel();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.default.background }}>
      <Header
        title="카풀 서비스"
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: Layout.spacing.l, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ✅ 신청 내역 + More */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText variant="heading3" style={styles.sectionTitle}>
              📒 신청 내역
            </ThemedText>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Pressable onPress={goHistory} hitSlop={10} style={styles.moreBtn}>
                <ThemedText variant="text4" style={styles.moreBtnText}>
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
              carpools?.map((item) => {
                const summary = String(item.summary ?? '');
                const [timePart, routePart] = summary.split(' | ');

                const chip = getDepartureChip(item.status);

                return (
                  <Pressable
                    key={item.id}
                    style={styles.applicationCard}
                    onPress={() => goDetail(item.id)}
                  >
                    {/* 상태 말머리 + 운전자 */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <ThemedText variant="text3" style={styles.applicationDriver}>
                        {item.driver.name} 카풀
                      </ThemedText>

                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                          borderRadius: 6,
                          backgroundColor: chip.backgroundColor,
                        }}
                      >
                        <ThemedText variant="text4" style={{ color: chip.textColor }}>
                          {chip.label}
                        </ThemedText>
                      </View>
                    </View>
                    F
                    {/* 시간 */}
                    <View style={styles.kvRow}>
                      <ThemedText variant="text2" style={styles.kvLabel}>
                        시간
                      </ThemedText>
                      <ThemedText variant="text2" style={styles.kvValue}>
                        {timePart}
                      </ThemedText>
                    </View>

                    {/* 경로 */}
                    <View style={styles.kvRow}>
                      <ThemedText variant="text2" style={styles.kvLabel}>
                        경로
                      </ThemedText>
                      <ThemedText variant="text2" style={styles.kvValue}>
                        {routePart}
                      </ThemedText>
                    </View>
                  </Pressable>
                )
              })
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
              수련회장으로
            </ThemedText>
          </Pressable>
        </View>

        {/* ✅ 찾기 + 등록 버튼 */}
        <View style={styles.findHeader}>
          <ThemedText variant="heading3" style={styles.findTitle}>
            🚗 찾기
          </ThemedText>

          <Pressable onPress={goRegister} style={styles.pillBtn} hitSlop={10}>
            <ThemedText variant="text4" style={styles.pillBtnText}>
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
            posts.map((post) => {
              const isClosed = (post.seatsLeft ?? 0) <= 0;
              const driverName = (post as any).driver.name ?? '운전자';
              const isHome = activeTab === 'HOME';
              const placeLabel = isHome ? '도착지' : '출발지';
              const detailText = isHome
                ? (post.destinationDetailed ?? post.destination ?? '')
                : (post.originDetailed ?? post.origin ?? '');

              const note = post.note ?? '';

              return (
                <Pressable
                  key={post.id}
                  style={styles.postCard}
                  onPress={() => goDetail(post.id)} // ✅ 카드 클릭 → 디테일
                >
                  {/* 상단: 동그라미 + 이름 + 버튼 */}
                  <View style={[styles.postTopRow, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      {/* 동그라미(avatar) + 운전자 이모티콘 */}
                      <View style={[styles.avatar, { alignItems: 'center', justifyContent: 'center' }]}>
                        <ThemedText variant="text2">👤</ThemedText>
                      </View>
                      <ThemedText variant="text3" style={styles.postName}>
                        {driverName}
                      </ThemedText>
                    </View>

                    {/* seatsLeft 조건: 0이면 마감(라벨), 1+면 신청가능(라벨) */}
                    <View style={isClosed ? styles.statusBtnClosed : styles.statusBtnApply}>
                      <ThemedText
                        variant="text4"
                        style={isClosed ? styles.statusTextClosed : styles.statusTextApply}
                      >
                        {isClosed ? '마감' : '신청 가능'}
                      </ThemedText>
                    </View>

                  </View>

                  {/* 시간/장소 */}
                  <View style={styles.postInfo}>
                    <View style={styles.kvRow}>
                      <ThemedText variant="text2" style={styles.kvLabel}>시간</ThemedText>
                      <ThemedText variant="text2" style={styles.kvValue}>{post.timeText}</ThemedText>
                    </View>

                    <View style={styles.kvRow}>
                      <ThemedText variant="text2" style={styles.kvLabel}>{placeLabel}</ThemedText>
                      <ThemedText variant="text2" style={styles.kvValue}>{detailText}</ThemedText>
                    </View>

                    <View style={styles.kvRow}>
                      <ThemedText variant="text2" style={styles.kvLabel}>메모</ThemedText>
                      <ThemedText variant="text2" style={styles.kvValue}>{note}</ThemedText>
                    </View>
                  </View>

                  {/* 하단 한줄: 📍 | 👥 | 🚙 */}
                  <View style={styles.routeRow}>
                    <ThemedText variant="text3" style={styles.routeText} numberOfLines={1}>
                      📍 {detailText} | 👥 {post.seatsLeft}/{post.seatsTotal} | 🚙 {post.carInfo}
                    </ThemedText>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
