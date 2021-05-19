import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import LoginScreen from './src/screens/Login/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import StartScreen from './src/screens/Start/StartScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import ResetPasswordScreen from './src/screens/ResetPassword/ResetPasswordScreen';

//login
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'

const Stack = createStackNavigator()

export default function App() {
  return (
     <AppContainer/>
    

    // <LoginScreen/>
    // <Dashboardscreen/>
    // <StartScreen/>
    // <RegisterScreen/>
    // <ResetPasswordScreen/>
    ///
    // <Provider theme={theme}>
    //   <NavigationContainer>
    //     <Stack.Navigator
    //       initialRouteName="StartScreen"
    //       screenOptions={{
    //         headerShown: false,
    //       }}
    //     >
    //       <Stack.Screen name="StartScreen" component={StartScreen} />
    //       <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    //       {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
    //       <Stack.Screen name="Dashboard" component={Dashboard} />
    //       <Stack.Screen
    //         name="ResetPasswordScreen"
    //         component={ResetPasswordScreen}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
  );
}
