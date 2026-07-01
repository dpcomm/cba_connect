import { Stack } from "expo-router";
import React from "react";

export default function RetreatLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="check-in" />
      <Stack.Screen name="success" />
      <Stack.Screen name="raffle" />
      <Stack.Screen name="result" />
      <Stack.Screen name="fee-status" />
      <Stack.Screen name="application" />
      <Stack.Screen
        name="application-success"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="application-detail" />
    </Stack>
  );
}
