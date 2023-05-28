import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, db } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Database, ref, set } from '@firebase/database';


export default function HomeScreen() {
  const [fullname, setFullname] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty')
  const [duree, setDuree] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  let datestr = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' | ' + date.getHours() + ' : ' + date.getMinutes();
  const navigation = useNavigation();

  let data = [fullname, auth.currentUser?.email, vehicleType, datestr, duree, montant(duree, vehicleType)];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime)
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  function handleReservation() {
    set(ref(db, 'reservations/' + fullname), {
      FullName: fullname, 
      Email: auth.currentUser?.email,
      type: vehicleType,
      DateHeure: datestr,
      duree: duree,
      montant : montant(duree, vehicleType)
    }).then(navigation.navigate('Ticket', {
      FullName: fullname, 
      Email: auth.currentUser?.email,
      type: vehicleType,
      DateHeure: datestr,
      duree: duree,
      montant : montant(duree, vehicleType)
    }));
  };

  function logout() {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) {
        navigation.navigate("Login");
      }
    })
    return unsub;
  }, []);

  function montant(duree, vehicleType) {
    duree = parseInt(duree);
    if (vehicleType === 'car'){
      return duree*5
    }else if (vehicleType === 'truck'){
      return duree*8
    }else if (vehicleType === 'motorcycle'){
      return duree*3
    }

  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.head}>Reservation</Text>
      <View style={styles.formContainer}>
        <Text style={styles.radioLabel}>Nom et Prénom:</Text>
        <TextInput
          placeholder="Fullname"
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
        />
        <View style={styles.datepicker}>
          <TouchableOpacity onPress={() => showMode('date')} style={styles.dateNTime}>
            <Text style={styles.buttonText}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showMode('time')} style={styles.dateNTime}>
            <Text style={styles.buttonText}>Time</Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />)}

        <Text style={styles.radioLabel}>Durée éstimée (en heure):</Text>
        <TextInput
          placeholder="Durée"
          value={duree}
          onChangeText={setDuree}
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
      <TouchableOpacity onPress={logout} style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonText}>Logout</Text>
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
    marginBottom: 20,
    marginTop: 10,
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  radioLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 5,
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

  datepicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  dateNTime: {
    backgroundColor: 'orange',
    marginLeft: 7,
    marginRight: 7,
    height: 40,
    width: '45%',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
  },
});
