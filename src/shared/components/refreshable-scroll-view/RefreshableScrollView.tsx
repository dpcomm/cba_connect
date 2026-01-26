import { Color } from "@shared/constants/color";
import React, { ReactNode } from "react";
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from "react-native";

interface Props extends ScrollViewProps {
  children: ReactNode;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function RefreshableScrollView({
  children,
  isRefreshing,
  onRefresh,
  contentContainerStyle,
  ...props
}: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={Color.primary.main}
          colors={[Color.primary.main]}
        />
      }
      contentContainerStyle={[styles.container, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
