import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const quizzes = [
  {
    questions: [
      { question: 'قَلَم (qalam)', options: ['Pencil', 'Book', 'Table', 'Chair'], answer: 0 },
      { question: 'ماء (maa\')', options: ['Fire', 'Water', 'Earth', 'Air'], answer: 1 },
      { question: 'كِتاب (kitab)', options: ['Book', 'Pen', 'Desk', 'Bag'], answer: 0 },
      { question: 'باب (baab)', options: ['Window', 'Door', 'Chair', 'Wall'], answer: 1 },
      { question: 'كُرْسِيّ (kursi)', options: ['Desk', 'Lamp', 'Chair', 'Sofa'], answer: 2 },
      { question: 'Complete the sentence: أنا أَذْهَب إلى ____ (Ana adhhaba ila ____)', options: ['المدرسة (almadrasah)', 'المطار (almatar)', 'الحديقة (alhadiqah)', 'السوق (alsouq)'], answer: 0 },
      { question: 'Complete the sentence: أُحِبُّ أن أَكْتُب بـ ____ (Uhibbu an aktub bi ____)', options: ['القَلَم (alqalam)', 'الكُرسي (alkursi)', 'الباب (albāb)', 'المَاء (almaa\')'], answer: 0 },
      { question: 'Guess the image: كلب (kalb)', options: ['كلب', 'قطة', 'حصان', 'طائر'], answer: 0 }, // Replace with actual image
      { question: 'Guess the image: دراجة (daraja)', options: ['دراجة', 'طائرة', 'سيارة', 'قطار'], answer: 0 }, // Replace with actual image
      { question: 'Complete the sentence: الطفلُ يلعبُ في ____ (al-tifl yal\'abu fi ____)', options: ['المدرسة (almadrasah)', 'الحديقة (alhadiqah)', 'الغرفة (alghurfa)', 'المطبخ (almatbakh)'], answer: 1 },
    ],
  },
  {
    questions: [
      { question: 'شُبّاك (shubbak)', options: ['Door', 'Window', 'Wall', 'Floor'], answer: 1 },
      { question: 'قِطّة (qitta)', options: ['Dog', 'Cat', 'Bird', 'Fish'], answer: 1 },
      { question: 'مِفتاح (miftah)', options: ['Key', 'Door', 'Lock', 'Car'], answer: 0 },
      { question: 'مَكتَبة (maktaba)', options: ['Hospital', 'Market', 'School', 'Library'], answer: 3 },
      { question: 'طِفْل (tifl)', options: ['Adult', 'Child', 'Teacher', 'Doctor'], answer: 1 },
      { question: 'Complete the sentence: أنا أَكتُبُ بـ ____ (Ana aktubu bi ____)', options: ['كِتاب (kitab)', 'طاوِلة (taawila)', 'قَلَم (qalam)', 'باب (baab)'], answer: 2 },
      { question: 'Complete the sentence: الكتاب على ____ (Al-kitab ala ____)', options: ['الكُرسي (alkursi)', 'السَيّارة (alsayyara)', 'الطاولة (altaawila)', 'الباب (albab)'], answer: 3 },
      { question: 'Guess the image:', options: ['شجرة (shajara)', 'زهرة (zahra)', 'سيارة (sayyara)', 'بيت (bayt)'], answer: 1 }, // Replace with actual image
      { question: 'Guess the image:', options: ['دفتر (daftar)', 'كتاب (kitab)', 'قلم (qalam)', 'حاسوب (hasub)'], answer: 2 }, // Replace with actual image
      { question: 'Complete the sentence: الطالبُ في ____ (Al-talib fi ____)', options: ['المَدرَسة (almadrasah)', 'الحَديقة (alhadiqah)', 'الغُرفة (alghurfa)', 'المَطبَخ (almatbakh)'], answer: 0 },
    ],
  },
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function QuizScreen({ route, navigation }) {
  const { quizNumber } = route.params;
  const quiz = quizzes[quizNumber - 1]; // Adjusting index for array access
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const shuffledQuestions = shuffleArray(quiz.questions);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quiz.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>Your score: {score} / {quiz.questions.length}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswer(index)}>
          <Text style={styles.buttonText}>{option}</Text>
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
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});