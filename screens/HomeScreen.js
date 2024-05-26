import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CostumAlert from "./CustomAlert";

export default function HomeScreen({ route }) {
  const [language, setLanguage] = useState(route.params.language);
  const [openAlert, setOpenAlert] = useState(false);
  const navigation = useNavigation();

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

  function TextToImgScreen() {
    navigation.navigate("Images", { language });
  }
  function GoToLettersScreen() {
    navigation.navigate("Letters", { language });
    console.log("navigation succ");
  }
  function goToTextAudioScreen() {
    navigation.navigate("Text_Audio", { language });
  }
  function logout() {
    setOpenAlert(true);
  }
  function TextToImgScreen() {
    navigation.navigate("Images", { language });
  }
  function QuizzScreen() {
    navigation.navigate("Quizz", { language });
  }

  return (
    <ScrollView style={styles.Scroll}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
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
        </View>
        <TouchableOpacity
          style={[styles.button, { marginTop: 100 }]}
          onPress={() => GoToLettersScreen()}
        >
          <Text style={styles.buttonText}>
            {language == "Eng" ? "Lettres" : "الحروف"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
        <TouchableOpacity onPress={goToTextAudioScreen} style={[styles.button]}>
          <Text style={styles.buttonText}>
            {language == "Eng" ? "Audios" : "الصوتيات"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={QuizzScreen} style={[styles.button]}>
          <Text style={styles.buttonText}>
            {language == "Eng" ? "Quizz" : "إختبارات"}
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Scroll: {
    // marginBottom: -300,
  },
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
    fontWeight: "bold",
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
    marginBottom: 10,
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
