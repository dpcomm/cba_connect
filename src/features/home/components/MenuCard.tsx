import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React, { ReactNode } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

interface MenuCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  size: 'large' | 'small';
  onPress?: () => void;
  backgroundColor?: string;
  style?: ViewStyle;
}

export function MenuCard({ 
  title, 
  description, 
  icon, 
  size, 
  onPress,
  backgroundColor = '#F5F5F5',
  style,
}: MenuCardProps) {
  const isLarge = size === 'large';
  
  if (isLarge) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          {
            backgroundColor: Color.secondary.main,
            borderRadius: Layout.radius.l,
            paddingHorizontal: 14,
            paddingVertical: 16,
            ...Layout.shadow.drop,
          },
          style,
        ]}
      >
        <View>
          <ThemedText variant="heading2" color={Color.text.main}>
            {title}
          </ThemedText>
          {description && (
            <ThemedText variant="text2" color={Color.text.sub} style={{ marginTop: 4 }}>
              {description}
            </ThemedText>
          )}
        </View>
        {icon && (
          <View style={{ position: 'absolute', right: 8, bottom: 8 }}>
            {icon}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: Color.secondary.main,
          borderRadius: Layout.radius.l,
          paddingHorizontal: 8, // 패딩을 28 -> 8로 대폭 축소
          paddingTop: 16,
          paddingBottom: 4,
          justifyContent: 'center',
          alignItems: 'center',
          ...Layout.shadow.drop,
        },
        style,
      ]}
    >
      <ThemedText 
        variant="text3" 
        color={Color.text.main}
        style={{ textAlign: 'center' }} // 텍스트 중앙 정렬 추가
      >
        {title}
      </ThemedText>
      {icon && (
        <View style={{ marginTop: 'auto' }}>
          {icon}
        </View>
      )}
    </TouchableOpacity>
  );
}

