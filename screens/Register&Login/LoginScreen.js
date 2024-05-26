import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("Eng");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.message) {
      setInfoMessage(route.params.message);
    }
    if (route.params?.language) {
      setLanguage(route.params.language);
    }
  }, [route.params]);

  async function handleLogin() {
    try {
      // Clear previous error message
      setErrorMessage("");
      setInfoMessage("");

      // Sign in with email and password
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Extract user info
      const user = userCredentials.user;

      // Check if email is verified
      if (!user.emailVerified) {
        setErrorMessage(
          language === "Eng"
            ? "Please verify your email address before logging in."
            : "يرجى التحقق من عنوان بريدك الإلكتروني قبل تسجيل الدخول."
        );
        return;
      }

      // Save user info to AsyncStorage
      await AsyncStorage.setItem("userId", user.uid);

      // Navigate to Home screen
      navigation.navigate("Home", { language });

      // Clear password input
      setPassword("");

      // Reset the navigation stack and navigate to Home screen
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Home", params: { language } }],
      // });
    } catch (error) {
      // Handle login errors
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          console.log("hmm");
          setErrorMessage(
            language === "Eng"
              ? "Invalid email or password."
              : "بريد إلكتروني أو كلمة مرور غير صالحة."
          );
          // case "auth/network-request-failed":
          //   setErrorMessage(
          //     language === "Eng" ? "network essue." : "مشكلة شبكة الانترنيت."
          //   );

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
      if (user && user.emailVerified) {
        navigation.navigate("Home", { language });
      }
    });
    return unsub;
  }, []);

  const switchLangtoArb = () => {
    setLanguage("Arb");
    setErrorMessage(
      errorMessage === "Invalid email or password."
        ? "بريد إلكتروني أو كلمة مرور غير صالحة."
        : errorMessage === "Login failed. Please try again."
        ? "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى في وقت لاحق."
        : errorMessage === "Please verify your email before logging in."
        ? "يرجى التحقق من بريدك الإلكتروني قبل تسجيل الدخول."
        : ""
    );
  };

  const switchLangtoEng = () => {
    setLanguage("Eng");
    setErrorMessage(
      errorMessage === "بريد إلكتروني أو كلمة مرور غير صالحة."
        ? "Invalid email or password."
        : errorMessage ===
          "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى في وقت لاحق."
        ? "Login failed. Please try again."
        : errorMessage === "يرجى التحقق من بريدك الإلكتروني قبل تسجيل الدخول."
        ? "Please verify your email before logging in."
        : ""
    );
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
