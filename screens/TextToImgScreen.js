import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function TextToImgScreen({ route }) {
  const [textInput, setTextInput] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [language, setLanguage] = useState(route.params.language);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTextChange = (text) => {
    setTextInput(text);
  };

  const switchLangtoArb = () => {
    if (language === "Eng") setLanguage("Arb");
  };

  const switchLangtoEng = () => {
    if (language === "Arb") setLanguage("Eng");
  };

  const generateImage = () => {
    // Here you would call your image generation API or library
    // For the sake of this example, let's assume the image is fetched from an endpoint
    if (textInput == "") {
      setGeneratedImage(null);
      setErrorMessage(
        language === "Eng" ? "Please enter a text" : "المرجو كتابة نص."
      );
    } else {
      setErrorMessage("");
      const generatedImg = "https://example.com/generated-image.jpg";
      setGeneratedImage(generatedImg);
    }

    // console.log("new generated pic");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.languageSwitch}>
          <TouchableOpacity onPress={switchLangtoEng}>
            <Text style={styles.switchlang}>Eng /</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={switchLangtoArb}>
            <Text style={styles.switchlang}>Arb</Text>
          </TouchableOpacity>
        </View>
        {language == "Eng" ? (
          <TextInput
            style={styles.input}
            placeholder="Enter Arabic Text"
            value={textInput}
            onChangeText={handleTextChange}
            multiline={true}
          />
        ) : (
          <TextInput
            style={styles.inputArb}
            placeholder="أكتب النص بالعربية"
            value={textInput}
            onChangeText={handleTextChange}
            multiline={true}
          />
        )}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity onPress={generateImage} style={styles.button}>
          <Text style={styles.buttonText}>
            {language == "Eng" ? "Generate Image" : "انشئ صورة"}
          </Text>
        </TouchableOpacity>
      </View>
      {generatedImage && (
        <Image source={{ uri: generatedImage }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  switchlang: {
    fontWeight: "700",
    fontSize: 16,
    margin: 2,
    top: -75,
    left: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 100,
  },
  topSection: {
    width: "100%",
    alignItems: "center",
  },
  languageSwitch: {
    flexDirection: "row",
    marginBottom: 10,
    left: 130,
    top: -20,
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "orange",
    marginTop: 20,
  },
  button: {
    backgroundColor: "orange",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
