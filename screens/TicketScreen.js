import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system'

export default function TicketScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const html = `<html>
    <div style="background-color: orange; color: white; padding: 20px; border-radius: 10px; text-align: center;">
      <h2 style="font-size: 30px; font-weight: bold; margin-bottom: 20px;">Reservation Ticket</h2>
      <div style="text-align: left;">
        <p><strong>Full Name:</strong> ${route.params.FullName}</p>
        <p><strong>Date and Time:</strong> ${route.params.DateHeure}</p>
        <p><strong>Vehicle Type:</strong> ${route.params.type}</p>
        <p><strong>Duration:</strong> ${route.params.duree} hours</p>
        <p><strong>Price:</strong> $${route.params.montant}</p>
      </div>
    </div>
  </html>`;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri)
  };

  function handleDownloadTicket() {
    generatePdf().then(async (file) => {
      try {
        const { uri } = file;
        const { type } = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false, type: 'application/pdf', });
        if (type === 'success') {
          await DocumentPicker.copyAsync({ uri, name: 'ticket.pdf' });
        }
      } catch (error) {
        console.log('Error downloading ticket:', error);
      }
    });
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
