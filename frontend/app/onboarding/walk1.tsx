import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Walk1() {
  return (
    <View style={styles.container}>
      
      {/* Top Image */}
      <Image
        source={require("@/assets/images/walkone.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title & Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Order for Food</Text>
        <Text style={styles.description}>
          Browse your favorite meals and order instantly.
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/onboarding/walk2")}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  image: {
    width: 350,
    height: 350,
    marginRight: -20,
    marginTop: 50,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#8875FF",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#8875FF",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#8875FF",
    width: "70%",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
