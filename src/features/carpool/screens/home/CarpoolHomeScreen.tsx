import { Header } from "@shared/components/header/Header";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Platform, Pressable, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDepartureChip } from "./getDepartureChip";
import { styles } from "./styles";
import { useCarpoolHomeViewModel } from "./useCarpoolHomeViewModel";

export default function CarpoolHomeScreen() {

  const [kbH, setKbH] = useState(0);
  const kawRef = useRef<KeyboardAwareScrollView>(null);
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      setKbH(e.endCoordinates?.height ?? 0);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKbH(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);


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
      style={{ flex: 1, backgroundColor: Color.default.background }}
    >
      <Header title="카풀 서비스" onBack={() => router.back()} />

      <KeyboardAwareScrollView
        ref={kawRef}
        enableOnAndroid
        extraScrollHeight={80}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: Layout.spacing.l, paddingTop: Layout.spacing.l, paddingBottom: 40 }}
      >
        {/* ✅ 신청 내역 + More */}
        <View>
          <View style={styles.sectionHeaderRow}>
            <ThemedText variant="heading3" style={styles.sectionTitle}>
              📒 신청 내역
            </ThemedText>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={goHistory}
                hitSlop={10}
                style={styles.moreBtn}
              >
                <ThemedText variant="text4" style={styles.moreBtnText}>
                  더보기
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
                const summary = String(item.summary ?? "");
                const [timePart, routePart] = summary.split(" | ");

                const chip = getDepartureChip(item.status);

                return (
                  <Pressable
                    key={item.id}
                    style={styles.applicationCard}
                    onPress={() => goDetail(item.id)}
                  >
                    {/* 상태 말머리 + 운전자 */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ThemedText
                        variant="text3"
                        style={styles.applicationDriver}
                      >
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
                        <ThemedText
                          variant="text4"
                          style={{ color: chip.textColor }}
                        >
                          {chip.label}
                        </ThemedText>
                      </View>
                    </View>
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
                );
              })
            )}
          </View>
        </View>
        <View style={styles.sectionDivider} />
        {/* 수련회장으로 / 집으로 세그먼트 */}
        <View style={styles.segmentWrap}>
          <Pressable
            onPress={() => setActiveTab("RETREAT")}
            style={[
              styles.segmentBtn,
              activeTab === "RETREAT" && styles.segmentBtnActive,
            ]}
          >
            <ThemedText
              variant="text3"
              style={[
                styles.segmentText,
                activeTab === "RETREAT" && styles.segmentTextActive,
              ]}
            >
              수련회장으로
            </ThemedText>
          </Pressable>
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
          onFocus={() => {
            setTimeout(() => {
              kawRef.current?.scrollToPosition(0, 9999, true);
            }, 50);
          }}
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
              const driverName = (post as any).driver.name ?? "운전자";

              return (
                <Pressable
                  key={post.id}
                  style={styles.postCard}
                  onPress={() => goDetail(post.id)} // ✅ 카드 클릭 → 디테일
                >
                  {/* 상단: 동그라미 + 이름 + 버튼 */}
                  <View
                    style={[
                      styles.postTopRow,
                      { justifyContent: "space-between" },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      {/* 동그라미(avatar) + 운전자 이모티콘 */}
                      <View
                        style={[
                          styles.avatar,
                          { alignItems: "center", justifyContent: "center" },
                        ]}
                      >
                        <ThemedText variant="text2">👤</ThemedText>
                      </View>
                      <ThemedText variant="text3" style={styles.postName}>
                        {driverName}
                      </ThemedText>
                      <ThemedText variant="text4" style={{ color: Color.text.main, marginLeft: Layout.spacing.xs }} >
                        |{`\t`}👥{`\t`}{post.seatsTotal - post.seatsLeft}/{post.seatsTotal}
                      </ThemedText>
                    </View>

                    {/* seatsLeft 조건: 0이면 마감(라벨), 1+면 신청가능(라벨) */}
                    <View
                      style={
                        isClosed
                          ? styles.statusBtnClosed
                          : styles.statusBtnApply
                      }
                    >
                      <ThemedText
                        variant="text4"
                        style={
                          isClosed
                            ? styles.statusTextClosed
                            : styles.statusTextApply
                        }
                      >
                        {isClosed ? "마감" : "신청 가능"}
                      </ThemedText>
                    </View>
                  </View>

                  {/* 시간/장소 */}
                  <View style={styles.postInfo}>
                    <View style={styles.infoRow}>
                      <View style={styles.iconCol}>
                        <ThemedText variant="text3">📍</ThemedText>
                      </View>

                      <ThemedText
                        variant="text3"
                        style={styles.infoText}
                      >
                        {post.originDetailed} → {post.destinationDetailed}
                      </ThemedText>
                    </View>

                    {/* 시간 */}
                    <View style={styles.infoRow}>
                      <View style={styles.iconCol}>
                        <ThemedText variant="text3">🕒</ThemedText>
                      </View>

                      <ThemedText variant="text3" style={styles.infoText}>
                        {post.timeText}
                      </ThemedText>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
