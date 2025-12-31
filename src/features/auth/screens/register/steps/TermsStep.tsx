import { Button } from '@shared/components/button/Button';
import { CheckBox } from '@shared/components/check-box/CheckBox';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { ScrollView, View } from 'react-native';

interface Props {
  agreed: boolean;
  setAgreed: (agreed: boolean) => void;
  onNext: () => void;
}

export function TermsStep({ agreed, setAgreed, onNext }: Props) {
  const handleNext = () => {
    if (agreed) {
      onNext();
    } else {
      alert('약관에 동의해주세요.');
    }
  };

  return (
    <View style={{ flex: 1, padding: Layout.spacing.l }}>
      <View style={{ marginTop: Layout.spacing.xl, marginBottom: Layout.spacing.l }}>
        <ThemedText variant="heading3" style={{ textAlign: 'center' }}>
          [필수] 개인정보 수집 이용 동의
        </ThemedText>
      </View>

      <View style={{
        flex: 1,
        borderWidth: 1,
        borderColor: Color.secondary.pressed,
        borderRadius: Layout.radius.m,
        padding: Layout.spacing.m,
        marginBottom: Layout.spacing.xl,
        backgroundColor: Color.secondary.main,
      }}>
        <ScrollView>
          <ThemedText variant="text2" color={Color.text.sub}>
            고객님의 개인정보는 안전하게 보호되며, 목적 외로 사용되지 않습니다.
            {'\n\n'}
            1. 수집 항목: 이름, 전화번호, 생년월일, 성별, 소속 등{'\n'}
            2. 수집 목적: 서비스 이용 및 회원 관리{'\n'}
            3. 보유 기간: 회원 탈퇴 시까지
            {'\n\n'}
            (이하 생략)
          </ThemedText>
        </ScrollView>
      </View>

      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: Layout.spacing.xxl 
      }}>
        <CheckBox 
          checked={agreed} 
          onPress={() => setAgreed(!agreed)} 
        />
        <ThemedText 
          variant="heading3" 
          style={{ marginLeft: Layout.spacing.s }} 
          onPress={() => setAgreed(!agreed)}
        >
          동의합니다.
        </ThemedText>
      </View>

      <Button 
        title="다음" 
        onPress={handleNext} 
        size="large"
        disabled={!agreed}
      />
    </View>
  );
}
