<<<<<<< HEAD
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" 
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
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
=======
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React from "react";

export default function LoginScreen() {
  /*helloo*/
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
>>>>>>> ea2508b03a8bc13f2532be58b78717ac16154000
