import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FocusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Focus mode coming soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181818", justifyContent: "center", alignItems: "center" },
  text: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});