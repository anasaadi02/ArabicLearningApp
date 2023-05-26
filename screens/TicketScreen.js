import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TicketScreen() {
  const navigation = useNavigation();

  function handleDownloadTicket() {
    // Logic for downloading the ticket
    // Replace this with your own implementation
    console.log("Ticket downloaded");
  }

  function handleReturnToHome() {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Reservation Done!</Text>
      <TouchableOpacity onPress={handleDownloadTicket} style={styles.button}>
        <Text style={styles.buttonText}>Download Ticket</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReturnToHome} style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  head: {
    fontSize: 30,
    paddingBottom: 50,
    fontWeight: 'bold',
    color: 'orange',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'orange',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutline: {
    backgroundColor: 'red',
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 2,
  },
});
