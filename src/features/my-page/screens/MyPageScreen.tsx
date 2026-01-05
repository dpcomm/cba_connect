import { Ionicons } from '@expo/vector-icons';
import { Header } from '@shared/components/header/Header';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuItem } from '../components/MenuItem';
import { MenuSection } from '../components/MenuSection';
import { ProfileCard } from '../components/ProfileCard';


export default function MyPageScreen() {
  const router = useRouter();

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.default.background }}>
      <Header
        title="마이 페이지"
        onBack={() => router.back()}
        rightContent={
          <TouchableOpacity style={{ padding: 4 }}>
            <Ionicons name="notifications-outline" size={24} color={Color.text.main} />
          </TouchableOpacity>
        }
      />

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: Layout.spacing.l, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard />

        <View style={{ gap: 28 }}>
          <MenuSection>
            <MenuItem label="공지사항" showBorder={false} />
          </MenuSection>
          <MenuSection title="마이 수련회">
            <MenuItem label="수련회 신청 조회" />
            <MenuItem label="회비 납부 조회" />
            <MenuItem label="수련회 히스토리" showBorder={false} />
          </MenuSection>
          <MenuSection title="마이 카풀">
            <MenuItem label="카풀 히스토리" />
            <MenuItem label="내 차 정보 조회" showBorder={false} />
          </MenuSection>
          <MenuSection title="Support">
            <MenuItem label="기술 지원 안내" showBorder={false} />
          </MenuSection>
        </View>
        <TouchableOpacity onPress={handleLogout} style={{ marginTop: 64, alignItems: 'center' }}>
          <ThemedText variant="text2" color={Color.tertiary.main} style={{ textDecorationLine: 'underline' }}>
            로그아웃
          </ThemedText>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
