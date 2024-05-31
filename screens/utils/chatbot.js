import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const ChatScreen = ({ route }) => {
  const [language, setLanguage] = useState(route.params.language);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const API_KEY = "AIzaSyBniqya5Recf3KlH3__fihuMuAoVFxgl0E";
  // const switchLangtoArb = () => {
  //   if (language === "Eng") setLanguage("Arb");
  // };
  // const switchLangtoEng = () => {
  //   if (language === "Arb") setLanguage("Eng");
  // };
  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = language === "Eng" ? "Hello" : "مرحبا";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      showMessage({
        message: "Welcome to Gemini Chat 🤖",
        description: text,
        type: "info",
        icon: "info",
        duration: 2000,
      });
      setMessages([
        {
          text,
          user: false,
        },
      ]);
    };
    //function call
    startChat();
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setIsTyping(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setMessages((prevMessages) => [...prevMessages, { text, user: false }]);
    setLoading(false);
    setIsTyping(false);
    setUserInput("");

    if (text && !isSpeaking) {
      Speech.speak(text);
      setIsSpeaking(true);
      setShowStopIcon(true);
    }
  };

  const toggleSpeech = () => {
    console.log("isSpeaking", isSpeaking);
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(messages[messages.length - 1].text);
      setIsSpeaking(true);
    }
  };

  const ClearMessage = () => {
    setMessages([]);
    setIsSpeaking(false);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userContainer : styles.botContainer,
      ]}
    >
      <Image
        source={
          item.user
            ? require("../../assets/user.png")
            : require("../../assets/robot.png")
        }
        style={styles.icon}
      />
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
      {isTyping && ( // Show typing indicator when bot is typing
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>
            {language == "Eng" ? "typing..." : "يكتب..."}
          </Text>
          <ActivityIndicator size="small" color="white" />
        </View>
      )}
      <View style={styles.inputContainer}>
        {/* <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
          {isSpeaking ? (
            <FontAwesome
              name="microphone-slash"
              size={24}
              color="white"
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <FontAwesome
              name="microphone"
              size={24}
              color="white"
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          )}
        </TouchableOpacity> */}
        <TextInput
          placeholder={language == "Eng" ? "Type a message" : "أكتب النص"}
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <TouchableOpacity style={styles.sendIcon} onPress={sendMessage}>
          <FontAwesome name="send" size={24} color="white" />
        </TouchableOpacity>
        {/* {showStopIcon && (
          <TouchableOpacity style={styles.stopIcon} onPress={ClearMessage}>
            <Entypo name="controller-stop" size={24} color="white" />
          </TouchableOpacity>
        )}
        {loading && <ActivityIndicator size="large" color="black" />} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // switchlang: {
  //   fontWeight: "700",
  //   fontSize: 16,
  //   margin: 2,
  // },
  container: { flex: 1, backgroundColor: "#ffff", marginTop: 50 },
  messageContainer: {
    // left: language == "Eng" ? null : 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  botContainer: {
    justifyContent: "flex-start",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "center",
  },
  typingText: {
    marginRight: 10,
    fontSize: 16,
    color: "white",
  },
  messageText: { fontSize: 16, marginLeft: 10 },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 10,
    height: 50,
    color: "white",
  },
  micIcon: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  sendIcon: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default ChatScreen;
