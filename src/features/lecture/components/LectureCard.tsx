import { Lecture } from "@domain/lecture/Lecture";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { formatDateTimePretty } from "@shared/utils/dateFormat";
import { truncateText } from "@shared/utils/truncateText";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  lecture: Lecture;
  status: "WAITING" | "OPEN" | "APPLIED" | "DISABLED";
  onPress: () => void;
  onCancel?: () => void;
  openAt?: string;
  isClosed?: boolean;
}

export function LectureCard({
  lecture,
  status,
  onPress,
  onCancel,
  openAt,
  isClosed = false,
}: Props) {
  const isApplied = status === "APPLIED";
  const isWaiting = status === "WAITING";
  const isDisabled = status === "DISABLED";

  const scheduleStr = formatDateTimePretty(lecture.startTime);

  let containerStyle = styles.container;
  if (isApplied)
    containerStyle = { ...styles.container, ...styles.appliedContainer };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={isWaiting || isDisabled || isClosed}
      style={[containerStyle, isDisabled && { opacity: 0.5 }]}
    >
      <View style={styles.headerRow}>
        <ThemedText
          variant="heading3"
          color={isApplied ? Color.text.white : Color.primary.main}
        >
          {truncateText(lecture.title, 17)}
        </ThemedText>
        {isApplied && onCancel && (
          <TouchableOpacity onPress={onCancel} style={styles.cancelBadge}>
            <ThemedText variant="text2" color={Color.text.white}>
              취소하기
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
      {!isApplied && (
        <View style={{ marginTop: 8 }}>
          <InfoRow label="강사" value={lecture.instructorName} />
          <InfoRow label="장소" value={lecture.location} />
          <InfoRow
            label="인원"
            value={`${lecture.currentCount}/${lecture.maxCapacity}명`}
          />
          <InfoRow label="일정" value={scheduleStr} />
        </View>
      )}

      {/* Waiting/Closed Overlay */}
      {(isWaiting || isClosed) && (
        <View style={styles.overlay}>
          <ThemedText variant="heading3" color={Color.text.white}>
            {isClosed
              ? "마감된 강의입니다."
              : openAt
                ? `${formatDateTimePretty(openAt)} 오픈`
                : "오픈 예정"}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 13 }}>
      <ThemedText variant="text1" color={Color.text.main}>
        {label}
      </ThemedText>
      <ThemedText variant="text1" color={Color.text.sub}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    position: "relative",
    ...Layout.shadow.default,
  },
  appliedContainer: {
    backgroundColor: Color.primary.main,
    borderWidth: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cancelBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Layout.radius.m,
  },
});
