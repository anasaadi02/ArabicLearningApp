import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function LoginScreen() {

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.head}>ParkingApp</Text>
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
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
         /*onPress={{} =>}*/
         style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
         /*onPress={{} =>}*/
         style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },

  head: {
    fontSize: 50,
    paddingBottom: 50,
    fontWeight: 'bold',
    color: 'orange',
  },

  inputContainer: {
    width: '80%',
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  button: {
    backgroundColor: 'orange',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'orange',
    borderWidth: 2,
  },

  buttonOutlineText: {
    color: 'orange',
    fontWeight: '700',
    fontSize: 16,
  },

});
