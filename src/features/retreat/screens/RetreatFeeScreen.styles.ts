import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Layout.spacing.l,
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Layout.spacing.m,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: Layout.spacing.s,
  },
  subText: {
    textAlign: "center",
  },
  bottomContainer: {
    alignItems: "center",
    width: "100%",
  },
  bankLabel: {
    marginBottom: Layout.spacing.xs,
  },
  accountText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: Layout.spacing.xl,
    textDecorationLine: "underline",
  },
  toastContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  toastText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
