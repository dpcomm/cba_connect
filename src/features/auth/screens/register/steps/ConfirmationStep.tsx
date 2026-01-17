import { Button } from '@shared/components/button/Button';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';
import { ReadOnlyStepValue } from '../../../components/ReadOnlyStepValue';

interface RegisterData {
  name: string;
  gender: 'M' | 'F' | null;
  birthdate: string;
  phoneNumber: string;
  affiliation: string;
  userId: string;
  password: string;
  email: string;
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

  return (
    <View style={{ flex: 1 }}>
      <ReadOnlyStepValue label="아이디" value={data.userId} />
      <ReadOnlyStepValue label="비밀번호" value={'•'.repeat(data.password.length)} />
      <ReadOnlyStepValue label="이름" value={data.name} />
      {data.birthdate && <ReadOnlyStepValue label="생년월일" value={data.birthdate} />}
      <ReadOnlyStepValue label="성별" value={getGenderText(data.gender)} />
      <ReadOnlyStepValue label="전화번호" value={data.phoneNumber} />
      <ReadOnlyStepValue label="이메일" value={data.email} />
      <ReadOnlyStepValue label="중그룹" value={data.affiliation} />

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
