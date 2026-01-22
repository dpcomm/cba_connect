import { TextInput } from '@shared/components/text-input/TextInput';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import Constants from 'expo-constants';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { styles } from './styles';

export interface AddressResult {
  roadAddress: string;
  jibunAddress?: string;
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
 * 여러 경로에서 extra를 찾아본다.
 * - 키가 없으면 throw 하지 말고 null 반환 (UI에서 안내)
 */
function getExtra(): any {
  // expo-constants 버전/런타임에 따라 위치가 다를 수 있음
  return (
    (Constants.expoConfig?.extra as any) ??
    ((Constants as any).expoConfig?.extra as any) ?? // 혹시 모를 케이스
    ((Constants as any).manifest?.extra as any) ??
    ((Constants as any).manifest2?.extra as any) ??
    {}
  );
}

function getKakaoKeyOrNull(): string | null {
  const extra = getExtra();

  // ✅ 둘 다 지원 (develop: kakaoRestApiKey, branch: KAKAO_REST_API_KEY)
  const key =
    (extra?.KAKAO_REST_API_KEY as string | undefined) ??
    (extra?.kakaoRestApiKey as string | undefined);

  const trimmed = (key ?? '').trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeKakaoDoc(doc: any): AddressResult | null {
  const road = doc?.road_address?.address_name as string | undefined;
  const jibun = doc?.address?.address_name as string | undefined;

  const roadAddress = road ?? jibun ?? '';
  if (!roadAddress) return null;

  const lat = Number(doc?.y);
  const lng = Number(doc?.x);

  // ✅ iOS 안전: NaN/Infinity 모두 방지
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const jibunAddress = jibun && jibun !== roadAddress ? jibun : undefined;

  return { roadAddress, jibunAddress, lat, lng };
}

async function kakaoSearchAddress(
  query: string,
  kakaoKey: string,
  signal?: AbortSignal,
): Promise<AddressResult[]> {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${kakaoKey}`,
    },
    signal,
  });

  if (!res.ok) {
    // 응답 바디가 있으면 디버그에 도움됨(단, 사용자에게는 숨김)
    // eslint-disable-next-line no-console
    console.warn('Kakao address search failed:', res.status);
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

  // ✅ 키는 매 렌더마다 읽되, 모달이 열렸을 때 기준으로 안내해도 됨
  const kakaoKey = useMemo(() => getKakaoKeyOrNull(), [visible]);

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

    // ✅ 키가 없으면 검색 자체를 막고 안내
    if (!kakaoKey) {
      abortRef.current?.abort();
      setResults([]);
      setLoading(false);
      setHint('카카오 API 키가 설정되지 않았어요. (EAS env / extra 확인)');
      return;
    }

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
        const res = await kakaoSearchAddress(query.trim(), kakaoKey, controller.signal);
        setResults(res);
        if (res.length === 0) setHint('검색 결과가 없습니다.');
      } catch (e: any) {
        if (e?.name === 'AbortError') return;

        setResults([]);
        setHint('주소 검색에 실패했어요. 잠시 후 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, canSearch, visible, kakaoKey]);

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
              onSubmitEditing={() => {}}
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
                <ThemedText variant="text2" color={Color.text.main} numberOfLines={1}>
                  {r.roadAddress}
                </ThemedText>

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
