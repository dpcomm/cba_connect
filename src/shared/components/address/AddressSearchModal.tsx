import { TextInput } from '@shared/components/text-input/TextInput';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import Constants from 'expo-constants';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { styles } from './styles';

export interface AddressResult {
  roadAddress: string;      // ✅ 폼/저장/표시용 (도로명 없으면 지번을 넣어줌)
  jibunAddress?: string;    // ✅ 검색 화면 표시용
  lat: number;
  lng: number;
}

export interface AddressSearchModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSelect: (result: AddressResult) => void;
}

/**
 * ✅ 프로덕션에서 Constants.expoConfig 가 비는 케이스가 있어서
 * expoConfig / manifest / manifest2 순서로 extra를 안전하게 찾는다.
 * + "모듈 상단 상수"로 고정하지 말고, 호출 시점에 매번 읽는다.
 */
function getKakaoKey(): string {
  const extra =
    (Constants.expoConfig?.extra as any) ??
    ((Constants as any).manifest?.extra as any) ??
    ((Constants as any).manifest2?.extra as any) ??
    {};

  // ✅ 둘 다 지원 (develop: kakaoRestApiKey, branch: KAKAO_REST_API_KEY)
  const key =
    (extra?.KAKAO_REST_API_KEY as string | undefined) ??
    (extra?.kakaoRestApiKey as string | undefined);

  if (!key || !key.trim()) {
    throw new Error("Missing KAKAO_REST_API_KEY");
  }

  return key.trim();
}

function normalizeKakaoDoc(doc: any): AddressResult | null {
  const road = doc?.road_address?.address_name as string | undefined;
  const jibun = doc?.address?.address_name as string | undefined;

  // ✅ 도로명이 없으면 지번을 대신 사용
  const roadAddress = road ?? jibun ?? '';
  if (!roadAddress) return null;

  const lat = Number(doc?.y);
  const lng = Number(doc?.x);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

  const jibunAddress = jibun && jibun !== roadAddress ? jibun : undefined;

  return {
    roadAddress,
    jibunAddress,
    lat,
    lng,
  };
}

async function kakaoSearchAddress(query: string, signal?: AbortSignal): Promise<AddressResult[]> {
  const KAKAO_REST_API_KEY = getKakaoKey();

  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    },
    signal,
  });

  if (!res.ok) {
    throw new Error(`Kakao address search failed: ${res.status}`);
  }

  const json = await res.json();
  const docs = (json?.documents ?? []) as any[];

  return docs.map(normalizeKakaoDoc).filter((v): v is AddressResult => v != null);
}

export function AddressSearchModal({
  visible,
  title,
  onClose,
  onSelect,
}: AddressSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const canSearch = useMemo(() => query.trim().length >= 2, [query]);
  const abortRef = useRef<AbortController | null>(null);

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (!visible) return;
    setQuery('');
    setResults([]);
    setLoading(false);
    setHint(null);
    abortRef.current?.abort();
    abortRef.current = null;
  }, [visible]);

  // 자동검색(디바운스 + 요청 취소)
  useEffect(() => {
    if (!visible) return;

    if (!canSearch) {
      abortRef.current?.abort();
      setResults([]);
      setLoading(false);
      setHint(query.trim().length === 0 ? null : '2글자 이상 입력해 주세요.');
      return;
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setHint(null);

      try {
        const res = await kakaoSearchAddress(query.trim(), controller.signal);
        setResults(res);
        if (res.length === 0) setHint('검색 결과가 없습니다.');
      } catch (e: any) {
        // AbortError는 무시
        if (e?.name === 'AbortError') return;

        setResults([]);
        // 키 누락/쿼터/네트워크 등
        if (String(e?.message ?? '').includes('Missing KAKAO_REST_API_KEY')) {
          setHint('카카오 API 키가 설정되지 않았어요. (.env 확인)');
        } else {
          setHint('주소 검색에 실패했어요. 잠시 후 다시 시도해 주세요.');
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, canSearch, visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.header}>
          <ThemedText variant="heading3" color={Color.text.main}>
            {title}
          </ThemedText>

          <Pressable onPress={onClose} hitSlop={10}>
            <ThemedText variant="text2" color={Color.text.sub}>
              닫기
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.searchRow}>
          <View style={{ flex: 1 }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="도로명 / 지번 주소를 입력하세요 (2글자 이상)"
              returnKeyType="search"
              onSubmitEditing={() => { }}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.list} keyboardShouldPersistTaps="always">
          {loading && (
            <View style={styles.empty}>
              <ThemedText variant="text2" color={Color.text.sub}>
                검색 중...
              </ThemedText>
            </View>
          )}

          {!loading && hint && (
            <View style={styles.empty}>
              <ThemedText variant="text2" color={Color.text.sub}>
                {hint}
              </ThemedText>
            </View>
          )}

          {!loading &&
            results.map((r) => (
              <Pressable
                key={`${r.roadAddress}-${r.lat}-${r.lng}`}
                onPress={() => onSelect(r)}
                style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              >
                {/* ✅ 도로명(없으면 지번이 들어와서 여기엔 항상 값이 있음) */}
                <ThemedText variant="text2" color={Color.text.main} numberOfLines={1}>
                  {r.roadAddress}
                </ThemedText>

                {/* ✅ 지번은 보조로 표시(있으면) */}
                {!!r.jibunAddress && (
                  <ThemedText
                    variant="text4"
                    color={Color.text.sub}
                    numberOfLines={1}
                    style={{ marginTop: 2 }}
                  >
                    (지번) {r.jibunAddress}
                  </ThemedText>
                )}
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </Modal>
  );
}
