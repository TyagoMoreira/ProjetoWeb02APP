import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import TelaLogin from "../screens/TelaLogin";
import TelaBuscarLutador from "../screens/TelaBuscarLutador";

enableScreens();

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="FightFinder" component={TelaBuscarLutador} />
    </Stack.Navigator>
  );
}
