import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
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
  const { currentStep, next, prev, hasPrev, registerData, updateData, stepIndex } = useRegisterViewModel();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      // Don't intercept back on Welcome screen
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
    // Validation logic per step
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
    // TODO: Call registration API here
    next(); // Move to Welcome step
  };

  const handleGoToLogin = () => {
    router.replace('/' as any);
  };

  // Get steps that should show in history (exclude Terms, Confirmation, Welcome)
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

  const CustomHeader = () => (
    <View style={{ 
      height: 50, 
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingHorizontal: Layout.spacing.m,
      backgroundColor: Color.default.background,
    }}>
      <TouchableOpacity 
        onPress={handleBack} 
        style={{ padding: 8 }}
      >
        <ThemedText variant="heading3">←</ThemedText>
      </TouchableOpacity>
    </View>
  );

  // Welcome Step - Full screen without header history
  if (currentStep === 'Welcome') {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
        <CustomHeader />
        <WelcomeStep name={registerData.name} onGoToLogin={handleGoToLogin} />
      </SafeAreaView>
    );
  }

  // Confirmation Step
  if (currentStep === 'Confirmation') {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
        <CustomHeader />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: Layout.spacing.l }}>
          <View style={{ alignItems: 'center', marginBottom: Layout.spacing.xl }}>
            <RecbaLogo width={210} height={49} />
          </View>
          <View style={{ marginBottom: Layout.spacing.xl, alignItems: 'flex-start' }}>
            <ThemedText variant="heading2">{getStepPrompt(currentStep)}</ThemedText>
          </View>
          <ConfirmationStep data={registerData} onConfirm={handleConfirmRegistration} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Terms Step
  if (currentStep === 'Terms') {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
        <CustomHeader />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: Layout.spacing.l }}>
          <View style={{ alignItems: 'center', marginBottom: Layout.spacing.xl }}>
            <RecbaLogo width={210} height={49} />
          </View>
          <TermsStep 
            agreed={registerData.agreedToTerms}
            setAgreed={(v) => updateData({ agreedToTerms: v })}
            onNext={next} 
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Standard Input Steps
  return (
    <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
      <CustomHeader />
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
