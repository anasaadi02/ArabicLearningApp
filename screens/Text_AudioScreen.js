import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Tts from 'react-native-tts';
import Voice from 'react-native-voice';

export default function Text_AudioScreen({ route }) {
  const { language } = route.params;
  const [text, setText] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const [ttsReady, setTtsReady] = useState(false);
  const [voiceInitialized, setVoiceInitialized] = useState(false);

  useEffect(() => {
    const initializeTts = async () => {
      try {
        await Tts.getInitStatus();
        setTtsReady(true);
      } catch (err) {
        console.warn('TTS initialization failed:', err);
      }
    };

    const initializeVoice = async () => {
      try {
        await Voice.isAvailable();
        setVoiceInitialized(true);
      } catch (error) {
        console.warn('Voice initialization failed:', error);
      }
    };

    initializeTts();
    initializeVoice();

    // Set up the event listener for speech results
    const onSpeechResults = (event) => {
      setSpokenText(event.value[0]);
    };

    Voice.onSpeechResults = onSpeechResults;

    // Clean up the event listener
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleTextToSpeech = () => {
    if (ttsReady) {
      Tts.speak(text);
    } else {
      Alert.alert('TTS not ready', 'Text-to-Speech is not ready yet.');
    }
  };

  const handleSpeechToText = () => {
    if (voiceInitialized) {
      Voice.start('en-US');
    } else {
      Alert.alert('Voice not available', 'Speech recognition is not available on this device.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>
        {language === 'Eng' ? 'Text to Speech / Speech to Text' : 'النص إلى كلام / الكلام إلى نص'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={language === 'Eng' ? 'Enter text' : 'أدخل النص'}
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={handleTextToSpeech} style={styles.button}>
        <Text style={styles.buttonText}>{language === 'Eng' ? 'Text to Speech' : 'النص إلى كلام'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSpeechToText} style={styles.button}>
        <Text style={styles.buttonText}>{language === 'Eng' ? 'Speech to Text' : 'الكلام إلى نص'}</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>{spokenText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  head: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  resultText: {
    fontSize: 18,
    marginTop: 20,
  },
});
