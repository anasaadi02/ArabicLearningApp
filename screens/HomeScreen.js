import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
} from "react-native";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Database, ref, set } from "@firebase/database";
import { Button } from "react-native-elements";
import CostumAlert from "./CustomAlert";

export default function HomeScreen({ route }) {
  // const [fullname, setFullname] = useState("");
  const [language, setLanguage] = useState(route.params.language);
  const [popup, setpopup] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState("date");
  // const [show, setShow] = useState(false);
  // const [text, setText] = useState("Empty");
  // const [duree, setDuree] = useState("");
  // const [vehicleType, setVehicleType] = useState("");
  const switchLangtoArb = () => {
    if (language === "Eng") setLanguage("Arb");
  };
  const switchLangtoEng = () => {
    if (language === "Arb") setLanguage("Eng");
  };
  const navigateToLogin = () => {
    setOpenAlert(false);
    navigation.navigate("Login");
  };
  // let datestr =
  //   date.getDate() +
  //   "/" +
  //   (date.getMonth() + 1) +
  //   "/" +
  //   date.getFullYear() +
  //   " | " +
  //   date.getHours() +
  //   " : " +
  //   date.getMinutes();
  const navigation = useNavigation();

  // let data = [fullname, auth.currentUser?.email, vehicleType, datestr, duree, montant(duree, vehicleType)];

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  //   let tempDate = new Date(currentDate);
  //   let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
  //   let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
  //   setText(fDate + '\n' + fTime)
  // };
  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // function handleReservation() {
  //   set(ref(db, 'reservations/' + fullname), {
  //     FullName: fullname,
  //     Email: auth.currentUser?.email,
  //     type: vehicleType,
  //     DateHeure: datestr,
  //     duree: duree,
  //     montant : montant(duree, vehicleType)
  //   }).then(navigation.navigate('Ticket', {
  //     FullName: fullname,
  //     Email: auth.currentUser?.email,
  //     type: vehicleType,
  //     DateHeure: datestr,
  //     duree: duree,
  //     montant : montant(duree, vehicleType)
  //   }));
  // };

  function TextToImgScreen() {
    navigation.navigate("Images", { language });
  }
  function GoToLettersScreen() {
    navigation.navigate("Letters", { language });
    console.log("navigation succ");
  }
  function logout() {
    setOpenAlert(true);
  }

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, user => {
  //     if (!user) {
  //       navigation.navigate("Login");
  //     }
  //   })
  //   return unsub;
  // }, []);

  // function montant(duree, vehicleType) {
  //   duree = parseInt(duree);
  //   if (vehicleType === 'car'){
  //     return duree*5
  //   }else if (vehicleType === 'truck'){
  //     return duree*8
  //   }else if (vehicleType === 'motorcycle'){
  //     return duree*3
  //   }

  // };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <CostumAlert
        isVisible={openAlert}
        title="للمتابعة و الاطلاع على التفاصيل، يجب عليك تسجيل الدخول."
        actionToAccept={() => navigateToLogin()}
        actionToDecline={() => setOpenAlert(false)}
        buttonText="تسجيل الدخول"
      /> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          left: 150,
          top: 30,
        }}
      >
        <TouchableOpacity onPress={switchLangtoEng}>
          <Text style={styles.switchlang}>Eng /</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchLangtoArb}>
          <Text style={styles.switchlang}>Arb</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.head}>
        {language == "Eng" ? "Activities List" : "لائحة الأنشطة"}
      </Text>
      <View style={styles.formContainer}>
        <Text style={styles.radioLabel}>
          {language == "Eng"
            ? "choose an option to continue learning"
            : "إختر احد الإختيارات للإستكمال التعلم  "}
        </Text>
        {/* <TextInput
          placeholder="Fullname"
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
        /> */}
        {/* <View style={styles.datepicker}>
          <TouchableOpacity onPress={() => showMode('date')} style={styles.dateNTime}>
            <Text style={styles.buttonText}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showMode('time')} style={styles.dateNTime}>
            <Text style={styles.buttonText}>Time</Text>
          </TouchableOpacity>
        </View> */}

        {/* {show && (
          <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />)} */}
        {/* 
        <Text style={styles.radioLabel}>Duration (Hours):</Text>
        <TextInput
          placeholder=""
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
        </View> */}
      </View>
      {/* <TouchableOpacity onPress={handleReservation} style={styles.button}>
        <Text style={styles.buttonText}>Make Reservation</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        // onPress={logout}
        style={[styles.button, { marginTop: 100 }]}
        onPress={() => GoToLettersScreen()}
      >
        <Text style={styles.buttonText}>
          {language == "Eng" ? "Lettres" : "الحروف"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={logout}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {language == "Eng" ? "Traduction" : "الترجمة"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => TextToImgScreen()}
        style={[styles.button]}
      >
        <Text style={styles.buttonText}>
          {language == "Eng" ? "Images" : "الصور"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={logout}
        style={[styles.button]}
      >
        <Text style={styles.buttonText}>
          {language == "Eng" ? "Audios" : "الصوتيات"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={logout}
        style={[styles.button, styles.buttonOutline]}
      >
        <CostumAlert
          isVisible={openAlert}
          title={
            language == "Eng"
              ? "Are you shure of loging out"
              : "هل أنت متأكد من الخروج"
          }
          actionToAccept={() => navigateToLogin()}
          actionToDecline={() => setOpenAlert(false)}
          decline={language == "Eng" ? "decline" : "إلغاء"}
          buttonText={language == "Eng" ? "validate" : "تأكيد"}
        />
        <Text style={[styles.buttonText]}>
          {language == "Eng" ? "Logout" : "تسجيل الخروج"}
        </Text>
      </TouchableOpacity>
      {/* {popup && (
        <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
          <Text>tst</Text>
          <Button>hi</Button>
        </View>
      )} */}
    </KeyboardAvoidingView>
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
    paddingBottom: 50,
  },

  head: {
    fontSize: 50,
    paddingBottom: 50,
    fontWeight: "bold",
    color: "orange",
    top: 50,
  },

  formContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
    top: 50,
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  radioLabel: {
    // fontWeight: "bold",
    marginRight: 10,
    marginTop: 5,
    top: 50,
    textAlign: "center",
    fontWeight: 25,
    fontSize: 17,
  },

  radioOption: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  radioOptionLabel: {
    fontWeight: "bold",
    color: "orange",
  },

  radioOptionLabelSelected: {
    fontWeight: "bold",
    color: "white",
  },

  radioOptionSelected: {
    backgroundColor: "orange",
    color: "white",
  },

  button: {
    backgroundColor: "orange",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutline: {
    backgroundColor: "red",
    marginTop: 20,
    borderColor: "white",
    borderWidth: 2,
  },

  datepicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },

  dateNTime: {
    backgroundColor: "orange",
    marginLeft: 7,
    marginRight: 7,
    height: 40,
    width: "45%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
