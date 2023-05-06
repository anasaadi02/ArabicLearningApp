import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React from "react";

export default function LoginScreen() {
  /*hello*/
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          //value={}
          //onChangeText={text =>}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          //value={}
          //onChangeText={text =>}
          style={styles.input}
          SecureTextEntry
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
