import { Button } from '@shared/components/button/Button';
import { Header } from '@shared/components/header/Header';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecbaLogo from '../../../../../assets/svgs/recba_logo.svg';
import { AffiliationStep } from './steps/AffiliationStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { GenderStep } from './steps/GenderStep';
import { IdStep } from './steps/IdStep';
import { NameStep } from './steps/NameStep';
import { PasswordStep } from './steps/PasswordStep';
import { PhoneStep } from './steps/PhoneStep';
import { TermsStep } from './steps/TermsStep';
import { WelcomeStep } from './steps/WelcomeStep';
import { styles } from './styles';
import { REGISTER_STEPS, RegisterStep, useRegisterViewModel } from './useRegisterViewModel';

export default function RegisterScreen() {
  const { currentStep, next, prev, hasPrev, registerData, updateData, stepIndex, register } = useRegisterViewModel();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      if (currentStep === 'Welcome') {
        return;
      }
      if (hasPrev) {
        e.preventDefault();
        prev();
      }
    });

    return unsubscribe;
  }, [navigation, hasPrev, prev, currentStep]);

  const handleNextAction = () => {
    if (currentStep === 'Name' && !registerData.name.trim()) {
      return;
    }
    if (currentStep === 'Phone' && registerData.phoneNumber.length < 10) {
      return;
    }
    if (currentStep === 'Id' && !registerData.userId.trim()) {
      return;
    }
    if (currentStep === 'Password') {
      if (registerData.password.length < 8) {
        return;
      }
    }
    next();
  };

  const handleConfirmRegistration = () => {
    register();
  };

  const handleGoToLogin = () => {
    router.replace('/' as any);
  };

  const getCompletedSteps = () => {
    const historySteps = REGISTER_STEPS.filter(s => s !== 'Terms' && s !== 'Confirmation' && s !== 'Welcome');
    return historySteps.slice(0, stepIndex - 1).filter(s => s !== currentStep);
  };

  const completedSteps = getCompletedSteps();

  const getStepPrompt = (step: RegisterStep) => {
    switch (step) {
      case 'Name': return '이름을 입력해주세요.';
      case 'Gender': return '성별을 알려주세요.';
      case 'Phone': return '전화번호를 알려주세요.';
      case 'Affiliation': return '내가 속한 중그룹을 선택해주세요.';
      case 'Id': return '사용할 아이디를 입력해주세요.';
      case 'Password': return '사용할 비밀번호를 입력해주세요.';
      case 'Confirmation': return '회원가입 정보를 확인해주세요.';
      default: return '';
    }
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 'Name':
        return <NameStep name={registerData.name} setName={(v) => updateData({ name: v })} onNext={handleNextAction} />;
      case 'Gender':
        return <GenderStep gender={registerData.gender} setGender={(v) => updateData({ gender: v })} onNext={handleNextAction} />;
      case 'Phone':
        return <PhoneStep phoneNumber={registerData.phoneNumber} setPhoneNumber={(v) => updateData({ phoneNumber: v })} onNext={handleNextAction} />;
      case 'Affiliation':
        return <AffiliationStep affiliation={registerData.affiliation} setAffiliation={(v) => updateData({ affiliation: v })} onNext={handleNextAction} />;
      case 'Id':
        return <IdStep userId={registerData.userId} setUserId={(v) => updateData({ userId: v })} onNext={handleNextAction} />;
      case 'Password':
        return <PasswordStep password={registerData.password} setPassword={(v) => updateData({ password: v })} onNext={handleNextAction} />;
      default:
        return null;
    }
  };

  const renderCompletedStep = (step: RegisterStep) => {
    switch (step) {
      case 'Name':
        return <NameStep key={step} name={registerData.name} readOnly />;
      case 'Gender':
        return <GenderStep key={step} gender={registerData.gender} birthdate={registerData.birthdate} readOnly />;
      case 'Phone':
        return <PhoneStep key={step} phoneNumber={registerData.phoneNumber} readOnly />;
      case 'Affiliation':
        return <AffiliationStep key={step} affiliation={registerData.affiliation} readOnly />;
      case 'Id':
        return <IdStep key={step} userId={registerData.userId} readOnly />;
      case 'Password':
        return <PasswordStep key={step} password={registerData.password} readOnly />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (hasPrev) {
      prev();
    } else {
      router.back();
    }
  };

  if (currentStep === 'Welcome') {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
        <Header onBack={handleBack} />
        <WelcomeStep name={registerData.name} onGoToLogin={handleGoToLogin} />
      </SafeAreaView>
    );
  }

  if (currentStep === 'Confirmation') {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
        <Header onBack={handleBack} />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: Layout.spacing.l }}>
          <View style={{ alignItems: 'center', marginBottom: Layout.spacing.xl }}>
            <RecbaLogo width={210} height={49} />
          </View>
          <View style={{ marginBottom: 22, alignItems: 'flex-start' }}>
            <ThemedText variant="heading2">{getStepPrompt(currentStep)}</ThemedText>
          </View>
          <ConfirmationStep data={registerData} onConfirm={handleConfirmRegistration} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentStep === 'Terms') {
    const handleTermsNext = () => {
      if (registerData.agreedToTerms) {
        next();
      } else {
        alert('약관에 동의해주세요.');
      }
    };

    return (
      <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
        <Header onBack={handleBack} />
        <View style={{ flex: 1, padding: Layout.spacing.l }}>
          <View style={{ alignItems: 'center', marginBottom: Layout.spacing.xl }}>
            <RecbaLogo width={210} height={49} />
          </View>
          <TermsStep 
            agreed={registerData.agreedToTerms}
            setAgreed={(v) => updateData({ agreedToTerms: v })}
          />
        </View>
        <View style={{ padding: Layout.spacing.l }}>
          <Button 
            title="다음" 
            onPress={handleTermsNext} 
            size="large"
            disabled={!registerData.agreedToTerms}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (currentStep === 'Email') {
    const handleEmailVerification = () => {
      router.push('/auth/email-verification?source=register' as any);
    };

    // 이메일 인증 완료 후 돌아오면 다음 단계로 진행
    // TODO: 실제로는 이메일 인증 완료 시 콜백으로 처리하거나 상태 확인 필요
    // 현재는 간단하게 버튼으로 이동하도록 구현
    return (
      <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
        <Header onBack={handleBack} />
        <View style={{ flex: 1, padding: Layout.spacing.l }}>
          <View style={{ alignItems: 'center', marginBottom: Layout.spacing.xl }}>
            <RecbaLogo width={210} height={49} />
          </View>
          <View style={{ marginBottom: Layout.spacing.xl, alignItems: 'flex-start' }}>
            <ThemedText variant="heading2">이메일 인증이 필요합니다.</ThemedText>
            <ThemedText variant="text2" color={Color.text.sub} style={{ marginTop: Layout.spacing.s }}>
              회원가입을 위해 이메일 인증을 진행해주세요.
            </ThemedText>
          </View>
        </View>
        <View style={{ padding: Layout.spacing.l, gap: Layout.spacing.m }}>
          <Button 
            title="이메일 인증하기" 
            onPress={handleEmailVerification} 
            size="large"
          />
          {/* 개발용: 인증 스킵 버튼 (추후 제거) */}
          <Button 
            title="인증 완료 (다음으로)" 
            onPress={() => next()} 
            size="large"
            disabled={false}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
      <Header onBack={handleBack} />
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ padding: Layout.spacing.l }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={{ alignItems: 'center', marginBottom: Layout.spacing.xl }}>
          <RecbaLogo width={210} height={49} />
        </View>

        {/* Prompt */}
        <View style={{ marginBottom: Layout.spacing.xl, alignItems: 'flex-start' }}>
          <ThemedText variant="heading2">{getStepPrompt(currentStep)}</ThemedText>
        </View>

        {/* Active Step */}
        <View style={{ marginBottom: Layout.spacing.xl }}>
          {renderActiveStep()}
        </View>

        {/* Completed Steps (Reverse Stack - most recent first) */}
        {completedSteps.slice().reverse().map((step) => renderCompletedStep(step))}
      </ScrollView>
    </SafeAreaView>
  );
}
