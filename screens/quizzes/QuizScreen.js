import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { fetchImage } from './UnsplashQuiz';

const quizzes = [
  {
    questions: [
      { question: 'What is the Arabic letter "ب" pronounced as?', options: ['Ba', 'Ta', 'Tha', 'Jeem'], answer: 0 },
      { question: 'Which of the following is a basic greeting in Arabic?', options: ['Marhaba', 'Shukran', 'Mumkin', 'La'], answer: 0 },
      { question: 'What does "مَرْحَبًا" (marhaban) mean in English?', options: ['Thank you', 'Yes', 'Hello', 'Goodbye'], answer: 2 },
      { question: 'What is the Arabic word for "Good morning"?', options: ['مساء الخير (masa\' al-khayr)', 'صباح الخير (sabah al-khayr)', 'ليلة سعيدة (laylat sa\'eedah)', 'شكرًا (shukran)'], answer: 1 },
      { question: 'What does "كيف حالك؟" (kayfa haluk?) mean in English?', options: ['How are you?', 'What is your name?', 'Where are you from?', 'Thank you'], answer: 0 },
      { question: 'What is the Arabic word for "yes"?', options: ['نعم (na\'am)', 'لا (la)', 'شكرا (shukran)', 'مرحبا (marhaba)'], answer: 0 },
      { question: 'What does "أنا" (ana) mean in English?', options: ['Yes', 'No', 'You', 'I'], answer: 3 },
      { question: 'Guess the Arabic letter: ش', options: ['ج (jeem)', 'خ (kha)', 'ش (sheen)', 'غ (ghain)'], answer: 2 },
      { question: 'Guess the Arabic letter: ع', options: ['س (seen)', 'ص (sad)', 'ع (ain)', 'غ (ghain)'], answer: 2 },
      { question: 'Complete the sentence: أنا أدرس في ____ (Ana adrusu fi ____)', options: ['المدرسة (al-madrasah)', 'الحديقة (al-hadiqah)', 'المستشفى (al-mustashfa)', 'المطبخ (al-matbakh)'], answer: 0 },
    ],    
  },
  {
    questions: [
      { question: 'What is the Arabic letter "ق" pronounced as?', options: ['Kaaf', 'Qaf', 'Taa', 'Daal'], answer: 1 },
      { question: 'Which of the following is a common response to "كيف حالك؟" (kayfa haluk?)', options: ['بخير، شكرًا (bikhair, shukran)', 'من أين أنت؟ (min ayna anta?)', 'إنا بخير (inna bikhair)', 'مرحبا (marhaba)'], answer: 0 },
      { question: 'What does "من أين أنت؟" (min ayna anta?) mean in English?', options: ['How are you?', 'What is your name?', 'Where are you from?', 'Thank you'], answer: 2 },
      { question: 'What is the Arabic word for "please"?', options: ['من فضلك (min fadlik)', 'شكرًا (shukran)', 'عذرًا (udhran)', 'لا (la)'], answer: 0 },
      { question: 'What does "سررت بلقائك" (surirt bilqa’ik) mean in English?', options: ['Nice to meet you', 'How are you?', 'Thank you', 'Excuse me'], answer: 0 },
      { question: 'What is the Arabic word for "where"?', options: ['متى (mata)', 'أين (ayn)', 'ماذا (mada)', 'كيف (kayfa)'], answer: 1 },
      { question: 'What does "أهلا وسهلا" (ahlan wa sahlan) mean in English?', options: ['Thank you', 'Goodbye', 'Welcome', 'How are you?'], answer: 2 },
      { question: 'Guess the Arabic letter: ض', options: ['(sad)', '(zay)', '(dad)', '(ta)'], answer: 2 },
      { question: 'Guess the Arabic letter: غ', options: ['(fa)', '(qaf)', '(ghain)', '(jeem)'], answer: 2 },
      { question: 'Complete the sentence: أنا أتحدث ____ (Ana atahaddath ____)', options: ['العربية (al-‘arabiyyah)', 'الإنجليزية (al-ingliziyyah)', 'الفرنسية (al-faransiyyah)', 'الإسبانية (al-ispaniyyah)'], answer: 0 },
    ],
    
  },
  {
    questions: [
      { question: 'Guess the image:', options: ['مدرسة (madrasa)', 'مستشفى (mustashfa)', 'مكتبة (maktaba)', 'منزل (manzil)'], answer: 0, image: 'classroom' }, // Replace with actual image
      { question: 'Guess the image:', options: ['شجرة (shajara)', 'زهرة (zahra)', 'سيارة (sayyara)', 'بيت (bayt)'], answer: 1, image: 'flower' }, // Replace with actual image
      { question: 'مَدرَسة (madrasa)', options: ['Hospital', 'Market', 'School', 'Library'], answer: 2 },
      { question: 'طِفْل (tifl)', options: ['Adult', 'Child', 'Teacher', 'Doctor'], answer: 1 },
      { question: 'سَيّارة (sayyara)', options: ['Bicycle', 'Airplane', 'Train', 'Car'], answer: 3 },
      { question: 'مَطَبخ (matbakh)', options: ['Bedroom', 'Kitchen', 'Bathroom', 'Living room'], answer: 1 },
      { question: 'مِلعَقة (milʿaqa)', options: ['Spoon', 'Fork', 'Knife', 'Plate'], answer: 0 },
      { question: 'Complete the sentence: أنا أَكتُبُ بـ ____ (Ana aktubu bi ____)', options: ['كِتاب (kitab)', 'طاوِلة (taawila)', 'قَلَم (qalam)', 'باب (baab)'], answer: 2 },
      { question: 'Complete the sentence: الطالبُ في ____ (Al-talib fi ____)', options: ['المَدرَسة (almadrasah)', 'الحَديقة (alhadiqah)', 'الغُرفة (alghurfa)', 'المَطبَخ (almatbakh)'], answer: 0 },
      { question: 'Complete the sentence: الأستاذُ يُدَرِّس في ____ (Al-ustadh yudarris fi ____)', options: ['المَدرَسة (almadrasah)', 'السَيّارة (alsayyara)', 'المَطَار (almatar)', 'البَيت (albayt)'], answer: 0 },
    ],
  },
  {
    questions: [
      { question: 'سَيّارة (sayyara)', options: ['Bicycle', 'Airplane', 'Train', 'Car'], answer: 3 },
      { question: 'طاوِلة (taawila)', options: ['Table', 'Bed', 'Cupboard', 'Carpet'], answer: 0 },
      { question: 'حاسوب (hasub)', options: ['Book', 'Phone', 'Computer', 'Pen'], answer: 2 },
      { question: 'مِلعَقة (milʿaqa)', options: ['Spoon', 'Fork', 'Knife', 'Plate'], answer: 0 },
      { question: 'نافِذة (nafitha)', options: ['Door', 'Window', 'Wall', 'Roof'], answer: 1 },
      { question: 'Complete the sentence: أُحِبُّ أن أَكْتُب بـ ____ (Uhibbu an aktub bi ____)', options: ['القَلَم (alqalam)', 'الكُرسي (alkursi)', 'البَاب (albāb)', 'المَاء (almaa\')'], answer: 0 },
      { question: 'What is the Arabic word for "and"?', options: ['وَ (wa)', 'أَو (aw)', 'مِن (min)', 'إلى (ila)'], answer: 0 },
      { question: 'Guess the image:', options: ['شجرة (shajara)', 'زهرة (zahra)', 'سيارة (sayyara)', 'بيت (bayt)'], answer: 2, image: 'car' }, // Replace with actual image
      { question: 'Complete the sentence: الطالبُ في ____ (Al-talib fi ____)', options: ['المَدرَسة (almadrasah)', 'الحَديقة (alhadiqah)', 'الغُرفة (alghurfa)', 'المَطبَخ (almatbakh)'], answer: 0 },
      { question: 'Guess the image:', options: ['دفتر (daftar)', 'كتاب (kitab)', 'قلم (qalam)', 'حاسوب (hasub)'], answer: 2 },
    ],
  },
  {
    questions: [
      { question: 'حَديقة (hadiqah)', options: ['Garden', 'School', 'Hospital', 'Library'], answer: 0 },
      { question: 'كِتاب (kitab)', options: ['Book', 'Pen', 'Desk', 'Bag'], answer: 0 },
      { question: 'شَمس (shams)', options: ['Moon', 'Star', 'Sun', 'Sky'], answer: 2 },
      { question: 'غُرفة (ghurfa)', options: ['Kitchen', 'Room', 'Bathroom', 'Garden'], answer: 1 },
      { question: 'مَطبَخ (matbakh)', options: ['Bedroom', 'Kitchen', 'Bathroom', 'Living room'], answer: 1 },
      { question: 'Complete the sentence: أنا أَذْهَب إلى ____ (Ana adhhaba ila ____)', options: ['المدرسة (almadrasah)', 'المطار (almatar)', 'الحديقة (alhadiqah)', 'السوق (alsouq)'], answer: 2 },
      { question: 'Complete the sentence: أُحِبُّ أن أَكْتُب بـ ____ (Uhibbu an aktub bi ____)', options: ['القَلَم (alqalam)', 'الكُرسي (alkursi)', 'الباب (albāb)', 'المَاء (almaa\')'], answer: 0 },
      { question: 'Guess the image:', options: ['دراجة (daraja)', 'طائرة (tayara)', 'سيارة (sayyara)', 'قطار (qitar)'], answer: 1, image: 'airplane' }, // Replace with actual image
      { question: 'Guess the image:', options: ['قلم (qalam)', 'كتاب (kitab)', 'حاسوب (hasub)', 'دفتر (daftar)'], answer: 1, image: 'book' }, // Replace with actual image
      { question: 'Complete the sentence: الكتاب على ____ (Al-kitab ala ____)', options: ['الكُرسي (alkursi)', 'السَيّارة (alsayyara)', 'الطاولة (altaawila)', 'الباب (albab)'], answer: 3 },
    ],
  },
  {
    questions: [
      { question: 'سَيّارة (sayyara)', options: ['Bicycle', 'Airplane', 'Train', 'Car'], answer: 3 },
      { question: 'طاوِلة (taawila)', options: ['Table', 'Bed', 'Cupboard', 'Carpet'], answer: 0 },
      { question: 'حاسوب (hasub)', options: ['Book', 'Phone', 'Computer', 'Pen'], answer: 2 },
      { question: 'مِلعَقة (milʿaqa)', options: ['Spoon', 'Fork', 'Knife', 'Plate'], answer: 0 },
      { question: 'نافِذة (nafitha)', options: ['Door', 'Window', 'Wall', 'Roof'], answer: 1 },
      { question: 'Complete the sentence: أنا أَكتُبُ بـ ____ (Ana aktubu bi ____)', options: ['كِتاب (kitab)', 'طاوِلة (taawila)', 'قَلَم (qalam)', 'باب (baab)'], answer: 2 },
      { question: 'Complete the sentence: الأستاذُ يُدَرِّس في ____ (Al-ustadh yudarris fi ____)', options: ['المَدرَسة (almadrasah)', 'السَيّارة (alsayyara)', 'المَطَار (almatar)', 'البَيت (albayt)'], answer: 0 },
      { question: 'Guess the image:', options: ['شجرة (shajara)', 'زهرة (zahra)', 'سيارة (sayyara)', 'بيت (bayt)'], answer: 3, image: 'house' }, // Replace with actual image
      { question: 'Guess the image:', options: ['دفتر (daftar)', 'كتاب (kitab)', 'قلم (qalam)', 'حاسوب (hasub)'], answer: 2, image: 'pen' }, // Replace with actual image
      { question: 'Complete the sentence: الطالبُ في ____ (Al-talib fi ____)', options: ['المَدرَسة (almadrasah)', 'الحَديقة (alhadiqah)', 'الغُرفة (alghurfa)', 'المَطبَخ (almatbakh)'], answer: 0 },
    ],
  },
  {
    questions: [
      { question: 'Complete the sentence: أنا ذاهب ____ المدرسة. (Ana dhahib ____ al-madrasa)', options: ['إلى (ila)', 'من (min)', 'أو (aw)', 'و (wa)'], answer: 0 },
      { question: 'What does "أو" mean in Arabic?', options: ['And', 'Or', 'To', 'From'], answer: 1 },
      { question: 'Choose the correct word: أنا سأأتي ____ السوق. (Ana sa-atii ____ as-souq)', options: ['من (min)', 'إلى (ila)', 'أين (ayna)', 'كيف (kayfa)'], answer: 1 },
      { question: 'Translate the word "مَتَى" into English.', options: ['Where', 'What', 'When', 'Who'], answer: 2 },
      { question: 'What is the Arabic word for "how"?', options: ['كَيْفَ (kayfa)', 'أَيُّ (ayyu)', 'مَنْ (man)', 'مَا (ma)'], answer: 0 },
      { question: 'Fill in the blank: ____ تأتي؟ (Ayin taati?)', options: ['مَا (ma)', 'مَنْ (man)', 'لِمَاذَا (limaatha)', 'أَيْنَ (ayna)'], answer: 3 },
      { question: 'What is the Arabic word for "which"?', options: ['كَيْفَ (kayfa)', 'أَيُّ (ayyu)', 'مَنْ (man)', 'مَا (ma)'], answer: 1 },
      { question: 'Choose the correct word: أنا أريد الذهاب ____ المطعم. (Ana ureed al-dhahab ____ al-mataam)', options: ['إلى (ila)', 'من (min)', 'أين (ayna)', 'كيف (kayfa)'], answer: 0 },
      { question: 'Translate the word "مَاذَا" into English.', options: ['Where', 'What', 'When', 'Who'], answer: 1 },
      { question: 'What does "إلى" mean in Arabic?', options: ['And', 'Or', 'To', 'From'], answer: 2 },
    ],
  },
  {
    questions: [
      { question: 'What does "إن" mean in Arabic?', options: ['Yes', 'No', 'If', 'But'], answer: 2 },
      { question: 'Translate the word "و" into English.', options: ['And', 'Or', 'To', 'From'], answer: 0 },
      { question: 'Choose the correct word: أنا أذهب ____ المدرسة. (Ana adhhab ____ al-madrasa)', options: ['من (min)', 'إلى (ila)', 'في (fi)', 'عن (an)'], answer: 1 },
      { question: 'What is the Arabic word for "because"?', options: ['لكن (lakin)', 'لِمَاذَا (limaatha)', 'لأنَّ (lianna)', 'ماذا (maadha)'], answer: 2 },
      { question: 'What does "أين" mean in Arabic?', options: ['When', 'Why', 'Which', 'Where'], answer: 3 },
      { question: 'Translate the word "كم" into English.', options: ['How', 'What', 'Where', 'How many'], answer: 3 },
      { question: 'What is the Arabic word for "who"?', options: ['مَتَى (mata)', 'مَا (ma)', 'مَنْ (man)', 'ماذا (maadha)'], answer: 2 },
      { question: 'Choose the correct word: أستطيع الذهاب ____ السوق. (Astatiu al-dhahab ____ as-souq)', options: ['من (min)', 'إلى (ila)', 'على (ala)', 'في (fi)'], answer: 1 },
      { question: 'Translate the word "لماذا" into English.', options: ['Where', 'What', 'When', 'Why'], answer: 3 },
      { question: 'Fill in the blank: ____ تأتي إلى المدرسة؟ (Limaatha taati ila al-madrasa?)', options: ['مَتَى (mata)', 'مَا (ma)', 'مَنْ (man)', 'لِمَاذَا (limaatha)'], answer: 3 },
    ],
  },
  {
    questions: [
      { question: 'Translate the word "أبدًا" into English.', options: ['Always', 'Never', 'Sometimes', 'Later'], answer: 0 },
      { question: 'What is the Arabic word for "to eat"?', options: ['يَشْرَبُ (yashrabu)', 'يَرْكَبُ (yarkabu)', 'يَقْرَأُ (yaqra\'u)', 'يَأْكُلُ (ya\'kulu)'], answer: 3 },
      { question: 'Choose the correct word: ذَهَبْتُ إلى الْمَكْتَبَةِ ___ اشْتَرِي كِتَابًا. (Dhahabtu ila al-maktabati ___ ashtari kitaban)', options: ['لأن (li\'anna)', 'وَ (wa)', 'بَعْدَ (ba\'da)', 'لِأَنَّ (li\'anna)'], answer: 1 },
      { question: 'Translate the word "سَرِيعًا" into English.', options: ['Quickly', 'Slowly', 'Carefully', 'Immediately'], answer: 0 },
      { question: 'What is the Arabic word for "to go"?', options: ['يَأْتِي (ya\'ti)', 'يَكْتُبُ (yaktubu)', 'يَرْجِعُ (yarji\'u)', 'يَذْهَبُ (yadhabu)'], answer: 3 },
      { question: 'Choose the correct word: أَنَا أُحِبُّ الْفَلَامِنْجُ ___ الْجَمَعَةِ. (Ana uhibbu al-falamingu ___ al-jum\'ati)', options: ['غَالِي (ghali)', 'غَدًا (ghadan)', 'جَدًّا (jiddan)', 'سَرِيعًا (sari\'an)'], answer: 2 },
      { question: 'Translate the word "قَلِيلاً" into English.', options: ['A lot', 'Few', 'Much', 'Very'], answer: 1 },
      { question: 'What is the Arabic word for "to read"?', options: ['يَكْتُبُ (yaktubu)', 'يَسْمَعُ (yasma\'u)', 'يَقْرَأُ (yaqra\'u)', 'يَشْرَبُ (yashrabu)'], answer: 2 },
      { question: 'Choose the correct word: سَافَرَ إلَى بَارِيس ___ الطَّائِرَةِ. (Safara ila Baris ___ at-ta\'irati)', options: ['فِي (fi)', 'بِ (bi)', 'إلى (ila)', 'على (ala)'], answer: 1 },
      { question: 'Translate the word "بَعِيدًا" into English.', options: ['Near', 'Far', 'Here', 'There'], answer: 1 },
    ],
  },
  {
    questions: [
      { question: 'What is the Arabic word for "to speak"?', options: ['يَكْتُبُ (yaktubu)', 'يَسْمَعُ (yasma\'u)', 'يَتَكَلَّمُ (yatakallamu)', 'يَقْرَأُ (yaqra\'u)'], answer: 2 },
      { question: 'Choose the correct word: أَنَا ذَهَبْتُ إلَى الْمَكْتَبَةِ ___ شِرَاءِ الْكِتَابِ. (Ana dhahabtu ila al-maktabati ___ shira\'i al-kitab)', options: ['ل (li)', 'بَعْدَ (ba\'da)', 'فَقَطْ (faqat)', 'لِأَنَّ (li\'anna)'], answer: 0 },
      { question: 'Translate the word "غَالِبًا" into English.', options: ['Always', 'Rarely', 'Usually', 'Sometimes'], answer: 2 },
      { question: 'What is the Arabic word for "to study"?', options: ['يَكْتُبُ (yaktubu)', 'يَرْكَبُ (yarkabu)', 'يَدْرُسُ (yadrusu)', 'يَأْكُلُ (ya\'kulu)'], answer: 2 },
      { question: 'Choose the correct word: الطَّالِبُ يَذْهَبُ ___ الْمَدْرَسَةِ بِالْأُتُوبِيسِ. (At-talibu yadhabu ___ al-madrasati bil-utubiisi)', options: ['إلَى (ila)', 'مِنْ (min)', 'فِي (fi)', 'بِالْ (bil)'], answer: 0 },
      { question: 'Translate the word "قَرِيبًا" into English.', options: ['Sometimes', 'Never', 'Quickly', 'Soon'], answer: 3 },
      { question: 'What is the Arabic word for "to listen"?', options: ['يَكْتُبُ (yaktubu)', 'يَسْمَعُ (yasma\'u)', 'يَقْرَأُ (yaqra\'u)', 'يَشْرَبُ (yashrabu)'], answer: 1 },
      { question: 'Choose the correct word: أَنَا أُحِبُّ الطَّبِيعَةَ، ___ الْجَبَالُ وَالْأَشْجَارُ. (Ana uhibbu at-tabi\'ata, ___ al-jibalu wal-ashjaru)', options: ['أَوْ (aw)', 'فَقَطْ (faqat)', 'لِأَنَّ (li\'anna)', 'لَا (la)'], answer: 0 },
      { question: 'Translate the word "قَلِيلًا" into English.', options: ['Few', 'Many', 'Enough', 'Always'], answer: 0 },
      { question: 'What is the Arabic word for "to write"?', options: ['يَقْرَأُ (yaqra\'u)', 'يَكْتُبُ (yaktubu)', 'يَسْمَعُ (yasma\'u)', 'يَأْكُلُ (ya\'kulu)'], answer: 1 },
    ],
  },
];

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function QuizScreen({ route, navigation }) {
  const { quizNumber } = route.params;
  const quiz = quizzes[quizNumber - 1]; // Adjusting index for array access
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const shuffledQuestions = shuffleArray(quiz.questions);

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await Promise.all(
        shuffledQuestions.map(async (question, index) => {
          if (question.question.startsWith('Guess the image')) {
            const imageUrl = await fetchImage(question.image);
            console.log(question.image);
            return { index, imageUrl };
          }
          return null;
        })
      );
      setImageUrls(urls.filter(Boolean));
    };

    fetchImages();
  }, []);


  const handleAnswer = (selectedOption) => {
    if (selectedOption === shuffledQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>Your score: {score} / {shuffledQuestions.length}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const currentImageUrl = imageUrls.find(({ index }) => index === currentQuestionIndex)?.imageUrl;

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentImageUrl && <Image source={{ uri: currentImageUrl }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
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