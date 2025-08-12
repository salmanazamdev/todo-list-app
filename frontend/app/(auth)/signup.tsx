import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP_ADDRESS } from "@/constants/endpoint";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${IP_ADDRESS}/signup`, {
        username,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        await AsyncStorage.setItem("userId", response.data.userId.toString());
        alert("Registration successful!");
        router.push("/(auth)/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/onboarding/welcome")}
      >
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>

      <View style={styles.formBox}>
        <Text style={styles.title}>Register</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          placeholderTextColor="#6b6b6bff"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="****************"
          placeholderTextColor="#6b6b6bff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="****************"
          placeholderTextColor="#6b6b6bff"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.socialBtn}>
          <Image source={require("@/assets/images/google.png")} style={styles.icon} />
          <Text style={styles.socialText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <Image source={require("@/assets/images/applewhite.png")} style={styles.icon} />
          <Text style={styles.socialText}>Login with Apple</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 24,
    zIndex: 2,
  },
  formBox: {
    marginHorizontal: 24,
    backgroundColor: "transparent",
    paddingVertical: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    alignSelf: "flex-start",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#acacacff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    color: "white",
    marginBottom: 10,
    backgroundColor: "#232323",
  },
  loginBtn: {
    backgroundColor: "#8875FF",
    width: "100%",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#333",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#aaa",
  },
  socialBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#8875FF",
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  socialText: {
    fontSize: 16,
    color: "white",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    marginHorizontal: 80,
    marginBottom: 25,
  },
  footerText: {
    fontSize: 14,
    color: "#999999ff",
  },
  link: {
    color: "#ffffffff",
  },
});
