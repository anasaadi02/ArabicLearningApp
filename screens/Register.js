import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

    function handleRegister() {
        if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate('Login');
            })
            .catch((error) => {
            console.log('Registration error:', error);
            });
        } else {
        alert('Passwords do not match');
        console.log('Passwords do not match');
        }
    }
    function handleLogin() {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
                <TouchableOpacity
                onPress={() => handleLogin()}
                style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Login</Text>
                </TouchableOpacity>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 50,
    paddingBottom: 50,
    fontWeight: 'bold',
    color: 'orange',
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },

  inputContainer: {
    width: '80%',
  },

  button: {
    backgroundColor: 'orange',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  orText: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
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
