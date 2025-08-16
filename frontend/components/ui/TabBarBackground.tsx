import React from "react";
import { View } from "react-native";

export default function TabBarBackground() {
  return (
    <View style={{ flex: 1, backgroundColor: "#363636" }} />
  );
}

export function useBottomTabOverflow() {
  return 0;
}