import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function Welcome() {
  return (
    <View style={styles.container}>
      
        <TouchableOpacity style={styles.topLeftIcon} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

      {/* Title & Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to AchieveIt</Text>
        <Text style={styles.description}>
          Please login to your account ot create new account to continue
        </Text>
      </View>

      {/* Next and back Button */}
       <View style={styles.btnContainer}> 

      <TouchableOpacity style={styles.loginBtn} onPress={() => router.push("/(auth)/login")} >
    <Text style={styles.backButtonText}>LOGIN</Text>
  </TouchableOpacity>

      <TouchableOpacity style={styles.signupBtn} onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
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
    color: "white",
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
