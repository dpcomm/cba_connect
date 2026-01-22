import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.default.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: Layout.spacing.xl,
    paddingBottom: 100,
    gap: 20,
  },
  bottomButtonsInScroll: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 64,
    alignItems: "center",
  },
  deleteButtonText: {
    textDecorationLine: "underline",
  },
});
