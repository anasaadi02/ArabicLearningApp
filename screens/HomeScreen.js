import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default function HomeScreen() {
  const [fullname, setFullname] = useState('');
  const [datetime, setDatetime] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  function handleReservation() {
    // TODO: Add reservation logic here
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.head}>Reservation</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Fullname"
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
        />
        <TextInput
          placeholder="Date and Time"
          value={datetime}
          onChangeText={setDatetime}
          style={styles.input}
        />
        <View style={styles.radioContainer}>
          <Text style={styles.radioLabel}>Vehicle Type:</Text>
          <TouchableOpacity
            style={[styles.radioOption, vehicleType === 'car' && styles.radioOptionSelected]}
            onPress={() => setVehicleType('car')}>
            <Text style={[styles.radioOptionLabel, vehicleType === 'car' && styles.radioOptionLabelSelected]}>Car</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioOption, vehicleType === 'truck' && styles.radioOptionSelected]}
            onPress={() => setVehicleType('truck')}>
            <Text style={[styles.radioOptionLabel, vehicleType === 'truck' && styles.radioOptionLabelSelected]}>Truck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioOption, vehicleType === 'motorcycle' && styles.radioOptionSelected]}
            onPress={() => setVehicleType('motorcycle')}>
            <Text style={[styles.radioOptionLabel, vehicleType === 'motorcycle' && styles.radioOptionLabelSelected]}>Motorcycle</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleReservation} style={styles.button}>
        <Text style={styles.buttonText}>Make Reservation</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    paddingBottom: 50,
  },

  head: {
    fontSize: 50,
    paddingBottom: 50,
    fontWeight: 'bold',
    color: 'orange',
  },

  formContainer: {
    width: '80%',
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 30,
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  radioLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },

  radioOption: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  radioOptionLabel: {
    fontWeight: 'bold',
    color: "orange"
  },

  radioOptionLabelSelected: {
    fontWeight: 'bold',
    color: "white"
  },

  radioOptionSelected: {
    backgroundColor: 'orange',
    color: "white",
  },

  button: {
    backgroundColor: 'orange',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
    marginTop: 50,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
