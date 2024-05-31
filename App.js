import { StatusBar } from "expo-status-bar";
import { Appearance, useColorScheme } from "react-native";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./screens/Register&Login/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TicketScreen from "./screens/TicketScreen";
import RegisterScreen from "./screens/Register&Login/Register";
import TextToImgScreen from "./screens/TextToImgScreen";
import LettersScreen from "./screens/words/LettersScreen";
import Text_AudioScreen from "./screens/Text_AudioScreen";
import Onboarding from "./screens/Onboarding";
import QuizSelectionScreen from "./screens/QuizSelectionScreen";
import TranslationScreen from "./screens/TranslateScreen";
import DisplayScreen from "./screens/words/DisplayScreen";
import QuizScreen from "./screens/QuizScreen";
import ChatScreen from "./screens/utils/chatbot";

const Stack = createNativeStackNavigator();

export default function App() {
  // const CustomHeader = () => {
  //   return (
  //     <View style={styles.headerContainer}>
  //       <LinearGradient
  //         colors={["orange", "yellow"]} // Adjust gradient colors as needed
  //         start={{ x: 0, y: 0 }}
  //         end={{ x: 1, y: 0 }}
  //         style={styles.gradient}
  //       />
  //       <Image
  //         source={require("./assets/robot.png")} // Provide the path to your robot image
  //         style={styles.robotImage}
  //       />
  //       <Text style={styles.chatbotText}>Chatbot</Text>
  //     </View>
  //   );
  // };
  return (
    <NavigationContainer initialRouteName="Onboarding">
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: {
            backgroundColor: "orange", // Set header background color based on language
          },
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Onboard"
          component={Onboarding}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "orange", // Set header background color for HomeScreen
            },

            // headerTitle: () => (
            //   <View style={styles.customHeader}>
            //     <CustomHeader />
            //   </View>
            // ),
          }}
        />
        <Stack.Screen
          // options={{ headerShown: false }}
          name="chatbot"
          component={ChatScreen}
        />
        <Stack.Screen name="Images" component={TextToImgScreen} />
        <Stack.Screen
          name="Translation"
          component={TranslationScreen} // Add the new screen to the stack
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Ticket"
          component={TicketScreen}
        />
        <Stack.Screen
          style={styles.stack}
          name="Letters"
          component={LettersScreen}
        />
        <Stack.Screen
          name="QuizScreen"
          component={QuizScreen}
          options={{ title: "Quiz" }}
        />
        <Stack.Screen name="Display" component={DisplayScreen} />
        <Stack.Screen name="Text_Audio" component={Text_AudioScreen} />
        <Stack.Screen name="Quizz" component={QuizSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stack: {
    backgroundColor: "orange",
    color: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    left: 170,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  robotImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  chatbotText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
