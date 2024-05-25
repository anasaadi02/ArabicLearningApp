import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Register&Login/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TicketScreen from "./screens/TicketScreen";
import RegisterScreen from "./screens/Register&Login/Register";
import TextToImgScreen from "./screens/TextToImgScreen";
import LettersScreen from "./screens/LettersScreen";
import Onboarding from "./screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          styles={{}}
          options={{ headerShown: false }}
          name="Images"
          component={TextToImgScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Audios"
          component={TextToImgScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Translation"
          component={TextToImgScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Ticket"
          component={TicketScreen}
        />
        <Stack.Screen
          style={styles.stack}
          // options={{ headerShown: false }}
          name="Letters"
          component={LettersScreen}
        />
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
});
