import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
  

      const response = await axios.post(`${IP_ADDRESS}/login`, {
        email,
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

  return (
    <View style={styles.container}>
      <View style={styles.topbox}>
        {/* Back button */}
        <TouchableOpacity style={styles.topLeftIcon} onPress={() => router.replace("/onboarding/welcome")}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        {/* Heading */}
        <Text style={styles.title}>Login</Text>
      </View>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.orText}>or</Text>

      {/* Social Buttons */}
      <TouchableOpacity style={styles.socialBtn}>
        <Image source={require("@/assets/images/google.png")} style={styles.icon} />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn}>
        <Image source={require("@/assets/images/apple.png")} style={styles.icon} />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      {/* Bottom Link */}
      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/(auth)/signup")}>Sign up</Text>
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 40,
  },

  topbox: {
    flexDirection: "column",
    rowGap: 30,
    fontWeight: "bold",
    left: -110,
    color: "#fff",
    marginTop: 10,
  },

  topLeftIcon: {},

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#acacacff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    color: "white",
    marginVertical: 6,
  },

  loginBtn: {
    backgroundColor: "#8875FF",
    width: "100%",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  loginBtnText: {
    color: "#d1d1d1ff",
    fontWeight: "bold",
    fontSize: 16,
  },

  orText: {
    marginVertical: 20,
    fontSize: 14,
    color: "#aaa",
  },

  socialBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#8875FF",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  socialText: {
    fontSize: 16,
    color: "white",
  },

  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "white",
  },

  link: {
    color: "#8875FF",
    fontWeight: "bold",
  },
});
