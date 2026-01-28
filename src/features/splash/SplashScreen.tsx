import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import RecbaLogo from "../../../assets/svgs/recba_logo.svg";

interface Props {
  isAppReady: boolean;
  onFinish: () => void;
}

export function CustomSplashScreen({ isAppReady, onFinish }: Props) {
  const containerOpacity = useSharedValue(1);
  const iconScale = useSharedValue(0.8);
  const iconOpacity = useSharedValue(0);

  useEffect(() => {
    const hideNativeSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch {}
    };
    hideNativeSplash();

    iconOpacity.value = withTiming(1, { duration: 800 });
    iconScale.value = withTiming(1, { duration: 800 });
  }, [iconOpacity, iconScale]);

  useEffect(() => {
    if (isAppReady) {
      containerOpacity.value = withDelay(
        3000,
        withTiming(0, { duration: 500 }, (finished) => {
          if (finished) {
            runOnJS(onFinish)();
          }
        }),
      );
    }
  }, [isAppReady, containerOpacity, onFinish]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
      transform: [{ scale: iconScale.value }],
    };
  });

  const bottomLogoStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        <Image
          source={require("../../../assets/images/icon.png")}
          style={styles.icon}
          contentFit="contain"
        />
      </Animated.View>

      <Animated.View style={[styles.bottomLogoContainer, bottomLogoStyle]}>
        <RecbaLogo width={120} height={40} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 120,
    height: 120,
  },
  bottomLogoContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
