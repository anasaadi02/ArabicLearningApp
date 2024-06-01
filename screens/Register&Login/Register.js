import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, firestore } from "../../firebase"; // Ensure firestore is imported
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore";

export default function RegisterScreen({ route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState(route.params.language || "Eng");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const switchLangtoArb = () => {
    if (language === "Eng") setLanguage("Arb");
  };
  const switchLangtoEng = () => {
    if (language === "Arb") setLanguage("Eng");
  };

  async function handleRegister() {
    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await sendEmailVerification(user);

        // Add user information to Firestore with an initial integer field
        await setDoc(doc(firestore, "users", user.uid), {
          email: user.email,
          score: 1, // Initialize the integer field with 0
        });

        navigation.navigate("Login", {
          language,
          message:
            language === "Eng"
              ? "Verification email sent. Please check your inbox."
              : "تم إرسال بريد التحقق. يرجى التحقق من بريدك الوارد.",
        });
      } catch (error) {
        console.log("Registration error:", error);
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage(
              language === "Eng"
                ? "The email address is already in use by another account."
                : "عنوان البريد الإلكتروني مستخدم بالفعل من قبل حساب آخر."
            );
            break;
          case "auth/invalid-email":
            setErrorMessage(
              language === "Eng"
                ? "The email address is not valid."
                : "عنوان البريد الإلكتروني غير صالح."
            );
            break;
          case "auth/weak-password":
            setErrorMessage(
              language === "Eng"
                ? "The password is too weak."
                : "كلمة المرور ضعيفة جدًا."
            );
            break;
          case "auth/network-request-failed":
            setErrorMessage(
              language === "Eng" ? "Network issue." : "مشكلة شبكة الانترنت."
            );
            break;
          default:
            setErrorMessage(
              language === "Eng"
                ? "Registration failed. Please try again."
                : "فشل التسجيل. يرجى المحاولة مرة أخرى."
            );
            break; // Added missing break statement
        }
      }
    } else {
      setErrorMessage(
        language === "Eng"
          ? "Passwords do not match."
          : "كلمات المرور غير متطابقة."
      );
    }
  }

  function handleLogin() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.languageSwitchContainer}>
        <TouchableOpacity onPress={switchLangtoEng}>
          <Text style={styles.switchLang}>Eng /</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchLangtoArb}>
          <Text style={styles.switchLang}>Arb</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        {language == "Eng" ? "Register" : "تسجيل"}
      </Text>
      <View style={styles.inputContainer}>
        {language == "Eng" ? (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        ) : (
          <TextInput
            style={styles.inputArb}
            placeholder="البريد الإلكتروني"
            value={email}
            onChangeText={setEmail}
          />
        )}
        {language == "Eng" ? (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        ) : (
          <TextInput
            style={styles.inputArb}
            placeholder="الرمز السري"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        )}
        {language == "Eng" ? (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        ) : (
          <TextInput
            style={styles.inputArb}
            placeholder="تأكيد الرمز السري"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>
            {language == "Eng" ? "Create Account" : "إنشاء حساب"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.orText}>{language == "Eng" ? "or" : "أو"}</Text>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {language == "Eng" ? "Login" : "تسجيل الدخول"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchLang: {
    fontWeight: "700",
    fontSize: 16,
    margin: 2,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    paddingBottom: 50,
    fontWeight: "bold",
    color: "orange",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputArb: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    width: "80%",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  button: {
    backgroundColor: "orange",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
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
  languageSwitchContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    left: 150,
    top: -100,
  },
});
