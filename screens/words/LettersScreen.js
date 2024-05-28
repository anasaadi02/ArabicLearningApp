import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

const letters = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "ه",
  "و",
  "ي",
];

export default function LettersScreen() {
  const navigation = useNavigation();

  const handleLetterPress = (letter) => {
    navigation.navigate("Display", { letter });
  };

  const renderLetter = ({ item }) => (
    <TouchableOpacity
      style={styles.letterButton}
      onPress={() => handleLetterPress(item)}
    >
      <Text style={styles.letterText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={letters}
        renderItem={renderLetter}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  letterButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 10,
    margin: 5,
  },
  letterText: {
    fontSize: 24,
    color: "white",
  },
});
