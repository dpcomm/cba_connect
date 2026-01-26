import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontFamily: "Pretendard-Bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
    fontFamily: "Pretendard-Regular",
    textAlign: "center",
    lineHeight: 26,
  },
  button: {
    marginTop: 60,
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    color: "#0a0a0a",
    fontFamily: "Pretendard-SemiBold",
  },
  countdown: {
    marginTop: 40,
    fontSize: 14,
    color: "#666",
    fontFamily: "Pretendard-Regular",
  },
});
