import { Ionicons } from "@expo/vector-icons";
import { ReadOnlyStepValue } from "@features/auth/components/ReadOnlyStepValue";
import { ValidationMessage } from "@features/auth/components/ValidationMessage";
import { AffiliationStep } from "@features/auth/screens/register/steps/AffiliationStep";
import { Button } from "@shared/components/button/Button";
import { Header } from "@shared/components/header/Header";
import { TextInputLined } from "@shared/components/text-input-lined/TextInputLined";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { isValidPassword } from "@shared/utils/validators";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useMyInfoViewModel } from "./useMyInfoViewModel";

export default function MyInfoScreen() {
  const {
    user,
    handleBack,
    handleDeleteAccount,
    getGenderText,
    isEditing,
    editForm,
    startEditing,
    cancelEditing,
    handleChange,
    handleGroupChange,
    saveProfile,
    goToEmailVerification,
  } = useMyInfoViewModel();

  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSave = () => {
    saveProfile(confirmPassword);
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Header title="내 정보" onBack={handleBack} />
        <View style={styles.loadingContainer}>
          <ThemedText variant="text1">로그인 정보가 없습니다.</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Header title="내 정보" onBack={handleBack} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <ReadOnlyStepValue label="아이디" value={user.userId} />

        {isEditing ? (
          <PasswordEditSection
            password={editForm.password || ""}
            onChangePassword={(text) => handleChange("password", text)}
            onConfirmPasswordChange={setConfirmPassword}
          />
        ) : (
          <ReadOnlyStepValue label="비밀번호" value={"•".repeat(8)} />
        )}

        <ReadOnlyStepValue label="이름" value={user.name} />

        {isEditing ? (
          <ReadOnlyStepValue label="이메일" value={user.email || "-"} />
        ) : user.emailVerifiedAt ? (
          <ReadOnlyStepValue label="이메일" value={user.email || "-"} />
        ) : (
          <View style={{ gap: 10 }}>
            <ThemedText variant="text1" color={Color.text.sub}>
              이메일
            </ThemedText>
            <Button
              title="이메일 인증하기"
              size="small"
              onPress={goToEmailVerification}
            />
          </View>
        )}

        {isEditing ? (
          <View style={{ gap: 10 }}>
            <ThemedText variant="text1" color={Color.text.sub}>
              성별
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: Layout.spacing.s,
              }}
            >
              <Button
                title="남자"
                size="small"
                onPress={() => handleChange("gender", "male")}
                style={{
                  backgroundColor:
                    editForm.gender === "male"
                      ? Color.primary.main
                      : Color.tertiary.main,
                }}
              />
              <Button
                title="여자"
                size="small"
                onPress={() => handleChange("gender", "female")}
                style={{
                  backgroundColor:
                    editForm.gender === "female"
                      ? Color.primary.main
                      : Color.tertiary.main,
                }}
              />
              <Button
                title="선택안함"
                size="small"
                onPress={() => handleChange("gender", "")}
                style={{
                  backgroundColor: !editForm.gender
                    ? Color.primary.main
                    : Color.tertiary.main,
                }}
              />
            </View>
          </View>
        ) : (
          <ReadOnlyStepValue label="성별" value={getGenderText(user.gender)} />
        )}

        {isEditing ? (
          <TextInputLined
            label="전화번호"
            value={editForm.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
          />
        ) : (
          <ReadOnlyStepValue label="전화번호" value={user.phone} />
        )}

        {isEditing ? (
          <AffiliationStep
            affiliation={editForm.group || ""}
            setAffiliation={handleGroupChange}
          />
        ) : (
          <ReadOnlyStepValue label="중그룹" value={user.group} />
        )}

        {!isEditing && (
          <View style={{ gap: 10 }}>
            <Button
              size="large"
              title="내 정보 수정하기"
              onPress={startEditing}
            />
            <TouchableOpacity
              onPress={handleDeleteAccount}
              style={styles.deleteButton}
            >
              <ThemedText
                variant="text2"
                color={Color.accents.pink}
                style={styles.deleteButtonText}
              >
                계정 삭제
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {isEditing && (
          <View style={styles.bottomButtonsInScroll}>
            <Button title="저장" onPress={handleSave} style={{ flex: 1 }} />
            <Button
              title="취소"
              onPress={cancelEditing}
              style={{ flex: 1, backgroundColor: Color.tertiary.main }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Password edit section component
function PasswordEditSection({
  password,
  onChangePassword,
  onConfirmPasswordChange,
}: {
  password: string;
  onChangePassword: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
}) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordValid = password.length === 0 || isValidPassword(password);
  const isConfirmMatch = password === confirmPassword;
  const showValidation = password.length > 0;

  const handleConfirmChange = (text: string) => {
    setConfirmPassword(text);
    onConfirmPasswordChange(text);
  };

  return (
    <View>
      <TextInputLined
        label="비밀번호 변경 (선택)"
        placeholder="변경할 비밀번호 입력 (8자 이상)"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={!showPassword}
        rightIcon={
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: 4 }}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color={Color.text.sub}
            />
          </TouchableOpacity>
        }
      />

      {showValidation && (
        <View
          style={{
            marginTop: Layout.spacing.xs,
            marginBottom: Layout.spacing.m,
          }}
        >
          <ValidationMessage
            message="• 8자리 이상 입력(영문/숫자)"
            type="info"
          />
          <ValidationMessage
            message={`• ${isPasswordValid ? "사용가능한 비밀번호입니다." : "사용 불가능한 비밀번호입니다."}`}
            type={isPasswordValid ? "success" : "error"}
          />
        </View>
      )}

      {showValidation && (
        <>
          <TextInputLined
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChangeText={handleConfirmChange}
            secureTextEntry={!showConfirmPassword}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ padding: 4 }}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color={Color.text.sub}
                />
              </TouchableOpacity>
            }
          />

          {confirmPassword.length > 0 && (
            <View style={{ marginTop: Layout.spacing.xs }}>
              <ValidationMessage
                message={`• ${isConfirmMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}`}
                type={isConfirmMatch ? "success" : "error"}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}
