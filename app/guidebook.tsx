import { Header } from "@shared/components/header/Header";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { Stack, useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GuidebookScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="가이드북" onBack={() => router.back()} />
      <View style={styles.content}>
        <Image
          source={require("../assets/images/2026_winter_retreat_guidebook.png.jpeg")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.l,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
