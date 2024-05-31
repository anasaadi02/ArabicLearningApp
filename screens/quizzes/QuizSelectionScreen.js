import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function QuizSelectionScreen({ navigation }) {
  const quizzes = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {quizzes.map((quizNumber) => (
        <TouchableOpacity
          key={quizNumber}
          style={styles.button}
          onPress={() => navigation.navigate('QuizScreen', { quizNumber })}
        >
          <Text style={styles.buttonText}>Quiz {quizNumber}</Text>
        </TouchableOpacity>
      ))}
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
    backgroundColor: 'orange',
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
