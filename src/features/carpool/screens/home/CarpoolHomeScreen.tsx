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

  function formatKoreanDateTime(iso: string): string {
    const d = new Date(iso);
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[d.getDay()];

    let hour = d.getHours();
    const min = d.getMinutes();
    const isPM = hour >= 12;
    const ampm = isPM ? '오후' : '오전';
    hour = hour % 12;
    if (hour === 0) hour = 12;

    const minText = min === 0 ? '' : ` ${String(min).padStart(2, '0')}분`;
    return `${month}/${date}(${day}) ${ampm} ${hour}시${minText}`;
  }

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
            <ThemedText variant="heading3" style={styles.sectionTitle}>
              📒 신청 내역
            </ThemedText>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Pressable onPress={goHistory} hitSlop={10} style={styles.moreBtn}>
                <ThemedText variant="text2" style={styles.moreBtnText}>
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
                // "1/30(금) 저녁 8시 | 신도림역 → 수련회"
                const [timePart, routePart] = summary.split(' | ');

                return (
                  <Pressable
                    key={item.id}
                    style={styles.applicationCard}
                    onPress={() => goDetail(item.id)}
                  >
                    {/* 제목 */}
                    <ThemedText variant="text3" style={styles.applicationDriver}>
                      {(item.driverDisplay ?? item.driverName ?? '드라이버')} 카풀
                    </ThemedText>

                    {/* ⏱ 시간 줄 */}
                    <View style={styles.applicationDescRow}>
                      <ThemedText variant="text3" style={styles.applicationBullet}>
                        ▪
                      </ThemedText>

                      <ThemedText variant="text2" style={styles.applicationDateAccent}>
                        {timePart}
                      </ThemedText>
                    </View>

                    {/* 📍 출발지 → 도착지 줄 */}
                    {routePart && (
                      <View style={styles.applicationRouteRow}>
                        <ThemedText variant="text2" style={styles.applicationRouteText}>
                          {routePart}
                        </ThemedText>
                      </View>
                    )}
                  </Pressable>
                );

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
            <ThemedText variant="text2" style={styles.pillBtnText}>
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

              // ✅ 백에서 driverName join 예정 → 지금은 임시 표시
              const driverName = (post as any).driverName ?? '운전자';

              // ✅ 장소 표시 (스샷처럼 originDetailed 우선)
              const placeText = post.originDetailed || post.origin;

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

                    {/* seatsLeft 조건: 0이면 마감(disabled), 1+면 신청 */}
                    <Pressable
                      style={isClosed ? styles.statusBtnClosed : styles.statusBtnApply}
                      disabled={isClosed} // ✅ 마감 버튼 disable
                      onPress={() => {
                        if (isClosed) return;
                        // TODO: 신청 로직(모달 confirm) 연결
                        // joinCarpool(post.id)
                      }}
                    >
                      <ThemedText
                        variant="text2"
                        style={isClosed ? styles.statusTextClosed : styles.statusTextApply}
                      >
                        {isClosed ? '마감' : '신청'}
                      </ThemedText>
                    </Pressable>
                  </View>

                  {/* 시간/장소 */}
                  <View style={styles.postInfo}>
                    <View style={styles.infoRow}>
                      <ThemedText variant="text2" style={styles.infoValue}>
                        시간: {post.timeText}
                      </ThemedText>
                    </View>

                    <View style={styles.infoRow}>
                      <ThemedText variant="text2" style={styles.infoValue}>
                        장소: {placeText}
                      </ThemedText>
                    </View>
                  </View>

                  {/* 하단 한줄: 📍 | 👥 | 🚙 */}
                  <View style={styles.routeRow}>
                    <ThemedText variant="text3" style={styles.routeText} numberOfLines={1}>
                      📍 {post.placeText} | 👥 {post.seatsLeft}/{post.seatsTotal} | 🚙 {post.carInfo}
                    </ThemedText>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
