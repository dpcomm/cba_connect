import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button } from "@shared/components/button/Button";
import { Header } from "@shared/components/header/Header";
import { LoadingOverlay } from "@shared/components/loading-overlay/LoadingOverlay";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { useRouter } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FindIdResultView } from "./tabs/FindIdResultView";
import { FindIdTab } from "./tabs/FindIdTab";
import { FindPasswordTab } from "./tabs/FindPasswordTab";
import { NewPasswordView } from "./tabs/NewPasswordView";
import { VerificationCodeView } from "./tabs/VerificationCodeView";
import { useFindAccountViewModel } from "./useFindAccountViewModel";

const Tab = createMaterialTopTabNavigator();

export default function AccountSearchScreen() {
  const router = useRouter();
  const handleLogin = () => {
    router.back();
  };

  const vm = useFindAccountViewModel(handleLogin);

  const handleBack = () => {
    router.back();
  };

  const renderFindIdContent = () => {
    if (vm.findIdStep === "result") {
      return (
        <FindIdResultView
          name={vm.name || "알 수 없음"}
          maskedIds={vm.foundIds}
          onLogin={handleLogin}
        />
      );
    }
    return (
      <FindIdTab
        name={vm.name}
        setName={vm.setName}
        phone={vm.phone}
        setPhone={vm.setPhone}
      />
    );
  };

  const renderFindPwContent = () => {
    if (vm.findPwStep === "verification") {
      return (
        <VerificationCodeView
          email={vm.email}
          verificationCode={vm.verificationCode}
          setVerificationCode={vm.setVerificationCode}
          onResend={vm.resendVerificationCode}
          onVerify={vm.submit}
        />
      );
    }
    if (vm.findPwStep === "newPassword") {
      return (
        <NewPasswordView
          newPassword={vm.newPassword}
          setNewPassword={vm.setNewPassword}
          confirmPassword={vm.confirmPassword}
          setConfirmPassword={vm.setConfirmPassword}
        />
      );
    }
    return (
      <FindPasswordTab
        userId={vm.userId}
        setUserId={vm.setUserId}
        email={vm.email}
        setEmail={vm.setEmail}
      />
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.default.background }}
      edges={["top"]}
    >
      <Header title="ID/PW 찾기" onBack={handleBack} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <Tab.Navigator
              backBehavior="none"
              screenOptions={{
                tabBarActiveTintColor: Color.primary.main,
                tabBarInactiveTintColor: Color.text.sub,
                tabBarIndicatorStyle: {
                  backgroundColor: Color.primary.main,
                  height: 2,
                },
                tabBarStyle: {
                  backgroundColor: Color.default.background,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.tertiary.main,
                },
                tabBarLabelStyle: {
                  fontWeight: "600",
                  fontSize: 14,
                },
                swipeEnabled:
                  vm.findIdStep === "input" && vm.findPwStep === "input",
              }}
              screenListeners={{
                state: (e) => {
                  const index = e.data.state?.index ?? 0;
                  vm.setActiveTab(index === 0 ? "ID" : "PW");
                },
              }}
            >
              <Tab.Screen
                name="FindId"
                options={{ tabBarLabel: "아이디 찾기" }}
              >
                {() => renderFindIdContent()}
              </Tab.Screen>
              <Tab.Screen
                name="FindPassword"
                options={{ tabBarLabel: "비밀번호 찾기" }}
              >
                {() => renderFindPwContent()}
              </Tab.Screen>
            </Tab.Navigator>
          </View>
          <View style={{ padding: Layout.spacing.l }}>
            <Button
              title={vm.getButtonTitle()}
              onPress={() => {
                if (vm.activeTab === "ID" && vm.findIdStep === "result") {
                  handleLogin();
                } else {
                  vm.submit();
                }
              }}
              size="large"
              disabled={vm.isSubmitDisabled()}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <LoadingOverlay visible={vm.isLoading} />
    </SafeAreaView>
  );
}
