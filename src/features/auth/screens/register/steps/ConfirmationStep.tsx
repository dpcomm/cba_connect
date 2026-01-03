import { Button } from '@shared/components/button/Button';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

interface RegisterData {
  name: string;
  gender: 'M' | 'F' | null;
  birthdate: string;
  phoneNumber: string;
  affiliation: string;
  userId: string;
  password: string;
}

interface Props {
  data: RegisterData;
  onConfirm: () => void;
}

export function ConfirmationStep({ data, onConfirm }: Props) {
  const getGenderText = (gender: 'M' | 'F' | null) => {
    switch (gender) {
      case 'M': return '남자';
      case 'F': return '여자';
      default: return '선택안함';
    }
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={{ marginBottom: Layout.spacing.m, gap: 10 }}>
      <ThemedText variant="text1" color={Color.text.sub}>{label}</ThemedText>
      <ThemedText variant="heading3">{value}</ThemedText>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <InfoRow label="아이디" value={data.userId} />
      <InfoRow label="비밀번호" value={'•'.repeat(data.password.length)} />
      <InfoRow label="이름" value={data.name} />
      {/* {data.birthdate && <InfoRow label="생년월일" value={data.birthdate} />} */}
      <InfoRow label="성별" value={getGenderText(data.gender)} />
      <InfoRow label="전화번호" value={data.phoneNumber} />
      <InfoRow label="중그룹" value={data.affiliation} />

      <View style={{ marginTop: Layout.spacing.xl }}>
        <Button 
          title="회원가입" 
          onPress={onConfirm}
          size="large"
        />
      </View>
    </View>
  );
}
