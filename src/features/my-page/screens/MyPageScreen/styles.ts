import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },
  notiButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: 40,
  },
  menuContainer: {
    gap: 28,
  },
  logoutButton: {
    marginTop: 64,
    alignItems: "center",
  },
  logoutText: {
    textDecorationLine: "underline",
  },
});
