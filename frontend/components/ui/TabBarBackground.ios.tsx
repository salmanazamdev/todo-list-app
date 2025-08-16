import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

export default function BlurTabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView
        tint="systemChromeMaterial"
        intensity={100}
        style={StyleSheet.absoluteFill}
      />
      {/* Overlay a dark color for consistency */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(54,54,54,255)" }]} />
    </View>
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}