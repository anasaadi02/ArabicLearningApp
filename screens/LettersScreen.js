import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function LettersScreen({ route }) {
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
  const [language, setLanguage] = useState(route.params.language);

  const renderLetter = ({ item }) => (
    <TouchableOpacity style={styles.letterButton}>
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

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "orange",
//     width: "30%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 50,
//   },

//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  grid: {
    justifyContent: "center",
    alignItems: "center", // Added alignment to center the content in the grid
  },
  letterButton: {
    width: 80, // Adjust width and height of TouchableOpacity as needed
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 10,
    margin: 5, // Adjust margin to create space between buttons
  },
  letterText: {
    fontSize: 24,
    color: "white",
  },
});
