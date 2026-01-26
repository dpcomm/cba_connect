import { Color } from "@shared/constants/color";
import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const QR_SIZE = SCREEN_WIDTH * 0.7;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 600,
    height: 240,
  },
  title: {
    fontSize: 18,
    color: "#888",
    fontFamily: "Pretendard-Medium",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 36,
    color: "white",
    fontFamily: "Pretendard-Bold",
    letterSpacing: 4,
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  glowEffect: {
    position: "absolute",
    width: QR_SIZE + 60,
    height: QR_SIZE + 60,
    borderRadius: 30,
    backgroundColor: Color.primary.main,
    shadowColor: Color.primary.main,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 40,
  },
  qrWrapper: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  footer: {
    alignItems: "center",
    marginTop: 60,
  },
  userName: {
    fontSize: 24,
    color: "white",
    fontFamily: "Pretendard-SemiBold",
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Pretendard-Regular",
  },
});
