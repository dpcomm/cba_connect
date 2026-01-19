import { Ionicons } from "@expo/vector-icons";
import { Button } from "@shared/components/button/Button";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";

interface PermissionModalProps {
  visible: boolean;
  onConfirm: () => void;
}

export function PermissionModal({ visible, onConfirm }: PermissionModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Ionicons
              name="alert-circle-outline"
              size={48}
              color={Color.primary.main}
              style={styles.icon}
            />

            <ThemedText variant="heading3" style={styles.title}>
              앱에서 사용하는 권한 및{"\n"}동의를 안내드립니다.
            </ThemedText>

            <View style={styles.divider} />

            <View style={styles.listContainer}>
              <PermissionItem
                title="푸시 알림 권한"
                required
                description="채팅 알림을 받기 위해 필요합니다."
              />
              <PermissionItem
                title="로그 수집 동의"
                required
                description="채팅 기록 및 활동 로그를 저장하여 신고 기능 및 이용자 수를 받기 위해 필요합니다."
              />
              <PermissionItem
                title="개인정보 수집·제공 동의"
                required
                description="서비스 이용을 위해 이름, 연락처 등 개인정보를 수집·이용·제공합니다."
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.buttonContainer}>
              <Button title="확인했어요" onPress={onConfirm} size="large" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function PermissionItem({
  title,
  required,
  description,
}: {
  title: string;
  required: boolean;
  description: string;
}) {
  return (
    <View style={styles.itemRow}>
      <ThemedText variant="text1" style={styles.bullet}>
        •
      </ThemedText>
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <ThemedText variant="text1" style={{ fontWeight: "bold" }}>
            {title}
          </ThemedText>
          <ThemedText
            variant="text2"
            color={required ? Color.accents.pink : Color.text.sub}
            style={styles.required}
          >
            {required ? "(필수)" : "(선택)"}
          </ThemedText>
        </View>
        <ThemedText
          variant="text2"
          color={Color.text.sub}
          style={styles.description}
        >
          {description}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Layout.spacing.xl,
  },
  container: {
    backgroundColor: Color.secondary.main,
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    overflow: "hidden",
  },
  content: {
    padding: Layout.spacing.xl,
    alignItems: "center",
  },
  icon: {
    marginBottom: Layout.spacing.l,
  },
  title: {
    textAlign: "center",
    marginBottom: Layout.spacing.xl,
  },
  divider: {
    height: 1,
    backgroundColor: Color.text.disabled,
    width: "100%",
    marginVertical: Layout.spacing.l,
  },
  listContainer: {
    width: "100%",
    gap: Layout.spacing.l,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    marginRight: Layout.spacing.s,
    fontSize: 20,
    lineHeight: 20,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  required: {
    marginLeft: Layout.spacing.xs,
  },
  description: {
    lineHeight: 18,
  },
  buttonContainer: {
    width: "100%",
    marginTop: Layout.spacing.s,
  },
});
