import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

// Mock transliteration function
const transliterateArabic = (arabicText) => {
  // This is a placeholder. Replace with an actual transliteration method or API.
  const transliterationMap = {
    "ا": "a", "ب": "b", "ت": "t", "ث": "th", "ج": "j", "ح": "h", "خ": "kh",
    "د": "d", "ذ": "dh", "ر": "r", "ز": "z", "س": "s", "ش": "sh", "ص": "s",
    "ض": "d", "ط": "t", "ظ": "dh", "ع": "a", "غ": "gh", "ف": "f", "ق": "q",
    "ك": "k", "ل": "l", "م": "m", "ن": "n", "ه": "h", "و": "w", "ي": "y",
  };
  return arabicText.split("").map(char => transliterationMap[char] || char).join("");
};

export default function TranslationScreen({ route }) {
  const [language, setLanguage] = useState(route.params.language);
  const [textInput, setTextInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [transliteratedText, setTransliteratedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      if (textInput === "") {
        setErrorMessage(
          language === "Eng" ? "Please enter a text" : "المرجو كتابة نص."
        );
      } else {
        setErrorMessage("");
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
        const translatedText = response.data.data.translations[0].translatedText;
        setTranslatedText(translatedText);

        // Transliterate the Arabic text to English letters
        const transliteration = transliterateArabic(translatedText);
        setTransliteratedText(transliteration);
      }
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
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity onPress={handleTranslate} style={styles.button}>
        <Text style={styles.buttonText}>
          {language === "Eng" ? "Translate" : "ترجمة"}
        </Text>
      </TouchableOpacity>

      {translatedText ? (
        <View>
          <Text style={styles.resultText}>{translatedText}</Text>
          <Text style={styles.transliteratedText}>{transliteratedText}</Text>
        </View>
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
  errorText: {
    color: "red",
    marginTop: 2,
    top: -8,
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
  transliteratedText: {
    fontSize: 16,
    marginTop: 10,
    color: "grey",
  },
});
