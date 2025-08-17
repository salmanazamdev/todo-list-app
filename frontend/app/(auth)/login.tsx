import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP_ADDRESS } from "@/constants/endpoint";
import * as LocalAuthentication from "expo-local-authentication";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFingerprintModal, setShowFingerprintModal] = useState(false);
  const [fingerprintStatus, setFingerprintStatus] = useState<"idle" | "success" | "fail">("idle");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      const response = await axios.post(`${IP_ADDRESS}/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        await AsyncStorage.setItem('userId', response.data.userId.toString());
        alert("Login successful!");
        router.push("/(tabs)");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleFingerprintLogin = async () => {
    setShowFingerprintModal(true);
    setFingerprintStatus("idle");
    const registered = await AsyncStorage.getItem("fingerprintRegistered");
    if (!registered) {
      setFingerprintStatus("fail");
      return;
    }
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      setFingerprintStatus("fail");
      return;
    }
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      setFingerprintStatus("fail");
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with your fingerprint",
    });
    if (result.success) {
      // For demo: retrieve userId from AsyncStorage and log in
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        setFingerprintStatus("success");
        setTimeout(() => {
          setShowFingerprintModal(false);
          router.push("/(tabs)");
        }, 1000);
      } else {
        setFingerprintStatus("fail");
      }
    } else {
      setFingerprintStatus("fail");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/onboarding/welcome")}>
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>

      <View style={styles.formBox}>
        <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.loginBtn, { backgroundColor: "#232323", marginTop: 10 }]} onPress={handleFingerprintLogin}>
          <Text style={styles.loginBtnText}>Login with Fingerprint</Text>
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
          Don’t have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/(auth)/signup")}>Register</Text>
        </Text>
      </View>

      {/* Fingerprint Modal */}
      <Modal visible={showFingerprintModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons
              name="finger-print"
              size={60}
              color={
                fingerprintStatus === "success"
                  ? "#4CAF50"
                  : fingerprintStatus === "fail"
                  ? "#F44336"
                  : "#fff"
              }
              style={{ alignSelf: "center", marginBottom: 16 }}
            />
            {fingerprintStatus === "idle" && (
              <Text style={styles.modalText}>
                Please hold your finger at the fingerprint scanner to verify your identity
              </Text>
            )}
            {fingerprintStatus === "success" && (
              <Text style={[styles.modalText, { color: "#4CAF50" }]}>
                Login successful!
              </Text>
            )}
            {fingerprintStatus === "fail" && (
              <Text style={[styles.modalText, { color: "#F44336" }]}>
                Your fingerprint is not matched. Please try again later!!!
              </Text>
            )}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
              <TouchableOpacity onPress={() => setShowFingerprintModal(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFingerprintModal(false)}>
                <Text style={styles.saveBtnText}>Use Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: -30
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
    marginTop: 60,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#232323",
    borderRadius: 16,
    padding: 32,
    width: "85%",
    alignItems: "center",
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  cancelBtn: { color: "#aaa", fontSize: 16, marginRight: 24 },
  saveBtnText: { color: "#8875FF", fontWeight: "bold", fontSize: 16 },
});