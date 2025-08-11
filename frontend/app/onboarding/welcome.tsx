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
    <Text style={styles.loginBtnText}>LOGIN</Text>
  </TouchableOpacity>

      <TouchableOpacity style={styles.signupBtn} onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.signupBtnText}>CREATE ACCOUNT</Text>
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

  topLeftIcon: { position: "absolute", top: 30, left: 18, backgroundColor: "#0007", borderRadius: 20, padding: 4 },

  textContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 35
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 35,
    textAlign: "center",
    alignContent: "flex-start"
     },
  description: {
    fontSize: 16,
    color: "#d6d5d5ff",
    textAlign: "center",
    lineHeight: 27
  },
    btnContainer: {
    alignItems: "center",
    flexDirection: "column",
    alignContent: "space-around",

  },

  loginBtn: {
    backgroundColor: "#8875FF",
    paddingVertical: 12,
    paddingHorizontal: 132,
    marginBottom: 10,
  },
    signupBtn: {
    paddingVertical: 12,
    paddingHorizontal: 85,
    marginBottom: 10,
    borderWidth:2,
    borderColor: "#8875FF"
  },

  loginBtnText: {
    color: "#fff",
    fontSize: 16,
  },
    signupBtnText: {
    color: "white",
    fontSize: 16,

  },
});
