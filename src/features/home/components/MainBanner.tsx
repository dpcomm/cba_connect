import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { Dimensions, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;
const BANNER_SIZE = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;

interface MainBannerProps {
  title?: string;
  subtitle?: string;
  currentPage?: number;
  totalPages?: number;
}

export function MainBanner({ 
  title = '바라봄', 
  subtitle = 'Discover my calling',
  currentPage = 1,
  totalPages = 3,
}: MainBannerProps) {
  return (
    <View style={{
      borderRadius: 20,
      width: BANNER_SIZE,
      height: BANNER_SIZE,
      backgroundColor: '#06060bff',
      overflow: 'hidden',
    }}>
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1a1a2e',
      }}>
        <View style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: 'rgba(138, 43, 226, 0.3)',
        }} />
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: 'rgba(138, 43, 226, 0.2)',
          borderTopLeftRadius: 300,
          borderTopRightRadius: 300,
        }} />
      </View>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Layout.spacing.l,
      }}>
        <ThemedText 
          variant="text2" 
          color="rgba(255,255,255,0.8)"
          style={{ fontStyle: 'italic', marginBottom: 8 }}
        >
          {subtitle}
        </ThemedText>
        
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          paddingHorizontal: Layout.spacing.l,
          paddingVertical: Layout.spacing.s,
          borderRadius: Layout.radius.m,
          marginTop: Layout.spacing.xl,
        }}>
          <ThemedText 
            variant="text3" 
            color="white"
            style={{ textAlign: 'center' }}
          >
            포스터/시간표 등 롤링배너
          </ThemedText>
        </View>

        <View style={{ marginTop: Layout.spacing.l, alignItems: 'center' }}>
          <ThemedText variant="text5" color="rgba(255,255,255,0.7)">
            장 18:19
          </ThemedText>
          <ThemedText variant="text5" color="rgba(255,255,255,0.6)" style={{ textAlign: 'center', marginTop: 4 }}>
            여호와의 도를 지켜
          </ThemedText>
        </View>
      </View>

      <View style={{
        position: 'absolute',
        bottom: Layout.spacing.m,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
      }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === currentPage - 1 
                ? 'white' 
                : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </View>
    </View>
  );
}
