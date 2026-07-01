import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.default.background },
  keyboardAvoidingView: { flex: 1 },

  content: {
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
    paddingBottom: 120,
    gap: Layout.spacing.l,
  },

  centered: { flex: 1, alignItems: "center", justifyContent: "center" },

  section: { gap: Layout.spacing.s },

    retreatSection: {
      width: "100%",
      alignItems: "center",
    },

    retreatTitle: {
      fontSize: 20,
      lineHeight: 28,
      textAlign: "center",
      fontFamily: "Pretendard-Bold",
      color: Color.primary.main,
    },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
  },

  allButton: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: 6,
    borderRadius: Layout.radius.l,
    backgroundColor: Color.primary.main,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 64,
  },
  allButtonInactive: {
    backgroundColor: Color.secondary.hover,
  },
  allButtonText: {
    color: Color.text.white,
    fontFamily: "Pretendard-Bold",
  },

  mealRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.spacing.s,
  },
  mealDayLabel: {
    width: 44,
    color: Color.primary.main,
    fontFamily: "Pretendard-Bold",
  },
  mealCell: {
    flex: 1,
    height: 40,
    borderRadius: Layout.radius.m,
    alignItems: "center",
    justifyContent: "center",
  },
  mealCellSelected: {
    backgroundColor: Color.primary.main,
  },
  mealCellAvailable: {
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.primary.main,
  },
  mealCellUnavailable: {
    backgroundColor: Color.secondary.hover,
  },
  mealCellTextSelected: {
    color: Color.text.white,
    fontFamily: "Pretendard-Bold",
  },
  mealCellTextAvailable: {
    color: Color.primary.main,
    fontFamily: "Pretendard-Bold",
  },

  transportBlock: {
    gap: Layout.spacing.s,
  },
  transportLabel: {
    color: Color.text.main,
    fontFamily: "Pretendard-Bold",
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
  submitBtn: {
    height: 56,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnDisabled: {
    backgroundColor: Color.primary.hover,
  },
  submitText: {
    color: Color.text.white,
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
  },

  errorText: {
    color: Color.accents.pink,
    textAlign: "center",
  },
});
