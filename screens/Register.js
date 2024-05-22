import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen({ route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState(route.params.language);

  // const { language } = route.params;

  const switchLangtoArb = () => {
    if (language === "Eng") setLanguage("Arb");
  };
  const switchLangtoEng = () => {
    if (language === "Arb") setLanguage("Eng");
  };
  const navigation = useNavigation();

  function handleRegister() {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log("Registration error:", error);
        });
    } else {
      alert("Passwords do not match");
      console.log("Passwords do not match");
    }
  }
  function handleLogin() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>
            {" "}
            {language == "Eng" ? "Create Account" : "إنشاء حساب"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.orText}>{language == "Eng" ? "or" : "أو"}</Text>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {" "}
            {language == "Eng" ? "Login" : "تسجيل الدخول"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
});
