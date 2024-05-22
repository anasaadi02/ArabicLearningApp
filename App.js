import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TicketScreen from "./screens/TicketScreen";
import RegisterScreen from "./screens/Register";
import TextToImgScreen from "./screens/TextToImgScreen";
import LettersScreen from "./screens/LettersScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
});
