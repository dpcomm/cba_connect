import { Color } from "@shared/constants/color";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const BANNER_SIZE = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
const AUTO_SCROLL_INTERVAL = 3000;

interface MainBannerProps {
  images: ImageSourcePropType[];
}

export function MainBanner({ images }: MainBannerProps) {
  const [pageIndex, setPageIndex] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const totalPages = images.length;

  const extendedImages =
    totalPages > 1 ? [images[totalPages - 1], ...images, images[0]] : images;

  // 자동 스크롤
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

  // 무한 스크롤 처리
  useEffect(() => {
    if (totalPages <= 1) return;

    // 마지막 배너일 경우 처음으로 이동
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

    // 처음 배너일 경우 마지막으로 이동
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
          <Image key={index} source={image} style={styles.image} />
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
});
