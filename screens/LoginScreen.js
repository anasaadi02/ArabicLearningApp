import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("Eng");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  async function handleLogin() {
    try {
      // Clear previous error message
      setErrorMessage("");

      // Sign in with email and password
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Log user credentials for debugging
      // console.log("User credentials:", userCredentials);

      // Extract user info
      const user = userCredentials.user;

      // Save user info to AsyncStorage
      await AsyncStorage.setItem("userId", user.uid);

      // Navigate to Home screen
      navigation.navigate("Home", { language });
    } catch (error) {
      // Log the error for debugging
      // console.error("Login error:", error);

      // Handle login errors
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMessage(
            language === "Eng"
              ? "Invalid email or password."
              : "بريد إلكتروني أو كلمة مرور غير صالحة."
          );
          break;
        default:
          setErrorMessage(
            language === "Eng"
              ? "Login failed. Please try again."
              : "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى في وقت لاحق."
          );
      }
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home", { language });
      }
    });
    return unsub;
  }, []);

  const switchLangtoArb = () => {
    if (language === "Eng") setLanguage("Arb");
  };

  const switchLangtoEng = () => {
    if (language === "Arb") setLanguage("Eng");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          left: 150,
          top: -100,
        }}
      >
        <TouchableOpacity onPress={switchLangtoEng}>
          <Text style={styles.switchlang}>Eng /</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchLangtoArb}>
          <Text style={styles.switchlang}>Arb</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.head}>
        {language === "Eng" ? "Arabe Learning" : "تعلم العربية"}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={language === "Eng" ? "Email" : "البريد الإلكتروني"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder={language === "Eng" ? "Password" : "الرقم السري"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>
            {language === "Eng" ? "Login" : "تسجيل الدخول"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.orText}>{language === "Eng" ? "or" : "أو"}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register", { language })}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {language === "Eng" ? "Create a New Account" : "إنشاء حساب"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  switchlang: {
    fontWeight: "700",
    fontSize: 16,
    margin: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  head: {
    fontSize: 50,
    paddingBottom: 50,
    fontWeight: "bold",
    color: "orange",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "orange",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "orange",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "orange",
    fontWeight: "700",
    fontSize: 16,
  },
  orText: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
});
