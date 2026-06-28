import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.default.background },

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Layout.spacing.l,
  },
  errorText: { color: Color.accents.pink, textAlign: "center" },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: 6,
    borderRadius: Layout.radius.l,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.primary.main,
  },
  statusBadgeText: {
    color: Color.primary.main,
    fontFamily: "Pretendard-Bold",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.s,
    backgroundColor: Color.default.background,
  },
  // 신청서 화면 제출 버튼과 동일 규격 (height 56, radius m)
  actionBtn: {
    flex: 1,
    height: 56,
    borderRadius: Layout.radius.m,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: {
    backgroundColor: Color.primary.main,
  },
  editBtnText: {
    color: Color.text.white,
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.primary.main,
  },
  cancelBtnText: {
    color: Color.primary.main,
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
  },
});
