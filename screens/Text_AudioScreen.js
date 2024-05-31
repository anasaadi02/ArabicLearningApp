import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

export default function Text_AudioScreen({ route }) {
  const [language, setLanguage] = useState(route.params.language);
  const [textInput, setTextInput] = useState("");
  const [spokenText, setSpokenText] = useState([]);
  const [recording, setRecording] = useState(null);
  const [transcription, setTranscription] = useState("");
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

  const handleTextToSpeech = () => {
    Speech.speak(textInput, {
      language: language === "Eng" ? "en-US" : "ar-SA",
    });
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setStarted(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    setStarted(false);
    await getTranscription(uri);
  };

  const getTranscription = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("audio", {
        uri,
        type: "audio/x-wav",
        name: "recording.wav",
      });

      const response = await fetch("http://your-server-address/transcribe", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const transcription = await response.text();
      setTranscription(transcription);
      setSpokenText([...spokenText, transcription]);
    } catch (err) {
      console.error("Failed to get transcription", err);
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
          ? "Text to Speech / Speech to Text"
          : "النص إلى كلام / الكلام إلى نص"}
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
      <TouchableOpacity onPress={handleTextToSpeech} style={styles.button}>
        <Text style={styles.buttonText}>
          {language === "Eng" ? "Text to Speech" : "النص إلى كلام"}
        </Text>
      </TouchableOpacity>
      {!started ? (
        <TouchableOpacity onPress={startRecording} style={styles.button}>
          <Text style={styles.buttonText}>
            {language === "Eng" ? "Start Speech to Text" : "ابدأ الكلام إلى نص"}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {started ? (
        <TouchableOpacity onPress={stopRecording} style={styles.button}>
          <Text style={styles.buttonText}>
            {language === "Eng" ? "Stop Speech to Text" : "أوقف الكلام إلى نص"}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {spokenText.map((text, index) => (
        <Text key={index}>{text}</Text>
      ))}
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
