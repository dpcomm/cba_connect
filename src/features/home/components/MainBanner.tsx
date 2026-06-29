import { Ionicons } from "@expo/vector-icons";
import { Color } from "@shared/constants/color";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const BANNER_SIZE = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
const AUTO_SCROLL_INTERVAL = 3000;

interface MainBannerProps {
  images: ImageSourcePropType[];
}

function ZoomableImage({
  source,
  onClose,
}: {
  source: ImageSourcePropType;
  onClose: () => void;
}) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        savedScale.value = scale.value;
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value !== 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        scale.value = withTiming(2);
        savedScale.value = 2;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const composedGestures = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    doubleTapGesture,
  );

  return (
    <GestureDetector gesture={composedGestures}>
      <Animated.Image
        source={source}
        style={[styles.fullScreenImage, animatedStyle]}
        resizeMode="contain"
      />
    </GestureDetector>
  );
}

export function MainBanner({ images }: MainBannerProps) {
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const totalPages = images.length;

  const extendedImages =
    totalPages > 1 ? [images[totalPages - 1], ...images, images[0]] : images;

  useEffect(() => {
    if (totalPages <= 1) return;

    const intervalId = setInterval(() => {
      setPageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * BANNER_SIZE,
          animated: true,
        });
        return nextIndex;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [totalPages]);

  useEffect(() => {
    if (totalPages <= 1) return;

    if (pageIndex === totalPages + 1) {
      const timeoutId = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: BANNER_SIZE,
          animated: false,
        });
        setPageIndex(1);
      }, 500);
      return () => clearTimeout(timeoutId);
    }

    if (pageIndex === 0) {
      const timeoutId = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: totalPages * BANNER_SIZE,
          animated: false,
        });
        setPageIndex(totalPages);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [pageIndex, totalPages]);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / BANNER_SIZE);

    setPageIndex(newIndex);
  };

  const handleImagePress = (image: ImageSourcePropType) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const displayPage = (pageIndex - 1 + totalPages) % totalPages;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentOffset={{ x: totalPages > 1 ? BANNER_SIZE : 0, y: 0 }}
        style={styles.scrollView}
      >
        {extendedImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => handleImagePress(image)}
          >
            <Image source={image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === displayPage
                      ? Color.secondary.main
                      : "rgba(255,255,255,0.4)",
                },
              ]}
            />
          ))}
        </View>
      )}

      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={closeImageModal}
        animationType="fade"
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            {selectedImage && (
              <ZoomableImage source={selectedImage} onClose={closeImageModal} />
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeImageModal}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: BANNER_SIZE,
    height: BANNER_SIZE,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  scrollView: {
    width: BANNER_SIZE,
    height: BANNER_SIZE,
  },
  image: {
    width: BANNER_SIZE,
    height: BANNER_SIZE,
    resizeMode: "cover",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    zIndex: 999,
  },
});
