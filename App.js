import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./scr/screens/Login";
import Details from "./scr/screens/Details";
import Favoritos from "./scr/screens/Favoritos";
import AnimesList from "./scr/screens/AnimesList";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AnimesList" component={AnimesList} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
