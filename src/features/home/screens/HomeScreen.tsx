import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../components/HomeHeader';
import { HomeMenuGrid } from '../components/HomeMenuGrid';
import { MainBanner } from '../components/MainBanner';

export default function HomeScreen() {
  const router = useRouter();

  const handleMenuPress = () => {
    router.push('/my-page');
  };

  const handleRetreatPress = () => {
    // TODO: 수련회 신청 화면으로 이동
    console.log('Retreat pressed');
  };

  const handleCarpoolPress = () => {
    // TODO: 카풀 서비스 화면으로 이동
    console.log('Carpool pressed');
  };

  const handleGuidebookPress = () => {
    // TODO: 가이드북 화면으로 이동
    console.log('Guidebook pressed');
  };

  const handleVideoPress = () => {
    // TODO: 영상 자료실 화면으로 이동
    console.log('Video pressed');
  };

  const handleLecturePress = () => {
    // TODO: 선택식 강의 화면으로 이동
    console.log('Lecture pressed');
  };

  return (
    <SafeAreaView 
      style={{ flex: 1, alignItems: 'center', backgroundColor: Color.default.background, paddingHorizontal: Layout.spacing.l, gap: 25 }}
    >
      <HomeHeader 
        dDay={0} 
        onMenuPress={handleMenuPress} 
      />
      <MainBanner 
        title="바라봄"
        subtitle="Discover my calling"
        currentPage={1}
        totalPages={3}
      />
      <HomeMenuGrid
        onRetreatPress={handleRetreatPress}
        onCarpoolPress={handleCarpoolPress}
        onGuidebookPress={handleGuidebookPress}
        onVideoPress={handleVideoPress}
        onLecturePress={handleLecturePress}
      />
    </SafeAreaView>
  );
}
