import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Onboarding() {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <LinearGradient
      colors={["white", "orange"]} // Adjust the colors to get the desired gradient
      style={styles.content}
    >
      <View style={styles.container}>
        <Text style={styles.head}>Welcome to the world of Arabic</Text>
        <Text style={styles.head}>مرحبا بك في عالم العربية</Text>
      </View>

      <TouchableOpacity onPress={navigateToLogin} style={styles.button}>
        <Text style={styles.buttonText}>تابع</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    height: 100,
    width: 100,
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center", // Center the text within the button
    position: "relative",
    top: 50,
  },
  buttonText: {
    color: "orange",
    fontWeight: "700",
    fontSize: 30,
  },
  container: {
    marginTop: 200,
    paddingBottom: 250,
    alignItems: "center",
  },
  head: {
    fontSize: 25,
    fontWeight: "bold",
    color: "orange",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
