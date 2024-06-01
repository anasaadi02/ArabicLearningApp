import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function QuizSelectionScreen({ navigation }) {
  const [userScore, setUserScore] = useState(0);
  const quizzes = Array.from({ length: 10 }, (_, i) => i + 1);
  const firestore = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const getUserScore = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            setUserScore(userDoc.data().score);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error getting user score:", error);
        }
      } else {
        console.error("No user is signed in");
      }
    };

    getUserScore();
  }, []);

  const renderQuizItem = (id) => {
    const isUnlocked = userScore >= id || id === 1;
    const backgroundColor = isUnlocked ? 'orange' : '#ccc';
    const title = `Quiz ${id}`;

    return (
      <TouchableOpacity
        key={id}
        disabled={!isUnlocked}
        style={[styles.button, { backgroundColor }]}
        onPress={() => navigation.navigate('QuizScreen', { quizId: id })}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {quizzes.map(id => renderQuizItem(id))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
