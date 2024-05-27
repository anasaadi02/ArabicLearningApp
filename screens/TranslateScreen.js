import React, { useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function TranslationScreen({ route }) {
  const [language, setLanguage] = useState(route.params.language);
  const [textInput, setTextInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [started, setStarted] = useState(false);

  const switchLangtoArb = () => {
    if (language === "Eng") setLanguage("Arb");
  };

  const switchLangtoEng = () => {
    if (language === "Arb") setLanguage("Eng");
  };

  const handleTextChange = (text) => {
    setTextInput(text);
  };

  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2`,
        {},
        {
          params: {
            q: textInput,
            target: "ar",
            key: "AIzaSyDwkC7jy1qDRhqcyOJ8_85-4sxtdvfgI_o",
          },
        }
      );
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageSwitch}>
        <TouchableOpacity onPress={switchLangtoEng}>
          <Text style={styles.switchlang}>Eng /</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchLangtoArb}>
          <Text style={styles.switchlang}>Arb</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>
        {language === "Eng"
          ? "English To Arabic Translation"
          : "ترجمة من الإنجليزية إلى العربية"}
      </Text>
      <TextInput
        style={language === "Eng" ? styles.input : styles.inputArb}
        placeholder={
          language === "Eng" ? "Enter Arabic Text" : "أكتب النص بالعربية"
        }
        value={textInput}
        onChangeText={handleTextChange}
        multiline={true}
      />
      <TouchableOpacity onPress={handleTranslate} style={styles.button}>
        <Text style={styles.buttonText}>
          {language === "Eng" ? "Translate" : "ترجمة"}
        </Text>
      </TouchableOpacity>
      {translatedText ? (
        <Text style={styles.resultText}>{translatedText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  languageSwitch: {
    flexDirection: "row",
    marginBottom: 10,
    left: 130,
    top: -20,
  },
  switchlang: {
    fontWeight: "700",
    fontSize: 16,
    margin: 2,
    top: -135,
    left: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  head: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 100,
    width: "100%",
    borderColor: "orange",
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  inputArb: {
    height: 100,
    width: "100%",
    borderColor: "orange",
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    textAlign: "right",
  },
  button: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  resultText: {
    fontSize: 18,
    marginTop: 20,
  },
});
