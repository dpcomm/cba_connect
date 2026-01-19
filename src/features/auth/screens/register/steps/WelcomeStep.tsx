import { Button } from '@shared/components/button/Button';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';
import RecbaLogo from '../../../../../../assets/svgs/recba_logo.svg';

interface Props {
  name: string;
  onGoToLogin: () => void;
}

export function WelcomeStep({ name, onGoToLogin }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Layout.spacing.l }}>
      <RecbaLogo width={210} height={49} />
      
      <View style={{ marginTop: Layout.spacing.xl, alignItems: 'center' }}>
        <ThemedText variant="text1" color={Color.text.main}>
          회원가입이 완료되었습니다.
        </ThemedText>
        <ThemedText variant="heading1" color={Color.text.main} style={{ marginTop: Layout.spacing.m }}>
          {name} 님 환영합니다!
        </ThemedText>
      </View>

      <View style={{ position: 'absolute', bottom: Layout.spacing.xl, left: Layout.spacing.l, right: Layout.spacing.l }}>
        <Button 
          title="로그인하러 가기" 
          onPress={onGoToLogin}
          size="large"
        />
      </View>
    </View>
  );
}
