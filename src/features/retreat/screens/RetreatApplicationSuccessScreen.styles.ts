import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.default.background },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Layout.spacing.l,
  },

  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: Color.primary.main,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.l,
  },

  title: {
    color: Color.primary.main,
    fontFamily: "Pretendard-Bold",
    fontSize: 22,
    lineHeight: 32,
    textAlign: "center",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.s,
    backgroundColor: Color.default.background,
  },
  confirmBtn: {
    height: 56,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    color: Color.text.white,
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
  },
});
