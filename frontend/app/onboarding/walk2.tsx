import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Walk2() {
  return (
    <View style={styles.container}>
      
      {/* Top Image */}
      <Image
        source={require("@/assets/images/walktwo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title & Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Create daily routine</Text>
        <Text style={styles.description}>
          In AchieveIt, you can create your personalized routine to stay productive
        </Text>
      </View>

      {/* Next and back Button */}
       <View style={styles.btnContainer}> 

      <TouchableOpacity style={styles.backButton} onPress={() => router.back("")} >
    <Text style={styles.backButtonText}>BACK</Text>
  </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/onboarding/walk3")}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  image: {
    width: 320,
    height: 320,
    marginRight: -20,
    marginTop: 30,
    marginBottom: -40
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    marginBottom: 35,
    textAlign: "center"
     },
  description: {
    fontSize: 16,
    color: "#d6d5d5ff",
    textAlign: "center",
  },
    btnContainer: {
    alignItems: "center",
    flexDirection: "row",
    alignContent: "space-around",
    columnGap: 180
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#8875FF",
    width: "20%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
    backButtonText: {
    color: "#5e5e5eff",
    fontSize: 16,

  },
});
