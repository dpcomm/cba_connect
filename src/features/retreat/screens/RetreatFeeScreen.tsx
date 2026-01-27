import { Ionicons } from "@expo/vector-icons";
import { Button } from "@shared/components/button/Button";
import { Header } from "@shared/components/header/Header";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./RetreatFeeScreen.styles";
import { useRetreatFeeViewModel } from "./useRetreatFeeViewModel";

export default function RetreatFeeScreen() {
  const { isPaid, accountInfo, handleCopy, handleBack, toastVisible } =
    useRetreatFeeViewModel();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <Header title="회비 납부 조회" onBack={handleBack} />

      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.iconCircle,
              { borderColor: isPaid ? Color.primary.main : "#C4C4C4" },
            ]}
          >
            <Ionicons
              name="checkmark"
              size={40}
              color={isPaid ? Color.primary.main : "#C4C4C4"}
            />
          </View>

          <ThemedText
            variant="heading1"
            color={isPaid ? Color.primary.main : "#84888C"}
            style={styles.statusText}
          >
            {isPaid ? "회비 납부 완료" : "회비 납부 전"}
          </ThemedText>

          {!isPaid && (
            <ThemedText variant="text1" color="#84888C" style={styles.subText}>
              아래 계좌 번호를 통해 납부해주세요 :)
            </ThemedText>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <ThemedText
            variant="heading3"
            color="#000000"
            style={styles.bankLabel}
          >
            수련회비 납부 및 후원계좌
          </ThemedText>
          <ThemedText
            variant="heading3"
            color="#000000"
            style={styles.accountText}
          >
            {accountInfo}
          </ThemedText>

          <Button title="복사하기" onPress={handleCopy} />
        </View>
      </View>

      {toastVisible && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>복사되었습니다</Text>
        </View>
      )}
    </View>
  );
}
